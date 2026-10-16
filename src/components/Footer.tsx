import React from 'react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenContact?: () => void;
  onNavigateToLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenContact,
  onNavigateToLogin
}) => {
  return (
    <footer className="bg-[#242933] text-slate-300 text-xs pt-12 sm:pt-16 pb-12 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Brand & Navigation & Socials Row */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-10 md:pb-14 border-b border-slate-700/60">
          <div className="flex items-center gap-6">
            <BrandLogo size="md" theme="dark" />
          </div>

          <nav>
            <ul className="flex flex-wrap items-center gap-x-4 sm:gap-x-8 lg:gap-x-10 gap-y-2.5 font-semibold text-slate-300 text-xs sm:text-sm">
              <li>
                <a 
                  href="#blog" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#ff5500] transition-colors py-1 inline-block"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#ff5500] transition-colors py-1 inline-block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#team" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#ff5500] transition-colors py-1 inline-block"
                >
                  Our Team
                </a>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-[#ff5500] transition-colors cursor-pointer py-1 inline-block"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a 
                  href="#terms" 
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-[#ff5500] transition-colors py-1 inline-block"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#privacy" 
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-[#ff5500] transition-colors py-1 inline-block"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>

          {/* Social Icons with Growify hover interactions */}
          <div className="flex items-center gap-2.5">
            {/* X / Twitter */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Growify on X (Twitter)"
              className="w-9 h-9 rounded-full bg-slate-700/80 hover:bg-black text-slate-300 hover:text-white flex items-center justify-center transition-all hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Growify on Facebook"
              className="w-9 h-9 rounded-full bg-slate-700/80 hover:bg-[#1877f2] text-slate-300 hover:text-white flex items-center justify-center transition-all hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram - Navigates to Login page */}
            <button 
              type="button"
              onClick={onNavigateToLogin}
              aria-label="Login with Instagram"
              title="Login with Instagram"
              className="w-9 h-9 rounded-full bg-slate-700/80 hover:bg-gradient-to-tr hover:from-[#fdf497] hover:via-[#d6249f] hover:to-[#285aeb] text-slate-300 hover:text-white flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </button>

            {/* YouTube */}
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Growify on YouTube"
              className="w-9 h-9 rounded-full bg-slate-700/80 hover:bg-[#ff0000] text-slate-300 hover:text-white flex items-center justify-center transition-all hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar (Centered Copyright) */}
        <div className="pt-8 text-center text-slate-400 text-xs">
          <p>
            <span>Copyright &copy; 2026 Growify. All Rights Reserved.</span>
            <span className="mx-2">·</span>
            <span>Premium Social Media Growth Network.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
