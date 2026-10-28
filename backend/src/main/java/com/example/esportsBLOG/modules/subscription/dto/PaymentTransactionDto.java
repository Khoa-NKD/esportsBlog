package com.example.esportsBLOG.modules.subscription.dto;

import com.example.esportsBLOG.entity.PaymentMethod;
import com.example.esportsBLOG.entity.PaymentStatus;
import com.example.esportsBLOG.entity.SubscriptionTier;
import java.time.LocalDateTime;

public record PaymentTransactionDto(
        Long id,
        String transactionCode,
        String userEmail,
        SubscriptionTier planTier,
        long amount,
        PaymentMethod paymentMethod,
        PaymentStatus status,
        LocalDateTime createdAt
) {}
