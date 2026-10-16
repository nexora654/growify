import { X } from 'lucide-react';
import { ModalType } from '../types';

interface DemoModalProps {
  type: ModalType;
  onClose: () => void;
}

export function DemoModal({ type, onClose }: DemoModalProps) {
  if (!type) return null;

  const contentMap: Record<
    Exclude<ModalType, null>,
    { title: string; body: string | string[] }
  > = {
    'contact-info': {
      title: 'Why we ask for contact info',
      body: [
        'In this prototype demo, contact information (mobile number or email) simulates account verification, security alerts, and helping friends locate your account.',
        'Note: As this is a frontend prototype, no information is saved, transmitted, or shared to any external server.',
      ],
    },
    'learn-more': {
      title: 'Contact Uploading Information',
      body: [
        'People who use our service may have uploaded their address books containing your phone number or email address to find mutual connections.',
        'You can manage contact syncing permissions anytime in account settings once registered.',
      ],
    },
    terms: {
      title: 'Terms of Service (Demo)',
      body: [
        'Welcome to the Socially demo platform. By interacting with this prototype interface, you explore simulated social networking features.',
        'You agree not to submit real sensitive production credentials or illicit material. This mock interface is created exclusively for UI/UX demonstration.',
      ],
    },
    privacy: {
      title: 'Privacy Policy (Demo)',
      body: [
        'This Privacy Policy outlines how dummy data in this UI demonstration is handled. All form fields are managed locally in client browser memory and discarded on refresh.',
        'No tracking cookies or external telemetry scripts are utilized on this demo page.',
      ],
    },
    cookies: {
      title: 'Cookies Policy (Demo)',
      body: [
        'We use essential browser storage purely to remember your interactive demo state during your current session.',
        'Third-party advertising cookies are completely disabled in this prototype.',
      ],
    },
    'birthday-info': {
      title: 'Birthday Policy',
      body: [
        'Providing your date of birth ensures appropriate age-gated features and content safety.',
        'In accordance with standard social platform guidelines, accounts must be registered for individuals aged 13 or older.',
      ],
    },
    'existing-account': {
      title: 'Already have an account?',
      body: [
        'If you already have an Instagram account, you can log in directly using your existing username/email and password on the mobile app or web platform.',
        'This page is currently set up for creating a new Instagram account.',
      ],
    },
  };

  const current = contentMap[type];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[85vh] max-h-[85dvh] bg-[#121214] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative text-left flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-3 top-3 w-10 h-10 text-zinc-400 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors flex items-center justify-center rounded-full focus:outline-none focus:ring-1 focus:ring-zinc-400 cursor-pointer touch-manipulation"
          id="close-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 id="modal-title" className="text-[17px] sm:text-[18px] font-bold text-white mb-3 pr-8 flex-shrink-0">
          {current.title}
        </h3>

        <div className="space-y-2.5 text-[13.5px] text-zinc-300 leading-relaxed overflow-y-auto pr-1">
          {Array.isArray(current.body) ? (
            current.body.map((p, idx) => <p key={idx}>{p}</p>)
          ) : (
            <p>{current.body}</p>
          )}
        </div>

        <div className="mt-4 sm:mt-5 pt-3 border-t border-zinc-800 flex justify-end flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 bg-[#0095f6] hover:bg-[#1877f2] active:scale-[0.99] text-white text-[14px] font-semibold rounded-full transition-all cursor-pointer touch-manipulation"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
