"use client";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import HackerRoom from "../3d-models/HackerRoom";
import { Suspense } from "react";
import CanvasLoader from "@/3d-models/CanvasLoader";
import { ErrorBoundary } from "react-error-boundary";
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
// import Link from "next/link";
import { Link } from "react-scroll";
import Button from "./Button";
import { rajdhani, spaceGrotesk } from "@/app/fonts";

const Main = () => {
  const isSmall = useMediaQuery({ maxWidth: 480 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section id="home" className="w-full min-h-screen flex flex-col relative">
      <div className="mx-auto flex flex-col relative w-full sm:mt-36 mt-20 c-space gap-3">
        {/* Title */}
        <h1 style={{ lineHeight: 1.1, fontWeight: 700 }} className={`text-center ${spaceGrotesk.className}`}>
          <span style={{ display: "block", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--tx-primary)", letterSpacing: "-0.01em" }}>
            Hey There! I&apos;m <span className="gradient-text">Chairiel Azizi</span>
          </span>
        </h1>

        {/* Subtitle / Role */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="mb-3 sm:mb-4 font-medium leading-[1.2] text-center"
        >
          <span style={{ color: "var(--tx-dim)", fontWeight: 500, fontSize: "clamp(1.2rem, 3vw, 2.1rem)", marginRight: "0.5rem" }}>
            I am a
          </span>
          <TypeAnimation
            sequence={[
              "Packaged App Developer",
              2000,
              "Full Stack Developer",
              2000,
              "Java & Spring Boot Dev",
              2000,
              "React & Angular Dev",
              2000,
              "Software Test Engineer",
              2000,
            ]}
            speed={150}
            style={{ color: "var(--teal-bright)", fontWeight: 600, fontSize: "clamp(1.2rem, 3vw, 2.1rem)" }}
            wrapper="span"
            repeat={Infinity}
          />
        </motion.div>
      </div>

      <div className="h-full w-full absolute inset-0">
        <Leva />
        <ErrorBoundary fallback={<div className="text-white w-full h-full flex justify-center items-center">Failed to load 3D scene.</div>}>
          <Canvas
            className="w-full h-full"
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            gl={{ powerPreference: "high-performance", antialias: false }}
          >
            <Suspense fallback={<CanvasLoader />}>
              <PerspectiveCamera makeDefault position={[0, 0, 30]} />

              <MainCamera>
                <HackerRoom
                  // scale={isMobile ? -0.08 : -0.1}
                  position={[-1.3, -8.0, -10]}
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
        </ErrorBoundary>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full z-10 c-space">
        <Link
          href="#contact"
          className="w-fit"
          activeClass="active"
          smooth={true}
          spy={true}
          to="contact"
        >
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
