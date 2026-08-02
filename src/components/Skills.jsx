"use client";

import { useEffect, useRef } from "react";

const CATS = [
  {
    id: "backend",
    title: "Backend",
    color: "var(--em-main)",
    skills: ["Java", "Spring Boot", "C#", "ASP.NET", "PHP", "Laravel"],
  },
  {
    id: "frontend",
    title: "Frontend",
    color: "var(--teal-bright)",
    skills: ["JavaScript", "TypeScript", "ReactJS", "Next.js", "Vue JS", "Angular"],
  },
  {
    id: "database",
    title: "Database",
    color: "var(--em-bright)",
    skills: ["PostgreSQL", "Oracle SQL", "MySQL", "MongoDB"],
  },
  {
    id: "tools",
    title: "Tools & Testing",
    color: "var(--teal-main)",
    skills: ["Git", "Jira", "Selenium", "JUnit", "Mockito", "ServiceNow"],
  },
];

const BARS = [
  { name: "Java / Spring Boot", pct: 90, color: "var(--em-main)" },
  { name: "ReactJS / Next.js", pct: 85, color: "var(--teal-bright)" },
  { name: "PHP / Laravel", pct: 70, color: "var(--em-bright)" },
  { name: "Angular", pct: 85, color: "var(--teal-main)" },
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

      {/* 4-col skills grid */}
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

      {/* Proficiency bars */}
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
    </section>
  );
};

export default Skills;
