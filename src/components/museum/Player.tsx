
import { useRef, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

const arrowKeys = { ArrowLeft: false, ArrowRight: false };
if (typeof window !== 'undefined') {
    window.addEventListener('keydown', e => { if (e.code in arrowKeys) arrowKeys[e.code] = true; });
    window.addEventListener('keyup', e => { if (e.code in arrowKeys) arrowKeys[e.code] = false; });
}

const EYE_LEVEL = 1.7;
const WALK_SPEED = 4.8;
const SPRINT_SPEED = 8.5;
const TURN_SPEED = 1.9;
const MOUSE_SENS = 0.0018;

const Q_UP = new THREE.Quaternion();
const Q_RIGHT = new THREE.Quaternion();
const AXIS_Y = new THREE.Vector3(0, 1, 0);
const AXIS_X = new THREE.Vector3(1, 0, 0);

export const Player = ({ started, paused, onPositionChange, onSprintChange, mobileHandlers }: any) => {
    const [, get] = useKeyboardControls();
    const { camera } = useThree();

    const velocity = useRef(new THREE.Vector3());
    const yaw = useRef(0);
    const pitch = useRef(0);
    const bobT = useRef(0);
    const bobY = useRef(EYE_LEVEL);
    const breathT = useRef(0);
    const fovRef = useRef(65);

    // FIX 3: Mobile Input Refs
    const mobileMove = useRef({ x: 0, y: 0 });
    const mobileLook = useRef({ dx: 0, dy: 0 });
    const mobileSprint = useRef(false);

    // Connect handlers back to parent
    useEffect(() => {
        if (mobileHandlers && mobileHandlers.current) {
            mobileHandlers.current.onMove = (x: number, y: number) => {
                mobileMove.current = { x, y };
            };
            mobileHandlers.current.onLook = (dx: number, dy: number) => {
                mobileLook.current.dx += dx;
                mobileLook.current.dy += dy;
            };
            mobileHandlers.current.onSprint = (s: boolean) => {
                mobileSprint.current = s;
            };
        }
    }, [mobileHandlers]);

    useEffect(() => {
        camera.quaternion.identity();
        camera.position.set(0, EYE_LEVEL, 0);
        camera.up.set(0, 1, 0);
    }, [camera]);

    useEffect(() => {
        if (!started) return;

        const onMove = (e: MouseEvent) => {
            if (paused) return;
            yaw.current -= e.movementX * MOUSE_SENS;
            pitch.current -= e.movementY * MOUSE_SENS;
            pitch.current = Math.max(-0.44, Math.min(0.44, pitch.current));
        };

        const onWheel = (e: WheelEvent) => {
            if (paused) return;
            fovRef.current = Math.max(30, Math.min(85, fovRef.current + e.deltaY * 0.04));
        };

        const onClick = () => {
            if (!paused) {
                const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
                if (!isMobile) document.body.requestPointerLock();
            }
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('click', onClick);
        window.addEventListener('wheel', onWheel, { passive: true });

        return () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('click', onClick);
            window.removeEventListener('wheel', onWheel);
        };
    }, [started, paused]);

    useFrame((_s, delta) => {
        if (!started) return;
        const dt = Math.min(delta, 0.05);

        const cam = camera as THREE.PerspectiveCamera;
        cam.fov = THREE.MathUtils.lerp(cam.fov, fovRef.current, 0.06);
        cam.updateProjectionMatrix();

        if (paused) return;

        // Mobile Look Override/Integration
        if (Math.abs(mobileLook.current.dx) > 0 || Math.abs(mobileLook.current.dy) > 0) {
            yaw.current -= mobileLook.current.dx * 1.5; // Scale for better mobile feel
            pitch.current -= mobileLook.current.dy * 1.5;
            pitch.current = Math.max(-0.44, Math.min(0.44, pitch.current));
            mobileLook.current = { dx: 0, dy: 0 }; // Consume the look delta
        }

        if (arrowKeys.ArrowLeft) yaw.current += TURN_SPEED * dt;
        if (arrowKeys.ArrowRight) yaw.current -= TURN_SPEED * dt;

        pitch.current = Math.max(-0.44, Math.min(0.44, pitch.current));

        Q_UP.setFromAxisAngle(AXIS_Y, yaw.current);
        Q_RIGHT.setFromAxisAngle(AXIS_X, pitch.current);
        camera.quaternion.multiplyQuaternions(Q_UP, Q_RIGHT);

        const front = new THREE.Vector3(-Math.sin(yaw.current), 0, -Math.cos(yaw.current));
        const side = new THREE.Vector3();
        side.crossVectors(front, AXIS_Y).normalize();

        const { forward, backward, left, right, sprint } = get() as any;

        const mX = mobileMove.current.x;
        const mY = mobileMove.current.y;
        const isMobileMoving = Math.abs(mX) > 0.05 || Math.abs(mY) > 0.05;

        const targetVel = new THREE.Vector3();
        const activeSprint = sprint || mobileSprint.current;
        const speed = activeSprint ? SPRINT_SPEED : WALK_SPEED;

        // Keyboard
        if (forward) targetVel.addScaledVector(front, speed);
        if (backward) targetVel.addScaledVector(front, -speed * 0.7);
        if (left) targetVel.addScaledVector(side, -speed * 0.85);
        if (right) targetVel.addScaledVector(side, speed * 0.85);

        // Mobile joystick
        if (isMobileMoving) {
            targetVel.addScaledVector(front, mY * speed);
            targetVel.addScaledVector(side, mX * speed * 0.85);
        }

        if (targetVel.length() > speed) targetVel.normalize().multiplyScalar(speed);

        const isMoving = targetVel.length() > 0.1;
        const lerpFactor = isMoving ? 0.15 : 0.25;
        velocity.current.lerp(targetVel, lerpFactor);

        camera.position.x += velocity.current.x * dt;
        camera.position.z += velocity.current.z * dt;
        camera.position.x = Math.max(-55, Math.min(55, camera.position.x));
        camera.position.z = Math.max(-55, Math.min(55, camera.position.z));

        const moving = velocity.current.length() > 0.3;
        if (moving) {
            bobT.current += dt * (activeSprint ? 9.0 : 6.0);
            const bob = Math.abs(Math.sin(bobT.current)) * (activeSprint ? 0.04 : 0.022);
            bobY.current = THREE.MathUtils.lerp(bobY.current, EYE_LEVEL + bob, 0.18);
        } else {
            breathT.current += dt * 0.4;
            const breath = Math.sin(breathT.current) * 0.006;
            bobY.current = THREE.MathUtils.lerp(bobY.current, EYE_LEVEL + breath, 0.04);
            bobT.current = 0;
        }
        camera.position.y = bobY.current;

        onPositionChange?.({ x: camera.position.x, z: camera.position.z });
        onSprintChange?.(activeSprint && moving);
    });

    return null;
};
