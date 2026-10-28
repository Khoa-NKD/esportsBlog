import React, { useState, useEffect } from 'react';
import { SubscriptionPlan, PaymentMethod, PaymentTransaction } from '../../types/plan';
import { UserProfile, SubscriptionTier } from '../../types/auth';
import { processPayment } from '../../services/subscriptionService';
import { X, QrCode, Smartphone, CreditCard, ShieldCheck, CheckCircle2, Clock, Copy, ArrowRight, Lock } from 'lucide-react';

interface CheckoutModalProps {
  plan: SubscriptionPlan | null;
  user: UserProfile | null;
  onClose: () => void;
  onPaymentSuccess: (updatedUserTier: SubscriptionTier, txn: PaymentTransaction) => void;
  onOpenLogin: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  plan,
  user,
  onClose,
  onPaymentSuccess,
  onOpenLogin,
}) => {
  const [method, setMethod] = useState<PaymentMethod>('VIETQR');
  const [timeLeft, setTimeLeft] = useState(899); // 15 mins
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState<PaymentTransaction | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!plan || receipt) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [plan, receipt]);

  if (!plan) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const amount = plan.priceMonthly;
  const transactionCode = `ESP-${plan.id}-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(transactionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = async () => {
    if (!user) {
      onOpenLogin();
      return;
    }
    setProcessing(true);
    const res = await processPayment({
      userId: user.id,
      userEmail: user.email,
      planId: plan.id,
      amount,
      paymentMethod: method,
    });
    setProcessing(false);
    if (res.success) {
      setReceipt(res.transaction);
      onPaymentSuccess(plan.id, res.transaction);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(5, 8, 15, 0.88)',
      backdropFilter: 'blur(14px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: 16,
    }}>
      <div className="glass-panel" style={{
        maxWidth: 620,
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        position: 'relative',
        backgroundColor: '#0c101c',
        border: '1px solid rgba(56, 189, 248, 0.4)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(56, 189, 248, 0.2)',
        padding: 28,
        borderRadius: 16,
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: 'var(--text-muted)',
            borderRadius: 8,
            padding: 6,
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {/* AUTH GUARD: If user is not logged in, block payment completely */}
        {!user ? (
          <div style={{ textAlign: 'center', padding: '24px 12px' }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.15))',
              border: '2px solid rgba(245, 158, 11, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              color: '#fbbf24',
              boxShadow: '0 0 25px rgba(245, 158, 11, 0.3)',
            }}>
              <Lock size={30} />
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#fbbf24',
              fontSize: '0.82rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 8,
            }}>
              <ShieldCheck size={16} />
              <span>YÊU CẦU XÁC THỰC TÀI KHOẢN</span>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: 12 }}>
              Bạn Cần Đăng Nhập Để Nâng Cấp Gói
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: 480, margin: '0 auto 24px', lineHeight: 1.6 }}>
              Để kích hoạt và bảo lưu quyền lợi gói <strong>{plan.name}</strong> ({amount.toLocaleString('vi-VN')} đ/tháng), bạn cần có tài khoản thành viên trên hệ thống. Khách vãng lai chưa đăng nhập không thể thực hiện giao dịch thanh toán.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
              <button
                type="button"
                onClick={onClose}
                className="btn-outline"
                style={{ padding: '10px 22px' }}
              >
                Để Sau
              </button>
              <button
                type="button"
                onClick={onOpenLogin}
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #00f2fe 0%, #0284c7 100%)',
                  padding: '10px 26px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                }}
              >
                <span>Đăng Nhập / Đăng Ký Ngay</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : !receipt ? (
          <>
            {/* Header */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 800 }}>
                <ShieldCheck size={16} />
                <span>CỔNG THANH TOÁN AN TOÀN ESPORTSPULSE</span>
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: 4 }}>
                Nâng Cấp {plan.name}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Số tiền thanh toán: <strong style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem' }}>{amount.toLocaleString('vi-VN')} đ</strong> (30 ngày sử dụng)
              </p>
            </div>

            {/* Verified User Identity Banner */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '10px 14px',
              borderRadius: 8,
              fontSize: '0.82rem',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                  alt=""
                  style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid #10b981' }}
                />
                <div>
                  <div style={{ fontWeight: 800, color: '#fff' }}>
                    Tài khoản thụ hưởng: {user.fullName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#10b981' }}>
                    {user.email} • Gói hiện tại: {user.subscriptionTier}
                  </div>
                </div>
              </div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#34d399',
                padding: '3px 8px',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}>
                <CheckCircle2 size={12} />
                <span>Đã Xác Thực</span>
              </span>
            </div>

            {/* Payment Method Selector */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10 }}>
                CHỌN PHƯƠNG THỨC THANH TOÁN:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setMethod('VIETQR')}
                  style={{
                    background: method === 'VIETQR' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: method === 'VIETQR' ? '2px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                    padding: '12px 8px',
                    borderRadius: 10,
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    cursor: 'pointer',
                  }}
                >
                  <QrCode size={20} color="var(--accent-cyan)" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Chuyển Khoản VietQR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('MOMO')}
                  style={{
                    background: method === 'MOMO' ? 'rgba(236, 72, 153, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: method === 'MOMO' ? '2px solid #ec4899' : '1px solid var(--border-color)',
                    padding: '12px 8px',
                    borderRadius: 10,
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    cursor: 'pointer',
                  }}
                >
                  <Smartphone size={20} color="#ec4899" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Ví MoMo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('VNPAY')}
                  style={{
                    background: method === 'VNPAY' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: method === 'VNPAY' ? '2px solid #3b82f6' : '1px solid var(--border-color)',
                    padding: '12px 8px',
                    borderRadius: 10,
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    cursor: 'pointer',
                  }}
                >
                  <CreditCard size={20} color="#3b82f6" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>VNPAY / ATM</span>
                </button>
              </div>
            </div>

            {/* Payment Details Container */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: 12,
              padding: 18,
              marginBottom: 20,
            }}>
              {/* VietQR View */}
              {method === 'VIETQR' && (
                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 18, alignItems: 'center' }}>
                  <div style={{
                    background: '#fff',
                    padding: 8,
                    borderRadius: 8,
                    textAlign: 'center',
                  }}>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=2|99|098765432199|ESPORTSPULSE|${amount}|${transactionCode}`}
                      alt="VietQR Mã Thanh Toán"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                    <div style={{ fontSize: '0.65rem', color: '#333', fontWeight: 800, marginTop: 4 }}>
                      QUÉT MÃ VIETQR
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.82rem' }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Ngân hàng thụ hưởng:</div>
                      <div style={{ fontWeight: 700 }}>MBBank (Ngân Hàng Quân Đội)</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Chủ tài khoản:</div>
                      <div style={{ fontWeight: 700 }}>CTY TNHH ESPORTSPULSE VIETNAM</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Số tài khoản:</div>
                      <div style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>0987 6543 2199</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>Nội dung chuyển khoản (bắt buộc):</div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        background: 'rgba(0, 0, 0, 0.4)',
                        padding: '4px 8px',
                        borderRadius: 6,
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                      }}>
                        <code style={{ color: '#fbbf24', fontWeight: 800 }}>{transactionCode}</code>
                        <button
                          type="button"
                          onClick={handleCopyCode}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: copied ? '#10b981' : 'var(--text-muted)',
                            cursor: 'pointer',
                          }}
                        >
                          <Copy size={14} />
                        </button>
                        {copied && <span style={{ fontSize: '0.7rem', color: '#10b981' }}>Đã chép!</span>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MoMo / VNPay notice */}
              {method !== 'VIETQR' && (
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <Smartphone size={36} color={method === 'MOMO' ? '#ec4899' : '#3b82f6'} style={{ margin: '0 auto 10px' }} />
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    Cổng thanh toán {method === 'MOMO' ? 'Ví MoMo' : 'VNPAY'} đã sẵn sàng.
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Bấm xác nhận bên dưới để giả lập hoàn tất giao dịch tự động qua webhook.
                  </p>
                </div>
              )}
            </div>

            {/* Countdown timer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              marginBottom: 18,
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={14} color="#f43f5e" />
                Thời gian thanh toán còn lại: <strong style={{ color: '#f43f5e' }}>{timeFormatted}</strong>
              </span>
              <span>Trạng thái: <strong style={{ color: '#fbbf24' }}>Chờ chuyển khoản</strong></span>
            </div>

            {/* Action Simulation Button */}
            <button
              onClick={handleSimulatePayment}
              disabled={processing}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                fontSize: '0.95rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
              }}
            >
              {processing ? 'Đang Xử Lý Giao Dịch...' : '✓ Xác Nhận Đã Chuyển Khoản Thành Công'}
            </button>
          </>
        ) : (
          /* Receipt Screen */
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <CheckCircle2 size={32} color="#10b981" />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
              Thanh Toán Thành Công!
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
              Chúc mừng bạn đã nâng cấp thành công lên <strong>{receipt.planName}</strong>. Toàn bộ tính năng phân tích chuyên sâu đã được mở khóa!
            </p>

            {/* Invoice card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: 12,
              padding: 18,
              textAlign: 'left',
              fontSize: '0.85rem',
              marginBottom: 24,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ color: 'var(--text-muted)' }}>Mã hóa đơn:</span>
                <strong style={{ color: 'var(--accent-cyan)' }}>{receipt.transactionCode}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ color: 'var(--text-muted)' }}>Tài khoản kích hoạt:</span>
                <strong style={{ color: '#fff' }}>{user?.email || receipt.userEmail}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ color: 'var(--text-muted)' }}>Gói dịch vụ:</span>
                <strong>{receipt.planName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ color: 'var(--text-muted)' }}>Số tiền:</span>
                <strong style={{ color: '#10b981' }}>{receipt.amount.toLocaleString('vi-VN')} đ</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ color: 'var(--text-muted)' }}>Phương thức:</span>
                <span>{receipt.paymentMethod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Thời gian:</span>
                <span>{new Date(receipt.createdAt).toLocaleString('vi-VN')}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Bắt Đầu Trải Nghiệm Ngay</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
