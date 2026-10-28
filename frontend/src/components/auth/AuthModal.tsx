import React, { useState } from 'react';
import { X, Lock, Mail, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../../types/auth';
import { loginWithSupabase, registerWithSupabase } from '../../services/authService';
import { EsportsLogo } from '../common/EsportsLogo';

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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
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
        setErrorMsg(res.error || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } else {
      const res = await loginWithSupabase(email, password);
      setLoading(false);
      if (res.user) {
        onSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.error || 'Sai thông tin email hoặc mật khẩu.');
      }
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail('admin@esportspulse.vn');
    setPassword('123456');
    setErrorMsg(null);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 8, 15, 0.88)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: 440,
          width: '100%',
          padding: '36px 32px',
          position: 'relative',
          backgroundColor: '#0c101d',
          border: '1px solid rgba(56, 189, 248, 0.28)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(0, 242, 254, 0.15)',
          borderRadius: 16,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: 'var(--text-muted)',
            borderRadius: 8,
            padding: 6,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <X size={18} />
        </button>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ display: 'inline-block', marginBottom: 16 }}>
            <EsportsLogo size="lg" showText={true} showSubtitle={true} animated={true} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', letterSpacing: '0.02em', marginTop: 4 }}>
            {isRegister ? 'Tạo Tài Khoản EsportsPulse' : 'Đăng Nhập Hệ Thống'}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            {isRegister
              ? 'Tham gia cộng đồng phân tích & nhận định AI esports hàng đầu'
              : 'Truy cập dữ liệu phân tích cấm chọn và tỷ số trận đấu thời gian thực'}
          </p>
        </div>

        {/* Segmented Tab Controls */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: 4,
            borderRadius: 10,
            border: '1px solid var(--border-color)',
            marginBottom: 20,
          }}
        >
          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setErrorMsg(null);
            }}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: !isRegister ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(56, 189, 248, 0.15))' : 'transparent',
              color: !isRegister ? '#fff' : 'var(--text-secondary)',
              fontWeight: !isRegister ? 800 : 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: !isRegister ? '0 0 15px rgba(0, 242, 254, 0.2)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Đăng Nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegister(true);
              setErrorMsg(null);
            }}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: isRegister ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(56, 189, 248, 0.15))' : 'transparent',
              color: isRegister ? '#fff' : 'var(--text-secondary)',
              fontWeight: isRegister ? 800 : 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: isRegister ? '0 0 15px rgba(0, 242, 254, 0.2)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Đăng Ký
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: 8,
              padding: '10px 14px',
              color: '#f87171',
              fontSize: '0.82rem',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: '1rem' }}>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Real Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {isRegister && (
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
                HỌ VÀ TÊN
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: 12 }} />
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 40px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '0.88rem',
                    outline: 'none',
                    transition: 'border 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 5 }}>
              ĐỊA CHỈ EMAIL
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: 12 }} />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 40px',
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  transition: 'border 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                MẬT KHẨU
              </label>
              {!isRegister && (
                <span
                  style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', cursor: 'pointer' }}
                  onClick={() => alert('Vui lòng liên hệ ban quản trị EsportsPulse để đặt lại mật khẩu.')}
                >
                  Quên mật khẩu?
                </span>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: 12 }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 40px',
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  transition: 'border 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 10,
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 2,
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          {!isRegister && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: -2 }}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ cursor: 'pointer', accentColor: 'var(--accent-cyan)' }}
              />
              <label htmlFor="rememberMe" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                Ghi nhớ phiên đăng nhập này
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: 6,
              padding: '12px',
              fontSize: '0.92rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #00f2fe 0%, #0284c7 100%)',
              boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
            }}
          >
            {loading ? 'Đang Xác Thực...' : isRegister ? 'Tạo Tài Khoản Ngay' : 'Đăng Nhập Vào Hệ Thống'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: 12 }}>
          <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.06em' }}>
            HOẶC TIẾP TỤC VỚI
          </span>
          <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />
        </div>

        {/* Social / Gamer Single Sign-on */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button
            type="button"
            onClick={() => alert('Cổng liên kết Riot Games ID sẽ khả dụng trong phiên bản giải đấu.')}
            style={{
              background: 'rgba(235, 0, 41, 0.1)',
              border: '1px solid rgba(235, 0, 41, 0.3)',
              color: '#ff4d6d',
              padding: '8px 12px',
              borderRadius: 8,
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 0.2s',
            }}
          >
            <ShieldCheck size={14} />
            <span>Riot Games ID</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Cổng đăng nhập Google OAuth đang được cấu hình trên môi trường chính thức.')}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              padding: '8px 12px',
              borderRadius: 8,
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 0.2s',
            }}
          >
            <span>Google</span>
          </button>
        </div>

        {/* Subtle Local Evaluation Helper (Discreet, for Admin inspection) */}
        <div
          style={{
            marginTop: 20,
            padding: '8px 12px',
            borderRadius: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px dashed rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>Tài khoản kiểm thử (Local): <strong>admin@esportspulse.vn</strong></span>
          <button
            type="button"
            onClick={handleFillDemoAdmin}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-cyan)',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            Tự điền
          </button>
        </div>
      </div>
    </div>
  );
};
