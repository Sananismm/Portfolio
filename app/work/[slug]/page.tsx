import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/site-chrome";
import { AsciiCanvas } from "@/components/ascii-canvas";
import { projects } from "@/lib/content";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const selected = projects.find((item) => item.slug === slug);
  return { title: selected?.title || "Project", description: selected?.description };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <div id="top"><Header detail /><main id="main" className="case-study shell">
    <Link href="/#work" className="text-link mono case-back">← BACK TO SELECTED WORK</Link>
    <div className="case-eyebrow mono"><span>CASE STUDY / {project.number}</span><span>{project.category} {project.year ? `/ ${project.year}` : ""}</span></div>
    <h1>{project.title}<span>.</span></h1><p className="case-summary">{project.description}</p>
    <div className="case-art"><AsciiCanvas kind={project.visual} /><span className="mono">FIG. {project.number} / PROCEDURAL SIGNAL STUDY</span></div>
    <div className="case-meta"><div><span className="mono">ROLE / CONTEXT</span><p>{project.role}</p></div><div><span className="mono">HARDWARE / SOFTWARE</span><p>{project.tags.join(" · ")}</p></div></div>
    <div className="case-content"><aside className="mono">THE EXPERIMENT<br /><span>READING THE SYSTEM,<br />ONE LAYER AT A TIME.</span></aside><div>
      <section><h2>Overview</h2><p>{project.overview}</p></section><section><h2>The problem</h2><p>{project.problem}</p></section>
      <section><h2>The approach</h2><ol>{project.approach.map((item, index) => <li key={item}><span className="mono">0{index + 1}</span><p>{item}</p></li>)}</ol></section>
      <section><h2>Methodology</h2><p>{project.methodology}</p></section>
      <section><h2>Documented outcomes</h2><div className="case-results">{project.results.map((result) => <div key={result.label}><strong>{result.value}</strong><span className="mono">{result.label}</span></div>)}</div><p>{project.resultNote}</p></section>
      <section className="case-limitations"><span className="mono">CONTEXT MATTERS</span><h2>Challenges & limitations</h2><p>{project.limitations}</p></section>
    </div></div>
    <Link className="next-project" href={`/work/${next.slug}/`}><span className="mono">NEXT EXPERIMENT / {next.number}</span><h2>{next.title}<span aria-hidden="true">↗</span></h2></Link>
  </main><Footer /></div>;
}
