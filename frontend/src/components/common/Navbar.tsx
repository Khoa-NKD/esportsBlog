import { GameId, SUPPORTED_GAMES } from '../../types/game';
import { Radio, Flame, Database } from 'lucide-react';

interface NavbarProps {
  selectedGame: GameId;
  onSelectGame: (game: GameId) => void;
  liveMatchesCount: number;
  supabaseConnected?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedGame,
  onSelectGame,
  liveMatchesCount,
  supabaseConnected = false,
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(10, 14, 23, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
    }}>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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

        {/* Game Filters */}
        <nav style={{
          display: 'flex',
          gap: 6,
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          padding: 4,
          borderRadius: 12,
          border: '1px solid var(--border-color)',
          overflowX: 'auto',
          maxWidth: '100%',
        }}>
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
                  padding: '7px 14px',
                  borderRadius: 8,
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? `0 0 12px ${game.glowColor}` : 'none',
                }}
              >
                {game.name}
              </button>
            );
          })}
        </nav>

        {/* Live status badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="badge-live" style={{ cursor: 'default' }}>
            <span className="pulse-dot"></span>
            <span>{liveMatchesCount} TRẬN LIVE</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.78rem',
            color: '#10b981',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '4px 10px',
            borderRadius: 6,
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}>
            <Radio size={14} />
            <span>STOMP WS Online</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.78rem',
            color: supabaseConnected ? '#38bdf8' : 'var(--text-muted)',
            background: supabaseConnected ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            padding: '4px 10px',
            borderRadius: 6,
            border: supabaseConnected ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid var(--border-color)',
          }}>
            <Database size={14} />
            <span>Supabase: {supabaseConnected ? 'Connected' : 'Connecting...'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
