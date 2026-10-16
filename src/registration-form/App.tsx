import { useState } from 'react';
import { RegistrationForm } from './components/RegistrationForm';
import { SuccessView } from './components/SuccessView';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { FormData, ModalType, ViewMode } from './types';
import { RegLanguageProvider } from './context/LanguageContext';

interface RegistrationFormAppProps {
  onBackToHome?: () => void;
  onNavigateToLogin?: () => void;
  onRegisterSuccess?: (data: FormData) => void;
}

function RegistrationAppInner({
  onNavigateToLogin,
  onRegisterSuccess,
}: RegistrationFormAppProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('register');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [registeredUser, setRegisteredUser] = useState<FormData | null>(null);

  const handleRegisterSuccess = (data: FormData) => {
    setRegisteredUser(data);
    setViewMode('success');
    if (onRegisterSuccess) {
      onRegisterSuccess(data);
    }
  };

  const handleReset = () => {
    setRegisteredUser(null);
    setViewMode('register');
  };

  return (
    <div
      className="min-h-screen min-h-[100dvh] w-full bg-[#1F1F22] text-[#ededed] flex flex-col justify-between items-center selection:bg-rose-500/30 selection:text-white pt-4 sm:pt-6 px-3 sm:px-6 overflow-x-hidden font-sans antialiased"
      style={{
        paddingTop: 'max(1rem, env(safe-area-inset-top, 1rem))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left, 0.75rem))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right, 0.75rem))',
      }}
      id="app-root"
    >
      {/* Main Content Area */}
      <main className="w-full flex-1 flex flex-col items-center justify-center py-2 sm:py-6">
        {viewMode === 'register' && (
          <RegistrationForm
            onSubmitSuccess={handleRegisterSuccess}
            onNavigateToLogin={onNavigateToLogin || (() => setActiveModal('existing-account'))}
            onOpenModal={(type) => setActiveModal(type)}
          />
        )}

        {viewMode === 'success' && registeredUser && (
          <SuccessView
            fullName={registeredUser.fullName}
            username={registeredUser.username}
            contact={registeredUser.contact}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer Navigation */}
      <Footer onOpenModal={(type) => setActiveModal(type)} />

      {/* Disclaimers & Policies Dialog Modal */}
      <DemoModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}

export default function App(props: RegistrationFormAppProps = {}) {
  return (
    <RegLanguageProvider>
      <RegistrationAppInner {...props} />
    </RegLanguageProvider>
  );
}
