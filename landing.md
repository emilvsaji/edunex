# edunex Landing Page — Design & Technical Documentation (`landing.md`)

This document provides a comprehensive blueprint of the current **edunex** landing page design system, visual theme, layout hierarchy, component specs, and asset guidelines. It is tailored for AI code tools, developers, and designers to accurately understand, replicate, or extend the page.

---

## 1. Overview & Visual Aesthetic

- **Theme**: Clean, minimal, light-toned aesthetic inspired by modern luxury travel and adventure platforms.
- **Color Palette**:
  - **Background**: Pure white (`#FFFFFF`) with soft neutral off-whites (`rgba(0,0,0,0.04)` to `rgba(0,0,0,0.06)`).
  - **Primary Text & Headings**: Dark Charcoal / Near-Black (`#111827` / `text-slate-950`).
  - **Secondary / Subtext**: Muted Gray (`#6B7280` / `text-slate-500`).
  - **Borders & Dividers**: Delicate borders (`rgba(0,0,0,0.08)` / `border-slate-200`).
  - **Accents**: Deep charcoal solid pills, subtle brand blue accents (`#2563EB`).
- **Typography**: Clean sans-serif font family with stark font-weight contrast (Light `300` vs. Extrabold `800`).
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
   - Icon: Square with rounded corners (`w-10 h-10 rounded-xl bg-gray-900`), white Compass icon.
   - Text: `edu` in dark charcoal (`text-gray-900`), `nex` in muted gray (`text-gray-400`), font weight `font-extrabold text-2xl`.
2. **Search Trigger**:
   - Light gray background pill/box (`rgba(0,0,0,0.04)`), Search icon, `Search...` text, `⌘K` keyboard badge.
3. **Theme Toggle**:
   - Light gray icon button (`rgba(0,0,0,0.04)`), Sun/Moon icon toggle.
4. **Countries Dropdown**:
   - Interactive trigger button with Globe icon and Chevron arrow (`px-4 py-2.5 rounded-xl font-semibold`).
   - Opens a **two-panel mega-dropdown** (`Popular Study Destinations` on left, `More Countries (Europe)` on right) listing countries with national flags, live badges, and route links.
5. **Login CTA Button (Right)**:
   - **Style**: Solid dark charcoal pill (`bg-[#111827] text-white rounded-full px-5 py-2.5 font-bold text-sm`).
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
   - **Line 1 (Top)**: `"Study Abroad"` — Font weight **300 (Light)**, font size `text-5xl sm:text-6xl lg:text-7xl`, color `#111827`.
   - **Line 2 (Bottom)**: `"Made Simple & Precise."` — Font weight **800 (Extrabold)**, font size `text-5xl sm:text-6xl lg:text-7xl`, color `#111827`.
3. **Subtext Paragraph**:
   - Text: `"University selection, APS verification, visa processing, blocked accounts, and living cost optimization — all in one place."`
   - Style: Centered, `max-w-2xl text-lg sm:text-xl leading-relaxed`, color `#6B7280` (Muted gray), 2 lines max.
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
- Title: `Select Your Study Destination` (`text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mt-2`).
- Divider line below title (`border-b border-slate-200 pb-7`).

### Destination Cards (3-Column Grid)
- **Grid Ratio**: 3 columns (`grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`).
- **Card Format**:
  - Full-bleed photo cards with `4:3` aspect ratio (`rounded-[20px] overflow-hidden shadow-xl`).
  - Top-left circular flag badge (`w-10 h-10 rounded-full bg-white/90`).
  - Top-right circular arrow button (`ArrowUpRight`).
  - Bottom dark gradient overlay (`rgba(10,30,77,0.92)`) for high-contrast card information.
  - Card Info: Country title, key metrics (tuition range, number of universities, post-study work visa duration), discipline tags (`Engineering`, `Computer Sci`), and direct `Explore ->` action button (or `Lock Soon` badge).

---

## 5. Feature Showcase Section

- Title: `Engineered for Academic Success` (`All-in-One Capabilities`).
- 3-Column Feature Cards:
  1. **Universities Directory**: Filter by city, public/private, degree levels, and English-taught programs.
  2. **APS & Visa Step-by-Step**: Detailed breakdown of APS verification, document checklists, fee transfers, VFS slots.
  3. **Cost & Forex Calculators**: Living expense sliders, EUR/INR exchange rate graphs, annual budget planning.

---

## 6. Footer

- Clean white footer (`border-t border-slate-100 bg-white`).
- Brand info (`edunex © 2026`), copyright, and navigation links (`Germany Hub`, `Admin Portal`).

---

## 7. Key React / Next.js Implementation References

- **Main Page**: `client/src/app/page.tsx`
- **Navbar Component**: `client/src/components/layout/TopNavbar.tsx`
- **Hero Image Location**: `client/public/images/hero_campus.png`
- **Icon Library**: `lucide-react`
- **CSS Framework**: Tailwind CSS
