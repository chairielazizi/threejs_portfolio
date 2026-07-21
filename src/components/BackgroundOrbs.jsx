import React from "react";

const BackgroundOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 mix-blend-screen">
      <div className="absolute top-[10%] left-[10%] w-[15vw] h-[15vw] max-w-[200px] max-h-[200px] bg-emerald-500/30 rounded-full blur-[80px] animate-float-1" />
      <div className="absolute top-[30%] right-[10%] w-[12vw] h-[12vw] max-w-[150px] max-h-[150px] bg-cyan-500/30 rounded-full blur-[60px] animate-float-2" />
      <div className="absolute bottom-[10%] left-[40%] w-[18vw] h-[18vw] max-w-[250px] max-h-[250px] bg-emerald-600/30 rounded-full blur-[90px] animate-float-3" />
    </div>
  );
};

export default BackgroundOrbs;
