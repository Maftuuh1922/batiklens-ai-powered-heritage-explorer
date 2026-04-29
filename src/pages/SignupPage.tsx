import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User as UserIcon, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';

interface LocationState {
  redirectTo?: string;
}

export function SignupPage() {
  const { language } = useLanguage();
  const t = (id: string, en: string) => (language === 'id' ? id : en);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as LocationState | null)?.redirectTo ?? '/profile';

  const { signUpWithEmail, signInWithGoogle, isConfigured } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError(t('Password minimal 6 karakter.', 'Password must be at least 6 characters.'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('Konfirmasi password tidak cocok.', 'Password confirmation does not match.'));
      return;
    }

    setSubmitting(true);
    const { error: signUpError } = await signUpWithEmail(
      email.trim(),
      password,
      displayName.trim() || undefined,
    );
    setSubmitting(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    setDone(true);
  };

  const handleGoogle = async () => {
    setError(null);
    setGoogleLoading(true);
    const { error: oauthError } = await signInWithGoogle();
    if (oauthError) {
      setGoogleLoading(false);
      setError(oauthError.message);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-amber-50/40 dark:to-amber-950/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="border-foreground/10 shadow-xl text-center">
            <CardHeader className="space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardTitle className="font-serif text-2xl">
                {t('Cek email kamu', 'Check your email')}
              </CardTitle>
              <CardDescription>
                {t(
                  `Kami sudah mengirim tautan konfirmasi ke ${email}. Klik tautannya untuk mengaktifkan akun.`,
                  `We sent a confirmation link to ${email}. Click it to activate your account.`,
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => navigate('/login', { state: { redirectTo } })}
                className="w-full"
              >
                {t('Lanjut ke Masuk', 'Continue to Sign in')}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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
              {t('Daftar BatikLens', 'Create your BatikLens account')}
            </CardTitle>
            <CardDescription>
              {t(
                'Mulai kumpulkan streak, XP, dan badge sebagai penjaga motif.',
                'Start collecting streaks, XP, and badges as a motif keeper.',
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {!isConfigured && (
              <div className="rounded-md border border-amber-300/50 bg-amber-50 dark:bg-amber-950/40 p-3 text-xs text-amber-900 dark:text-amber-200">
                {t(
                  'Auth belum dikonfigurasi. Setel VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.',
                  'Auth is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
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
              {t('Daftar dengan Google', 'Sign up with Google')}
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
                <label className="text-xs font-medium text-muted-foreground" htmlFor="display-name">
                  {t('Nama tampilan', 'Display name')}
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="display-name"
                    type="text"
                    autoComplete="name"
                    placeholder={t('Misal: Maftuh', 'e.g. Maftuh')}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="pl-9 h-11"
                    maxLength={48}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground" htmlFor="signup-email">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
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
                <label className="text-xs font-medium text-muted-foreground" htmlFor="signup-password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    placeholder={t('Minimal 6 karakter', 'At least 6 characters')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground" htmlFor="confirm-password">
                  {t('Konfirmasi password', 'Confirm password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    placeholder={t('Ulangi password', 'Repeat password')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-9 h-11"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-rose-600 dark:text-rose-400" role="alert">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full h-11" disabled={submitting || !isConfigured}>
                {submitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 mr-2" />
                )}
                {t('Daftar Sekarang', 'Create account')}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              {t('Sudah punya akun?', 'Already have an account?')}{' '}
              <Link
                to="/login"
                state={{ redirectTo }}
                className="font-medium text-foreground hover:underline underline-offset-2"
              >
                {t('Masuk', 'Sign in')}
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
