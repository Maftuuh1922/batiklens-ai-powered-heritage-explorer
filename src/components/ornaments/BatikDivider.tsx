import React from 'react';

interface BatikDividerProps {
  className?: string;
  /** Optional center label (small caps). */
  label?: string;
}

/**
 * Decorative horizontal divider — two lines flanking a small kawung diamond.
 * Used between page sections to add a subtle batik rhythm.
 */
export function BatikDivider({ className = '', label }: BatikDividerProps) {
  return (
    <div className={`flex items-center gap-3 text-foreground/40 ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-foreground/20 to-foreground/30" />
      <svg width="56" height="14" viewBox="0 0 56 14" fill="none" className="shrink-0 text-gold">
        <circle cx="6" cy="7" r="2" fill="currentColor" />
        <path
          d="M16 7 L24 1 L32 7 L24 13 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="7" r="1.6" fill="currentColor" />
        <path
          d="M32 7 L40 1 L48 7 L40 13 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          opacity="0.5"
        />
        <circle cx="50" cy="7" r="2" fill="currentColor" />
      </svg>
      {label ? (
        <span className="text-[10px] uppercase tracking-[0.32em] font-medium text-foreground/55">
          {label}
        </span>
      ) : null}
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-foreground/20 to-foreground/30" />
    </div>
  );
}
