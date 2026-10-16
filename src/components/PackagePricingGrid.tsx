import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  Eye, 
  Zap, 
  Music, 
  MessageSquare, 
  Flame, 
  Sparkles, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { ServiceType, QualityTier, PricingPackage } from '../types';
import { ALL_PACKAGES, SERVICE_METADATA } from '../data/packagesData';

interface PackagePricingGridProps {
  currentService: ServiceType;
  onSelectService: (service: ServiceType) => void;
  onSelectPackageForCheckout: (pkg: PricingPackage) => void;
  formatPrice: (price: number) => string;
}

export const PackagePricingGrid: React.FC<PackagePricingGridProps> = ({
  currentService,
  onSelectService,
  onSelectPackageForCheckout,
  formatPrice
}) => {
  const [activeTier, setActiveTier] = useState<QualityTier>('high-quality');
  const [customFollowerSlider, setCustomFollowerSlider] = useState<number>(2500);

  const availableServices: { type: ServiceType; name: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { type: 'followers', name: 'Instagram Followers', icon: Users },
    { type: 'likes', name: 'Instagram Likes', icon: Heart },
    { type: 'views', name: 'Instagram Views', icon: Eye },
    { type: 'comments', name: 'Instagram Comments', icon: MessageSquare },
    { type: 'auto-likes', name: 'Auto Likes', icon: Zap },
    { type: 'tiktok-followers', name: 'TikTok Growth', icon: Music },
    { type: 'youtube-subscribers', name: 'YouTube Services', icon: Flame },
  ];

  // Filter packages based on selected service and tier
  const filtered = ALL_PACKAGES.filter((p) => {
    if (p.service !== currentService) return false;
    if (currentService === 'auto-likes' || currentService.startsWith('tiktok') || currentService.startsWith('youtube') || currentService === 'comments') return true;
    return p.tier === activeTier;
  });

  const calculateCustomPrice = (qty: number) => {
    // base calculation for custom follower slider
    const unitPrice = activeTier === 'vip' ? 0.038 : activeTier === 'active' ? 0.019 : 0.012;
    const raw = qty * unitPrice;
    return Math.max(2.97, Number(raw.toFixed(2)));
  };

  const handleCustomBuy = () => {
    const customPkg: PricingPackage = {
      id: `custom-${currentService}-${activeTier}-${customFollowerSlider}`,
      service: currentService,
      tier: activeTier,
      quantity: customFollowerSlider,
      label: `${customFollowerSlider.toLocaleString()} ${SERVICE_METADATA[currentService]?.name || 'Followers'}`,
      originalPrice: Number((calculateCustomPrice(customFollowerSlider) * 1.6).toFixed(2)),
      salePrice: calculateCustomPrice(customFollowerSlider),
      discount: 38,
      features: [
        'Custom Selected Volume',
        '100% Real High-Retention Accounts',
        'Instant 60s Dispatch Start',
        'No Password Required',
        '30-Day Auto Refill Protection',
        '24/7 Dedicated Support'
      ]
    };
    onSelectPackageForCheckout(customPkg);
  };

  return (
    <section id="pricing-section" className="py-16 sm:py-24 bg-[#fafbfc] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full mb-3 border border-orange-200/60">
            <Sparkles className="w-3.5 h-3.5" /> Instant Delivery Packages
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
            Choose Your Growth Package
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select your platform, pick your desired quality tier, and scale your social audience in minutes.
          </p>
        </div>

        {/* Category Pill Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8">
          {availableServices.map((srv) => {
            const Icon = srv.icon;
            const isSelected = currentService === srv.type;
            return (
              <button
                key={srv.type}
                id={`catalog-tab-${srv.type}`}
                onClick={() => onSelectService(srv.type)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer min-h-[40px] sm:min-h-[44px] ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#ff5500] to-[#e61e50] text-white shadow-md shadow-orange-600/20 scale-102 sm:scale-105'
                    : 'bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-600 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="whitespace-nowrap">{srv.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tier Selector Bar for Followers & Likes */}
        {['followers', 'likes'].includes(currentService) && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            <button
              id="catalog-tier-hq"
              onClick={() => setActiveTier('high-quality')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer min-h-[38px] ${
                activeTier === 'high-quality'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              High Quality Tier
            </button>
            <button
              id="catalog-tier-active"
              onClick={() => setActiveTier('active')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                activeTier === 'active'
                  ? 'bg-gradient-to-r from-[#ff5500] to-[#e61e50] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>Active Community Tier</span>
              <span className="bg-pink-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-black">
                POPULAR
              </span>
            </button>
            {currentService === 'followers' && (
              <button
                id="catalog-tier-vip"
                onClick={() => setActiveTier('vip')}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                  activeTier === 'vip'
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>VIP Influencers</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </button>
            )}
          </div>
        )}

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {filtered.map((pkg) => {
            const isHighlight = pkg.isPopular || pkg.isBestValue;
            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-3xl p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                  isHighlight
                    ? 'bg-white border-2 border-orange-500 shadow-xl shadow-orange-500/10'
                    : 'bg-white border border-slate-200/90 shadow-md hover:shadow-xl'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ff5500] to-[#e61e50] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-white" /> Most Popular Choice
                  </div>
                )}

                {pkg.isBestValue && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 fill-white" /> Best Value Deal
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight font-display">
                      {pkg.label}
                    </h3>
                    <span className="bg-orange-50 text-orange-700 text-xs font-black px-2.5 py-1 rounded-lg border border-orange-100">
                      -{pkg.discount}%
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2.5 mb-5">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
                      {formatPrice(pkg.salePrice)}
                    </span>
                    <span className="text-sm font-semibold text-slate-400 line-through">
                      {formatPrice(pkg.originalPrice)}
                    </span>
                  </div>

                  <div className="space-y-2.5 mb-8">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                        <div className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  id={`catalog-buy-btn-${pkg.id}`}
                  onClick={() => onSelectPackageForCheckout(pkg)}
                  className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px] ${
                    isHighlight
                      ? 'bg-gradient-to-r from-[#ff5500] to-[#e61e50] hover:from-[#e04500] hover:to-[#cf1645] text-white shadow-md shadow-orange-600/25'
                      : 'bg-slate-900 hover:bg-orange-600 text-white shadow-xs'
                  }`}
                >
                  <span>Select & Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Quantity Slider Box for Instagram */}
        {['followers', 'likes', 'views'].includes(currentService) && (
          <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-5 sm:p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              <div className="flex-1 text-center md:text-left w-full">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-purple-200 mb-3">
                  <Sparkles className="w-3 h-3 text-yellow-300" /> Custom Volume Calculator
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display mb-2">
                  Need a specific amount?
                </h3>
                <p className="text-purple-200 text-xs sm:text-sm mb-6">
                  Use the slider to customize your exact follower or engagement quantity with automated volume discounts.
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold text-purple-200">
                    <span>100</span>
                    <span className="text-white text-base font-black font-display">{customFollowerSlider.toLocaleString()} Units</span>
                    <span>20,000</span>
                  </div>
                  <input
                    id="custom-quantity-slider"
                    type="range"
                    min="100"
                    max="20000"
                    step="100"
                    value={customFollowerSlider}
                    onChange={(e) => setCustomFollowerSlider(Number(e.target.value))}
                    aria-label="Custom Quantity Slider"
                    className="w-full h-3 bg-purple-950/60 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/20 text-center shrink-0 w-full sm:w-72">
                <div className="text-xs uppercase font-bold text-purple-200 mb-1">
                  Custom Estimate
                </div>
                <div className="text-2xl sm:text-4xl font-black text-white font-display mb-1">
                  {formatPrice(calculateCustomPrice(customFollowerSlider))}
                </div>
                <div className="text-[11px] text-emerald-300 font-bold mb-4 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Instant Delivery Included
                </div>
                <button
                  id="custom-quantity-order-btn"
                  onClick={handleCustomBuy}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg transition-transform hover:scale-102 active:scale-98 cursor-pointer min-h-[44px]"
                >
                  Order {customFollowerSlider.toLocaleString()} Units
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
