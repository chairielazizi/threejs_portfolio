"use client";

import { useEffect, useRef } from "react";
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

const CATS = [
  {
    id: "devops",
    title: "DevOps & Cloud",
    color: "#22d3ee",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Docker Compose", icon: SiDocker, color: "#38BDF8" },
      { name: "GitLab CI/CD", icon: SiGitlab, color: "#FC6D26" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Cloudflare Tunnel", icon: SiCloudflare, color: "#F38020" },
      { name: "Nginx", icon: SiNginx, color: "#009639" },
      { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "Terraform", icon: SiTerraform, color: "#844FBA" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    color: "#10b981",
    skills: [
      { name: "Java", icon: FaJava, color: "#EA2D2E" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
      { name: "RESTful APIs", icon: TbApi, color: "#22D3EE" },
      { name: "Groovy", icon: SiApachegroovy, color: "#38BDF8" },
      { name: "C#", icon: TbBrandCSharp, color: "#A855F7" },
      { name: "ASP.NET", icon: SiDotnet, color: "#8B5CF6" },
      { name: "PHP / Laravel", icon: SiLaravel, color: "#FF2D20" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    color: "#34d399",
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "ReactJS", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#E5E7EB" },
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
      { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: "database",
    title: "Database & Storage",
    color: "#0d9488",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#60A5FA" },
      { name: "Oracle SQL", icon: SiOracle, color: "#F80000" },
      { name: "MySQL", icon: SiMysql, color: "#38BDF8" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring & Observability",
    color: "#059669",
    skills: [
      { name: "Grafana", icon: SiGrafana, color: "#F46800" },
      { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
      { name: "Uptime Kuma", icon: SiUptimekuma, color: "#5CD895" },
      { name: "Netdata", icon: SiNetdata, color: "#00AB44" },
      { name: "Dozzle", icon: TbLogs, color: "#38BDF8" },
    ],
  },
  {
    id: "tools",
    title: "Networking & QA Tools",
    color: "#22d3ee",
    skills: [
      { name: "Tailscale VPN", icon: SiTailscale, color: "#60A5FA" },
      { name: "Authentik SSO", icon: SiAuthentik, color: "#FD4B2D" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "ServiceNow", icon: GrServices, color: "#34D399" },
      { name: "Jira", icon: SiJira, color: "#2684FF" },
      { name: "Selenium", icon: SiSelenium, color: "#43B02A" },
      { name: "JUnit", icon: SiJunit5, color: "#25A162" },
      { name: "Mockito", icon: TbTestPipe, color: "#4ADE80" },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);

  useEffect(() => {
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

    const elements = ref.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="c-space my-20">
      {/* Section header */}
      <div className="reveal mb-12">
        <div className="sec-divider mb-8" />
        <p className="sec-tag">/ Skills</p>
        <h2 className="head-text">
          Tech <span className="gradient-text">Stack</span>
        </h2>
      </div>

      {/* Skills grid: 3 cols on desktop (2 rows of 3), 2 cols on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {CATS.map(({ id, title, color, skills }) => (
          <div
            key={id}
            className="glass-card reveal rounded-2xl p-5 sm:p-6 flex flex-col gap-4 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 group"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    background: color,
                    boxShadow: `0 0 10px ${color}`,
                  }}
                />
                <h3 className="text-xs font-bold text-[var(--tx-primary)] uppercase tracking-wider font-mono">
                  {title}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-white/45 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                {skills.length} tools
              </span>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full"
              style={{
                background: `linear-gradient(to right, ${color}60, ${color}10, transparent)`,
              }}
            />

            {/* Badges with Logo */}
            <div className="flex flex-wrap gap-2 pt-0.5">
              {skills.map((s) => {
                const Icon = s.icon;
                return (
                  <span
                    key={s.name}
                    className="group/badge inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-white/90 bg-black/50 border backdrop-blur-md transition-all duration-200 hover:text-white hover:bg-black/80 hover:scale-[1.03] hover:shadow-md cursor-default select-none"
                    style={{
                      borderColor: `${color}30`,
                    }}
                  >
                    <Icon
                      className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover/badge:scale-110"
                      style={s.color ? { color: s.color } : { color }}
                    />
                    <span className="tracking-tight">{s.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
