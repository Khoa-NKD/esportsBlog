package com.example.esportsBLOG.controller;

import com.example.esportsBLOG.common.ApiResponse;
import com.example.esportsBLOG.dto.CreatePostRequest;
import com.example.esportsBLOG.dto.PostResponse;
import com.example.esportsBLOG.entity.SubscriptionTier;
import com.example.esportsBLOG.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PostResponse>> createPost(@Valid @RequestBody CreatePostRequest req) {
        PostResponse created = postService.createPost(req);
        URI location = URI.create("/api/posts/" + created.id());
        return ResponseEntity.created(location).body(ApiResponse.ok("Tạo bài viết thành công", created));
    }

    @GetMapping
    public ApiResponse<List<PostResponse>> getAllPosts(
            @RequestParam(required = false) String gameTag,
            @RequestParam(required = false) Boolean isPremium,
            @RequestHeader(value = "X-User-Tier", required = false, defaultValue = "FREE") String userTierStr
    ) {
        SubscriptionTier callerTier = parseTier(userTierStr);
        List<PostResponse> posts = postService.getFilteredPosts(gameTag, isPremium, callerTier);
        return ApiResponse.ok(posts);
    }

    @GetMapping("/{id}")
    public ApiResponse<PostResponse> getPostById(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-Tier", required = false, defaultValue = "FREE") String userTierStr
    ) {
        SubscriptionTier callerTier = parseTier(userTierStr);
        PostResponse post = postService.getPostById(id, callerTier);
        return ApiResponse.ok(post);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePost(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-Role", required = false, defaultValue = "USER") String userRole
    ) {
        if (!"ADMIN".equalsIgnoreCase(userRole)) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Truy cập bị từ chối: Chỉ quản trị viên (ADMIN) mới có quyền xóa bài viết."));
        }
        postService.deletePost(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa bài viết thành công", null));
    }

    private SubscriptionTier parseTier(String tier) {
        if (tier == null) return SubscriptionTier.FREE;
        try {
            return SubscriptionTier.valueOf(tier.toUpperCase());
        } catch (IllegalArgumentException e) {
            return SubscriptionTier.FREE;
        }
    }
}
