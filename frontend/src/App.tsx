import React, { useState, useEffect } from 'react';
import { GameId } from './types/game';
import { Match } from './types/match';
import { Article } from './types/article';
import { UserProfile, SubscriptionTier } from './types/auth';
import { SubscriptionPlan, PaymentTransaction } from './types/plan';
import { MOCK_MATCHES, MOCK_PREDICTIONS } from './api/mockData';
import { fetchArticles, FALLBACK_ARTICLES } from './services/articleService';
import { getStoredUser, setStoredUser, logout } from './services/authService';

// Components
import { Navbar, AppView } from './components/common/Navbar';
import { LiveTicker } from './components/match/LiveTicker';
import { MatchCard } from './components/match/MatchCard';
import { PredictionModal } from './components/prediction/PredictionModal';
import { ArticleList } from './components/blog/ArticleList';
import { ArticleDetailModal } from './components/blog/ArticleDetailModal';
import { PricingSection } from './components/subscription/PricingSection';
import { CheckoutModal } from './components/subscription/CheckoutModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/auth/AuthModal';

import { Sparkles, Filter, ShieldCheck, Crown } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation & Filtering
  const [currentView, setCurrentView] = useState<AppView>('MATCHES');
  const [selectedGame, setSelectedGame] = useState<GameId>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'UPCOMING' | 'FINISHED'>('ALL');

  // Modals state
  const [activeModalMatch, setActiveModalMatch] = useState<Match | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [selectedCheckoutPlan, setSelectedCheckoutPlan] = useState<SubscriptionPlan | null>(null);

  // App data & Auth
  const [user, setUser] = useState<UserProfile | null>(getStoredUser());
  const [articles, setArticles] = useState<Article[]>(FALLBACK_ARTICLES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show temporary toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 1. Load articles on mount
  useEffect(() => {
    async function loadInitialData() {
      const remotePosts = await fetchArticles();
      if (remotePosts && remotePosts.length > 0) {
        setArticles(remotePosts);
      }
    }
    loadInitialData();
  }, []);

  // Filter matches by game and status
  const filteredMatches = MOCK_MATCHES.filter((m) => {
    const matchGame = selectedGame === 'ALL' || m.gameId === selectedGame;
    const matchStatus = statusFilter === 'ALL' || m.status === statusFilter;
    return matchGame && matchStatus;
  });

  const liveMatches = MOCK_MATCHES.filter((m) => m.status === 'LIVE');

  // Handle Logout
  const handleLogout = async () => {
    await logout();
    setUser(null);
    triggerToast('Đã đăng xuất tài khoản.');
  };

  // Handle successful payment simulation
  const handlePaymentSuccess = (newTier: SubscriptionTier, txn: PaymentTransaction) => {
    if (user) {
      const updatedUser: UserProfile = { ...user, subscriptionTier: newTier };
      setUser(updatedUser);
      setStoredUser(updatedUser);
    }
    triggerToast(`🎉 Nâng cấp ${txn.planName} thành công! Mã GD: ${txn.transactionCode}`);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 200,
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95))',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: 10,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(16, 185, 129, 0.4)',
          fontWeight: 700,
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <Sparkles size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        selectedGame={selectedGame}
        onSelectGame={setSelectedGame}
        liveMatchesCount={liveMatches.length}
        user={user}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      {/* Real-time Matches Ticker */}
      <LiveTicker
        matches={MOCK_MATCHES}
        onSelectMatch={(m) => setActiveModalMatch(m)}
      />

      {/* Main Content Area */}
      <main style={{ maxWidth: 1300, margin: '0 auto', padding: '24px 20px', flex: 1, width: '100%' }}>
        
        {/* VIEW 1: MATCHES (TRẬN ĐẤU REAL-TIME) */}
        {currentView === 'MATCHES' && (
          <div>
            {/* Hero Header */}
            <div className="glass-panel" style={{
              padding: '28px',
              marginBottom: 28,
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 20,
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 6 }}>
                  <Sparkles size={16} />
                  <span>Real-Time Esports Intelligence</span>
                </div>
                <h1 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.4rem',
                  fontWeight: 900,
                  letterSpacing: '0.02em',
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}>
                  TỈ SỐ TRỰC TIẾP & NHẬN ĐỊNH REAL-TIME ESPORTS
                </h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: 650, fontSize: '0.95rem' }}>
                  Cập nhật tỷ số từng map, tỷ lệ kèo nhà cái và nhận định chuẩn xác từ AI cho Valorant, CS2, LMHT & Liên Quân Mobile.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-color)',
                  padding: '12px 18px',
                  borderRadius: 10,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)' }}>
                    78.4%
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Độ chính xác AI</div>
                </div>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-color)',
                  padding: '12px 18px',
                  borderRadius: 10,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-purple)', fontFamily: 'var(--font-heading)' }}>
                    &lt; 200ms
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Độ trễ WebSocket</div>
                </div>
              </div>
            </div>

            {/* Filters Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
              marginBottom: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Filter size={16} color="var(--text-muted)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Trạng thái:</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {(['ALL', 'LIVE', 'UPCOMING', 'FINISHED'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      style={{
                        background: statusFilter === status ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                        color: statusFilter === status ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                        border: statusFilter === status ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                        padding: '5px 12px',
                        borderRadius: 6,
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {status === 'ALL' && 'Tất cả'}
                      {status === 'LIVE' && 'Đang Live'}
                      {status === 'UPCOMING' && 'Sắp đấu'}
                      {status === 'FINISHED' && 'Đã kết thúc'}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Hiển thị <strong>{filteredMatches.length}</strong> trận đấu
              </div>
            </div>

            {/* Match Cards List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filteredMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onOpenPrediction={(m) => setActiveModalMatch(m)}
                />
              ))}

              {filteredMatches.length === 0 && (
                <div className="glass-panel" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                  Không có trận đấu nào phù hợp với bộ lọc hiện tại.
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: BLOG & BÀI VIẾT FREE */}
        {currentView === 'BLOG_FREE' && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, marginBottom: 4 }}>
                BÀI VIẾT & NHẬN ĐỊNH MIỄN PHÍ
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Cập nhật tin tức, phân tích meta và nhận định chiến thuật từ đội ngũ biên tập viên thể thao điện tử.
              </p>
            </div>

            <ArticleList
              articles={articles.filter((a) => !a.isPremium)}
              user={user}
              onSelectArticle={(art) => setActiveArticle(art)}
              onGoToPricing={() => setCurrentView('PRICING')}
            />
          </div>
        )}

        {/* VIEW 3: KÈO VIP & PHÂN TÍCH CHUYÊN SÂU */}
        {currentView === 'BLOG_VIP' && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 800 }}>
                <Crown size={18} />
                <span>KHU VỰC ĐỘC QUYỀN HỘI VIÊN PRO & VIP</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, marginBottom: 4 }}>
                TÍN HIỆU AI PREDICTION & KÈO NÓNG VIP
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Phân tích ban-pick chuyên sâu, dữ liệu đối đầu round-by-round và tỷ lệ cược có lợi thế cao nhất.
              </p>
            </div>

            <ArticleList
              articles={articles.filter((a) => a.isPremium)}
              user={user}
              onSelectArticle={(art) => setActiveArticle(art)}
              onGoToPricing={() => setCurrentView('PRICING')}
            />
          </div>
        )}

        {/* VIEW 4: BẢNG GIÁ GÓI HỘI VIÊN */}
        {currentView === 'PRICING' && (
          <PricingSection
            user={user}
            onSelectPlan={(plan) => setSelectedCheckoutPlan(plan)}
          />
        )}

        {/* VIEW 5: ADMIN DASHBOARD */}
        {currentView === 'ADMIN' && (
          <AdminDashboard
            articles={articles}
            onRefreshArticles={async () => {
              const fresh = await fetchArticles();
              setArticles(fresh);
              triggerToast('Đã đồng bộ danh sách bài viết mới nhất.');
            }}
            onBackToApp={() => setCurrentView('MATCHES')}
            currentUser={user}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'rgba(10, 14, 23, 0.95)',
        borderTop: '1px solid var(--border-color)',
        padding: '24px 20px',
        marginTop: 40,
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
      }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldCheck size={16} color="var(--accent-cyan)" />
            <span style={{ color: '#fff', fontWeight: 600 }}>EsportsPulse • Nền tảng phân tích thể thao điện tử chuẩn xác</span>
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            © 2026 EsportsPulse Media Network. Toàn bộ bản quyền được bảo lưu. Dữ liệu trận đấu thời gian thực.
          </div>
        </div>
      </footer>

      {/* MODAL 1: Match Live Prediction & Community Vote */}
      {activeModalMatch && (
        <PredictionModal
          match={activeModalMatch}
          prediction={MOCK_PREDICTIONS[activeModalMatch.id]}
          onClose={() => setActiveModalMatch(null)}
        />
      )}

      {/* MODAL 2: Article Reader with Paywall Gate */}
      {activeArticle && (
        <ArticleDetailModal
          article={activeArticle}
          user={user}
          onClose={() => setActiveArticle(null)}
          onUpgradeClick={() => setCurrentView('PRICING')}
          onLoginClick={() => setShowAuthModal(true)}
        />
      )}

      {/* MODAL 3: Auth Modal (Login / Register / Demo Roles) */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={(loggedUser) => {
          setUser(loggedUser);
          triggerToast(`Chào mừng trở lại, ${loggedUser.fullName}! (${loggedUser.role})`);
        }}
      />

      {/* MODAL 4: Checkout & VietQR Payment */}
      {selectedCheckoutPlan && (
        <CheckoutModal
          plan={selectedCheckoutPlan}
          user={user}
          onClose={() => setSelectedCheckoutPlan(null)}
          onPaymentSuccess={handlePaymentSuccess}
          onOpenLogin={() => {
            setSelectedCheckoutPlan(null);
            setShowAuthModal(true);
          }}
        />
      )}
    </div>
  );
};
