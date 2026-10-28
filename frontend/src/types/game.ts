export type GameId = 'ALL' | 'VALORANT' | 'CS2' | 'LOL' | 'AOV';

export interface GameInfo {
  id: GameId;
  name: string;
  shortName: string;
  tag: string;
  color: string;
  glowColor: string;
  iconName: string;
}

export const SUPPORTED_GAMES: GameInfo[] = [
  {
    id: 'ALL',
    name: 'Tất cả game',
    shortName: 'Tất cả',
    tag: 'ALL',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    iconName: 'Flame',
  },
  {
    id: 'VALORANT',
    name: 'Valorant',
    shortName: 'VAL',
    tag: 'VCT 2026',
    color: '#ff4655',
    glowColor: 'rgba(255, 70, 85, 0.4)',
    iconName: 'Crosshair',
  },
  {
    id: 'CS2',
    name: 'Counter-Strike 2',
    shortName: 'CS2',
    tag: 'Major / BLAST',
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    iconName: 'Target',
  },
  {
    id: 'LOL',
    name: 'Liên Minh Huyền Thoại',
    shortName: 'LMHT',
    tag: 'LCK / VCS',
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    iconName: 'Shield',
  },
  {
    id: 'AOV',
    name: 'Liên Quân Mobile',
    shortName: 'AOV',
    tag: 'ĐTDV / AWC',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    iconName: 'Zap',
  },
];
