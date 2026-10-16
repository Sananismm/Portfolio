# Sanan / Signal Lab

An experimental, responsive portfolio for Muhammad Sanan Khan. Built with Next.js App Router, React, TypeScript, Tailwind CSS, and Canvas 2D. All five project pages are statically generated.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production, run `npm run build`; the deployable static site is written to `out/`. Use a static host for `out/`, or run `npm start` for a dependency-free production preview at http://localhost:4173.

```sh
npm run typecheck
npm run lint
npm run build
```

## Edit content

- `lib/content.ts` contains the typed profile, verified contacts, five case studies, research experience, and disciplines.
- Availability defaults to an honest neutral status. Set `profile.availableForCollaboration` to `true` when appropriate.
- Facts were transcribed from the supplied two-page CV. Manuscripts remain **in preparation**. LoRa numbers are explicitly synthetic; I/Q delivery is scoped to emitted application frames. Unreported project years and performance numbers are omitted.
- No project repositories were supplied, so project pages link internally; the verified personal GitHub profile appears in About and Contact.
- Social image origin is configured as `metadataBase` in `app/layout.tsx`. Change it when moving to a custom domain.

## Rendering architecture

- `lib/ascii.ts`: luminance sampling, cached typed brightness maps, character ramp, waveform function, and a shared 30 FPS requestAnimationFrame scheduler.
- `components/ascii-canvas.tsx`: device-pixel-ratio-aware glyph drawing, ResizeObserver, IntersectionObserver, and procedural project visuals. No React updates occur per frame.
- `components/motion.tsx`: system reduced-motion preference, session-only initialization, and global motion pause. The page stays usable without storage access.
- `components/portrait.tsx`: keyboard/touch-compatible signal transformation and original/ASCII comparison slider.
- `components/project-card.tsx`: asymmetric project entries that open substantive static case-study routes.
- `public/portrait.jpg`: original, local user-supplied portrait.
- `public/portrait-ascii.svg`: image-derived static ASCII fallback, visible immediately and if Canvas/image decoding is unavailable.
- `public/portrait-study.webp`: optimized local image for the About comparison.
- `scripts/prepare-assets.py`: optional offline asset preparation; requires Python and Pillow. It regenerates the fallback, WebP, and sharing image after replacing the portrait.

The portrait samples the original image to an offscreen Canvas, excludes the white background, maps inverse luminance to glyph density, and preserves the source crop in the fallback. Pointer motion produces a small local ripple. Click, tap, Enter, or Space switches between the portrait and an abstract signal composition. Click again to restore it. The original photo is compared with its ASCII representation using an accessible native range control.

Animations unsubscribe when outside the viewport and skip frames while the document is hidden. A single shared loop caps ambient drawing at 30 FPS. The OS reduced-motion setting produces static frames, disables pointer displacement and the intro, and removes CSS animation and smooth scrolling. The global pause control also freezes canvases and the footer cursor. These visuals are illustrations, not live measurements.

## Manual review

1. At desktop width, move across the portrait, toggle its signal mode, and pause/resume motion.
2. On a phone, open the menu, follow section links, and tap the portrait.
3. Use Tab, Enter, Space, and arrow keys for navigation, portrait mode, motion controls, and the comparison slider.
4. Enable reduced motion in the operating system; check that drawings remain visible and static.
5. Open all five case studies, cycle through their next-project links, and verify the email/GitHub/LinkedIn destinations.
6. Check the photo comparison, original image fallback, and page at narrow and wide sizes.

Browser and production-check evidence is recorded in `VERIFICATION.md`.
