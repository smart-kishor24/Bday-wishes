import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { PhotoItem } from '../../config/personalization';
import { getPlaceholderImage } from '../../utils/placeholders';

interface FloatingPolaroidMeshProps {
  photo: PhotoItem;
  position: [number, number, number];
  rotation: [number, number, number];
  onSelect: (photo: PhotoItem) => void;
}

function PolaroidMesh({ photo, position, rotation, onSelect }: FloatingPolaroidMeshProps) {
  const meshRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Safe Texture Loading (No Suspense throws, handles all image formats smoothly)
  useEffect(() => {
    let isMounted = true;
    const loader = new THREE.TextureLoader();

    const targetUrl = photo.url || getPlaceholderImage(photo.id);

    loader.load(
      targetUrl,
      (loadedTexture) => {
        if (!isMounted) return;
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.generateMipmaps = true;
        loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
        setTexture(loadedTexture);
      },
      undefined,
      () => {
        // Fallback to SVG generator if file fails
        if (!isMounted) return;
        loader.load(getPlaceholderImage(photo.id), (fallbackTex) => {
          if (!isMounted) return;
          fallbackTex.colorSpace = THREE.SRGBColorSpace;
          setTexture(fallbackTex);
        });
      }
    );

    return () => {
      isMounted = false;
    };
  }, [photo.url, photo.id]);

  const basePos = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Gentle floating bob
    const floatY = Math.sin(time * 0.9 + photo.id * 1.5) * 0.12;
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      basePos.y + floatY,
      0.06
    );

    // Subtle tilt
    const rotZ = Math.sin(time * 0.7 + photo.id * 2) * 0.03;
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      rotation[2] + rotZ + (hovered ? 0.08 : 0),
      0.08
    );

    // Hover scale & lift effect
    const targetScale = hovered ? 1.15 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(photo);
      }}
    >
      {/* Outer White Polaroid Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 2.7, 0.05]} />
        <meshStandardMaterial
          color={hovered ? '#fff1f2' : '#ffffff'}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>

      {/* Inner Image Texture */}
      <mesh position={[0, 0.2, 0.03]}>
        <planeGeometry args={[1.9, 1.9]} />
        {texture ? (
          <meshBasicMaterial map={texture} />
        ) : (
          <meshStandardMaterial color="#fce7f3" roughness={0.5} />
        )}
      </mesh>

      {/* Polaroid Bottom Note Area */}
      <mesh position={[0, -0.95, 0.026]}>
        <planeGeometry args={[1.8, 0.45]} />
        <meshBasicMaterial color={hovered ? '#fbcfe8' : '#f3e8ff'} transparent opacity={0.3} />
      </mesh>

      {/* Glow Halo on Hover */}
      {hovered && (
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[2.5, 3.0]} />
          <meshBasicMaterial color="#f472b6" transparent opacity={0.4} />
        </mesh>
      )}
    </group>
  );
}

// Gentle Camera Rig that rotates slightly based on mouse movement
function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.8,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.5,
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

interface FloatingPolaroidsProps {
  photos: PhotoItem[];
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const FloatingPolaroidsScene: React.FC<FloatingPolaroidsProps> = ({ photos, onSelectPhoto }) => {
  // 3D curved arc layout for up to 8 photos
  const layoutPositions: { pos: [number, number, number]; rot: [number, number, number] }[] = [
    { pos: [-4.2, 1.2, 0], rot: [0, 0.22, -0.08] },
    { pos: [-1.4, 1.6, 0.4], rot: [0, 0.08, 0.03] },
    { pos: [1.4, 1.6, 0.4], rot: [0, -0.08, -0.03] },
    { pos: [4.2, 1.2, 0], rot: [0, -0.22, 0.08] },
    { pos: [-4.0, -1.5, 0.2], rot: [0, 0.16, 0.06] },
    { pos: [-1.3, -1.6, 0.6], rot: [0, 0.05, -0.04] },
    { pos: [1.3, -1.6, 0.6], rot: [0, -0.05, 0.04] },
    { pos: [4.0, -1.5, 0.2], rot: [0, -0.16, -0.06] },
  ];

  return (
    <div className="w-full h-[520px] sm:h-[600px] md:h-[660px] relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 6, 6]} intensity={1.4} color="#fff1f2" />
        <pointLight position={[-5, -4, 5]} color="#f472b6" intensity={1.2} />
        <pointLight position={[5, 4, 3]} color="#fef08a" intensity={0.8} />

        <Suspense fallback={null}>
          <group>
            {photos.slice(0, 8).map((photo, index) => {
              const layout = layoutPositions[index] || layoutPositions[0];
              return (
                <PolaroidMesh
                  key={photo.id}
                  photo={photo}
                  position={layout.pos}
                  rotation={layout.rot}
                  onSelect={onSelectPhoto}
                />
              );
            })}
          </group>
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
};
