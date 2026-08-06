'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  GraduationCap,
  ShieldCheck,
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <TopNavbar countryName="All Destinations" activeModuleLabel="Home" />

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden w-full min-h-[82vh] flex items-center justify-center">
        {/* Full-bleed background image */}
        <Image
          src="/images/hero_campus.png"
          alt="European university campus"
          fill
          className="object-cover object-center"
          priority
        />
        {/* White scrim overlay ~65% */}
        <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.65)' }} />

        {/* Hero content — centered */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 py-16 sm:py-24 max-w-5xl mx-auto gap-6 sm:gap-8">

          {/* Dual-weight headline */}
          <h1 className="leading-[1.1] font-serif w-full">
            <span
              className="block text-4xl sm:text-6xl lg:text-7xl tracking-tight font-serif"
              style={{ fontWeight: 300, color: '#0B1220' }}
            >
              Study Abroad
            </span>
            <span
              className="block text-4xl sm:text-6xl lg:text-7xl tracking-tight font-serif"
              style={{ fontWeight: 800, color: '#0B1220' }}
            >
              Made Simple &amp; Precise
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-xl max-w-2xl leading-relaxed" style={{ color: '#1F2937' }}>
            University selection, visa processing, blocked accounts, and living cost optimization — all in one place.
          </p>

          {/* Pill CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={scrollToGrid}
              id="hero-cta-destination"
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base text-white transition-all hover:scale-[1.03] hover:shadow-xl"
              style={{ background: '#111827', boxShadow: '0 4px 24px rgba(0,0,0,0.20)' }}
            >
              Choose Destination
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
              id="hero-cta-explore"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all hover:scale-[1.02]"
              style={{
                background: 'transparent',
                color: '#111827',
                border: '2px solid rgba(0,0,0,0.75)',
              }}
            >
              Explore Countries
            </button>
          </div>
        </div>
      </section>

      {/* ─── Destinations Grid ─── */}
      <section id="destinations" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10 bg-white">
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Global Destinations</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mt-1">
            Select Your Study Destination
          </h2>
        </div>

        {/* 3-column photo card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card) =>
            card.available ? (
              <Link
                key={card.slug}
                href={`/${card.slug}`}
                className="relative rounded-[20px] overflow-hidden shadow-xl group transition-transform duration-300 hover:scale-[1.015] hover:shadow-2xl block text-left"
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
                  <h3 className="text-[22px] font-bold text-white leading-snug drop-shadow-sm">
                    {card.title}
                  </h3>

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
                    <span className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#0A1E4D] text-[13px] font-extrabold shadow-md group-hover:bg-blue-50 transition-colors">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={card.slug}
                className="relative rounded-[20px] overflow-hidden shadow-xl group transition-transform duration-300 block text-left"
                style={{ aspectRatio: '4 / 3' }}
              >
                {/* Full-bleed photo */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover object-center opacity-80"
                />

                {/* Top-left: circular flag badge */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-2xl shadow-md border border-white/60 z-10">
                  {card.flag}
                </div>

                {/* Bottom dark blue gradient overlay */}
                <div
                  className="absolute inset-0 z-10"
                  style={{ background: 'linear-gradient(to top, rgba(10,30,77,0.92) 0%, rgba(10,30,77,0.6) 45%, transparent 75%)' }}
                />

                {/* Overlay content */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 flex flex-col gap-3">
                  <h3 className="text-[22px] font-bold text-white leading-snug drop-shadow-sm">
                    {card.title}
                  </h3>

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
                    <span className="shrink-0 flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/15 text-white/60 text-[12px] font-semibold border border-white/20">
                      <Lock className="w-3 h-3" /> Soon
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* ─── Feature Showcase ─── */}
      <section className="py-16 sm:py-24 border-t border-slate-100 w-full" style={{ background: '#F7F6F3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span
              className="text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ color: '#9CA3AF' }}
            >
              All-in-One Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Engineered for Academic Success
            </h2>
            <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: '#6B7280' }}>
              edunex consolidates all critical tools and data points into a single seamless SaaS environment.
            </p>
          </div>

          {/* Minimal Borderless Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center px-6 py-8 space-y-4 group">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full mb-2 transition-colors group-hover:bg-slate-100"
                style={{ background: 'rgba(0,0,0,0.05)' }}
              >
                <GraduationCap className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Universities Directory</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                Filter by city, public/private status, degree levels, and English-taught programs with real-time sorting.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="flex flex-col items-center text-center px-6 py-8 space-y-4 group rounded-2xl"
              style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full mb-2 transition-colors group-hover:bg-slate-100"
                style={{ background: 'rgba(0,0,0,0.05)' }}
              >
                <ShieldCheck className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Visa &amp; Application Guidance</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                Step-by-step visa checklists, required document guides, appointment scheduling tips, and blocked account setup.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center text-center px-6 py-8 space-y-4 group">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full mb-2 transition-colors group-hover:bg-slate-100"
                style={{ background: 'rgba(0,0,0,0.05)' }}
              >
                <Calculator className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Cost &amp; Forex Calculators</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                Itemized city living expense sliders, EUR → INR exchange rate historical graphs, and annual budget planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer: Part 1 — Full-bleed wordmark image ─── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: '280px' }}>
        <Image
          src="/images/graduates_hero.png"
          alt="edunex — study abroad platform"
          fill
          className="object-cover object-center"
        />
        {/* Dark scrim */}
        <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.68)' }} />
        {/* Centered wordmark */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full py-16 px-6 text-center">
          <span
            className="font-extrabold tracking-tight text-white leading-none select-none"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', letterSpacing: '-0.03em' }}
          >
            edunex
          </span>
          <p className="mt-4 text-xs sm:text-sm font-medium tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Your Global Education Platform
          </p>
        </div>
      </div>

      {/* ─── Footer: Part 2 — Dark multi-column link footer ─── */}
      <footer style={{ background: '#0F0F0F' }} className="text-sm w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 border-b pb-10" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>

            {/* Brand column */}
            <div className="space-y-3 max-w-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                  <span className="font-extrabold text-sm text-gray-900">e</span>
                </div>
                <span className="font-extrabold text-base text-white">edu<span style={{ color: '#6B7280' }}>nex</span></span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                The complete intelligence platform for international students navigating study abroad.
              </p>
            </div>

            {/* Links columns */}
            <div className="flex flex-wrap gap-12">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#9CA3AF' }}>Platform</p>
                <div className="space-y-2">
                  <Link href="/germany" className="block text-sm transition-colors hover:text-white" style={{ color: '#6B7280' }}>Germany Hub</Link>
                  <span className="block text-sm cursor-not-allowed" style={{ color: '#374151' }}>UK Hub <span className="text-xs">(soon)</span></span>
                  <span className="block text-sm cursor-not-allowed" style={{ color: '#374151' }}>USA Hub <span className="text-xs">(soon)</span></span>
                  <span className="block text-sm cursor-not-allowed" style={{ color: '#374151' }}>Canada Hub <span className="text-xs">(soon)</span></span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#9CA3AF' }}>Admin</p>
                <div className="space-y-2">
                  <Link href="/admin" className="block text-sm transition-colors hover:text-white" style={{ color: '#6B7280' }}>Admin Portal</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: '#4B5563' }}>© 2026 edunex Platform. All rights reserved.</p>
            <p className="text-xs" style={{ color: '#374151' }}>Built for international students, by people who've been there.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
