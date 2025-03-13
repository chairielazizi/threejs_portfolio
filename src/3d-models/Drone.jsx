import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { easing } from "maath";
import { useRef } from "react";

const Drone = (props) => {
  const head = useRef();
  const stripe = useRef();
  const light = useRef();
  const body = useRef();
  const { nodes, materials } = useGLTF(
    "/models/s2wt_kamdo_industrial_divinities-transformed.glb"
  );
  useGSAP(() => {
    gsap.to(body.current.position, {
      y: body.current.position.y + 0.5,
      duration: 2.1,
      repeat: -1,
      yoyo: true,
    });
  });
  useFrame((state, delta) => {
    const t = (1 + Math.sin(state.clock.elapsedTime * 8)) / 2;
    stripe.current.color.setRGB(2 + t * 20, 2, 20 + t * 50);
    easing.dampE(
      head.current.rotation,
      [0, state.pointer.x * (state.camera.position.z > 1 ? 1 : -1), 0],
      0.4,
      delta
    );
    light.current.intensity = 1 + t * 4;
  });

  return (
    <group ref={body} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.body001.geometry}
        material={materials.Body}
      />
      <group ref={head}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.head001.geometry}
          material={materials.Head}
        />
        <mesh castShadow receiveShadow geometry={nodes.stripe001.geometry}>
          <meshBasicMaterial ref={stripe} toneMapped={false} />
          <pointLight
            ref={light}
            intensity={1}
            color={[10, 2, 5]}
            distance={2.5}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Drone;
