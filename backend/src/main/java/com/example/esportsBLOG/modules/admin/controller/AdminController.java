package com.example.esportsBLOG.modules.admin.controller;

import com.example.esportsBLOG.common.ApiResponse;
import com.example.esportsBLOG.entity.SubscriptionTier;
import com.example.esportsBLOG.entity.User;
import com.example.esportsBLOG.modules.admin.dto.AdminDashboardStats;
import com.example.esportsBLOG.modules.subscription.dto.PaymentTransactionDto;
import com.example.esportsBLOG.modules.subscription.service.SubscriptionService;
import com.example.esportsBLOG.repository.UserRepository;
import com.example.esportsBLOG.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ApiResponse<AdminDashboardStats>> getStats(
            @RequestHeader(value = "X-User-Role", required = false, defaultValue = "USER") String userRole
    ) {
        if (!"ADMIN".equalsIgnoreCase(userRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Truy cập bị từ chối: Yêu cầu quyền ADMIN."));
        }

        long totalRevenue = subscriptionService.getTotalRevenue() != null ? subscriptionService.getTotalRevenue() : 0L;
        long totalTransactions = subscriptionService.getSuccessfulPaymentsCount();
        long totalArticles = postService.countTotalArticles();
        long premiumArticles = postService.countPremiumArticles();
        long totalUsers = userRepository.count();
        long proUsers = userRepository.countBySubscriptionTier(SubscriptionTier.PRO);
        long vipUsers = userRepository.countBySubscriptionTier(SubscriptionTier.VIP);

        AdminDashboardStats stats = new AdminDashboardStats(
                totalRevenue,
                totalRevenue,
                totalArticles,
                premiumArticles,
                totalUsers,
                proUsers,
                vipUsers,
                totalTransactions
        );

        return ResponseEntity.ok(ApiResponse.ok(stats));
    }

    @GetMapping("/transactions")
    public ResponseEntity<ApiResponse<List<PaymentTransactionDto>>> getAllTransactions(
            @RequestHeader(value = "X-User-Role", required = false, defaultValue = "USER") String userRole
    ) {
        if (!"ADMIN".equalsIgnoreCase(userRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Truy cập bị từ chối: Yêu cầu quyền ADMIN."));
        }
        return ResponseEntity.ok(ApiResponse.ok(subscriptionService.getAllTransactions()));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers(
            @RequestHeader(value = "X-User-Role", required = false, defaultValue = "USER") String userRole
    ) {
        if (!"ADMIN".equalsIgnoreCase(userRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Truy cập bị từ chối: Yêu cầu quyền ADMIN."));
        }
        return ResponseEntity.ok(ApiResponse.ok(userRepository.findAll()));
    }
}
