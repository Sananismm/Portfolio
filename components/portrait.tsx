"use client";

import { useState } from "react";
import Image from "next/image";
import { AsciiCanvas } from "./ascii-canvas";

export function Portrait() {
  const [abstract, setAbstract] = useState(false);
  return <div className={`portrait-instrument ${abstract ? "is-abstract" : ""}`}>
    <div className="portrait-top mono"><span><span className="status-dot" /> LIVE ASCII RENDER</span><span>FIG. 001</span></div>
    <div className="portrait-art">
      <span className="crosshair crosshair-tl" aria-hidden="true">+</span><span className="crosshair crosshair-tr" aria-hidden="true">+</span>
      <button className="portrait-button" onClick={() => setAbstract(!abstract)} aria-pressed={abstract} aria-label={abstract ? "Restore recognizable ASCII portrait" : "Transform ASCII portrait into signal"}>
        <span className="sr-only">ASCII self-portrait of Muhammad Sanan Khan, rendered from his photograph.</span>
        <div className="portrait-layer"><Image className="ascii-fallback" src="/portrait-ascii.svg" width={600} height={696} alt="" priority unoptimized /><AsciiCanvas kind="portrait" abstract={abstract} /></div>
      </button>
      <span className="portrait-axis mono" aria-hidden="true">Y / 0.00 — 1.00</span>
      <span className="portrait-coordinate mono" aria-hidden="true">33.6844° N<br />73.0479° E</span>
      <span className="crosshair crosshair-bl" aria-hidden="true">+</span><span className="crosshair crosshair-br" aria-hidden="true">+</span>
    </div>
    <div className="portrait-bottom mono"><span>{abstract ? "SIGNAL / ABSTRACT" : "LUMINANCE → CHARACTER"}</span><span>CLICK TO {abstract ? "RECONSTRUCT" : "DECONSTRUCT"} ↗</span></div>
  </div>;
}

export function PortraitComparison() {
  const [split, setSplit] = useState(45);
  return <figure className="comparison">
    <div className="comparison-image">
      <Image src="/portrait-study.webp" width={720} height={835} alt="Muhammad Sanan Khan, wearing glasses and a black shirt" className="original-portrait" sizes="(max-width: 700px) 90vw, 36vw" loading="lazy" />
      <div className="comparison-ascii" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }} aria-hidden="true"><Image src="/portrait-ascii.svg" width={600} height={696} alt="" unoptimized /></div>
      <div className="comparison-line" style={{ left: `${split}%` }} aria-hidden="true"><span>↔</span></div>
      <span className="comparison-label mono" aria-hidden="true">ASCII</span><span className="comparison-label comparison-label-right mono" aria-hidden="true">ORIGINAL</span>
    </div>
    <figcaption><label htmlFor="portrait-comparison" className="mono">THE SAME PERSON. A DIFFERENT REPRESENTATION.</label><input id="portrait-comparison" aria-label="Portrait comparison: percentage shown as ASCII" type="range" min="0" max="100" value={split} onChange={(event) => setSplit(Number(event.target.value))} /></figcaption>
  </figure>;
}
