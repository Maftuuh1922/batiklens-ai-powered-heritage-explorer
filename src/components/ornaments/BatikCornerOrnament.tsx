import React from 'react';

type Corner = 'tl' | 'tr' | 'bl' | 'br';

interface BatikCornerOrnamentProps {
  corner?: Corner;
  size?: number;
  className?: string;
}

const PATH = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M2 30 L2 12 Q 2 2 12 2 L30 2" />
    <circle cx="6" cy="6" r="2.5" fill="currentColor" />
    <circle cx="14" cy="6" r="1.5" />
    <circle cx="6" cy="14" r="1.5" />
    <path d="M22 6 L26 6 M30 10 L30 14" opacity="0.6" />
    <path d="M6 22 L6 26 M10 30 L14 30" opacity="0.6" />
  </g>
);

/**
 * Tiny gold ornament tucked into a card corner — evokes the tumpal border
 * found on traditional kain panjang. Decorative only.
 */
export function BatikCornerOrnament({ corner = 'tl', size = 32, className = '' }: BatikCornerOrnamentProps) {
  const rotate = { tl: 0, tr: 90, br: 180, bl: 270 }[corner];
  const position = {
    tl: 'top-2 left-2',
    tr: 'top-2 right-2',
    br: 'bottom-2 right-2',
    bl: 'bottom-2 left-2',
  }[corner];
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`pointer-events-none absolute ${position} text-gold/80 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {PATH}
    </svg>
  );
}
