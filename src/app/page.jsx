import About from "@/components/About";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import React from "react";

const Home = () => {
  return (
    <main className="max-w-6xl mx-auto">
      <Navbar />
      <Main />
      <About />
    </main>
  );
};

export default Home;
