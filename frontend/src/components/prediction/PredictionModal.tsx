import React, { useState } from 'react';
import { Match } from '../../types/match';
import { MatchPrediction } from '../../types/prediction';
import { X, Sparkles, Award, CheckCircle, TrendingUp, ThumbsUp } from 'lucide-react';

interface PredictionModalProps {
  match: Match;
  prediction?: MatchPrediction;
  onClose: () => void;
}

export const PredictionModal: React.FC<PredictionModalProps> = ({
  match,
  prediction,
  onClose,
}) => {
  const [userVote, setUserVote] = useState<'A' | 'B' | null>(null);
  const [voteCountA, setVoteCountA] = useState(prediction?.communityVote.teamAVotes || 100);
  const [voteCountB, setVoteCountB] = useState(prediction?.communityVote.teamBVotes || 80);

  if (!prediction) {
    return null;
  }

  const handleVote = (team: 'A' | 'B') => {
    if (userVote) return;
    setUserVote(team);
    if (team === 'A') setVoteCountA((prev) => prev + 1);
    else setVoteCountB((prev) => prev + 1);
  };

  const totalVotes = voteCountA + voteCountB;
  const percentA = Math.round((voteCountA / totalVotes) * 100);
  const percentB = 100 - percentA;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(5, 8, 15, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: 16,
    }}>
      <div className="glass-panel" style={{
        maxWidth: 720,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: 24,
        position: 'relative',
        backgroundColor: '#0d131f',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.15)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge-live" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', borderColor: '#38bdf8' }}>
                PHÂN TÍCH CHUYÊN SÂU
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{match.tournamentName}</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: 4 }}>
              {match.teamA.name} vs {match.teamB.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: 'none',
              color: 'var(--text-muted)',
              borderRadius: 8,
              padding: 8,
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* AI Prediction Box */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08), rgba(168, 85, 247, 0.08))',
          border: '1px solid rgba(0, 242, 254, 0.25)',
          borderRadius: 12,
          padding: 18,
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-cyan)', fontWeight: 700 }}>
              <Sparkles size={18} />
              <span>Dự đoán AI Mô hình Máy học (Confidence: {prediction.aiConfidence}%)</span>
            </div>
            <span style={{
              background: 'rgba(0, 242, 254, 0.2)',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: 6,
            }}>
              {prediction.aiPredictedScore}
            </span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {prediction.aiAnalysisSummary}
          </p>
        </div>

        {/* Key Matchup Factors */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={16} color="var(--accent-cyan)" />
            <span>Yếu Tố Quyết Định Trận Đấu</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {prediction.keyFactors.map((f, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{f.factor}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{f.detail}</div>
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: f.advantage === 'teamA' ? 'var(--accent-cyan)' : 'var(--accent-purple)',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '3px 8px',
                  borderRadius: 4,
                  whiteSpace: 'nowrap',
                }}>
                  Ưu thế: {f.advantage === 'teamA' ? match.teamA.shortName : match.teamB.shortName}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Community Vote Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-color)',
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem' }}>
            <span>Bình chọn cộng đồng ({totalVotes.toLocaleString('vi-VN')} votes)</span>
            <span>{percentA}% {match.teamA.shortName} vs {percentB}% {match.teamB.shortName}</span>
          </div>

          <div className="win-chance-bar" style={{ height: 10, marginBottom: 12 }}>
            <div className="win-chance-fill-a" style={{ width: `${percentA}%` }}></div>
            <div className="win-chance-fill-b" style={{ width: `${percentB}%` }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button
              onClick={() => handleVote('A')}
              disabled={!!userVote}
              className="btn-outline"
              style={{
                justifyContent: 'center',
                borderColor: userVote === 'A' ? 'var(--accent-cyan)' : 'var(--border-color)',
                background: userVote === 'A' ? 'rgba(0, 242, 254, 0.15)' : undefined,
              }}
            >
              <ThumbsUp size={16} />
              <span>Vote {match.teamA.shortName}</span>
            </button>

            <button
              onClick={() => handleVote('B')}
              disabled={!!userVote}
              className="btn-outline"
              style={{
                justifyContent: 'center',
                borderColor: userVote === 'B' ? 'var(--accent-purple)' : 'var(--border-color)',
                background: userVote === 'B' ? 'rgba(168, 85, 247, 0.15)' : undefined,
              }}
            >
              <ThumbsUp size={16} />
              <span>Vote {match.teamB.shortName}</span>
            </button>
          </div>
        </div>

        {/* Expert Picks */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Award size={16} color="var(--accent-gold)" />
            <span>Nhận Định Chuyên Gia Phân Tích</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {prediction.expertPicks.map((expert, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: 10,
                padding: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img
                      src={expert.avatar}
                      alt={expert.expertName}
                      style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{expert.expertName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{expert.title} • Winrate: {expert.winRate}%</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                      Chọn: {expert.predictedWinnerId === match.teamA.id ? match.teamA.name : match.teamB.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tỷ số: {expert.predictedScore}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: 46 }}>
                  {expert.reasoning.map((r, ri) => (
                    <div key={ri} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle size={12} color="var(--accent-cyan)" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
