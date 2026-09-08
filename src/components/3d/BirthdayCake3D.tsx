import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ----------------------------------------------------------------------------
// CANDLE FLAME COMPONENT (ANIMATED GLOWING FLAME)
// ----------------------------------------------------------------------------
function CandleFlame({ position, isBlown }: { position: [number, number, number]; isBlown: boolean }) {
  const flameRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    if (!flameRef.current || isBlown) return;
    const time = state.clock.elapsedTime;
    // Organic flickering flame scale and position wobble
    const flicker = Math.sin(time * 12 + position[0] * 5) * 0.15 + 1.0;
    flameRef.current.scale.set(0.12 * flicker, 0.28 * flicker, 0.12 * flicker);
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 * flicker;
    }
  });

  if (isBlown) {
    // Rising smoke particle placeholder
    return (
      <group position={position}>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#d1d5db" transparent opacity={0.4} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      {/* Flame Mesh */}
      <mesh ref={flameRef} position={[0, 0.2, 0]}>
        <coneGeometry args={[1, 2, 8]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>

      {/* Inner Flame Glow */}
      <mesh position={[0, 0.18, 0]} scale={[0.08, 0.18, 0.08]}>
        <coneGeometry args={[1, 2, 8]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Point Light Source */}
      <pointLight ref={lightRef} color="#f59e0b" intensity={1.5} distance={3} />
    </group>
  );
}

// ----------------------------------------------------------------------------
// 3D LAYERED CAKE MODEL
// ----------------------------------------------------------------------------
function CakeMesh({ isBlown }: { isBlown: boolean }) {
  const cakeGroupRef = useRef<THREE.Group>(null!);

  // Candle positions on top tier
  const candlePositions: [number, number, number][] = useMemo(() => [
    [-0.5, 1.45, 0],
    [0, 1.45, -0.5],
    [0.5, 1.45, 0],
    [0, 1.45, 0.5],
    [0, 1.45, 0],
  ], []);

  useFrame((state) => {
    if (!cakeGroupRef.current) return;
    // Gentle floating and subtle Y rotation
    cakeGroupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
    cakeGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
  });

  return (
    <group ref={cakeGroupRef} position={[0, -0.6, 0]}>
      {/* Cake Plate */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[2.4, 2.4, 0.1, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Bottom Tier (Pink Frosting) */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.8, 32]} />
        <meshStandardMaterial color="#f472b6" roughness={0.3} />
      </mesh>

      {/* Cream Layer Middle Trim */}
      <mesh position={[0, 0.82, 0]}>
        <torusGeometry args={[1.82, 0.06, 16, 32]} />
        <meshStandardMaterial color="#fff1f2" roughness={0.1} />
      </mesh>

      {/* Top Tier (Cream Frosting) */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.6, 32]} />
        <meshStandardMaterial color="#fff1f2" roughness={0.2} />
      </mesh>

      {/* Top Gold Drip Trim */}
      <mesh position={[0, 1.45, 0]}>
        <torusGeometry args={[1.22, 0.05, 16, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Candle Sticks & Flames */}
      {candlePositions.map((pos, idx) => (
        <group key={idx}>
          {/* Candle Body */}
          <mesh position={[pos[0], pos[1] + 0.15, pos[2]]}>
            <cylinderGeometry args={[0.04, 0.04, 0.3, 16]} />
            <meshStandardMaterial color={idx % 2 === 0 ? '#fb7185' : '#c084fc'} />
          </mesh>
          {/* Candle Flame */}
          <CandleFlame position={[pos[0], pos[1] + 0.3, pos[2]]} isBlown={isBlown} />
        </group>
      ))}
    </group>
  );
}

// ----------------------------------------------------------------------------
// MAIN CAKE CANVAS CONTAINER
// ----------------------------------------------------------------------------
export const BirthdayCake3D: React.FC<{ isBlown: boolean }> = ({ isBlown }) => {
  return (
    <div className="w-full h-[380px] md:h-[480px] relative">
      <Canvas
        camera={{ position: [0, 1.8, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={isBlown ? 1.2 : 0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#fff1f2" />
        <pointLight position={[-5, 2, -3]} color="#c084fc" intensity={1.0} />

        <CakeMesh isBlown={isBlown} />
      </Canvas>
    </div>
  );
};
