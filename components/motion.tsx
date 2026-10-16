"use client";

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";

const MotionContext = createContext({ paused: false, reduced: false, toggle: () => {} });
function subscribeReduced(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const getReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getServerReduced = () => false;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getServerReduced);
  const [paused, setPaused] = useState(false);
  return <MotionContext.Provider value={{ paused, reduced, toggle: () => setPaused((value) => !value) }}><div className="motion-root" data-motion={paused || reduced ? "paused" : "playing"}>{children}</div></MotionContext.Provider>;
}
export function useMotion() { return useContext(MotionContext); }

export function MotionControl() {
  const { paused, reduced, toggle } = useMotion();
  return <button className="motion-control mono" onClick={toggle} aria-pressed={paused} disabled={reduced} aria-label={reduced ? "Motion reduced by system preference" : paused ? "Resume animations" : "Pause animations"}>
    <span aria-hidden="true">{paused || reduced ? "▷" : "Ⅱ"}</span> {reduced ? "REDUCED MOTION" : paused ? "RESUME MOTION" : "PAUSE MOTION"}
  </button>;
}

export function Initialization() {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const hide = () => { if (element.current) element.current.hidden = true; };
    try {
      if (sessionStorage.getItem("sanan:initialized") || getReduced()) { hide(); return; }
      sessionStorage.setItem("sanan:initialized", "1");
    } catch { /* Storage restrictions do not block the page. */ }
    const timer = window.setTimeout(hide, 850);
    return () => clearTimeout(timer);
  }, []);
  return <div ref={element} className="initialization mono" aria-hidden="true"><span className="status-dot" /> SANAN / SYSTEM ONLINE</div>;
}
