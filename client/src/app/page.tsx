'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Globe,
  GraduationCap,
  Euro,
  Building2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Search,
  BookOpen,
  Award,
  FileText,
  Calculator,
  ChevronRight,
  Sliders,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { countryService } from '@/services/api';
import { Country } from '@/types';
import TopNavbar from '@/components/layout/TopNavbar';

export default function LandingPage() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    countryService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  const scrollToGrid = () => {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-brand-500/20 selection:text-brand-600">
      {/* Top Header Navigation */}
      <TopNavbar countryName="All Destinations" activeModuleLabel="Home" />

      {/* Hero Section - Full Width Ratio Split */}
      <section className="relative pt-12 pb-20 px-4 sm:px-8 lg:px-12 max-w-[1536px] mx-auto w-full overflow-hidden">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-brand-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-50/60 via-blue-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Typography & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Glowing Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 shadow-sm text-xs font-semibold text-slate-800">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Next-Gen Study Abroad Intelligence Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.08]">
              Study Abroad <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-indigo-600 to-emerald-600">
                made Simple & Precise.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              The complete database-driven SaaS platform empowering international students through every stage — from university selection and APS verification to visa processing, blocked accounts, and living cost optimization.
            </p>

            {/* CTAs & Stats Pill */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={scrollToGrid}
                className="px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-xl shadow-brand-500/20 transition-all hover:scale-[1.02] flex items-center justify-center"
              >
                Choose Destination <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <Link
                href="/germany"
                className="px-8 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-900 font-extrabold text-sm transition-all hover:scale-[1.02] flex items-center justify-center"
              >
                🇩🇪 Launch Germany Hub
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-500">
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> 100% Verified Data
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> €0 Tuition Public Universities
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> APS India Prerequisite Guide
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Live Preview Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xl space-y-6 relative overflow-hidden group">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">🇩🇪</span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Germany Destination Hub</h3>
                    <span className="text-xs text-emerald-600 font-semibold flex items-center">
                      ● Complete Database Active
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-extrabold border border-brand-200">
                  Featured
                </span>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium block">Avg Tuition</span>
                  <span className="font-extrabold text-sm text-slate-900">€0 - €3,000 / yr</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium block">Blocked Account</span>
                  <span className="font-extrabold text-sm text-slate-900">€11,904 / yr</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium block">Part-Time Work</span>
                  <span className="font-extrabold text-sm text-slate-900">140 Full Days</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium block">Int. Students</span>
                  <span className="font-extrabold text-sm text-emerald-600">458,210+</span>
                </div>
              </div>

              {/* Direct module quick launch bar */}
              <div className="pt-2">
                <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">Explore Modules:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Universities', key: 'universities' },
                    { label: 'APS Guide', key: 'aps' },
                    { label: 'Visa Guide', key: 'visa' },
                    { label: 'Living Cost', key: 'living-cost' },
                    { label: 'Scholarships', key: 'scholarships' },
                  ].map((m) => (
                    <Link
                      key={m.key}
                      href={`/germany?module=${m.key}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-700 text-xs font-semibold transition-all"
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/germany"
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center"
              >
                Open Full Germany Dashboard <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="py-12 bg-slate-50/80 border-y border-slate-200/80">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <h4 className="text-2xl font-extrabold text-slate-900">100% Normalized</h4>
            <p className="text-xs text-slate-500 font-medium">Database-driven architecture</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl font-extrabold text-emerald-600">300+ Public Univs</h4>
            <p className="text-xs text-slate-500 font-medium">Tuition-free German institutions</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl font-extrabold text-brand-600">16 Content Modules</h4>
            <p className="text-xs text-slate-500 font-medium">Complete student lifecycle support</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl font-extrabold text-indigo-600">Command+K Index</h4>
            <p className="text-xs text-slate-500 font-medium">Instant global fuzzy search</p>
          </div>
        </div>
      </section>

      {/* Country Grid Section - Ultrawide 4-Column Layout */}
      <section id="destinations" className="py-20 px-4 sm:px-8 lg:px-12 max-w-[1536px] mx-auto w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Global Destinations</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mt-1">
              Select Your Study Destination
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Click Germany to launch the complete 16-module dashboard. Other countries display Coming Soon badges with zero UI code changes required.
          </p>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {countries.map((c) => (
            <div
              key={c.id}
              className={`flex flex-col justify-between p-6 rounded-3xl border transition-all ${
                c.isComplete
                  ? 'bg-white border-brand-500/50 shadow-xl ring-2 ring-brand-500/10 hover:shadow-2xl hover:border-brand-600 hover:scale-[1.02]'
                  : 'bg-slate-50/60 border-slate-200/80 opacity-90'
              }`}
            >
              <div className="space-y-4">
                {/* Header: Flag, Name, Status Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{c.flagEmoji}</span>
                    <h3 className="text-lg font-bold text-slate-900">{c.name}</h3>
                  </div>
                  {c.isComplete ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-extrabold border border-emerald-200">
                      Live Data
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-600 text-[11px] font-bold flex items-center">
                      <Lock className="w-3 h-3 mr-1" /> Coming Soon
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {c.shortDesc}
                </p>

                {/* Key Indicators */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-medium">Avg Tuition</span>
                    <span className="font-semibold text-slate-800 line-clamp-1">{c.avgTuition}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-medium">Living Cost</span>
                    <span className="font-semibold text-slate-800 line-clamp-1">{c.avgLivingCost}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-medium">Work Hours</span>
                    <span className="font-semibold text-slate-800 line-clamp-1">{c.workHours}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-medium">Intake</span>
                    <span className="font-semibold text-slate-800 line-clamp-1">{c.popularIntake}</span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="pt-6">
                {c.isComplete ? (
                  <Link
                    href={`/${c.slug}`}
                    className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-extrabold transition-all shadow-md flex items-center justify-center"
                  >
                    Explore {c.name} Hub <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-3.5 rounded-xl bg-slate-200/70 text-slate-400 text-xs font-semibold cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80 px-4 sm:px-8 lg:px-12 max-w-[1536px] mx-auto w-full space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">All-in-One Capabilities</span>
          <h2 className="text-3xl font-extrabold text-slate-950">Engineered for Academic Success</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            edunex consolidates all critical tools and data points into a single seamless SaaS environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Universities Directory</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Filter by city, public/private status, degree levels, and English-taught programs with real-time sorting.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">APS & Visa Step-by-Step</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detailed breakdown of APS India verification, required document checklists, fee transfers, and VFS slots.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Cost & Forex Calculators</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Itemized city living expense sliders, EUR → INR exchange rate historical graphs, and annual budget planning.
            </p>
          </div>
        </div>
      </section>

      {/* Clean White Footer */}
      <footer className="mt-auto py-12 border-t border-slate-200 bg-white text-xs text-slate-500 px-4 sm:px-8 lg:px-12 max-w-[1536px] mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
              e
            </div>
            <span className="font-extrabold text-sm text-slate-900">edunex</span>
            <span>© 2026 edunex Platform. All rights reserved.</span>
          </div>
          <div className="flex space-x-6 font-semibold">
            <Link href="/germany" className="hover:text-brand-600 transition-colors">Germany Hub</Link>
            <Link href="/admin" className="hover:text-brand-600 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
