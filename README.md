# Pannilage Dilshan — AI Portfolio

A high-performance, interactive 3D portfolio built with React, Three.js, and GSAP. Features a WebGL particle field, scroll-driven animations, and a morphing image panel — all fully responsive.

---

## Tech Stack

| Layer | Library |
|---|---|
| UI Framework | React 18 |
| 3D Rendering | Three.js · @react-three/fiber · @react-three/drei |
| Post-processing | @react-three/postprocessing (Bloom, Chromatic Aberration) |
| Animations | GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis |
| Build Tool | Vite 5 |

---

## Features

- **WebGL Particle Field** — 2 200-particle ambient background rendered on a fixed canvas layer
- **3D Floating Models** — Helix DNA, Project Orb, and Wormhole Orb that react to scroll progress
- **Scroll-driven Image Morph** — fixed right panel crossfades between hero portrait and about image as you scroll
- **GSAP ScrollTrigger** — section reveals, parallax, and pinned animations
- **Custom Cursor** — dot + ring cursor with hover expansion (desktop only)
- **Responsive** — full mobile layout with fallback images when the 3D panel is hidden

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

---

## Project Structure

```
src/
├── assets/          # Static images (portrait, about photo)
├── components/
│   ├── HTMLOverlay.jsx   # All HTML sections (Hero, About, Experience, Projects, Contact)
│   ├── Scene3D.jsx       # Three.js canvas + post-processing
│   ├── FloatingModel.jsx # 3D models (HelixDNA, ProjectOrb, WormholeOrb)
│   ├── ParticleField.jsx # WebGL particle background
│   ├── NavBar.jsx        # Pill navigation bar
│   └── CustomCursor.jsx  # Custom mouse cursor
├── hooks/
│   └── useScrollProgress.js  # Scroll position → [0,1] normalised value
├── App.jsx          # Root layout — composes Scene3D + HTMLOverlay
├── main.jsx         # React entry point + Lenis smooth scroll setup
└── index.css        # Global design system (tokens, typography, responsive)
```

---

## Sections

| # | Section | Description |
|---|---|---|
| 01 | Hero | Name, title, CTA buttons, portrait |
| 02 | About | Bio, skill chips, stat cards |
| 03 | Experience | Timeline of roles and internships |
| 04 | Projects | Cards for selected ML/AI work |
| 05 | Contact | Email copy + social links |

---

## Customisation

All content lives in `src/components/HTMLOverlay.jsx`:

- **`PROJECTS`** array — update titles, descriptions, tags, and accent colours
- **`EXPERIENCE`** array — update roles, companies, and years
- **`SKILLS`** array — update the skill chip list
- Images — replace `src/assets/dilshan.png` (hero) and `src/assets/About.png` (about section)

Design tokens (colours, fonts, spacing) are in the `:root` block at the top of `src/index.css`.

---

## License

MIT — feel free to fork and adapt for your own portfolio.
