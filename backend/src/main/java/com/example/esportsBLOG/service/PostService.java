package com.example.esportsBLOG.service;

import com.example.esportsBLOG.dto.AuthorResponse;
import com.example.esportsBLOG.dto.CreatePostRequest;
import com.example.esportsBLOG.dto.PostResponse;
import com.example.esportsBLOG.entity.Post;
import com.example.esportsBLOG.entity.SubscriptionTier;
import com.example.esportsBLOG.entity.User;
import com.example.esportsBLOG.exception.PostNotFoundException;
import com.example.esportsBLOG.repository.PostRepository;
import com.example.esportsBLOG.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public PostResponse createPost(CreatePostRequest req) {
        User author = null;
        if (req.authorId() != null) {
            author = userRepository.findById(req.authorId()).orElse(null);
        }

        Post post = Post.builder()
                .title(req.title())
                .excerpt(req.excerpt() != null ? req.excerpt() : req.content().substring(0, Math.min(160, req.content().length())) + "...")
                .content(req.content())
                .coverImage(req.coverImage())
                .gameTag(req.gameTag() != null ? req.gameTag() : "LOL")
                .isPremium(Boolean.TRUE.equals(req.isPremium()))
                .readTime(req.readTime() != null ? req.readTime() : "5 phút")
                .viewsCount(0)
                .status("PUBLISHED")
                .author(author)
                .createdAt(LocalDateTime.now())
                .build();

        Post saved = postRepository.save(post);
        return toResponse(saved, SubscriptionTier.VIP);
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getFilteredPosts(String gameTag, Boolean isPremium, SubscriptionTier callerTier) {
        List<Post> posts;
        if (gameTag != null && !gameTag.equalsIgnoreCase("ALL") && isPremium != null) {
            posts = postRepository.findByGameTagAndIsPremiumOrderByCreatedAtDesc(gameTag.toUpperCase(), isPremium);
        } else if (gameTag != null && !gameTag.equalsIgnoreCase("ALL")) {
            posts = postRepository.findByGameTagOrderByCreatedAtDesc(gameTag.toUpperCase());
        } else if (isPremium != null) {
            posts = postRepository.findByIsPremiumOrderByCreatedAtDesc(isPremium);
        } else {
            posts = postRepository.findAllByOrderByCreatedAtDesc();
        }

        return posts.stream().map(p -> toResponse(p, callerTier)).toList();
    }

    public PostResponse getPostById(Long id, SubscriptionTier callerTier) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));

        // Increment view count
        post.setViewsCount(post.getViewsCount() + 1);
        postRepository.save(post);

        return toResponse(post, callerTier);
    }

    public void deletePost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new PostNotFoundException(id);
        }
        postRepository.deleteById(id);
    }

    public long countPremiumArticles() {
        return postRepository.countByIsPremium(true);
    }

    public long countTotalArticles() {
        return postRepository.count();
    }

    // Map entity -> response DTO with paywall gating
    private PostResponse toResponse(Post post, SubscriptionTier callerTier) {
        boolean canViewFull = !post.isPremium() || (callerTier != null && callerTier != SubscriptionTier.FREE);
        boolean isLocked = post.isPremium() && !canViewFull;

        String visibleContent = post.getContent();
        if (isLocked) {
            // Paywall: only show excerpt and teaser notice
            visibleContent = (post.getExcerpt() != null ? post.getExcerpt() : post.getTitle())
                    + "\n\n🔒 [NỘI DUNG ĐÃ BỊ KHÓA] Phân tích chuyên sâu này dành riêng cho hội viên VIP & PRO. Vui lòng nâng cấp gói để đọc toàn bộ bài viết và tỷ lệ cấm chọn.";
        }

        return new PostResponse(
                post.getId(),
                post.getTitle(),
                post.getExcerpt(),
                visibleContent,
                post.getCoverImage(),
                post.getGameTag(),
                post.isPremium(),
                isLocked,
                post.getViewsCount(),
                post.getReadTime(),
                post.getStatus(),
                post.getCreatedAt(),
                toAuthorResponse(post.getAuthor())
        );
    }

    private AuthorResponse toAuthorResponse(User author) {
        if (author == null) {
            return new AuthorResponse(1L, "EsportsPulse Analyst", "analyst@esportspulse.vn");
        }
        return new AuthorResponse(
                author.getId(),
                author.getUsername(),
                author.getEmail()
        );
    }
}
