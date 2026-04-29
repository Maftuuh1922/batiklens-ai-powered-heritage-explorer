import type { User } from '@supabase/supabase-js';

/** Returns a stable display name for a Supabase user. */
export function userDisplayName(user: User | null | undefined): string {
  if (!user) return '';
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  const fromMeta =
    typeof meta?.display_name === 'string'
      ? (meta.display_name as string)
      : typeof meta?.full_name === 'string'
        ? (meta.full_name as string)
        : typeof meta?.name === 'string'
          ? (meta.name as string)
          : null;
  if (fromMeta && fromMeta.trim()) return fromMeta.trim();
  if (user.email) return user.email.split('@')[0];
  return 'Pengguna';
}

/** Returns the avatar URL stored in user metadata, or null. */
export function userAvatarUrl(user: User | null | undefined): string | null {
  if (!user) return null;
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  const url = meta?.avatar_url ?? meta?.picture;
  return typeof url === 'string' && url.startsWith('http') ? url : null;
}
