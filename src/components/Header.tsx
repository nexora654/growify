import React, { useState } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  Heart, 
  Users, 
  MessageSquare, 
  Eye, 
  Zap, 
  Music,
  Flame,
  Mail,
  UserCheck,
  Star
} from 'lucide-react';
import { ServiceType } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onSelectService: (service: ServiceType) => void;
  onOpenTrackModal: () => void;
  onOpenCheckoutWithService: (service: ServiceType) => void;
  onOpenAuthModal: (mode: 'login' | 'signup') => void;
  onOpenContactModal: () => void;
  onOpenCart?: () => void;
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectService,
  onOpenTrackModal,
  onOpenCheckoutWithService,
  onOpenAuthModal,
  onOpenContactModal,
  onOpenCart,
  cartCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (service: ServiceType) => {
    onSelectService(service);
    setMobileMenuOpen(false);
    const element = document.getElementById('pricing-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/90 shadow-2xs">
      {/* Top Banner - Exactly as in Buzzoid HTML */}
      <div className="bg-gradient-to-r from-[#ff4000] via-[#ff1d56] to-[#b80096] text-white text-xs sm:text-sm py-2 px-3 sm:px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-3 font-medium text-center">
          <div className="inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200 shrink-0" />
            <span className="bg-white/20 text-white text-[10px] sm:text-[11px] font-black px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider">
              NEW
            </span>
          </div>
          <span className="font-semibold text-[11px] sm:text-sm text-white">
            <strong className="font-extrabold">Auto Instagram Likes</strong> are here
          </span>
          <button
            id="topbar-try-now-btn"
            onClick={() => handleNavClick('auto-likes')}
            className="inline-flex items-center gap-1 border border-white/80 hover:bg-white/20 text-white font-bold text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 rounded-full transition-all cursor-pointer"
          >
            <span>Try Now</span>
            <span className="text-xs leading-none">&rarr;</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left: Brand Logo & Review Chip */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center focus:outline-none group shrink-0"
              aria-label="Growify Home"
            >
              <BrandLogo size="md" />
            </a>

            {/* Header Review Chip */}
            <div className="hidden xs:inline-flex items-center gap-1.5 bg-[#F6F7FA] rounded-full px-2.5 py-1 text-xs border border-slate-200/60">
              <span className="w-5 h-5 rounded-full bg-[#FF5C00] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                ★
              </span>
              <span className="font-extrabold text-[#2A303C] text-xs leading-none">5.0</span>
              <span className="text-[#6e7189] font-medium text-[10px] leading-none">reviews</span>
            </div>
          </div>

          {/* Desktop Navigation Links - Exact Match */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-semibold text-slate-700">
            <button
              id="nav-likes-btn"
              onClick={() => handleNavClick('likes')}
              className="hover:text-[#ff4500] transition-colors cursor-pointer py-1 whitespace-nowrap"
            >
              Buy Instagram Likes
            </button>

            <button
              id="nav-followers-btn"
              onClick={() => handleNavClick('followers')}
              className="hover:text-[#ff4500] transition-colors cursor-pointer py-1 whitespace-nowrap"
            >
              Buy Instagram Followers
            </button>

            <button
              id="nav-comments-btn"
              onClick={() => handleNavClick('comments')}
              className="hover:text-[#ff4500] transition-colors cursor-pointer py-1 whitespace-nowrap"
            >
              Buy Instagram Comments
            </button>

            <button
              id="nav-views-btn"
              onClick={() => handleNavClick('views')}
              className="hover:text-[#ff4500] transition-colors cursor-pointer py-1 whitespace-nowrap"
            >
              Buy Instagram Views
            </button>

            <button
              id="nav-contact-btn"
              onClick={onOpenContactModal}
              className="hover:text-[#ff4500] transition-colors cursor-pointer py-1 whitespace-nowrap"
            >
              Contact Us
            </button>
          </nav>

          {/* Right Side Actions - Login, Sign up button, Cart drawer trigger */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-login-btn"
              onClick={() => onOpenAuthModal('login')}
              className="text-xs xl:text-sm font-semibold text-slate-700 hover:text-[#ff4500] px-2 py-1.5 transition-colors cursor-pointer"
            >
              Login
            </button>

            <button
              id="nav-signup-btn"
              onClick={() => onOpenAuthModal('signup')}
              className="border border-[#ff5500] text-[#ff5500] hover:bg-[#ff5500] hover:text-white font-bold text-xs xl:text-sm px-4 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="w-9 h-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:text-slate-900 shadow-2xs"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Structured exactly as in Buzzoid HTML) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-6 max-h-[85vh] overflow-y-auto space-y-6 animate-in slide-in-from-top-2 duration-200">
          {/* Section: Instagram Services */}
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              Instagram Services
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => handleNavClick('likes')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-left cursor-pointer"
              >
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Buy Instagram Likes</span>
              </button>
              <button
                onClick={() => handleNavClick('followers')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-left cursor-pointer"
              >
                <Users className="w-4 h-4 text-orange-500" />
                <span>Buy Instagram Followers</span>
              </button>
              <button
                onClick={() => handleNavClick('comments')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-left cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-pink-500" />
                <span>Buy Instagram Comments</span>
              </button>
              <button
                onClick={() => handleNavClick('views')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-left cursor-pointer"
              >
                <Eye className="w-4 h-4 text-purple-500" />
                <span>Buy Instagram Views</span>
              </button>
              <button
                onClick={() => handleNavClick('auto-likes')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-left cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Buy Automatic Likes</span>
              </button>
            </div>
          </div>

          {/* Section: TikTok Services */}
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              TikTok Services
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => handleNavClick('tiktok-likes')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-left cursor-pointer"
              >
                <Heart className="w-4 h-4 text-pink-500" />
                <span>Buy TikTok Likes</span>
              </button>
              <button
                onClick={() => handleNavClick('tiktok-followers')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-left cursor-pointer"
              >
                <Users className="w-4 h-4 text-cyan-500" />
                <span>Buy TikTok Followers</span>
              </button>
              <button
                onClick={() => handleNavClick('tiktok-views')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-left cursor-pointer"
              >
                <Eye className="w-4 h-4 text-indigo-500" />
                <span>Buy TikTok Views</span>
              </button>
            </div>
          </div>

          {/* Section: YouTube Services */}
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              YouTube Services
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => handleNavClick('youtube-views')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-left cursor-pointer"
              >
                <Eye className="w-4 h-4 text-red-500" />
                <span>Buy YouTube Views</span>
              </button>
              <button
                onClick={() => handleNavClick('youtube-subscribers')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-left cursor-pointer"
              >
                <Users className="w-4 h-4 text-red-500" />
                <span>Buy YouTube Subscribers</span>
              </button>
              <button
                onClick={() => handleNavClick('youtube-likes')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 text-left cursor-pointer"
              >
                <Heart className="w-4 h-4 text-red-500" />
                <span>Buy YouTube Likes</span>
              </button>
            </div>
          </div>

          {/* Useful Links */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContactModal();
              }}
              className="w-full flex items-center gap-3 p-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 text-left"
            >
              <Mail className="w-4 h-4 text-slate-400" />
              <span>Contact Us</span>
            </button>
          </div>

          {/* Auth Actions in Mobile */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal('signup');
              }}
              className="w-full py-3 bg-gradient-to-r from-[#ff5500] to-[#e61e50] text-white font-extrabold text-xs rounded-xl shadow-sm text-center"
            >
              Sign up
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal('login');
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-slate-600 hover:text-slate-900 uppercase"
            >
              Log in
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
