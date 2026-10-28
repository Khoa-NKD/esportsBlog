package com.example.esportsBLOG.repository;

import com.example.esportsBLOG.entity.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentTransaction, Long> {
    List<PaymentTransaction> findByUserEmailOrderByCreatedAtDesc(String userEmail);

    List<PaymentTransaction> findAllByOrderByCreatedAtDesc();

    Optional<PaymentTransaction> findByTransactionCode(String transactionCode);

    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM PaymentTransaction p WHERE p.status = com.example.esportsBLOG.entity.PaymentStatus.COMPLETED")
    Long calculateTotalRevenue();

    @Query("SELECT COUNT(p) FROM PaymentTransaction p WHERE p.status = com.example.esportsBLOG.entity.PaymentStatus.COMPLETED")
    Long countSuccessfulPayments();
}
