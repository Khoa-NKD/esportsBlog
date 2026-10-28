import { Match } from '../../types/match';
import { PlayCircle } from 'lucide-react';

interface LiveTickerProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ matches, onSelectMatch }) => {
  return (
    <div style={{
      backgroundColor: 'rgba(17, 24, 39, 0.6)',
      borderBottom: '1px solid var(--border-color)',
      padding: '8px 0',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
    }}>
      <div style={{
        maxWidth: 1300,
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: '0.75rem',
          fontWeight: 800,
          color: 'var(--accent-cyan)',
          textTransform: 'uppercase',
          paddingRight: 10,
          borderRight: '1px solid var(--border-color)',
        }}>
          <PlayCircle size={15} />
          <span>REAL-TIME FEED:</span>
        </div>

        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 2 }}>
          {matches.map((match) => (
            <div
              key={match.id}
              onClick={() => onSelectMatch(match)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: match.status === 'LIVE' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                border: match.status === 'LIVE' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--border-color)',
                padding: '5px 12px',
                borderRadius: 8,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{
                color: match.status === 'LIVE' ? '#ef4444' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.7rem',
              }}>
                {match.status === 'LIVE' ? 'LIVE' : 'UPCOMING'}
              </span>
              <span style={{ fontWeight: 600 }}>{match.teamA.shortName}</span>
              <span style={{
                padding: '1px 6px',
                borderRadius: 4,
                background: 'rgba(0,0,0,0.4)',
                fontWeight: 700,
                color: match.status === 'LIVE' ? 'var(--accent-cyan)' : 'var(--text-muted)',
              }}>
                {match.scoreA} - {match.scoreB}
              </span>
              <span style={{ fontWeight: 600 }}>{match.teamB.shortName}</span>
              {match.odds && (
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  ({match.odds.teamA} / {match.odds.teamB})
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
