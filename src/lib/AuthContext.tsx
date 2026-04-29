import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AuthError, Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './supabase';

interface AuthResult {
  error: AuthError | { message: string } | null;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithEmail: (email: string, password: string) => Promise<AuthResult>;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  sendPasswordReset: (email: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const NOT_CONFIGURED: AuthResult = {
  error: {
    message:
      'Login belum dikonfigurasi. Hubungi admin untuk menyetel Supabase env vars.',
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session ?? null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = useCallback<AuthContextValue['signInWithEmail']>(
    async (email, password) => {
      if (!supabase) return NOT_CONFIGURED;
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    },
    [],
  );

  const signUpWithEmail = useCallback<AuthContextValue['signUpWithEmail']>(
    async (email, password, displayName) => {
      if (!supabase) return NOT_CONFIGURED;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/profile`,
          data: displayName ? { display_name: displayName } : undefined,
        },
      });
      return { error };
    },
    [],
  );

  const signInWithGoogle = useCallback<AuthContextValue['signInWithGoogle']>(async () => {
    if (!supabase) return NOT_CONFIGURED;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/profile`,
        queryParams: { prompt: 'select_account' },
      },
    });
    return { error };
  }, []);

  const sendPasswordReset = useCallback<AuthContextValue['sendPasswordReset']>(
    async (email) => {
      if (!supabase) return NOT_CONFIGURED;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      return { error };
    },
    [],
  );

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      loading,
      isConfigured: isSupabaseConfigured,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      sendPasswordReset,
      signOut,
    }),
    [
      session,
      loading,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      sendPasswordReset,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an <AuthProvider>');
  return ctx;
}
