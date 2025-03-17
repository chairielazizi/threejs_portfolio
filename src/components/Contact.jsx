"use client";
import { useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  //   service_1z3xuxb
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send("service_1z3xuxb", "template_tw0r60j");
  };

  return (
    <section className="c-space my-20">
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        <img
          src="/assets/terminal.png"
          alt="terminal background"
          className="absolute min-h-screen inset-0"
        />
        <div className="contact-container">
          <h3 className="head-text text-3xl font-semibold">Hit Me Up</h3>
          <p className="text-lg text-white-600 mt-3">
            Do you have a project or any enquiry in mind?
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 mt-10"
          >
            <label htmlFor="" className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                required
                onChange={handleChange}
                placeholder="Your Full Name"
                className="field-input"
              />
            </label>
            <label htmlFor="" className="space-y-3">
              <span className="field-label">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                required
                onChange={handleChange}
                placeholder="email@example.com"
                className="field-input"
              />
            </label>
            <label htmlFor="" className="space-y-3">
              <span className="field-label">Message</span>
              <textarea
                type="text"
                name="message"
                value={form.message}
                required
                rows={5}
                onChange={handleChange}
                placeholder="Your Message"
                className="field-input"
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
              <MdArrowOutward className="text-2xl" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
