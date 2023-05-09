import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Color, WireframeGeometry, LineSegments, ShaderMaterial } from "three";

import vertexShader from "./spikeyshader/vertexShader.glsl";
import fragmentShader from "./spikeyshader/fragmentShader.glsl";
const wireframeVertexShader = `
  varying vec3 vUv;
  void main() {
    vUv = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`;

const wireframeFragmentShader = `
  uniform vec3 colorA;
  uniform vec3 colorB;
  varying vec3 vUv;
  void main() {
    gl_FragColor = vec4(mix(colorA, colorB, vUv.y * 0.5 + 0.5), 1.0);
  }`;

export default function Sun() {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const line_mesh = useRef();
  const wire_frame = useMemo(() => {
    return new WireframeGeometry(mesh.current?.geometry);
  }, [mesh.current]);
  const uniforms = {
    u_time: {
      value: 0.0,
    },
    u_colorA: { value: new Color("#FFE486") },
    u_colorB: { value: new Color("#FEB3D9") },
  };
  const wireframeMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: uniforms,
      linewidth: .2, // Set the desired thickness here
    });
  }, []);

  useFrame((state, delta) => {
    const { clock } = state;
    line_mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <>
      <mesh
        ref={mesh}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.5}
      >
        <icosahedronGeometry args={[1, 8]} />
        <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={true}
      />
      </mesh>
      <primitive ref={line_mesh} object={new LineSegments(wire_frame, wireframeMaterial)} />
    </>
  );
}
