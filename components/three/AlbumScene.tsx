"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/** Same-origin optimized URL (avoids CORS issues and keeps the texture small). */
const tex = (id: string, w = 640) =>
  `/_next/image?url=${encodeURIComponent(`https://images.unsplash.com/${id}`)}&w=${w}&q=75`;

const GOLD = "#c6a46a";
const LEATHER = "#17120e";

/**
 * Loads the cover photo without suspending. If the image fails (offline, CDN issue)
 * the album still renders with a plain cover panel instead of the whole scene vanishing.
 */
function usePhotoTexture(url: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    let alive = true;
    new THREE.TextureLoader().load(
      url,
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
        if (alive) setTexture(t);
      },
      undefined,
      () => {},
    );
    return () => {
      alive = false;
    };
  }, [url]);
  return texture;
}

function pageEdgeTexture() {
  const c = document.createElement("canvas");
  c.width = 8;
  c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = "#f4eddc";
  g.fillRect(0, 0, 8, 256);
  for (let y = 0; y < 256; y += 4) {
    g.fillStyle = y % 8 === 0 ? "rgba(120,100,70,0.35)" : "rgba(255,255,255,0.4)";
    g.fillRect(0, y, 8, 1.4);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function GoldBar(props: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <mesh position={props.position} castShadow>
      <boxGeometry args={props.size} />
      <meshStandardMaterial color={GOLD} metalness={1} roughness={0.22} envMapIntensity={1.6} />
    </mesh>
  );
}

function Album({ photoId }: { photoId: string }) {
  const rig = useRef<THREE.Group>(null);
  const photo = usePhotoTexture(tex(photoId));

  const edge = useMemo(() => pageEdgeTexture(), []);
  const edgeSide = useMemo(() => {
    const t = edge.clone();
    t.repeat.set(1, 1);
    t.needsUpdate = true;
    return t;
  }, [edge]);

  useFrame((state, dt) => {
    if (!rig.current) return;
    const t = state.clock.elapsedTime;
    const targetY = -0.55 + Math.sin(t * 0.35) * 0.25 + state.pointer.x * 0.55;
    const targetX = 0.12 - state.pointer.y * 0.25;
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, targetY, 2.5, dt);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, targetX, 2.5, dt);
  });

  const W = 2.25, H = 3.05;
  const frontZ = 0.2;

  return (
    <group ref={rig}>
      {/* back cover */}
      <RoundedBox args={[W, H, 0.07]} radius={0.025} smoothness={4} position={[0, 0, -0.19]} castShadow receiveShadow>
        <meshStandardMaterial color={LEATHER} roughness={0.55} metalness={0.05} />
      </RoundedBox>

      {/* page block: sides use ruled-paper texture so thickness reads as real pages */}
      <mesh position={[0.02, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 2.92, 0.3]} />
        <meshStandardMaterial attach="material-0" map={edgeSide} roughness={0.9} />
        <meshStandardMaterial attach="material-1" map={edgeSide} roughness={0.9} />
        <meshStandardMaterial attach="material-2" color="#efe6d1" roughness={0.95} />
        <meshStandardMaterial attach="material-3" color="#efe6d1" roughness={0.95} />
        <meshStandardMaterial attach="material-4" color="#f6f0e2" roughness={0.9} />
        <meshStandardMaterial attach="material-5" color="#f6f0e2" roughness={0.9} />
      </mesh>

      {/* spine */}
      <RoundedBox args={[0.11, H, 0.46]} radius={0.04} smoothness={4} position={[-W / 2 + 0.02, 0, 0]} castShadow>
        <meshStandardMaterial color={LEATHER} roughness={0.5} />
      </RoundedBox>
      <GoldBar position={[-W / 2 - 0.036, 0.9, 0]} size={[0.012, 0.03, 0.4]} />
      <GoldBar position={[-W / 2 - 0.036, -0.9, 0]} size={[0.012, 0.03, 0.4]} />

      {/* front cover */}
      <RoundedBox args={[W, H, 0.07]} radius={0.025} smoothness={4} position={[0, 0, frontZ]} castShadow receiveShadow>
        <meshStandardMaterial color={LEATHER} roughness={0.5} metalness={0.05} />
      </RoundedBox>

      {/* embossed photo window */}
      <mesh position={[0, 0.12, frontZ + 0.039]}>
        <planeGeometry args={[1.5, 1.9]} />
        <meshStandardMaterial
          key={photo ? "photo" : "placeholder"}
          map={photo ?? undefined}
          color={photo ? "#ffffff" : "#2b2219"}
          roughness={0.35}
        />
      </mesh>
      {/* gold frame around the photo */}
      <GoldBar position={[0, 1.09, frontZ + 0.042]} size={[1.58, 0.03, 0.012]} />
      <GoldBar position={[0, -0.85, frontZ + 0.042]} size={[1.58, 0.03, 0.012]} />
      <GoldBar position={[-0.77, 0.12, frontZ + 0.042]} size={[0.03, 1.97, 0.012]} />
      <GoldBar position={[0.77, 0.12, frontZ + 0.042]} size={[0.03, 1.97, 0.012]} />

      {/* foil border on the cover */}
      <GoldBar position={[0, 1.38, frontZ + 0.038]} size={[1.95, 0.012, 0.008]} />
      <GoldBar position={[0, -1.38, frontZ + 0.038]} size={[1.95, 0.012, 0.008]} />
      <GoldBar position={[-0.97, 0, frontZ + 0.038]} size={[0.012, 2.77, 0.008]} />
      <GoldBar position={[0.97, 0, frontZ + 0.038]} size={[0.012, 2.77, 0.008]} />

      {/* foil emblem */}
      <mesh position={[0, -1.12, frontZ + 0.04]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.1, 0.01]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.22} envMapIntensity={1.6} />
      </mesh>
      <GoldBar position={[-0.3, -1.12, frontZ + 0.04]} size={[0.38, 0.01, 0.008]} />
      <GoldBar position={[0.3, -1.12, frontZ + 0.04]} size={[0.38, 0.01, 0.008]} />
    </group>
  );
}

export default function AlbumScene({ photoId, active }: { photoId: string; active: boolean }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 7], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      aria-label="Interactive 3D wedding album"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={2.1} castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-4, 2, 3]} intensity={60} angle={0.5} penumbra={1} color="#ffe9c4" />

      {/* Procedural studio lighting: no external HDR download needed */}
      <Environment resolution={256} environmentIntensity={0.9}>
        <Lightformer form="rect" intensity={3} position={[0, 5, 3]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={2} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color="#ffe2b0" />
        <Lightformer form="rect" intensity={1.4} position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
      </Environment>

      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.7} floatingRange={[-0.1, 0.12]}>
        <Album photoId={photoId} />
      </Float>
      <ContactShadows position={[0, -2.05, 0]} opacity={0.55} scale={9} blur={2.8} far={4} />
    </Canvas>
  );
}
