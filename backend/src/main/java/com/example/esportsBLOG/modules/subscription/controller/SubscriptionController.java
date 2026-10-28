package com.example.esportsBLOG.modules.subscription.controller;

import com.example.esportsBLOG.common.ApiResponse;
import com.example.esportsBLOG.modules.subscription.dto.CheckoutRequest;
import com.example.esportsBLOG.modules.subscription.dto.PaymentTransactionDto;
import com.example.esportsBLOG.modules.subscription.dto.SubscriptionPlanDto;
import com.example.esportsBLOG.modules.subscription.service.SubscriptionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(origins = "*")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/plans")
    public ApiResponse<List<SubscriptionPlanDto>> getPlans() {
        return ApiResponse.ok(subscriptionService.getAvailablePlans());
    }

    @PostMapping("/checkout")
    public ApiResponse<PaymentTransactionDto> checkout(@Valid @RequestBody CheckoutRequest request) {
        PaymentTransactionDto txn = subscriptionService.processCheckout(request);
        return ApiResponse.ok("Thanh toán thành công! Gói hội viên đã được kích hoạt.", txn);
    }

    @GetMapping("/history")
    public ApiResponse<List<PaymentTransactionDto>> getUserHistory(@RequestParam String email) {
        return ApiResponse.ok(subscriptionService.getUserTransactions(email));
    }
}
