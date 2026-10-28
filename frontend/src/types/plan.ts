import { SubscriptionTier } from './auth';

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  highlightText?: string;
}

export type PaymentMethod = 'VIETQR' | 'MOMO' | 'VNPAY';

export interface PaymentTransaction {
  id: string;
  userId?: string;
  userEmail: string;
  planId: SubscriptionTier;
  planName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  transactionCode: string;
  createdAt: string;
}
