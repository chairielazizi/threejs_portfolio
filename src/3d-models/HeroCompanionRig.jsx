"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import Drone from "@/3d-models/Drone";
import ComputerCard from "@/3d-models/ComputerCard";
import { CircuitBoard, ArduinoUno } from "@/3d-models/InverseHardware";

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

const ParallaxHardware = ({
  children,
  scrollProgressRef,
  flyOffset = [0, 0, 0],
}) => {
  const ref = useRef();

  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = scrollProgressRef ? scrollProgressRef.current : 0;
    const fly = smoothstep(0.05, 0.72, p);
    easing.damp3(
      ref.current.position,
      [flyOffset[0] * fly, flyOffset[1] * fly, flyOffset[2] * fly],
      0.24,
      delta
    );
  });

  return <group ref={ref}>{children}</group>;
};

/**
 * Dynamically lazy-loaded companion hardware rig (Drone, Card, CPU, Arduino).
 * Not fetched or rendered in Lite 3D mode on low-end mobile GPUs unless opted in.
 */
const HeroCompanionRig = ({ isMobile, scrollProgressRef }) => {
  return (
    <>
      {/* Cyber Drone — positioned cleanly clear of left editorial headline */}
      <ParallaxHardware
        scrollProgressRef={scrollProgressRef}
        flyOffset={isMobile ? [-2.6, 1.4, 4.2] : [-4.2, 0.8, 4.8]}
      >
        <Drone
          position={isMobile ? [-2.2, 0.85, 0.5] : [-5.15, -0.45, 0.8]}
          rotation={[0, Math.PI * 0.85, 0]}
          scale={isMobile ? 0.14 : 0.32}
        />
      </ParallaxHardware>

      {/* Circuit Board / CPU below the Drone */}
      <ParallaxHardware
        scrollProgressRef={scrollProgressRef}
        flyOffset={isMobile ? [-2.6, -1.8, 4.2] : [-4.0, -2.1, 4.6]}
      >
        <CircuitBoard
          position={isMobile ? [-2.15, -1.6, 0.6] : [-4.85, -2.25, 0.7]}
          rotation={[0, 0.28, 0]}
          scale={isMobile ? 1.7 : 3.4}
        />
      </ParallaxHardware>

      {/* Floating Sci-Fi Computer Card on upper-right */}
      <ParallaxHardware
        scrollProgressRef={scrollProgressRef}
        flyOffset={isMobile ? [2.6, 1.6, 4.2] : [4.2, 1.8, 4.8]}
      >
        <ComputerCard
          position={isMobile ? [2.25, 1.05, 0.5] : [5.85, 1.65, 0.5]}
          rotation={[0.08, -0.35, 0.04]}
          scale={isMobile ? 0.026 : 0.05}
        />
      </ParallaxHardware>

      {/* Arduino Uno below the Computer Card */}
      <ParallaxHardware
        scrollProgressRef={scrollProgressRef}
        flyOffset={isMobile ? [2.6, -1.8, 4.2] : [4.2, -2.0, 4.6]}
      >
        <ArduinoUno
          position={isMobile ? [2.15, -1.6, 0.6] : [6.15, -1.9, 0.6]}
          rotation={[0, -0.28, 0.18]}
          scale={isMobile ? 10 : 19}
        />
      </ParallaxHardware>
    </>
  );
};

export default HeroCompanionRig;
