import React from 'react';
import { MousePointerClick, UserCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { ServiceType } from '../types';

interface HowItWorksProps {
  onStartOrder: (service: ServiceType) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartOrder }) => {
  const steps = [
    {
      step: '01',
      icon: MousePointerClick,
      color: 'from-[#ff7a00] to-[#ff4500]',
      title: 'Select Your Package',
      desc: 'Browse our tailored Instagram, TikTok, or YouTube packages. Choose between High-Quality, Active, or VIP tiers depending on your growth objectives.'
    },
    {
      step: '02',
      icon: UserCheck,
      color: 'from-[#ff4500] to-[#e61e50]',
      title: 'Enter Your Public Handle',
      desc: 'Enter your @username, email, and required details. Your information stays secure and private. Fast, simple, and hassle-free.'
    },
    {
      step: '03',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      title: 'See Instant Results',
      desc: 'Complete your 256-bit encrypted checkout. Watch your follower count and engagement metric tick up within 60 seconds with live order tracking.'
    }
  ];

  return (
    <section id="how-it-works-section" className="py-16 sm:py-24 bg-gradient-to-b from-[#fafbfc] to-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full mb-3 border border-orange-200/60">
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            How It Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Elevating your social presence has never been easier. No complicated software—just simple, reliable service. Please allow 1–2 hours for your order to be delivered. Sit back, be patient, and let us handle the rest.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md shadow-slate-100 hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Step badge */}
                <div className="absolute -top-4 bg-slate-900 text-white font-extrabold text-xs px-3.5 py-1 rounded-full shadow-xs">
                  STEP {item.step}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center mb-6 shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-[#1e2433] text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="text-center sm:text-left">
            <div className="text-lg sm:text-xl font-bold font-display mb-1">
              Ready to experience rapid, organic social growth?
            </div>
            <div className="text-xs sm:text-sm text-slate-300">
              Join 100,000+ satisfied creators and brands on Growify today. Instant delivery guaranteed.
            </div>
          </div>

          <button
            id="how-it-works-start-cta"
            onClick={() => onStartOrder('followers')}
            className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-[#ff5500] to-[#e61e50] hover:from-[#e04500] hover:to-[#cf1645] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 min-h-[44px]"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
