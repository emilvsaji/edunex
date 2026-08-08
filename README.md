# edunex — All-in-One Study Abroad Planning Platform

[![Production Deployment](https://img.shields.io/badge/Live%20Demo-edunex--production.vercel.app-2563EB?style=for-the-badge&logo=vercel&logoColor=white)](https://edunex-production.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Google Gemini](https://img.shields.io/badge/Gemini%20AI-8E75C3?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

> **Live Production URL**: [https://edunex-production.vercel.app](https://edunex-production.vercel.app)

---

## 📖 About edunex

**edunex** is a next-generation study abroad intelligence platform designed to eliminate the ambiguity and fragmented information international students face when planning their higher education abroad.

The platform aggregates verified governmental policies, embassy regulations, university admission requirements, living cost data, student visa roadmaps, health insurance plans, and career guidelines into high-density, interactive country hubs.

### 🔗 Official Platform Links

| Destination / Page | Production URL | Flag | Primary Focus |
|---|---|---|---|
| **Platform Homepage** | [edunex-production.vercel.app](https://edunex-production.vercel.app) | 🌐 | Global destination selector, instant ⌘K search, platform capabilities |
| **Germany Hub** | [edunex-production.vercel.app/germany](https://edunex-production.vercel.app/germany) | 🇩🇪 | Tuition-free public universities, APS India guide, €11,904 Sperrkonto |
| **Austria Hub** | [edunex-production.vercel.app/austria](https://edunex-production.vercel.app/austria) | 🇦🇹 | €726.72/sem tuition, age-based funds, ÖGK (€78.84/mo), AMS work permits |
| **Sign In** | [edunex-production.vercel.app/login](https://edunex-production.vercel.app/login) | 🔐 | Split-panel authentication with social login and password recovery |
| **Create Account** | [edunex-production.vercel.app/signup](https://edunex-production.vercel.app/signup) | 📝 | International student profile registration |
| **Admin Portal** | [edunex-production.vercel.app/admin](https://edunex-production.vercel.app/admin) | ⚙️ | University, module, and database content management |

---

## 🌟 Core System Highlights

### 1. Live Destination Hubs (Germany & Austria)
- **Germany Hub (`/germany`)**: 15 integrated modules with full support for Indian APS certificate requirements, blocked account calculators (€11,904/year), DAAD scholarship searches, and public GKV health insurance (TK/Barmer).
- **Austria Hub (`/austria`)**: 14 dynamic, data-driven modules with genuine Austrian data—no residual German or APS copy. Features direct university admissions, age-based financial proof (€722.58 / €1,308.39 per month), ÖGK self-insurance (€78.84/month), and 2-step visa roadmap (Visa D + *Aufenthaltsbewilligung*).

### 2. Gemini AI University Search Fallback
- Connected to Google's **`gemini-1.5-flash`** model with strict JSON schema enforcement.
- When local database queries return 0 results, the system queries Gemini with domain prompt constraints to find genuine public/private universities, tuition fees, semester contributions, and degree levels.
- Results are tagged with a **✨ AI Sourced** badge and disclaimer banner, cached in-memory with a 1-hour TTL to ensure lightning-fast subsequent responses.

### 3. Interactive Tools & Financial Simulators
- **Annual Total Budget Planner**: Dynamic sliders and currency inputs tailored to each country's mandatory vs. optional funds.
- **Living Cost City Estimator**: Itemized monthly breakdowns (rent, groceries, transit pass, utilities, mobile/internet, entertainment) for major university cities.
- **12-Month Interactive Application Roadmap**: Milestone checklist with persistent local state tracking your progress from T-12 months to departure.
- **Interactive Global Search (`⌘K` / `Ctrl+K`)**: Multi-category command palette searching across universities, admission requirements, scholarships, documents, and FAQs.

---

## 🇦🇹 Austria vs. Germany 🇩🇪: 2026 Regulatory Comparison

| Dimension | Germany 🇩🇪 | Austria 🇦🇹 | Source Authority |
|---|---|---|---|
| **Public University Tuition** | Mostly **€0** (15 of 16 states) | **€726.72 / semester** (€1,453.44/yr) | `daad.de` / `studyinaustria.at` |
| **Student Union Contribution** | €150–€400 / semester (includes transit) | **~€25.20 / semester** (ÖH-Beitrag) | `oeh.ac.at` |
| **Proof of Financial Means** | Flat **€11,904 / year** (€992 / month) | **Age-Based**: **€722.58 / mo** (<24) \| **€1,308.39 / mo** (24+) | `migration.gv.at` (2026 rates) |
| **Blocked Account (Sperrkonto)** | **Mandatory** by federal immigration law | **Optional** (bank statements or *Haftungserklärung* accepted) | Austrian Embassy New Delhi |
| **APS Certificate** | **Mandatory** for Indian applicants | **Not required** (direct university credential evaluation) | `aps-india.de` |
| **Application Method** | Centralized via Uni-Assist / direct | **Direct application** via each university portal | Austrian Universities Act |
| **Student Health Insurance** | Statutory GKV (TK, Barmer) **~€125–€130 / mo** | ÖGK Self-Insurance **€78.84 / mo** (2026 rate) | `gesundheitskasse.at` |
| **Part-Time Work Limit** | 140 full days / 280 half days per calendar year | **20 hours / week** during semester (full-time in breaks) | `ams.at` |
| **Work Permit Process** | Automatic work entitlement with student visa | Employer applies to AMS for *Beschäftigungsbewilligung* | `ams.at` |
| **Marginal Earnings Limit** | €556 / month (Minijob threshold) | **€518.44 / month** (*Geringfügigkeitsgrenze*) | ASVG (Social Security Act) |
| **Statutory Minimum Wage** | €13.90 / hour (national statutory floor) | **No statutory minimum**; set by *Kollektivverträge* (~€10–€15/hr) | Austrian Chamber of Labour (AK) |
| **Visa & Residence Roadmap** | Single National Visa D covering duration | 2-step: **Visa D** (entry) → **Aufenthaltsbewilligung** (€218) | `bmeia.gv.at` / `migration.gv.at` |
| **Address Registration** | *Anmeldung* at *Bürgeramt* within 14 days | *Meldezettel* at *Meldeamt* within **3 days** | `oesterreich.gv.at` |

---

## 🛠️ Technology Stack

```
Frontend (client/)                       Backend (server/)
├── Next.js 14.2 (App Router)            ├── Node.js + Express (TypeScript)
├── React 18.3 + TypeScript 5.5          ├── Prisma ORM 5.x
├── Tailwind CSS + Custom Tokens         ├── SQLite (dev.db) / PostgreSQL (Neon ready)
├── Lucide React Icons                   ├── Google Gemini REST Client (API Fallback)
├── React Query (@tanstack)              ├── In-Memory TTL Cache Engine
└── Framer Motion Animations             └── JWT Authentication Services
```

---

## 📁 Repository Architecture

```
edunex/
├── README.md                      # Master Platform Documentation & Links
├── vercel.json                    # Vercel Production Build & Routing Config
├── client/                        # Next.js 14 Application (Deployed to Vercel)
│   ├── .env.local                 # Client environment variables (NEXT_PUBLIC_*)
│   ├── public/
│   │   ├── images/                # High-resolution destination & auth artwork
│   │   ├── icon.png               # Platform favicon
│   │   └── apple-icon.png         # iOS Web Clip icon
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx         # Root Layout, Metadata, & Theme Providers
│   │   │   ├── page.tsx           # Landing Page & Study Destinations Grid
│   │   │   ├── login/page.tsx     # Split-Panel Login Form
│   │   │   ├── signup/page.tsx    # Split-Panel Account Registration
│   │   │   ├── admin/page.tsx     # Admin Management Portal
│   │   │   └── [countrySlug]/
│   │   │       └── page.tsx       # Dynamic Country Hub Router (/germany, /austria)
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── TopNavbar.tsx    # Sticky header, mega-dropdown & ⌘K trigger
│   │   │   │   └── StickySidebar.tsx # Country-aware dynamic navigation sidebar
│   │   │   ├── modules/             # 15 Isolated Module Components
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
│   │   │   ├── providers/           # React Query & Theme Providers
│   │   │   └── search/
│   │   │       └── GlobalSearchModal.tsx # Command palette (⌘K) search
│   │   ├── services/
│   │   │   └── api.ts               # Axios API client + Offline fallback data
│   │   ├── styles/
│   │   │   └── globals.css          # Design system variables & utilities
│   │   └── types/
│   │       └── index.ts             # Strict TypeScript domain interfaces
│   ├── package.json
│   └── next.config.mjs
└── server/                        # Express + Prisma Backend Service
    ├── .env                       # Backend environment variables (PORT, DB, GEMINI)
    ├── prisma/
    │   ├── schema.prisma          # Relational data schema (15 models)
    │   └── seed.js                # Database seeder (Germany & Austria datasets)
    ├── src/
    │   ├── index.ts               # Express server entry point
    │   ├── controllers/           # Route handler controllers
    │   ├── routes/                # REST endpoints (/countries, /search, etc.)
    │   └── services/
    │       └── geminiService.ts   # Gemini API fallback & caching service
    └── package.json
```

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Gemini API Key**: (Optional, for AI university search fallback)

### 2. Configure Environment Variables

**Backend (`server/.env`)**:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET="edunex-jwt-super-secret-key-2026"
CORS_ORIGIN="http://localhost:3000"
GEMINI_API_KEY="your-gemini-api-key-here"
```

**Frontend (`client/.env.local`)**:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
NEXT_PUBLIC_GEMINI_API_KEY="your-gemini-api-key-here"
GEMINI_API_KEY="your-gemini-api-key-here"
```

### 3. Install & Start Backend
```bash
cd server
npm install
npm run db:push
npm run db:seed
npm run dev
```
*The Express API will be running on `http://localhost:5000`.*

### 4. Install & Start Frontend
```bash
cd client
npm install
npm run dev
```
*Open [http://localhost:3000](http://localhost:3000) in your browser.*

### 5. Production Build Verification
```bash
cd client
npm run build
```

---

## 🚀 Deployment to Vercel

The frontend is ready for continuous deployment on **Vercel**:

1. Push your changes to GitHub or GitLab.
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
3. Import the `edunex` repository and set **Root Directory** to `client`.
4. Framework Preset is automatically detected as **Next.js**.
5. Add environment variables under **Project Settings > Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend API URL or leave empty to use built-in client fallbacks.
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
6. Click **Deploy**. Your site will be live at [https://edunex-production.vercel.app](https://edunex-production.vercel.app).

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for details.

