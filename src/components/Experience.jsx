"use client";
import Avatar from "@/3d-models/Avatar";
import CanvasLoader from "@/3d-models/CanvasLoader";
import { workExperiences } from "@/constants";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

const Experience = () => {
  const [animationName, setAnimationName] = useState("salute");

  return (
    <section className="c-space my-20">
      <div className="w-full to-white-600">
        <h3 className="head-text text-3xl font-semibold">My Work Experience</h3>

        <div className="work-container">
          {/* model grid */}
          <div className="work-canvas">
            <Canvas>
              <ambientLight intensity={7} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <directionalLight position={[10, 10, 10]} intensity={1.5} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
              <Suspense fallback={<CanvasLoader />}>
                <Avatar
                  position-y={-3}
                  scale={3}
                  animationName={animationName}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* experience grid */}
          <div className="work-content">
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
                        <img src={icon} alt={name} className="w-full h-full" />
                      </div>
                      <div className="work-content_bar"></div>
                    </div>
                    <div className="px-2 py-5 sm:p-5">
                      <p className="text-lg font-semibold text-white-800">
                        {name}
                      </p>
                      <p className="text-md text-white-500">
                        {position} -: {duration}
                      </p>
                      {title.map((line, index) => (
                        <p
                          key={index}
                          className="group-hover:text-white transition-all ease-in-out duration-500 text-lg font-normal text-white-600"
                        >
                          {line}
                        </p>
                      ))}
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
