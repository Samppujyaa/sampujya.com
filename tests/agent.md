# AGENTS.md — Repository Engineering Contract

## 1. Architecture & Stack Invariants
- **Project Type:** Static, multi-page personal portfolio website hosted on GitHub Pages (`sampujya-site`).
- **Allowed Technologies:** Semantic HTML5 (`*.html`) and Vanilla CSS3 (`*.css`) ONLY.
- **Zero-Dependency Mandate:**
  - **DO NOT** introduce `package.json`, Node.js, npm/pnpm, bundlers (Vite, Webpack), CSS preprocessors (Sass/Less), or utility frameworks (Tailwind CSS, Bootstrap).
  - **DO NOT** add `<script>` tags, external JS files, or inline JavaScript event handlers unless explicitly instructed in the user prompt.
  - **DO NOT** import external CDN stylesheets, icon libraries (FontAwesome), or third-party tracking scripts. Use system font stacks or self-hosted `/assets/fonts/` and inline `<svg>` icons.

## 2. Directory Topology & Naming
Maintain a flat, predictable static file layout compatible with GitHub Pages root serving:
```text
/
├── index.html          # Landing / bio / 
├── work.html           # selected work
├── research.html       # Detailed engineering & research projects (if multi-page)
├── writing.html        # Notes / essays / reading lists (if multi-page)
├── contact.html        # resumes/ contact/ social links/ cal sessions etc
├── now.html            # currently what i'm doing/ plans/ thoughts etc
├── css/
│   ├── reset.css       # Minimal modern box-sizing & baseline normalization
│   └── style.css       # Design tokens, layout primitives, and component rules
└── assets/
    ├── images/         # Optimized WebP/PNG/SVG assets (kebab-case filenames)
    └── docs/           # Static PDFs (e.g., resume.pdf)
