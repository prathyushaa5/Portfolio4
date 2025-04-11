// components/Particles.tsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import React from 'react';

interface Particle {
  time: number;
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
  mx: number;
  my: number;
}

interface ParticlesProps {
  count?: number;
}

export function Particles({ count = 1000 }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  const particles = useMemo<Particle[]>(() => {
    const temp: Particle[] = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        time: Math.random() * 100,
        factor: 20 + Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        xFactor: -50 + Math.random() * 100,
        yFactor: -50 + Math.random() * 100,
        zFactor: -50 + Math.random() * 100,
        mx: 0,
        my: 0,
      });
    }
    return temp;
  }, [count]);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particles.length * 3);
    const colors = new Float32Array(particles.length * 3);

    particles.forEach((particle, i) => {
      const i3 = i * 3;
      positions[i3] = particle.xFactor;
      positions[i3 + 1] = particle.yFactor;
      positions[i3 + 2] = particle.zFactor;

      // Gradient from purple to blue
      colors[i3] = 0.5 + Math.random() * 0.3;
      colors[i3 + 1] = 0.2 * Math.random();
      colors[i3 + 2] = 0.5 + Math.random() * 0.5;
    });

    return [positions, colors];
  }, [particles]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (light.current) {
      light.current.position.x = Math.sin(elapsed) * 20;
      light.current.position.z = Math.cos(elapsed) * 20;
    }

    const geometry = mesh.current?.geometry;
    const positionAttr = geometry?.attributes.position;

    if (geometry && positionAttr && positionAttr.array instanceof Float32Array) {
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const p = particles[i];
        const x = Math.sin(p.time + elapsed * p.speed) * p.xFactor;
        const y = Math.cos(p.time + elapsed * p.speed) * p.yFactor;
        const z = Math.sin(p.time + elapsed * p.speed) * p.zFactor;

        positionAttr.array[i3] = x;
        positionAttr.array[i3 + 1] = y;
        positionAttr.array[i3 + 2] = z;
      }
      positionAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      <pointLight ref={light} distance={40} intensity={8} color="purple" />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length}
            array={positions}
            itemSize={3}
            args={[positions, 3]} 
          />
          <bufferAttribute
                      attach="attributes-color"
                      count={particles.length}
                      array={colors}
                      itemSize={3} args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
