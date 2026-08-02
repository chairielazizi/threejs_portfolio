"use client";
import { navLinks } from "@/constants";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <header
        className="font-primary fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(5,13,9,0.94)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(52,211,153,.1)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,.4)" : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto c-space flex justify-between items-center h-[72px]">
          {/* Logo */}
          <Link
            to="home"
            smooth={true}
            className="cursor-pointer"
          >
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={96}
              height={48}
              className="drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex">
            <NavItems />
          </nav>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="sm:hidden flex flex-col gap-[5px] p-2 border-none bg-transparent cursor-pointer"
            aria-label="Toggle Menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-[22px] h-[2px] rounded-sm transition-all duration-300"
                style={{
                  background: "var(--em-bright)",
                  transform: isOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px,5px)"
                      : i === 2
                      ? "rotate(-45deg) translate(5px,-5px)"
                      : "none"
                    : "none",
                  opacity: isOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out sm:hidden"
          style={{
            maxHeight: isOpen ? "400px" : "0",
            background: "rgba(5,13,9,.97)",
            borderTop: "1px solid rgba(52,211,153,.08)",
          }}
        >
          <nav className="p-5">
            <NavItems mobile onClose={() => setIsOpen(false)} />
          </nav>
        </div>
      </header>
    </>
  );
};

const NavItems = ({ mobile = false, onClose }) => {
  return (
    <ul
      className={
        mobile
          ? "flex flex-col gap-2 list-none"
          : "flex flex-row items-center gap-1 list-none"
      }
    >
      {navLinks.map(({ id, name, to }) => (
        <li key={id}>
          <Link
            to={to}
            smooth={true}
            spy={true}
            offset={-80}
            activeClass="nav-active"
            onClick={onClose}
            className={`nav-li_a relative block cursor-pointer transition-colors duration-200 text-sm font-medium ${
              mobile
                ? "py-3 px-4 rounded-xl hover:bg-[rgba(52,211,153,.08)]"
                : "py-2 px-4 rounded-lg"
            }`}
            style={{ color: "var(--tx-secondary)", textDecoration: "none" }}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
