import Link from "next/link";
import type { Project } from "@/lib/content";
import { AsciiCanvas } from "./ascii-canvas";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <Link href={`/work/${project.slug}/`} className={`project-card project-card-${index + 1}`} aria-label={`Read case study: ${project.title}`}>
    <div className="project-visual">
      <div className="visual-corner mono"><span>EXPERIMENT / {project.number}</span><span>{project.year || "AUDIO STUDY"}</span></div>
      <AsciiCanvas kind={project.visual} />
      <div className="visual-bottom mono"><span>{project.visual === "vision" ? "FACIAL LANDMARK GEOMETRY" : project.visual === "lora" ? "DOPPLER / FREQUENCY FIELD" : project.visual === "ecg" ? "P—Q—R—S—T" : project.visual === "speech" ? "AUDIO / FEATURE SPACE" : "IN-PHASE / QUADRATURE"}</span><span className="visual-cross" aria-hidden="true">+</span></div>
      <span className="project-open mono" aria-hidden="true">VIEW STUDY ↗</span>
    </div>
    <div className="project-category mono"><span>{project.category}</span><span>[{project.number}]</span></div>
    <h3>{project.title}<span aria-hidden="true">↗</span></h3>
    <p>{project.description}</p>
    <div className="project-tags mono">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
  </Link>;
}
