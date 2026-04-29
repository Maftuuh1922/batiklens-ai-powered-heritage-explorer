import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';

interface LocationState {
  redirectTo?: string;
}

export function LoginPage() {
  const { language } = useLanguage();
  const t = (id: string, en: string) => (language === 'id' ? id : en);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as LocationState | null)?.redirectTo ?? '/profile';

  const { signInWithEmail, signInWithGoogle, sendPasswordReset, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);
    const { error: signInError } = await signInWithEmail(email.trim(), password);
    setSubmitting(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    navigate(redirectTo, { replace: true });
  };

  const handleGoogle = async () => {
    setError(null);
    setGoogleLoading(true);
    const { error: oauthError } = await signInWithGoogle();
    if (oauthError) {
      setGoogleLoading(false);
      setError(oauthError.message);
    }
    // On success, Supabase redirects to Google. No need to flip loading state.
  };

  const handleReset = async () => {
    if (!email.trim()) {
      setError(t('Masukkan email dulu untuk reset password.', 'Enter your email first to reset password.'));
      return;
    }
    setError(null);
    const { error: resetError } = await sendPasswordReset(email.trim());
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setInfo(
      t(
        'Tautan reset password sudah dikirim ke email kamu.',
        'Password reset link has been sent to your email.',
      ),
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-amber-50/40 dark:to-amber-950/20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t('Kembali ke Beranda', 'Back to Home')}
        </Link>

        <Card className="border-foreground/10 shadow-xl">
          <CardHeader className="space-y-2">
            <CardTitle className="font-serif text-3xl">
              {t('Masuk ke BatikLens', 'Sign in to BatikLens')}
            </CardTitle>
            <CardDescription>
              {t(
                'Lanjutkan perjalanan motifmu — streak, XP, dan diary tetap aman.',
                'Continue your motif journey — your streak, XP, and diary stay safe.',
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {!isConfigured && (
              <div className="rounded-md border border-amber-300/50 bg-amber-50 dark:bg-amber-950/40 p-3 text-xs text-amber-900 dark:text-amber-200">
                {t(
                  'Auth belum dikonfigurasi di server. Setel VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY pada environment.',
                  'Auth is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the environment.',
                )}
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 font-medium"
              onClick={handleGoogle}
              disabled={googleLoading || !isConfigured}
            >
              {googleLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <GoogleIcon className="w-4 h-4 mr-2" />
              )}
              {t('Lanjut dengan Google', 'Continue with Google')}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-foreground/10" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em]">
                <span className="bg-background px-3 text-muted-foreground">
                  {t('atau email', 'or email')}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="kamu@contoh.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="password">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
                  >
                    {t('Lupa password?', 'Forgot password?')}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 h-11"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-rose-600 dark:text-rose-400" role="alert">
                  {error}
                </p>
              )}
              {info && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400" role="status">
                  {info}
                </p>
              )}

              <Button type="submit" className="w-full h-11" disabled={submitting || !isConfigured}>
                {submitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 mr-2" />
                )}
                {t('Masuk', 'Sign in')}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              {t('Belum punya akun?', "Don't have an account?")}{' '}
              <Link
                to="/signup"
                state={{ redirectTo }}
                className="font-medium text-foreground hover:underline underline-offset-2"
              >
                {t('Daftar', 'Sign up')}
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
