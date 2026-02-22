
import { useRef, useMemo, useEffect } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// FLOOR — Polished dark wood (lightweight, HD look)
const Floor = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[130, 130]} />
        <meshStandardMaterial color="#5a3518" roughness={0.35} metalness={0.12} />
    </mesh>
);

// CEILING
const Ceiling = () => (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 8.5, 0]}>
        <planeGeometry args={[130, 130]} />
        <meshStandardMaterial color="#dfd3b8" roughness={1} />
    </mesh>
);

// WALLS with wainscoting panels
const Wall = ({ position, rotation = [0, 0, 0] as [number, number, number], w = 122 }: any) => (
    <group position={position} rotation={rotation}>
        <mesh receiveShadow>
            <boxGeometry args={[w, 8.5, 0.3]} />
            <meshStandardMaterial color="#e8ddc8" roughness={0.95} />
        </mesh>
        {/* Lower wainscoting dark panel */}
        <mesh position={[0, -3.5, 0.16]}>
            <boxGeometry args={[w, 1.6, 0.06]} />
            <meshStandardMaterial color="#2a1800" roughness={0.7} />
        </mesh>
        {/* Gold top rail */}
        <mesh position={[0, -2.68, 0.17]}>
            <boxGeometry args={[w, 0.06, 0.05]} />
            <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} emissive="#b8860b" emissiveIntensity={0.15} />
        </mesh>
        {/* Floor baseboard */}
        <mesh position={[0, -4.2, 0.17]}>
            <boxGeometry args={[w, 0.08, 0.04]} />
            <meshStandardMaterial color="#b8860b" metalness={0.7} roughness={0.3} />
        </mesh>
    </group>
);

// CEILING COFFER BEAMS — Pendopo style
const CeilingBeams = () => (
    <group position={[0, 8.2, 0]}>
        {[-44, -22, 0, 22, 44].map((x, i) => (
            <mesh key={`b-${i}`} position={[x, 0, 0]}>
                <boxGeometry args={[0.5, 0.55, 120]} />
                <meshStandardMaterial color="#2a1800" roughness={0.85} />
            </mesh>
        ))}
        {[-50, -25, 0, 25, 50].map((z, i) => (
            <mesh key={`c-${i}`} position={[0, 0.02, z]}>
                <boxGeometry args={[120, 0.4, 0.5]} />
                <meshStandardMaterial color="#3a2200" roughness={0.88} />
            </mesh>
        ))}
    </group>
);

// CEILING LIGHT PANELS (emissive strips)
const CeilingLightPanels = () => {
    const positions: [number, number, number][] = [
        [-33, 8.49, -37], [0, 8.49, -37], [33, 8.49, -37],
        [-33, 8.49, 0], [0, 8.49, 0], [33, 8.49, 0],
        [-33, 8.49, 37], [0, 8.49, 37], [33, 8.49, 37],
    ];
    return (
        <>
            {positions.map((p, i) => (
                <mesh key={i} position={p} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[10, 6]} />
                    <meshStandardMaterial
                        color="#fff6e0"
                        emissive="#ffdd88"
                        emissiveIntensity={1.2}
                        depthWrite={false}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </>
    );
};

// PILLAR — polished stone column
const Pillar = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.38, 0.42, 8.5, 16]} />
            <meshStandardMaterial color="#ddd8cc" roughness={0.5} metalness={0.05} />
        </mesh>
        <mesh position={[0, -4.22, 0]}>
            <boxGeometry args={[1.0, 0.22, 1.0]} />
            <meshStandardMaterial color="#c8c0b0" roughness={0.8} />
        </mesh>
        <mesh position={[0, 4.22, 0]}>
            <boxGeometry args={[1.0, 0.22, 1.0]} />
            <meshStandardMaterial color="#c8c0b0" roughness={0.8} />
        </mesh>
        {/* Gold ring accent */}
        <mesh position={[0, -2.5, 0]}>
            <torusGeometry args={[0.42, 0.025, 8, 32]} />
            <meshStandardMaterial color="#b8860b" metalness={0.9} roughness={0.1} emissive="#b8860b" emissiveIntensity={0.2} />
        </mesh>
    </group>
);

// INSTANCED ROPE POSTS
const RopePosts = ({ positions }: { positions: [number, number, number][] }) => {
    const postRef = useRef<THREE.InstancedMesh>(null);
    const topRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useEffect(() => {
        if (!postRef.current || !topRef.current) return;
        positions.forEach((pos, i) => {
            dummy.position.set(pos[0], pos[1], pos[2]);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            postRef.current!.setMatrixAt(i, dummy.matrix);

            dummy.position.set(pos[0], pos[1] + 0.78, pos[2]);
            dummy.updateMatrix();
            topRef.current!.setMatrixAt(i, dummy.matrix);
        });
        postRef.current.instanceMatrix.needsUpdate = true;
        topRef.current.instanceMatrix.needsUpdate = true;
    }, [positions]);

    return (
        <>
            <instancedMesh ref={postRef} args={[undefined, undefined, positions.length]} castShadow>
                <cylinderGeometry args={[0.045, 0.055, 1.5, 8]} />
                <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
            </instancedMesh>
            <instancedMesh ref={topRef} args={[undefined, undefined, positions.length]}>
                <sphereGeometry args={[0.09, 8, 8]} />
                <meshStandardMaterial color="#d4a017" metalness={0.85} roughness={0.1} emissive="#d4a017" emissiveIntensity={0.1} />
            </instancedMesh>
        </>
    );
};

// BENCH — teak wood museum bench
const Bench = ({ position, rotY = 0 }: { position: [number, number, number], rotY?: number }) => (
    <group position={position} rotation={[0, rotY, 0]}>
        <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.8, 0.1, 0.65]} />
            <meshStandardMaterial color="#5c3318" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.88, -0.26]} rotation={[-0.1, 0, 0]}>
            <boxGeometry args={[2.8, 0.55, 0.08]} />
            <meshStandardMaterial color="#5c3318" roughness={0.8} />
        </mesh>
        {[[-1.25, -0.28], [1.25, -0.28], [-1.25, 0.28], [1.25, 0.28]].map(([x, z], i) => (
            <mesh key={i} position={[x as number, 0.24, z as number]}>
                <boxGeometry args={[0.08, 0.5, 0.08]} />
                <meshStandardMaterial color="#3d2200" roughness={0.9} />
            </mesh>
        ))}
        <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[2.85, 0.04, 0.68]} />
            <meshStandardMaterial color="#b8860b" metalness={0.7} roughness={0.3} />
        </mesh>
    </group>
);

// WALL CLOCK — static (no useFrame)
const WallClock = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => (
    <group position={position} rotation={rotation}>
        <mesh>
            <cylinderGeometry args={[0.55, 0.55, 0.07, 24]} />
            <meshStandardMaterial color="#f0ebe0" roughness={0.6} />
        </mesh>
        <mesh>
            <torusGeometry args={[0.55, 0.045, 8, 32]} />
            <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>
        {[0, 1, 2, 3].map(i => (
            <mesh key={i} position={[Math.sin(i * Math.PI / 2) * 0.44, Math.cos(i * Math.PI / 2) * 0.44, 0.04]}>
                <sphereGeometry args={[0.025, 6, 6]} />
                <meshStandardMaterial color="#1a1208" />
            </mesh>
        ))}
        <mesh position={[0.08, 0.12, 0.05]} rotation={[0, 0, -0.4]}>
            <boxGeometry args={[0.035, 0.28, 0.02]} />
            <meshStandardMaterial color="#1a1208" />
        </mesh>
        <mesh position={[-0.06, 0.17, 0.06]} rotation={[0, 0, 0.8]}>
            <boxGeometry args={[0.022, 0.38, 0.018]} />
            <meshStandardMaterial color="#1a1208" />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
            <cylinderGeometry args={[0.025, 0.025, 0.04, 8]} />
            <meshStandardMaterial color="#b8860b" metalness={0.9} />
        </mesh>
    </group>
);

// CCTV — static prop
const CCTV = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => (
    <group position={position} rotation={rotation}>
        <mesh>
            <boxGeometry args={[0.1, 0.14, 0.1]} />
            <meshStandardMaterial color="#1c1c1c" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.08, 0.09]}>
            <boxGeometry args={[0.14, 0.09, 0.22]} />
            <meshStandardMaterial color="#141414" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[0.046, -0.06, 0.2]}>
            <sphereGeometry args={[0.01, 6, 6]} />
            <meshStandardMaterial color="#ff2222" emissive="#ff2222" emissiveIntensity={1.2} />
        </mesh>
    </group>
);

// FIRE EXTINGUISHER
const FireExtinguisher = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh position={[0, 0.36, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.075, 0.64, 10]} />
            <meshStandardMaterial color="#cc1111" roughness={0.35} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.046, 0.07, 0.11, 8]} />
            <meshStandardMaterial color="#888" metalness={0.7} />
        </mesh>
    </group>
);

// HERITAGE VASE — decorative plinth
const HeritageVase = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.75, 0.8, 0.75]} />
            <meshStandardMaterial color="#111" roughness={0.15} metalness={0.85} />
        </mesh>
        <mesh position={[0, 1.22, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.36, 0.88, 14]} />
            <meshStandardMaterial color="#b8860b" metalness={1} roughness={0.08} emissive="#b8860b" emissiveIntensity={0.12} />
        </mesh>
        <mesh position={[0, 1.7, 0]}>
            <sphereGeometry args={[0.28, 14, 14]} />
            <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.06} />
        </mesh>
    </group>
);


// ═══════════════════════════════════════════════════════════════
// TRADITIONAL JAVANESE INSTRUMENTS — Pure Three.js geometry props
// ═══════════════════════════════════════════════════════════════

// BONANG POT — single gong kettle
const BonanGPot = ({ pos }: { pos: [number, number, number] }) => (
    <group position={pos}>
        {/* Pot body */}
        <mesh>
            <cylinderGeometry args={[0.16, 0.13, 0.12, 14]} />
            <meshStandardMaterial color="#b8860b" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Raised nub (pencon) */}
        <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.055, 10, 10]} />
            <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.08} emissive="#b8860b" emissiveIntensity={0.1} />
        </mesh>
        {/* Rim shadow ring */}
        <mesh position={[0, -0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.12, 0.16, 14]} />
            <meshBasicMaterial color="#5a3000" transparent opacity={0.4} />
        </mesh>
    </group>
);

// BONANG RACK — row of gong kettles on a wooden frame
const BonanRack = ({ position, rotY = 0 }: { position: [number, number, number]; rotY?: number }) => (
    <group position={position} rotation={[0, rotY, 0]}>
        {/* Frame rails */}
        <mesh position={[0, 0.55, -0.28]}>
            <boxGeometry args={[2.4, 0.06, 0.06]} />
            <meshStandardMaterial color="#3a1e00" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.55, 0.28]}>
            <boxGeometry args={[2.4, 0.06, 0.06]} />
            <meshStandardMaterial color="#3a1e00" roughness={0.8} />
        </mesh>
        {/* Legs */}
        {([-1.1, 1.1] as number[]).map((x, i) =>
            ([-0.28, 0.28] as number[]).map((z, j) => (
                <mesh key={`${i}-${j}`} position={[x, 0.28, z]}>
                    <cylinderGeometry args={[0.035, 0.035, 0.55, 7]} />
                    <meshStandardMaterial color="#3a1e00" roughness={0.85} />
                </mesh>
            ))
        )}
        {/* Bonang pots in 2 rows × 5 */}
        {[-0.88, -0.44, 0, 0.44, 0.88].map((x, i) => (
            <BonanGPot key={`f-${i}`} pos={[x, 0.62, -0.15]} />
        ))}
        {[-0.88, -0.44, 0, 0.44, 0.88].map((x, i) => (
            <BonanGPot key={`b-${i}`} pos={[x, 0.62, 0.15]} />
        ))}
    </group>
);

// GONG AGENG — large suspended gong
const GongAgeng = ({ position }: { position: [number, number, number] }) => {
    const ref = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
        if (ref.current) ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.02;
    });
    return (
        <group position={position} ref={ref}>
            {/* Frame legs */}
            {[-0.7, 0.7].map((x, i) => (
                <group key={i} position={[x, 0, 0]}>
                    <mesh position={[0, 1.1, 0]}>
                        <cylinderGeometry args={[0.045, 0.06, 2.2, 8]} />
                        <meshStandardMaterial color="#2a1400" roughness={0.85} />
                    </mesh>
                    {/* Gold cap */}
                    <mesh position={[0, 2.22, 0]}>
                        <sphereGeometry args={[0.07, 8, 8]} />
                        <meshStandardMaterial color="#b8860b" metalness={0.9} roughness={0.1} />
                    </mesh>
                    {/* Foot */}
                    <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.12, 0.08, 0.08, 8]} />
                        <meshStandardMaterial color="#1a0a00" roughness={0.9} />
                    </mesh>
                </group>
            ))}
            {/* Top crossbar */}
            <mesh position={[0, 2.18, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.03, 0.03, 1.55, 8]} />
                <meshStandardMaterial color="#2a1400" roughness={0.85} />
            </mesh>
            {/* Decorative carving on crossbar */}
            {[-0.4, 0, 0.4].map((x, i) => (
                <mesh key={i} position={[x, 2.18, 0]}>
                    <torusGeometry args={[0.055, 0.015, 8, 16]} />
                    <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
                </mesh>
            ))}
            {/* Suspension rope */}
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.008, 0.008, 1.3, 5]} />
                <meshStandardMaterial color="#c89040" roughness={0.9} />
            </mesh>
            {/* Gong disc */}
            <mesh position={[0, 0.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.62, 0.62, 0.045, 32]} />
                <meshStandardMaterial color="#b8860b" metalness={0.95} roughness={0.06} emissive="#804800" emissiveIntensity={0.08} />
            </mesh>
            {/* Pencon (center boss) */}
            <mesh position={[0, 0.82, 0.025]}>
                <sphereGeometry args={[0.11, 12, 12]} />
                <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.04} emissive="#b8860b" emissiveIntensity={0.2} />
            </mesh>
            {/* Gong rim ring */}
            <mesh position={[0, 0.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.60, 0.025, 8, 32]} />
                <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.1} />
            </mesh>
        </group>
    );
};

// SARON — xylophone with bronze keys on wooden frame
const Saron = ({ position, rotY = 0 }: { position: [number, number, number]; rotY?: number }) => (
    <group position={position} rotation={[0, rotY, 0]}>
        {/* Frame box */}
        <mesh position={[0, 0.28, 0]}>
            <boxGeometry args={[1.8, 0.14, 0.38]} />
            <meshStandardMaterial color="#3a1a00" roughness={0.8} />
        </mesh>
        {/* Bronze keys */}
        {Array.from({ length: 7 }).map((_, i) => (
            <mesh key={i} position={[-0.6 + i * 0.2, 0.38, 0]}>
                <boxGeometry args={[0.17, 0.06, 0.32]} />
                <meshStandardMaterial color="#d4a017" metalness={0.85} roughness={0.18} emissive="#b86000" emissiveIntensity={0.05} />
            </mesh>
        ))}
        {/* Legs */}
        {([-0.82, 0.82] as number[]).map((x, i) =>
            ([-0.15, 0.15] as number[]).map((z, j) => (
                <mesh key={`${i}-${j}`} position={[x, 0.12, z]}>
                    <cylinderGeometry args={[0.025, 0.025, 0.24, 7]} />
                    <meshStandardMaterial color="#2a1000" roughness={0.9} />
                </mesh>
            ))
        )}
    </group>
);

// GAMELAN SET — full ensemble on a raised platform in the center
const GamelanSet = ({ position }: { position: [number, number, number] }) => (
    <group position={[position[0], position[1], position[2]]}>
        {/* Raised wooden platform */}
        <mesh position={[0, 0.075, 0]} receiveShadow>
            <boxGeometry args={[9, 0.15, 6.5]} />
            <meshStandardMaterial color="#2a1400" roughness={0.7} metalness={0.05} />
        </mesh>
        {/* Platform border gold strip */}
        <mesh position={[0, 0.154, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[4.4, 4.6, 4]} />
            <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Carpet on platform */}
        <mesh position={[0, 0.152, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[8.6, 6.1]} />
            <meshStandardMaterial color="#7a1a1a" roughness={1} />
        </mesh>
        {/* Carpet pattern lines */}
        {[-2, 0, 2].map((x, i) => (
            <mesh key={i} position={[x, 0.155, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.03, 5.8]} />
                <meshBasicMaterial color="#b8860b" />
            </mesh>
        ))}

        {/* Bonang Barung rack — left side */}
        <BonanRack position={[-3.2, 0.15, -1.5]} rotY={0} />
        {/* Bonang Penerus rack — right side */}
        <BonanRack position={[3.2, 0.15, -1.5]} rotY={Math.PI} />

        {/* Gong Ageng — back center */}
        <GongAgeng position={[0, 0.15, -2.4]} />

        {/* Saron pair — front */}
        <Saron position={[-2.2, 0.15, 1.2]} rotY={0} />
        <Saron position={[2.2, 0.15, 1.2]} rotY={0} />

        {/* Small label — point light to spotlight the set */}
        <pointLight position={[0, 3.5, 0]} intensity={1.2} distance={8} color="#ffcc66" castShadow={false} />
    </group>
);

// KENDANG — barrel drum with rope lacings
const Kendang = ({ position, rotY = 0 }: { position: [number, number, number]; rotY?: number }) => (
    <group position={position} rotation={[0, rotY, 0]}>
        {/* Stand legs */}
        {[-0.22, 0.22].map((x, i) => (
            <mesh key={i} position={[x, 0.22, 0]} rotation={[0, 0, i === 0 ? 0.18 : -0.18]}>
                <cylinderGeometry args={[0.02, 0.025, 0.45, 7]} />
                <meshStandardMaterial color="#2a1000" roughness={0.85} />
            </mesh>
        ))}
        <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.48, 0.04, 0.14]} />
            <meshStandardMaterial color="#2a1000" roughness={0.85} />
        </mesh>
        {/* Main drum body — barrel shape */}
        <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.14, 0.1, 0.92, 14]} />
            <meshStandardMaterial color="#8b4513" roughness={0.65} metalness={0.05} />
        </mesh>
        {/* Left drum head */}
        <mesh position={[-0.47, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.102, 0.102, 0.025, 14]} />
            <meshStandardMaterial color="#c8a878" roughness={0.9} />
        </mesh>
        {/* Right drum head (larger) */}
        <mesh position={[0.47, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.142, 0.142, 0.025, 14]} />
            <meshStandardMaterial color="#c8a878" roughness={0.9} />
        </mesh>
        {/* Rope lacings */}
        {Array.from({ length: 7 }).map((_, i) => {
            const angle = (i / 7) * Math.PI * 2;
            return (
                <mesh key={i} position={[0, 0.5 + Math.cos(angle) * 0.105, Math.sin(angle) * 0.105]}
                    rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.006, 0.006, 0.88, 4]} />
                    <meshStandardMaterial color="#8b6914" roughness={0.9} />
                </mesh>
            );
        })}
    </group>
);

// ANGKLUNG — bamboo frame instrument with hanging tubes
const AngklungGroup = ({ position, rotY = 0 }: { position: [number, number, number]; rotY?: number }) => (
    <group position={position} rotation={[0, rotY, 0]}>
        {/* Stand base */}
        <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[1.8, 0.12, 0.35]} />
            <meshStandardMaterial color="#2a1400" roughness={0.8} />
        </mesh>
        {/* Vertical poles */}
        {([-0.8, 0.8] as number[]).map((x, i) => (
            <mesh key={i} position={[x, 1.0, 0]}>
                <cylinderGeometry args={[0.035, 0.04, 2.0, 8]} />
                <meshStandardMaterial color="#5a3200" roughness={0.75} />
            </mesh>
        ))}
        {/* Horizontal crossbar */}
        <mesh position={[0, 1.92, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 1.65, 8]} />
            <meshStandardMaterial color="#4a2800" roughness={0.75} />
        </mesh>
        {/* Hanging Angklung units — 5 bamboo sets */}
        {[-0.56, -0.28, 0, 0.28, 0.56].map((x, i) => {
            const heightsA = [0.55 + i * 0.06, 0.45 + i * 0.05];
            return (
                <group key={i} position={[x, 1.88, 0]}>
                    {/* Suspension string */}
                    <mesh position={[0, -0.08, 0]}>
                        <cylinderGeometry args={[0.004, 0.004, 0.16, 4]} />
                        <meshStandardMaterial color="#a07040" roughness={0.9} />
                    </mesh>
                    {/* Bamboo frame bar */}
                    <mesh position={[0, -0.18, 0]}>
                        <boxGeometry args={[0.18, 0.022, 0.022]} />
                        <meshStandardMaterial color="#8b6914" roughness={0.7} />
                    </mesh>
                    {/* Two bamboo tubes of different heights */}
                    {heightsA.map((h, j) => (
                        <mesh key={j} position={[(j - 0.5) * 0.078, -0.18 - h / 2, 0]}>
                            <cylinderGeometry args={[0.022, 0.022, h, 7]} />
                            <meshStandardMaterial color={j === 0 ? '#c8a040' : '#a07828'} roughness={0.6} />
                        </mesh>
                    ))}
                    {/* Bottom node ring on each tube */}
                    {heightsA.map((h, j) => (
                        <mesh key={`r-${j}`} position={[(j - 0.5) * 0.078, -0.18 - h + 0.04, 0]}>
                            <torusGeometry args={[0.023, 0.005, 6, 12]} />
                            <meshStandardMaterial color="#7a5010" roughness={0.8} />
                        </mesh>
                    ))}
                </group>
            );
        })}
        {/* Label light */}
        <pointLight position={[0, 2.5, 0.5]} intensity={0.5} distance={4} color="#ffe090" />
    </group>
);

// BUTTERFLY — optimized (skip 1 frame)

export const Butterfly = ({ position }: { position: [number, number, number] }) => {
    const ref = useRef<THREE.Group>(null);
    const wingL = useRef<THREE.Group>(null);
    const wingR = useRef<THREE.Group>(null);
    const frame = useRef(0);
    const offset = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame(({ clock }) => {
        frame.current++;
        if (frame.current % 2 !== 0) return;
        if (!ref.current) return;
        const t = clock.getElapsedTime() + offset;
        ref.current.position.x = position[0] + Math.sin(t * 0.22) * 5;
        ref.current.position.y = position[1] + Math.sin(t * 0.45) * 0.5;
        ref.current.position.z = position[2] + Math.cos(t * 0.18) * 5;
        const flap = Math.abs(Math.sin(t * 7.5)) * 1.15;
        if (wingL.current) wingL.current.rotation.y = flap;
        if (wingR.current) wingR.current.rotation.y = -flap;
    });

    return (
        <group ref={ref} position={position}>
            <group ref={wingL}>
                <mesh position={[-0.16, 0, 0]}>
                    <planeGeometry args={[0.3, 0.28]} />
                    <meshStandardMaterial color="#d4580a" side={THREE.DoubleSide} roughness={0.8} />
                </mesh>
            </group>
            <group ref={wingR}>
                <mesh position={[0.16, 0, 0]}>
                    <planeGeometry args={[0.3, 0.28]} />
                    <meshStandardMaterial color="#d4580a" side={THREE.DoubleSide} roughness={0.8} />
                </mesh>
            </group>
            <mesh>
                <capsuleGeometry args={[0.02, 0.18, 4, 6]} />
                <meshStandardMaterial color="#3d1a00" />
            </mesh>
        </group>
    );
};

// GRAND TITLE
const GrandTitle = () => (
    <group position={[0, 5, -19.5]}>
        <Text
            fontSize={0.72}
            color="#b8860b"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.025}
            outlineColor="#000"
            letterSpacing={0.06}
        >
            BATIKLENS
        </Text>
        <Text
            position={[0, -0.65, 0]}
            fontSize={0.2}
            color="#3d2200"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.35}
        >
            MAHAKARYA NUSANTARA
        </Text>
        <mesh position={[0, -0.95, 0]}>
            <boxGeometry args={[6.5, 0.025, 0.02]} />
            <meshStandardMaterial color="#b8860b" emissive="#b8860b" emissiveIntensity={0.4} />
        </mesh>
    </group>
);

// MAIN ENVIRONMENT EXPORT
export const Environment = ({ museumBatiks }: { museumBatiks: any[] }) => {
    const pillarPositions: [number, number, number][] = [
        [-22, 4.25, -28], [0, 4.25, -28], [22, 4.25, -28],
        [-22, 4.25, 0], [0, 4.25, 0], [22, 4.25, 0],
        [-22, 4.25, 28], [0, 4.25, 28], [22, 4.25, 28],
    ];

    const ropePositions = useMemo<[number, number, number][]>(() => {
        const p: [number, number, number][] = [];
        [-44, -33, -22, -11, 0, 11, 22, 33, 44].forEach(x => {
            p.push([x, 0.75, -56.5]);
            p.push([x, 0.75, 56.5]);
        });
        return p;
    }, []);

    return (
        <>
            <Floor />
            <Ceiling />
            <CeilingBeams />
            <CeilingLightPanels />

            {/* Walls */}
            <Wall position={[0, 4.25, -60]} />
            <Wall position={[0, 4.25, 60]} />
            <Wall position={[-60, 4.25, 0]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[60, 4.25, 0]} rotation={[0, Math.PI / 2, 0]} />

            {/* Pillars */}
            {pillarPositions.map((p, i) => <Pillar key={i} position={p} />)}

            {/* Centre carpet runner */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]}>
                <planeGeometry args={[9, 110]} />
                <meshStandardMaterial color="#5c0505" roughness={0.95} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.011, 0]}>
                <planeGeometry args={[7.6, 110]} />
                <meshStandardMaterial color="#8b0000" roughness={0.95} />
            </mesh>
            {/* Carpet gold edge trim */}
            {[-4, 4].map((x, i) => (
                <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.013, 0]}>
                    <planeGeometry args={[0.07, 110]} />
                    <meshStandardMaterial color="#b8860b" emissive="#b8860b" emissiveIntensity={0.3} />
                </mesh>
            ))}

            {/* Rope barriers */}
            <RopePosts positions={ropePositions} />
            {/* Rope cables */}
            {[-44, -33, -22, -11, 0, 11, 22, 33, 44].map((x, i) => (
                <group key={i}>
                    <mesh position={[x, 0.92, -56.5]} rotation={[0, 0, Math.PI / 2]}>
                        <capsuleGeometry args={[0.018, 9.9, 4, 8]} />
                        <meshStandardMaterial color="#8b0000" roughness={0.8} />
                    </mesh>
                    <mesh position={[x, 0.92, 56.5]} rotation={[0, 0, Math.PI / 2]}>
                        <capsuleGeometry args={[0.018, 9.9, 4, 8]} />
                        <meshStandardMaterial color="#8b0000" roughness={0.8} />
                    </mesh>
                </group>
            ))}

            {/* Benches */}
            <Bench position={[-20, 0, -44]} />
            <Bench position={[0, 0, -44]} />
            <Bench position={[20, 0, -44]} />
            <Bench position={[0, 0, 44]} rotY={Math.PI} />

            {/* Vases */}
            {[[-5, -28], [5, -28], [-5, 0], [5, 0], [-5, 28], [5, 28]].map(([x, z], i) => (
                <HeritageVase key={i} position={[x, 0, z]} />
            ))}

            {/* Wall clocks */}
            <WallClock position={[-59.5, 5, 0]} rotation={[0, Math.PI / 2, 0]} />
            <WallClock position={[59.5, 5, 0]} rotation={[0, -Math.PI / 2, 0]} />

            {/* CCTVs */}
            <CCTV position={[-55, 8, -55]} rotation={[0.4, Math.PI / 4, 0]} />
            <CCTV position={[55, 8, -55]} rotation={[0.4, -Math.PI / 4, 0]} />
            <CCTV position={[-55, 8, 55]} rotation={[0.4, Math.PI * 0.75, 0]} />
            <CCTV position={[55, 8, 55]} rotation={[0.4, -Math.PI * 0.75, 0]} />

            {/* Fire extinguishers */}
            <FireExtinguisher position={[-58, 0, -58]} />
            <FireExtinguisher position={[58, 0, -58]} />
            <FireExtinguisher position={[-58, 0, 58]} />
            <FireExtinguisher position={[58, 0, 58]} />

            {/* Grand title */}
            <GrandTitle />

            {/* ══════════════════════════════════════════════════════════
                GAMELAN SET — Center of the museum, on a raised platform
                ══════════════════════════════════════════════════════════ */}
            <GamelanSet position={[0, 0, 0]} />

            {/* KENDANG pairs — left & right sides */}
            <Kendang position={[-8, 0, -20]} rotY={0.4} />
            <Kendang position={[8, 0, -20]} rotY={-0.4} />
            <Kendang position={[-8, 0, 20]} rotY={Math.PI - 0.4} />
            <Kendang position={[8, 0, 20]} rotY={Math.PI + 0.4} />

            {/* ANGKLUNG groups — four corners */}
            <AngklungGroup position={[-42, 0, -42]} rotY={Math.PI * 0.25} />
            <AngklungGroup position={[42, 0, -42]} rotY={-Math.PI * 0.25} />
            <AngklungGroup position={[-42, 0, 42]} rotY={Math.PI * 0.75} />
            <AngklungGroup position={[42, 0, 42]} rotY={-Math.PI * 0.75} />

            {/* Floor grid lines */}
            {[-38, -19, 0, 19, 38].map(z => (
                <mesh key={`gz-${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, z]}>
                    <planeGeometry args={[120, 0.03]} />
                    <meshBasicMaterial color="#6b3d1a" transparent opacity={0.18} />
                </mesh>
            ))}
            {[-38, -19, 0, 19, 38].map(x => (
                <mesh key={`gx-${x}`} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[x, 0.005, 0]}>
                    <planeGeometry args={[120, 0.03]} />
                    <meshBasicMaterial color="#6b3d1a" transparent opacity={0.18} />
                </mesh>
            ))}

            {/* Subtle sunbeam cones */}
            {[-30, 0, 30].map((z, i) => (
                <mesh key={`sun-${i}`} position={[0, 6, z]}>
                    <coneGeometry args={[4, 8, 20, 1, true]} />
                    <meshBasicMaterial color="#fff5d6" transparent opacity={0.04} side={THREE.DoubleSide} depthWrite={false} />
                </mesh>
            ))}
        </>
    );
};
