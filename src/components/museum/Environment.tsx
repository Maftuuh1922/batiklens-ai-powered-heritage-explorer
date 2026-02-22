
import { useRef, useMemo } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============ WALL ============
const Wall = ({ position, rotation = [0, 0, 0] as [number, number, number], width = 122, height = 10 }: any) => (
    <mesh position={position} rotation={rotation} receiveShadow>
        <boxGeometry args={[width, height, 0.5]} />
        <meshStandardMaterial color='#ede0c4' roughness={0.95} />
    </mesh>
);

// ============ FLOOR ============
const Floor = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[130, 130]} />
        <meshStandardMaterial color='#7a5230' roughness={0.85} />
    </mesh>
);

// ============ CEILING ============
const Ceiling = () => (
    <>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 8, 0]}>
            <planeGeometry args={[130, 130]} />
            <meshStandardMaterial color='#f5ecd4' roughness={1} />
        </mesh>
        {[
            [-25, 7.94, -25], [0, 7.94, -25], [25, 7.94, -25],
            [-25, 7.94, 0], [0, 7.94, 0], [25, 7.94, 0],
            [-25, 7.94, 25], [0, 7.94, 25], [25, 7.94, 25],
        ].map((p, i) => (
            <mesh key={i} position={p as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[8, 14]} />
                <meshStandardMaterial color='#fff8e0' emissive='#ffcc66' emissiveIntensity={0.6} depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
        ))}
    </>
);

// ============ CEILING BEAMS (Pendopo Style) ============
const CeilingBeams = () => (
    <group position={[0, 7.8, 0]}>
        {/* Longitudinal Beams */}
        {[-22, 0, 22].map((x, i) => (
            <mesh key={`long-${i}`} position={[x, 0, 0]}>
                <boxGeometry args={[0.8, 0.4, 120]} />
                <meshStandardMaterial color="#2a1800" roughness={0.9} />
            </mesh>
        ))}
        {/* Transversal Beams */}
        {[-40, -20, 0, 20, 40].map((z, i) => (
            <mesh key={`trans-${i}`} position={[0, -0.1, z]}>
                <boxGeometry args={[120, 0.3, 0.6]} />
                <meshStandardMaterial color="#3d2200" roughness={0.9} />
            </mesh>
        ))}
    </group>
);

// ============ PILLAR ============
const Pillar = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh castShadow>
            <cylinderGeometry args={[0.35, 0.4, 8, 12]} />
            <meshStandardMaterial color='#e8e2d6' roughness={0.8} metalness={0.02} />
        </mesh>
        <mesh position={[0, -3.9, 0]}>
            <boxGeometry args={[0.9, 0.2, 0.9]} />
            <meshStandardMaterial color='#d4ccc0' roughness={0.9} />
        </mesh>
        <mesh position={[0, 3.9, 0]}>
            <boxGeometry args={[0.9, 0.2, 0.9]} />
            <meshStandardMaterial color='#d4ccc0' roughness={0.9} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.95, 0]}>
            <circleGeometry args={[0.9, 16]} />
            <meshBasicMaterial color='#3d2200' transparent opacity={0.15} depthWrite={false} />
        </mesh>
    </group>
);

// ============ GOLD STRIPE ============
const GoldStripe = ({ z, rotY = 0 }: { z: number, rotY?: number }) => (
    <mesh position={[0, 0.55, z]} rotation={[0, rotY, 0]}>
        <boxGeometry args={[122, 0.07, 0.06]} />
        <meshStandardMaterial color='#b8860b' metalness={0.5} roughness={0.3} emissive='#b8860b' emissiveIntensity={0.12} />
    </mesh>
);

// ============ BENCH ============
const Bench = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.0, 0.12, 0.75]} />
            <meshStandardMaterial color='#5c3d1e' roughness={0.9} />
        </mesh>
        {[[-1.2, 0.3], [1.2, 0.3], [-1.2, -0.3], [1.2, -0.3]].map(([x, z], i) => (
            <mesh key={i} position={[x, 0.28, z as number]}>
                <boxGeometry args={[0.1, 0.55, 0.1]} />
                <meshStandardMaterial color='#3d2200' roughness={0.9} />
            </mesh>
        ))}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <planeGeometry args={[3.6, 1.2]} />
            <meshBasicMaterial color='#000' transparent opacity={0.25} depthWrite={false} />
        </mesh>
    </group>
);

// ============ ROPE BARRIER ============
const RopePost = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh castShadow>
            <cylinderGeometry args={[0.05, 0.06, 1.4, 8]} />
            <meshStandardMaterial color='#b8860b' metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshStandardMaterial color='#d4a017' metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.68, 0]}>
            <cylinderGeometry args={[0.15, 0.18, 0.08, 8]} />
            <meshStandardMaterial color='#8a6800' metalness={0.5} />
        </mesh>
    </group>
);

// ============ WALL CLOCK ============
const WallClock = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {
    const hourRef = useRef<THREE.Mesh>(null);
    const minuteRef = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (hourRef.current) hourRef.current.rotation.z = -(t * 0.008);
        if (minuteRef.current) minuteRef.current.rotation.z = -(t * 0.1);
    });
    return (
        <group position={position} rotation={rotation}>
            <mesh>
                <cylinderGeometry args={[0.5, 0.5, 0.06, 32]} />
                <meshStandardMaterial color='#f5f0e8' roughness={0.8} />
            </mesh>
            <mesh>
                <torusGeometry args={[0.5, 0.04, 8, 32]} />
                <meshStandardMaterial color='#b8860b' metalness={0.6} roughness={0.3} />
            </mesh>
            {[0, 1, 2, 3].map(i => (
                <mesh key={i} position={[Math.sin(i * Math.PI / 2) * 0.4, Math.cos(i * Math.PI / 2) * 0.4, 0.04]}>
                    <sphereGeometry args={[0.03, 6, 6]} />
                    <meshStandardMaterial color='#1a1208' />
                </mesh>
            ))}
            <mesh ref={hourRef} position={[0, 0.12, 0.05]}>
                <boxGeometry args={[0.04, 0.26, 0.02]} />
                <meshStandardMaterial color='#1a1208' />
            </mesh>
            <mesh ref={minuteRef} position={[0, 0.17, 0.06]}>
                <boxGeometry args={[0.025, 0.34, 0.02]} />
                <meshStandardMaterial color='#1a1208' />
            </mesh>
            <mesh position={[0, 0, 0.07]}>
                <cylinderGeometry args={[0.03, 0.03, 0.04, 8]} />
                <meshStandardMaterial color='#b8860b' metalness={0.7} />
            </mesh>
        </group>
    );
};

// ============ CCTV ============
const CCTV = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {
    const ledRef = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (!ledRef.current) return;
        const mat = ledRef.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = Math.sin(clock.getElapsedTime() * 1.5) > 0 ? 1.2 : 0.1;
    });
    return (
        <group position={position} rotation={rotation}>
            <mesh>
                <boxGeometry args={[0.08, 0.12, 0.08]} />
                <meshStandardMaterial color='#222' metalness={0.4} />
            </mesh>
            <mesh position={[0, -0.1, 0.07]}>
                <boxGeometry args={[0.12, 0.08, 0.2]} />
                <meshStandardMaterial color='#1a1a1a' metalness={0.3} />
            </mesh>
            <mesh position={[0, -0.1, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.025, 0.032, 0.04, 10]} />
                <meshStandardMaterial color='#111' metalness={0.8} />
            </mesh>
            <mesh ref={ledRef} position={[0.042, -0.072, 0.165]}>
                <sphereGeometry args={[0.009, 4, 4]} />
                <meshStandardMaterial color='#ff0000' emissive='#ff0000' emissiveIntensity={0.8} />
            </mesh>
        </group>
    );
};

// ============ FIRE EXTINGUISHER ============
const FireExtinguisher = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.075, 0.62, 12]} />
            <meshStandardMaterial color='#cc0000' roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.68, 0]}>
            <cylinderGeometry args={[0.045, 0.07, 0.1, 10]} />
            <meshStandardMaterial color='#888' metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.76, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color='#666' metalness={0.8} />
        </mesh>
        <mesh position={[0.06, 0.78, 0]} rotation={[0, 0, 0.5]}>
            <capsuleGeometry args={[0.012, 0.1, 4, 6]} />
            <meshStandardMaterial color='#333' metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.32, 0.077]}>
            <planeGeometry args={[0.1, 0.16]} />
            <meshStandardMaterial color='#f0f0f0' roughness={0.9} />
        </mesh>
    </group>
);

// ============ GUARD DESK ============
const GuardDesk = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.8, 0.1, 1.1]} />
            <meshStandardMaterial color='#3d2200' roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[2.75, 0.85, 1.05]} />
            <meshStandardMaterial color='#2a1800' roughness={0.9} />
        </mesh>
        <mesh position={[0.6, 1.1, -0.15]} rotation={[0.1, -0.3, 0]}>
            <boxGeometry args={[0.55, 0.38, 0.04]} />
            <meshStandardMaterial color='#111' />
        </mesh>
        <mesh position={[0.6, 1.1, -0.125]} rotation={[0.1, -0.3, 0]}>
            <planeGeometry args={[0.48, 0.32]} />
            <meshStandardMaterial color='#001a33' emissive='#003366' emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.45, 0.96, 0]} rotation={[0, 0.1, 0]}>
            <boxGeometry args={[0.42, 0.035, 0.32]} />
            <meshStandardMaterial color='#f5f0e8' roughness={0.9} />
        </mesh>
        <mesh position={[0.8, 1.0, 0.15]}>
            <cylinderGeometry args={[0.04, 0.07, 0.18, 8]} />
            <meshStandardMaterial color='#888' metalness={0.6} />
        </mesh>
        <mesh position={[0.8, 1.15, 0.15]} rotation={[0.5, 0, 0]}>
            <coneGeometry args={[0.1, 0.14, 8]} />
            <meshStandardMaterial color='#c8a000' emissive='#c8a000' emissiveIntensity={0.4} />
        </mesh>
    </group>
);

// ============ DONATION BOX ============
const DonationBox = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.0, 8]} />
            <meshStandardMaterial color='#b8860b' metalness={0.5} />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[0.28, 0.35, 0.22]} />
            <meshStandardMaterial color='#88ccff' transparent opacity={0.25} roughness={0.1} />
        </mesh>
        <Text position={[0, 1.1, 0.115]} fontSize={0.045} color='#b8860b' anchorX='center' anchorY='middle'>
            DONASI
        </Text>
        <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 0.04, 10]} />
            <meshStandardMaterial color='#8a6800' metalness={0.4} />
        </mesh>
    </group>
);

// ============ EXHIBIT NUMBER ============
const ExhibitNumber = ({ position, number }: { position: [number, number, number], number: number }) => (
    <group position={position}>
        <mesh>
            <cylinderGeometry args={[0.025, 0.025, 1.0, 6]} />
            <meshStandardMaterial color='#b8860b' metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
            <boxGeometry args={[0.32, 0.26, 0.04]} />
            <meshStandardMaterial color='#111' roughness={0.5} />
        </mesh>
        <Text position={[0, 0.55, 0.025]} fontSize={0.12} color='#f0c040' anchorX='center' anchorY='middle'>
            {String(number).padStart(2, '0')}
        </Text>
        <mesh position={[0, -0.47, 0]}>
            <cylinderGeometry args={[0.08, 0.09, 0.06, 8]} />
            <meshStandardMaterial color='#8a6800' metalness={0.5} />
        </mesh>
    </group>
);

// ============ LIGHT SHAFT ============
const LightShaft = ({ position }: { position: [number, number, number] }) => (
    <mesh position={[position[0], position[1] + 1.2, position[2]]}>
        <coneGeometry args={[1.5, 5, 16, 1, true]} />
        <meshBasicMaterial
            color="#fff5e6"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
            depthWrite={false}
        />
    </mesh>
);

// ============ INFO BILLBOARD ============
const InfoBillboard = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => (
    <group position={position} rotation={rotation}>
        <mesh castShadow>
            <boxGeometry args={[4, 3, 0.1]} />
            <meshStandardMaterial color="#222" roughness={0.5} />
        </mesh>
        <mesh position={[0, -2, 0]}>
            <boxGeometry args={[0.2, 2.5, 0.1]} />
            <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[3.6, 2.6]} />
            <meshStandardMaterial color="#fdfaf0" />
        </mesh>
        <Text position={[0, 0.8, 0.07]} fontSize={0.18} color="#1a1208" anchorX="center" anchorY="middle" maxWidth={3.2}>
            WARISAN BATIK NUSANTARA
        </Text>
        <Text position={[0, -0.1, 0.07]} fontSize={0.1} color="#444" anchorX="center" anchorY="middle" maxWidth={3.2} textAlign="justify">
            Batik adalah teknik perintangan warna menggunakan malam (lilin) di atas kain. Diakui oleh UNESCO sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi sejak 2009.
        </Text>
        <Text position={[0, -0.9, 0.07]} fontSize={0.08} color="#b8860b" anchorX="center" anchorY="middle">
            Silakan jelajahi setiap motif yang ada.
        </Text>
    </group>
);

// ============ HERITAGE BANNER ============
const HeritageBanner = ({ position, rotation = [0, 0, 0], color = '#5c0505' }: { position: [number, number, number], rotation?: [number, number, number], color?: string }) => (
    <group position={position} rotation={rotation}>
        <mesh position={[0, 3.5, 0]}>
            <boxGeometry args={[1.5, 0.05, 0.05]} />
            <meshStandardMaterial color="#b8860b" metalness={0.7} />
        </mesh>
        <mesh position={[0, 1.3, 0]}>
            <planeGeometry args={[1.4, 4.5]} />
            <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={1} />
        </mesh>
        <mesh position={[0, -0.9, 0.01]}>
            <boxGeometry args={[1.42, 0.08, 0.02]} />
            <meshStandardMaterial color="#d4a017" emissive="#d4a017" emissiveIntensity={0.2} />
        </mesh>
        <Text position={[0, 1.3, 0.02]} fontSize={0.25} color="#d4a017" rotation={[0, 0, Math.PI / 2]} anchorX="center" anchorY="middle" fillOpacity={0.6}>
            BATIKLENS
        </Text>
    </group>
);

// ============ GRAND TITLE ============
const GrandTitle = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <Text
            position={[0, 1.2, 0.1]}
            fontSize={0.65}
            color="#b8860b"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000"
        >
            BATIKLENS
        </Text>
        <Text
            position={[0, 0.45, 0.1]}
            fontSize={0.22}
            color="#3d2200"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.4}
        >
            MAHAKARYA NUSANTARA
        </Text>
        <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[6, 0.03, 0.02]} />
            <meshStandardMaterial color="#b8860b" />
        </mesh>
    </group>
);

// ============ SUNBEAM ============
const SunBeam = ({ position }: { position: [number, number, number] }) => (
    <mesh position={position}>
        <cylinderGeometry args={[5, 8, 15, 32, 1, true]} />
        <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.03}
            side={THREE.DoubleSide}
            depthWrite={false}
        />
    </mesh>
);

// ============ HERITAGE VASE ============
const HeritageVase = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.25, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.38, 0.9, 12]} />
            <meshStandardMaterial color="#b8860b" metalness={1} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.7, 0]} castShadow>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshStandardMaterial color="#b8860b" metalness={1} roughness={0.1} />
        </mesh>
        {/* Fake Shadow Accent */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <circleGeometry args={[0.8, 32]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
            <ringGeometry args={[0.6, 0.75, 32]} />
            <meshBasicMaterial color="#d4a017" transparent opacity={0.4} />
        </mesh>
    </group>
);

// ============ CAT ============


// ============ BUTTERFLY ============
export const Butterfly = ({ position }: { position: [number, number, number] }) => {
    const ref = useRef<THREE.Group>(null);
    const wingL = useRef<THREE.Group>(null);
    const wingR = useRef<THREE.Group>(null);
    const offset = useMemo(() => Math.random() * Math.PI * 2, []);

    const colors = useMemo(() => {
        const palettes = [
            { outer: '#d4580a', inner: '#f5a623', body: '#3d1a00' },
            { outer: '#1a3a8a', inner: '#4a90d9', body: '#0a1a3a' },
            { outer: '#8b1a8b', inner: '#e040fb', body: '#2d002d' },
            { outer: '#1a7a3a', inner: '#66bb6a', body: '#0a2a10' },
            { outer: '#8b0000', inner: '#ff6b6b', body: '#2d0000' },
        ];
        return palettes[Math.floor(Math.random() * palettes.length)];
    }, []);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime() + offset;
        ref.current.position.x = position[0] + Math.sin(t * 0.28) * 5;
        ref.current.position.y = position[1] + Math.sin(t * 0.55) * 0.6 + Math.sin(t * 0.2) * 0.3;
        ref.current.position.z = position[2] + Math.cos(t * 0.22) * 5;

        const flapAngle = Math.abs(Math.sin(t * 8)) * 1.1;
        if (wingL.current) wingL.current.rotation.y = flapAngle;
        if (wingR.current) wingR.current.rotation.y = -flapAngle;
    });

    return (
        <group ref={ref} position={position}>
            <group ref={wingL} position={[-0.01, 0, 0]}>
                <mesh position={[-0.18, 0.06, 0]}><planeGeometry args={[0.32, 0.28]} /><meshStandardMaterial color={colors.outer} side={THREE.DoubleSide} /></mesh>
            </group>
            <group ref={wingR} position={[0.01, 0, 0]}>
                <mesh position={[0.18, 0.06, 0]}><planeGeometry args={[0.32, 0.28]} /><meshStandardMaterial color={colors.outer} side={THREE.DoubleSide} /></mesh>
            </group>
            <mesh position={[0, 0, 0]}><capsuleGeometry args={[0.022, 0.2, 4, 8]} /><meshStandardMaterial color={colors.body} /></mesh>
        </group>
    );
};

// ============ MAIN EXPORT ============
export const Environment = ({ museumBatiks }: { museumBatiks: any[] }) => {
    const pillarPos: [number, number, number][] = [
        [-22, 4, -30], [0, 4, -30], [22, 4, -30],
        [-22, 4, 0], [0, 4, 0], [22, 4, 0],
        [-22, 4, 30], [0, 4, 30], [22, 4, 30],
    ];

    return (
        <>
            <Floor />
            <Ceiling />
            <CeilingBeams />

            <Wall position={[0, 4, -60]} />
            <Wall position={[0, 4, 60]} />
            <Wall position={[-60, 4, 0]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[60, 4, 0]} rotation={[0, Math.PI / 2, 0]} />

            <GoldStripe z={-59.7} />
            <GoldStripe z={59.7} />

            {pillarPos.map((p, i) => (
                <group key={i}>
                    <Pillar position={p} />
                    <mesh position={[p[0], p[1] + 1, p[2] + 0.41]}>
                        <circleGeometry args={[0.2, 16]} />
                        <meshStandardMaterial color="#b8860b" metalness={0.8} emissive="#b8860b" emissiveIntensity={0.3} />
                    </mesh>
                    <mesh position={[p[0], p[1] + 1, p[2] - 0.41]} rotation={[0, Math.PI, 0]}>
                        <circleGeometry args={[0.2, 16]} />
                        <meshStandardMaterial color="#b8860b" metalness={0.8} emissive="#b8860b" emissiveIntensity={0.3} />
                    </mesh>
                </group>
            ))}

            <GrandTitle position={[0, 5, -20]} />
            <SunBeam position={[0, 7, 0]} />
            <SunBeam position={[0, 7, 35]} />
            <SunBeam position={[0, 7, -35]} />

            {[[-4, -30], [4, -30], [-4, 0], [4, 0], [-4, 30], [4, 30]].map((p, i) => (
                <HeritageVase key={i} position={[p[0], 0, p[1]]} />
            ))}

            <HeritageBanner position={[-58, 3, -58]} rotation={[0, Math.PI / 4, 0]} />
            <HeritageBanner position={[58, 3, -58]} rotation={[0, -Math.PI / 4, 0]} />
            <HeritageBanner position={[-58, 3, 58]} rotation={[0, Math.PI * 0.75, 0]} />
            <HeritageBanner position={[58, 3, 58]} rotation={[0, -Math.PI * 0.75, 0]} />

            {Array.from({ length: 15 }).map((_, i) => (
                <group key={i}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[(i - 7) * 8, 0.015, -40]}>
                        <circleGeometry args={[0.06, 8]} />
                        <meshStandardMaterial color="#b8860b" transparent opacity={0.4} />
                    </mesh>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[(i - 7) * 8, 0.015, 40]}>
                        <circleGeometry args={[0.06, 8]} />
                        <meshStandardMaterial color="#b8860b" transparent opacity={0.4} />
                    </mesh>
                </group>
            ))}

            <Bench position={[-20, 0, -45]} />
            <Bench position={[0, 0, -45]} />
            <Bench position={[20, 0, -45]} />
            <Bench position={[0, 0, 45]} />

            {[-49.5, -38.5, -27.5, -16.5, -5.5, 5.5, 16.5, 27.5, 38.5, 49.5].map((x, i) => (
                <group key={i}>
                    <RopePost position={[x - 1.5, 0.68, -56]} />
                    <RopePost position={[x + 1.5, 0.68, -56]} />
                    <mesh position={[x, 0.9, -56]} rotation={[0, 0, Math.PI / 2]}>
                        <capsuleGeometry args={[0.022, 2.8, 4, 8]} />
                        <meshStandardMaterial color='#8b0000' />
                    </mesh>
                </group>
            ))}

            {[-49.5, -38.5, -27.5, -16.5, -5.5, 5.5, 16.5, 27.5, 38.5, 49.5].map((x, i) => (
                <group key={i}>
                    <RopePost position={[x - 1.5, 0.68, 56]} />
                    <RopePost position={[x + 1.5, 0.68, 56]} />
                    <mesh position={[x, 0.9, 56]} rotation={[0, 0, Math.PI / 2]}>
                        <capsuleGeometry args={[0.022, 2.8, 4, 8]} />
                        <meshStandardMaterial color='#8b0000' />
                    </mesh>
                </group>
            ))}

            {museumBatiks.map((batik, i) => {
                const x = (i % 10 - 4.5) * 11;
                const z = i < 10 ? -56 : 56;
                return <ExhibitNumber key={i} position={[x, 0.5, z]} number={i + 1} />;
            })}

            <WallClock position={[-59.5, 5, 0]} rotation={[0, Math.PI / 2, 0]} />
            <WallClock position={[59.5, 5, 0]} rotation={[0, -Math.PI / 2, 0]} />

            <CCTV position={[-55, 7.5, -55]} rotation={[0.4, Math.PI / 4, 0]} />
            <CCTV position={[55, 7.5, -55]} rotation={[0.4, -Math.PI / 4, 0]} />
            <CCTV position={[-55, 7.5, 55]} rotation={[0.4, Math.PI * 0.75, 0]} />
            <CCTV position={[55, 7.5, 55]} rotation={[0.4, -Math.PI * 0.75, 0]} />

            <FireExtinguisher position={[-58, 0, -57]} />
            <FireExtinguisher position={[58, 0, -57]} />
            <FireExtinguisher position={[-58, 0, 57]} />
            <FireExtinguisher position={[58, 0, 57]} />

            <GuardDesk position={[0, 0, 28]} />
            <DonationBox position={[3, 0, 27]} />
            <DonationBox position={[-3, 0, 27]} />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[12, 110]} />
                <meshStandardMaterial color='#4a0404' />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
                <planeGeometry args={[11, 110]} />
                <meshStandardMaterial color='#5c0505' />
            </mesh>

            {museumBatiks.map((batik, i) => (
                <LightShaft key={`shaft-${i}`} position={[batik.position[0], 6.5, (batik.position as any)[2] < 0 ? -59 : 59]} />
            ))}

            <InfoBillboard position={[12, 2.8, -20]} rotation={[0, -Math.PI / 4, 0]} />
            <InfoBillboard position={[-12, 2.8, -20]} rotation={[0, Math.PI / 4, 0]} />

            {[-40, -20, 0, 20, 40].map((z, i) => (
                <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, z]}>
                    <planeGeometry args={[120, 0.04]} />
                    <meshBasicMaterial color='#6b3d1a' transparent opacity={0.2} />
                </mesh>
            ))}
            {[-40, -20, 0, 20, 40].map((x, i) => (
                <mesh key={x} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[x, 0.005, 0]}>
                    <planeGeometry args={[120, 0.04]} />
                    <meshBasicMaterial color='#6b3d1a' transparent opacity={0.2} />
                </mesh>
            ))}
        </>
    );
};
