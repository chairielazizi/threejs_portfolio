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
      <div className="sec-divider mb-8" />
      <p className="sec-tag">/ Projects</p>
      <p className="head-text text-3xl font-semibold">My Projects</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full mt-10">
        <div
          className="flex flex-col justify-between relative gap-5 py-10 px-5 sm:p-10 rounded-2xl transition-all duration-500 ease-in-out h-full min-h-[580px]"
          style={{ background: "var(--bg-card)", border: "1px solid var(--bd-soft)" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--bd-glow)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(52,211,153,.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--bd-soft)"; e.currentTarget.style.boxShadow = "none"; }}
        >
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
          {/* title and description */}
          <div className="flex flex-col gap-3 my-2 border-l-2 border-[var(--teal-bright)] pl-4 bg-[var(--teal-main)]/5 py-4 rounded-r-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[var(--teal-bright)] to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[var(--teal-bright)] to-transparent opacity-10"></div>
            <p className="text-2xl text-[var(--tx-primary)] font-bold animatedText tracking-wide" style={{ fontFamily: "var(--font-orbitron), sans-serif" }}>
              {currentProject.title}
            </p>
            <p className="animatedText text-[var(--tx-secondary)] leading-relaxed mt-2">{currentProject.desc}</p>
            <p className="animatedText text-[var(--teal-bright)] font-mono text-sm mt-1">{currentProject.subdesc}</p>
          </div>

          {/* techs stack */}
          {/* techs stack and links */}
          <div className="mt-auto flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2">
                {currentProject.tags.map((tech, index) => (
                  <div key={index} className="tech-logo bg-black/30 border border-white/10 rounded-lg p-1.5 backdrop-blur-md">
                    <Image src={tech.path} alt={tech.name} width={32} height={32} />
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <Link
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--tx-muted)] hover:text-white transition-colors cursor-pointer font-semibold uppercase tracking-widest text-xs"
                >
                  <GitHubLight className="h-5 w-5" />
                  <p>Github</p>
                </Link>
                <Link
                  href={currentProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--teal-bright)] hover:text-white transition-colors cursor-pointer font-semibold uppercase tracking-widest text-xs bg-[var(--teal-main)]/10 px-3 py-1.5 rounded-md border border-[var(--teal-main)]/30 hover:border-[var(--teal-bright)]"
                >
                  <p>Live Site</p>
                  <MdArrowOutward className="text-lg" />
                </Link>
              </div>
            </div>

            {/* next project button */}
            <div className="flex items-center justify-between mt-2 border-t border-[var(--bd-soft)] pt-5">
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--bd-soft)] hover:border-[var(--teal-bright)] hover:bg-[var(--teal-main)]/10 text-[var(--tx-secondary)] hover:text-[var(--teal-bright)] transition-all duration-300 uppercase tracking-[0.2em] text-xs font-bold group"
                onClick={() => handleNavigation("previous")}
                style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
              >
                <FaArrowLeft className="text-sm group-hover:-translate-x-1.5 transition-transform" />
                <span>Prev</span>
              </button>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--bd-soft)] hover:border-[var(--teal-bright)] hover:bg-[var(--teal-main)]/10 text-[var(--tx-secondary)] hover:text-[var(--teal-bright)] transition-all duration-300 uppercase tracking-[0.2em] text-xs font-bold group"
                onClick={() => handleNavigation("next")}
                style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
              >
                <span>Next</span>
                <FaArrowRight className="text-sm group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* threejs computer model */}
        <div
          className="border rounded-2xl h-96 md:h-full transition-all duration-500 ease-in-out"
          style={{ background: "var(--bg-card)", border: "1px solid var(--bd-soft)" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--bd-glow)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(52,211,153,.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--bd-soft)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <ErrorBoundary fallback={<div className="text-white flex items-center justify-center h-full">Failed to load 3D scene.</div>}>
            <Canvas
              dpr={[1, 1.5]}
              gl={{ powerPreference: "high-performance", antialias: false }}
            >
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
