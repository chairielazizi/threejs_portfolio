import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

const MainCamera = ({
  children,
  cameraPos = [0, 0, 11.5],
  divePos = [0, -0.2, 6.2],
  scrollProgressRef,
  isMobile = false,
  telemetryRef,
}) => {
  const groupRef = useRef();
  const frameCounter = useRef(0);

  useFrame((state, delta) => {
    const progress = scrollProgressRef ? scrollProgressRef.current : 0;
    const dive = smoothstep(0.0, 0.65, progress);
    const exitLift = smoothstep(0.78, 1.0, progress);

    // Blend between active user preset (at top) and cinematic scroll-dive target
    const targetX = cameraPos[0] * (1 - dive) + divePos[0] * dive;
    const targetY =
      cameraPos[1] * (1 - dive) + divePos[1] * dive + exitLift * 1.1;
    const targetZ =
      cameraPos[2] * (1 - dive) + divePos[2] * dive + exitLift * 0.8;

    easing.damp3(
      state.camera.position,
      [targetX, targetY, targetZ],
      0.24,
      delta
    );

    if (groupRef.current) {
      // On desktop arrival, offset console slightly right to balance left editorial headline;
      // center it smoothly as the user dives in on scroll
      const restX = isMobile ? 0 : 1.05;
      const restRotY = isMobile ? 0 : -0.14;

      const groupX = restX * (1 - dive);
      const groupY = exitLift * 0.55;

      easing.damp3(groupRef.current.position, [groupX, groupY, 0], 0.24, delta);

      const pointerInfluence = 1 - dive * 0.45;
      easing.dampE(
        groupRef.current.rotation,
        [
          (-state.pointer.y / 3.4) * pointerInfluence,
          restRotY * (1 - dive) + (state.pointer.x / 2.2) * pointerInfluence,
          0,
        ],
        0.25,
        delta
      );
    }

    // Update live HUD camera coordinates directly without triggering React re-renders
    if (telemetryRef?.current) {
      frameCounter.current += 1;
      if (frameCounter.current % 3 === 0) {
        const { x, y, z } = state.camera.position;
        telemetryRef.current.textContent = `CAM [${x.toFixed(1)}, ${y.toFixed(1)}, ${z.toFixed(1)}]`;
      }
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

export default MainCamera;
