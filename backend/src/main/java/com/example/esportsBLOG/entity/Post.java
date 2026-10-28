package com.example.esportsBLOG.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String excerpt;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "cover_image")
    private String coverImage;

    @Column(name = "game_tag")
    private String gameTag;

    @Column(name = "is_premium", nullable = false)
    @Builder.Default
    private boolean isPremium = false;

    @Column(name = "views_count", nullable = false)
    @Builder.Default
    private int viewsCount = 0;

    @Column(name = "read_time")
    @Builder.Default
    private String readTime = "5 phút";

    @Column(nullable = false)
    @Builder.Default
    private String status = "PUBLISHED";

    @Column(name = "created_at", nullable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    // Many posts belong to one author. This is the OWNING side.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = true)
    private User author;

    // One post has many comments
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Comment> comments = new ArrayList<>();

    @PrePersist
    void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.status == null) {
            this.status = "PUBLISHED";
        }
    }
}