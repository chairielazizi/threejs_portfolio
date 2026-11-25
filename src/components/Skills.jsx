"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  SiDocker,
  SiGitlab,
  SiGithubactions,
  SiLinux,
  SiCloudflare,
  SiNginx,
  SiAmazonwebservices,
  SiKubernetes,
  SiTerraform,
  SiSpringboot,
  SiApachegroovy,
  SiDotnet,
  SiLaravel,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiVuedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiOracle,
  SiMysql,
  SiMongodb,
  SiGrafana,
  SiPrometheus,
  SiUptimekuma,
  SiNetdata,
  SiTailscale,
  SiAuthentik,
  SiGit,
  SiJira,
  SiSelenium,
  SiJunit5,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { TbApi, TbLogs, TbTestPipe, TbBrandCSharp } from "react-icons/tb";
import { GrServices } from "react-icons/gr";
import { spaceGrotesk } from "@/app/fonts";
import { useViewportVisibility } from "@/utils/deviceTier";

const CATS = [
  {
    id: "devops",
    num: "01",
    title: "DevOps & Cloud",
    color: "#22d3ee",
    skills: [
      {
        name: "Docker",
        icon: SiDocker,
        color: "#2496ED",
        desc: "Containerizes applications and dependencies for consistent deployment across dev, enterprise, and 40+ homelab services.",
      },
      {
        name: "Docker Compose",
        icon: SiDocker,
        color: "#38BDF8",
        desc: "Defines and runs multi-container service stacks declaratively from version-controlled YAML configurations.",
      },
      {
        name: "GitLab CI/CD",
        icon: SiGitlab,
        color: "#FC6D26",
        desc: "Automates enterprise Build → Test → SIT → UAT → PROD pipelines with SonarQube and coverage quality gates.",
      },
      {
        name: "GitHub Actions",
        icon: SiGithubactions,
        color: "#2088FF",
        desc: "Event-driven CI/CD workflows automating builds, linting, testing, and deployments straight from GitHub.",
      },
      {
        name: "Linux",
        icon: SiLinux,
        color: "#FCC624",
        desc: "Core server OS for homelab infrastructure, shell scripting, systemd daemons, networking, and container runtimes.",
      },
      {
        name: "Cloudflare Tunnel",
        icon: SiCloudflare,
        color: "#F38020",
        desc: "Routes public HTTPS traffic securely to private self-hosted services with zero open inbound firewall ports.",
      },
      {
        name: "Nginx",
        icon: SiNginx,
        color: "#009639",
        desc: "High-performance reverse proxy, TLS termination, and request routing layer across web services.",
      },
      {
        name: "AWS",
        icon: SiAmazonwebservices,
        color: "#FF9900",
        desc: "Cloud infrastructure platform for VPC networking, ECS container workloads, IAM security, and managed storage.",
      },
      {
        name: "Kubernetes",
        icon: SiKubernetes,
        color: "#326CE5",
        desc: "Container orchestration engine automating cluster deployments, rolling updates, scaling, and self-healing.",
      },
      {
        name: "Terraform",
        icon: SiTerraform,
        color: "#844FBA",
        desc: "Infrastructure-as-Code tool provisioning reproducible, versioned cloud environments declaratively.",
      },
    ],
  },
  {
    id: "backend",
    num: "02",
    title: "Backend Development",
    color: "#10b981",
    skills: [
      {
        name: "Java",
        icon: FaJava,
        color: "#EA2D2E",
        desc: "Strongly-typed JVM language (Java 17) powering regulated GxP enterprise platforms and core backend services.",
      },
      {
        name: "Spring Boot",
        icon: SiSpringboot,
        color: "#6DB33F",
        desc: "Enterprise Java framework for REST APIs, Hibernate/JPA, MyBatis persistence, and scheduled workflows.",
      },
      {
        name: "RESTful APIs",
        icon: TbApi,
        color: "#22D3EE",
        desc: "Clean, stateless HTTP service contracts connecting web clients with scalable backend business logic.",
      },
      {
        name: "Groovy",
        icon: SiApachegroovy,
        color: "#38BDF8",
        desc: "Expressive JVM language powering 800+ automated Spock testing specifications at 90%+ code coverage.",
      },
      {
        name: "C#",
        icon: TbBrandCSharp,
        color: "#A855F7",
        desc: "Modern object-oriented language for building structured .NET backend APIs and enterprise applications.",
      },
      {
        name: "ASP.NET",
        icon: SiDotnet,
        color: "#8B5CF6",
        desc: "Cross-platform Microsoft web framework for high-throughput APIs and full-stack server applications.",
      },
      {
        name: "PHP / Laravel",
        icon: SiLaravel,
        color: "#FF2D20",
        desc: "Batteries-included PHP framework with Eloquent ORM for rapid, clean full-stack web delivery.",
      },
    ],
  },
  {
    id: "frontend",
    num: "03",
    title: "Frontend Development",
    color: "#34d399",
    skills: [
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "#3178C6",
        desc: "Static type system over JavaScript ensuring safer refactoring and rock-solid UI component contracts.",
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        color: "#F7DF1E",
        desc: "Core browser programming language driving interactive interfaces, WebGL 3D scenes, and async apps.",
      },
      {
        name: "ReactJS",
        icon: SiReact,
        color: "#61DAFB",
        desc: "Component-driven UI library powering responsive web apps and React Three Fiber 3D experiences.",
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "#E5E7EB",
        desc: "Full-stack React framework with App Router, SSR, image optimization, and Turbopack production builds.",
      },
      {
        name: "Angular",
        icon: SiAngular,
        color: "#DD0031",
        desc: "Structured frontend framework used across complex enterprise compliance modules and dashboards.",
      },
      {
        name: "Vue.js",
        icon: SiVuedotjs,
        color: "#4FC08D",
        desc: "Approachable reactive frontend framework for clean single-page interfaces and lightweight apps.",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "#06B6D4",
        desc: "Utility-first CSS engine enabling disciplined design tokens, responsive layouts, and custom themes.",
      },
    ],
  },
  {
    id: "database",
    num: "04",
    title: "Database & Storage",
    color: "#0d9488",
    skills: [
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        color: "#60A5FA",
        desc: "Advanced open-source relational database backing production full-stack applications and homelab stacks.",
      },
      {
        name: "Oracle SQL",
        icon: SiOracle,
        color: "#F80000",
        desc: "Enterprise relational database and PL/SQL logic supporting GxP-regulated compliance systems.",
      },
      {
        name: "MySQL",
        icon: SiMysql,
        color: "#38BDF8",
        desc: "Battle-tested relational SQL engine for structured application data and web backends.",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "#47A248",
        desc: "Flexible JSON-document NoSQL database suited for evolving schemas and rapid feature iteration.",
      },
    ],
  },
  {
    id: "monitoring",
    num: "05",
    title: "Monitoring & Observability",
    color: "#059669",
    skills: [
      {
        name: "Grafana",
        icon: SiGrafana,
        color: "#F46800",
        desc: "Interactive telemetry dashboards visualizing server health, container metrics, and system alerts.",
      },
      {
        name: "Prometheus",
        icon: SiPrometheus,
        color: "#E6522C",
        desc: "Time-series metrics engine scraping real-time performance telemetry across hosts and containers.",
      },
      {
        name: "Uptime Kuma",
        icon: SiUptimekuma,
        color: "#5CD895",
        desc: "Self-hosted availability monitoring with instant notifications across every homelab service.",
      },
      {
        name: "Netdata",
        icon: SiNetdata,
        color: "#00AB44",
        desc: "Per-second real-time host diagnostics tracking CPU, RAM, disk I/O, and live container usage.",
      },
      {
        name: "Dozzle",
        icon: TbLogs,
        color: "#38BDF8",
        desc: "Lightweight real-time web log viewer streaming live stdout from 40+ running Docker containers.",
      },
    ],
  },
  {
    id: "tools",
    num: "06",
    title: "Networking & QA Tools",
    color: "#22d3ee",
    skills: [
      {
        name: "Tailscale VPN",
        icon: SiTailscale,
        color: "#60A5FA",
        desc: "WireGuard-powered zero-config mesh VPN connecting remote devices securely to private homelab nodes.",
      },
      {
        name: "Authentik SSO",
        icon: SiAuthentik,
        color: "#FD4B2D",
        desc: "Self-hosted identity provider delivering OIDC/SAML Single Sign-On across internal web services.",
      },
      {
        name: "Git",
        icon: SiGit,
        color: "#F05032",
        desc: "Distributed version control powering disciplined branching, code reviews, and release traceability.",
      },
      {
        name: "ServiceNow",
        icon: GrServices,
        color: "#34D399",
        desc: "Enterprise IT change management and release governance for audited production deployments.",
      },
      {
        name: "Jira",
        icon: SiJira,
        color: "#2684FF",
        desc: "Agile sprint planning and full requirement-to-commit traceability across regulated delivery teams.",
      },
      {
        name: "Selenium",
        icon: SiSelenium,
        color: "#43B02A",
        desc: "Automated browser testing suite validating end-to-end UI regression flows.",
      },
      {
        name: "JUnit",
        icon: SiJunit5,
        color: "#25A162",
        desc: "Core Java unit-testing framework enforcing deterministic backend logic verification.",
      },
      {
        name: "Mockito",
        icon: TbTestPipe,
        color: "#4ADE80",
        desc: "Java mocking library isolating services and repositories for fast, reliable automated tests.",
      },
    ],
  },
];

/**
 * Individual Option B Industrial Patchbay card:
 * - Idle: skill chips scatter & drift freely within the card's own arena div.
 * - Hover (or mobile tap): all chips magnetically spring-snap into crisp ordered alignment,
 *   cursor spotlight activates, and hovering/tapping any skill shows its short description.
 */
const MagneticSkillCard = ({
  category,
  sectionVisible,
  reducedMotion,
  forceAligned,
}) => {
  const { num, title, color, skills } = category;

  const cardRef = useRef(null);
  const arenaRef = useRef(null);
  const spotlightRef = useRef(null);
  const itemRefs = useRef([]);

  const [isAligned, setIsAligned] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [offsets, setOffsets] = useState(() =>
    skills.map(() => ({ x: 0, y: 0, rot: 0 }))
  );

  // Sync individual card alignment cleanly when global Align All toggles off
  useEffect(() => {
    if (!forceAligned) {
      setIsAligned(false);
    }
  }, [forceAligned]);

  // Measure each badge's natural aligned home position inside arenaRef and compute
  // random shuffled scatter waypoints across the entire div with AABB separation so
  // chips roam freely in random order without piling unreadably on top of each other.
  const computeScatterOffsets = useCallback(() => {
    const arena = arenaRef.current;
    if (!arena) return;
    const arenaW = arena.clientWidth;
    const arenaH = arena.clientHeight;
    if (arenaW < 40 || arenaH < 40) return;

    const pad = 10;
    const gap = 8;
    const count = skills.length;

    // Divide the card arena into a loose distributed grid of zones, then randomly
    // shuffle which badge visits which zone so they truly scatter across the whole div
    const cols = arenaW < 340 ? 2 : count <= 4 ? 2 : count <= 6 ? 2 : 3;
    const rows = Math.ceil(count / cols);
    const cellW = (arenaW - pad * 2) / cols;
    const cellH = (arenaH - pad * 2) / rows;

    const slotIndices = Array.from({ length: cols * rows }, (_, i) => i);
    for (let i = slotIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [slotIndices[i], slotIndices[j]] = [slotIndices[j], slotIndices[i]];
    }

    const boxes = skills.map((_, idx) => {
      const el = itemRefs.current[idx];
      if (!el) return null;
      const homeX = el.offsetLeft;
      const homeY = el.offsetTop;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const maxX = Math.max(pad, arenaW - w - pad);
      const maxY = Math.max(pad, arenaH - h - pad);

      const slot = slotIndices[idx];
      const c = slot % cols;
      const r = Math.floor(slot / cols);

      // Random jitter inside the assigned shuffled zone
      const zoneX = pad + c * cellW + (Math.random() - 0.35) * Math.max(12, cellW - w * 0.65);
      const zoneY = pad + r * cellH + (Math.random() - 0.35) * Math.max(12, cellH - h * 0.65);

      return {
        homeX,
        homeY,
        w,
        h,
        maxX,
        maxY,
        x: Math.max(pad, Math.min(maxX, zoneX)),
        y: Math.max(pad, Math.min(maxY, zoneY)),
        rot: Number(((Math.random() - 0.5) * 14).toFixed(1)),
      };
    });

    // Fast AABB separation passes so badges keep crisp readability while drifting
    for (let iter = 0; iter < 18; iter++) {
      for (let i = 0; i < boxes.length; i++) {
        const a = boxes[i];
        if (!a) continue;
        for (let j = i + 1; j < boxes.length; j++) {
          const b = boxes[j];
          if (!b) continue;

          const overlapX =
            Math.min(a.x + a.w + gap, b.x + b.w + gap) - Math.max(a.x, b.x);
          const overlapY =
            Math.min(a.y + a.h + gap, b.y + b.h + gap) - Math.max(a.y, b.y);

          if (overlapX > 0 && overlapY > 0) {
            if (overlapX < overlapY) {
              const push = overlapX / 2 + 1;
              if (a.x + a.w / 2 < b.x + b.w / 2) {
                a.x -= push;
                b.x += push;
              } else {
                a.x += push;
                b.x -= push;
              }
            } else {
              const push = overlapY / 2 + 1;
              if (a.y + a.h / 2 < b.y + b.h / 2) {
                a.y -= push;
                b.y += push;
              } else {
                a.y += push;
                b.y -= push;
              }
            }

            a.x = Math.max(pad, Math.min(a.maxX, a.x));
            a.y = Math.max(pad, Math.min(a.maxY, a.y));
            b.x = Math.max(pad, Math.min(b.maxX, b.x));
            b.y = Math.max(pad, Math.min(b.maxY, b.y));
          }
        }
      }
    }

    setOffsets(
      boxes.map((b) =>
        b
          ? {
              x: Math.round(b.x - b.homeX),
              y: Math.round(b.y - b.homeY),
              rot: b.rot,
            }
          : { x: 0, y: 0, rot: 0 }
      )
    );
  }, [skills]);

  const isSnapped = forceAligned || isAligned || reducedMotion;

  // Initial scatter + continuous slow roam ONLY while section is visible and card is not snapped
  useEffect(() => {
    if (isSnapped || !sectionVisible) return;

    // Kick off first scatter smoothly after layout settles
    const initTimer = setTimeout(computeScatterOffsets, 120);
    // Gentle staggered roam interval per card so all 6 cards feel organically independent
    const intervalMs = 2400 + (parseInt(num, 10) % 3) * 350;
    const loop = setInterval(computeScatterOffsets, intervalMs);

    return () => {
      clearTimeout(initTimer);
      clearInterval(loop);
    };
  }, [computeScatterOffsets, isSnapped, sectionVisible, num]);

  // Re-clamp scatter if window resizes while drifting
  useEffect(() => {
    const handleResize = () => {
      if (!isSnapped && sectionVisible) {
        computeScatterOffsets();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [computeScatterOffsets, isSnapped, sectionVisible]);

  // Cursor-tracking emerald specular spotlight (direct DOM update -> zero re-renders)
  const handleMouseMove = (e) => {
    if (!spotlightRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, ${color}1c, transparent 70%)`;
  };

  const handleMouseEnter = () => {
    setIsAligned(true);
    if (spotlightRef.current) spotlightRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    setIsAligned(false);
    setActiveSkill(null);
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
  };

  return (
    <div className="reveal h-full">
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="relative h-full rounded-sm border bg-[#06130d]/95 flex flex-col justify-between overflow-hidden transition-colors duration-300"
        style={{
          borderColor: isSnapped ? `${color}55` : "rgba(52, 211, 153, 0.16)",
        }}
      >
      {/* Subtle architectural 1px blueprint grid inside card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(52, 211, 153, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(52, 211, 153, 0.035) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Live cursor radial spotlight */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
      />

      {/* Card Header */}
      <div className="relative z-10 px-4 pt-4 pb-3 border-b border-emerald-400/15 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: color, boxShadow: `0 0 10px ${color}` }}
          />
          <span className="font-mono text-[10px] text-emerald-400/60 shrink-0">
            {num}
          </span>
          <h3 className="font-mono text-[11px] sm:text-xs font-bold text-[#f0fdf4] uppercase tracking-[0.06em] truncate">
            {title}
          </h3>
        </div>

        {/* Clickable state pill (doubles as tap-to-align toggle on touchscreens) */}
        <button
          type="button"
          onClick={() => {
            setIsAligned((prev) => {
              if (prev) setActiveSkill(null);
              return !prev;
            });
          }}
          className="font-mono text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded-sm border transition-colors shrink-0 cursor-pointer"
          style={{
            borderColor: isSnapped ? `${color}55` : "rgba(255,255,255,0.12)",
            background: isSnapped ? `${color}18` : "rgba(5,13,9,0.7)",
            color: isSnapped ? "#f0fdf4" : "rgba(167,243,208,0.65)",
          }}
          title={isSnapped ? "Aligned in order" : "Tap or hover to snap into order"}
        >
          {isSnapped ? "Aligned" : "Drift"}
        </button>
      </div>

      {/* Scattering Arena — skills roam freely inside this div, then snap cleanly into order on hover */}
      <div
        ref={arenaRef}
        className="relative z-10 flex-1 min-h-[250px] sm:min-h-[235px] p-3.5 flex flex-wrap content-start items-start gap-2 overflow-hidden"
      >
        {skills.map((skill, idx) => {
          const Icon = skill.icon;
          const isSkillActive = activeSkill?.name === skill.name;
          const off = offsets[idx] || { x: 0, y: 0, rot: 0 };

          return (
            <button
              key={skill.name}
              type="button"
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              onMouseEnter={() => {
                setIsAligned(true);
                setActiveSkill(skill);
              }}
              onFocus={() => {
                setIsAligned(true);
                setActiveSkill(skill);
              }}
              onClick={() => {
                setIsAligned(true);
                setActiveSkill(skill);
              }}
              className="group/chip relative inline-flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-sm border text-[13px] sm:text-[15px] font-semibold tracking-tight text-[#f0fdf4] cursor-pointer select-none"
              style={{
                background: isSkillActive
                  ? "rgba(12, 36, 25, 0.96)"
                  : "rgba(5, 13, 9, 0.86)",
                borderColor: isSkillActive
                  ? skill.color
                  : isSnapped
                    ? `${color}38`
                    : "rgba(52, 211, 153, 0.22)",
                boxShadow: isSkillActive
                  ? `0 0 18px ${skill.color}38, inset 0 0 10px ${skill.color}18`
                  : "none",
                transform: isSnapped
                  ? isSkillActive
                    ? "translate3d(0px, -2px, 0) rotate(0deg)"
                    : "translate3d(0px, 0px, 0) rotate(0deg)"
                  : `translate3d(${off.x}px, ${off.y}px, 0) rotate(${off.rot}deg)`,
                transition: isSnapped
                  ? "transform 480ms cubic-bezier(0.22, 1, 0.36, 1), border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease"
                  : "transform 2200ms cubic-bezier(0.37, 0, 0.63, 1), border-color 300ms ease, background-color 300ms ease, box-shadow 300ms ease",
                zIndex: isSkillActive ? 20 : 1,
              }}
            >
              <Icon
                className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/chip:scale-110"
                style={{ color: skill.color || color }}
              />
              <span>{skill.name}</span>
            </button>
          );
        })}
      </div>

      {/* Dedicated Per-Card Telemetry Description Footer (Zero Layout Jump) */}
      <div
        className="relative z-10 px-4 py-2.5 border-t min-h-[64px] flex items-center transition-colors duration-200"
        style={{
          borderColor: activeSkill
            ? `${activeSkill.color}60`
            : "rgba(52, 211, 153, 0.14)",
          background: activeSkill
            ? "rgba(8, 24, 17, 0.95)"
            : "rgba(4, 11, 8, 0.85)",
        }}
      >
        {activeSkill ? (
          <div className="w-full">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  background: activeSkill.color,
                  boxShadow: `0 0 8px ${activeSkill.color}`,
                }}
              />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#f0fdf4]">
                {activeSkill.name}
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 leading-snug line-clamp-2">
              {activeSkill.desc}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full font-mono text-[11px] text-emerald-100/45">
            <span>
              {isSnapped
                ? "INSPECT // Hover or tap any technology above"
                : "FREE DRIFT // Hover card to snap into order"}
            </span>
            <span className="text-emerald-400/50 hidden sm:inline">↘</span>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const { ref: visibilityRef, isVisible } = useViewportVisibility("120px 0px");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [alignAll, setAlignAll] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Smooth reveal animation for header & cards
  useEffect(() => {
    const root = visibilityRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "100px 0px" }
    );

    const elements = root.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [visibilityRef]);

  return (
    <section id="skills" ref={visibilityRef} className="c-space my-20">
      {/* Editorial Section Header matching Hero */}
      <div className="reveal mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="sec-divider mb-8 sm:mx-0" />
          <p className="sec-tag font-mono">/ Skills</p>
          <h2
            className={`text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-[#f0fdf4] ${spaceGrotesk.className}`}
          >
            Tech Stack
          </h2>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-2.5">
          <p className="font-mono text-xs text-emerald-100/55 max-w-xs sm:text-right leading-relaxed">
            Hover any domain card to magnetically align the stack, then hover a
            tool to inspect its role.
          </p>
          <button
            type="button"
            onClick={() => setAlignAll((prev) => !prev)}
            className={`px-3 py-1.5 rounded-sm border font-mono text-xs uppercase tracking-wider cursor-pointer transition-all duration-200 active:translate-y-[1px] active:scale-[0.98] ${
              alignAll
                ? "border-emerald-400/65 bg-emerald-500/20 text-emerald-200 shadow-[0_2px_0_rgba(16,185,129,0.4)]"
                : "border-white/15 bg-[#06130d]/90 text-emerald-100/80 hover:text-[#f0fdf4] hover:border-emerald-400/45 shadow-[0_2px_0_rgba(255,255,255,0.1)]"
            }`}
          >
            {alignAll ? "✓ Aligned All · Resume Drift" : "Align All"}
          </button>
        </div>
      </div>

      {/* All 6 Category Cards Visible — 3x2 Desktop, 2x3 Tablet, 1x6 Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
        {CATS.map((cat) => (
          <MagneticSkillCard
            key={cat.id}
            category={cat}
            sectionVisible={isVisible}
            reducedMotion={reducedMotion}
            forceAligned={alignAll}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
