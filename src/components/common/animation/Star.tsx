"use client";

import { PointMaterial, Points, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random/dist/maath-random.esm";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const Stars = (props: any) => {
  const ref = useRef<THREE.Points | null>(null);

  // Generate random positions with validation
  const sphere = new Float32Array(5000 * 3); // Allocate memory for 3 floats per point
  for (let i = 0; i < sphere.length; i += 3) {
    const randomPoint = random.inSphere(new Float32Array(3), { radius: 1.2 });
    sphere[i] = randomPoint[0];
    sphere[i + 1] = randomPoint[1];
    sphere[i + 2] = randomPoint[2];

    // Check for NaN values and handle them (e.g., retry generation)
    if (isNaN(sphere[i]) || isNaN(sphere[i + 1]) || isNaN(sphere[i + 2])) {
      console.warn("Generated NaN position, retrying...");
      // Implement logic to re-generate the point if it's NaN
      i -= 3; // Move back 3 positions to retry
    }
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta / 10;
      ref.current.rotation.y += delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="inset-0 -z-10 h-screen w-screen">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
