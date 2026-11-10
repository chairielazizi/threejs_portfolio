import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";

const MainCamera = ({ children, cameraPos = [0, 0, 30] }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    easing.damp3(state.camera.position, cameraPos, 0.35, delta);

    easing.dampE(
      groupRef.current.rotation,
      [-state.pointer.y / 3, state.pointer.x / 2, 0],
      0.25,
      delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
};

export default MainCamera;
