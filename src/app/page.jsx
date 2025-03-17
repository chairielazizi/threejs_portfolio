import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import React from "react";

const Home = () => {
  return (
    <main className="max-w-6xl mx-auto">
      <Navbar />
      <Main />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
