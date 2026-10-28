import { Match } from '../../types/match';
import { Sparkles, Tv, Trophy } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  onOpenPrediction: (match: Match) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onOpenPrediction }) => {
  const isLive = match.status === 'LIVE';

  return (
    <div className="glass-panel" style={{
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top Bar: Tournament & Status */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Trophy size={16} color="var(--accent-gold)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {match.tournamentName}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            • {match.tournamentStage} ({match.format})
          </span>
        </div>

        <div>
          {isLive ? (
            <div className="badge-live">
              <span className="pulse-dot"></span>
              <span>LIVE • MAP {match.currentMapNumber}</span>
            </div>
          ) : (
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '3px 8px',
              borderRadius: 6,
            }}>
              {match.status === 'FINISHED' ? 'KẾT THÚC' : 'SẮP DIỄN RA'}
            </span>
          )}
        </div>
      </div>

      {/* Main Teams Matchup */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: 16,
        margin: '16px 0',
      }}>
        {/* Team A */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src={match.teamA.logo}
            alt={match.teamA.name}
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              objectFit: 'cover',
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.02em' }}>
              {match.teamA.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {match.teamA.region} • Form: {match.teamA.winRateLast5}
            </div>
          </div>
        </div>

        {/* Center Score / VS */}
        <div style={{ textAlign: 'center' }}>
          {isLive || match.status === 'FINISHED' ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '6px 16px',
              borderRadius: 10,
              border: isLive ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid var(--border-color)',
            }}>
              <span style={{
                fontSize: '1.6rem',
                fontWeight: 900,
                fontFamily: 'var(--font-heading)',
                color: match.scoreA > match.scoreB ? 'var(--accent-cyan)' : 'var(--text-primary)',
              }}>
                {match.scoreA}
              </span>
              <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>:</span>
              <span style={{
                fontSize: '1.6rem',
                fontWeight: 900,
                fontFamily: 'var(--font-heading)',
                color: match.scoreB > match.scoreA ? 'var(--accent-cyan)' : 'var(--text-primary)',
              }}>
                {match.scoreB}
              </span>
            </div>
          ) : (
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.2rem',
              color: 'var(--text-muted)',
              padding: '4px 12px',
              borderRadius: 6,
              background: 'rgba(255, 255, 255, 0.03)',
            }}>
              VS
            </div>
          )}

          {isLive && match.maps && match.currentMapNumber && (
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginTop: 4, fontWeight: 600 }}>
              {match.maps[match.currentMapNumber - 1]?.mapName}: {match.maps[match.currentMapNumber - 1]?.scoreA} - {match.maps[match.currentMapNumber - 1]?.scoreB}
            </div>
          )}
        </div>

        {/* Team B */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end', textAlign: 'right' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.02em' }}>
              {match.teamB.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {match.teamB.region} • Form: {match.teamB.winRateLast5}
            </div>
          </div>
          <img
            src={match.teamB.logo}
            alt={match.teamB.name}
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              objectFit: 'cover',
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          />
        </div>
      </div>

      {/* Prediction Highlight Snippet */}
      {match.predictionSnippet && (
        <div style={{
          backgroundColor: 'rgba(56, 189, 248, 0.06)',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          borderRadius: 8,
          padding: '8px 12px',
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#bae6fd' }}>
            <Sparkles size={16} color="var(--accent-cyan)" />
            <span>{match.predictionSnippet}</span>
          </div>

          <button
            onClick={() => onOpenPrediction(match)}
            className="btn-primary"
            style={{ padding: '4px 12px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
          >
            Xem Nhận Định Chi Tiết
          </button>
        </div>
      )}

      {/* Footer Info: Odds & Viewers */}
      <div style={{
        marginTop: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
      }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <span>Tỷ lệ Kèo: <strong style={{ color: 'var(--text-primary)' }}>{match.odds.teamA}</strong> (SEN) vs <strong style={{ color: 'var(--text-primary)' }}>{match.odds.teamB}</strong> (FNC)</span>
          {match.odds.handicap && <span>Chấp: <strong style={{ color: 'var(--text-primary)' }}>{match.odds.handicap}</strong></span>}
        </div>

        {isLive && match.viewersCount && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f43f5e' }}>
            <Tv size={14} />
            <span>{match.viewersCount.toLocaleString('vi-VN')} người xem trực tiếp</span>
          </div>
        )}
      </div>
    </div>
  );
};
