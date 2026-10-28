package com.example.esportsBLOG.controller;

import com.example.esportsBLOG.dto.CreatePostRequest;
import com.example.esportsBLOG.dto.PostResponse;
import com.example.esportsBLOG.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService){
        this.postService=postService;
    }

    @PostMapping
    public ResponseEntity<PostResponse> createPost(@Valid @RequestBody CreatePostRequest req){
        PostResponse created = postService.createPost(req);
        URI location = URI.create("/api/posts/" + created.id());
        return ResponseEntity.created(location).body(created);
    }

    @GetMapping
    public List<PostResponse> getAllPosts(){
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public PostResponse getPostById(@PathVariable Long id){
        return postService.getPostById(id);
    }
}
