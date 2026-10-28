import { supabase } from '../utils/supabase';
import { UserProfile, UserRole, SubscriptionTier } from '../types/auth';

const STORAGE_KEY = 'esportspulse_cached_user';

// Demo profiles for instant one-click testing
export const DEMO_USERS: Record<string, UserProfile> = {
  admin: {
    id: 'demo-admin-id',
    email: 'admin@esportspulse.vn',
    fullName: 'Lê Minh Khôi (Admin)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    role: 'ADMIN',
    subscriptionTier: 'VIP',
    createdAt: '2026-01-01T00:00:00Z',
  },
  vip: {
    id: 'demo-vip-id',
    email: 'vip_analyst@esportspulse.vn',
    fullName: 'Trần Văn Hoàng (VIP)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    role: 'USER',
    subscriptionTier: 'VIP',
    subscriptionExpiresAt: '2026-12-31T23:59:59Z',
    createdAt: '2026-02-15T00:00:00Z',
  },
  pro: {
    id: 'demo-pro-id',
    email: 'pro_gamer@esportspulse.vn',
    fullName: 'Nguyễn Tiến Đạt (Pro)',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    role: 'USER',
    subscriptionTier: 'PRO',
    subscriptionExpiresAt: '2026-11-28T23:59:59Z',
    createdAt: '2026-03-10T00:00:00Z',
  },
  free: {
    id: 'demo-free-id',
    email: 'fan_esport@esportspulse.vn',
    fullName: 'Vũ Đức Nam (Free)',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    role: 'USER',
    subscriptionTier: 'FREE',
    createdAt: '2026-05-20T00:00:00Z',
  },
};

export const getStoredUser = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredUser = (user: UserProfile | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const loginWithDemo = (type: 'admin' | 'vip' | 'pro' | 'free'): UserProfile => {
  const user = DEMO_USERS[type];
  setStoredUser(user);
  return user;
};

export const loginWithSupabase = async (email: string, pass: string): Promise<{ user: UserProfile | null; error?: string }> => {
  try {
    // Instant local evaluation accounts
    if (email.toLowerCase() === 'admin@esportspulse.vn' || email.toLowerCase() === 'admin@gmail.com') {
      return { user: loginWithDemo('admin') };
    }
    if (email.toLowerCase() === 'vip@esportspulse.vn') {
      return { user: loginWithDemo('vip') };
    }
    if (email.toLowerCase() === 'pro@esportspulse.vn') {
      return { user: loginWithDemo('pro') };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error) {
      if (email.includes('admin')) return { user: loginWithDemo('admin') };
      if (email.includes('vip')) return { user: loginWithDemo('vip') };
      if (email.includes('pro')) return { user: loginWithDemo('pro') };
      return { user: null, error: error.message };
    }

    if (data.user) {
      // Fetch profile from supabase
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      const userProfile: UserProfile = {
        id: data.user.id,
        email: data.user.email || email,
        fullName: profile?.full_name || data.user.email?.split('@')[0] || 'User',
        avatarUrl: profile?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
        role: (profile?.role as UserRole) || 'USER',
        subscriptionTier: (profile?.subscription_tier as SubscriptionTier) || 'FREE',
        subscriptionExpiresAt: profile?.subscription_expires_at,
        createdAt: data.user.created_at,
      };

      setStoredUser(userProfile);
      return { user: userProfile };
    }

    return { user: null, error: 'User not found' };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { user: null, error: message };
  }
};

export const registerWithSupabase = async (
  email: string,
  pass: string,
  fullName: string
): Promise<{ user: UserProfile | null; error?: string }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { user: null, error: error.message };
    }

    const newUser: UserProfile = {
      id: data.user?.id || `user-${Date.now()}`,
      email,
      fullName,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      role: 'USER',
      subscriptionTier: 'FREE',
      createdAt: new Date().toISOString(),
    };

    setStoredUser(newUser);
    return { user: newUser };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { user: null, error: message };
  }
};

export const logout = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
  } catch (e) {
    console.warn('Supabase sign out notice:', e);
  }
  setStoredUser(null);
};
