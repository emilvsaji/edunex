# edunex Landing Page — Design & Technical Documentation (`landing.md`)

This document provides a comprehensive blueprint of the current **edunex** landing page design system, visual theme, layout hierarchy, component specs, and asset guidelines. It is tailored for AI code tools, developers, and designers to accurately understand, replicate, or extend the page.

---

## 1. Overview & Visual Aesthetic

- **Theme**: Clean, minimal, light-toned aesthetic inspired by modern luxury travel and adventure platforms.
- **Color Palette**:
  - **Background**: Pure white (`#FFFFFF`) with soft neutral off-whites (`#F7F6F3`, `rgba(0,0,0,0.04)` to `rgba(0,0,0,0.06)`).
  - **Primary Text & Headings**: Deep Navy-Black / Charcoal (`#0B1220` / `#0F172A`).
  - **Secondary / Subtext**: Warm Slate-Gray (`#4B5563`).
  - **Borders & Dividers**: Delicate borders (`rgba(0,0,0,0.08)` / `border-slate-200`).
  - **Accents**: Deep charcoal solid pills, subtle brand blue accents (`#2563EB`).
- **Typography System (Site-Wide)**:
  - **Headings**: Unified serif display font (**Playfair Display**) loaded globally for all `h1`, `h2`, `h3`, and `h4` tags.
  - **Body / Subtext / Actions**: Clean, modern sans-serif font (**Inter**) loaded globally as the default body font for description copy, nav labels, dropdowns, and button text.
- **Shape Language**: Pill-shaped CTAs (`rounded-full`), soft rounded cards (`rounded-[20px]` / `rounded-3xl`), generous whitespace, no heavy neon gradients or dark themes.

---

## 2. Top Navigation Bar (`TopNavbar.tsx`)

### Visual Specs
- **Position**: Sticky top (`sticky top-0 z-40 w-full`), backdrop blur (`backdrop-blur-md`).
- **Background**: Translucent White (`rgba(255, 255, 255, 0.95)`).
- **Border**: Subtle bottom border (`1px solid rgba(0,0,0,0.08)`).
- **Height / Padding**: `py-4`, horizontal padding `px-6 sm:px-12 lg:px-20 xl:px-28`.

### Components & Elements
1. **Brand Logo (Left)**:
   - Text-only clean wordmark: `edunex` (Compass icon box has been completely removed).
   - Font styling: `text-3xl font-extrabold tracking-tight font-sans` with custom colors (`#0F172A` for `edu`, `#475569` for `nex`) and tightened spacing (`letterSpacing: '-0.03em'`).
2. **Search Trigger**:
   - Styled with larger box specs: `px-5 py-3 rounded-xl text-base` (Inter).
   - Larger search icon (`w-5 h-5`), `Search...` placeholder text, and a distinct `⌘K` keyboard shortcut badge.
3. **Theme Toggle**:
   - Light gray icon button (`rgba(0,0,0,0.04)`), Sun/Moon icon toggle.
4. **Countries Dropdown**:
   - Interactive trigger button with Globe icon and Chevron arrow (`px-5 py-3 rounded-xl text-base font-semibold`).
   - Opens a **two-panel mega-dropdown** (`Popular Study Destinations` on left, `More Countries (Europe)` on right) listing countries with national flags, live badges, and route links.
5. **Login CTA Button (Right)**:
   - **Style**: Solid deep navy-black pill (`bg-[#0F172A] text-white rounded-full px-6 py-3 font-bold text-base hover:scale-[1.02]`).
   - Icon: `LogIn` lucide icon.

---

## 3. Hero Section (`page.tsx`)

### Layout & Background
- **Container**: Full-width section (`w-full min-h-[88vh] flex items-center justify-center relative overflow-hidden`).
- **Background Image**: Full-bleed background image (`/images/hero_campus.png` — a wide European university campus scene with grand stone architecture and sunlit courtyards).
- **Light Scrim Overlay**: 65% White wash overlay (`rgba(255, 255, 255, 0.65)`) spanning the entire hero section so the background photo is softly visible while text remains 100% legible.

### Content Hierarchy (Centered Layout)
1. **Eyebrow Badge**:
   - Text: `🌍 NEXT-GEN STUDY ABROAD INTELLIGENCE PLATFORM`
   - Style: Centered pill chip, uppercase, tracked text (`text-xs font-semibold tracking-widest bg-[rgba(0,0,0,0.06)] border-[1px solid rgba(0,0,0,0.1)] text-[#374151] rounded-full px-4 py-2`).
2. **Dual-Weight Headline**:
   - Switched to elegant Playfair Display serif typography.
   - **Line 1 (Top)**: `"Study Abroad"` — Font weight **300 (Light)**, font size `text-5xl sm:text-6xl lg:text-7xl font-serif`, color `#0B1220`.
   - **Line 2 (Bottom)**: `"Made Simple & Precise"` — Font weight **800 (Extrabold)**, font size `text-5xl sm:text-6xl lg:text-7xl font-serif`, color `#0B1220`.
3. **Subtext Paragraph**:
   - Text: `"University selection, visa processing, blocked accounts, and living cost optimization — all in one place."` (APS verification references removed).
   - Style: Centered, `max-w-2xl text-lg sm:text-xl leading-relaxed font-sans`, color `#4B5563` (Warmer slate-gray), 2 lines max.
4. **Pill CTA Button Group (Side-by-Side)**:
   - **Primary Button (`Choose Destination`)**:
     - Solid dark charcoal/black (`#111827`), white text, pill shape (`rounded-full`), `px-8 py-4 font-bold text-base`.
     - Right arrow icon (`ArrowRight`) with smooth rightward hover animation.
   - **Secondary Button (`Explore Countries`)**:
     - Outline / Ghost style, transparent background, solid charcoal border (`2px solid rgba(0,0,0,0.75)`), dark text (`#111827`), pill shape (`rounded-full`), `px-8 py-4 font-bold text-base`.
     - Smooth scroll to `#destinations` grid section.

---

## 4. Destinations Grid Section

### Header
- Section ID: `#destinations`
- Background: White (`bg-white`), padding `py-24 px-6 sm:px-12 lg:px-20 xl:px-28`.
- Eyebrow: `GLOBAL DESTINATIONS` (`text-sm font-bold text-brand-600 uppercase tracking-wider`).
- Title: `Select Your Study Destination` (`text-4xl sm:text-5xl font-bold tracking-tight text-slate-950 mt-2 font-serif` using Playfair Display).
- Divider line below title (`border-b border-slate-200 pb-7`).

### Destination Cards (3-Column Grid)
- **Grid Ratio**: 3 columns (`grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`).
- **Card Format**:
  - Full-bleed photo cards with `4:3` aspect ratio (`rounded-[20px] overflow-hidden shadow-xl`).
  - Top-left circular flag badge (`w-10 h-10 rounded-full bg-white/90`).
  - Top-right circular arrow button (`ArrowUpRight`).
  - Bottom dark gradient overlay (`rgba(10,30,77,0.92)`) for high-contrast card information.
  - Card Info: Country title (`font-serif` Playfair Display), key metrics (tuition range, number of universities, post-study work visa duration), discipline tags (`Engineering`, `Computer Sci`), and direct `Explore ->` action button (or `Lock Soon` badge).

---

## 5. Feature Showcase Section

- **Background**: Soft warm off-white (`#F7F6F3`) to create alternating contrast with the white destinations grid.
- **Header**:
  - Eyebrow: `ALL-IN-ONE CAPABILITIES` (`text-xs font-semibold uppercase tracking-[0.22em] text-[#9CA3AF]`).
  - Title: `Engineered for Academic Success` (`text-4xl sm:text-5xl font-bold text-slate-900 leading-tight font-serif` using Playfair Display).
  - Subtext: `edunex consolidates all critical tools and data points into a single seamless SaaS environment.` (`text-base leading-relaxed text-[#6B7280] font-sans`).
- **Minimal Grid Cards**:
  - Style: Completely borderless and shadowless layout (plain flat containers) aligned to the center.
  - Icons: Contained inside simple circular wrappers with dark charcoal line-art styling.
  - Card Titles: Rendered in `font-serif` Playfair Display.
  - Center Card Highlight: Rebuilt with a subtle frosted background container (`bg-[rgba(0,0,0,0.03)] border-[1px solid rgba(0,0,0,0.06)]`) to add visual anchor point.
  - Card 2 Detail (Country Agnostic): Replaced APS-specific messaging with **"Visa & Application Guidance"** covering checklists, documents, scheduling, and blocked accounts.

---

## 6. Footer Section

- **Footer Block 1 (Wordmark Visual Banner)**:
  - Full-bleed wide format image backdrop (`/images/graduates_hero.png`) underneath a deep dark scrim (`rgba(10,10,10,0.68)`).
  - Centered giant white branding text: `edunex` utilizing bold display spacing (`text-clamp(4rem, 14vw, 11rem) font-serif`), followed by tracking-spaced subtext `"Your Global Education Platform"`.
- **Footer Block 2 (Information & Navigation Grid)**:
  - Background: Near-black deep charcoal (`#0F0F0F`).
  - Multi-column setup:
    - Left side: Brand identity logo and tagline.
    - Right side: Multi-category lists:
      - **Platform**: Germany Hub, and coming-soon markers for UK, USA, and Canada.
      - **Admin**: Link redirect for Admin Portal.
  - Bottom Bar: Copyright notice (`© 2026 edunex Platform`) and student mission statement.

---

## 7. Key React / Next.js Implementation References

- **Main Page**: `client/src/app/page.tsx`
- **Navbar Component**: `client/src/components/layout/TopNavbar.tsx`
- **Hero Image Location**: `client/public/images/hero_campus.png`
- **Icon Library**: `lucide-react`
- **CSS Framework**: Tailwind CSS
