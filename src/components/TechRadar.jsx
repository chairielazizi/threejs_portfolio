"use client";

import React from "react";
import {
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiAmazonwebservices,
  SiLinux,
  SiGitlab,
  SiSpringboot,
  SiReact,
  SiTypescript,
  SiPostgresql,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

const INNER_SKILLS = [
  { name: "Docker", icon: SiDocker, color: "#38bdf8", x: 0, y: -55 },
  { name: "Kubernetes", icon: SiKubernetes, color: "#60a5fa", x: 52, y: -17 },
  { name: "Terraform", icon: SiTerraform, color: "#c084fc", x: 32, y: 44 },
  { name: "AWS", icon: SiAmazonwebservices, color: "#f59e0b", x: -32, y: 44 },
  { name: "Linux", icon: SiLinux, color: "#facc15", x: -52, y: -17 },
];

const OUTER_SKILLS = [
  { name: "GitLab", icon: SiGitlab, color: "#fb923c", x: 0, y: -92 },
  { name: "Java", icon: FaJava, color: "#f97316", x: 80, y: -46 },
  { name: "Spring Boot", icon: SiSpringboot, color: "#4ade80", x: 80, y: 46 },
  { name: "React", icon: SiReact, color: "#22d3ee", x: 0, y: 92 },
  { name: "TypeScript", icon: SiTypescript, color: "#60a5fa", x: -80, y: 46 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#818cf8", x: -80, y: -46 },
];

const TechRadar = () => {
  return (
    <div className="tech-radar relative w-[230px] h-[230px] sm:w-[240px] sm:h-[240px] flex items-center justify-center my-1 select-none">
      {/* Ambient background glow */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />

      {/* Outer Orbit track ring */}
      <div className="absolute w-[184px] h-[184px] rounded-full border border-dashed border-teal-500/20 pointer-events-none" />

      {/* Outer Orbit rotating container (Counter-Clockwise) */}
      <div className="animate-orbit-ccw absolute w-[184px] h-[184px] rounded-full">
        {OUTER_SKILLS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="absolute"
              style={{
                left: `calc(50% + ${item.x}px)`,
                top: `calc(50% + ${item.y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="animate-counter-orbit-ccw group/icon relative flex items-center justify-center w-8 h-8 rounded-full bg-black-200/95 border border-teal-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)] transition-all duration-300 hover:scale-125 hover:border-teal-400 hover:shadow-[0_0_16px_rgba(34,211,238,0.5)] cursor-pointer"
              >
                <Icon style={{ color: item.color }} className="text-base transition-transform duration-300 group-hover/icon:scale-110" />
                {/* Tooltip */}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black-600/95 border border-teal-500/30 text-[10px] text-teal-300 font-mono whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none z-30 shadow-lg">
                  {item.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inner Orbit track ring */}
      <div className="absolute w-[110px] h-[110px] rounded-full border border-dashed border-emerald-500/25 pointer-events-none" />

      {/* Inner Orbit rotating container (Clockwise) */}
      <div className="animate-orbit-cw absolute w-[110px] h-[110px] rounded-full">
        {INNER_SKILLS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="absolute"
              style={{
                left: `calc(50% + ${item.x}px)`,
                top: `calc(50% + ${item.y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="animate-counter-orbit-cw group/icon relative flex items-center justify-center w-8 h-8 rounded-full bg-black-200/95 border border-emerald-500/35 shadow-[0_0_12px_rgba(52,211,153,0.2)] transition-all duration-300 hover:scale-125 hover:border-emerald-400 hover:shadow-[0_0_16px_rgba(52,211,153,0.5)] cursor-pointer"
              >
                <Icon style={{ color: item.color }} className="text-base transition-transform duration-300 group-hover/icon:scale-110" />
                {/* Tooltip */}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black-600/95 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none z-30 shadow-lg">
                  {item.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Cyber Hub */}
      <div className="relative flex flex-col items-center justify-center w-14 h-14 rounded-full bg-black-100/95 border border-emerald-400/60 shadow-[0_0_24px_rgba(52,211,153,0.35)] z-10 transition-transform duration-300 hover:scale-110">
        <span className="text-[11px] font-mono font-bold text-emerald-400 leading-none">~/stack</span>
        <span className="text-[8px] font-mono text-teal-300 tracking-widest uppercase mt-0.5">DEV·OPS</span>
        <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping opacity-25 pointer-events-none" />
      </div>
    </div>
  );
};

export default TechRadar;

