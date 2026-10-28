import React from 'react';
import { Article } from '../../types/article';
import { UserProfile } from '../../types/auth';
import { X, Lock, CheckCircle2, Clock, Eye, Crown, ArrowRight, ShieldCheck } from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article | null;
  user: UserProfile | null;
  onClose: () => void;
  onUpgradeClick: () => void;
  onLoginClick: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  user,
  onClose,
  onUpgradeClick,
  onLoginClick,
}) => {
  if (!article) return null;

  const isUserPremium = user && (user.subscriptionTier === 'PRO' || user.subscriptionTier === 'VIP' || user.role === 'ADMIN');
  const isLocked = article.isPremium && !isUserPremium;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: 16,
    }}>
      <div className="glass-panel" style={{
        maxWidth: 780,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        backgroundColor: '#0c101c',
        border: article.isPremium ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-color)',
        boxShadow: article.isPremium
          ? '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(245, 158, 11, 0.15)'
          : '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.15)',
        borderRadius: 16,
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 8,
            padding: 8,
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {/* Cover Image Header */}
        <div style={{ position: 'relative', height: 260, width: '100%' }}>
          <img
            src={article.coverImage}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #0c101c 0%, rgba(12, 16, 28, 0.4) 60%, transparent 100%)',
          }}></div>

          <div style={{ position: 'absolute', bottom: 16, left: 24, right: 24, display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{
              backgroundColor: 'rgba(0, 242, 254, 0.2)',
              color: 'var(--accent-cyan)',
              border: '1px solid var(--accent-cyan)',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: 6,
            }}>
              {article.gameTag}
            </span>

            {article.isPremium ? (
              <span style={{
                backgroundColor: 'rgba(245, 158, 11, 0.9)',
                color: '#000',
                fontSize: '0.75rem',
                fontWeight: 900,
                padding: '4px 12px',
                borderRadius: 6,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                boxShadow: '0 0 15px rgba(245, 158, 11, 0.6)',
              }}>
                <Crown size={14} />
                <span>NỘI DUNG VIP CHUYÊN SÂU</span>
              </span>
            ) : (
              <span style={{
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                color: '#10b981',
                border: '1px solid #10b981',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: 6,
              }}>
                BÀI VIẾT MIỄN PHÍ
              </span>
            )}
          </div>
        </div>

        {/* Article Body */}
        <div style={{ padding: '24px 28px' }}>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.8rem',
            fontWeight: 800,
            lineHeight: 1.25,
            marginBottom: 14,
            color: '#fff',
          }}>
            {article.title}
          </h1>

          {/* Author and meta info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: 16,
            marginBottom: 20,
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={16} color="var(--accent-cyan)" />
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{article.authorName}</span>
              <span>• Chuyên gia phân tích thể thao điện tử</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={14} />
                {article.readTime}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Eye size={14} />
                {article.viewsCount.toLocaleString()} lượt đọc
              </span>
            </div>
          </div>

          {/* Excerpt Lead */}
          <div style={{
            background: 'rgba(56, 189, 248, 0.05)',
            borderLeft: '4px solid var(--accent-cyan)',
            padding: '12px 16px',
            borderRadius: '0 8px 8px 0',
            fontSize: '0.92rem',
            color: '#bae6fd',
            marginBottom: 24,
            lineHeight: 1.6,
          }}>
            {article.excerpt}
          </div>

          {/* Article Main Content (Free or Unlocked) */}
          {!isLocked ? (
            <div style={{
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: 'var(--text-primary)',
              whiteSpace: 'pre-line',
            }}>
              {article.content}

              {article.isPremium && (
                <div style={{
                  marginTop: 24,
                  padding: 16,
                  borderRadius: 10,
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <ShieldCheck size={24} color="var(--accent-gold)" />
                  <div style={{ fontSize: '0.85rem' }}>
                    <strong style={{ color: 'var(--accent-gold)' }}>Xác thực hội viên:</strong> Bạn đang xem bài viết này dưới quyền lợi gói{' '}
                    <strong>{user?.subscriptionTier}</strong>. Dữ liệu được bảo mật và cập nhật real-time từ hệ thống AI.
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Locked Paywall Teaser for Free Users */
            <div style={{ position: 'relative', marginTop: 10 }}>
              {/* Blurred Preview lines */}
              <div style={{
                filter: 'blur(5px)',
                userSelect: 'none',
                opacity: 0.4,
                lineHeight: 1.8,
                fontSize: '0.95rem',
                maxHeight: 160,
                overflow: 'hidden',
              }}>
                {article.content}
                <p>Nội dung phân tích sâu ban pick ván 1, ván 2, ván 3...</p>
                <p>Thống kê chi tiết tỷ lệ thắng theo từng round súng lục và round mua giáp...</p>
              </div>

              {/* Paywall Overlay Box */}
              <div style={{
                position: 'relative',
                marginTop: -80,
                borderRadius: 14,
                background: 'linear-gradient(180deg, rgba(12, 16, 28, 0.8) 0%, #0c101c 90%)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                padding: '30px 24px',
                textAlign: 'center',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.9), 0 0 30px rgba(245, 158, 11, 0.15)',
              }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.2))',
                  border: '1px solid #f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
                }}>
                  <Lock size={24} color="#fbbf24" />
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                  Nội Dung Dành Riêng Cho Hội Viên PRO & VIP
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 20px', lineHeight: 1.6 }}>
                  Bạn đang ở gói <strong>Hội Viên Cơ Bản</strong>. Hãy nâng cấp lên gói <strong>Pro Gamer</strong> hoặc <strong>VIP Analyst</strong> để mở khóa toàn bộ bài viết nhận định, bảng phân tích cấm chọn và tín hiệu AI nhận định kèo sớm.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { onClose(); onUpgradeClick(); }}
                    className="btn-primary"
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: '#000',
                      padding: '10px 24px',
                      fontSize: '0.95rem',
                    }}
                  >
                    <Crown size={18} />
                    <span>Nâng Cấp Gói Ngay (Từ 99.000đ/tháng)</span>
                    <ArrowRight size={16} />
                  </button>

                  {!user && (
                    <button
                      onClick={() => { onClose(); onLoginClick(); }}
                      className="btn-outline"
                      style={{ padding: '10px 20px' }}
                    >
                      <span>Đã có tài khoản VIP? Đăng nhập</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
