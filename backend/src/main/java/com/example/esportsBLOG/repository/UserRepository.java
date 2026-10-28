package com.example.esportsBLOG.repository;

import com.example.esportsBLOG.entity.SubscriptionTier;
import com.example.esportsBLOG.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    long countBySubscriptionTier(SubscriptionTier subscriptionTier);
}
