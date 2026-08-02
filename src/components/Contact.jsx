"use client";
import { useRef, useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import emailjs from "@emailjs/browser";

const CONTACTS = [
  {
    id: "contact-email",
    label: "Email",
    value: "chairielazizi@gmail.com",
    href: "mailto:chairielazizi@gmail.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: "contact-github",
    label: "GitHub",
    value: "chairielazizi",
    href: "https://github.com/chairielazizi",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "contact-linkedin",
    label: "LinkedIn",
    value: "chairielazizi",
    href: "https://www.linkedin.com/in/chairielazizi/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("active"), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_1z3xuxb",
        "template_tw0r60j",
        {
          from_name: form.name,
          to_name: "Chairiel Azizi",
          from_email: form.email,
          to_email: "chairielazizi@gmail.com",
          message: form.message,
        },
        `${process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY}`
      );
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="c-space my-20 relative">
      
      <div className="sec-divider"></div>

      {/* Header */}
      <div className="reveal text-center mb-14">
        <p className="sec-tag">/ My Contact</p>
        <h2 className="head-text text-3xl font-semibold">
          Hit Me <span className="gradient-text">Up</span>
        </h2>
        <p style={{ color: "var(--tx-secondary)", fontSize: "1.05rem", marginTop: "0.75rem" }}>
          Do you have a project or any enquiry in mind? Let&apos;s talk!
        </p>
      </div>

      {/* Two-column layout */}
      <div className="contact-layout" style={{ display: "grid", gap: "1.5rem" }}>

        {/* Left — contact info cards */}
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {CONTACTS.map((c) => (
            <a
              key={c.id}
              href={c.href}
              id={c.id}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass-card"
              style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1.1rem 1.25rem", textDecoration: "none",
                transition: "transform .25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12, display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "rgba(52,211,153,.1)", color: "var(--em-main)", flexShrink: 0,
              }}>
                {c.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--tx-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{c.label}</p>
                <p style={{ fontSize: "0.9rem", color: "var(--tx-secondary)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.value}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--tx-dim)", flexShrink: 0 }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ))}
        </div>

        {/* Right — EmailJS form */}
        <form
          ref={formRef}
          id="contact-form"
          onSubmit={handleSubmit}
          className="glass-card reveal"
          style={{ padding: "2rem 2.25rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <div style={{ display: "grid", gap: "1.25rem" }} className="form-row">
            {[
              { id: "form-name", name: "name", type: "text", label: "Full Name", ph: "Your Full Name" },
              { id: "form-email", name: "email", type: "email", label: "Email", ph: "email@example.com" },
            ].map((f) => (
              <div key={f.id} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor={f.id} style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--tx-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{f.label}</label>
                <input type={f.type} id={f.id} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.ph} required className="field-input" />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="form-message" style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--tx-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Message</label>
            <textarea id="form-message" name="message" value={form.message} onChange={handleChange} placeholder="Your message..." rows={5} required className="field-input" style={{ resize: "none" }} />
          </div>
          <button type="submit" id="submit-btn" className="field-btn" disabled={loading}>
            {loading ? "Sending…" : sent ? "✓ Message Sent!" : "Send Message"}
            {!loading && !sent && <MdArrowOutward className="text-xl" />}
          </button>
        </form>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-layout { grid-template-columns: 1fr 1.6fr !important; }
          .form-row { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
