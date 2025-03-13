"use client";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import HackerRoom from "../3d-models/HackerRoom";
import { Suspense } from "react";
import CanvasLoader from "@/3d-models/CanvasLoader";
import { Leva, useControls } from "leva";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { fadeIn } from "@/constants/variants";
import { TypeAnimation } from "react-type-animation";
import { calculateSizes } from "@/constants";
import Target from "../3d-models/Target";
import Drone from "@/3d-models/Drone";
import ReactLogo from "@/3d-models/ReactLogo";
import HelloCube from "@/3d-models/HelloCube";
import PinkCube from "@/3d-models/PinkCube";
import GreenRing from "@/3d-models/GreenRing";
import MainCamera from "@/3d-models/MainCamera";
import Link from "next/link";
import Button from "./Button";

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

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section className="w-full min-h-screen flex flex-col relative">
      <div className="mx-auto flex flex-col relative w-full sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-5xl text-5xl font-semibold text-white text-center ">
          <span className="waving-hand">🤙</span>
          Ahoy there! I&apos;m{" "}
          <span className="text-accent1">Chairiel Azizi</span>
          <span className="waving-hand">🤘</span>
        </p>
        {/* <p className="text-gray_gradient hero_tag">
          Building anything that interest me
        </p> */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="mb-3 sm:mb-4 xl:text-4xl md:text-4xl sm:text-4xl text-3xl 
          font-semibold uppercase leading-[1] text-center"
        >
          <span className="text-white mr-4">I am a</span>
          <TypeAnimation
            sequence={[
              "Developer",
              2000,
              "Programmer",
              2000,
              "Automation Tester",
              2000,
              "Tinkerer",
              2000,
              "Software Developer",
              2000,
            ]}
            speed={150}
            className="text-accent1 "
            wrapper="span"
            repeat={Infinity}
          />
        </motion.div>
      </div>

      <div className="h-full w-full absolute inset-0">
        <Leva />
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />

            <MainCamera>
              <HackerRoom
                // scale={isMobile ? -0.08 : -0.1}
                position={[-1.3, -5.7, -10]}
                // rotation={[-2.7, 2.7, 0.0]}
                rotation={[-3.0, 3.2, 6.3]}
                scale={sizes.deskScale}
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
            </MainCamera>

            <group>
              <Drone
                position={sizes.dronePosition}
                rotation={[0, Math.PI, 0]}
              />
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <HelloCube position={sizes.cubePosition} />
              <PinkCube position={sizes.pinkCubePosition} />
              <GreenRing position={sizes.greenRingPosition} />
            </group>

            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full z-10 c-space">
        <Link href="#contact" className="w-fit">
          <Button
            name="Get in touch"
            isBeam
            containerClass="w-full sm:w-fit sm:min-w-96"
          />
        </Link>
      </div>
    </section>
  );
};

export default Main;
