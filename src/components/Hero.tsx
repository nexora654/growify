import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Sparkles,
  Star,
  Check
} from 'lucide-react';
import { ServiceType, PricingPackage } from '../types';

interface HeroProps {
  selectedService: ServiceType;
  onSelectService: (service: ServiceType) => void;
  onSelectPackageForCheckout: (pkg: PricingPackage) => void;
  formatPrice: (price: number) => string;
  onNavigateToLogin?: () => void;
}

type PlatformTab = 'instagram' | 'tiktok' | 'youtube';

export const Hero: React.FC<HeroProps> = ({
  selectedService,
  onSelectService,
  onSelectPackageForCheckout,
  formatPrice,
  onNavigateToLogin
}) => {
  const [activePlatform, setActivePlatform] = useState<PlatformTab>('instagram');
  const [liveOrderIndex, setLiveOrderIndex] = useState(0);

  const mockLiveDeliveries = [
    { qty: '100 followers', time: '43 mins ago' },
    { qty: '500 likes', time: '12 mins ago' },
    { qty: '2,500 views', time: '8 mins ago' },
    { qty: '50 comments', time: '2 mins ago' },
    { qty: '1,000 followers', time: 'Just now' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveOrderIndex((prev) => (prev + 1) % mockLiveDeliveries.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [mockLiveDeliveries.length]);

  const handleCtaClick = (service: ServiceType) => {
    onSelectService(service);
    if (onNavigateToLogin) {
      onNavigateToLogin();
      return;
    }
    const element = document.getElementById('pricing-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentDelivery = mockLiveDeliveries[liveOrderIndex];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-[#f4f7fb]/80 via-[#f8fafc] to-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header Title */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-[#192231] tracking-tight leading-[1.14] font-display">
            Buy Instagram Followers and Other Interactions{' '}
            <span className="text-[#ff7a00]">Delivered in Minutes!</span>
          </h1>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Count on <strong className="text-slate-800 font-semibold">Growify's</strong> #1 ranked growth platform to rapidly accelerate your social media presence with authentic engagement!
          </p>
        </div>

        {/* Central Platform & Services Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40 overflow-hidden">
          {/* Top Platform Bar - Instagram Services */}
          <div className="bg-[#f0f4f9] border-b border-slate-200/80 flex items-stretch">
            {/* Instagram Tab */}
            <div
              id="hero-platform-instagram"
              className="w-full py-3.5 sm:py-4 px-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 text-left bg-white text-slate-900 font-bold"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Official Instagram Brand Glyph Icon */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] p-[6px] sm:p-[7px] flex items-center justify-center shrink-0 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <span className="text-base sm:text-lg font-extrabold text-slate-900 font-display">Instagram Services</span>
                  <span className="hidden md:inline-block ml-2 text-xs font-medium text-slate-500">Official High-Speed Network</span>
                </div>
              </div>

              {/* Rating badge */}
              <div className="flex items-center gap-1.5 bg-slate-100/90 text-slate-700 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-200/60 shrink-0">
                <span className="text-emerald-500 font-black">★</span>
                <span>5.0</span>
                <span className="text-slate-500 font-normal">3,450+ Ratings</span>
              </div>
            </div>
          </div>

          {/* 4 Large Action CTA Buttons in 2x2 Grid */}
          <div className="p-4 sm:p-6 md:p-8 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              <button
                id="hero-btn-ig-followers"
                onClick={() => handleCtaClick('followers')}
                className="w-full bg-gradient-to-r from-[#ff8848] to-[#ff5232] hover:from-[#ff7935] hover:to-[#f04221] text-white font-extrabold text-xs sm:text-sm md:text-base tracking-wider uppercase py-3.5 sm:py-4 md:py-5 px-4 sm:px-6 rounded-2xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center text-center min-h-[44px]"
              >
                GET FREE INSTAGRAM FOLLOWERS
              </button>

              <button
                id="hero-btn-ig-likes"
                onClick={() => handleCtaClick('likes')}
                className="w-full bg-gradient-to-r from-[#ff7e42] to-[#ff4a2b] hover:from-[#ff6f30] hover:to-[#ea3c1d] text-white font-extrabold text-xs sm:text-sm md:text-base tracking-wider uppercase py-3.5 sm:py-4 md:py-5 px-4 sm:px-6 rounded-2xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center text-center min-h-[44px]"
              >
                GET FREE INSTAGRAM LIKES
              </button>

              <button
                id="hero-btn-ig-views"
                onClick={() => handleCtaClick('views')}
                className="w-full bg-gradient-to-r from-[#ff8848] to-[#ff5232] hover:from-[#ff7935] hover:to-[#f04221] text-white font-extrabold text-xs sm:text-sm md:text-base tracking-wider uppercase py-3.5 sm:py-4 md:py-5 px-4 sm:px-6 rounded-2xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center text-center min-h-[44px]"
              >
                GET FREE INSTAGRAM VIEWS
              </button>

              <button
                id="hero-btn-ig-comments"
                onClick={() => handleCtaClick('comments')}
                className="w-full bg-gradient-to-r from-[#ff7e42] to-[#ff4a2b] hover:from-[#ff6f30] hover:to-[#ea3c1d] text-white font-extrabold text-xs sm:text-sm md:text-base tracking-wider uppercase py-3.5 sm:py-4 md:py-5 px-4 sm:px-6 rounded-2xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center text-center min-h-[44px]"
              >
                GET FREE INSTAGRAM COMMENTS
              </button>
            </div>
          </div>

          {/* Bottom Social Proof & Trust Strip inside the Card */}
          <div className="border-t border-slate-100 px-4 sm:px-8 py-3.5 sm:py-4 bg-white flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-4">
            {/* Left: Trustpilot 5 Solid Green Star Squares */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#00b67a] flex items-center justify-center text-white text-[10px] sm:text-xs font-black shadow-2xs"
                >
                  ★
                </div>
              ))}
            </div>

            <div className="hidden sm:block h-6 w-px bg-slate-200" />

            {/* Center: Live Order Pill */}
            <div className="bg-[#e8f9f0] border border-[#b8f0d2] text-[#147a46] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full flex items-center gap-2 text-[11px] sm:text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00b67a] animate-pulse"></span>
              <span>
                <strong className="font-extrabold">{currentDelivery.qty}</strong> delivered
              </span>
              <span className="text-slate-500 font-normal flex items-center gap-1 border-l border-[#c5eed7] pl-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {currentDelivery.time}
              </span>
            </div>

            <div className="hidden sm:block h-6 w-px bg-slate-200" />

            {/* Right: Apple Pay & Secure Badge */}
            <div className="flex items-center gap-2">
              <div className="bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-slate-800 text-xs font-bold flex items-center gap-1">
                <span className="text-sm leading-none"></span>Pay
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
