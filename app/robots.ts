import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return { rules: {userAgent: "*", allow: "/"}, sitemap: "https://sanan-signal-lab.upbeatcoati64.chatgpt.site/sitemap.xml" };
}
