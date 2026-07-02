# Roc Windows — Website

A multi-page marketing website for **Roc Windows**, a professional window cleaning contractor serving properties across the Northeast with window cleaning, power washing, and gutter work.

## About the business

Roc Windows positions itself around quality service, safety, and clear communication—no high-pressure sales, no subcontracted shortcuts. The site highlights free estimates, licensed and insured work, and coverage across **New York, New Jersey, Connecticut, Pennsylvania, and Massachusetts**.

## Pages

| Page | Purpose |
|------|---------|
| **Home** | Hero with background video, core value proposition, services overview, testimonials, stats, and contact |
| **About** | Company story, legacy section with project photography, values, and a compact stats bar (states served, family owned, ratings, free estimates) |
| **Services** | Six core trades, insurance-claims support, service-area map, and client testimonials |
| **Window Cleaning** | Dedicated landing page for full window cleaning with a step-by-step process section |

## Design and UX

- **Brand identity** — Navy primary (`#183549`) with high-contrast white typography and a bold, industrial layout
- **Full-viewport heroes** — Transparent navigation over hero media; scrolling service marquee (“tape”) pinned to the bottom of the viewport on key pages
- **Custom photography** — Locally hosted hero and portfolio images (window cleaning, storefronts, property surveys)
- **Home hero video** — Autoplaying muted loop behind headline and call-to-action buttons
- **Portfolio interactions** — Grayscale-to-color hover on project cards with overlay titles and descriptions
- **Contact form** — Formspree integration on the home page with validation and inline success/error feedback
- **SEO basics** — Meta descriptions, Open Graph tags, `sitemap.xml`, `robots.txt`, and a custom 404 page
- **Friendly URLs** — Short paths such as `/about`, `/services`, and `/portfolio` via server rewrites

## Core services featured

- Residential window cleaning  
- Commercial window cleaning  
- Power washing and screen cleaning
- Gutter services  
- Free consultations and estimates  

## Tech stack

Static **HTML** pages styled with **Tailwind CSS** (CDN), **Google Fonts** (Montserrat & Inter), and **Material Symbols** for icons. No build step or framework—plain files suitable for static hosting.

## Project structure

```
├── index.html              # Home
├── about_us.html           # About
├── services.html           # Services
├── our_work.html           # Portfolio
├── window_cleaning.html    # Window cleaning
├── images/                 # Brand and project photography
├── videos/                 # Home hero video
├── critical-brand.css      # Pre-load brand colors (prevents flash on first paint)
├── favicon.svg
├── vercel.json             # URL rewrites
├── sitemap.xml
└── robots.txt
```

## Local preview

```bash
npx serve .
```

Then open `http://localhost:3000` (or the port shown in the terminal).
