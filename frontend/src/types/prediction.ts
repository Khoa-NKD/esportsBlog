export interface ExpertPick {
  expertName: string;
  avatar: string;
  title: string;
  winRate: number; // e.g. 78%
  predictedWinnerId: string;
  predictedScore: string;
  confidencePercent: number;
  reasoning: string[];
}

export interface CommunityVote {
  teamAVotes: number;
  teamBVotes: number;
  totalVotes: number;
  teamAPercent: number;
  teamBPercent: number;
  userVotedTeamId?: string;
}

export interface MatchPrediction {
  matchId: string;
  aiPredictedWinnerId: string;
  aiConfidence: number; // 0 - 100
  aiPredictedScore: string;
  aiAnalysisSummary: string;
  headToHead: {
    teamAWins: number;
    teamBWins: number;
    recentResults: ('A' | 'B')[];
  };
  keyFactors: {
    factor: string;
    advantage: 'teamA' | 'teamB' | 'neutral';
    detail: string;
  }[];
  expertPicks: ExpertPick[];
  communityVote: CommunityVote;
  updatedAt: string;
}
