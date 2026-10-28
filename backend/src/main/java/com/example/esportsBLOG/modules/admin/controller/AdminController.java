package com.example.esportsBLOG.modules.admin.controller;

import com.example.esportsBLOG.common.ApiResponse;
import com.example.esportsBLOG.entity.SubscriptionTier;
import com.example.esportsBLOG.entity.User;
import com.example.esportsBLOG.modules.admin.dto.AdminDashboardStats;
import com.example.esportsBLOG.modules.subscription.dto.PaymentTransactionDto;
import com.example.esportsBLOG.modules.subscription.service.SubscriptionService;
import com.example.esportsBLOG.repository.UserRepository;
import com.example.esportsBLOG.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final SubscriptionService subscriptionService;
    private final PostService postService;
    private final UserRepository userRepository;

    public AdminController(
            SubscriptionService subscriptionService,
            PostService postService,
            UserRepository userRepository
    ) {
        this.subscriptionService = subscriptionService;
        this.postService = postService;
        this.userRepository = userRepository;
    }

    @GetMapping("/stats")
    public ApiResponse<AdminDashboardStats> getStats() {
        long totalRevenue = subscriptionService.getTotalRevenue() != null ? subscriptionService.getTotalRevenue() : 0L;
        long totalTransactions = subscriptionService.getSuccessfulPaymentsCount();
        long totalArticles = postService.countTotalArticles();
        long premiumArticles = postService.countPremiumArticles();
        long totalUsers = userRepository.count();
        long proUsers = userRepository.countBySubscriptionTier(SubscriptionTier.PRO);
        long vipUsers = userRepository.countBySubscriptionTier(SubscriptionTier.VIP);

        AdminDashboardStats stats = new AdminDashboardStats(
                totalRevenue,
                totalRevenue, // Current monthly estimation
                totalArticles,
                premiumArticles,
                totalUsers,
                proUsers,
                vipUsers,
                totalTransactions
        );

        return ApiResponse.ok(stats);
    }

    @GetMapping("/transactions")
    public ApiResponse<List<PaymentTransactionDto>> getAllTransactions() {
        return ApiResponse.ok(subscriptionService.getAllTransactions());
    }

    @GetMapping("/users")
    public ApiResponse<List<User>> getAllUsers() {
        return ApiResponse.ok(userRepository.findAll());
    }
}
