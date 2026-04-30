import { useId } from 'react';

export type BatikMotif = 'kawung' | 'parang' | 'ceplok' | 'truntum' | 'megamendung';

interface BatikPatternProps {
  motif?: BatikMotif;
  /** 0 - 1, controls overall opacity. Default 0.06 for very subtle background. */
  opacity?: number;
  /** Tile size in CSS pixels. Default 80. */
  size?: number;
  /** Stroke / fill color override. Default uses inherited `color` (currentColor). */
  color?: string;
  className?: string;
  /** Position layer — default 'absolute inset-0', can be overridden via fixed. */
  fixed?: boolean;
  /** Optional radial fade — soften pattern toward edges. Default true. */
  fade?: boolean;
}

interface MotifPaths {
  strokes: { d: string; w?: number; round?: boolean }[];
  dots: { cx: number; cy: number; r: number }[];
}

const MOTIFS: Record<BatikMotif, MotifPaths> = {
  kawung: {
    strokes: [
      { d: 'M20 9 a11 11 0 1 1 0 22 a11 11 0 1 1 0 -22 Z', w: 1.2 },
      { d: 'M60 9 a11 11 0 1 1 0 22 a11 11 0 1 1 0 -22 Z', w: 1.2 },
      { d: 'M20 49 a11 11 0 1 1 0 22 a11 11 0 1 1 0 -22 Z', w: 1.2 },
      { d: 'M60 49 a11 11 0 1 1 0 22 a11 11 0 1 1 0 -22 Z', w: 1.2 },
      { d: 'M40 29 a11 11 0 1 1 0 22 a11 11 0 1 1 0 -22 Z', w: 1.2 },
    ],
    dots: [
      { cx: 20, cy: 20, r: 3 },
      { cx: 60, cy: 20, r: 3 },
      { cx: 20, cy: 60, r: 3 },
      { cx: 60, cy: 60, r: 3 },
      { cx: 40, cy: 40, r: 3 },
    ],
  },
  parang: {
    strokes: [
      { d: 'M0 60 Q 20 40 40 60 T 80 60', w: 1.4, round: true },
      { d: 'M0 40 Q 20 20 40 40 T 80 40', w: 1.4, round: true },
      { d: 'M0 20 Q 20 0 40 20 T 80 20', w: 1.4, round: true },
      { d: 'M0 80 Q 20 60 40 80 T 80 80', w: 1.4, round: true },
    ],
    dots: [
      { cx: 40, cy: 40, r: 2 },
      { cx: 0, cy: 40, r: 2 },
      { cx: 80, cy: 40, r: 2 },
    ],
  },
  ceplok: {
    strokes: [
      { d: 'M40 4 L76 40 L40 76 L4 40 Z', w: 1.2 },
      { d: 'M40 14 L66 40 L40 66 L14 40 Z', w: 1.2 },
      { d: 'M40 34 a6 6 0 1 1 0 12 a6 6 0 1 1 0 -12 Z', w: 1.2 },
      { d: 'M0 37 a3 3 0 1 1 0 6 a3 3 0 1 1 0 -6 Z', w: 1.2 },
      { d: 'M80 37 a3 3 0 1 1 0 6 a3 3 0 1 1 0 -6 Z', w: 1.2 },
      { d: 'M37 0 a3 3 0 1 1 6 0 a3 3 0 1 1 -6 0 Z', w: 1.2 },
      { d: 'M37 80 a3 3 0 1 1 6 0 a3 3 0 1 1 -6 0 Z', w: 1.2 },
    ],
    dots: [{ cx: 40, cy: 40, r: 2 }],
  },
  truntum: {
    strokes: [
      { d: 'M40 24 Q 46 34 56 40 Q 46 46 40 56 Q 34 46 24 40 Q 34 34 40 24Z', w: 1.2 },
      { d: 'M40 32 a8 8 0 1 1 0 16 a8 8 0 1 1 0 -16 Z', w: 1.2 },
      { d: 'M0 -10 Q 4 -4 10 0 Q 4 4 0 10 Q -4 4 -10 0 Q -4 -4 0 -10Z', w: 1.2 },
      { d: 'M80 -10 Q 84 -4 90 0 Q 84 4 80 10 Q 76 4 70 0 Q 76 -4 80 -10Z', w: 1.2 },
      { d: 'M0 70 Q 4 76 10 80 Q 4 84 0 90 Q -4 84 -10 80 Q -4 76 0 70Z', w: 1.2 },
      { d: 'M80 70 Q 84 76 90 80 Q 84 84 80 90 Q 76 84 70 80 Q 76 76 80 70Z', w: 1.2 },
    ],
    dots: [{ cx: 40, cy: 40, r: 3 }],
  },
  megamendung: {
    strokes: [
      { d: 'M0 8 Q 10 -2 20 8 Q 30 18 40 8 Q 50 -2 60 8 Q 70 18 80 8', w: 1.4, round: true },
      { d: 'M0 24 Q 10 14 20 24 Q 30 34 40 24 Q 50 14 60 24 Q 70 34 80 24', w: 1.4, round: true },
      { d: 'M0 40 Q 10 30 20 40 Q 30 50 40 40 Q 50 30 60 40 Q 70 50 80 40', w: 1.4, round: true },
      { d: 'M0 56 Q 10 46 20 56 Q 30 66 40 56 Q 50 46 60 56 Q 70 66 80 56', w: 1.4, round: true },
      { d: 'M0 72 Q 10 62 20 72 Q 30 82 40 72 Q 50 62 60 72 Q 70 82 80 72', w: 1.4, round: true },
    ],
    dots: [],
  },
};

/**
 * Decorative batik-motif background. Renders a real inline SVG with a `<pattern>`
 * fill so `currentColor` resolves from the parent's `color` (set via Tailwind classes
 * like `text-sogan dark:text-gold`). Unlike a data-URI background-image, the pattern
 * truly inherits theme color and adapts to light/dark mode automatically.
 */
export function BatikPattern({
  motif = 'kawung',
  opacity = 0.06,
  size = 80,
  color,
  className = '',
  fixed = false,
  fade = true,
}: BatikPatternProps) {
  const reactId = useId();
  const patternId = `batik-${motif}-${reactId.replace(/:/g, '')}`;
  const { strokes, dots } = MOTIFS[motif];
  const positionClass = fixed ? 'fixed' : 'absolute';
  const fadeStyle = fade
    ? {
        WebkitMaskImage:
          'radial-gradient(circle at center, black 0%, black 60%, transparent 100%)',
        maskImage:
          'radial-gradient(circle at center, black 0%, black 60%, transparent 100%)',
      }
    : {};

  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${positionClass} inset-0 w-full h-full ${className}`}
      style={{ opacity, color: color ?? 'currentColor', ...fadeStyle }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
          viewBox="0 0 80 80"
        >
          <g fill="none" stroke="currentColor">
            {strokes.map((s, i) => (
              <path
                key={`s-${i}`}
                d={s.d}
                strokeWidth={s.w ?? 1.2}
                strokeLinecap={s.round ? 'round' : 'butt'}
              />
            ))}
          </g>
          <g fill="currentColor">
            {dots.map((d, i) => (
              <circle key={`d-${i}`} cx={d.cx} cy={d.cy} r={d.r} />
            ))}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
