import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

/**
 * Handles OAuth redirect callbacks from Supabase (e.g. Google Sign-In).
 * Supabase PKCE flow exchanges the code for a session automatically when
 * detectSessionInUrl=true. We just wait for onAuthStateChange and redirect.
 */
export function AuthCallbackPage() {
  const navigate = useNavigate();
  const handled = useRef(false);

  useEffect(() => {
    if (!supabase || handled.current) return;

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (handled.current) return;
      if (event === 'SIGNED_IN' && session) {
        handled.current = true;
        navigate('/profile', { replace: true });
      } else if (event === 'SIGNED_OUT') {
        handled.current = true;
        navigate('/login', { replace: true });
      }
    });

    // Fallback: if already signed in just redirect
    supabase.auth.getSession().then(({ data }) => {
      if (handled.current) return;
      if (data.session) {
        handled.current = true;
        navigate('/profile', { replace: true });
      }
    });

    // Safety timeout: if nothing happens in 5s, go home
    const timeout = setTimeout(() => {
      if (!handled.current) {
        handled.current = true;
        navigate('/', { replace: true });
      }
    }, 5000);

    return () => {
      listener.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground font-medium">Menyelesaikan login...</p>
    </div>
  );
}
