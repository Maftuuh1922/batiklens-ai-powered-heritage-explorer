import React from 'react';

export type BatikMotif = 'kawung' | 'parang' | 'ceplok' | 'truntum' | 'megamendung';

interface BatikPatternProps {
  motif?: BatikMotif;
  /** 0 - 1, controls SVG opacity. Default 0.06 for very subtle background. */
  opacity?: number;
  /** Tile size in CSS pixels. Default 80. */
  size?: number;
  /** Stroke / fill color in CSS color (hex / hsl / oklch). Default 'currentColor'. */
  color?: string;
  className?: string;
  /** Position layer — default 'absolute inset-0', can be overridden. */
  fixed?: boolean;
}

const SVG_PATHS: Record<BatikMotif, string> = {
  kawung: `
    <g fill="none" stroke="currentColor" stroke-width="1.2">
      <circle cx="20" cy="20" r="11"/>
      <circle cx="60" cy="20" r="11"/>
      <circle cx="20" cy="60" r="11"/>
      <circle cx="60" cy="60" r="11"/>
      <circle cx="40" cy="40" r="11"/>
      <circle cx="20" cy="20" r="3" fill="currentColor"/>
      <circle cx="60" cy="20" r="3" fill="currentColor"/>
      <circle cx="20" cy="60" r="3" fill="currentColor"/>
      <circle cx="60" cy="60" r="3" fill="currentColor"/>
      <circle cx="40" cy="40" r="3" fill="currentColor"/>
    </g>
  `,
  parang: `
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
      <path d="M0 60 Q 20 40 40 60 T 80 60"/>
      <path d="M0 40 Q 20 20 40 40 T 80 40"/>
      <path d="M0 20 Q 20 0 40 20 T 80 20"/>
      <path d="M0 80 Q 20 60 40 80 T 80 80"/>
      <circle cx="40" cy="40" r="2" fill="currentColor"/>
      <circle cx="0" cy="40" r="2" fill="currentColor"/>
      <circle cx="80" cy="40" r="2" fill="currentColor"/>
    </g>
  `,
  ceplok: `
    <g fill="none" stroke="currentColor" stroke-width="1.2">
      <rect x="14" y="14" width="52" height="52" rx="4" transform="rotate(45 40 40)"/>
      <rect x="22" y="22" width="36" height="36" rx="3" transform="rotate(45 40 40)"/>
      <circle cx="40" cy="40" r="6"/>
      <circle cx="40" cy="40" r="2" fill="currentColor"/>
      <circle cx="0" cy="40" r="3"/>
      <circle cx="80" cy="40" r="3"/>
      <circle cx="40" cy="0" r="3"/>
      <circle cx="40" cy="80" r="3"/>
    </g>
  `,
  truntum: `
    <g fill="none" stroke="currentColor" stroke-width="1.2">
      <g transform="translate(40 40)">
        <path d="M0 -16 Q 6 -6 16 0 Q 6 6 0 16 Q -6 6 -16 0 Q -6 -6 0 -16Z"/>
        <circle r="3" fill="currentColor"/>
        <circle r="8"/>
      </g>
      <g transform="translate(0 0)">
        <path d="M0 -10 Q 4 -4 10 0 Q 4 4 0 10 Q -4 4 -10 0 Q -4 -4 0 -10Z"/>
      </g>
      <g transform="translate(80 0)">
        <path d="M0 -10 Q 4 -4 10 0 Q 4 4 0 10 Q -4 4 -10 0 Q -4 -4 0 -10Z"/>
      </g>
      <g transform="translate(0 80)">
        <path d="M0 -10 Q 4 -4 10 0 Q 4 4 0 10 Q -4 4 -10 0 Q -4 -4 0 -10Z"/>
      </g>
      <g transform="translate(80 80)">
        <path d="M0 -10 Q 4 -4 10 0 Q 4 4 0 10 Q -4 4 -10 0 Q -4 -4 0 -10Z"/>
      </g>
    </g>
  `,
  megamendung: `
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
      <path d="M0 40 Q 10 30 20 40 Q 30 50 40 40 Q 50 30 60 40 Q 70 50 80 40"/>
      <path d="M0 56 Q 10 46 20 56 Q 30 66 40 56 Q 50 46 60 56 Q 70 66 80 56"/>
      <path d="M0 24 Q 10 14 20 24 Q 30 34 40 24 Q 50 14 60 24 Q 70 34 80 24"/>
      <path d="M0 8 Q 10 -2 20 8 Q 30 18 40 8 Q 50 -2 60 8 Q 70 18 80 8"/>
      <path d="M0 72 Q 10 62 20 72 Q 30 82 40 72 Q 50 62 60 72 Q 70 82 80 72"/>
    </g>
  `,
};

/**
 * Decorative batik-motif background. Renders a tiled inline SVG so the pattern
 * inherits theme color via `currentColor` and adapts to dark mode automatically.
 */
export function BatikPattern({
  motif = 'kawung',
  opacity = 0.06,
  size = 80,
  color,
  className = '',
  fixed = false,
}: BatikPatternProps) {
  const svgInner = SVG_PATHS[motif];
  const svg = `
<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'>
  ${svgInner}
</svg>`;
  const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return (
    <div
      aria-hidden
      className={`pointer-events-none ${fixed ? 'fixed' : 'absolute'} inset-0 ${className}`}
      style={{
        backgroundImage: `url("${dataUrl}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: `${size}px ${size}px`,
        opacity,
        color: color ?? 'currentColor',
        maskImage: 'radial-gradient(circle at center, black 0%, black 60%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 0%, black 60%, transparent 100%)',
      }}
    />
  );
}
