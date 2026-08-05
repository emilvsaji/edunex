# edunex — All-in-One Study Abroad Planning Platform

> **edunex** is a next-generation study abroad intelligence platform designed to simplify international university selection, visa processing, blocked account setups, living cost estimations, and student admissions.

---

## 🌟 Key Features & Pages

### 1. Landing Page (`/`)
- **Hero Banner**: High-impact campus visual with Playfair Display serif typography and dual action CTAs.
- **Top Navigation Bar**: Sticky header with logo wordmark, keyboard search trigger (`⌘K`), theme toggle, two-panel country mega-dropdown, and route-connected Login button.
- **Destinations Grid**: 3-column interactive photo grid highlighting Germany, UK, Canada, USA, and Australia with live tuition & visa stats.
- **Capabilities Section**: Minimalist grid detailing university database search, visa roadmaps, blocked accounts, and scholarship matching.
- **Footer Visual Banner**: Full-bleed graduate hero artwork with global navigation links.

### 2. Standalone Authentication System (`/login` & `/signup`)
- **Split-Panel Architecture**: 960px max-width card featuring white form panel on the left and full-bleed campus image panel on the right.
- **Login (`/login`)**: Controlled email/password form, password visibility toggle, top-right "Forgot your password?" link, Apple/Google/Meta social auth row, and legal disclaimer.
- **Signup (`/signup`)**: 3-field form (Full Name, Email, Password with length hint), social auth integration, and smooth cross-linking to Login.
- **Design Tokens**: Custom Playfair Display serif headings, Inter body text, `#2563EB` brand blue focus rings, `#0F172A` deep navy pill buttons, and soft ambient shadows.

### 3. Germany Destination Hub (`/germany` / `/[countrySlug]`)
- **Expanded Layout**: 1600px container width maximizing main content real estate (~70% screen ratio).
- **Dark Navy Hero Header**: Deep navy charcoal gradient banner (`#0B1220` to `#1E293B`) with Playfair Display serif title, country flag eyebrow chip, description, and quick-stats strip.
- **Fact & Metric Cards Grid**: 4-column cards with enlarged typography, key figure highlights, and custom icon badges.
- **15 Integrated Modules**:
  - 📊 **Overview**: Capital, currency, language, population, student counts, tuition, living costs, minimum wage.
  - 🏛️ **Universities**: Filterable university catalog (TUM, LMU, RWTH Aachen, TU Berlin, KIT, Humboldt).
  - 📋 **Admission Requirements**: Degree-level breakdowns (Master, Bachelor, PhD), min GPA, IELTS/TOEFL requirements, GRE scores.
  - 📁 **Document Checklist**: Categorized dossier requirements (Passport, Transcripts, SOP, LOR, LOM).
  - 🛡️ **APS Certification Guide**: Complete Indian APS verification process guide, fee breakdown (₹18,000), timelines, and required documents.
  - 🛂 **Visa Guide**: Category D national student visa step-by-step process, VFS global appointment checklist, and rejection prevention tips.
  - 📅 **Interactive Timeline**: Month-by-month roadmap from T-12 months to arrival in Germany.
  - 🎓 **Scholarships**: DAAD EPOS, Deutschlandstipendium, Heinrich Böll, KAS, and Erasmus+ databases.
  - 💶 **Living Cost Calculator**: City-by-city monthly breakdown for Munich, Berlin, Aachen, Karlsruhe, Frankfurt, and Hamburg.
  - 🏠 **Accommodation Guide**: Studierendenwerk dorms, WG-Gesucht shared flats, and private housing portals.
  - 💼 **Part-Time Jobs**: Working student (Werkstudent) rules, 140 full days allowance, min wage (€12.82/hr), and mini-job cap.
  - 🏥 **Health Insurance**: Techniker Krankenkasse (TK), Barmer/AOK public insurance, and private travel cover.
  - 💱 **Currency & Budget**: Real-time EUR to INR converter tool with historical rates.
  - 🔗 **Official Resources**: Verified government links (DAAD, APS India, Uni-Assist, German Embassy, Make it in Germany).
  - ❓ **FAQ Hub**: Searchable Q&A accordion covering tuition, blocked accounts, APS, and visa rules.

### 4. Admin Portal (`/admin`)
- Content management interface for platform administrators.
- Mock JWT authentication workflow (`admin@edunex.io` / `admin123`).
- Management dashboards for university entries, FAQs, and system statistics.

---

## 🛠️ Technology Stack

| Domain | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (Strict mode) |
| **Styling** | Tailwind CSS + Vanilla CSS tokens |
| **Typography** | Google Fonts (`Playfair Display` + `Inter` via `next/font/google`) |
| **Icons** | Lucide React |
| **State & Data** | React Query (`@tanstack/react-query`) + Axios API Client |
| **Animation** | Framer Motion |
| **Deployment** | Vercel (Zero-config Next.js engine) |

---

## 📁 Directory Structure

```
edunex/
├── README.md                 # Master Project Documentation
├── landing.md                # Design System & Component Blueprint
├── vercel.json               # Root Vercel Deployment Configuration
├── client/                   # Frontend Next.js Web Application
│   ├── public/               # Static Assets & Generated Images
│   │   ├── images/
│   │   │   ├── auth_campus_panel.png   # Auth split-panel campus image
│   │   │   ├── hero_campus.png         # Landing hero campus background
│   │   │   ├── graduates_hero.png      # Footer visual banner
│   │   │   └── study_*.png             # Destination card covers
│   ├── src/
│   │   ├── app/              # Next.js App Router Routes
│   │   │   ├── page.tsx                # Landing Page (/)
│   │   │   ├── login/page.tsx          # Login Page (/login)
│   │   │   ├── signup/page.tsx         # Signup Page (/signup)
│   │   │   ├── admin/page.tsx          # Admin Portal (/admin)
│   │   │   └── [countrySlug]/page.tsx  # Dynamic Country Hub (/germany)
│   │   ├── components/       # Reusable UI Components
│   │   │   ├── layout/                 # TopNavbar, StickySidebar, etc.
│   │   │   ├── modules/                # 15 Country Hub Modules
│   │   │   ├── providers/              # Theme & ReactQuery Providers
│   │   │   └── search/                 # Global Search Modal
│   │   ├── services/         # API Layer & Client Fallback Datasets
│   │   │   └── api.ts
│   │   ├── styles/           # Global Tailwind CSS Styles
│   │   └── types/            # TypeScript Interface Definitions
│   ├── package.json
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   └── vercel.json           # Client-level Vercel configuration
└── server/                   # Express Backend Service (Optional API)
```

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Steps

1. **Clone & Navigate**:
   ```bash
   git clone https://github.com/your-username/edunex.git
   cd edunex/client
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Run Production Build Verification**:
   ```bash
   npm run build
   ```
   This validates TypeScript types, static prerendering, and Next.js bundle optimizations.

---

## 🌐 Deploying Frontend to Vercel

The frontend is **100% production ready** and configured for zero-downtime deployment on **Vercel**.

### Option A: Import via Vercel Dashboard (Recommended)

1. Push your code to GitHub / GitLab / Bitbucket.
2. Go to **[Vercel Dashboard](https://vercel.com/dashboard)** and click **"Add New Project"**.
3. Import your repository.
4. Set **Root Directory** to `client` (or leave default if importing the `client` folder directly).
5. Framework Preset will automatically be detected as **Next.js**.
6. Click **"Deploy"**.

### Option B: Deploy via Vercel CLI

From the `client` directory:
```bash
cd client
npx vercel
```
For production release:
```bash
npx vercel --prod
```

### Build & Output Settings (Preset)
- **Build Command**: `next build` (or `npm run build --prefix client` if root directory)
- **Output Directory**: `.next` (or `client/.next`)
- **Install Command**: `npm install`

---

## 📊 Data Accuracy & Sources

Key figures featured in the Germany Hub dataset are verified against official government & educational sources:

| Metric | Value | Reference / Source |
|---|---|---|
| **Blocked Account** | `€11,904 / year (€992 / mo)` | German Federal Foreign Office (Auswärtiges Amt) |
| **Minimum Wage** | `€12.82 / hour` | German Statutory Minimum Wage Commission (2025) |
| **International Students** | `370,000+` | Federal Statistical Office of Germany (Destatis) |
| **Public University Tuition** | `€0` (15/16 States) | DAAD Official Database |
| **Post-Study Work Visa** | `18 Months` | German Residence Act (§ 20 AufenthG) |

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
