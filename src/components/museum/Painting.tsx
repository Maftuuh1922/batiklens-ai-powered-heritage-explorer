import React, { useRef, useMemo } from 'react';
import { useTexture, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface PaintingProps {
    batik: any;
    position: [number, number, number];
    rotation: [number, number, number];
    isVisited: boolean;
    onSelect: (b: any) => void;
}

export const Painting = ({ batik, position, rotation, isVisited, onSelect }: PaintingProps) => {
    const texture = useTexture(batik.imageUrl);
    const { camera } = useThree();
    const groupRef = useRef<THREE.Group>(null);
    const labelRef = useRef<THREE.Group>(null);
    const posVec = useMemo(() => new THREE.Vector3(...position), [position]);

    // Optimize: Toggle label visibility via ref inside useFrame (Zero React Re-renders)
    useFrame(() => {
        if (!labelRef.current || !camera) return;
        const dist = camera.position.distanceTo(posVec);
        // Threshold 22 — appear earlier
        labelRef.current.visible = dist < 22;
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            {/* Outer Frame - Premium Wood with Shadows */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[4.5, 5.5, 0.25]} />
                <meshStandardMaterial
                    color={isVisited ? "#3d2800" : "#1c1008"}
                    emissive={isVisited ? "#b8860b" : "#000000"}
                    emissiveIntensity={isVisited ? 0.08 : 0}
                    roughness={0.7}
                    metalness={0.1}
                    polygonOffset
                    polygonOffsetFactor={-2}
                    polygonOffsetUnits={-2}
                />
            </mesh>

            {/* Simulated Spotlight Strip (Emissive) */}
            <mesh position={[0, 2.45, 0.12]}>
                <boxGeometry args={[4.4, 0.08, 0.18]} />
                <meshStandardMaterial
                    color="#ffe4a0"
                    emissive="#ffcc66"
                    emissiveIntensity={1.8}
                    depthWrite={false}
                />
            </mesh>

            {/* Inner Mount */}
            <mesh position={[0, 0, 0.10]} receiveShadow>
                <boxGeometry args={[4.2, 5.2, 0.05]} />
                <meshStandardMaterial color="#f5f0e8" roughness={0.9} />
            </mesh>

            {/* Main Canvas Material */}
            <mesh
                position={[0, 0, 0.14]}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(batik);
                }}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { document.body.style.cursor = 'default'; }}
            >
                <planeGeometry args={[4.0, 5.0]} />
                <meshStandardMaterial
                    map={texture as THREE.Texture}
                    roughness={0.8}
                    metalness={0.0}
                />
            </mesh>

            {/* Info Plate - Black Wood / Emas Base */}
            <mesh position={[0, -3.1, 0.13]}>
                <boxGeometry args={[3.6, 0.38, 0.05]} />
                <meshStandardMaterial color="#1a1208" metalness={0.3} roughness={0.5} emissive="#b8860b" emissiveIntensity={0.05} />
            </mesh>

            {/* === LABEL GROUP — toggle via ref === */}
            <group ref={labelRef} visible={false}>

                {/* Background card label */}
                <mesh position={[0, -3.4, 0.14]}>
                    <boxGeometry args={[4.2, 1.4, 0.04]} />
                    <meshStandardMaterial color="#0a0a0a" transparent opacity={0.95} />
                </mesh>

                {/* Gold accent line */}
                <mesh position={[0, -2.72, 0.15]}>
                    <boxGeometry args={[4.2, 0.04, 0.02]} />
                    <meshStandardMaterial color="#b8860b" emissive="#b8860b" emissiveIntensity={0.5} />
                </mesh>

                {/* Batik Name — No font prop for stability */}
                <Text
                    position={[0, -3.05, 0.18]}
                    fontSize={0.22}
                    color="#f5c518"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={4.0}
                    letterSpacing={0.02}
                    outlineWidth={0.008}
                    outlineColor="#000000"
                >
                    {batik.name}
                </Text>

                {/* Origin Location */}
                <Text
                    position={[0, -3.38, 0.18]}
                    fontSize={0.14}
                    color="#dddddd"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={4.0}
                    letterSpacing={0.05}
                    outlineWidth={0.005}
                    outlineColor="#000000"
                >
                    {(batik.origin || 'NUSANTARA').toUpperCase()}
                </Text>

                {/* Interaction Hint */}
                <Text
                    position={[0, -3.68, 0.18]}
                    fontSize={0.13}
                    color="#b8860b"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.03}
                    outlineWidth={0.005}
                    outlineColor="#000000"
                >
                    KLIK UNTUK DETAIL
                </Text>
            </group>
        </group>
    );
};
