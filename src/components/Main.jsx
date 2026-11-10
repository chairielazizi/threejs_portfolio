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
import CanvasLoader from "@/3d-models/CanvasLoader";
import ComputerSciFi from "@/3d-models/ComputerSciFi";
import ComputerCard from "@/3d-models/ComputerCard";
import { CircuitBoard, ArduinoUno } from "@/3d-models/InverseHardware";
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

  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Camera presets tuned to focus precisely on each target
  const cameraPresets = useMemo(
    () => [
      {
        id: "desk",
        label: "Desk Setup",
        pos: isMobile ? [0, 0, 14] : [0, 0, 11.5],
      },
      {
        id: "screens",
        label: "Computer & Rig",
        // Zooms directly into the sci-fi holographic console & screens
        pos: isMobile ? [0, 0.1, 6.4] : [0, 0.2, 5.8],
      },
      {
        id: "drone",
        label: "Drone Cam",
        // Focused view on the hovering cyber drone below header text
        pos: isMobile ? [-2.0, 1.9, 4.8] : [-5.6, 2.2, 4.5],
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
              <PerspectiveCamera
                makeDefault
                position={isMobile ? [0, 0, 14] : [0, 0, 11.5]}
              />

              <MainCamera cameraPos={activePreset.pos}>
                <ComputerSciFi
                  position={[0, isMobile ? -0.85 : -0.85, 0]}
                  rotation={[0.16, 0, 0]}
                  scale={isMobile ? 0.24 : 0.42}
                />
              </MainCamera>

              {/* Cyber Drone floating on the upper-left */}
              <group>
                <Drone
                  position={isMobile ? [-2.0, 0.7, 0.5] : [-5.6, 0.95, 0.5]}
                  rotation={[0, Math.PI * 0.85, 0]}
                  scale={isMobile ? 0.22 : 0.34}
                />
              </group>

              {/* Circuit Board below the Drone (inverse mouse tracking) */}
              <CircuitBoard
                position={isMobile ? [-2.0, -1.6, 0.6] : [-5.6, -1.5, 0.6]}
                rotation={[0, 0.28, 0]}
                scale={isMobile ? 2.1 : 3.6}
              />

              {/* Floating Sci-Fi Computer Card matched to Drone size on the upper-right */}
              <group>
                <ComputerCard
                  position={isMobile ? [2.0, 0.85, 0.5] : [5.6, 1.15, 0.5]}
                  rotation={[0.08, -0.35, 0.04]}
                  scale={isMobile ? 0.034 : 0.052}
                />
              </group>

              {/* Arduino Uno below the Computer Card (inverse mouse tracking) */}
              <ArduinoUno
                position={isMobile ? [2.0, -1.6, 0.6] : [5.6, -1.5, 0.6]}
                rotation={[0, -0.28, 0.18]}
                scale={isMobile ? 12 : 20}
              />

              {/* Lighting tuned for Console, Drone, Card, Circuit Board & Arduino */}
              <ambientLight intensity={1.6} />
              <directionalLight position={[6, 10, 10]} intensity={1.4} />
              <directionalLight position={[-8, 4, 6]} intensity={0.85} color="#06b6d4" />
              <pointLight
                position={[0, -1.8, 4.5]}
                color="#38bdf8"
                intensity={1.8}
                distance={14}
              />
              <pointLight
                position={[0, 1.2, 4]}
                color="#10b981"
                intensity={2.4}
                distance={18}
              />
              <pointLight
                position={[-5.6, -1.2, 3.2]}
                color="#34d399"
                intensity={2.8}
                distance={12}
              />
              <pointLight
                position={[5.6, -1.2, 3.2]}
                color="#22d3ee"
                intensity={2.8}
                distance={12}
              />
              <pointLight
                position={[5.6, 1.2, 3.5]}
                color="#c084fc"
                intensity={2.8}
                distance={12}
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
