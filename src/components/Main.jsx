"use client";
import React, { useState, useEffect, Suspense, useMemo } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-scroll";
import { HiArrowDown, HiArrowRight } from "react-icons/hi2";
import {
  Docker,
  Kubernetes,
  AWS,
  Linux,
  GitLab,
  Java,
  Spring,
  GitHubDark,
  GitHubLight,
  NextJsWordmark,
  TypeScript,
  Python,
} from "developer-icons";
import { SiGithubactions, SiTerraform } from "react-icons/si";
import { spaceGrotesk } from "@/app/fonts";
import { calculateSizes } from "@/constants";
import CanvasLoader from "@/3d-models/CanvasLoader";
import HackerRoom from "@/3d-models/HackerRoom";
import Drone from "@/3d-models/Drone";
import MainCamera from "@/3d-models/MainCamera";

const TECH_STACK = [
  { name: "Docker", icon: Docker },
  { name: "Kubernetes", icon: Kubernetes },
  { name: "AWS", icon: AWS },
  { name: "Terraform", icon: SiTerraform, color: "#844FBA" },
  { name: "Java 17", icon: Java },
  { name: "Spring Boot", icon: Spring },
  { name: "Linux", icon: Linux },
  { name: "GitLab CI/CD", icon: GitLab },
  { name: "Github Actions", icon: GitHubLight },
  { name: "Python", icon: Python },
  { name: "TypeScript", icon: TypeScript },
];

const Main = () => {
  const [activeCamera, setActiveCamera] = useState("desk");

  const isSmall = useMediaQuery({ maxWidth: 480 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  // Camera presets tuned to focus precisely on each target
  const cameraPresets = useMemo(
    () => [
      { id: "desk", label: "Desk Setup", pos: [0, 0, 30] },
      {
        id: "screens",
        label: "Computer & Rig",
        // Calibrated to zoom directly into the computer screens and keyboard on the desk
        pos: isMobile ? [0, 2.5, 14] : [0, 0.5, 12],
      },
      {
        id: "drone",
        label: "Drone Cam",
        // Dynamic overhead view focused on the hovering cyber drone
        pos: isMobile ? [-5.5, 1.5, 16] : [-8.5, 4.0, 18],
      },
    ],
    [isMobile]
  );

  // Keyboard shortcut listener: Press 1, 2, or 3 to switch camera views
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "1") setActiveCamera("desk");
      if (e.key === "2") setActiveCamera("screens");
      if (e.key === "3") setActiveCamera("drone");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activePreset =
    cameraPresets.find((p) => p.id === activeCamera) || cameraPresets[0];

  return (
    <section
      id="home"
      className="w-full min-h-screen flex flex-col justify-between relative overflow-hidden pt-24 sm:pt-32 pb-8"
    >
      {/* Top Header Zone: Name, Typing Animation & High-signal Subtitle */}
      <div className="c-space relative z-10 w-full flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Status indicator badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-400 mb-3 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.12)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-wider uppercase">
            SYS_ONLINE // KUALA LUMPUR (UTC+8)
          </span>
        </motion.div>

        {/* Main Name Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ lineHeight: 1.15 }}
          className={`font-bold tracking-tight text-white mb-2 ${spaceGrotesk.className}`}
        >
          <span className="block text-3xl sm:text-5xl lg:text-6xl text-[var(--tx-primary)]">
            Hey There! I&apos;m <span className="gradient-text">Chairiel Azizi</span>
          </span>
        </motion.h1>

        {/* Rotating 5-Role TypeAnimation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-center mb-3"
        >
          <span className="text-[var(--tx-dim)] font-medium text-lg sm:text-2xl">
            I am a
          </span>
          <TypeAnimation
            sequence={[
              "Aspiring DevOps Engineer",
              2000,
              "Software Engineer",
              2000,
              "Aspiring Cloud Engineer",
              2000,
              "Full Stack Developer",
              2000,
              "Java & Spring Boot Dev",
              2000,
            ]}
            speed={150}
            style={{
              color: "var(--teal-bright)",
              fontWeight: 600,
              fontSize: "clamp(1.15rem, 2.5vw, 1.75rem)",
            }}
            wrapper="span"
            repeat={Infinity}
          />
        </motion.div>

        {/* High-signal Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[var(--tx-secondary)] text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal"
        >
          Packaged App Developer building GxP-Regulated enterprise platforms
          · Self-hosted homelab architect with 40+
          Docker services.
        </motion.p>
      </div>

      {/* 3D Scene Background with Calibrated Desk Placement */}
      <div className="absolute inset-0 w-full h-full -z-0">
        <ErrorBoundary
          fallback={
            <div className="text-white w-full h-full flex justify-center items-center">
              Failed to load 3D scene.
            </div>
          }
        >
          <Canvas
            className="w-full h-full"
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            gl={{ powerPreference: "high-performance", antialias: false }}
          >
            <Suspense fallback={<CanvasLoader />}>
              <PerspectiveCamera makeDefault position={[0, 0, 30]} />

              <MainCamera cameraPos={activePreset.pos}>
                <HackerRoom
                  position={[-1.3, isMobile ? -8.0 : -10.5, -10]}
                  rotation={[-3.0, 3.2, 6.3]}
                  scale={sizes.deskScale}
                />
              </MainCamera>

              {/* Drone positioned in upper space */}
              <group>
                <Drone
                  position={sizes.dronePosition}
                  rotation={[0, Math.PI, 0]}
                />
              </group>

              {/* Lighting tuned for Cyberpunk glow */}
              <ambientLight intensity={1.2} />
              <directionalLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight
                position={[-1.3, -6, -6]}
                color="#10b981"
                intensity={3.2}
                distance={22}
              />
              <pointLight
                position={[6, 3, -4]}
                color="#06b6d4"
                intensity={2.2}
                distance={20}
              />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Bottom Command Dock: Action Buttons, Camera Presets & Tech Stack with Logos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="c-space relative z-10 w-full flex flex-col items-center gap-3.5 mt-auto"
      >
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="work"
            smooth={true}
            spy={true}
            className="cursor-pointer group flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_22px_rgba(16,185,129,0.45)] active:scale-95"
          >
            <span>View Work Experience</span>
            <HiArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
          </Link>

          <Link
            to="projects"
            smooth={true}
            spy={true}
            className="cursor-pointer group flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs uppercase tracking-wider border border-white/15 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 active:scale-95"
          >
            <span>Projects & Homelab</span>
            <HiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-emerald-400" />
          </Link>
        </div>

        {/* Interactive Camera Preset Dock */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-black/75 border border-white/15 backdrop-blur-md shadow-2xl">
          {cameraPresets.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => setActiveCamera(preset.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${activeCamera === preset.id
                ? "bg-emerald-500 text-black font-semibold shadow-[0_0_16px_rgba(16,185,129,0.5)]"
                : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
            >
              <span className="opacity-60 mr-1.5">0{idx + 1}</span>
              {preset.label}
            </button>
          ))}
          <span className="hidden sm:inline text-[10px] font-mono text-white/35 px-2.5 border-l border-white/15">
            [1-3]
          </span>
        </div>

        {/* Tech Stack Pills with Logos (Option 1 feature integrated) */}
        <div className="flex items-center justify-center gap-2 flex-wrap max-w-2xl px-2 pt-0.5">
          {TECH_STACK.map((tech) => {
            const Icon = tech.icon;
            return (
              <span
                key={tech.name}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-white/80 bg-black/60 border border-white/10 backdrop-blur-md transition-all duration-300 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-black/80 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              >
                <Icon
                  className="w-3.5 h-3.5 shrink-0"
                  style={tech.color ? { color: tech.color } : {}}
                />
                <span>{tech.name}</span>
              </span>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Main;
