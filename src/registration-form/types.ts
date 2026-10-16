export interface FormData {
  contact: string; // mobile number or email
  password: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  fullName: string;
  username: string;
}

export interface FormErrors {
  contact?: string;
  password?: string;
  birthday?: string;
  fullName?: string;
  username?: string;
}

export type ModalType =
  | 'contact-info'
  | 'learn-more'
  | 'terms'
  | 'privacy'
  | 'cookies'
  | 'birthday-info'
  | 'existing-account'
  | null;

export type ViewMode = 'register' | 'success';
