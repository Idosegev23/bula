# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Bulla Studio — a Hebrew (RTL), React + TypeScript + Vite marketing site for a carpentry/design studio. Content and UI copy are in Hebrew; code comments in the repo are also often in Hebrew. Deployed on Vercel (SPA rewrites configured in [vercel.json](vercel.json)).

## Commands

```bash
npm run dev       # Vite dev server (HMR)
npm run build     # tsc -b && vite build — TypeScript project references must pass before bundling
npm run lint      # ESLint (flat config, typescript-eslint + react-hooks + react-refresh)
npm run preview   # Preview production build
```

There is no test runner configured. `npm run build` is the only type-check; a TypeScript error fails the build.

## Architecture

**Single-page app, client-side routed.** [src/main.tsx](src/main.tsx) mounts `<App />` in `StrictMode`. [src/App.tsx](src/App.tsx) wraps everything in `BrowserRouter` and renders a shared shell: `<Spinner />` (GSAP intro overlay, dispatches a `spinner:finished` CustomEvent on the window), `<Header />`, `<Routes>`, `<Footer />`. Routes are flat — no nested routes, no lazy loading, no layout routes. The homepage is a single `<HorizontalScrollSections imageUrl="/homep.png" />` component that implements the whole hero/scroll experience inline.

**Component folders** under [src/components/](src/components/):
- `Layout/` — `Header`, `Footer`
- `Pages/` — one `.tsx` per route (`Services`, `Projects`, `Architects`, `About`, `PrivateClients`, `BusinessClients`, `Contact`). `ServicesIndex.tsx` is a landing/hub variant.
- `UI/` — all reusable and page-specific visual components. This folder mixes truly generic primitives (`Spinner`, `ScrollToTop`, `MagneticHover`) with page-scoped sections (`Hero`, `Testimonials`, `ComplexitySection`, `TargetAudiences`, `CTASection`, `FeaturedProjects`). Files ending in `.example.tsx` are reference/demo variants, not wired into routes — don't assume they're dead code, but they aren't imported by the app either.
- `Accessibility/` — `AccessibilityProvider` exists but is currently commented out in [App.tsx](src/App.tsx); the `<SocialFloat />` and `<FloatingServicesFooter />` floaters are likewise commented out. Check App.tsx before assuming these render.

**Styling: CSS Modules + CSS custom properties.** Each component has a co-located `ComponentName.module.css`. Design tokens (colors, spacing, typography, z-index, header height) live in [src/styles/variables.css](src/styles/variables.css) and must be imported via global CSS. Global resets/base in [src/styles/globals.css](src/styles/globals.css). The palette is monochrome (black/white/grays) — don't introduce color accents without checking. RTL is assumed throughout (Hebrew content); verify layout flips when editing CSS.

**Animation stack:** GSAP (intro spinner, scroll choreography), `roughjs` + `opentype.js` (hand-drawn/sketch SVG effects — see `RoughHandwriteText`, `RoughLogo`, `RoughBracket`), `lottie-react` with `lottie/tape-measure.json`. Micro-interactions follow the "minimal, tasteful" brief from [memory-bank/projectbrief.md](memory-bank/projectbrief.md) — avoid heavy motion.

**Instagram integration:** [src/services/instagramService.ts](src/services/instagramService.ts) calls Instagram Graph API with a 5-minute in-memory cache, reading config from `VITE_INSTAGRAM_ACCESS_TOKEN`, `VITE_INSTAGRAM_USER_ID`, `VITE_POSTS_TO_SHOW`. Setup steps (token generation, test user, 60-day token expiry) are in [INSTAGRAM_API_SETUP.md](INSTAGRAM_API_SETUP.md). When not configured, `InstagramWidget` falls back gracefully — don't add hard errors for missing env vars.

## Conventions

- **TypeScript strict mode is on** ([tsconfig.json](tsconfig.json) references `tsconfig.app.json` / `tsconfig.node.json`). `npm run build` runs `tsc -b` first; treat type errors as build-breaking.
- **Mobile breakpoint is 768px**, commonly detected via `window.innerWidth <= 768` with a resize listener rather than CSS-only (see `HorizontalScrollSections`). Mobile and desktop often render entirely different JSX trees, not just different CSS — when changing a component, check whether it branches on `isMobile`.
- **Hebrew comments are normal** and should be preserved. When adding comments (only when the WHY is non-obvious per repo guidance), matching the existing language is fine.
- **File naming:** `PascalCase.tsx` + `PascalCase.module.css` co-located. Don't split styles into a separate folder.

## Memory bank

[memory-bank/](memory-bank/) contains product/design briefs (projectbrief, productContext, systemPatterns, techContext, activeContext, progress) written in Hebrew. `systemPatterns.md` and `techContext.md` describe an *intended* architecture from early planning; the actual code has diverged (e.g. components aren't split the way `systemPatterns.md` shows). Treat these as product/brand intent, not a source of truth for code structure — read the code for structure.
