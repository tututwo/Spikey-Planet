import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color } from "three";

import vertexShader from './sunshader/vertexShader.glsl';
import fragmentShader from './sunshader/fragmentShader.glsl';

export default function Sun() {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  const uniforms = {
    u_time: {
      value: 0.0,
    },
    u_colorA: { value: new Color("#FFE486") },
    u_colorB: { value: new Color("#FEB3D9") },
  }
  useFrame((state, delta) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={true}
      />
    </mesh>
  );
};