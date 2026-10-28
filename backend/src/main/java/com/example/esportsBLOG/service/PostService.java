package com.example.esportsBLOG.service;

import com.example.esportsBLOG.dto.AuthorResponse;
import com.example.esportsBLOG.dto.CreatePostRequest;
import com.example.esportsBLOG.dto.PostResponse;
import com.example.esportsBLOG.entity.Post;
import com.example.esportsBLOG.entity.User;
import com.example.esportsBLOG.exception.PostNotFoundException;
import com.example.esportsBLOG.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    // Constructor injection (recommended over field injection)
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public PostResponse createPost(CreatePostRequest req){
        Post post = new Post();
        post.setTitle(req.title());
        post.setContent(req.content());
        post.setAuthor(req.author());
        post.setCreatedAt(LocalDateTime.now());

        Post saved = postRepository.save(post);
        return toResponse(saved);
    }

    public List<PostResponse> getAllPosts(){
        return postRepository.findAll()
                .stream().map(this::toResponse).toList();
    }

    public PostResponse getPostById(Long id){
        Post post = postRepository.findById(id)
                .orElseThrow(()->new PostNotFoundException(id));
        return toResponse(post);
    }
    // Map entity -> response DTO
    private PostResponse toResponse(Post post) {
        return new PostResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getCreatedAt(),
                toAuthorResponse(post.getAuthor())
        );
    }

    private AuthorResponse toAuthorResponse(User author) {
        if (author == null) {
            return null;
        }
        return new AuthorResponse(
                author.getId(),
                author.getUsername(),
                author.getEmail()
        );
    }
}
