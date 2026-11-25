import React, { useMemo, useRef } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

/**
 * Shared floating 3D hardware component with configurable mouse-tracking
 * direction so flanking models react with distinct, contrasting motion.
 */
const InteractiveFloatModel = ({
  modelPath,
  centerOffset,
  basePitch = 1.15,
  scale = 1,
  yawFactor = -0.95,
  pitchFactor = -0.38,
  rollFactor = 0.22,
  floatSpeed = 2.5,
  rotationIntensity = 0.35,
  floatingRange = [-0.22, 0.22],
  ...props
}) => {
  const { scene } = useGLTF(modelPath);
  const clone = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        const mats = Array.isArray(obj.material)
          ? obj.material
          : [obj.material];
        mats.forEach((mat) => {
          // Strip costly full-scene transmission pass (KHR_materials_transmission)
          if ("transmission" in mat && mat.transmission > 0) {
            mat.transmission = 0;
            if ("thickness" in mat) mat.thickness = 0;
            mat.needsUpdate = true;
          }
        });
      }
    });
    return cloned;
  }, [scene]);
  const modelRef = useRef();

  useFrame((state, delta) => {
    if (!modelRef.current) return;
    easing.dampE(
      modelRef.current.rotation,
      [
        basePitch + state.pointer.y * pitchFactor,
        state.pointer.x * yawFactor,
        state.pointer.x * rollFactor,
      ],
      0.32,
      delta
    );
  });

  return (
    <group {...props} dispose={null}>
      <Float
        speed={floatSpeed}
        rotationIntensity={rotationIntensity}
        floatIntensity={1.4}
        floatingRange={floatingRange}
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

// CPU / Motherboard: inverse yaw & inverse pitch with subtle counter-bank roll
export const CircuitBoard = (props) => (
  <InteractiveFloatModel
    modelPath="/models/circuit_board.glb"
    centerOffset={[0.005, -0.033, 0]}
    yawFactor={-0.95}
    pitchFactor={-0.38}
    rollFactor={0.22}
    floatSpeed={2.4}
    {...props}
  />
);

// Arduino Uno: contrasting positive yaw, positive pitch & opposite roll with brisker float
export const ArduinoUno = (props) => (
  <InteractiveFloatModel
    modelPath="/models/arduino_uno.glb"
    centerOffset={[0, -0.005, 0.004]}
    yawFactor={0.95}
    pitchFactor={0.45}
    rollFactor={-0.36}
    floatSpeed={3.1}
    rotationIntensity={0.45}
    floatingRange={[-0.25, 0.25]}
    {...props}
  />
);

useGLTF.preload("/models/circuit_board.glb");
useGLTF.preload("/models/arduino_uno.glb");
