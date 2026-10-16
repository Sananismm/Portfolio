"use client";

import { useEffect, useRef } from "react";
import type { VisualKind } from "@/lib/content";
import { DENSITY_RAMP, ecgValue, sampleImage, subscribeFrame, type BrightnessMap } from "@/lib/ascii";
import { useMotion } from "./motion";

type Props = { kind: VisualKind; className?: string; abstract?: boolean; label?: string };

export function AsciiCanvas({ kind, className = "", abstract = false, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -1000, y: -1000, active: false });
  const { paused, reduced } = useMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let width = 0, height = 0, cols = 0, rows = 0, cellW = 0, cellH = 0;
    let map: BrightnessMap | null = null;
    let source: HTMLImageElement | null = null;
    let visible = false;
    let disposed = false;
    let unsubscribe: (() => void) | undefined;
    let startTime = 0;
    let currentTime = 0;
    let pointerStrength = 0;
    const palette = Array.from({ length: 24 }, (_, i) => `rgba(155,204,175,${0.12 + i / 23 * 0.81})`);
    const isPortrait = kind === "portrait";
    const motionOff = paused || reduced;

    function draw(time: number) {
      if (!width || !context) return;
      if (!startTime) startTime = time;
      currentTime = time;
      const t = motionOff ? 3 : (time - startTime) / 1000;
      pointerStrength += ((pointer.current.active ? 1 : 0) - pointerStrength) * 0.12;
      context.clearRect(0, 0, width, height);
      context.font = `${Math.max(5, cellH * 0.92)}px "IBM Plex Mono", monospace`;
      context.textBaseline = "top";
      if (isPortrait && map) {
        const scan = (t * 0.035) % 1;
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const index = y * cols + x;
            let value = map.values[index];
            if (value < 0.035) continue;
            let px = x * cellW, py = y * cellH;
            const dx = px - pointer.current.x, dy = py - pointer.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (!motionOff && distance < 95) {
              const force = Math.pow(1 - distance / 95, 2) * 11 * pointerStrength * (0.8 + Math.sin(distance * 0.05 - t * 4) * 0.2);
              px += dx / Math.max(1, distance) * force;
              py += dy / Math.max(1, distance) * force;
              value += force * 0.012;
            }
            if (abstract) {
              px += Math.sin(y * 0.12 + t) * (18 + value * 25);
              py += Math.cos(x * 0.08 + t * 0.7) * 16;
              value *= 0.65 + Math.sin(x * 0.24 + y * 0.13 + t) * 0.32;
            }
            const scanLight = Math.max(0, 1 - Math.abs(y / rows - scan) * 32) * 0.16;
            const edgeFade = Math.min(1, x / 9, (cols - x) / 9, (rows - y) / 10);
            const shade = Math.min(23, Math.max(0, Math.floor((value + scanLight) * 23 * edgeFade)));
            context.fillStyle = palette[shade];
            const assembling = !motionOff && t < 0.65 && index % 9 === Math.floor(t * 15) % 9;
            const flicker = assembling || (!motionOff && ((index * 17 + Math.floor(t * 3)) % 311 === 0)) ? 1 : 0;
            context.fillText(DENSITY_RAMP[Math.min(DENSITY_RAMP.length - 1, Math.floor(value * (DENSITY_RAMP.length - 1)) + flicker)], px, py);
          }
        }
        return;
      }
      if (isPortrait) return; // The precomputed SVG stays visible until image decoding completes.
      const maxX = cols - 1, maxY = rows - 1;
      const hoverX = pointer.current.x / Math.max(width, 1);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / maxX, ny = y / maxY;
          const u = (nx - 0.5) * 2, v = (ny - 0.5) * 2;
          let value = 0;
          if (kind === "vision") {
            const eye = (ex: number) => Math.abs(Math.pow((u - ex) / 0.26, 2) + Math.pow((v + 0.04) / (0.12 + 0.012 * Math.sin(t)), 2) - 1);
            const outline = Math.abs(u * u / 0.47 + (v + 0.03) * (v + 0.03) / 0.8 - 1);
            const iris = Math.min(Math.hypot(u - 0.29, v + 0.04), Math.hypot(u + 0.29, v + 0.04));
            value = Math.max(Math.max(0, 1 - Math.min(eye(-0.29), eye(0.29)) * 3), Math.max(0, 1 - Math.abs(iris - 0.065) * 30), Math.max(0, 1 - outline * 12) * 0.23);
            if (Math.abs(v - 0.38 - Math.abs(u) * 0.2) < 0.023 && Math.abs(u) < 0.23) value = 0.45;
            if (Math.abs(u) < 0.025 && v > -0.02 && v < 0.25) value = 0.4;
            if ((x % 11 === 0 || y % 8 === 0) && outline < 0.8) value = Math.max(value, 0.1);
          } else if (kind === "lora") {
            const band = Math.sin(nx * 19 - ny * 13 + t * 0.4) * Math.sin(ny * 8 + nx * 5);
            const envelope = Math.pow(Math.sin(nx * Math.PI), 0.5) * Math.sin(ny * Math.PI);
            value = Math.pow(Math.max(0, band), 2) * envelope;
            if ((x + y * 2) % 19 === 0) value += envelope * 0.2;
          } else if (kind === "ecg") {
            const phase = (nx * 2.6 - t * 0.06 + 10) % 1;
            const trace = 0.56 - ecgValue(phase) * 0.51;
            value = Math.max(0, 1 - Math.abs(ny - trace) * rows * 0.48);
            value = Math.max(value, Math.max(0, 1 - Math.abs(ny - trace) * rows * 0.15) * 0.17);
            if (y % 8 === 0 && x % 4 === 0) value = Math.max(value, 0.08);
          } else if (kind === "speech") {
            const envelope = Math.pow(Math.sin(nx * Math.PI), 1.8) * (0.3 + Math.pow(Math.sin(nx * 19 + t * 0.4), 2) * 0.7);
            const amplitude = Math.abs(v);
            if (amplitude < envelope * 0.76 && x % 2 === 0) value = (0.26 + Math.sin(nx * 65 + t) * 0.2) * (1 - amplitude);
            if (Math.abs(amplitude - envelope * 0.76) < 0.028) value = 0.75;
          } else {
            const signalA = 0.5 + Math.sin(nx * 15 + t * 0.55 + Math.max(0, hoverX) * 0.25) * 0.28;
            const signalB = 0.5 + Math.cos(nx * 15 + t * 0.55) * 0.28;
            const distance = Math.min(Math.abs(ny - signalA), kind === "wave" ? 1 : Math.abs(ny - signalB));
            value = Math.max(0, 1 - distance * rows * 0.43);
            if (kind === "wave") value *= 0.6 + nx * 0.4;
          }
          if (value < 0.055) continue;
          const alpha = Math.min(23, Math.floor(value * 23));
          context.fillStyle = palette[alpha];
          const glyphIndex = Math.min(DENSITY_RAMP.length - 1, Math.max(1, Math.floor(value * 12 + Math.sin(x + y + t * 0.3))));
          context.fillText(DENSITY_RAMP[glyphIndex], x * cellW, y * cellH);
        }
      }
    }

    function resize() {
      if (!canvas || !context) return;
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      // Route transitions and hidden ancestors can briefly report a zero-sized box.
      if (width <= 0 || height <= 0 || !Number.isFinite(width + height)) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(12, Math.floor(width / (isPortrait ? (width < 400 ? 4.7 : 4.3) : 6.3)));
      cellW = width / cols; cellH = cellW * 1.7;
      rows = Math.max(5, Math.floor(height / cellH));
      if (source?.complete && source.naturalWidth) map = sampleImage(source, cols, rows);
      draw(currentTime || performance.now());
    }
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      unsubscribe?.(); unsubscribe = undefined;
      if (visible && !motionOff) unsubscribe = subscribeFrame(draw);
      if (visible) draw(performance.now());
    }, { rootMargin: "40px" });
    intersection.observe(canvas);
    if (isPortrait) {
      source = new Image();
      source.onload = () => {
        if (disposed) return;
        resize();
        canvas.dataset.loaded = "true";
      };
      source.onerror = () => { if (!disposed) canvas.dataset.loaded = "false"; };
      source.src = "/portrait.jpg";
    }
    void document.fonts.ready.then(() => { if (!disposed) resize(); });
    resize();
    return () => {
      disposed = true;
      observer.disconnect(); intersection.disconnect(); unsubscribe?.();
      if (source) { source.onload = null; source.onerror = null; }
    };
  }, [kind, abstract, paused, reduced]);

  return <canvas ref={canvasRef} className={`ascii-canvas ${className}`} aria-hidden={!label} role={label ? "img" : undefined} aria-label={label}
    onPointerMove={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); pointer.current.x = event.clientX - bounds.left; pointer.current.y = event.clientY - bounds.top; pointer.current.active = true; }}
    onPointerLeave={() => { pointer.current.active = false; }}>
    {label || "Decorative procedural ASCII signal visualization."}
  </canvas>;
}
