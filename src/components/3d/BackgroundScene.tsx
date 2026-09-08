import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ----------------------------------------------------------------------------
// FLOATING PARTICLES & STARS MESH
// ----------------------------------------------------------------------------
function StarField({ count = 400 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#fbcfe8'), // soft pink
      new THREE.Color('#e0e7ff'), // soft blue
      new THREE.Color('#fef08a'), // soft gold
      new THREE.Color('#ddd6fe'), // lavender
      new THREE.Color('#ffffff'), // white
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ----------------------------------------------------------------------------
// FLOATING 3D HEARTS
// ----------------------------------------------------------------------------
function FloatingHearts({ count = 15 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  // Create Heart Shape geometry
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  const items = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      key: i,
      position: [
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 12 - 2,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.4,
      speed: 0.5 + Math.random() * 0.8,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      color: ['#f472b6', '#fb7185', '#c084fc', '#f43f5e', '#ec4899'][i % 5],
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, idx) => {
      const item = items[idx];
      child.position.y += Math.sin(state.clock.elapsedTime * item.speed + idx) * 0.003;
      child.rotation.z += delta * item.rotSpeed * 0.2;
      child.rotation.y += delta * 0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item) => (
        <mesh key={item.key} position={item.position} scale={item.scale} geometry={heartGeometry}>
          <meshStandardMaterial
            color={item.color}
            roughness={0.2}
            metalness={0.1}
            emissive={item.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// ----------------------------------------------------------------------------
// PARALLAX CAMERA RIG
// ----------------------------------------------------------------------------
function CameraParallax() {
  useFrame((state) => {
    const targetX = (state.pointer.x * 1.2);
    const targetY = (state.pointer.y * 1.2);
    state.camera.position.x += (targetX - state.camera.position.x) * 0.03;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// ----------------------------------------------------------------------------
// MAIN BACKGROUND CANVAS COMPONENT
// ----------------------------------------------------------------------------
export const BackgroundScene: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffe4e6" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#c084fc" />

        <StarField count={350} />
        <FloatingHearts count={14} />
        <CameraParallax />
      </Canvas>
    </div>
  );
};
