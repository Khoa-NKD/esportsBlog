package com.example.esportsBLOG.dto;

import com.example.esportsBLOG.entity.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreatePostRequest(
        @NotBlank(message = "Title must not be blank")
        @Size(max=200, message = "Title is too long")
        String title,

        @NotBlank(message = "Content must not be blank")
        @Size(min=150,message = "Content is full")
        String content,

        @NotNull(message = "Author must not be null")
        User author
) {
}
