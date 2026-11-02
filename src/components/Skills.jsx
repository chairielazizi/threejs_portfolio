"use client";

import { useEffect, useRef } from "react";

const CATS = [
  {
    id: "devops",
    title: "DevOps & Cloud",
    color: "var(--teal-bright)",
    skills: [
      "Docker",
      "Docker Compose",
      "GitLab CI/CD",
      "Linux",
      "Cloudflare Tunnel",
      "Nginx",
      "AWS",
      "Kubernetes",
      "Terraform",
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    color: "var(--em-main)",
    skills: ["Java", "Spring Boot", "RESTful APIs", "Groovy", "C#", "ASP.NET", "PHP / Laravel"],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    color: "var(--em-bright)",
    skills: ["TypeScript", "JavaScript", "ReactJS", "Next.js", "Angular", "Vue.js", "Tailwind CSS"],
  },
  {
    id: "database",
    title: "Database & Storage",
    color: "var(--teal-main)",
    skills: ["PostgreSQL", "Oracle SQL", "MySQL", "MongoDB"],
  },
  {
    id: "monitoring",
    title: "Monitoring & Observability",
    color: "var(--em-neon)",
    skills: ["Grafana", "Prometheus", "Uptime Kuma", "Netdata", "Dozzle"],
  },
  {
    id: "tools",
    title: "Networking & QA Tools",
    color: "var(--teal-bright)",
    skills: ["Tailscale VPN", "Authentik SSO", "Git", "ServiceNow", "Jira", "Selenium", "JUnit", "Mockito"],
  },
];

/*
const BARS = [
  { name: "Java / Spring Boot", pct: 90, color: "var(--em-main)" },
  { name: "Docker & Containerization", pct: 88, color: "var(--teal-bright)" },
  { name: "Linux & Homelab Infrastructure", pct: 85, color: "var(--em-neon)" },
  { name: "ReactJS / Next.js", pct: 85, color: "var(--em-bright)" },
  { name: "CI/CD & Cloud (AWS)", pct: 80, color: "var(--teal-main)" },
  { name: "Angular", pct: 80, color: "var(--teal-bright)" },
];

function Bar({ name, pct, color }) {
  const barRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && barRef.current) {
          setTimeout(() => {
            if (barRef.current) barRef.current.style.width = pct + "%";
          }, 300);
        }
      },
      { threshold: 0.5 }
    );
    const el = barRef.current?.parentElement?.parentElement;
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
        <span style={{ color: "var(--tx-secondary)", fontWeight: 500 }}>{name}</span>
        <span style={{ color, fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
        <div
          ref={barRef}
          style={{
            height: "100%",
            width: "0%",
            borderRadius: 3,
            transition: "width 1s ease-out",
            background: `linear-gradient(to right, ${color}, ${color}80)`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}
*/

const Skills = () => {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("active"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="c-space my-20">
      {/* Section header */}
      <div className="reveal" style={{ marginBottom: "3.5rem" }}>
        <div className="sec-divider mb-8" />
        <p className="sec-tag">/ Skills</p>
        <h2 className="head-text">
          Tech <span className="gradient-text">Stack</span>
        </h2>
      </div>

      {/* Skills grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        {CATS.map(({ id, title, color, skills }) => (
          <div
            key={id}
            className="glass-card reveal"
            style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: color,
                  boxShadow: `0 0 8px ${color}`,
                }}
              />
              <h3
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--tx-primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {title}
              </h3>
            </div>
            <div style={{ height: 1, background: `linear-gradient(to right, ${color}50, transparent)` }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {skills.map((s) => (
                <span
                  key={s}
                  className="skill-tag"
                  style={{ color, borderColor: `${color}30`, background: `${color}0d` }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = `${color}70`;
                    el.style.background = `${color}1a`;
                    el.style.boxShadow = `0 0 10px ${color}30`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = `${color}30`;
                    el.style.background = `${color}0d`;
                    el.style.boxShadow = "none";
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Proficiency bars - hidden for now */}
      {/*
      <div className="glass-card reveal" style={{ padding: "2rem 2.5rem" }}>
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--tx-dim)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "1.5rem",
          }}
        >
          Core Proficiency
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {BARS.map((b) => (
            <Bar key={b.name} {...b} />
          ))}
        </div>
      </div>
      */}
    </section>
  );
};

export default Skills;
