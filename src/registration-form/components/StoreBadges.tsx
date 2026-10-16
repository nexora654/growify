export function StoreBadges() {
  return (
    <div className="flex items-center justify-center gap-2 my-2.5" id="store-badges">
      {/* Google Play */}
      <a
        href="https://play.google.com/store/apps/details?id=com.instagram.android"
        target="_blank"
        rel="noopener noreferrer"
        className="h-[40px] px-3 py-1 bg-black hover:opacity-90 transition-opacity rounded-[8px] border border-[#262626] flex items-center gap-2 text-white select-none"
        id="google-play-badge"
      >
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" fill="none">
          <path
            d="M3.6 1.8c-.2.2-.3.6-.3 1.1v18.2c0 .5.1.9.3 1.1l9.9-9.9L3.6 1.8z"
            fill="#00E5FF"
          />
          <path
            d="M17.4 15.9l-3.9-3.9-9.9 9.9c.4.4 1.1.5 1.9.1l11.9-6.1z"
            fill="#FF3D00"
          />
          <path
            d="M17.4 8.1L5.5 2c-.8-.4-1.5-.3-1.9.1l9.9 9.9 3.9-3.9z"
            fill="#4CAF50"
          />
          <path
            d="M21.2 10.1l-3.8-1.9-4 4 4 4 3.8-1.9c1.1-.6 1.1-2.6 0-3.2z"
            fill="#FFC107"
          />
        </svg>
        <div className="text-left leading-none">
          <div className="text-[9px] uppercase tracking-wider text-gray-300 font-medium">
            GET IT ON
          </div>
          <div className="text-[13px] font-semibold text-white tracking-tight mt-0.5">
            Google Play
          </div>
        </div>
      </a>

      {/* Microsoft Store */}
      <a
        href="https://apps.microsoft.com/detail/9nblggh5l9xt"
        target="_blank"
        rel="noopener noreferrer"
        className="h-[40px] px-3 py-1 bg-black hover:opacity-90 transition-opacity rounded-[8px] border border-[#262626] flex items-center gap-2 text-white select-none"
        id="microsoft-store-badge"
      >
        <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] shrink-0" fill="currentColor">
          <path fill="#F25022" d="M1 1h10v10H1z" />
          <path fill="#00A4EF" d="M1 13h10v10H1z" />
          <path fill="#7FBA00" d="M13 1h10v10H13z" />
          <path fill="#FFB900" d="M13 13h10v10H13z" />
        </svg>
        <div className="text-left leading-none">
          <div className="text-[9px] uppercase tracking-wider text-gray-300 font-medium">
            Get it from
          </div>
          <div className="text-[13px] font-semibold text-white tracking-tight mt-0.5">
            Microsoft
          </div>
        </div>
      </a>
    </div>
  );
}
