import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Normalize a pasted Supabase URL. Users sometimes copy `…/auth/v1/` or include
 * a trailing slash from the dashboard — strip both so the SDK can build paths
 * cleanly. Returns undefined if the input clearly isn't a valid base URL.
 */
function normalizeSupabaseUrl(input: string | undefined): string | undefined {
  if (!input) return undefined;
  let url = input.trim();
  if (!url) return undefined;
  if (!/^https?:\/\//i.test(url)) return undefined;
  url = url.replace(/\/+$/, '');
  url = url.replace(/\/(auth|rest|storage|realtime)\/v\d+$/i, '');
  return url;
}

const supabaseUrl = normalizeSupabaseUrl(rawUrl);

export const isSupabaseConfigured: boolean = Boolean(supabaseUrl && supabaseAnonKey);

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
