import React, { useState } from 'react';
import { Article, ArticleFilter } from '../../types/article';
import { UserProfile } from '../../types/auth';
import { GameId, SUPPORTED_GAMES } from '../../types/game';
import { ArticleCard } from './ArticleCard';
import { Search, Crown } from 'lucide-react';

interface ArticleListProps {
  articles: Article[];
  user: UserProfile | null;
  onSelectArticle: (article: Article) => void;
  onGoToPricing: () => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  user,
  onSelectArticle,
  onGoToPricing,
}) => {
  const [filterType, setFilterType] = useState<ArticleFilter>('ALL');
  const [selectedGame, setSelectedGame] = useState<GameId | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter((art) => {
    const matchFilter =
      filterType === 'ALL' ||
      (filterType === 'FREE' && !art.isPremium) ||
      (filterType === 'PREMIUM' && art.isPremium);

    const matchGame = selectedGame === 'ALL' || art.gameTag === selectedGame;

    const matchSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchFilter && matchGame && matchSearch;
  });

  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', width: '100%' }}>
      {/* Banner VIP CTA if user is not VIP */}
      {(!user || user.subscriptionTier === 'FREE') && (
        <div className="glass-panel" style={{
          padding: '20px 24px',
          marginBottom: 24,
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)',
            }}>
              <Crown size={22} color="#000" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
                Khám Phá Kèo VIP & Phân Tích Độc Quyền
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Nâng cấp lên gói PRO hoặc VIP để mở khóa toàn bộ bài viết phân tích cấm chọn và nhận định AI.
              </div>
            </div>
          </div>

          <button
            onClick={onGoToPricing}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#000',
              padding: '8px 18px',
              fontSize: '0.9rem',
            }}
          >
            <span>Nâng Cấp Gói Ngay</span>
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 14,
        marginBottom: 24,
      }}>
        {/* Type pills: ALL / FREE / VIP */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setFilterType('ALL')}
            style={{
              background: filterType === 'ALL' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              color: filterType === 'ALL' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              border: filterType === 'ALL' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Tất Cả ({articles.length})
          </button>

          <button
            onClick={() => setFilterType('FREE')}
            style={{
              background: filterType === 'FREE' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              color: filterType === 'FREE' ? '#10b981' : 'var(--text-secondary)',
              border: filterType === 'FREE' ? '1px solid #10b981' : '1px solid var(--border-color)',
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Bài Viết Miễn Phí
          </button>

          <button
            onClick={() => setFilterType('PREMIUM')}
            style={{
              background: filterType === 'PREMIUM' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              color: filterType === 'PREMIUM' ? '#fbbf24' : 'var(--text-secondary)',
              border: filterType === 'PREMIUM' ? '1px solid #f59e0b' : '1px solid var(--border-color)',
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: '0.85rem',
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
        </div>

        {/* Search input */}
        <div style={{ position: 'relative', minWidth: 260 }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 12, top: 11 }} />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết, trận đấu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 14px 8px 36px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Game Filter Pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {SUPPORTED_GAMES.map((game) => {
          const isSelected = selectedGame === game.id;
          return (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              style={{
                background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: isSelected ? game.color : 'var(--text-secondary)',
                border: isSelected ? `1px solid ${game.color}` : '1px solid var(--border-color)',
                padding: '4px 12px',
                borderRadius: 6,
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {game.shortName}
            </button>
          );
        })}
      </div>

      {/* Articles Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: 20,
      }}>
        {filteredArticles.map((art) => (
          <ArticleCard
            key={art.id}
            article={art}
            user={user}
            onSelect={onSelectArticle}
          />
        ))}

        {filteredArticles.length === 0 && (
          <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: 50, textAlign: 'center', color: 'var(--text-muted)' }}>
            Không tìm thấy bài viết nào phù hợp với bộ lọc hiện tại.
          </div>
        )}
      </div>
    </div>
  );
};
