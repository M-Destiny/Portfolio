import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

class DistortMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#6366f1') }
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vDisplacement;
        uniform float uTime;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          float distort = sin(pos.x * 3.0 + uTime) * 0.1 + cos(pos.y * 2.0 + uTime) * 0.1;
          pos += normal * distort;
          vDisplacement = distort;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vDisplacement;
        uniform vec3 uColor;
        
        void main() {
          vec3 color = uColor + vDisplacement * 0.5;
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
  }
}

extend({ DistortMaterial });

function AnimatedSphere({ position, color, delay = 0 }: { position: [number, number, number], color: string, delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 + delay;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + delay;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.9} 
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function FloatingCubes() {
  const cubes = useMemo(() => {
    return Array.from({ length: 15 }, () => ({
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      scale: Math.random() * 0.8 + 0.3,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      color: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981'][Math.floor(Math.random() * 5)]
    }));
  }, []);

  return (
    <>
      {cubes.map((cube, i) => (
        <Float key={i} speed={1.5 + Math.random()} rotationIntensity={1} floatIntensity={1}>
          <RoundedBox 
            args={[cube.scale, cube.scale, cube.scale]} 
            radius={0.1} 
            position={cube.position}
            rotation={cube.rotation}
          >
            <meshStandardMaterial 
              color={cube.color} 
              metalness={0.8} 
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </RoundedBox>
        </Float>
      ))}
    </>
  );
}

function Particles() {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#8b5cf6" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#06b6d4" />
      
      <AnimatedSphere position={[-3, 1, 0]} color="#6366f1" />
      <AnimatedSphere position={[3, -1, -2]} color="#ec4899" delay={1} />
      <AnimatedSphere position={[0, 2, -4]} color="#8b5cf6" delay={2} />
      
      <FloatingCubes />
      <Particles />
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.5} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
      
      <fog attach="fog" args={['#0a0a0a', 5, 30]} />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
