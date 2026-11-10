import React, { useMemo, useRef } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

/**
 * Shared floating 3D hardware component whose tilt follows the
 * INVERSE direction of the cursor while bobbing in world space.
 */
const InverseFloatModel = ({
  modelPath,
  centerOffset,
  basePitch = 1.15,
  scale = 1,
  ...props
}) => {
  const { scene } = useGLTF(modelPath);
  const clone = useMemo(() => scene.clone(true), [scene]);
  const modelRef = useRef();

  useFrame((state, delta) => {
    if (!modelRef.current) return;
    easing.dampE(
      modelRef.current.rotation,
      [
        basePitch - state.pointer.y * 0.35,
        -state.pointer.x * 0.9,
        0,
      ],
      0.35,
      delta
    );
  });

  return (
    <group {...props} dispose={null}>
      <Float
        speed={2.6}
        rotationIntensity={0.35}
        floatIntensity={1.4}
        floatingRange={[-0.22, 0.22]}
      >
        <group scale={scale}>
          <group ref={modelRef} rotation={[basePitch, 0, 0]}>
            <primitive object={clone} position={centerOffset} />
          </group>
        </group>
      </Float>
    </group>
  );
};

export const CircuitBoard = (props) => (
  <InverseFloatModel
    modelPath="/models/circuit_board.glb"
    centerOffset={[0.005, -0.033, 0]}
    {...props}
  />
);

export const ArduinoUno = (props) => (
  <InverseFloatModel
    modelPath="/models/arduino_uno.glb"
    centerOffset={[0, -0.005, 0.004]}
    {...props}
  />
);

useGLTF.preload("/models/circuit_board.glb");
useGLTF.preload("/models/arduino_uno.glb");

