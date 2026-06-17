import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshReflectorMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ============================================================
   STAGE FLOOR — reflective deck
   ============================================================ */
function StageFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <circleGeometry args={[14, 64]} />
      <MeshReflectorMaterial
        blur={[300, 80]}
        resolution={512}
        mixBlur={1}
        mixStrength={45}
        roughness={0.9}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#06060c"
        metalness={0.6}
        mirror={0.35}
      />
    </mesh>
  );
}

/* Raised performance deck with glowing edge strip */
function StageDeck({ palette }) {
  return (
    <group position={[0, -1.3, 0]}>
      <mesh>
        <boxGeometry args={[9, 0.4, 5]} />
        <meshStandardMaterial color="#0d0d14" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.19, 0]}>
        <boxGeometry args={[9.25, 0.04, 5.25]} />
        <meshBasicMaterial color={palette.primary} toneMapped={false} transparent opacity={0.85} />
      </mesh>
      {[[-4.4, 2.4], [4.4, 2.4], [-4.4, -2.4], [4.4, -2.4]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.05, z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
          <meshBasicMaterial color={palette.secondary} toneMapped={false} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/* ============================================================
   TRUSS BEAM
   ============================================================ */
function TrussBeam({ length, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const half = 0.18;
  const braceCount = Math.max(2, Math.round(length / 2.6));
  const chordColor = '#32323c';
  const braceColor = '#16161e';

  const chordOffsets = [
    [half, half], [half, -half], [-half, half], [-half, -half],
  ];

  return (
    <group position={position} rotation={rotation}>
      {chordOffsets.map(([y, z], i) => (
        <mesh key={`chord-${i}`} position={[0, y, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, length, 6]} />
          <meshStandardMaterial color={chordColor} metalness={0.9} roughness={0.25} />
        </mesh>
      ))}
      {Array.from({ length: braceCount }).map((_, i) => {
        const x = -length / 2 + (i + 0.5) * (length / braceCount);
        const braceLen = half * 2 * Math.SQRT2;
        return (
          <group key={`brace-${i}`} position={[x, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <cylinderGeometry args={[0.028, 0.028, braceLen, 4]} />
              <meshStandardMaterial color={braceColor} metalness={0.75} roughness={0.45} />
            </mesh>
            <mesh rotation={[Math.PI / 4, 0, 0]}>
              <cylinderGeometry args={[0.028, 0.028, braceLen, 4]} />
              <meshStandardMaterial color={braceColor} metalness={0.75} roughness={0.45} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ============================================================
   LED WALL — instanced grid + glow halo behind it
   ============================================================ */
function LEDWall({ palette }) {
  const meshRef = useRef();
  const cols = 18;
  const rows = 9;
  const count = cols * rows;
  const cellSize = 0.66;
  const gap = 0.05;

  const colorA = useMemo(() => new THREE.Color(palette.primary), [palette]);
  const colorB = useMemo(() => new THREE.Color(palette.secondary), [palette]);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - (cols - 1) / 2) * (cellSize + gap);
        const y = (r - (rows - 1) / 2) * (cellSize + gap) + 3.6;
        dummy.position.set(x, y, 0);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        i++;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [cols, rows, cellSize, gap]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.elapsedTime;
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wave = (Math.sin(t * 0.6 + c * 0.3 + r * 0.35) + 1) / 2;
        tmpColor.copy(colorA).lerp(colorB, wave);
        tmpColor.multiplyScalar(1.6 + wave * 0.6);
        mesh.setColorAt(i, tmpColor);
        i++;
      }
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <group position={[0, 0, -6.4]}>
      <mesh position={[0, 3.6, -0.3]}>
        <planeGeometry args={[cols * (cellSize + gap) + 3, rows * (cellSize + gap) + 3]} />
        <meshBasicMaterial color={palette.primary} transparent opacity={0.18} toneMapped={false} />
      </mesh>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <planeGeometry args={[cellSize, cellSize]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/* ============================================================
   INFINITY LOGO — glowing centrepiece above the stage
   ============================================================ */
function InfinityLogo({ palette }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.z = Math.sin(t * 0.25) * 0.08;
    groupRef.current.position.y = 8.4 + Math.sin(t * 0.6) * 0.12;
  });

  const ringRadius = 1.05;
  const tube = 0.1;

  return (
    <group ref={groupRef} position={[0, 8.4, -5.5]}>
      <mesh position={[-ringRadius * 0.78, 0, 0]} rotation={[0, 0.15, 0.25]}>
        <torusGeometry args={[ringRadius, tube, 24, 64]} />
        <meshStandardMaterial
          color={palette.primary}
          emissive={palette.primary}
          emissiveIntensity={3.2}
          toneMapped={false}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[ringRadius * 0.78, 0, 0]} rotation={[0, -0.15, -0.25]}>
        <torusGeometry args={[ringRadius, tube, 24, 64]} />
        <meshStandardMaterial
          color={palette.secondary}
          emissive={palette.secondary}
          emissiveIntensity={3.2}
          toneMapped={false}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
      <pointLight color={palette.primary} intensity={2.5} distance={10} />
    </group>
  );
}

/* ============================================================
   MOVING HEAD LIGHT — yoke + head + animated spot + beam cone
   ============================================================ */
function MovingHead({ position, color, phase = 0, baseTargetX = 0 }) {
  const targetRef = useRef();
  const lightRef = useRef();
  const headRef = useRef();
  const lensRef = useRef();

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase;
    const swingX = Math.sin(t * 0.5) * 3.2 + baseTargetX * 0.5;
    const swingZ = Math.cos(t * 0.35) * 2 - 1;
    if (targetRef.current) targetRef.current.position.set(swingX, -1.5, swingZ);
    if (headRef.current) headRef.current.rotation.z = Math.sin(t * 0.5) * 0.45;
    if (lensRef.current) {
      const pulse = 1.6 + Math.sin(t * 4) * 0.6;
      lensRef.current.material.emissiveIntensity = pulse;
    }
  });

  return (
    <group position={position}>
      <mesh position={[-0.18, -0.05, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
        <meshStandardMaterial color="#0e0e14" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0.18, -0.05, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
        <meshStandardMaterial color="#0e0e14" metalness={0.7} roughness={0.4} />
      </mesh>

      <group ref={headRef} position={[0, -0.2, 0]}>
        <mesh>
          <boxGeometry args={[0.34, 0.24, 0.34]} />
          <meshStandardMaterial color="#1a1a22" metalness={0.65} roughness={0.35} />
        </mesh>
        <mesh ref={lensRef} position={[0, -0.16, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.04, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
        </mesh>
      </group>

      <object3D ref={targetRef} position={[0, -1.5, 0]} />
      <spotLight
        ref={lightRef}
        color={color}
        intensity={22}
        angle={0.27}
        penumbra={0.55}
        distance={24}
        castShadow={false}
      />

      <mesh position={[0, -1.7, 0]}>
        <coneGeometry args={[0.18, 3.4, 16, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, -1.7, 0]}>
        <coneGeometry args={[0.65, 3.4, 20, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   LASER UNIT — dual-layer fanned beams that sweep slowly
   ============================================================ */
function LaserUnit({ position, color, dir = 1, length = 10, fanSpread = 0.1, speed = 0.35 }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.y = t * speed * dir;
    groupRef.current.rotation.x = Math.PI * 0.12 + Math.sin(t * 0.6) * 0.12;
  });

  const beams = 5;

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: beams }).map((_, i) => {
        const angle = (i - (beams - 1) / 2) * fanSpread;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            <mesh position={[0, length / 2, 0]}>
              <cylinderGeometry args={[0.006, 0.018, length, 6, 1, true]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.55}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh position={[0, length / 2, 0]}>
              <cylinderGeometry args={[0.025, 0.09, length, 6, 1, true]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.12}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ============================================================
   ATMOSPHERE — drifting haze + coloured sparkle particles
   ============================================================ */
function Haze({ count = 180 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = Math.random() * 8 - 1.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return arr;
  }, [count]);

  useFrame(() => {
    const pts = pointsRef.current;
    if (!pts) return;
    const pos = pts.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + 0.0025;
      if (y > 6.5) y = -1.5;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#ffffff" transparent opacity={0.18} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Sparkles({ palette, count = 90 }) {
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = palette.primary;
    const c2 = palette.secondary;
    const c3 = palette.laser;
    const palette3 = [c1, c2, c3];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = Math.random() * 7 - 1.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      const c = palette3[i % 3];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [palette, count]);

  useFrame(({ clock }) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const t = clock.elapsedTime;
    pts.material.opacity = 0.35 + Math.sin(t * 2) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

/* ============================================================
   FULL RIG — frame of trusses + legs
   ============================================================ */
function Rig() {
  const halfW = 6.5;
  const halfD = 6;
  const topY = 6;
  const floorY = -1.5;
  const legLength = topY - floorY;
  const legMidY = (topY + floorY) / 2;

  return (
    <>
      <TrussBeam length={halfW * 2} position={[0, topY, -halfD]} rotation={[0, 0, 0]} />
      <TrussBeam length={halfW * 2} position={[0, topY, halfD]} rotation={[0, 0, 0]} />
      <TrussBeam length={halfD * 2} position={[-halfW, topY, 0]} rotation={[0, Math.PI / 2, 0]} />
      <TrussBeam length={halfD * 2} position={[halfW, topY, 0]} rotation={[0, Math.PI / 2, 0]} />

      <TrussBeam length={legLength} position={[-halfW, legMidY, -halfD]} rotation={[0, 0, Math.PI / 2]} />
      <TrussBeam length={legLength} position={[halfW, legMidY, -halfD]} rotation={[0, 0, Math.PI / 2]} />
      <TrussBeam length={legLength} position={[-halfW, legMidY, halfD]} rotation={[0, 0, Math.PI / 2]} />
      <TrussBeam length={legLength} position={[halfW, legMidY, halfD]} rotation={[0, 0, Math.PI / 2]} />
    </>
  );
}

/* ============================================================
   SCENE — full composition
   ============================================================ */
function Scene({ palette }) {
  const headPositions = [-5, -3, -1, 1, 3, 5].map((x) => [x, 5.85, 5.6]);
  const colorPrimary = useMemo(() => new THREE.Color(palette.primary), [palette]);
  const colorSecondary = useMemo(() => new THREE.Color(palette.secondary), [palette]);
  const colorLaser = useMemo(() => new THREE.Color(palette.laser), [palette]);

  const litPalette = {
    primary: colorPrimary,
    secondary: colorSecondary,
    laser: colorLaser,
  };

  return (
    <>
      <color attach="background" args={['#03030a']} />
      <fog attach="fog" args={['#03030a', 11, 28]} />

      <ambientLight intensity={0.1} />
      <pointLight position={[0, 3, 6]} intensity={0.9} color={palette.secondary} />
      <pointLight position={[0, 4, -4]} intensity={0.5} color={palette.primary} />
      <hemisphereLight args={['#1a1a2a', '#000000', 0.25]} />

      <StageFloor />
      <StageDeck palette={litPalette} />
      <LEDWall palette={litPalette} />
      <InfinityLogo palette={litPalette} />
      <Rig />

      {headPositions.map((p, i) => (
        <MovingHead
          key={i}
          position={p}
          color={i % 2 === 0 ? palette.primary : palette.secondary}
          phase={i * 1.3}
          baseTargetX={p[0]}
        />
      ))}

      <LaserUnit position={[-6.5, 6.2, -6]} color={palette.laser} dir={1} length={10} fanSpread={0.1} speed={0.35} />
      <LaserUnit position={[6.5, 6.2, -6]} color={palette.laser} dir={-1} length={10} fanSpread={0.1} speed={0.35} />

      <LaserUnit position={[-3.8, -1.1, 1.5]} color={palette.secondary} dir={1} length={8} fanSpread={0.16} speed={0.5} />
      <LaserUnit position={[3.8, -1.1, 1.5]} color={palette.secondary} dir={-1} length={8} fanSpread={0.16} speed={0.5} />

      <Haze />
      <Sparkles palette={litPalette} />

      <OrbitControls
        target={[0, 2, 0]}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        minDistance={8}
        maxDistance={22}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.05}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <EffectComposer>
        <Bloom luminanceThreshold={0.18} luminanceSmoothing={0.9} intensity={0.7} mipmapBlur radius={0.6} />
        <Vignette eskil={false} offset={0.15} darkness={0.7} />
      </EffectComposer>
    </>
  );
}

export default function Stage3DScene({ palette }) {
  return (
    <Canvas camera={{ position: [10, 5, 13], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
      <Scene palette={palette} />
    </Canvas>
  );
}
