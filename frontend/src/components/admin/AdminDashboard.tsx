import React, { useState, useEffect } from 'react';
import { Article } from '../../types/article';
import { UserProfile, UserRole, SubscriptionTier } from '../../types/auth';
import { PaymentTransaction } from '../../types/plan';
import { fetchAllPayments } from '../../services/subscriptionService';
import { createArticle, deleteArticle } from '../../services/articleService';
import { DollarSign, FileText, TrendingUp, Plus, Trash2, Crown, Sparkles, ArrowLeft, X, Lock, ShieldAlert, CheckCircle2, PenTool } from 'lucide-react';

interface AdminDashboardProps {
  articles: Article[];
  onRefreshArticles: () => void;
  onBackToApp: () => void;
  currentUser: UserProfile | null;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  articles,
  onRefreshArticles,
  onBackToApp,
  currentUser,
}) => {
  const isAdmin = currentUser?.role === 'ADMIN';
  const isAuthorized = currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'ANALYST');

  const [activeTab, setActiveTab] = useState<'METRICS' | 'POSTS' | 'USERS' | 'PAYMENTS'>(isAdmin ? 'METRICS' : 'POSTS');
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Sync default tab if role changes
  useEffect(() => {
    if (isAdmin) {
      setActiveTab('METRICS');
    } else {
      setActiveTab('POSTS');
    }
  }, [isAdmin]);

  // Form states for creating new article
  const [newTitle, setNewTitle] = useState('');
  const [newGameTag, setNewGameTag] = useState<'LOL' | 'VALORANT' | 'CS2' | 'AOV'>('VALORANT');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newIsPremium, setNewIsPremium] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample managed users
  const [managedUsers, setManagedUsers] = useState<UserProfile[]>([
    {
      id: 'usr-1',
      email: 'gamer_vietnam99@gmail.com',
      fullName: 'Phạm Minh Tuấn',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      role: 'USER',
      subscriptionTier: 'PRO',
      createdAt: '2026-10-15T08:00:00Z',
    },
    {
      id: 'usr-2',
      email: 'pro_trader_esport@yahoo.com',
      fullName: 'Đỗ Hùng Dũng',
      avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100',
      role: 'USER',
      subscriptionTier: 'VIP',
      createdAt: '2026-10-18T14:20:00Z',
    },
    {
      id: 'usr-3',
      email: 'faker_fanclub_vn@gmail.com',
      fullName: 'Ngô Thanh Tùng',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      role: 'USER',
      subscriptionTier: 'VIP',
      createdAt: '2026-10-20T19:30:00Z',
    },
    {
      id: 'usr-4',
      email: 'admin@esportspulse.vn',
      fullName: 'Lê Minh Khôi (Admin)',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      role: 'ADMIN',
      subscriptionTier: 'VIP',
      createdAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'usr-5',
      email: 'analyst_hoang@gmail.com',
      fullName: 'Hoàng Luân Analyst',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      role: 'ANALYST',
      subscriptionTier: 'VIP',
      createdAt: '2026-03-05T00:00:00Z',
    },
  ]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchAllPayments();
      setPayments(data);
    }
    loadData();
  }, []);

  // Compute metrics
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalSubscribers = managedUsers.filter((u) => u.subscriptionTier !== 'FREE').length;
  const totalArticles = articles.length;
  const premiumArticles = articles.filter((a) => a.isPremium).length;
  const conversionRate = Math.round((totalSubscribers / managedUsers.length) * 100);

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const slug = newTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 50);

    const ok = await createArticle({
      title: newTitle,
      slug: `${slug}-${Date.now().toString(36)}`,
      excerpt: newExcerpt,
      content: newContent,
      coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
      gameTag: newGameTag,
      authorName: currentUser?.fullName || 'Ban Biên Tập EsportsPulse',
      isPremium: newIsPremium,
      status: 'PUBLISHED',
      readTime: '5 phút',
    }, currentUser?.role || 'ANALYST');

    setIsSubmitting(false);
    if (ok) {
      setShowCreateModal(false);
      setNewTitle('');
      setNewExcerpt('');
      setNewContent('');
      onRefreshArticles();
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!isAdmin) {
      alert('Chỉ tài khoản Quản trị viên (ADMIN) mới có quyền xóa bài viết khỏi hệ thống!');
      return;
    }
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      await deleteArticle(id, currentUser?.role || 'ADMIN');
      onRefreshArticles();
    }
  };

  const handleChangeTier = (userId: string, newTier: SubscriptionTier) => {
    setManagedUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, subscriptionTier: newTier } : u))
    );
  };

  const handleChangeRole = (userId: string, newRole: UserRole) => {
    setManagedUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  // AUTHORIZATION GUARD: Strict RBAC check for ADMIN or ANALYST (Author)
  if (!isAuthorized) {
    return (
      <div style={{ maxWidth: 640, margin: '80px auto', padding: '0 20px', width: '100%' }}>
        <div className="glass-panel" style={{
          padding: '48px 32px',
          textAlign: 'center',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)',
          borderRadius: 16,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(239, 68, 68, 0.2)',
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '2px solid rgba(239, 68, 68, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: '#ef4444',
          }}>
            <Lock size={32} />
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: '#ef4444',
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}>
            <ShieldAlert size={16} />
            <span>403 Forbidden • Yêu Cầu Quyền Quản Trị Hoặc Tác Giả</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.8rem',
            fontWeight: 900,
            color: '#fff',
            marginBottom: 12,
          }}>
            TRUY CẬP BỊ TỪ CHỐI
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 24 }}>
            Khu vực Quản trị & Studio Biên tập chỉ dành riêng cho người dùng có vai trò <strong>ADMIN</strong> hoặc <strong>ANALYST (Tác giả)</strong>.
            Tài khoản hiện tại của bạn: <strong>{currentUser ? currentUser.email : 'Khách vãng lai'}</strong> (Vai trò: {currentUser ? currentUser.role : 'GUEST'}).
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            <button
              onClick={onBackToApp}
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #38bdf8, #0284c7)',
                padding: '10px 24px',
                fontSize: '0.9rem',
              }}
            >
              <span>Trở Về Trang Chủ</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', padding: '24px 20px', width: '100%' }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 24,
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={onBackToApp}
            className="btn-outline"
            style={{ padding: '8px 12px' }}
          >
            <ArrowLeft size={16} />
            <span>Trở Về Trang Chủ</span>
          </button>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 900, lineHeight: 1.1 }}>
              {isAdmin ? 'BẢNG QUẢN TRỊ ADMIN (DASHBOARD)' : 'STUDIO TÁC GIẢ & BAN BIÊN TẬP (AUTHOR STUDIO)'}
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {isAdmin
                ? 'Theo dõi doanh thu, hội viên trả phí và quản trị toàn diện hệ thống'
                : 'Sáng tạo nội dung, xuất bản bài nhận định chuyên sâu và phân tích kèo thi đấu'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            background: isAdmin ? 'rgba(239, 68, 68, 0.2)' : 'rgba(56, 189, 248, 0.2)',
            color: isAdmin ? '#f87171' : '#38bdf8',
            border: isAdmin ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(56, 189, 248, 0.4)',
            fontSize: '0.8rem',
            fontWeight: 800,
            padding: '4px 12px',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            {isAdmin ? '👑 Quyền: ADMIN (Toàn Quyền)' : '✍️ Quyền: TÁC GIẢ (ANALYST)'}
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 18,
        marginBottom: 30,
      }}>
        {isAdmin ? (
          <>
            {/* Total Revenue (Admin Only) */}
            <div className="glass-panel" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>TỔNG DOANH THU</span>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DollarSign size={20} color="#10b981" />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#10b981' }}>
                {totalRevenue.toLocaleString('vi-VN')} đ
              </div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                <TrendingUp size={12} />
                <span>+24.5% so với tháng trước</span>
              </div>
            </div>

            {/* Paying Members (Admin Only) */}
            <div className="glass-panel" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>HỘI VIÊN PRO / VIP</span>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Crown size={20} color="#fbbf24" />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#fbbf24' }}>
                {totalSubscribers} / {managedUsers.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Tỷ lệ chuyển đổi: <strong style={{ color: '#fff' }}>{conversionRate}%</strong>
              </div>
            </div>

            {/* Articles Count */}
            <div className="glass-panel" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>TỔNG BÀI VIẾT</span>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={20} color="var(--accent-cyan)" />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)' }}>
                {totalArticles}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                {premiumArticles} bài VIP / {totalArticles - premiumArticles} bài Free
              </div>
            </div>

            {/* Active Transactions (Admin Only) */}
            <div className="glass-panel" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>GIAO DỊCH GẦN ĐÂY</span>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={20} color="var(--accent-purple)" />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--accent-purple)' }}>
                {payments.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: 4 }}>
                100% hoàn tất tự động
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Author KPIs - No financial disclosure */}
            <div className="glass-panel" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>TỔNG BÀI VIẾT ĐÃ ĐĂNG</span>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={20} color="var(--accent-cyan)" />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)' }}>
                {totalArticles}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Đã phân phối trên nền tảng
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>BÀI PHÂN TÍCH VIP</span>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Crown size={20} color="#fbbf24" />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#fbbf24' }}>
                {premiumArticles} bài
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Dành cho hội viên PRO & VIP
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>BÀI FREE CỘNG ĐỒNG</span>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PenTool size={20} color="#10b981" />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#10b981' }}>
                {totalArticles - premiumArticles} bài
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Công khai cho mọi độc giả
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>QUYỀN BIÊN TẬP</span>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={20} color="var(--accent-purple)" />
                </div>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--accent-purple)' }}>
                SẴN SÀNG
              </div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: 4 }}>
                Quyền xuất bản bài viết tức thì
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, borderBottom: '1px solid var(--border-color)', paddingBottom: 12 }}>
        {isAdmin ? (
          <button
            onClick={() => setActiveTab('METRICS')}
            style={{
              background: activeTab === 'METRICS' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: activeTab === 'METRICS' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              border: activeTab === 'METRICS' ? '1px solid var(--accent-cyan)' : '1px solid transparent',
              padding: '8px 16px',
              borderRadius: 8,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Lịch Sử Giao Dịch
          </button>
        ) : (
          <span
            title="Chỉ Quản trị viên (ADMIN) mới có quyền truy cập dữ liệu giao dịch"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              color: 'var(--text-muted)',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              padding: '8px 16px',
              borderRadius: 8,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'not-allowed',
            }}
          >
            <Lock size={14} />
            <span>Doanh Thu (Admin Only)</span>
          </span>
        )}

        <button
          onClick={() => setActiveTab('POSTS')}
          style={{
            background: activeTab === 'POSTS' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
            color: activeTab === 'POSTS' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
            border: activeTab === 'POSTS' ? '1px solid var(--accent-cyan)' : '1px solid transparent',
            padding: '8px 16px',
            borderRadius: 8,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Quản Lý Bài Đăng ({articles.length})
        </button>

        {isAdmin ? (
          <button
            onClick={() => setActiveTab('USERS')}
            style={{
              background: activeTab === 'USERS' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: activeTab === 'USERS' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              border: activeTab === 'USERS' ? '1px solid var(--accent-cyan)' : '1px solid transparent',
              padding: '8px 16px',
              borderRadius: 8,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Quản Lý Người Dùng & Gói ({managedUsers.length})
          </button>
        ) : (
          <span
            title="Chỉ Quản trị viên (ADMIN) mới có quyền quản lý người dùng và thay đổi vai trò"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              color: 'var(--text-muted)',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              padding: '8px 16px',
              borderRadius: 8,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'not-allowed',
            }}
          >
            <Lock size={14} />
            <span>Quản Lý User (Admin Only)</span>
          </span>
        )}
      </div>

      {/* Tab 1: Transactions Table (Admin Only) */}
      {isAdmin && activeTab === 'METRICS' && (
        <div className="glass-panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 16 }}>
            Nhật Ký Giao Dịch & Thanh Toán Real-Time
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>MÃ GIAO DỊCH</th>
                  <th style={{ padding: '10px 12px' }}>EMAIL KHÁCH HÀNG</th>
                  <th style={{ padding: '10px 12px' }}>GÓI DỊCH VỤ</th>
                  <th style={{ padding: '10px 12px' }}>SỐ TIỀN</th>
                  <th style={{ padding: '10px 12px' }}>PHƯƠNG THỨC</th>
                  <th style={{ padding: '10px 12px' }}>TRẠNG THÁI</th>
                  <th style={{ padding: '10px 12px' }}>THỜI GIAN</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-code)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                      {p.transactionCode}
                    </td>
                    <td style={{ padding: '12px' }}>{p.userEmail}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        background: p.planId === 'VIP' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                        color: p.planId === 'VIP' ? '#fbbf24' : '#38bdf8',
                        padding: '3px 8px',
                        borderRadius: 4,
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}>
                        {p.planName}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#10b981' }}>
                      {p.amount.toLocaleString('vi-VN')} đ
                    </td>
                    <td style={{ padding: '12px' }}>{p.paymentMethod}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#10b981',
                        padding: '3px 8px',
                        borderRadius: 4,
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}>
                        {p.paymentStatus}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>
                      {new Date(p.createdAt).toLocaleString('vi-VN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Post Management */}
      {activeTab === 'POSTS' && (
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Danh Sách Bài Viết Blog & Nhận Định</h3>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.85rem' }}
            >
              <Plus size={16} />
              <span>Thêm Bài Viết Mới</span>
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>TIÊU ĐỀ BÀI VIẾT</th>
                  <th style={{ padding: '10px 12px' }}>GAME</th>
                  <th style={{ padding: '10px 12px' }}>TÁC GIẢ</th>
                  <th style={{ padding: '10px 12px' }}>LOẠI BÀI</th>
                  <th style={{ padding: '10px 12px' }}>LƯỢT XEM</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center' }}>THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((art) => (
                  <tr key={art.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '12px', maxWidth: 350, fontWeight: 600 }}>{art.title}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                        {art.gameTag}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{art.authorName}</td>
                    <td style={{ padding: '12px' }}>
                      {art.isPremium ? (
                        <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', padding: '3px 8px', borderRadius: 4, fontWeight: 800, fontSize: '0.75rem' }}>
                          👑 VIP
                        </span>
                      ) : (
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '3px 8px', borderRadius: 4, fontWeight: 700, fontSize: '0.75rem' }}>
                          FREE
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{art.viewsCount.toLocaleString()}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      {isAdmin ? (
                        <button
                          onClick={() => handleDeletePost(art.id)}
                          title="Xóa bài viết (Chỉ ADMIN)"
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: 'none',
                            color: '#f87171',
                            padding: '6px',
                            borderRadius: 6,
                            cursor: 'pointer',
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      ) : (
                        <span
                          title="Tác giả không có quyền xóa bài. Chỉ Quản trị viên (ADMIN) mới có quyền xóa."
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            padding: '4px 8px',
                            borderRadius: 6,
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: 'var(--text-muted)',
                            fontSize: '0.75rem',
                          }}
                        >
                          <Lock size={12} />
                          <span>Admin Only</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: User Management (Admin Only) */}
      {isAdmin && activeTab === 'USERS' && (
        <div className="glass-panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 16 }}>
            Quản Lý Hội Viên & Cấp Quyền (User Management)
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>HỌ VÀ TÊN</th>
                  <th style={{ padding: '10px 12px' }}>EMAIL</th>
                  <th style={{ padding: '10px 12px' }}>VAI TRÒ (ROLE)</th>
                  <th style={{ padding: '10px 12px' }}>GÓI HỘI VIÊN (TIER)</th>
                  <th style={{ padding: '10px 12px' }}>NGÀY THAM GIA</th>
                </tr>
              </thead>
              <tbody>
                {managedUsers.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <img src={u.avatarUrl} alt="" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                      <span>{u.fullName}</span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{u.email}</td>
                    <td style={{ padding: '12px' }}>
                      <select
                        value={u.role}
                        onChange={(e) => handleChangeRole(u.id, e.target.value as UserRole)}
                        style={{
                          background: '#111827',
                          color: '#fff',
                          border: '1px solid var(--border-color)',
                          padding: '4px 8px',
                          borderRadius: 6,
                          fontSize: '0.8rem',
                        }}
                      >
                        <option value="USER">USER</option>
                        <option value="ANALYST">ANALYST</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <select
                        value={u.subscriptionTier}
                        onChange={(e) => handleChangeTier(u.id, e.target.value as SubscriptionTier)}
                        style={{
                          background: u.subscriptionTier === 'VIP' ? '#78350f' : u.subscriptionTier === 'PRO' ? '#075985' : '#111827',
                          color: '#fff',
                          border: '1px solid var(--border-color)',
                          padding: '4px 8px',
                          borderRadius: 6,
                          fontWeight: 700,
                          fontSize: '0.8rem',
                        }}
                      >
                        <option value="FREE">FREE</option>
                        <option value="PRO">PRO GAMER</option>
                        <option value="VIP">VIP ANALYST</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>
                      {new Date(u.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Create Article */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(5, 8, 15, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 110,
          padding: 16,
        }}>
          <div className="glass-panel" style={{
            maxWidth: 600,
            width: '100%',
            backgroundColor: '#0c101c',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            padding: 24,
            borderRadius: 14,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Đăng Bài Viết / Nhận Định Mới</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tiêu đề bài viết</label>
                <input
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="VD: [VIP] Nhận định kèo T1 vs BLG..."
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 6, background: '#111827', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Bộ môn Esports</label>
                  <select
                    value={newGameTag}
                    onChange={(e) => setNewGameTag(e.target.value as 'LOL' | 'VALORANT' | 'CS2' | 'AOV')}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 6, background: '#111827', border: '1px solid var(--border-color)', color: '#fff' }}
                  >
                    <option value="VALORANT">Valorant</option>
                    <option value="LOL">Liên Minh Huyền Thoại</option>
                    <option value="CS2">Counter-Strike 2</option>
                    <option value="AOV">Liên Quân Mobile</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 22 }}>
                  <input
                    type="checkbox"
                    id="isPrem"
                    checked={newIsPremium}
                    onChange={(e) => setNewIsPremium(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: '#fbbf24' }}
                  />
                  <label htmlFor="isPrem" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', cursor: 'pointer' }}>
                    👑 Bài Viết Độc Quyền VIP
                  </label>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tóm tắt ngắn (Excerpt)</label>
                <textarea
                  required
                  rows={2}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Tóm tắt ngắn xuất hiện ở trang danh sách..."
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 6, background: '#111827', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Nội dung chi tiết (Markdown)</label>
                <textarea
                  required
                  rows={5}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Nội dung phân tích chuyên sâu, tỷ lệ kèo..."
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 6, background: '#111827', border: '1px solid var(--border-color)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-outline"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? 'Đang xuất bản...' : 'Xuất Bản Ngay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
