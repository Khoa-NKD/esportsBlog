import { GameId } from './game';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  gameTag: GameId | 'ESPORTS_BIZ';
  authorName: string;
  isPremium: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  viewsCount: number;
  readTime: string;
  createdAt: string;
}

export type ArticleFilter = 'ALL' | 'FREE' | 'PREMIUM';
