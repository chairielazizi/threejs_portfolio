"use client";
import { myProjects } from "@/constants";
import Link from "next/link";
import { Suspense, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import CanvasLoader from "@/3d-models/CanvasLoader";
import Computer from "@/3d-models/Computer";
import { GitHubLight } from "developer-icons";
import Image from "next/image";
import { ErrorBoundary } from "react-error-boundary";

const Projects = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const currentProject = myProjects[currentProjectIndex];

  if (!myProjects || myProjects.length === 0) return null;

  const handleNavigation = (direction) => {
    setCurrentProjectIndex((previousIndex) => {
      if (direction === "previous") {
        return previousIndex === 0 ? myProjects.length - 1 : previousIndex - 1;
      } else {
        return previousIndex === myProjects.length - 1 ? 0 : previousIndex + 1;
      }
    });
  };

  return (
    <section id="projects" className="c-space my-20">
      <p className="head-text text-3xl font-semibold">My Works</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full mt-10">
        <div className="flex flex-col relative gap-5 py-10 px-5 sm:p-10 shadow-2xl shadow-black-200 bg-black-200 rounded-lg transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-emerald-500 hover:bg-transparent">
          <div className="absolute top-0 right-0 w-full h-80">
            <Image
              src={currentProject.spotlight}
              alt="spotlight"
              fill
              className="rounded-xl object-cover"
            />
          </div>

          {/* logo */}
          <div
            className="p-3 backdrop-filter backdrop-blur-3xl rounded-lg w-fit"
            style={currentProject.logoStyle}
          >
            <Image
              src={currentProject.logo}
              alt="logo"
              width={40}
              height={40}
              className="shadow-sm"
            />
          </div>

          {/* title and description */}
          <div className="flex flex-col gap-3 text-white-500 my-5">
            <p className="text-2xl text-white font-semibold animatedText">
              {currentProject.title}
            </p>
            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          {/* techs stack */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              {currentProject.tags.map((tech, index) => (
                <div key={index} className="tech-logo">
                  <Image src={tech.path} alt={tech.name} width={40} height={40} />
                </div>
              ))}
            </div>
            <div className="flex flex-col hover:text-white">
              <Link
                href={currentProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white-600 cursor-pointer"
              >
                <p>Check live site</p>
                {/* <img src="/assets/arrow-up.png" alt="arrow-up" /> */}
                <MdArrowOutward className="text-3xl text-white cursor-pointer" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col hover:text-white">
            <Link
              href={currentProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <p className="text-white-600 cursor-pointer">Github Link</p>
              <GitHubLight className="h-6 w-5" />
            </Link>
          </div>

          {/* next project button */}
          <div className="flex items-center justify-between mt-7">
            <button
              className="arrow-btn"
              onClick={() => handleNavigation("previous")}
            >
              <FaArrowLeft className="text-2xl text-white cursor-pointer" />
            </button>
            <button
              className="arrow-btn"
              onClick={() => handleNavigation("next")}
            >
              <FaArrowRight className="text-2xl text-white cursor-pointer" />
            </button>
          </div>
        </div>

        {/* threejs computer model */}
        <div className="border border-black-200 bg-black-200 rounded-lg h-96 md:h-full transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-emerald-500 hover:bg-transparent">
          <ErrorBoundary fallback={<div className="text-white flex items-center justify-center h-full">Failed to load 3D scene.</div>}>
            <Canvas>
              <ambientLight intensity={Math.PI} />
              <directionalLight position={[10, 10, 5]} />

              <Center>
                <Suspense fallback={CanvasLoader}>
                  <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                    <Computer texture={currentProject.texture} />
                  </group>
                </Suspense>
              </Center>
              <OrbitControls maxPolarAngle={Math.PI / 2} />
            </Canvas>
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
};

export default Projects;
