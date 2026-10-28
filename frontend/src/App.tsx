import React, { useState, useEffect } from 'react';
import { GameId } from './types/game';
import { Match } from './types/match';
import { MOCK_MATCHES, MOCK_PREDICTIONS } from './api/mockData';
import { Navbar } from './components/common/Navbar';
import { LiveTicker } from './components/match/LiveTicker';
import { MatchCard } from './components/match/MatchCard';
import { PredictionModal } from './components/prediction/PredictionModal';
import { Sparkles, Filter, ShieldCheck } from 'lucide-react';
import { supabase } from './utils/supabase';

export const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameId>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'UPCOMING' | 'FINISHED'>('ALL');
  const [activeModalMatch, setActiveModalMatch] = useState<Match | null>(null);
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(false);

  // Supabase live connection verification
  useEffect(() => {
    async function checkSupabase() {
      try {
        const { error } = await supabase.from('todos').select();
        // If error is null or returns table-not-found (42P01 / PGRST204), client reached Supabase successfully
        if (!error || error.code === '42P01' || error.code === 'PGRST204' || error.code === 'PGRST200') {
          setSupabaseConnected(true);
        }
      } catch (err) {
        console.warn('Supabase initialization check:', err);
      }
    }
    checkSupabase();
  }, []);

  // Filter matches by game and status
  const filteredMatches = MOCK_MATCHES.filter((m) => {
    const matchGame = selectedGame === 'ALL' || m.gameId === selectedGame;
    const matchStatus = statusFilter === 'ALL' || m.status === statusFilter;
    return matchGame && matchStatus;
  });

  const liveMatches = MOCK_MATCHES.filter((m) => m.status === 'LIVE');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <Navbar
        selectedGame={selectedGame}
        onSelectGame={setSelectedGame}
        liveMatchesCount={liveMatches.length}
        supabaseConnected={supabaseConnected}
      />

      {/* Real-time Ticker */}
      <LiveTicker
        matches={MOCK_MATCHES}
        onSelectMatch={(m) => setActiveModalMatch(m)}
      />

      {/* Main Container */}
      <main style={{ maxWidth: 1300, margin: '0 auto', padding: '24px 20px', flex: 1, width: '100%' }}>
        {/* Hero Banner */}
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
              THÔNG TIN & NHẬN ĐỊNH REAL-TIME ESPORTS
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 650, fontSize: '0.95rem' }}>
              Cập nhật tỷ số trực tiếp từng round/map, phân tích phong độ, đối đầu và nhận định chuẩn xác từ AI & đội ngũ chuyên gia phân tích hàng đầu cho Valorant, CS2, LMHT & Liên Quân Mobile.
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
            <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Trạng thái trận:</span>
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
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'rgba(10, 14, 23, 0.95)',
        borderTop: '1px solid var(--border-color)',
        padding: '24px 20px',
        marginTop: 40,
        textAlign: 'center',
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
      }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={16} color="var(--accent-cyan)" />
            <span>EsportsPulse • Nền tảng phân tích thể thao điện tử chuẩn xác</span>
          </div>
          <div>
            Backend: Spring Boot 4 / Java 21 • Frontend: Vite + ReactJS + TypeScript
          </div>
        </div>
      </footer>

      {/* Detail & Prediction Modal */}
      {activeModalMatch && (
        <PredictionModal
          match={activeModalMatch}
          prediction={MOCK_PREDICTIONS[activeModalMatch.id]}
          onClose={() => setActiveModalMatch(null)}
        />
      )}
    </div>
  );
};
