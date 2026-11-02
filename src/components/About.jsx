"use client";
import { useEffect, useState, useRef } from "react";
// import Globe from "react-globe.gl";
import Button from "./Button";
import dynamic from "next/dynamic";
// import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { GitHubLight, LinkedIn } from "developer-icons";
import Link from "next/link";
import Image from "next/image";
import TechRadar from "./TechRadar";
import { HiSignal } from "react-icons/hi2";

const TERMINAL_LOGS = [
  { type: "cmd", text: "git push origin main" },
  { type: "info", text: "↳ [GitLab CI] GxP pipeline #4829 running..." },
  { type: "success", text: "Quality gates passed: SonarQube & JaCoCo 92%" },
  { type: "cmd", text: "docker compose up -d --build" },
  { type: "info", text: "↳ Building multi-stage container images..." },
  { type: "success", text: "42/42 containers healthy & online" },
  { type: "cmd", text: "terraform apply -auto-approve" },
  { type: "info", text: "↳ Provisioning AWS VPC, subnets & ECS cluster..." },
  { type: "success", text: "Apply complete: 14 added, 0 destroyed" },
  { type: "cmd", text: "tailscale status && cloudflared tunnel run" },
  { type: "success", text: "Zero-trust ingress connected via *.airiel.space" },
  { type: "cloud", text: "Cloud & Homelab Infra: All systems optimal" },
];

const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [places, setPlaces] = useState([]);
  const [hasCopied, setHasCopied] = useState(false);
  const globeRef = useRef(null);

  const Globe = dynamic(
    () => import("react-globe.gl").then((mod) => mod.default),
    {
      ssr: false,
    }
  );

  useEffect(() => {
    setIsMounted(true);
    fetch("/datasets/ne_110m_populated_places_simple.geojson")
      .then((res) => res.json())
      .then(({ features }) => setPlaces(features));
  }, []);

  // Configure smooth, lightweight slow auto-rotation on the globe
  useEffect(() => {
    if (!isMounted) return;
    const timer = setTimeout(() => {
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1.5; // gentle, slow drift
        }
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [isMounted]);

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText("chairielazizi@gmail.com");
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 3000);
      // alert("Copied to clipboard");
    }
  };

  return (
    <section id="about" className="my-20 c-space">
      <div className="sec-divider mb-8" />
      <p className="sec-tag">/ About</p>
      <h2 className="head-text mb-8">About Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {/* about me */}
        <div className="col-span-1 md:col-span-2 xl:col-span-2">
          <div className="grid-container flex-col md:flex-row items-center gap-6 sm:gap-8 justify-center">
            <div className="flex-shrink-0">
              <Image
                src="/assets/riel1.png"
                alt="about-me"
                width={260}
                height={260}
                className="w-44 h-44 sm:w-56 sm:h-56 object-contain"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="grid-headtext text-2xl font-bold mb-3">Hey! I&apos;m Chairiel</h2>
              <p className="grid-subtext text-sm sm:text-base leading-relaxed">
                Software Engineer at Accenture delivering enterprise, GxP-regulated
                applications end-to-end using Java (Spring Boot), Oracle, and modern
                frontends. Experienced in deploying through automated GitLab CI/CD
                pipelines with strict quality and compliance gates. Actively bridging
                software development with Cloud & DevOps Engineering, with proven
                hands-on capability in Linux administration, Docker containerization,
                and infrastructure automation across professional delivery and an
                active, self-hosted homelab.
              </p>
            </div>
          </div>
        </div>

        {/* location / globe */}
        <div className="col-span-1 md:col-span-1 xl:col-span-1">
          <div className="grid-container items-center justify-between">
            <div className="w-full h-fit flex justify-center items-center sm:h-[300px]">
              {isMounted && (
                <Globe
                  ref={globeRef}
                  height={300}
                  width={300}
                  backgroundColor="rgba(0, 0, 0, 0)"
                  backgroundImageOpacity={0.5}
                  showAtmosphere={true}
                  showGraticules={false}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                  backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                  labelsData={places}
                  labelLat={(d) => d.properties.latitude}
                  labelLng={(d) => d.properties.longitude}
                  labelText={(d) => d.properties.name}
                  labelSize={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
                  labelDotRadius={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
                  labelColor={() => "rgba(255, 165, 0, 0.75)"}
                  labelResolution={2}
                />
              )}
            </div>
            <div className="text-center mt-3 w-full">
              <h2 className="grid-headtext">
                I work remotely across most timezone
              </h2>
              <p className="grid-subtext">Based in Malaysia, Truly Asia</p>
              <ScrollLink
                href="#contact"
                activeClass="active"
                smooth={true}
                spy={true}
                to="contact"
              >
                <Button
                  name="Contact me"
                  isBeam={true}
                  containerClass={"w-full mt-6"}
                />
              </ScrollLink>
            </div>
          </div>
        </div>

        {/* skills */}
        <div className="col-span-1 md:col-span-1 xl:col-span-1">
          <div className="grid-container items-center justify-between">
            {/* Live Orbital Tech Radar replacing grid2-1.png */}
            <TechRadar />
            <div className="w-full">
              <h2 className="grid-headtext">Skills</h2>
              <div className="flex flex-wrap gap-2.5 hover:shadow-2xl hover:shadow-emerald-500 hover:bg-transparent bg-transparent rounded-xl p-2 transition-all duration-500 ease-in-out">
                <p className="grid-subtext">Docker</p>
                <p className="grid-subtext">Docker Compose</p>
                <p className="grid-subtext">Linux</p>
                <p className="grid-subtext">GitLab CI/CD</p>
                <p className="grid-subtext">AWS</p>
                <p className="grid-subtext">Kubernetes</p>
                <p className="grid-subtext">Terraform</p>
                <p className="grid-subtext">Cloudflare</p>
                <p className="grid-subtext">Nginx</p>
                <p className="grid-subtext">Java</p>
                <p className="grid-subtext">Spring Boot</p>
                <p className="grid-subtext">TypeScript</p>
                <p className="grid-subtext">ReactJS</p>
                <p className="grid-subtext">Next.js</p>
                <p className="grid-subtext">Angular</p>
                <p className="grid-subtext">PostgreSQL</p>
                <p className="grid-subtext">Oracle SQL</p>
                <p className="grid-subtext">Git</p>
              </div>
            </div>
          </div>
        </div>

        {/* mindset - bridging code to cloud */}
        <div className="col-span-1 md:col-span-1 xl:col-span-1">
          <div className="grid-container justify-between items-center">
            {/* Terminal visual with continuous live execution scrolling */}
            <div className="w-full rounded-xl bg-black-100/90 border border-emerald-500/25 p-3.5 sm:p-4 font-mono text-xs sm:text-[13px] shadow-lg shadow-black/50 transition-all duration-300 hover:border-emerald-400/50">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 px-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-neutral-400 text-[11px] font-sans">pipeline.sh — auto-executing</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  <span>RUNNING</span>
                </div>
              </div>

              {/* Scrolling viewport with top/bottom fade mask */}
              <div
                className="h-[175px] sm:h-[195px] overflow-hidden relative"
                style={{
                  maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                }}
              >
                <div className="animate-terminal-scroll flex flex-col gap-2.5 text-left text-neutral-300">
                  {/* First stream */}
                  {TERMINAL_LOGS.map((log, idx) => (
                    <div key={`stream1-${idx}`} className="leading-snug">
                      {log.type === "cmd" && (
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">❯</span>
                          <span className="text-teal-300 font-semibold">{log.text}</span>
                        </div>
                      )}
                      {log.type === "info" && (
                        <div className="text-neutral-400 pl-4 text-[11px] sm:text-xs">
                          {log.text}
                        </div>
                      )}
                      {log.type === "success" && (
                        <div className="flex items-center gap-2 pl-4 text-emerald-400 text-[11px] sm:text-xs">
                          <span className="font-bold">✔</span>
                          <span>{log.text}</span>
                        </div>
                      )}
                      {log.type === "cloud" && (
                        <div className="flex items-center gap-2 pl-4 text-cyan-300 font-medium text-[11px] sm:text-xs">
                          <span>☁</span>
                          <span>{log.text}</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Duplicate stream for seamless infinite loop */}
                  {TERMINAL_LOGS.map((log, idx) => (
                    <div key={`stream2-${idx}`} className="leading-snug" aria-hidden="true">
                      {log.type === "cmd" && (
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">❯</span>
                          <span className="text-teal-300 font-semibold">{log.text}</span>
                        </div>
                      )}
                      {log.type === "info" && (
                        <div className="text-neutral-400 pl-4 text-[11px] sm:text-xs">
                          {log.text}
                        </div>
                      )}
                      {log.type === "success" && (
                        <div className="flex items-center gap-2 pl-4 text-emerald-400 text-[11px] sm:text-xs">
                          <span className="font-bold">✔</span>
                          <span>{log.text}</span>
                        </div>
                      )}
                      {log.type === "cloud" && (
                        <div className="flex items-center gap-2 pl-4 text-cyan-300 font-medium text-[11px] sm:text-xs">
                          <span>☁</span>
                          <span>{log.text}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full text-center sm:text-left mt-2">
              <h2 className="grid-headtext">Bridging Code &amp; Cloud</h2>
              <p className="grid-subtext text-sm sm:text-base leading-relaxed">
                Writing application code is only half the journey. Building the
                automated CI/CD pipelines, containerized environments, and cloud
                infrastructure that keep systems resilient, scalable, and
                observable in production is what drives me today.
              </p>
            </div>
          </div>
        </div>

        {/* contact */}
        <div className="col-span-1 md:col-span-1 xl:col-span-1">
          <div className="grid-container items-center justify-between">
            {/* Live Availability Status & Signal Beacon replacing grid4.png */}
            <div className="w-full h-[180px] sm:h-[195px] rounded-xl bg-black-100/90 border border-emerald-500/25 p-3 sm:p-3.5 relative overflow-hidden flex flex-col justify-between shadow-lg shadow-black/50 transition-all duration-300 hover:border-emerald-400/50">
              {/* Ambient radial glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header: Live Status & Region */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400 font-mono tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  <span>AVAILABLE FOR ROLES</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">KUL • UTC+8</span>
              </div>

              {/* Center Radar / Beacon Waves */}
              <div className="relative flex items-center justify-center my-1 z-10">
                {/* Concentric sonar ripple */}
                <div className="absolute w-24 h-24 rounded-full border border-emerald-500/20 animate-ping opacity-30 pointer-events-none" />
                <div className="absolute w-16 h-16 rounded-full border border-teal-500/25 pointer-events-none" />

                {/* Center Signal Transmitter Hub */}
                <div className="relative w-12 h-12 rounded-full bg-black-200/95 border border-emerald-400/60 shadow-[0_0_18px_rgba(52,211,153,0.35)] flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <HiSignal className="text-emerald-400 text-xl animate-pulse" />
                </div>
              </div>

              {/* Live Telemetry Chips */}
              <div className="grid grid-cols-2 gap-2 text-left z-10">
                <div className="px-2 py-1 rounded bg-black-200/80 border border-white/5 flex flex-col">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase">Response Time</span>
                  <span className="text-[11px] font-mono font-semibold text-emerald-300">&lt; 24 Hours</span>
                </div>
                <div className="px-2 py-1 rounded bg-black-200/80 border border-white/5 flex flex-col">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase">Open To</span>
                  <span className="text-[11px] font-mono font-semibold text-teal-300">Cloud &amp; DevOps</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 w-full text-center">
              <h2 className="grid-headtext">Contact me</h2>
              <div className="copy-container" onClick={handleCopy}>
                <Image
                  src={hasCopied ? "/assets/tick.svg" : "/assets/copy.svg"}
                  alt="copy"
                  width={22}
                  height={22}
                />
                <p className="text-base sm:text-lg text-white font-medium">
                  chairielazizi@gmail.com
                </p>
              </div>
            </div>
            {/* social link */}
            <div className="flex gap-3 justify-center w-full">
              <Link
                href="https://github.com/chairielazizi"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <GitHubLight className="w-3/4 h-3/4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/chairielazizi/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <LinkedIn className="w-3/4 h-3/4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
