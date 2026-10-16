# Verification — 17 October 2026

## Scope

Visitor opens the portfolio → explores image-derived ASCII and procedural signals → navigates to five substantive case studies → returns to sections or follows verified contact destinations. All content is compiled from typed local data; there is no API, database, form submission, or secret required.

## Completed checks

| Check | Result / evidence |
| --- | --- |
| Production build | `npm run build` passed with Next.js 16.4.2; homepage, all five project pages, sitemap, robots, and not-found page generated. |
| TypeScript | `npm run typecheck` passed, no diagnostics. |
| ESLint | `npm run lint` passed, no warnings or errors. |
| Actual static output | Served `out/` using `npm start` at localhost:4173, then tested it in the browser. |
| Desktop composition | Visually inspected at 1440 × 960: hero, portrait, asymmetric projects, and About comparison. |
| Phone composition | Visually inspected homepage and LoRa detail at 390 × 844. |
| Small-screen overflow | At 320 × 760, homepage and all five case studies reported `documentElement.scrollWidth <= innerWidth`. |
| Mobile navigation | Menu opened, INDEX navigation returned to homepage, and the menu closed with `aria-expanded=false`. |
| Portrait engine | Image decode completed with `data-loaded=true`; recognizable hair, glasses, and facial structure inspected in the live ASCII rendering. |
| Portrait transformation | Click switched to signal mode with `aria-pressed=true`; a second click restored the portrait. |
| Global motion | Pause/resume buttons updated together, and the motion root changed to `data-motion=paused`. |
| Comparison keyboard | End set the range to 100 and clip to 0%; Home set it to 0 and clip to 100%. |
| Production route transitions | Clicked through driver drowsiness → LoRa → ECG → speech → I/Q; URLs and rendered h1 matched on every route. |
| Browser console | No warnings or errors during the final production navigation run after the resize fix. |
| HTTP | Homepage, five project routes, original image, ASCII fallback, WebP, OG image, icon, sitemap, and robots all returned 200 with appropriate MIME types. |
| Contact integrity | mailto, GitHub, and LinkedIn hrefs match the supplied CV's PDF link annotations. No external messages were sent. |

## Repairs found during review

- Guarded zero-size Canvas containers during route transitions to prevent invalid image-sampling dimensions. Repeated the five-route production browser test after repair.
- Added Next.js's `data-scroll-behavior` declaration for smooth internal section scrolling.
- Set the metadata origin to the assigned Site address.
- Improved secondary text contrast, body text sizing, and motion-control hit area.
- Replaced incompatible `next start` for static-export mode with a dependency-free server for the built output.

## Verification limits

- System reduced-motion support was reviewed in code and CSS. OS preference emulation was unavailable through the connected browser; manually enabling the OS setting remains a useful final check.
- The connected browser does not provide a representative physical phone performance benchmark. Shared 30 FPS scheduling, viewport pausing, hidden-document frame skipping, cached brightness maps, and smaller mobile grids are implemented, but no measured FPS or Lighthouse score is asserted.
- The static ASCII fallback was visually inspected in the About composition. A browser with Canvas entirely disabled was not available.
- External profile ownership and mail delivery were not tested. Destinations were taken directly from the CV.
- The Sites Windows build helper could not locate its npm shim. The same production build completed successfully using the installed npm command; packaging reuses that verified unchanged output.
