import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '../../services/subscriptionService';
import { SubscriptionPlan } from '../../types/plan';
import { UserProfile } from '../../types/auth';
import { Check, Crown, Zap, Shield, Sparkles } from 'lucide-react';

interface PricingSectionProps {
  user: UserProfile | null;
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ user, onSelectPlan }) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 0' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: 'var(--accent-gold)',
          fontSize: '0.85rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          <Crown size={18} />
          <span>MỞ KHÓA TOÀN BỘ SỨC MẠNH PHÂN TÍCH ESPORTS</span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2.4rem',
          fontWeight: 900,
          letterSpacing: '0.02em',
          marginBottom: 10,
        }}>
          CHỌN GÓI HỘI VIÊN PHÙ HỢP VỚI BẠN
        </h2>

        <p style={{ color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto', fontSize: '0.95rem' }}>
          Đọc bài viết phân tích ban-pick độc quyền, nhận tín hiệu AI nhận định kèo sớm trước 2 tiếng và tham gia cộng đồng VIP.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          marginTop: 24,
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '6px 14px',
          borderRadius: 999,
          border: '1px solid var(--border-color)',
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: !isYearly ? 700 : 500, color: !isYearly ? '#fff' : 'var(--text-muted)' }}>
            Theo Tháng
          </span>

          <button
            type="button"
            onClick={() => setIsYearly(!isYearly)}
            style={{
              width: 48,
              height: 24,
              borderRadius: 12,
              background: isYearly ? 'var(--accent-cyan)' : '#334155',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.3s ease',
            }}
          >
            <div style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#0a0e17',
              position: 'absolute',
              top: 3,
              left: isYearly ? 27 : 3,
              transition: 'left 0.25s ease',
            }}></div>
          </button>

          <span style={{ fontSize: '0.85rem', fontWeight: isYearly ? 700 : 500, color: isYearly ? '#fff' : 'var(--text-muted)' }}>
            Theo Năm
          </span>

          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            background: 'rgba(245, 158, 11, 0.2)',
            color: '#fbbf24',
            padding: '2px 8px',
            borderRadius: 6,
          }}>
            Tiết kiệm 20%
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24,
        alignItems: 'stretch',
      }}>
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrentPlan = user?.subscriptionTier === plan.id;
          const price = isYearly ? plan.priceYearly : plan.priceMonthly;
          const isVip = plan.id === 'VIP';
          const isPro = plan.id === 'PRO';

          return (
            <div
              key={plan.id}
              className="glass-panel"
              style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderRadius: 16,
                backgroundColor: isVip
                  ? 'rgba(18, 17, 10, 0.85)'
                  : isPro
                  ? 'rgba(12, 19, 31, 0.85)'
                  : 'rgba(17, 24, 39, 0.6)',
                border: isVip
                  ? '2px solid rgba(245, 158, 11, 0.5)'
                  : isPro
                  ? '2px solid rgba(56, 189, 248, 0.5)'
                  : '1px solid var(--border-color)',
                boxShadow: isVip
                  ? '0 0 35px rgba(245, 158, 11, 0.15)'
                  : isPro
                  ? '0 0 35px rgba(56, 189, 248, 0.15)'
                  : 'none',
              }}
            >
              {/* Highlight ribbon */}
              {plan.highlightText && (
                <div style={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: isVip
                    ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                    : 'linear-gradient(90deg, #00f2fe, #0072ff)',
                  color: isVip ? '#000' : '#fff',
                  fontWeight: 900,
                  fontSize: '0.75rem',
                  padding: '4px 14px',
                  borderRadius: 999,
                  letterSpacing: '0.04em',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
                }}>
                  {plan.highlightText}
                </div>
              )}

              {/* Plan Title & Icon */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{plan.name}</h3>
                {isVip ? (
                  <Crown size={24} color="var(--accent-gold)" />
                ) : isPro ? (
                  <Zap size={24} color="var(--accent-cyan)" />
                ) : (
                  <Shield size={24} color="var(--text-muted)" />
                )}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', minHeight: 40, lineHeight: 1.5, marginBottom: 20 }}>
                {plan.description}
              </p>

              {/* Price display */}
              <div style={{ marginBottom: 24, borderBottom: '1px solid var(--border-color)', paddingBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{
                    fontSize: '2.4rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-heading)',
                    color: isVip ? '#fbbf24' : isPro ? 'var(--accent-cyan)' : '#fff',
                  }}>
                    {price === 0 ? 'MIỄN PHÍ' : price.toLocaleString('vi-VN')}
                  </span>
                  {price > 0 && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      đ / {isYearly ? 'năm' : 'tháng'}
                    </span>
                  )}
                </div>
              </div>

              {/* Features List */}
              <div style={{ flex: 1, marginBottom: 28 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 14 }}>
                  Quyền lợi bao gồm:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {plan.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.88rem' }}>
                      <div style={{
                        marginTop: 2,
                        minWidth: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: isVip ? 'rgba(245, 158, 11, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Check size={12} color={isVip ? '#fbbf24' : 'var(--accent-cyan)'} />
                      </div>
                      <span style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              {isCurrentPlan ? (
                <button
                  disabled
                  className="btn-outline"
                  style={{ width: '100%', justifyContent: 'center', opacity: 0.7, cursor: 'default' }}
                >
                  ✓ Gói Hiện Tại Của Bạn
                </button>
              ) : plan.id === 'FREE' ? (
                <button
                  disabled
                  className="btn-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Đăng Ký Miễn Phí
                </button>
              ) : (
                <button
                  onClick={() => onSelectPlan(plan)}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: isVip
                      ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                      : 'linear-gradient(135deg, #00f2fe, #0072ff)',
                    color: isVip ? '#000' : '#fff',
                    padding: '12px',
                    fontSize: '1rem',
                  }}
                >
                  <Sparkles size={18} />
                  <span>Nâng Cấp {plan.name}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
