package com.example.esportsBLOG.modules.subscription.service;

import com.example.esportsBLOG.entity.*;
import com.example.esportsBLOG.modules.subscription.dto.CheckoutRequest;
import com.example.esportsBLOG.modules.subscription.dto.PaymentTransactionDto;
import com.example.esportsBLOG.modules.subscription.dto.SubscriptionPlanDto;
import com.example.esportsBLOG.repository.PaymentRepository;
import com.example.esportsBLOG.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@Transactional
public class SubscriptionService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final Random random = new Random();

    public SubscriptionService(PaymentRepository paymentRepository, UserRepository userRepository) {
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
    }

    public List<SubscriptionPlanDto> getAvailablePlans() {
        return List.of(
                new SubscriptionPlanDto(
                        SubscriptionTier.FREE,
                        "Miễn Phí",
                        0L,
                        0L,
                        "Cơ Bản",
                        "Phù hợp cho người hâm mộ theo dõi kết quả giải đấu",
                        List.of("Xem tỷ số trận đấu thời gian thực", "Đọc các bài viết phân tích cơ bản", "Bình chọn cộng đồng trước trận", "Thông báo lịch thi đấu"),
                        false
                ),
                new SubscriptionPlanDto(
                        SubscriptionTier.PRO,
                        "Pro Gamer",
                        99000L,
                        950000L,
                        "Phổ Biến Nhất",
                        "Dành cho game thủ muốn nắm sâu meta và phong độ tuyển thủ",
                        List.of("Mở khóa toàn bộ bài viết phân tích", "Chỉ số tuyển thủ & chiến thuật nâng cao", "Huy hiệu Pro Gamer trên diễn đàn", "Hỗ trợ ưu tiên 24/7"),
                        true
                ),
                new SubscriptionPlanDto(
                        SubscriptionTier.VIP,
                        "VIP Analyst",
                        199000L,
                        1900000L,
                        "Cao Cấp Nhất",
                        "Bộ công cụ dự đoán AI chuẩn xác và nhận định độc quyền",
                        List.of("Dự đoán AI xác suất real-time độc quyền", "Phân tích cấm chọn (Ban/Pick) chuyên sâu", "Tín hiệu kèo & nhận định từ chuyên gia hàng đầu", "Nhóm kín Discord / Telegram VIP"),
                        false
                )
        );
    }

    public PaymentTransactionDto processCheckout(CheckoutRequest req) {
        String code = "ESP-" + req.planTier() + "-" + (100000 + random.nextInt(900000));

        PaymentTransaction transaction = PaymentTransaction.builder()
                .transactionCode(code)
                .userEmail(req.userEmail())
                .planTier(req.planTier())
                .amount(req.amount())
                .paymentMethod(req.paymentMethod())
                .status(PaymentStatus.COMPLETED)
                .createdAt(LocalDateTime.now())
                .build();

        PaymentTransaction saved = paymentRepository.save(transaction);

        // If user id is provided or can be found by email, upgrade user subscription tier
        if (req.userId() != null) {
            userRepository.findById(req.userId()).ifPresent(user -> {
                user.setSubscriptionTier(req.planTier());
                user.setSubscriptionExpiresAt(LocalDateTime.now().plusMonths(1));
                userRepository.save(user);
            });
        }

        return toDto(saved);
    }

    @Transactional(readOnly = true)
    public List<PaymentTransactionDto> getUserTransactions(String email) {
        return paymentRepository.findByUserEmailOrderByCreatedAtDesc(email)
                .stream().map(this::toDto).toList();
    }

    @Transactional(readOnly = true)
    public List<PaymentTransactionDto> getAllTransactions() {
        return paymentRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(this::toDto).toList();
    }

    @Transactional(readOnly = true)
    public Long getTotalRevenue() {
        return paymentRepository.calculateTotalRevenue();
    }

    @Transactional(readOnly = true)
    public Long getSuccessfulPaymentsCount() {
        return paymentRepository.countSuccessfulPayments();
    }

    private PaymentTransactionDto toDto(PaymentTransaction p) {
        return new PaymentTransactionDto(
                p.getId(),
                p.getTransactionCode(),
                p.getUserEmail(),
                p.getPlanTier(),
                p.getAmount(),
                p.getPaymentMethod(),
                p.getStatus(),
                p.getCreatedAt()
        );
    }
}
