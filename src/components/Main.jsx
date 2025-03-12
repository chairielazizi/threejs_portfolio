"use client";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import HackerRoom from "../3d-models/HackerRoom";
import { Suspense } from "react";
import CanvasLoader from "@/3d-models/CanvasLoader";
import { Leva, useControls } from "leva";
import { useMediaQuery } from "react-responsive";

const Main = () => {
  // const controls = useControls("HackerRoom", {
  //   positionX: {
  //     value: 2.5,
  //     min: -10,
  //     max: 10,
  //   },
  //   positionY: {
  //     value: 2.5,
  //     min: -10,
  //     max: 10,
  //   },
  //   positionZ: {
  //     value: 2.5,
  //     min: -10,
  //     max: 10,
  //   },
  //   rotationX: {
  //     value: 2.5,
  //     min: -10,
  //     max: 10,
  //   },
  //   rotationY: {
  //     value: 2.5,
  //     min: -10,
  //     max: 10,
  //   },
  //   rotationZ: {
  //     value: 2.5,
  //     min: -10,
  //     max: 10,
  //   },
  //   scale: {
  //     value: 2.5,
  //     min: -10,
  //     max: 10,
  //   },
  // });
  const isSmall = useMediaQuery({ maxWidth: 480 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  return (
    <section className="w-full min-h-screen flex flex-col relative">
      <div className="mx-auto flex flex-col relative w-full sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-2xl font-semibold text-white text-center font-generalsans">
          Ahoy there! I&apos;m Chairiel <span className="waving-hand">🤘</span>
        </p>
        <p className="text-gray_gradient hero_tag">
          Building anything that interest me
        </p>
      </div>

      <div className="h-full w-full absolute inset-0">
        <Leva />
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}></Suspense>
          <PerspectiveCamera makeDefault position={[0, 0, 30]} />
          <HackerRoom
            scale={isMobile ? -0.08 : -0.1}
            position={[-1.3, -5.7, -10]}
            rotation={[-2.7, 2.7, 0.0]}
            // scale={[controls.scale, controls.scale, controls.scale]}
            // position={[
            //   controls.positionX,
            //   controls.positionY,
            //   controls.positionZ,
            // ]}
            // rotation={[
            //   controls.rotationX,
            //   controls.rotationY,
            //   controls.rotationZ,
            // ]}
          />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={0.5} />
        </Canvas>
      </div>
    </section>
  );
};

export default Main;
