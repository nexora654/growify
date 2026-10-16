import { PricingPackage, ServiceType } from '../types';

export const ALL_PACKAGES: PricingPackage[] = [
  // --- INSTAGRAM FOLLOWERS (High Quality) ---
  {
    id: 'ig-f-hq-100',
    service: 'followers',
    tier: 'high-quality',
    quantity: 100,
    label: '100 Followers',
    originalPrice: 4.99,
    salePrice: 2.97,
    discount: 40,
    features: [
      'High-Quality Real Profiles',
      'Instant 60s Start',
      'No Password Required',
      'Guaranteed Safe Delivery',
      '30-Day Free Refill',
      '24/7 Dedicated Support'
    ]
  },
  {
    id: 'ig-f-hq-250',
    service: 'followers',
    tier: 'high-quality',
    quantity: 250,
    label: '250 Followers',
    originalPrice: 7.99,
    salePrice: 4.99,
    discount: 38,
    features: [
      'High-Quality Real Profiles',
      'Instant 60s Start',
      'No Password Required',
      'Guaranteed Safe Delivery',
      '30-Day Free Refill',
      '24/7 Dedicated Support'
    ]
  },
  {
    id: 'ig-f-hq-500',
    service: 'followers',
    tier: 'high-quality',
    quantity: 500,
    label: '500 Followers',
    originalPrice: 12.99,
    salePrice: 7.99,
    discount: 38,
    isPopular: true,
    features: [
      'High-Quality Real Profiles',
      'Instant 60s Start',
      'No Password Required',
      'Guaranteed Safe Delivery',
      '30-Day Free Refill',
      '24/7 Dedicated Support'
    ]
  },
  {
    id: 'ig-f-hq-1000',
    service: 'followers',
    tier: 'high-quality',
    quantity: 1000,
    label: '1,000 Followers',
    originalPrice: 22.99,
    salePrice: 13.99,
    discount: 40,
    features: [
      'High-Quality Real Profiles',
      'Instant 60s Start',
      'No Password Required',
      'Guaranteed Safe Delivery',
      '30-Day Free Refill',
      '24/7 Dedicated Support'
    ]
  },
  {
    id: 'ig-f-hq-2500',
    service: 'followers',
    tier: 'high-quality',
    quantity: 2500,
    label: '2,500 Followers',
    originalPrice: 49.99,
    salePrice: 29.99,
    discount: 40,
    isBestValue: true,
    features: [
      'High-Quality Real Profiles',
      'Instant 60s Start',
      'No Password Required',
      'Guaranteed Safe Delivery',
      '30-Day Free Refill',
      '24/7 Dedicated Support'
    ]
  },
  {
    id: 'ig-f-hq-5000',
    service: 'followers',
    tier: 'high-quality',
    quantity: 5000,
    label: '5,000 Followers',
    originalPrice: 79.99,
    salePrice: 44.99,
    discount: 44,
    features: [
      'High-Quality Real Profiles',
      'Instant 60s Start',
      'No Password Required',
      'Guaranteed Safe Delivery',
      '30-Day Free Refill',
      '24/7 Dedicated Support'
    ]
  },

  // --- INSTAGRAM FOLLOWERS (Active / Premium) ---
  {
    id: 'ig-f-act-500',
    service: 'followers',
    tier: 'active',
    quantity: 500,
    label: '500 Active Followers',
    originalPrice: 19.99,
    salePrice: 11.99,
    discount: 40,
    features: [
      'Active People with Recent Posts',
      'Higher Retention & Engagement',
      'Boosts Instagram Explore Algorithm',
      'Instant Gradual Natural Delivery',
      'No Password Required',
      '30-Day Auto Refill Guarantee'
    ]
  },
  {
    id: 'ig-f-act-1000',
    service: 'followers',
    tier: 'active',
    quantity: 1000,
    label: '1,000 Active Followers',
    originalPrice: 32.99,
    salePrice: 19.99,
    discount: 40,
    isPopular: true,
    features: [
      'Active People with Recent Posts',
      'Higher Retention & Engagement',
      'Boosts Instagram Explore Algorithm',
      'Instant Gradual Natural Delivery',
      'No Password Required',
      '30-Day Auto Refill Guarantee'
    ]
  },
  {
    id: 'ig-f-act-2500',
    service: 'followers',
    tier: 'active',
    quantity: 2500,
    label: '2,500 Active Followers',
    originalPrice: 79.99,
    salePrice: 49.99,
    discount: 38,
    isBestValue: true,
    features: [
      'Active People with Recent Posts',
      'Higher Retention & Engagement',
      'Boosts Instagram Explore Algorithm',
      'Instant Gradual Natural Delivery',
      'No Password Required',
      '30-Day Auto Refill Guarantee'
    ]
  },
  {
    id: 'ig-f-act-5000',
    service: 'followers',
    tier: 'active',
    quantity: 5000,
    label: '5,000 Active Followers',
    originalPrice: 139.99,
    salePrice: 84.99,
    discount: 39,
    features: [
      'Active People with Recent Posts',
      'Higher Retention & Engagement',
      'Boosts Instagram Explore Algorithm',
      'Instant Gradual Natural Delivery',
      'No Password Required',
      '30-Day Auto Refill Guarantee'
    ]
  },

  // --- INSTAGRAM FOLLOWERS (VIP / Influencer) ---
  {
    id: 'ig-f-vip-1000',
    service: 'followers',
    tier: 'vip',
    quantity: 1000,
    label: '1,000 VIP Followers',
    originalPrice: 59.99,
    salePrice: 39.99,
    discount: 33,
    features: [
      'Top-Tier Influencer Profiles (US/EU/CA)',
      'Verified-Style Authentic Activity',
      'Maximum Engagement & Feed Presence',
      'Algorithmic Trust Score Booster',
      'Priority VIP Drip Delivery',
      'Lifetime Refill Warranty + Account Manager'
    ]
  },
  {
    id: 'ig-f-vip-2500',
    service: 'followers',
    tier: 'vip',
    quantity: 2500,
    label: '2,500 VIP Followers',
    originalPrice: 129.99,
    salePrice: 89.99,
    discount: 31,
    isPopular: true,
    features: [
      'Top-Tier Influencer Profiles (US/EU/CA)',
      'Verified-Style Authentic Activity',
      'Maximum Engagement & Feed Presence',
      'Algorithmic Trust Score Booster',
      'Priority VIP Drip Delivery',
      'Lifetime Refill Warranty + Account Manager'
    ]
  },
  {
    id: 'ig-f-vip-5000',
    service: 'followers',
    tier: 'vip',
    quantity: 5000,
    label: '5,000 VIP Followers',
    originalPrice: 249.99,
    salePrice: 159.99,
    discount: 36,
    isBestValue: true,
    features: [
      'Top-Tier Influencer Profiles (US/EU/CA)',
      'Verified-Style Authentic Activity',
      'Maximum Engagement & Feed Presence',
      'Algorithmic Trust Score Booster',
      'Priority VIP Drip Delivery',
      'Lifetime Refill Warranty + Account Manager'
    ]
  },

  // --- INSTAGRAM LIKES (High Quality) ---
  {
    id: 'ig-l-hq-100',
    service: 'likes',
    tier: 'high-quality',
    quantity: 100,
    label: '100 Likes',
    originalPrice: 3.49,
    salePrice: 1.99,
    discount: 43,
    features: [
      'High-Quality Likes',
      'Split Across Multiple Posts',
      'Fast Instant Delivery',
      'No Password Required',
      'Safe for Creator & Business Accounts'
    ]
  },
  {
    id: 'ig-l-hq-250',
    service: 'likes',
    tier: 'high-quality',
    quantity: 250,
    label: '250 Likes',
    originalPrice: 5.99,
    salePrice: 3.49,
    discount: 42,
    features: [
      'High-Quality Likes',
      'Split Across Multiple Posts',
      'Fast Instant Delivery',
      'No Password Required',
      'Safe for Creator & Business Accounts'
    ]
  },
  {
    id: 'ig-l-hq-500',
    service: 'likes',
    tier: 'high-quality',
    quantity: 500,
    label: '500 Likes',
    originalPrice: 9.99,
    salePrice: 5.99,
    discount: 40,
    isPopular: true,
    features: [
      'High-Quality Likes',
      'Split Across Multiple Posts',
      'Fast Instant Delivery',
      'No Password Required',
      'Safe for Creator & Business Accounts'
    ]
  },
  {
    id: 'ig-l-hq-1000',
    service: 'likes',
    tier: 'high-quality',
    quantity: 1000,
    label: '1,000 Likes',
    originalPrice: 18.99,
    salePrice: 10.99,
    discount: 42,
    isBestValue: true,
    features: [
      'High-Quality Likes',
      'Split Across Multiple Posts',
      'Fast Instant Delivery',
      'No Password Required',
      'Safe for Creator & Business Accounts'
    ]
  },
  {
    id: 'ig-l-hq-2500',
    service: 'likes',
    tier: 'high-quality',
    quantity: 2500,
    label: '2,500 Likes',
    originalPrice: 39.99,
    salePrice: 22.99,
    discount: 43,
    features: [
      'High-Quality Likes',
      'Split Across Multiple Posts',
      'Fast Instant Delivery',
      'No Password Required',
      'Safe for Creator & Business Accounts'
    ]
  },

  // --- INSTAGRAM LIKES (Active / Premium) ---
  {
    id: 'ig-l-act-250',
    service: 'likes',
    tier: 'active',
    quantity: 250,
    label: '250 Premium Likes',
    originalPrice: 7.99,
    salePrice: 4.99,
    discount: 38,
    features: [
      '100% Real Active Users',
      'Increases Explore Page Discovery',
      'Option to Split Between Posts',
      'Natural Algorithmic Delivery Speed',
      'No Password Required'
    ]
  },
  {
    id: 'ig-l-act-500',
    service: 'likes',
    tier: 'active',
    quantity: 500,
    label: '500 Premium Likes',
    originalPrice: 13.99,
    salePrice: 8.99,
    discount: 36,
    isPopular: true,
    features: [
      '100% Real Active Users',
      'Increases Explore Page Discovery',
      'Option to Split Between Posts',
      'Natural Algorithmic Delivery Speed',
      'No Password Required'
    ]
  },
  {
    id: 'ig-l-act-1000',
    service: 'likes',
    tier: 'active',
    quantity: 1000,
    label: '1,000 Premium Likes',
    originalPrice: 26.99,
    salePrice: 16.99,
    discount: 37,
    isBestValue: true,
    features: [
      '100% Real Active Users',
      'Increases Explore Page Discovery',
      'Option to Split Between Posts',
      'Natural Algorithmic Delivery Speed',
      'No Password Required'
    ]
  },

  // --- INSTAGRAM VIEWS (High Quality) ---
  {
    id: 'ig-v-hq-500',
    service: 'views',
    tier: 'high-quality',
    quantity: 500,
    label: '500 Video / Reel Views',
    originalPrice: 2.99,
    salePrice: 1.69,
    discount: 43,
    features: [
      'Super Fast Reel & Video Views',
      'Split on Multiple Videos',
      'Improves Video Ranking',
      'Instant Dispatch within 30s',
      'No Password Required'
    ]
  },
  {
    id: 'ig-v-hq-1000',
    service: 'views',
    tier: 'high-quality',
    quantity: 1000,
    label: '1,000 Video / Reel Views',
    originalPrice: 4.99,
    salePrice: 2.79,
    discount: 44,
    features: [
      'Super Fast Reel & Video Views',
      'Split on Multiple Videos',
      'Improves Video Ranking',
      'Instant Dispatch within 30s',
      'No Password Required'
    ]
  },
  {
    id: 'ig-v-hq-2500',
    service: 'views',
    tier: 'high-quality',
    quantity: 2500,
    label: '2,500 Video / Reel Views',
    originalPrice: 8.99,
    salePrice: 4.99,
    discount: 44,
    isPopular: true,
    features: [
      'Super Fast Reel & Video Views',
      'Split on Multiple Videos',
      'Improves Video Ranking',
      'Instant Dispatch within 30s',
      'No Password Required'
    ]
  },
  {
    id: 'ig-v-hq-5000',
    service: 'views',
    tier: 'high-quality',
    quantity: 5000,
    label: '5,000 Video / Reel Views',
    originalPrice: 15.99,
    salePrice: 8.99,
    discount: 44,
    isBestValue: true,
    features: [
      'Super Fast Reel & Video Views',
      'Split on Multiple Videos',
      'Improves Video Ranking',
      'Instant Dispatch within 30s',
      'No Password Required'
    ]
  },
  {
    id: 'ig-v-hq-10000',
    service: 'views',
    tier: 'high-quality',
    quantity: 10000,
    label: '10,000 Video / Reel Views',
    originalPrice: 26.99,
    salePrice: 14.99,
    discount: 44,
    features: [
      'Super Fast Reel & Video Views',
      'Split on Multiple Videos',
      'Improves Video Ranking',
      'Instant Dispatch within 30s',
      'No Password Required'
    ]
  },

  // --- AUTOMATIC LIKES (Monthly / Continuous) ---
  {
    id: 'ig-auto-1',
    service: 'auto-likes',
    tier: 'active',
    quantity: 100,
    label: '100 Likes per New Post',
    originalPrice: 19.99,
    salePrice: 12.99,
    discount: 35,
    features: [
      'Auto-detects new posts within 60s',
      'Includes FREE views on video posts',
      'Covers up to 4 new posts per day',
      'Real active community accounts',
      'Cancel anytime with 1-click'
    ]
  },
  {
    id: 'ig-auto-2',
    service: 'auto-likes',
    tier: 'active',
    quantity: 250,
    label: '250 Likes per New Post',
    originalPrice: 34.99,
    salePrice: 24.99,
    discount: 28,
    isPopular: true,
    features: [
      'Auto-detects new posts within 60s',
      'Includes FREE views on video posts',
      'Covers up to 4 new posts per day',
      'Real active community accounts',
      'Cancel anytime with 1-click'
    ]
  },
  {
    id: 'ig-auto-3',
    service: 'auto-likes',
    tier: 'active',
    quantity: 500,
    label: '500 Likes per New Post',
    originalPrice: 59.99,
    salePrice: 42.99,
    discount: 28,
    isBestValue: true,
    features: [
      'Auto-detects new posts within 60s',
      'Includes FREE views on video posts',
      'Covers up to 4 new posts per day',
      'Real active community accounts',
      'Cancel anytime with 1-click'
    ]
  },

  // --- INSTAGRAM COMMENTS ---
  {
    id: 'ig-c-10',
    service: 'comments',
    tier: 'high-quality',
    quantity: 10,
    label: '10 Custom Comments',
    originalPrice: 4.99,
    salePrice: 3.49,
    discount: 30,
    features: [
      'Custom or Relevant AI Comments',
      'Real Verified-looking Accounts',
      'Gradual Natural Pacing',
      'No Password Required',
      'Instant Order Processing'
    ]
  },
  {
    id: 'ig-c-25',
    service: 'comments',
    tier: 'high-quality',
    quantity: 25,
    label: '25 Custom Comments',
    originalPrice: 9.99,
    salePrice: 6.99,
    discount: 30,
    isPopular: true,
    features: [
      'Custom or Relevant AI Comments',
      'Real Verified-looking Accounts',
      'Gradual Natural Pacing',
      'No Password Required',
      'Instant Order Processing'
    ]
  },
  {
    id: 'ig-c-50',
    service: 'comments',
    tier: 'high-quality',
    quantity: 50,
    label: '50 Custom Comments',
    originalPrice: 16.99,
    salePrice: 11.99,
    discount: 29,
    features: [
      'Custom or Relevant AI Comments',
      'Real Verified-looking Accounts',
      'Gradual Natural Pacing',
      'No Password Required',
      'Instant Order Processing'
    ]
  },
  {
    id: 'ig-c-100',
    service: 'comments',
    tier: 'high-quality',
    quantity: 100,
    label: '100 Custom Comments',
    originalPrice: 29.99,
    salePrice: 19.99,
    discount: 33,
    isBestValue: true,
    features: [
      'Custom or Relevant AI Comments',
      'Real Verified-looking Accounts',
      'Gradual Natural Pacing',
      'No Password Required',
      'Instant Order Processing'
    ]
  },

  // --- TIKTOK FOLLOWERS ---
  {
    id: 'tt-f-100',
    service: 'tiktok-followers',
    tier: 'high-quality',
    quantity: 100,
    label: '100 TikTok Followers',
    originalPrice: 4.99,
    salePrice: 2.99,
    discount: 40,
    features: [
      'Real TikTok Accounts',
      'Instant 60s Start',
      'No Password Needed',
      'Safe FYP-friendly Delivery',
      '30-Day Free Refill'
    ]
  },
  {
    id: 'tt-f-500',
    service: 'tiktok-followers',
    tier: 'high-quality',
    quantity: 500,
    label: '500 TikTok Followers',
    originalPrice: 14.99,
    salePrice: 8.99,
    discount: 40,
    isPopular: true,
    features: [
      'Real TikTok Accounts',
      'Instant 60s Start',
      'No Password Needed',
      'Safe FYP-friendly Delivery',
      '30-Day Free Refill'
    ]
  },
  {
    id: 'tt-f-1000',
    service: 'tiktok-followers',
    tier: 'high-quality',
    quantity: 1000,
    label: '1,000 TikTok Followers',
    originalPrice: 24.99,
    salePrice: 15.99,
    discount: 36,
    isBestValue: true,
    features: [
      'Real TikTok Accounts',
      'Instant 60s Start',
      'Unlocks TikTok Live feature',
      'Safe FYP-friendly Delivery',
      '30-Day Free Refill'
    ]
  },

  // --- YOUTUBE SUBSCRIBERS ---
  {
    id: 'yt-s-100',
    service: 'youtube-subscribers',
    tier: 'high-quality',
    quantity: 100,
    label: '100 YouTube Subscribers',
    originalPrice: 19.99,
    salePrice: 12.99,
    discount: 35,
    features: [
      'Real Active YouTube Accounts',
      'Safe Monetization Friendly',
      'Guaranteed Non-Drop Pacing',
      'No Channel Password Needed',
      '30-Day Auto Refill'
    ]
  },
  {
    id: 'yt-s-500',
    service: 'youtube-subscribers',
    tier: 'high-quality',
    quantity: 500,
    label: '500 YouTube Subscribers',
    originalPrice: 59.99,
    salePrice: 39.99,
    discount: 33,
    isPopular: true,
    features: [
      'Real Active YouTube Accounts',
      'Safe Monetization Friendly',
      'Guaranteed Non-Drop Pacing',
      'No Channel Password Needed',
      '30-Day Auto Refill'
    ]
  },
  {
    id: 'yt-s-1000',
    service: 'youtube-subscribers',
    tier: 'high-quality',
    quantity: 1000,
    label: '1,000 YouTube Subscribers',
    originalPrice: 99.99,
    salePrice: 69.99,
    discount: 30,
    isBestValue: true,
    features: [
      'Real Active YouTube Accounts',
      'Unlocks Channel Monetization (1K)',
      'Natural Organic Flow Delivery',
      'No Channel Password Needed',
      '30-Day Auto Refill'
    ]
  },

  // --- YOUTUBE VIEWS ---
  {
    id: 'yt-v-1000',
    service: 'youtube-views',
    tier: 'high-quality',
    quantity: 1000,
    label: '1,000 YouTube Views',
    originalPrice: 9.99,
    salePrice: 5.99,
    discount: 40,
    features: [
      'High Watch Time Retention',
      'Rank Higher in Suggested Videos',
      'Safe for Monetized Videos',
      'Instant Processing & Start'
    ]
  },
  {
    id: 'yt-v-5000',
    service: 'youtube-views',
    tier: 'high-quality',
    quantity: 5000,
    label: '5,000 YouTube Views',
    originalPrice: 29.99,
    salePrice: 19.99,
    discount: 33,
    isPopular: true,
    features: [
      'High Watch Time Retention',
      'Rank Higher in Suggested Videos',
      'Safe for Monetized Videos',
      'Instant Processing & Start'
    ]
  },

  // --- YOUTUBE LIKES ---
  {
    id: 'yt-l-100',
    service: 'youtube-likes',
    tier: 'high-quality',
    quantity: 100,
    label: '100 YouTube Likes',
    originalPrice: 7.99,
    salePrice: 4.99,
    discount: 37,
    features: [
      'Genuine Channel Likes',
      'Improves Like-to-View Ratio',
      'Safe Delivery Algorithm',
      'Instant 60s Dispatch'
    ]
  },
  {
    id: 'yt-l-500',
    service: 'youtube-likes',
    tier: 'high-quality',
    quantity: 500,
    label: '500 YouTube Likes',
    originalPrice: 24.99,
    salePrice: 14.99,
    discount: 40,
    isPopular: true,
    features: [
      'Genuine Channel Likes',
      'Improves Like-to-View Ratio',
      'Safe Delivery Algorithm',
      'Instant 60s Dispatch'
    ]
  }
];

export const SERVICE_METADATA: Record<ServiceType, {
  name: string;
  iconName: string;
  shortDesc: string;
  badge: string;
  startingPrice: string;
}> = {
  followers: {
    name: 'Instagram Followers',
    iconName: 'Users',
    shortDesc: 'Grow your social proof with genuine, authentic Instagram followers.',
    badge: '🔥 Most Popular',
    startingPrice: '$2.97'
  },
  likes: {
    name: 'Instagram Likes',
    iconName: 'Heart',
    shortDesc: 'Boost engagement and push your posts directly into the Explore page.',
    badge: '⚡ Instant Speed',
    startingPrice: '$1.99'
  },
  views: {
    name: 'Instagram Views',
    iconName: 'Eye',
    shortDesc: 'High-speed views for Reels and videos to ignite viral algorithm reach.',
    badge: '🎥 High Retention',
    startingPrice: '$1.69'
  },
  'auto-likes': {
    name: 'Automatic Likes',
    iconName: 'Zap',
    shortDesc: 'Hands-free automatic engagement for every single new post you publish.',
    badge: '🤖 Automated',
    startingPrice: '$12.99'
  },
  comments: {
    name: 'Instagram Comments',
    iconName: 'MessageSquare',
    shortDesc: 'Relevant, engaging comments written by real community members.',
    badge: '💬 Custom Text',
    startingPrice: '$3.99'
  },
  'tiktok-followers': {
    name: 'TikTok Followers',
    iconName: 'Music',
    shortDesc: 'Gain authentic followers and unlock TikTok Live streaming capabilities.',
    badge: '🎵 FYP Booster',
    startingPrice: '$2.99'
  },
  'tiktok-likes': {
    name: 'TikTok Likes',
    iconName: 'Flame',
    shortDesc: 'Instant engagement to trigger the TikTok algorithm onto user feeds.',
    badge: '🚀 Fast Growth',
    startingPrice: '$1.99'
  },
  'tiktok-views': {
    name: 'TikTok Views',
    iconName: 'PlayCircle',
    shortDesc: 'Deliver tens of thousands of video views to amplify your reach.',
    badge: '📈 Trending',
    startingPrice: '$1.49'
  },
  'youtube-subscribers': {
    name: 'YouTube Subscribers',
    iconName: 'Youtube',
    shortDesc: 'Accelerate your YouTube channel growth and monetization eligibility.',
    badge: '▶️ Monetization',
    startingPrice: '$12.99'
  },
  'youtube-views': {
    name: 'YouTube Views',
    iconName: 'Play',
    shortDesc: 'High-retention views that push videos onto suggested and search feeds.',
    badge: '🔥 High Watch Time',
    startingPrice: '$5.99'
  },
  'youtube-likes': {
    name: 'YouTube Likes',
    iconName: 'ThumbsUp',
    shortDesc: 'Genuine viewer likes to improve video engagement ratios.',
    badge: '👍 Fast Delivery',
    startingPrice: '$4.99'
  }
};
