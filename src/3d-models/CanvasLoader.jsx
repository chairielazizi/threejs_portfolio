"use client";
import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const CanvasLoader = () => {
  const [progressVal, setProgressVal] = useState(() => useProgress.getState()?.progress || 0);

  useEffect(() => {
    // Subscribe to store updates outside the render phase
    const unsubscribe = useProgress.subscribe((state) => {
      queueMicrotask(() => {
        setProgressVal(state.progress);
      });
    });
    return () => unsubscribe();
  }, []);

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className="canvas-loader" />
      <p
        style={{
          fontSize: "14px",
          color: "#f1f1f1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progressVal !== 0 ? `${progressVal.toFixed(2)}%` : "Loading..."}
      </p>
    </Html>
  );
};

export default CanvasLoader;
