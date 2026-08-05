# edunex Platform — Design & Architecture Blueprint (`landing.md`)

This document provides an exhaustive specification of the **edunex** web application design system, page architecture, color tokens, typography rules, route structures, component specifications, and Vercel hosting requirements. It serves as the single source of truth for designers, developers, and AI coding agents working on the platform.

---

## 1. Brand Identity & Visual Aesthetic

- **Theme**: Clean, high-end, light-toned aesthetic inspired by modern luxury travel and premium global intelligence platforms.
- **Color Tokens**:
  - **Page Background**: Soft warm off-white (`#F4F4F5` / `#F7F6F3`) for subtle contrast; pure white (`#FFFFFF`) inside cards and main section containers.
  - **Primary Text & Headings**: Deep Navy-Black / Charcoal (`#0B1220` / `#0F172A`).
  - **Secondary Text / Subtext**: Warm Slate-Gray (`#4B5563` / `#6B7280`).
  - **Dividers & Borders**: Delicate borders (`rgba(0,0,0,0.08)` / `#E2E8F0` / `border-slate-200`).
  - **Brand Accent**: Subtle Brand Blue (`#2563EB`) for focus states, interactive text links, and highlight badges; Deep Charcoal (`#0F172A`) for primary pill CTA buttons.
- **Typography System (Global)**:
  - **Display / Headings**: Unified serif font (**Playfair Display**) applied to major titles (`h1`, `h2`, `h3`, `h4`, destination section titles, banner headers, auth titles).
  - **Body / Interface / Actions**: Modern sans-serif font (**Inter**) applied globally for body text, navigation elements, form labels, inputs, dropdown menus, and pill button labels.
- **Shape & Elevation Language**:
  - **Pill Shape (`rounded-full`)**: Used for primary action buttons (`Choose Destination`, `Login`, `Sign up`, navbar CTAs).
  - **Card Containers (`rounded-2xl` / `rounded-3xl` / `rounded-[24px]`)**: Used for split-panel auth cards, destination cards, and hub metric widgets.
  - **Shadows**: Soft multi-layered ambient shadows (`0 4px 6px -1px rgba(0,0,0,0.07), 0 24px 64px -12px rgba(0,0,0,0.14)`).

---

## 2. Global Navigation Bar (`TopNavbar.tsx`)

### Specifications
- **Position**: Sticky top (`sticky top-0 z-40 w-full`), backdrop blur (`backdrop-blur-lg`).
- **Background**: Translucent White (`rgba(255, 255, 255, 0.80)`).
- **Border**: Subtle bottom border (`1px solid rgba(0,0,0,0.04)`).
- **Elements**:
  1. **Brand Logo**: Text-only wordmark `edunex` (`#0F172A` for `edu`, `#475569` for `nex`), tightened letter spacing (`-0.03em`), linking to `/`.
  2. **Global Search Trigger**: `⌘K` keyboard shortcut badge + search modal trigger (`GlobalSearchModal.tsx`).
  3. **Theme Toggle**: Light/Dark theme toggle.
  4. **Countries Mega-Dropdown**: Two-panel dropdown featuring Popular Destinations & European Countries with live status badges.
  5. **Login Button**: Deep navy-black pill (`bg-[#0F172A] text-white rounded-full px-6 py-3 font-bold`), linked directly to `/login`.

---

## 3. Landing Page Architecture (`/`)

1. **Hero Section**:
   - Full-bleed European campus background (`/images/hero_campus.png`) with a 65% white scrim wash.
   - Eyebrow badge: `🌍 NEXT-GEN STUDY ABROAD INTELLIGENCE PLATFORM`.
   - Headline in Playfair Display serif: `"Study Abroad"` (Light 300) + `"Made Simple & Precise"` (Extrabold 800).
   - Side-by-side pill CTAs: `"Choose Destination"` (solid navy) & `"Explore Countries"` (outline ghost pill).
2. **Destinations Grid**:
   - Section `#destinations` with 3-column grid (`grid-cols-1 md:grid-cols-2 xl:grid-cols-3`).
   - 4:3 aspect ratio photo cards (`Germany`, `UK`, `Canada`, `USA`, `Australia`) with top flag badge, metrics, discipline tags, and `Explore →` button routing to country hubs.
3. **Feature Showcase Section**:
   - Alternating soft warm off-white background (`#F7F6F3`).
   - Minimal borderless feature cards highlighting University Database, Visa & Application Guidance, Blocked Accounts, and Scholarships.
4. **Footer**:
   - Visual wordmark banner with graduate background (`/images/graduates_hero.png`).
   - Charcoal navigation footer (`#0F0F0F`) with links to country hubs, admin portal (`/admin`), and copyright notice.

---

## 4. Standalone Authentication Pages (`/login` & `/signup`)

### Layout & Component Structure
- **Container**: Full-viewport centered layout on soft neutral background (`#F4F4F5`).
- **Centered Split-Panel Card**:
  - Max-width: `960px`, Height: ~`580px–600px`, Radius: `24px` (`rounded-3xl`), dual-shadow.
  - **Left Panel (Form)**: White background, generous padding (`p-10`/`p-12`), edunex wordmark header, Playfair Display title, Inter subtext.
  - **Right Panel (Visual)**: Full-bleed study-abroad campus image panel (`/images/auth_campus_panel.png`), `rounded-r-2xl`, overlaid with a frosted glass floating badge ("Your global education awaits" / "Start your journey today"). Responsive: hidden on screens smaller than `md`.
- **Legal Disclaimer**: Centered bottom text with inline links to `/terms` and `/privacy`.

### Page 1: Login (`/login`)
- **Title**: `Welcome back`
- **Subtext**: `Login to your edunex account`
- **Fields**: `Email` (`you@example.com`), `Password` (with top-right `Forgot your password?` link and show/hide toggle).
- **Primary Button**: `Login` (`bg-[#0F172A] rounded-full text-white font-bold`).
- **Social Row**: Apple, Google, Meta icon buttons (`rounded-xl` bordered white style).
- **Footer Link**: `Don't have an account? Sign up` → routes to `/signup`.

### Page 2: Signup (`/signup`)
- **Title**: `Create your account`
- **Subtext**: `Get started with edunex today`
- **Fields**: `Full Name`, `Email`, `Password` (with password length hint).
- **Primary Button**: `Sign up` (`bg-[#0F172A] rounded-full text-white font-bold`).
- **Social Row**: Apple, Google, Meta icon buttons.
- **Footer Link**: `Already have an account? Login` → routes to `/login`.

---

## 5. Country Destination Hubs (`/[countrySlug]`, e.g., `/germany`)

### Reworked Layout & Aesthetics
- **Main Container**: Expanded to `max-w-[1600px]`, reducing margins to give ~70% width ratio to main content data views.
- **Hero Banner**: Deep navy charcoal gradient (`#0B1220` to `#1E293B`) with Playfair Display heading `"Study in Germany"`, pill eyebrow chip (`🇩🇪 DE COUNTRY PROFILE OVERVIEW`), description, and at-a-glance stat pills.
- **Sidebar (`StickySidebar.tsx`)**:
  - Fixed `w-64` sticky sidebar, edunex navy active state (`bg-[#0F172A]`), rounded-3xl container.
  - **Modules**: Overview, Universities, Admission Req., Document Checklist, APS Certification, Visa Guide, Interactive Timeline, Scholarships, Living Cost, Accommodation, Part-Time Jobs, Health Insurance, Currency & Budget, Official Resources, FAQ Hub.
  - *Cleaned*: "News & Updates" section removed.
- **Fact & Metric Cards Grid**:
  - 4-column grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).
  - Increased card padding (`p-5 sm:p-6`), larger label typography (`text-sm font-semibold`), larger numbers (`text-[1.2rem] font-bold` for key figures), and 20px icon badges.
- **Verified Germany Data**:
  - Blocked Account: `€11,904 / year (€992 / month)`
  - Minimum Wage: `€12.82 / hour` (Updated 2025 German statutory rate)
  - Intl. Student Count: `370,000+` (Verified Destatis figure)
  - Semester Contribution: `€150 – €400 / semester`

---

## 6. Admin Portal (`/admin`)

- Standalone administration interface for content managers.
- Mock JWT authentication workflow (`admin@edunex.io` / `admin123`).
- Management forms for adding Universities, updating APS guides, editing FAQs, and monitoring platform metrics.

---

## 7. Technical Stack & Vercel Deployment

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict mode enabled)
- **Styling**: Tailwind CSS + Vanilla CSS tokens
- **Icons**: Lucide React
- **State & Data**: React Query (`@tanstack/react-query`) + Axios API Client with mock fallbacks
- **Fonts**: Google Fonts (`Playfair Display` + `Inter` loaded via `next/font/google`)
- **Hosting Ready**: Tested with zero-config Vercel build (`outputDirectory: client/.next`, static prerendering enabled, Suspense boundaries configured).
