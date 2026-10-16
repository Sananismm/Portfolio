import { Header, Footer } from "@/components/site-chrome";
import { Portrait, PortraitComparison } from "@/components/portrait";
import { AsciiCanvas } from "@/components/ascii-canvas";
import { ProjectCard } from "@/components/project-card";
import { MotionControl } from "@/components/motion";
import { disciplines, experience, profile, projects } from "@/lib/content";

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label mono"><span className="section-marker" aria-hidden="true" />{number} / {children}</div>;
}

export default function Home() {
  return <div id="top"><Header /><main id="main">
    <section id="index" className="hero shell">
      <div className="hero-copy">
        <div className="hero-eyebrow mono"><span className="mini-cross" aria-hidden="true">✳</span> A PERSONAL RESEARCH LABORATORY</div>
        <h1>MUHAMMAD<br /><span>SANAN KHAN</span><span className="headline-period">.</span></h1>
        <div className="hero-statement"><span className="statement-rule" aria-hidden="true" /><h2>Engineering intelligence<br />into real-time systems.</h2></div>
        <p className="hero-description">Electrical Engineering. Computer Vision.<br />Embedded AI. Signal Processing.<br /><span>Working where the digital meets the physical.</span></p>
        <a className="text-link hero-cta mono" href="#work">EXPLORE SELECTED WORK <span aria-hidden="true">↗</span></a>
        <div className="hero-location mono"><span className="coordinate-mark" aria-hidden="true">⊕</span>{profile.location}</div>
      </div>
      <Portrait />
      <div className="hero-foot mono"><a href="#work">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a><span>PERCEPTION / SIGNAL / COMPUTATION</span><MotionControl /></div>
    </section>
    <div className="signal-divider shell" aria-hidden="true"><span className="mono">SIGNAL<br />IN MOTION</span><AsciiCanvas kind="iq" /><span className="mono">CONTINUOUS<br />EXPLORATION</span></div>

    <section id="work" className="work-section shell section-space">
      <div className="section-heading"><div><SectionLabel number="01">SELECTED WORK</SectionLabel><h2>Ideas, tested against<br /><span>the real world.</span></h2></div><p className="section-aside mono">SYSTEMS BUILT TO INTERACT<br />WITH THE REAL WORLD.<br /><span>FIVE SELECTED EXPLORATIONS / 2026</span></p></div>
      <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
      <p className="artwork-note mono"><span aria-hidden="true">↳</span> SIGNAL VISUALS ARE PROCEDURAL ARTWORK, NOT EXPERIMENTAL MEASUREMENTS.</p>
    </section>

    <section id="research" className="research-section shell section-space">
      <div className="section-heading"><div><SectionLabel number="02">RESEARCH & EXPERIENCE</SectionLabel><h2>From theory.<br /><span>Through hardware.</span></h2></div><p className="section-aside">A growing body of work across<br />research labs, embedded tooling,<br />and operational networks.</p></div>
      <div className="experience-ledger">{experience.map((entry, i) => <article className="experience-entry" key={entry.organization}>
        <div className="experience-period mono"><span>[0{i + 1}]</span>{entry.period}<span>{entry.location}</span></div>
        <div className="experience-copy"><h3>{entry.organization}</h3><h4>{entry.role}</h4><p>{entry.description}</p><div className="experience-tags mono">{entry.tags}</div></div>
        <div className="experience-art" aria-hidden="true"><AsciiCanvas kind={entry.visual} /></div>
      </article>)}</div>
      <div className="manuscript-note"><span className="mono">ON THE RESEARCH DESK ↗</span><div><p>A Leakage-Aware Synthetic Feasibility Study of Raw-I/Q Doppler Classification for LoRa</p><p>An Integrity-Instrumented Dual-Core IQ Streaming Testbed on the ADRV9364-Z7020</p><span className="mono">BOTH MANUSCRIPTS IN PREPARATION</span></div></div>
    </section>

    <section id="disciplines" className="disciplines-section shell section-space">
      <div className="section-heading"><div><SectionLabel number="03">WHAT I WORK WITH</SectionLabel><h2>Different disciplines.<br /><span>One connected system.</span></h2></div></div>
      <div className="disciplines-grid">{disciplines.map((discipline) => <article className="discipline" key={discipline.number}><div className="discipline-top mono"><span>/{discipline.number}</span><span aria-hidden="true">+</span></div><div className="discipline-art" aria-hidden="true"><AsciiCanvas kind={discipline.visual} /></div><h3>{discipline.title}</h3><p>{discipline.description}</p><div className="discipline-tools mono">{discipline.tools}</div></article>)}</div>
    </section>

    <section id="about" className="about-section shell section-space">
      <div className="about-image"><PortraitComparison /><div className="about-photo-meta mono"><span>FIG. 002 / SOURCE & REPRESENTATION</span><span>ISLAMABAD, PK</span></div></div>
      <div className="about-copy"><SectionLabel number="04">THE HUMAN BEHIND THE SYSTEM</SectionLabel><h2>A little less abstract.<br /><span>A little more me.</span></h2><p className="about-intro">I’m Sanan, an Electrical Engineering undergraduate at NUST in Islamabad.</p><p>I’m interested in intelligent systems that have to work with real signals and real hardware. That takes me between computer vision, wireless experiments, physiological signals, and the embedded systems that connect them.</p><p>My work follows the path from acquisition to inference: collecting data carefully, understanding what a model has learned, and finding out what happens when it runs on a device.</p><div className="education-row"><span className="mono">CURRENTLY</span><div><strong>National University of Sciences<br />and Technology</strong><span className="mono">B.E. ELECTRICAL ENGINEERING<br />2023 — EXPECTED 2027</span></div></div><a href={profile.github} target="_blank" rel="noreferrer" className="text-link mono">MORE OF MY WORK ON GITHUB <span aria-hidden="true">↗</span></a></div>
    </section>

    <section id="contact" className="contact-section shell section-space"><div className="contact-eyebrow mono"><span className="section-marker" aria-hidden="true" />05 / OPEN A CONVERSATION</div><p className="contact-prompt mono">HAVE SOMETHING INTERESTING?</p><h2>Let’s build it<span>.</span><a href={`mailto:${profile.email}`} aria-label="Email Sanan" className="contact-arrow">↗</a></h2><div className="contact-bottom"><a href={`mailto:${profile.email}`} className="contact-email">{profile.email}<span aria-hidden="true">↗</span></a><div className="contact-socials mono"><a href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a></div></div></section>
  </main><Footer /></div>;
}
