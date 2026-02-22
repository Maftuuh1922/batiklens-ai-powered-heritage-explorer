
import React, { useEffect, useRef } from 'react';

interface MobileControlsProps {
    onMove: (x: number, y: number) => void;       // -1 to 1
    onLook: (dx: number, dy: number) => void;      // delta
    onSprint: (s: boolean) => void;
    visible: boolean;
}

export const MobileControls = ({ onMove, onLook, onSprint, visible }: MobileControlsProps) => {
    const joystickBase = useRef<HTMLDivElement>(null);
    const joystickKnob = useRef<HTMLDivElement>(null);
    const joystickTouch = useRef<number | null>(null);  // touch ID untuk joystick
    const lookTouch = useRef<number | null>(null);   // touch ID untuk kamera
    const joystickOrigin = useRef({ x: 0, y: 0 });
    const lastLook = useRef({ x: 0, y: 0 });
    const RADIUS = 55;

    useEffect(() => {
        if (!visible) return;

        const handleTouchStart = (e: TouchEvent) => {
            // Allow default only if not touching active areas if needed, but here we prevent to stop scroll
            if (e.cancelable) e.preventDefault();

            Array.from(e.changedTouches).forEach(touch => {
                const isLeftSide = touch.clientX < window.innerWidth / 2;

                if (isLeftSide && joystickTouch.current === null) {
                    // Joystick — touch kiri
                    joystickTouch.current = touch.identifier;
                    joystickOrigin.current = { x: touch.clientX, y: touch.clientY };

                    // Pindahkan joystick base ke posisi touch
                    if (joystickBase.current) {
                        joystickBase.current.style.left = (touch.clientX - 70) + 'px';
                        joystickBase.current.style.top = (touch.clientY - 70) + 'px';
                        joystickBase.current.style.display = 'block';
                        joystickBase.current.style.opacity = '0.85';
                    }
                } else if (!isLeftSide && lookTouch.current === null) {
                    // Look — touch kanan
                    lookTouch.current = touch.identifier;
                    lastLook.current = { x: touch.clientX, y: touch.clientY };
                }
            });
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.cancelable) e.preventDefault();

            Array.from(e.changedTouches).forEach(touch => {
                // === JOYSTICK ===
                if (touch.identifier === joystickTouch.current) {
                    const dx = touch.clientX - joystickOrigin.current.x;
                    const dy = touch.clientY - joystickOrigin.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const clamp = Math.min(dist, RADIUS);
                    const angle = Math.atan2(dy, dx);
                    const nx = Math.cos(angle) * clamp;
                    const ny = Math.sin(angle) * clamp;

                    // Move knob
                    if (joystickKnob.current) {
                        joystickKnob.current.style.transform = `translate(calc(-50% + ${nx}px), calc(-50% + ${ny}px))`;
                    }

                    // Normalize -1 to 1
                    const normX = nx / RADIUS;
                    const normY = -ny / RADIUS;  // Invert Y for forward
                    onMove(normX, normY);
                    onSprint(dist > RADIUS * 0.85);
                }

                // === LOOK (swipe kanan) ===
                if (touch.identifier === lookTouch.current) {
                    const dx = touch.clientX - lastLook.current.x;
                    const dy = touch.clientY - lastLook.current.y;
                    onLook(dx * 0.008, dy * 0.008);
                    lastLook.current = { x: touch.clientX, y: touch.clientY };
                }
            });
        };

        const handleTouchEnd = (e: TouchEvent) => {
            Array.from(e.changedTouches).forEach(touch => {
                if (touch.identifier === joystickTouch.current) {
                    joystickTouch.current = null;
                    onMove(0, 0);
                    onSprint(false);
                    if (joystickKnob.current) {
                        joystickKnob.current.style.transform = 'translate(-50%, -50%)';
                    }
                    if (joystickBase.current) {
                        joystickBase.current.style.opacity = '0';
                        // Delay hiding slightly for smooth transition if needed, or just hide
                        setTimeout(() => {
                            if (joystickTouch.current === null && joystickBase.current) {
                                joystickBase.current.style.display = 'none';
                            }
                        }, 150);
                    }
                }
                if (touch.identifier === lookTouch.current) {
                    lookTouch.current = null;
                }
            });
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: false });
        window.addEventListener('touchcancel', handleTouchEnd, { passive: false });

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchcancel', handleTouchEnd);
        };
    }, [visible, onMove, onLook, onSprint]);

    if (!visible) return null;

    return (
        <>
            {/* Joystick Base — hidden until touch */}
            <div
                ref={joystickBase}
                style={{
                    position: 'fixed',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.12)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    opacity: 0,
                    display: 'none',
                    pointerEvents: 'none',
                    zIndex: 100,
                    transition: 'opacity 0.2s',
                    touchAction: 'none',
                }}
            >
                {/* Knob */}
                <div
                    ref={joystickKnob}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: '#b8860b',
                        border: '3px solid rgba(255,255,255,0.5)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    }}
                />
            </div>

            {/* Hint camera kanan */}
            <div style={{
                position: 'fixed',
                right: '20px',
                bottom: '80px',
                color: 'rgba(255,255,255,0.25)',
                fontSize: '11px',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                pointerEvents: 'none',
                zIndex: 100,
                fontFamily: 'sans-serif'
            }}>
                SWIPE UNTUK LIHAT
            </div>

            {/* Sprint indicator */}
            <div style={{
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: '24px',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                pointerEvents: 'none',
                zIndex: 100,
                fontFamily: 'sans-serif'
            }}>
                joystick penuh = lari
            </div>
        </>
    );
};
