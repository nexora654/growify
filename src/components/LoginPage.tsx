import React from 'react';
import LoginFormApp from '../login-form/App';

interface LoginPageProps {
  initialMode?: 'login' | 'signup';
  onBackToHome: () => void;
  onLoginSuccess?: (username: string) => void;
  onCreateAccount?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onBackToHome,
  onLoginSuccess,
  onCreateAccount
}) => {
  return (
    <LoginFormApp
      onBackToHome={onBackToHome}
      onLoginSuccess={onLoginSuccess}
      onCreateAccount={onCreateAccount}
    />
  );
};
