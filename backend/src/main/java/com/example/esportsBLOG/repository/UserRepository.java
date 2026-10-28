package com.example.esportsBLOG.repository;

import com.example.esportsBLOG.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
