"use client";
import Link from "next/link";
export default function ErrorBoundary({ reset }: { reset: () => void }) {
  return <main id="main" className="not-found shell"><span className="mono">TRANSMISSION INTERRUPTED</span><h1>Let’s reconnect.</h1><p>The page encountered an unexpected error.</p><button className="text-link mono" style={{ background: "none", border: 0, borderBottom: "1px solid var(--accent)" }} onClick={reset}>TRY AGAIN ↗</button><Link href="/" className="mono">RETURN TO THE INDEX</Link></main>;
}
