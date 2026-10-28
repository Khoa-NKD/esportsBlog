package com.example.esportsBLOG.modules.subscription.dto;

import com.example.esportsBLOG.entity.SubscriptionTier;
import java.util.List;

public record SubscriptionPlanDto(
        SubscriptionTier id,
        String name,
        long priceMonthly,
        long priceYearly,
        String badge,
        String description,
        List<String> features,
        boolean isPopular
) {}
