import React, { useMemo, useRef } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

/**
 * Centered & floating Sci-Fi Computer Card model.
 * Natural rotated dimensions around origin: ~33.0W x 21.7H x 2.2D.
 * Use scale ~0.045 to match the Drone's world footprint (~1.4 units).
 */
const ComputerCard = ({ scale = 1, ...props }) => {
  const { scene } = useGLTF("/models/computer_card_sci-fi.glb");
  const clone = useMemo(() => scene.clone(true), [scene]);
  const cardRef = useRef();

  useFrame((state, delta) => {
    if (!cardRef.current) return;
    easing.dampE(
      cardRef.current.rotation,
      [
        state.pointer.y * 0.18,
        Math.PI / 2 + state.pointer.x * 1.35,
        0,
      ],
      0.35,
      delta
    );
  });

  return (
    <group {...props} dispose={null}>
      <Float
        speed={3}
        rotationIntensity={0.35}
        floatIntensity={1.5}
        floatingRange={[-0.25, 0.25]}
      >
        <group scale={scale}>
          <group ref={cardRef} rotation={[0, Math.PI / 2, 0]}>
            <primitive object={clone} position={[-1.82, 3.283, -8.349]} />
          </group>
        </group>
      </Float>
    </group>
  );
};

useGLTF.preload("/models/computer_card_sci-fi.glb");

export default ComputerCard;

