import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles } from 'lucide-react';
import { UserProfile } from '../../types/auth';
import { loginWithDemo, loginWithSupabase, registerWithSupabase } from '../../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    if (isRegister) {
      if (!fullName) {
        setErrorMsg('Vui lòng nhập họ và tên của bạn.');
        setLoading(false);
        return;
      }
      const res = await registerWithSupabase(email, password, fullName);
      setLoading(false);
      if (res.user) {
        onSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.error || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } else {
      const res = await loginWithSupabase(email, password);
      setLoading(false);
      if (res.user) {
        onSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.error || 'Sai thông tin đăng nhập hoặc tài khoản chưa kích hoạt.');
      }
    }
  };

  const handleDemoSelect = (type: 'admin' | 'vip' | 'pro' | 'free') => {
    const user = loginWithDemo(type);
    onSuccess(user);
    onClose();
  };

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
        maxWidth: 460,
        width: '100%',
        padding: 30,
        position: 'relative',
        backgroundColor: '#0c101c',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.2)',
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
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

        {/* Modal Title */}
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #00f2fe, #7928ca)',
            marginBottom: 12,
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
          }}>
            <Lock size={22} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.02em' }}>
            {isRegister ? 'Tạo Tài Khoản Mới' : 'Đăng Nhập EsportsPulse'}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Truy cập phân tích trận đấu & nhận định AI thời gian thực
          </p>
        </div>

        {/* Quick Demo Accounts Selection */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-color)',
          borderRadius: 10,
          padding: 12,
          marginBottom: 20,
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={14} />
            <span>TÀI KHOẢN TRẢI NGHIỆM NHANH (MỘT CHẠM):</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            <button
              type="button"
              onClick={() => handleDemoSelect('admin')}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                padding: '6px 8px',
                borderRadius: 6,
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              👑 Admin Quản Trị
            </button>
            <button
              type="button"
              onClick={() => handleDemoSelect('vip')}
              style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: '#fbbf24',
                padding: '6px 8px',
                borderRadius: 6,
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ⭐ Hội Viên VIP
            </button>
            <button
              type="button"
              onClick={() => handleDemoSelect('pro')}
              style={{
                background: 'rgba(168, 85, 247, 0.15)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                color: '#c084fc',
                padding: '6px 8px',
                borderRadius: 6,
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ⚡ Hội Viên PRO
            </button>
            <button
              type="button"
              onClick={() => handleDemoSelect('free')}
              style={{
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                color: '#38bdf8',
                padding: '6px 8px',
                borderRadius: 6,
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              👤 Người Dùng FREE
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '14px 0', gap: 10 }}>
          <div style={{ flex: 1, height: 1, backgroundColor: 'var(--border-color)' }}></div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>HOẶC DÙNG SUPABASE AUTH</span>
          <div style={{ flex: 1, height: 1, backgroundColor: 'var(--border-color)' }}></div>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 8,
            padding: '8px 12px',
            color: '#f87171',
            fontSize: '0.8rem',
            marginBottom: 14,
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {isRegister && (
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                Họ và Tên
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: 12 }} />
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: 12 }} />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
              Mật khẩu
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: 12 }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}
          >
            {loading ? 'Đang Xử Lý...' : isRegister ? 'Tạo Tài Khoản Ngay' : 'Đăng Nhập'}
          </button>
        </form>

        <div style={{ marginTop: 18, textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}
          {' '}
          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setErrorMsg(null); }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-cyan)',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {isRegister ? 'Đăng nhập ngay' : 'Đăng ký miễn phí'}
          </button>
        </div>
      </div>
    </div>
  );
};
