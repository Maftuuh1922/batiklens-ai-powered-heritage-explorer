
import React, { useState, useEffect, useRef } from 'react';

interface JoystickProps {
    onMove: (data: { x: number; y: number }) => void;
    onEnd: () => void;
}

export const MobileJoystick = ({ onMove, onEnd }: JoystickProps) => {
    const [stickPos, setStickPos] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const touchId = useRef<number | null>(null);

    const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
        setDragging(true);
        if ('touches' in e) {
            touchId.current = e.touches[0].identifier;
        }
        updatePosition(e);
    };

    const updatePosition = (e: any) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        let clientX, clientY;
        if (e.touches) {
            // Find the correct touch
            const touch = Array.from(e.touches as TouchList).find(t => t.identifier === touchId.current) || e.touches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const deltaX = clientX - (rect.left + centerX);
        const deltaY = clientY - (rect.top + centerY);

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxRadius = rect.width / 2;

        let moveX = deltaX;
        let moveY = deltaY;

        if (distance > maxRadius) {
            const ratio = maxRadius / distance;
            moveX = deltaX * ratio;
            moveY = deltaY * ratio;
        }

        setStickPos({ x: moveX, y: moveY });
        onMove({ x: moveX / maxRadius, y: -moveY / maxRadius });
    };

    useEffect(() => {
        const handleGlobalMove = (e: any) => {
            if (dragging) {
                e.preventDefault();
                updatePosition(e);
            }
        };

        const handleGlobalEnd = () => {
            if (dragging) {
                setDragging(false);
                setStickPos({ x: 0, y: 0 });
                touchId.current = null;
                onEnd();
            }
        };

        window.addEventListener('touchmove', handleGlobalMove, { passive: false });
        window.addEventListener('mousemove', handleGlobalMove);
        window.addEventListener('touchend', handleGlobalEnd);
        window.addEventListener('mouseup', handleGlobalEnd);

        return () => {
            window.removeEventListener('touchmove', handleGlobalMove);
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('touchend', handleGlobalEnd);
            window.removeEventListener('mouseup', handleGlobalEnd);
        };
    }, [dragging]);

    return (
        <div
            ref={containerRef}
            className="w-20 h-20 md:w-28 md:h-28 bg-white/10 backdrop-blur-xl rounded-full border-2 border-white/20 flex items-center justify-center touch-none select-none shadow-2xl"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
        >
            <div
                className="w-10 h-10 md:w-14 md:h-14 bg-gold rounded-full shadow-lg pointer-events-none"
                style={{
                    transform: `translate(${stickPos.x}px, ${stickPos.y}px)`,
                    boxShadow: '0 0 15px rgba(184, 134, 11, 0.5)'
                }}
            />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] text-white/60 font-black tracking-widest uppercase">
                Move
            </div>
        </div>
    );
};
