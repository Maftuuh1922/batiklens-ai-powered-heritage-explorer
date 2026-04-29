import { useEffect } from 'react';

/**
 * Lightweight, dependency-free confetti burst.
 * Call `fireConfetti()` once on a milestone (level-up, badge unlocked).
 */
export function fireConfetti(opts: { particles?: number; duration?: number } = {}): void {
  const { particles = 80, duration = 2200 } = opts;
  if (typeof document === 'undefined') return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

  const container = document.createElement('div');
  container.setAttribute('aria-hidden', 'true');
  container.style.cssText =
    'position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:9999;';
  document.body.appendChild(container);

  const colors = ['#D4A14A', '#1A1F3A', '#A4031F', '#3E5C76', '#F5F0E8', '#C2410C'];

  for (let i = 0; i < particles; i++) {
    const piece = document.createElement('div');
    const size = 6 + Math.random() * 8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = 50 + (Math.random() - 0.5) * 30;
    const angle = (Math.random() - 0.5) * 140;
    const distance = 180 + Math.random() * 360;
    const rotate = (Math.random() - 0.5) * 720;
    const delay = Math.random() * 120;
    const dur = 1100 + Math.random() * 900;

    piece.style.cssText = `
      position:absolute;
      top:30%;
      left:${left}%;
      width:${size}px;
      height:${size * 0.4}px;
      background:${color};
      border-radius:1px;
      transform:translate(-50%,-50%);
      opacity:0;
      will-change:transform,opacity;
    `;

    const anim = piece.animate(
      [
        { transform: `translate(-50%,-50%) rotate(0deg)`, opacity: 1 },
        {
          transform: `translate(calc(-50% + ${Math.sin((angle * Math.PI) / 180) * distance}px), calc(-50% + ${
            Math.cos((angle * Math.PI) / 180) * distance + 220
          }px)) rotate(${rotate}deg)`,
          opacity: 0,
        },
      ],
      { duration: dur, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' },
    );
    container.appendChild(piece);
    anim.onfinish = () => piece.remove();
  }

  setTimeout(() => container.remove(), duration + 400);
}
