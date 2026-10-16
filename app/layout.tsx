import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import { MotionProvider, Initialization } from "@/components/motion";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sanan-signal-lab.upbeatcoati64.chatgpt.site"),
  title: { default: "Muhammad Sanan Khan — Signals, Perception & Real-Time Systems", template: "%s — Muhammad Sanan Khan" },
  description: "The personal research laboratory of Muhammad Sanan Khan. Electrical Engineering at NUST, computer vision, embedded AI, signal processing, and wireless systems.",
  authors: [{ name: "Muhammad Sanan Khan" }],
  openGraph: { title: "Muhammad Sanan Khan / Signal Lab", description: "Engineering intelligence into real-time systems. Explore selected work in computer vision, embedded AI, DSP, and wireless systems.", type: "website", locale: "en_US", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Muhammad Sanan Khan — Engineering intelligence into real-time systems" }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};
export const viewport: Viewport = { themeColor: "#080A09", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><a className="skip-link" href="#main">Skip to content</a><MotionProvider><Initialization />{children}</MotionProvider></body></html>;
}
