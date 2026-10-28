package com.example.esportsBLOG.modules.admin.dto;

public record AdminDashboardStats(
        long totalRevenue,
        long monthlyRevenue,
        long totalArticles,
        long premiumArticles,
        long totalUsers,
        long proUsers,
        long vipUsers,
        long totalTransactions
) {}
