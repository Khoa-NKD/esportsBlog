package com.example.esportsBLOG.repository;

import com.example.esportsBLOG.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByGameTagOrderByCreatedAtDesc(String gameTag);

    List<Post> findByIsPremiumOrderByCreatedAtDesc(boolean isPremium);

    List<Post> findByGameTagAndIsPremiumOrderByCreatedAtDesc(String gameTag, boolean isPremium);

    List<Post> findAllByOrderByCreatedAtDesc();

    long countByIsPremium(boolean isPremium);
}
