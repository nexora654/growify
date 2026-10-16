import React from 'react';
import RegistrationFormApp from '../registration-form/App';
import { FormData } from '../registration-form/types';

interface RegistrationPageProps {
  onBackToHome: () => void;
  onNavigateToLogin: () => void;
  onRegisterSuccess?: (data: FormData) => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({
  onBackToHome,
  onNavigateToLogin,
  onRegisterSuccess
}) => {
  return (
    <RegistrationFormApp
      onBackToHome={onBackToHome}
      onNavigateToLogin={onNavigateToLogin}
      onRegisterSuccess={onRegisterSuccess}
    />
  );
};
