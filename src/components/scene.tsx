"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
function Structure({ paused, layer }: { paused: boolean; layer: number }) {
  const group = useRef<THREE.Group>(null);
  const edge = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(3.65, 0.065, 3.65)),
    [],
  );
  const points = useMemo(() => {
    const p = [];
    for (let x = -2; x <= 2; x++)
      for (let z = -2; z <= 2; z++) {
        const y = 0.55 + (Math.sin(x * 2 + z * 3) + 1) * 0.6;
        p.push({ x: x * 0.59, z: z * 0.59, y });
      }
    return p;
  }, []);
  useFrame((state, delta) => {
    if (!group.current || paused) return;
    const elapsed = state.clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      -0.2 + state.pointer.x * 0.2 + Math.sin(elapsed * 0.16) * 0.09,
      3,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      state.pointer.y * 0.07,
      3,
      delta,
    );
    group.current.position.y = Math.sin(elapsed * 0.5) * 0.045;
  });
  return (
    <group ref={group} rotation={[0, -0.2, 0]}>
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i} position={[0, -1.5 + i * 0.46, 0]}>
          <mesh>
            <boxGeometry args={[3.65, 0.065, 3.65]} />
            <meshPhysicalMaterial
              color={i === layer * 2 ? "#49c59c" : "#1e6158"}
              transparent
              opacity={i === layer * 2 ? 0.35 : 0.14}
              metalness={0.65}
              roughness={0.15}
              depthWrite={false}
            />
          </mesh>
          <lineSegments geometry={edge}>
            <lineBasicMaterial
              color={i === layer * 2 ? "#a3f5d5" : "#54a993"}
              transparent
              opacity={i === layer * 2 ? 0.85 : 0.3}
            />
          </lineSegments>
        </group>
      ))}
      {points.map((p, i) => (
        <group key={i} position={[p.x, -0.2, p.z]}>
          <mesh position={[0, p.y / 2, 0]}>
            <boxGeometry args={[0.12, p.y, 0.12]} />
            <meshStandardMaterial
              color="#1e8269"
              metalness={0.8}
              roughness={0.25}
            />
          </mesh>
          <mesh position={[0, p.y + 0.07, 0]}>
            <boxGeometry args={[0.14, 0.14, 0.14]} />
            <meshStandardMaterial
              color="#a6f9d1"
              emissive="#45ac82"
              emissiveIntensity={0.65}
            />
          </mesh>
          <mesh position={[0, -0.7, 0]}>
            <cylinderGeometry args={[0.007, 0.007, 1.4, 5]} />
            <meshBasicMaterial color="#3a9b83" transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]} position={[0, -1.9, 0]}>
        <torusGeometry args={[2.7, 0.008, 4, 120]} />
        <meshBasicMaterial color="#438e7f" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.9, 0]}>
        <ringGeometry args={[2.75, 2.76, 100]} />
        <meshBasicMaterial
          color="#438e7f"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
export default function Scene(props: { paused: boolean; layer: number }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [6, 4.3, 7], fov: 35 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      frameloop={props.paused ? "demand" : "always"}
    >
      <ambientLight intensity={1.3} />
      <directionalLight position={[3, 8, 4]} intensity={3} color="#b9ffe3" />
      <pointLight position={[-4, 1, -2]} intensity={12} color="#228c91" />
      <Structure {...props} />
    </Canvas>
  );
}
