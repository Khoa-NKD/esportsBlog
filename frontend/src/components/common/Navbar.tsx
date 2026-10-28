import React from 'react';
import { GameId, SUPPORTED_GAMES } from '../../types/game';
import { UserProfile } from '../../types/auth';
import { Radio, Flame, Database, Crown, User, LogOut, ShieldAlert, BookOpen, Trophy } from 'lucide-react';

export type AppView = 'MATCHES' | 'BLOG_FREE' | 'BLOG_VIP' | 'PRICING' | 'ADMIN';

interface NavbarProps {
  currentView: AppView;
  onSelectView: (view: AppView) => void;
  selectedGame: GameId;
  onSelectGame: (game: GameId) => void;
  liveMatchesCount: number;
  supabaseConnected?: boolean;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  selectedGame,
  onSelectGame,
  liveMatchesCount,
  supabaseConnected = false,
  user,
  onOpenAuth,
  onLogout,
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(10, 14, 23, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
    }}>
      {/* Top Navbar Row */}
      <div style={{
        maxWidth: 1300,
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        {/* Brand */}
        <div
          onClick={() => onSelectView('MATCHES')}
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
        >
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #00f2fe, #7928ca)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)',
          }}>
            <Flame size={24} color="#fff" />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              background: 'linear-gradient(90deg, #fff, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}>
              ESPORTS<span style={{ color: '#00f2fe' }}>PULSE</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Real-time Analytics & AI Predictions
            </div>
          </div>
        </div>

        {/* Main Navigation Views */}
        <div style={{
          display: 'flex',
          gap: 6,
          background: 'rgba(255, 255, 255, 0.03)',
          padding: 4,
          borderRadius: 12,
          border: '1px solid var(--border-color)',
        }}>
          <button
            onClick={() => onSelectView('MATCHES')}
            style={{
              background: currentView === 'MATCHES' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: currentView === 'MATCHES' ? '#fff' : 'var(--text-secondary)',
              border: currentView === 'MATCHES' ? '1px solid var(--accent-cyan)' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Trophy size={14} />
            <span>Trận Đấu Live</span>
          </button>

          <button
            onClick={() => onSelectView('BLOG_FREE')}
            style={{
              background: currentView === 'BLOG_FREE' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
              color: currentView === 'BLOG_FREE' ? '#10b981' : 'var(--text-secondary)',
              border: currentView === 'BLOG_FREE' ? '1px solid #10b981' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <BookOpen size={14} />
            <span>Blog & Kèo Free</span>
          </button>

          <button
            onClick={() => onSelectView('BLOG_VIP')}
            style={{
              background: currentView === 'BLOG_VIP' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
              color: currentView === 'BLOG_VIP' ? '#fbbf24' : 'var(--text-secondary)',
              border: currentView === 'BLOG_VIP' ? '1px solid #f59e0b' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Crown size={14} />
            <span>Kèo VIP & Chuyên Sâu</span>
          </button>

          <button
            onClick={() => onSelectView('PRICING')}
            style={{
              background: currentView === 'PRICING' ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
              color: currentView === 'PRICING' ? '#c084fc' : 'var(--text-secondary)',
              border: currentView === 'PRICING' ? '1px solid #a855f7' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Flame size={14} />
            <span>Gói Hội Viên</span>
          </button>

          {user?.role === 'ADMIN' && (
            <button
              onClick={() => onSelectView('ADMIN')}
              style={{
                background: currentView === 'ADMIN' ? 'rgba(239, 68, 68, 0.25)' : 'transparent',
                color: currentView === 'ADMIN' ? '#f87171' : 'var(--text-secondary)',
                border: currentView === 'ADMIN' ? '1px solid #ef4444' : '1px solid transparent',
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <ShieldAlert size={14} />
              <span>Admin Dashboard</span>
            </button>
          )}
        </div>

        {/* User Auth Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* User Chip */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '4px 10px',
                borderRadius: 999,
                border: '1px solid var(--border-color)',
              }}>
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{user.fullName}</span>

                {/* Tier Badge */}
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  padding: '2px 8px',
                  borderRadius: 4,
                  background:
                    user.subscriptionTier === 'VIP'
                      ? 'rgba(245, 158, 11, 0.25)'
                      : user.subscriptionTier === 'PRO'
                      ? 'rgba(56, 189, 248, 0.25)'
                      : 'rgba(255, 255, 255, 0.1)',
                  color:
                    user.subscriptionTier === 'VIP'
                      ? '#fbbf24'
                      : user.subscriptionTier === 'PRO'
                      ? '#38bdf8'
                      : 'var(--text-muted)',
                }}>
                  {user.subscriptionTier}
                </span>
              </div>

              {/* Upgrade quick CTA if user is free */}
              {user.subscriptionTier === 'FREE' && (
                <button
                  onClick={() => onSelectView('PRICING')}
                  className="btn-primary"
                  style={{
                    padding: '5px 12px',
                    fontSize: '0.78rem',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#000',
                  }}
                >
                  <Crown size={12} />
                  <span>Lên VIP</span>
                </button>
              )}

              {/* Logout */}
              <button
                onClick={onLogout}
                title="Đăng xuất"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-muted)',
                  borderRadius: 8,
                  padding: 6,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-primary"
              style={{ padding: '7px 16px', fontSize: '0.85rem' }}
            >
              <User size={15} />
              <span>Đăng Nhập / Đăng Ký</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-bar: Game filters and System Status */}
      <div style={{
        maxWidth: 1300,
        margin: '0 auto',
        padding: '6px 20px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
      }}>
        {/* Game Filters */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
          {SUPPORTED_GAMES.map((game) => {
            const isActive = selectedGame === game.id;
            return (
              <button
                key={game.id}
                onClick={() => onSelectGame(game.id)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(168, 85, 247, 0.2))' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  border: isActive ? `1px solid ${game.color}` : '1px solid transparent',
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? `0 0 10px ${game.glowColor}` : 'none',
                }}
              >
                {game.name}
              </button>
            );
          })}
        </div>

        {/* Live system indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="badge-live" style={{ cursor: 'default', fontSize: '0.7rem', padding: '2px 8px' }}>
            <span className="pulse-dot"></span>
            <span>{liveMatchesCount} LIVE</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: '0.72rem',
            color: '#10b981',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '3px 8px',
            borderRadius: 6,
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}>
            <Radio size={12} />
            <span>STOMP WS</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: '0.72rem',
            color: supabaseConnected ? '#38bdf8' : 'var(--text-muted)',
            background: supabaseConnected ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            padding: '3px 8px',
            borderRadius: 6,
            border: supabaseConnected ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid var(--border-color)',
          }}>
            <Database size={12} />
            <span>Supabase RLS</span>
          </div>
        </div>
      </div>
    </header>
  );
};
