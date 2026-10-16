import { CheckCircle2, RotateCcw } from 'lucide-react';
import { SociallyLogo } from './SociallyLogo';

interface SuccessViewProps {
  fullName: string;
  username: string;
  contact: string;
  onReset: () => void;
}

export function SuccessView({ fullName, username, contact, onReset }: SuccessViewProps) {
  return (
    <div className="w-full max-w-[420px] mx-auto text-left select-none text-[#ededed] px-0.5 sm:px-0" id="success-container">
      <div className="mb-4">
        <SociallyLogo />
      </div>

      <div className="my-4 sm:my-6 p-5 sm:p-6 bg-[#121214] border border-zinc-800 rounded-2xl text-center">
        <div className="w-12 h-12 bg-blue-500/10 text-[#0095f6] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <h2 className="text-[20px] sm:text-[22px] font-bold text-white mb-2" id="success-heading">
          Welcome to Instagram!
        </h2>
        <p className="text-[14px] text-[#a8a8a8] leading-relaxed mb-6">
          Your demo account for <span className="text-white font-semibold">{fullName}</span> (
          <span className="text-[#0095f6]">@{username}</span>) has been successfully verified for prototype testing.
        </p>

        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-3.5 text-left text-[13px] text-zinc-200 space-y-2 mb-6">
          <div className="flex justify-between items-center gap-2">
            <span className="text-zinc-400 text-[12px] sm:text-[13px]">Registered ID:</span>
            <span className="text-white font-mono text-[12px] sm:text-[13px] truncate max-w-[190px]">{contact}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-zinc-400 text-[12px] sm:text-[13px]">Handle:</span>
            <span className="text-white font-mono text-[12px] sm:text-[13px] truncate max-w-[190px]">@{username}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-zinc-400 text-[12px] sm:text-[13px]">Security:</span>
            <span className="text-emerald-400 font-medium text-[12px] sm:text-[13px]">Local demo only</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="primary-button w-full h-[44px] min-h-[44px] bg-[#133B6E] hover:bg-[#184886] active:scale-[0.99] text-[#F2F4F6] font-semibold text-[14px] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer mb-3 touch-manipulation"
          id="success-new-demo-btn"
        >
          <RotateCcw className="w-4 h-4" />
          Test Another Registration
        </button>

        <p className="text-[12px] text-zinc-500">
          No data was sent to external servers or retained in storage.
        </p>
      </div>
    </div>
  );
}
