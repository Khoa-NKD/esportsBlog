import React from 'react';
import { Article } from '../../types/article';
import { UserProfile } from '../../types/auth';
import { Lock, Eye, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  user: UserProfile | null;
  onSelect: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, user, onSelect }) => {
  const isUserPremium = user && (user.subscriptionTier === 'PRO' || user.subscriptionTier === 'VIP' || user.role === 'ADMIN');
  const isLockedForUser = article.isPremium && !isUserPremium;

  return (
    <div
      onClick={() => onSelect(article)}
      className="glass-panel"
      style={{
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.25s ease, border-color 0.25s ease',
      }}
    >
      {/* Cover Image Container */}
      <div style={{ position: 'relative', height: 180, width: '100%', overflow: 'hidden' }}>
        <img
          src={article.coverImage}
          alt={article.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        />

        {/* Game Tag Badge */}
        <span style={{
          position: 'absolute',
          top: 12,
          left: 12,
          backgroundColor: 'rgba(10, 14, 23, 0.85)',
          color: 'var(--accent-cyan)',
          fontSize: '0.72rem',
          fontWeight: 800,
          padding: '4px 10px',
          borderRadius: 6,
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
        }}>
          {article.gameTag}
        </span>

        {/* Premium / Free Badge */}
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          {article.isPremium ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              backgroundColor: 'rgba(245, 158, 11, 0.9)',
              color: '#000',
              fontWeight: 800,
              fontSize: '0.72rem',
              padding: '4px 10px',
              borderRadius: 6,
              boxShadow: '0 0 15px rgba(245, 158, 11, 0.5)',
            }}>
              <Sparkles size={12} />
              <span>VIP PREVIEW</span>
            </div>
          ) : (
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.85)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.72rem',
              padding: '4px 10px',
              borderRadius: 6,
            }}>
              MIỄN PHÍ
            </div>
          )}
        </div>

        {/* Lock Overlay Badge if premium & locked */}
        {isLockedForUser && (
          <div style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            background: 'rgba(0, 0, 0, 0.75)',
            color: '#fbbf24',
            padding: '4px 8px',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: '0.72rem',
            border: '1px solid rgba(251, 191, 36, 0.3)',
          }}>
            <Lock size={12} />
            <span>Yêu cầu gói PRO/VIP</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontSize: '1.05rem',
          fontWeight: 800,
          marginBottom: 8,
          lineHeight: 1.35,
          color: 'var(--text-primary)',
        }}>
          {article.title}
        </h3>

        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          marginBottom: 16,
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {article.excerpt}
        </p>

        {/* Footer Meta */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border-color)',
          paddingTop: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={13} color="var(--accent-cyan)" />
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{article.authorName}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} />
              {article.readTime}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Eye size={12} />
              {article.viewsCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
