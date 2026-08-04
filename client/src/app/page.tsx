'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Calculator,
  ArrowUpRight,
  DollarSign,
  Building2,
  Briefcase,
} from 'lucide-react';
import { countryService } from '@/services/api';
import { Country } from '@/types';
import TopNavbar from '@/components/layout/TopNavbar';

// Static destination card data — reference-style full-bleed photo cards
const DEST_CARDS = [
  {
    slug: 'germany',
    title: 'Study in Germany',
    flag: '🇩🇪',
    image: '/images/dest_germany.png',
    available: true,
    stats: [
      { icon: DollarSign, label: '€0–€3k/yr' },
      { icon: Building2, label: '300+ unis' },
      { icon: Briefcase, label: '18-mo Job Seeker' },
    ],
    tags: ['Engineering', 'Medicine', 'Computer Sci'],
  },
  {
    slug: 'uk',
    title: 'Study in United Kingdom',
    flag: '🇬🇧',
    image: '/images/dest_uk.png',
    available: false,
    stats: [
      { icon: DollarSign, label: '£12k–£35k' },
      { icon: Building2, label: '160+ unis' },
      { icon: Briefcase, label: '2-yr Graduate Visa' },
    ],
    tags: ['MBA', 'Data Science', 'Nursing'],
  },
  {
    slug: 'usa',
    title: 'Study in United States',
    flag: '🇺🇸',
    image: '/images/dest_usa.png',
    available: false,
    stats: [
      { icon: DollarSign, label: '$20k–$55k' },
      { icon: Building2, label: '4,000+ unis' },
      { icon: Briefcase, label: 'OPT up to 3 yrs' },
    ],
    tags: ['MS in CS', 'MBA', 'Data Science'],
  },
  {
    slug: 'canada',
    title: 'Study in Canada',
    flag: '🇨🇦',
    image: '/images/dest_canada.png',
    available: false,
    stats: [
      { icon: DollarSign, label: 'CA$15k–$40k' },
      { icon: Building2, label: '96 ranked unis' },
      { icon: Briefcase, label: '3-yr PGWP' },
    ],
    tags: ['Computer Science', 'Business', 'Health'],
  },
  {
    slug: 'australia',
    title: 'Study in Australia',
    flag: '🇦🇺',
    image: '/images/dest_australia.png',
    available: false,
    stats: [
      { icon: DollarSign, label: 'A$20k–$45k' },
      { icon: Building2, label: '43 ranked unis' },
      { icon: Briefcase, label: '2–4yr PSW Visa' },
    ],
    tags: ['Nursing', 'Engineering', 'MBA'],
  },
];

export default function LandingPage() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    countryService.getAll().then((data) => setCountries(data));
  }, []);

  const scrollToGrid = () => {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Merge live data availability with static card list
  const cards = DEST_CARDS.map((card) => {
    const live = countries.find((c) => c.slug === card.slug);
    return { ...card, available: live?.isComplete ?? card.available };
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-300">
      <TopNavbar countryName="All Destinations" activeModuleLabel="Home" />

      {/* ─── Hero Section ─── */}
      <section
        className="relative overflow-hidden w-full"
        style={{ background: 'linear-gradient(135deg, #03091A 0%, #0A1E4D 45%, #0D2E6E 75%, #1040A0 100%)' }}
      >
        {/* Orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #3B6EE8 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #6C3DE8 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse, #2563EB 0%, transparent 60%)' }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

        <div className="relative z-10 pt-16 pb-28 px-6 sm:px-12 lg:px-20 xl:px-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

            {/* Left */}
            <div className="lg:col-span-6 space-y-9 text-left">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-blue-400/30 bg-white/5 backdrop-blur-sm text-sm font-semibold text-blue-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-blue-300" />
                Next-Gen Study Abroad Intelligence Platform
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-extrabold tracking-tight text-white leading-[1.05]">
                Study Abroad
                <br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #60A5FA, #818CF8, #34D399)' }}>
                  made Simple &amp; Precise.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-blue-100/75 max-w-xl leading-relaxed">
                The complete intelligence platform for international students — from university selection and APS verification to visa processing, blocked accounts, and living cost optimization.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
                <button
                  onClick={scrollToGrid}
                  className="group px-9 py-4 rounded-2xl font-extrabold text-base transition-all hover:scale-[1.03] flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(37,99,235,0.45)]"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}
                >
                  <span className="text-white">Choose Destination</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                {[
                  { label: '100% Verified Data', color: 'text-emerald-300' },
                  { label: '€0 Tuition Public Universities', color: 'text-blue-300' },
                  { label: 'APS India Prerequisite Guide', color: 'text-violet-300' },
                ].map(({ label, color }) => (
                  <span key={label} className={`flex items-center gap-1.5 text-sm font-semibold ${color}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)] aspect-[4/3] group ring-1 ring-white/10">
                <Image
                  src="/images/graduates_hero.png"
                  alt="International graduates celebrating abroad"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03091A]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold border border-white/15 uppercase tracking-widest mb-3">
                    🌍 Study Anywhere
                  </span>
                  <h3 className="text-2xl font-extrabold leading-snug">
                    Your Global Education <br />
                    <span style={{ color: '#93C5FD' }}>Journey Starts Here</span>
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['Germany', 'UK', 'USA', 'Canada', 'Australia'].map((dest) => (
                      <span key={dest} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-semibold border border-white/15">
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Destinations Grid ─── */}
      <section id="destinations" className="py-24 px-6 sm:px-12 lg:px-20 xl:px-28 w-full space-y-12 bg-white">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-7">
          <div>
            <span className="text-sm font-bold text-brand-600 uppercase tracking-wider">Global Destinations</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mt-2">
              Select Your Study Destination
            </h2>
          </div>
          <p className="text-base text-slate-500 max-w-md">
            Click a destination to launch its full dashboard. Germany is fully live with 16 modules.
          </p>
        </div>

        {/* 3-column photo card grid — reference-style */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.slug}
              className="relative rounded-[20px] overflow-hidden shadow-xl group transition-transform duration-300 hover:scale-[1.015] hover:shadow-2xl"
              style={{ aspectRatio: '4 / 3' }}
            >
              {/* Full-bleed photo */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Top-left: circular flag badge */}
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-2xl shadow-md border border-white/60 z-10">
                {card.flag}
              </div>

              {/* Top-right: expand arrow button */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md border border-white/30 z-10 group-hover:bg-white transition-colors">
                <ArrowUpRight className="w-5 h-5 text-slate-700" />
              </div>

              {/* Bottom dark blue gradient overlay */}
              <div
                className="absolute inset-0 z-10"
                style={{ background: 'linear-gradient(to top, rgba(10,30,77,0.92) 0%, rgba(10,30,77,0.6) 45%, transparent 75%)' }}
              />

              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-5 flex flex-col gap-3">
                {/* Title */}
                <h3 className="text-[22px] font-bold text-white leading-snug drop-shadow-sm">
                  {card.title}
                </h3>

                {/* Stats row */}
                <div className="flex items-center gap-4 flex-wrap">
                  {card.stats.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label} className="flex items-center gap-1.5 text-white/90">
                        <Icon className="w-3.5 h-3.5 opacity-75 shrink-0" />
                        <span className="text-[13px] font-medium">{s.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Tag pills + CTA */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[12px] font-semibold text-white border border-white/25 bg-white/15 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {card.available ? (
                    <Link
                      href={`/${card.slug}`}
                      className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#0A1E4D] text-[13px] font-extrabold shadow-md hover:bg-blue-50 transition-colors"
                    >
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <span className="shrink-0 flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/15 text-white/60 text-[12px] font-semibold border border-white/20">
                      <Lock className="w-3 h-3" /> Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Feature Showcase ─── */}
      <section className="py-24 bg-white border-t border-slate-100 px-6 sm:px-12 lg:px-20 xl:px-28 w-full space-y-14">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-sm font-bold text-brand-600 uppercase tracking-wider">All-in-One Capabilities</span>
          <h2 className="text-4xl font-extrabold text-slate-950">Engineered for Academic Success</h2>
          <p className="text-base text-slate-500">
            edunex consolidates all critical tools and data points into a single seamless SaaS environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          <div className="p-9 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Universities Directory</h3>
            <p className="text-base text-slate-600 leading-relaxed">
              Filter by city, public/private status, degree levels, and English-taught programs with real-time sorting.
            </p>
          </div>

          <div className="p-9 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">APS &amp; Visa Step-by-Step</h3>
            <p className="text-base text-slate-600 leading-relaxed">
              Detailed breakdown of APS India verification, required document checklists, fee transfers, and VFS slots.
            </p>
          </div>

          <div className="p-9 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Calculator className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Cost &amp; Forex Calculators</h3>
            <p className="text-base text-slate-600 leading-relaxed">
              Itemized city living expense sliders, EUR → INR exchange rate historical graphs, and annual budget planning.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="mt-auto py-14 border-t border-slate-100 bg-white text-sm text-slate-500 px-6 sm:px-12 lg:px-20 xl:px-28 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm">e</div>
            <span className="font-extrabold text-base text-slate-900">edunex</span>
            <span>© 2026 edunex Platform. All rights reserved.</span>
          </div>
          <div className="flex space-x-6 font-semibold text-sm">
            <Link href="/germany" className="hover:text-brand-600 transition-colors">Germany Hub</Link>
            <Link href="/admin" className="hover:text-brand-600 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
