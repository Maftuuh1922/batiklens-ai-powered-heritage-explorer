import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured: boolean = Boolean(
  supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'),
);

if (!isSupabaseConfigured && typeof window !== 'undefined') {
  console.warn(
    '[BatikLens] Supabase env vars missing — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable auth.',
  );
}

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
    })
  : null;

/**
 * Throws if the Supabase client is not configured. Useful inside auth flows
 * that should not silently no-op.
 */
export function requireSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      'Supabase belum dikonfigurasi. Set VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY pada environment.',
    );
  }
  return supabase;
}
