"use client";
import { navLinks } from "@/constants";
// import Link from "next/link";
import { Link } from "react-scroll";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const toggleMenu = () => setIsOpen(!isOpen);
  const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <header className="text-white fixed top-0 left-0 right-0 bg-black/90 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mx-auto py-5 c-space">
          <Link
            href="/"
            className="text-emerald-500 font-bold text-2xl hover:text-white transition-colors"
          >
            {/* Chairiel */}
            <img src="assets/logo.png" alt="Logo" className="h-12 w-24" />
          </Link>

          <button
            onClick={toggleMenu}
            className="sm:hidden text-neutral-400 hover:text-white focus:outline-none flex"
            aria-label="Toggle Menu"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              alt="toggle"
              className="h-6 w-6"
            />
          </button>

          <nav className="hidden sm:flex">
            <NavItems />
          </nav>
        </div>
      </div>

      {/* mobile */}
      <div className={`nav-sidebar ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        <nav className="p-5">
          <NavItems />
        </nav>
      </div>
    </header>
  );
};

const NavItems = () => {
  return (
    <ul className="nav-ul font-semibold">
      {/* {["Home", "About", "Projects", "Contact"].map((item, index) => (
        <li key={index} className="nav-li">
          <Link href="/" className="nav-li_a">
            {item}
          </Link>
        </li>
      ))} */}
      {navLinks.map(({ id, href, name, to }) => (
        <li key={id} className="nav-li">
          <Link
            href={href}
            className="nav-li_a"
            onClick={() => {}}
            activeClass="active"
            smooth={true}
            spy={true}
            to={to}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
