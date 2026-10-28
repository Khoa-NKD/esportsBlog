export type UserRole = 'USER' | 'ANALYST' | 'ADMIN';
export type SubscriptionTier = 'FREE' | 'PRO' | 'VIP';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  subscriptionExpiresAt?: string;
  createdAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
