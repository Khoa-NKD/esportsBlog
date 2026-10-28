import { GameId } from './game';

export type MatchStatus = 'LIVE' | 'UPCOMING' | 'FINISHED';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  region: string;
  winRateLast5: string;
}

export interface MatchMap {
  mapNumber: number;
  mapName: string;
  scoreA: number;
  scoreB: number;
  status: 'PLAYING' | 'FINISHED' | 'WAITING';
  winnerId?: string;
}

export interface MatchOdds {
  teamA: number;
  teamB: number;
  handicap?: string;
}

export interface Match {
  id: string;
  gameId: GameId;
  tournamentName: string;
  tournamentStage: string;
  status: MatchStatus;
  startTime: string; // ISO string
  format: 'BO1' | 'BO3' | 'BO5' | 'BO7';
  teamA: Team;
  teamB: Team;
  scoreA: number;
  scoreB: number;
  currentMapNumber?: number;
  maps?: MatchMap[];
  odds: MatchOdds;
  hasPrediction: boolean;
  predictionSnippet?: string;
  streamUrl?: string;
  viewersCount?: number;
}
