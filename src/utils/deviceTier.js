"use client";

import { useEffect, useState, useRef } from "react";

// Patterns matching software renderers and entry/mid-tier mobile GPUs
// (e.g., Mali-G57 in Helio G99 / Unihertz Tank 2, Adreno 610, PowerVR, SwiftShader)
const LOW_END_GPU_RE =
  /swiftshader|llvmpipe|software|mesa|microsoft basic|mali-t|mali-4|mali-g3|mali-g5|mali-g6(?!15|20)|adreno\s*\(tm\)\s*(3\d\d|4\d\d|5\d\d|61\d|62\d|63\d|64\d)|powervr|tegra|img\s*bx/i;

/**
 * Inspects actual WebGL GPU renderer string + hardware/network signals
 * without leaking a persistent WebGL context.
 */
export function detectDeviceTier() {
  if (typeof window === "undefined") {
    return { isLite: false, reason: "ssr", renderer: "" };
  }

  // 1. Respect reduced-motion & save-data preferences
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
    return { isLite: true, reason: "reduced-motion", renderer: "" };
  }

  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn?.saveData || conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") {
    return { isLite: true, reason: "save-data", renderer: "" };
  }

  // 2. Inspect actual GPU via temporary WebGL context (immediately released)
  let renderer = "";
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false });
    if (!gl) {
      return { isLite: true, reason: "no-webgl", renderer: "" };
    }
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      renderer = String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "");
    }
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    // Ignore probe errors and fall back to hardware heuristics
  }

  if (renderer && LOW_END_GPU_RE.test(renderer)) {
    return { isLite: true, reason: "low-end-gpu", renderer };
  }

  // 3. Fallback heuristics for mobile devices when GPU string is masked
  const isCoarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches;
  const mem = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;

  if (isCoarsePointer && ((typeof mem === "number" && mem <= 4) || (typeof cores === "number" && cores <= 4))) {
    return { isLite: true, reason: "mobile-low-spec", renderer };
  }

  return { isLite: false, reason: "capable", renderer };
}

/**
 * Tracks whether a section is near/inside the viewport so heavy WebGL scenes
 * only mount when scrolled near and pause completely when off-screen.
 */
export function useViewportVisibility(rootMargin = "350px 0px") {
  const ref = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setHasEntered(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        if (visible) setHasEntered(true);
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, hasEntered, isVisible };
}
