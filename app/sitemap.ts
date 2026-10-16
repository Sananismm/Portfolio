import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
export const dynamic = "force-static";
const origin = "https://sanan-signal-lab.upbeatcoati64.chatgpt.site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: origin, changeFrequency: "monthly", priority: 1 }, ...projects.map((project) => ({url: `${origin}/work/${project.slug}/`, changeFrequency: "monthly" as const, priority: 0.7}))];
}
