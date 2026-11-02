"use client";
import Avatar from "@/3d-models/Avatar";
import CanvasLoader from "@/3d-models/CanvasLoader";
import { workExperiences } from "@/constants";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import { ErrorBoundary } from "react-error-boundary";
import { useMediaQuery } from "react-responsive";

const Experience = () => {
  const [animationName, setAnimationName] = useState("salute");
  const [mounted, setMounted] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const avatarScale = !mounted ? 2.85 : isMobile ? 2.65 : isTablet ? 2.7 : 2.85;
  const avatarPositionY = !mounted ? -2.75 : isMobile ? -2.4 : isTablet ? -2.6 : -2.75;

  return (
    <section id="work" className="c-space my-20">
      <div className="w-full to-white-600">
        <div className="sec-divider mb-8" />
        <p className="sec-tag">/ Experience</p>
        <h3 className="head-text text-3xl font-semibold">My Work Experience</h3>

        <div className="work-container items-start">
          {/* model grid */}
          <div className="work-canvas h-[210px] sm:h-[260px] lg:h-[560px] lg:sticky lg:top-24">
            <ErrorBoundary fallback={<div className="text-white flex items-center justify-center h-full">Failed to load 3D scene.</div>}>
              <Canvas
                dpr={[1, 1.5]}
                gl={{ powerPreference: "high-performance", antialias: false }}
              >
                <ambientLight intensity={7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} />
                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
                <Suspense fallback={<CanvasLoader />}>
                  <Avatar
                    position-y={avatarPositionY}
                    scale={avatarScale}
                    animationName={animationName}
                  />
                </Suspense>
              </Canvas>
            </ErrorBoundary>
          </div>

          {/* experience grid */}
          <div className="work-content hover:shadow-2xl hover:shadow-emerald-500">
            <div className="py-5 px-2.5 sm:py-10 sm:px-5">
              {workExperiences.map(
                ({ id, name, position, duration, title, icon, animation }) => (
                  <div
                    key={id}
                    className="work-content_container group"
                    onClick={() => setAnimationName(animation.toLowerCase())}
                    onPointerOver={() =>
                      setAnimationName(animation.toLowerCase())
                    }
                    onPointerOut={() => setAnimationName("salute")}
                  >
                    <div className="flex flex-col h-full items-center justify-start py-2">
                      <div className="work-content_logo">
                        <Image src={icon} alt={name} width={64} height={64} className="w-full h-full object-contain" />
                      </div>
                      <div className="work-content_bar"></div>
                    </div>
                    <div className="px-2 py-5 sm:p-5">
                      <p className="text-lg font-semibold text-white-800">
                        {name}
                      </p>
                      <p className="text-sm font-medium text-white-500 mb-3">
                        {position} • {duration}
                      </p>
                      <div className="flex flex-col gap-2">
                        {title.map((line, index) => (
                          <p
                            key={index}
                            className="group-hover:text-white transition-all ease-in-out duration-500 text-sm sm:text-base font-normal text-white-600 leading-relaxed"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
