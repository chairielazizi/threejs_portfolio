"use client";
import React, {
  useState,
  useEffect,
  Suspense,
  useMemo,
  useRef,
  lazy,
} from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";
import { useMediaQuery } from "react-responsive";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-scroll";
import { HiArrowDown, HiArrowRight } from "react-icons/hi2";
import { spaceGrotesk } from "@/app/fonts";
import CanvasLoader from "@/3d-models/CanvasLoader";
import ComputerSciFi from "@/3d-models/ComputerSciFi";
import MainCamera from "@/3d-models/MainCamera";
import { detectDeviceTier } from "@/utils/deviceTier";

// Dynamically split the 4 flanking hardware models so Lite 3D devices never download them
const HeroCompanionRig = lazy(() => import("@/3d-models/HeroCompanionRig"));

const Main = () => {
  const sectionRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const telemetryRef = useRef(null);
  const scrollPctRef = useRef(null);
  const scrollBarRef = useRef(null);

  const [hasMounted, setHasMounted] = useState(false);
  const [tierChecked, setTierChecked] = useState(false);
  const [detectedLite, setDetectedLite] = useState(false);
  const [rigOverride, setRigOverride] = useState(null); // null | "lite" | "full"
  const [activeCamera, setActiveCamera] = useState("desk");
  const [pressedKey, setPressedKey] = useState(null);
  const [isHeroInView, setIsHeroInView] = useState(true);

  const isMobileQuery = useMediaQuery({ maxWidth: 768 });
  const isMobile = hasMounted && isMobileQuery;
  const isLiteMode = rigOverride ? rigOverride === "lite" : detectedLite;

  useEffect(() => {
    setHasMounted(true);
    const result = detectDeviceTier();
    setDetectedLite(result.isLite);
    setTierChecked(true);
  }, []);

  // Pause WebGL rendering completely (0% GPU) when user scrolls past the Hero section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroInView(entry.isIntersecting),
      { rootMargin: "150px 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll choreography across the pinned ~225vh Hero container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.25,
  });

  // Sync smooth scroll value to Three.js ref & HUD readout without re-rendering React
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    scrollProgressRef.current = latest;
    const pct = Math.round(latest * 100);
    if (scrollPctRef.current) {
      scrollPctRef.current.textContent = `SCROLL ${String(pct).padStart(2, "0")}%`;
    }
    if (scrollBarRef.current) {
      scrollBarRef.current.style.transform = `scaleX(${Math.max(0.04, latest)})`;
    }
  });

  // Act 1 -> Act 2: Top editorial header recedes smoothly as camera dives in
  const headerOpacity = useTransform(smoothProgress, [0.02, 0.34], [1, 0]);
  const headerY = useTransform(smoothProgress, [0, 0.36], [0, -56]);

  // Subtle scroll cue visible only near top
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.16], [1, 0]);

  // Act 2: Architectural Enterprise & Homelab spec cards reveal during console close-up
  const midHudOpacity = useTransform(
    smoothProgress,
    [0.28, 0.46, 0.74, 0.9],
    [0, 1, 1, 0]
  );
  const midHudLeftX = useTransform(smoothProgress, [0.28, 0.48], [-28, 0]);
  const midHudRightX = useTransform(smoothProgress, [0.28, 0.48], [28, 0]);

  // Act 3: Bottom command dock fades cleanly before handing off to #about
  const bottomBarOpacity = useTransform(smoothProgress, [0.8, 0.96], [1, 0]);
  const bottomBarY = useTransform(smoothProgress, [0.8, 0.96], [0, 18]);

  // Camera presets adapt cleanly to Lite 3D (Console-only) vs Full 5-model Rig
  const cameraPresets = useMemo(() => {
    const core = [
      {
        id: "desk",
        keyNum: "1",
        label: "Desk",
        pos: isMobile ? [0, 0, 14] : [0, 0, 11.5],
      },
      {
        id: "screens",
        keyNum: "2",
        label: "Console",
        pos: isMobile ? [0, 0.05, 6.8] : [1.05, -0.35, 5.9],
      },
    ];
    if (isLiteMode) return core;
    return [
      ...core,
      {
        id: "drone",
        keyNum: "3",
        label: "Drone",
        pos: isMobile ? [-2.2, 0.85, 5.0] : [-5.15, -0.25, 4.3],
      },
      {
        id: "cpu",
        keyNum: "4",
        label: "CPU",
        pos: isMobile ? [-2.15, -1.6, 3.8] : [-4.85, -2.25, 3.85],
      },
      {
        id: "arduino",
        keyNum: "5",
        label: "Arduino",
        pos: isMobile ? [2.15, -1.6, 3.8] : [6.15, -1.9, 3.85],
      },
    ];
  }, [isMobile, isLiteMode]);

  const divePos = useMemo(
    () => (isMobile ? [0, -0.05, 8.2] : [0, -0.3, 6.1]),
    [isMobile]
  );

  // Tactile keycap press trigger (designspells.com craft)
  const triggerCameraSelect = (id, keyNum) => {
    setActiveCamera(id);
    setPressedKey(keyNum);
    if (scrollProgressRef.current > 0.15) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setTimeout(() => {
      setPressedKey((prev) => (prev === keyNum ? null : prev));
    }, 150);
  };

  // Keyboard shortcuts [1]-[5] (restricted to [1]-[2] in Lite mode)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      )
        return;
      if (e.key === "1") triggerCameraSelect("desk", "1");
      if (e.key === "2") triggerCameraSelect("screens", "2");
      if (!isLiteMode) {
        if (e.key === "3") triggerCameraSelect("drone", "3");
        if (e.key === "4") triggerCameraSelect("cpu", "4");
        if (e.key === "5") triggerCameraSelect("arduino", "5");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLiteMode]);

  const toggleRigMode = () => {
    const next = isLiteMode ? "full" : "lite";
    setRigOverride(next);
    if (next === "lite" && activeCamera !== "desk" && activeCamera !== "screens") {
      setActiveCamera("desk");
    }
  };

  const activePreset =
    cameraPresets.find((p) => p.id === activeCamera) || cameraPresets[0];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-[215vh] sm:h-[230vh]"
    >
      {/* Sticky Full-Viewport Interactive Stage */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col justify-between pt-20 sm:pt-28 pb-5 sm:pb-7">
        {/* Subtle Architectural Blueprint Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(52, 211, 153, 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(52, 211, 153, 0.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 45%, black 35%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 45%, black 35%, transparent 100%)",
          }}
        />

        {/* Delicate Hairline Frame Corner Accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 sm:inset-x-10 top-20 sm:top-24 bottom-5 sm:bottom-7 border-x border-emerald-400/[0.06] hidden sm:block"
        />

        {/* ================= 3D SCENE LAYER ================= */}
        <div className="absolute inset-0 w-full h-full z-0">
          <ErrorBoundary
            fallback={
              <div className="text-white w-full h-full flex justify-center items-center font-mono text-xs">
                Failed to load 3D scene.
              </div>
            }
          >
            <Canvas
              className="w-full h-full"
              frameloop={isHeroInView ? "always" : "never"}
              dpr={[1.25, 1.5]}
              gl={{
                powerPreference: "high-performance",
                antialias: true,
                stencil: false,
              }}
            >
              <PerspectiveCamera
                makeDefault
                position={isMobile ? [0, 0, 14] : [0, 0, 11.5]}
              />

              {/* Primary Hero Rig: loads first (0.53 MB, 1 draw call, razor-sharp on all devices) */}
              <Suspense fallback={<CanvasLoader />}>
                <MainCamera
                  cameraPos={activePreset.pos}
                  divePos={divePos}
                  scrollProgressRef={scrollProgressRef}
                  isMobile={isMobile}
                  telemetryRef={telemetryRef}
                >
                  <ComputerSciFi
                    position={[0, isMobile ? -0.15 : -0.65, 0]}
                    rotation={[0.16, 0, 0]}
                    scale={isMobile ? (isLiteMode ? 0.27 : 0.24) : 0.45}
                  />
                </MainCamera>
              </Suspense>

              {/* Companion Rig (Drone, Card, CPU, Arduino): dynamically skipped in Lite 3D mode */}
              {tierChecked && !isLiteMode && (
                <Suspense fallback={null}>
                  <HeroCompanionRig
                    isMobile={isMobile}
                    scrollProgressRef={scrollProgressRef}
                  />
                </Suspense>
              )}

              {/* Optimized 4-Light Rig */}
              <hemisphereLight args={["#d1fae5", "#04120c", 1.35]} />
              <ambientLight intensity={0.75} />
              <directionalLight position={[6, 10, 10]} intensity={1.55} />
              <directionalLight
                position={[-8, 4, 6]}
                intensity={0.95}
                color="#22d3ee"
              />
              <pointLight
                position={[0.6, 1.0, 4.5]}
                color="#10b981"
                intensity={2.0}
                distance={18}
              />
            </Canvas>
          </ErrorBoundary>
        </div>

        {/* ================= ACT 1: TOP EDITORIAL HEADER ================= */}
        <div className="c-space relative z-10 w-full max-w-[1440px] mx-auto flex items-start justify-between gap-6 pointer-events-none">
          {/* Left-Aligned Asymmetric Editorial Block (recedes smoothly on scroll dive) */}
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="max-w-xl pointer-events-auto"
          >
            {/* Crisp Monospace Index */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-400/85 mb-2.5"
            >
              <span>/ PORTFOLIO</span>
              <span className="text-emerald-400/35">·</span>
              <span className="text-emerald-100/50">KUALA LUMPUR (UTC+8)</span>
            </motion.div>

            {/* Oversized Solid High-Contrast Display Name */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className={`font-bold tracking-[-0.035em] leading-[1.02] text-[#f0fdf4] text-4xl sm:text-6xl lg:text-[4.25rem] ${spaceGrotesk.className}`}
            >
              Chairiel Azizi
            </motion.h1>

            {/* Preserved 5-Role TypeAnimation framed as a clean architectural telemetry strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-3 sm:mt-4 inline-flex items-center gap-2 border-l-2 border-emerald-400 pl-3 py-1 bg-gradient-to-r from-emerald-500/[0.12] via-emerald-500/[0.03] to-transparent"
            >
              <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-400/60">
                ROLE //
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
                className="font-mono text-sm sm:text-lg font-medium text-emerald-300"
                wrapper="span"
                repeat={Infinity}
              />
            </motion.div>

            {/* Concise Editorial Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-2.5 sm:mt-3 text-emerald-100/65 text-xs sm:text-sm lg:text-[15px] max-w-md leading-relaxed font-normal"
            >
              Packaged App Developer building GxP-regulated enterprise platforms
              · Self-hosted homelab architect running 40+ Docker services.
            </motion.p>
          </motion.div>

          {/* Right-Aligned Live Engineering Telemetry (stays live throughout the scroll dive) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ opacity: bottomBarOpacity }}
            className="hidden md:flex flex-col items-end text-right font-mono text-[11px] tracking-wider text-emerald-100/45 pt-1"
          >
            <span>03°08&apos;20&quot;N · 101°41&apos;13&quot;E</span>
            <span
              ref={telemetryRef}
              className="mt-1 text-emerald-400/80 tabular-nums"
            >
              CAM [0.0, 0.0, 11.5]
            </span>
            <div className="mt-2.5 flex items-center gap-2.5">
              <span
                ref={scrollPctRef}
                className="text-[10px] text-emerald-100/50 tabular-nums"
              >
                SCROLL 00%
              </span>
              <div className="w-16 h-[2px] bg-emerald-400/15 overflow-hidden">
                <div
                  ref={scrollBarRef}
                  className="w-full h-full bg-emerald-400 origin-left"
                  style={{ transform: "scaleX(0.04)" }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= ACT 2: MID-SCROLL ARCHITECTURAL SPEC OVERLAY ================= */}
        <motion.div
          style={{ opacity: midHudOpacity }}
          className="c-space pointer-events-none absolute inset-x-0 top-24 sm:top-28 bottom-28 sm:bottom-24 z-10 w-full max-w-[1440px] mx-auto flex flex-col justify-between"
        >
          {/* Top-Left Pillar — Enterprise GxP */}
          <motion.div
            style={{ x: midHudLeftX }}
            className="w-full sm:w-[320px] p-3.5 sm:p-4 rounded-sm border border-emerald-400/25 bg-[#050d09]/80 backdrop-blur-md self-start"
          >
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-emerald-400 uppercase mb-1.5">
              <span>01 / Enterprise</span>
              <span className="text-emerald-400/45">GxP</span>
            </div>
            <h2
              className={`text-sm sm:text-base font-semibold text-[#f0fdf4] tracking-tight ${spaceGrotesk.className}`}
            >
              Regulated Mission-Critical Apps
            </h2>
            <p className="mt-1 text-[11px] sm:text-xs font-mono text-emerald-100/60 leading-relaxed">
              Java 17 · Spring Boot 3 · Oracle PL/SQL · GitLab CI/CD
            </p>
          </motion.div>

          {/* Bottom-Right Pillar — Self-Hosted Homelab */}
          <motion.div
            style={{ x: midHudRightX }}
            className="w-full sm:w-[320px] p-3.5 sm:p-4 rounded-sm border border-cyan-400/25 bg-[#050d09]/80 backdrop-blur-md self-end sm:text-right"
          >
            <div className="flex sm:flex-row-reverse items-center justify-between font-mono text-[10px] tracking-[0.16em] text-cyan-300 uppercase mb-1.5">
              <span>02 / Homelab Infra</span>
              <span className="text-cyan-300/45">40+ SVC</span>
            </div>
            <h2
              className={`text-sm sm:text-base font-semibold text-[#f0fdf4] tracking-tight ${spaceGrotesk.className}`}
            >
              Self-Hosted Cloud Architecture
            </h2>
            <p className="mt-1 text-[11px] sm:text-xs font-mono text-emerald-100/60 leading-relaxed">
              Docker · Kubernetes · Terraform · AWS · Zero-Trust
            </p>
          </motion.div>
        </motion.div>

        {/* ================= BOTTOM BAR: TACTILE KEYCAPS & SHARP CTAS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          style={{ opacity: bottomBarOpacity, y: bottomBarY }}
          className="c-space relative z-10 w-full max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
        >
          {/* Left: Tactile Keycap Camera Switcher + Lite/Full Rig Toggle on Low-End GPUs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 font-mono text-xs">
            {cameraPresets.map((preset) => {
              const isActive = activeCamera === preset.id;
              const isDepressed = pressedKey === preset.keyNum;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => triggerCameraSelect(preset.id, preset.keyNum)}
                  className={`relative px-2 sm:px-2.5 py-1.5 rounded-sm border flex items-center gap-1.5 cursor-pointer transition-all duration-150 select-none ${
                    isActive
                      ? "border-emerald-400/55 text-emerald-300 shadow-[0_2px_0_rgba(16,185,129,0.4)]"
                      : "border-white/15 bg-[#050d09]/75 text-emerald-100/60 hover:text-[#f0fdf4] hover:border-emerald-400/30 shadow-[0_2px_0_rgba(255,255,255,0.1)]"
                  } ${
                    isDepressed
                      ? "translate-y-[2px] scale-[0.97] shadow-none"
                      : "active:translate-y-[2px] active:scale-[0.97] active:shadow-none"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeCamKey"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute inset-0 bg-emerald-500/15 rounded-sm -z-10"
                    />
                  )}
                  <span
                    className={`px-1 py-0.5 text-[10px] leading-none rounded-[2px] ${
                      isActive
                        ? "bg-emerald-400/20 text-emerald-200"
                        : "bg-white/10 text-emerald-100/50"
                    }`}
                  >
                    {preset.keyNum}
                  </span>
                  <span className="text-[11px] sm:text-xs">{preset.label}</span>
                </button>
              );
            })}

            {/* Optional toggle shown on Lite-detected devices so users can opt into Full 3D anytime */}
            {tierChecked && detectedLite && (
              <button
                type="button"
                onClick={toggleRigMode}
                title={
                  isLiteMode
                    ? "Load full 5-model 3D rig"
                    : "Switch back to fast Lite 3D mode"
                }
                className="px-2.5 py-1.5 rounded-sm border border-cyan-400/30 bg-[#050d09]/75 text-cyan-300/85 hover:text-cyan-200 hover:border-cyan-400/60 text-[11px] cursor-pointer transition-colors"
              >
                {isLiteMode ? "+ Full 3D" : "Lite 3D"}
              </button>
            )}
          </div>

          {/* Center: Minimal Scroll-to-Dive Indicator */}
          <motion.div
            style={{ opacity: scrollCueOpacity }}
            className="hidden lg:flex flex-col items-center gap-1.5 pointer-events-none"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-100/40">
              Scroll to dive
            </span>
            <div className="w-px h-5 bg-gradient-to-b from-emerald-400/70 to-transparent animate-pulse" />
          </motion.div>

          {/* Right: Sharp High-Contrast Editorial CTAs */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center sm:justify-end">
            <Link
              to="work"
              smooth={true}
              spy={true}
              className="cursor-pointer group flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-sm bg-[#f0fdf4] hover:bg-emerald-300 text-[#050d09] font-semibold text-xs tracking-tight transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              <span>Work Experience</span>
              <HiArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
            </Link>

            <Link
              to="projects"
              smooth={true}
              spy={true}
              className="cursor-pointer group flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-sm bg-[#050d09]/75 hover:bg-emerald-500/10 text-[#f0fdf4] font-medium text-xs tracking-tight border border-emerald-400/30 hover:border-emerald-400/65 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              <span>Projects &amp; Homelab</span>
              <HiArrowRight className="w-3.5 h-3.5 text-emerald-400 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Main;
