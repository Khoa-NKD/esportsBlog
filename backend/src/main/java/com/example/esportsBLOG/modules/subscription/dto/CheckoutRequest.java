package com.example.esportsBLOG.modules.subscription.dto;

import com.example.esportsBLOG.entity.PaymentMethod;
import com.example.esportsBLOG.entity.SubscriptionTier;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CheckoutRequest(
        Long userId,

        @Email(message = "Email must be valid")
        @NotNull(message = "User email is required")
        String userEmail,

        @NotNull(message = "Plan tier is required")
        SubscriptionTier planTier,

        @Positive(message = "Amount must be greater than zero")
        long amount,

        @NotNull(message = "Payment method is required")
        PaymentMethod paymentMethod
) {}
