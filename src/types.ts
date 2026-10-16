export type ServiceType = 
  | 'followers' 
  | 'likes' 
  | 'views' 
  | 'auto-likes' 
  | 'comments' 
  | 'tiktok-followers' 
  | 'tiktok-likes' 
  | 'tiktok-views'
  | 'youtube-subscribers'
  | 'youtube-views'
  | 'youtube-likes';

export type QualityTier = 'high-quality' | 'active' | 'vip';

export interface PricingPackage {
  id: string;
  service: ServiceType;
  tier: QualityTier;
  quantity: number;
  label: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  isPopular?: boolean;
  isBestValue?: boolean;
  features: string[];
}

export interface Review {
  id: string;
  name: string;
  username: string;
  avatar: string;
  rating: number;
  date: string;
  service: string;
  title: string;
  text: string;
  likesCount: number;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  category: 'general' | 'followers' | 'likes' | 'payment' | 'safety';
  question: string;
  answer: string;
}

export interface MockPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
}

export interface OrderRecord {
  orderId: string;
  service: ServiceType;
  tier: QualityTier;
  quantity: number;
  username: string;
  email: string;
  date: string;
  totalPrice: number;
  status: 'Processing' | 'Delivering' | 'Completed' | 'Refilling';
  progressPercentage: number;
  deliveredCount: number;
  targetCount: number;
  estimatedRemaining: string;
}

export interface CartItem {
  id: string;
  packageItem: PricingPackage;
  username?: string;
  quantity: number;
}
