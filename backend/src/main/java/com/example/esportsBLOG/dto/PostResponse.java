package com.example.esportsBLOG.dto;

import java.time.LocalDateTime;

public record PostResponse(
        Long id,
        String title,
        String excerpt,
        String content,
        String coverImage,
        String gameTag,
        boolean isPremium,
        boolean isLocked,
        int viewsCount,
        String readTime,
        String status,
        LocalDateTime createdAt,
        AuthorResponse author
) {}
