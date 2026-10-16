"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { MotionControl } from "./motion";

const navigation = [["INDEX", "index"], ["WORK", "work"], ["RESEARCH", "research"], ["ABOUT", "about"], ["CONTACT", "contact"]];

export function Header({ detail = false }: { detail?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("index");
  useEffect(() => {
    if (detail) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    navigation.forEach(([, id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, [detail]);
  return <header className="site-header">
    <Link href="/#index" className="wordmark" aria-label="Sanan, homepage">S <span>/.</span></Link>
    <nav aria-label="Main navigation" className={open ? "navigation is-open" : "navigation"} id="main-navigation">
      {navigation.map(([title, id]) => <Link key={id} href={`${detail ? "/" : ""}#${id}`} onClick={() => setOpen(false)} className={`mono nav-link ${!detail && active === id ? "active" : ""}`} aria-current={!detail && active === id ? "location" : undefined}>{title}</Link>)}
    </nav>
    <div className="availability mono"><span className="status-dot" />{profile.availableForCollaboration ? "AVAILABLE FOR COLLABORATION" : profile.availabilityLabel}</div>
    <button className="menu-toggle mono" aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "CLOSE −" : "MENU +"}</button>
  </header>;
}

export function Footer() {
  return <footer className="footer shell">
    <div className="footer-top"><Link href="/#index" className="wordmark" aria-label="Back to homepage">S <span>/.</span></Link><span className="mono">END OF TRANSMISSION<span className="cursor" aria-hidden="true">_</span></span><a href="#top" className="mono back-top">BACK TO TOP ↑</a></div>
    <div className="footer-bottom mono"><span>© 2026 MUHAMMAD SANAN KHAN</span><span>BUILT AT THE INTERSECTION OF SIGNAL & SYSTEM.</span><MotionControl /></div>
  </footer>;
}
