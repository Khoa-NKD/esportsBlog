package com.example.esportsBLOG.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreatePostRequest(
        @NotBlank(message = "Title must not be blank")
        @Size(max = 255, message = "Title must not exceed 255 characters")
        String title,

        String excerpt,

        @NotBlank(message = "Content must not be blank")
        String content,

        String coverImage,

        String gameTag,

        Boolean isPremium,

        String readTime,

        Long authorId
) {}
