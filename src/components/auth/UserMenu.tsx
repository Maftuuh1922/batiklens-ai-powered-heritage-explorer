import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon, Sparkles } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';
import { userAvatarUrl, userDisplayName } from '@/lib/auth-utils';
import { useLanguage } from '@/lib/LanguageContext';

interface UserMenuProps {
  /** Render the menu inline in mobile sheets (no dropdown). */
  variant?: 'desktop' | 'mobile';
  onAction?: () => void;
}

export function UserMenu({ variant = 'desktop', onAction }: UserMenuProps) {
  const { user, signOut, loading, isConfigured } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    onAction?.();
    navigate('/');
  };

  // Loading skeleton: small placeholder ring while session is being read.
  if (loading) {
    return (
      <div
        aria-hidden
        className="h-9 w-9 rounded-full border border-foreground/15 animate-pulse bg-muted/40"
      />
    );
  }

  if (!user) {
    if (variant === 'mobile') {
      return (
        <div className="flex flex-col gap-2 pt-2">
          <Link to="/login" onClick={onAction}>
            <Button variant="outline" className="w-full h-10 text-sm font-bold uppercase tracking-widest">
              {t('nav.login')}
            </Button>
          </Link>
          {isConfigured && (
            <Link to="/signup" onClick={onAction}>
              <Button className="w-full h-10 text-sm font-bold uppercase tracking-widest">
                {t('nav.signup')}
              </Button>
            </Link>
          )}
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <Link to="/login">
          <Button
            variant="ghost"
            size="sm"
            className="text-[10px] font-black uppercase tracking-[0.2em] h-9"
          >
            {t('nav.login')}
          </Button>
        </Link>
        {isConfigured && (
          <Link to="/signup">
            <Button
              size="sm"
              className="text-[10px] font-black uppercase tracking-[0.2em] h-9 px-4 rounded-full"
            >
              {t('nav.signup')}
            </Button>
          </Link>
        )}
      </div>
    );
  }

  const name = userDisplayName(user);
  const avatar = userAvatarUrl(user);
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (variant === 'mobile') {
    return (
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-foreground/10">
          <Avatar className="h-10 w-10">
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback>{initials || 'B'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{name}</p>
            {user.email && (
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            )}
          </div>
        </div>
        <Link to="/profile" onClick={onAction}>
          <Button
            variant="outline"
            className="w-full h-10 text-sm font-bold uppercase tracking-widest justify-start"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {t('nav.profile')}
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full h-10 text-sm font-bold uppercase tracking-widest justify-start text-muted-foreground"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {t('nav.logout')}
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={name}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 hover:border-foreground/40 transition-colors overflow-hidden"
        >
          <Avatar className="h-9 w-9">
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback className="text-xs font-semibold">{initials || 'B'}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p className="text-sm font-medium leading-none truncate">{name}</p>
          {user.email && (
            <p className="text-xs text-muted-foreground mt-1 truncate">{user.email}</p>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">
            <UserIcon className="w-4 h-4 mr-2" />
            {t('nav.profile')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-rose-600 focus:text-rose-600">
          <LogOut className="w-4 h-4 mr-2" />
          {t('nav.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
