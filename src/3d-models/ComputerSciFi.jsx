import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

/**
 * Centered & forward-facing Sci-Fi Computer Console model.
 * Natural rotated dimensions around origin: ~18.41W x 5.26H x 7.59D.
 */
const ComputerSciFi = (props) => {
  const { scene } = useGLTF("/models/computer_sci-fi.glb");
  const clone = useMemo(() => scene.clone(true), [scene]);

  return (
    <group {...props} dispose={null}>
      <group rotation={[0, -Math.PI / 6, 0]}>
        <primitive object={clone} position={[-403.572, 1.359, 10.27]} />
      </group>
    </group>
  );
};

useGLTF.preload("/models/computer_sci-fi.glb");

export default ComputerSciFi;

