import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import React from "react";

const Home = () => {
  return (
    <main className="w-full overflow-x-clip">
      <Navbar />
      <Main />
      <div className="max-w-6xl mx-auto">
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
