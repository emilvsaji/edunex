# edunex — All-in-One Study Abroad Planning Platform

> **edunex** is a next-generation study abroad intelligence platform designed to simplify international university selection, visa processing, financial proof guidelines, living cost estimations, and student admissions across top global study destinations.

---

## 🌟 Live Destination Hubs

| Country | Route | Flag | Tuition (Non-EU) | Proof of Funds | APS Required? | Health Insurance | Work Rights |
|---|---|---|---|---|---|---|---|
| **Germany** | [`/germany`](http://localhost:3000/germany) | 🇩🇪 | €0 (15/16 States) | €11,904 / yr (Sperrkonto mandatory) | **Yes** (India) | TK/Barmer (~€125–€130/mo) | 140 full days / yr |
| **Austria** | [`/austria`](http://localhost:3000/austria) | 🇦🇹 | €726.72 / semester | €722.58/mo (<24) \| €1,308.39/mo (24+) | **No** (Direct App) | ÖGK (€78.84/mo) | 20 hrs/wk (AMS permit) |

---

## 🚀 Key Features & Pages

### 1. Landing Page (`/`)
- **Hero Banner**: High-impact campus visual with Playfair Display serif typography, dual action CTAs, and quick destination navigation.
- **Top Navigation Bar**: Sticky header with logo wordmark, keyboard search trigger (`⌘K` / `Ctrl+K`), theme toggle, two-panel country mega-dropdown (with **Live** badges for Germany & Austria), and route-connected Login button.
- **Select Your Study Destination Grid**: Interactive full-bleed photo cards highlighting **Germany**, **Austria**, UK, Canada, USA, and Australia with live tuition, university counts, and visa stats.
- **Global Search Modal (`⌘K`)**: Instant search across universities, admission requirements, scholarships, documents, and FAQs.
- **Capabilities Section**: Minimalist grid detailing university database search, visa roadmaps, blocked accounts, and scholarship matching.
- **Footer Visual Banner**: Full-bleed graduate hero artwork with global navigation links.

### 2. Standalone Authentication System (`/login` & `/signup`)
- **Split-Panel Architecture**: 960px max-width card featuring clean form inputs on the left and full-bleed campus imagery on the right.
- **Login (`/login`)**: Controlled email/password form, password visibility toggle, top-right "Forgot your password?" link, Apple/Google/Meta social auth row, and legal disclaimer.
- **Signup (`/signup`)**: 3-field form (Full Name, Email, Password with length hint), social auth integration, and smooth cross-linking to Login.
- **Design System**: Playfair Display serif headings, Inter body text, `#2563EB` brand blue focus rings, `#0F172A` deep navy pill buttons, and soft ambient shadows.

### 3. Germany Destination Hub (`/germany`)
- **Expanded Layout**: 1600px container width maximizing main content real estate (~70% screen ratio).
- **15 Integrated Modules**:
  - 📊 **Overview**: Capital, currency, language, population, student counts, tuition, living costs, minimum wage (€13.90/hr).
  - 🏛️ **Universities**: Filterable university catalog (TUM, LMU, RWTH Aachen, TU Berlin, KIT, Humboldt).
  - 📋 **Admission Requirements**: Degree-level breakdowns (Master, Bachelor, PhD), min GPA, IELTS/TOEFL requirements, GRE scores.
  - 📁 **Document Checklist**: Categorized dossier requirements (Passport, Transcripts, SOP, LOR, LOM).
  - 🛡️ **APS Certification Guide**: Complete Indian APS verification process guide, fee breakdown (₹18,000), timelines, and required documents.
  - 🛂 **Visa Guide**: Category D national student visa step-by-step process, VFS Global appointment checklist, and rejection prevention tips.
  - 📅 **Interactive Timeline**: Month-by-month roadmap from T-12 months to arrival in Germany.
  - 🎓 **Scholarships**: DAAD EPOS, Deutschlandstipendium, Heinrich Böll, KAS, and Erasmus+ databases.
  - 💶 **Living Cost Calculator**: City-by-city monthly breakdown for Munich, Berlin, Aachen, Karlsruhe, Frankfurt, and Hamburg.
  - 🏠 **Accommodation Guide**: Studierendenwerk dorms, WG-Gesucht shared flats, and private housing portals.
  - 💼 **Part-Time Jobs**: Working student (Werkstudent) rules, 140 full days allowance, min wage (€13.90/hr), and mini-job cap (€556/mo).
  - 🏥 **Health Insurance**: Techniker Krankenkasse (TK), Barmer/AOK public insurance, and private travel cover.
  - 💱 **Currency & Budget**: Real-time EUR to INR converter tool with historical rates.
  - 🔗 **Official Resources**: Verified government links (DAAD, APS India, Uni-Assist, German Embassy, Make it in Germany).
  - ❓ **FAQ Hub**: Searchable Q&A accordion covering tuition, blocked accounts, APS, and visa rules.

### 4. Austria Destination Hub (`/austria`)
- **Data-Driven Dynamic Layout**: Reuses the exact design system and component architecture of the Germany Hub while cleanly excluding Germany-specific items (e.g. APS module).
- **14 Tailored Modules (No APS)**:
  - 📊 **Overview**: Capital (Vienna), population (9.1M), tuition (€726.72/sem non-EU + €25.20 ÖH fee), age-based financial proof.
  - 🏛️ **Universities**: University of Vienna (QS #140), TU Wien (QS #191), WU Wien (QS #69 in Business), Univ. of Graz, Univ. of Innsbruck, TU Graz, and Webster Vienna.
  - 📋 **Admission Requirements**: Direct university portal evaluation (no centralized Uni-Assist equivalent; direct faculty admission).
  - 📁 **Document Checklist**: Academic dossier, language tests, financial proof, SOP, and LORs tailored for Austrian universities.
  - 🛂 **Visa Guide**: 2-stage Austrian process: **Visa D (Entry Visa, ~€150)** followed by the **Student Residence Permit (*Aufenthaltsbewilligung Studierende*, €218)** applied within 3 months of arrival.
  - 📅 **Interactive Timeline**: 9-step chronological roadmap covering language prep, direct applications, Embassy New Delhi appointments, Meldezettel, and Immatrikulation.
  - 🎓 **Scholarships**: OeAD Ernst Mach Grant (€1,050/mo), Austria Excellence Scholarship, Erasmus+ Joint Master, and University of Vienna merit grants.
  - 💶 **Living Cost Calculator**: City-by-city breakdown for Vienna, Graz, Innsbruck, and Salzburg (including Wiener Linien student transit pass).
  - 🏠 **Accommodation Guide**: OeAD Housing (housing.oead.at), Studentenheim waiting lists, WG-Zimmer.at, and willhaben.at.
  - 💼 **Part-Time Jobs**: 20 hours/week during semester, full-time during breaks. Employer applies to AMS (*Arbeitsmarktservice*) for *Beschäftigungsbewilligung*; *Geringfügigkeitsgrenze* at €518.44/mo.
  - 🏥 **Health Insurance**: Österreichische Gesundheitskasse (**ÖGK**) student self-insurance (*Selbstversicherung für Studierende*) at **€78.84/month** (2026 rate).
  - 💱 **Currency & Budget**: Real-time EUR conversion calculator.
  - 🔗 **Official Resources**: Direct portals to `oead.at`, `studyinaustria.at`, `migration.gv.at`, Austrian Embassy New Delhi, `ams.at`, and `gesundheitskasse.at`.
  - ❓ **FAQ Hub**: 10 comprehensive questions explaining tuition, non-mandatory Sperrkonto, AMS job permits, and Meldezettel registration.

### 5. Admin Portal (`/admin`)
- Content management dashboard for platform administrators.
- Mock JWT authentication workflow (`admin@edunex.io` / `admin123`).
- Management interfaces for university entries, FAQs, and system analytics.

---

## 🇦🇹 Key Nuances: Austria vs. Germany

| Dimension | Germany 🇩🇪 | Austria 🇦🇹 |
|---|---|---|
| **Public University Tuition** | Mostly free (€0) in 15 states | Standardized **€726.72 / semester** for non-EU students |
| **Student Union Contribution** | €150–€400 / semester (includes transit pass) | **~€25.20 / semester** (ÖH-Beitrag) |
| **Proof of Funds (Amount)** | Flat **€11,904 / year** (€992 / month) | **Age-based**: **€722.58 / mo** (<24) \| **€1,308.39 / mo** (24+) |
| **Blocked Account (Sperrkonto)** | **Mandatory** by law | **Optional** — personal bank statements, scholarships, or *Haftungserklärung* (guarantor) accepted |
| **APS Certificate** | **Mandatory** for Indian applicants | **Not required** (Direct evaluation by Austrian universities) |
| **Application Method** | Primarily centralized via Uni-Assist | **Direct application** via each university's online admission portal |
| **Student Health Insurance** | Statutory GKV (TK, Barmer) ~**€125–€130 / mo** | ÖGK Self-Insurance ~**€78.84 / mo** (significantly cheaper) |
| **Student Work Authorization** | 140 full days / 280 half days per calendar year | **20 hours / week**; employer must obtain AMS *Beschäftigungsbewilligung* |
| **Marginal Earnings Limit** | €556 / month (Minijob cap) | **€518.44 / month** (*Geringfügigkeitsgrenze*) |
| **Statutory Minimum Wage** | €13.90 / hour (national statutory floor) | **No statutory minimum**; set by industry collective agreements (*Kollektivverträge*, ~€1,700/mo avg) |
| **Visa & Residence Process** | Single National Visa D covering duration | 2-step: **Visa D** for entry → **Aufenthaltsbewilligung Studierende** (€218) after arrival |

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | Next.js 14 (App Router, React 18, TypeScript) |
| **Styling & Design** | Tailwind CSS + Custom CSS Design Tokens |
| **Typography** | Google Fonts (`Playfair Display` + `Inter` via `next/font/google`) |
| **Icons** | Lucide React |
| **Client State & Cache** | React Query (`@tanstack/react-query`) + Axios API Client |
| **Resilience Layer** | Embedded offline client fallback datasets for zero-downtime rendering |
| **Backend Server** | Node.js + Express + TypeScript + Prisma ORM |
| **Database** | SQLite (`dev.db`) / PostgreSQL ready |
| **Deployment** | Vercel (Frontend) / Node Engine (Backend) |

---

## 📁 Directory Structure

```
edunex/
├── README.md                 # Master Project Documentation
├── vercel.json               # Root Vercel Deployment Configuration
├── client/                   # Next.js 14 Frontend Application
│   ├── public/               # Static Assets & Destination Media
│   │   ├── images/
│   │   │   ├── auth_campus_panel.png   # Auth split-panel image
│   │   │   ├── hero_campus.png         # Landing hero campus visual
│   │   │   ├── graduates_hero.png      # Footer banner
│   │   │   ├── dest_germany.png        # Germany destination card
│   │   │   └── dest_austria.png        # Austria destination card
│   ├── src/
│   │   ├── app/              # Next.js App Router Pages
│   │   │   ├── layout.tsx              # Root Layout & Font Providers
│   │   │   ├── page.tsx                # Landing Page with Destinations Grid
│   │   │   ├── login/page.tsx          # Standalone Split-Panel Login
│   │   │   ├── signup/page.tsx         # Standalone Split-Panel Signup
│   │   │   ├── admin/page.tsx          # Admin Management Portal
│   │   │   └── [countrySlug]/page.tsx  # Dynamic Destination Hubs (/germany, /austria)
│   │   ├── components/       # UI Component Architecture
│   │   │   ├── layout/
│   │   │   │   ├── TopNavbar.tsx       # Mega-dropdown, search trigger & mobile menu
│   │   │   │   └── StickySidebar.tsx   # Dynamic data-driven sidebar (APS filtering)
│   │   │   ├── modules/                # 15 Independent Destination Modules
│   │   │   │   ├── OverviewModule.tsx
│   │   │   │   ├── UniversitiesModule.tsx
│   │   │   │   ├── AdmissionRequirementsModule.tsx
│   │   │   │   ├── DocumentChecklistModule.tsx
│   │   │   │   ├── APSGuideModule.tsx
│   │   │   │   ├── VisaGuideModule.tsx
│   │   │   │   ├── TimelineModule.tsx
│   │   │   │   ├── ScholarshipsModule.tsx
│   │   │   │   ├── LivingCostModule.tsx
│   │   │   │   ├── AccommodationModule.tsx
│   │   │   │   ├── PartTimeJobsModule.tsx
│   │   │   │   ├── HealthInsuranceModule.tsx
│   │   │   │   ├── CurrencyModule.tsx
│   │   │   │   ├── OfficialResourcesModule.tsx
│   │   │   │   └── FAQModule.tsx
│   │   │   ├── providers/              # Theme & React Query Contexts
│   │   │   └── search/
│   │   │       └── GlobalSearchModal.tsx # Command palette (⌘K) search
│   │   ├── services/
│   │   │   └── api.ts                  # Axios API layer + Germany & Austria fallbacks
│   │   ├── styles/
│   │   │   └── globals.css             # Tailwind base & design system utilities
│   │   └── types/
│   │       └── index.ts                # TypeScript interfaces (Country, University, etc.)
│   ├── package.json
│   └── next.config.mjs
└── server/                   # Backend Express + Prisma Service
    ├── prisma/
    │   ├── schema.prisma     # Relational Database Schema
    │   └── seed.js           # Database Seeder (Germany & Austria full datasets)
    ├── src/
    │   ├── index.ts          # Express API server entry
    │   └── routes/           # REST endpoints (/api/countries, /api/search, etc.)
    └── package.json
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Frontend Setup (`client`)
```bash
cd client
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** to view the platform:
- Landing Page: `http://localhost:3000`
- Germany Hub: `http://localhost:3000/germany`
- Austria Hub: `http://localhost:3000/austria`
- Login Page: `http://localhost:3000/login`

### 3. Backend & Database Setup (`server`)
```bash
cd server
npm install
npm run db:push
npm run db:seed
npm run dev
```
The Express API runs on **[http://localhost:5000](http://localhost:5000)**.

### 4. Production Build Verification
```bash
cd client
npm run build
```
Validates TypeScript compilation, route optimizations, and static generation across all routes.

---

## 🌐 Deploying Frontend to Vercel

The frontend is **100% production ready** and configured for zero-downtime deployment on **Vercel**.

1. Push your repository to GitHub / GitLab.
2. Go to **[Vercel Dashboard](https://vercel.com/dashboard)** and click **"Add New Project"**.
3. Import the repository and set **Root Directory** to `client`.
4. Framework Preset is automatically detected as **Next.js**.
5. Click **"Deploy"**.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
