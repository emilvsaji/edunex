'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  DollarSign,
  Briefcase,
} from 'lucide-react';
import { countryService } from '@/services/api';
import { Country } from '@/types';
import TopNavbar from '@/components/layout/TopNavbar';

// Country card data: images + meta pills per country
const COUNTRY_CARD_META: Record<
  string,
  {
    badge: string;
    badgeIcon: string;
    heading: string;
    headingBold: string;
    body: string;
    image: string;
    pills: { icon: string; label: string }[];
    ctaLabel: string;
    gradient: string;
    imagePosition: 'right' | 'below';
    statsRow?: { icon: string; label: string }[];
  }
> = {
  germany: {
    badge: 'SCHOLARSHIPS',
    badgeIcon: '🎓',
    heading: 'Unlock Thousands of',
    headingBold: 'Free German Scholarships',
    body:
      'Germany offers one of the most generous scholarship ecosystems in the world — DAAD, government grants, university fellowships, and private foundations. Discover funding that covers tuition, living, and travel.',
    image: '/images/study_germany.png',
    pills: [
      { icon: '🏆', label: '5,000+ scholarships' },
      { icon: '💶', label: 'Covers tuition & living' },
      { icon: '🌍', label: 'Open to Indian students' },
    ],
    ctaLabel: 'Explore Scholarships',
    gradient: 'linear-gradient(135deg, #0A1E4D 0%, #1E4FA3 100%)',
    imagePosition: 'right',
  },
  uk: {
    badge: 'UNIVERSITIES',
    badgeIcon: '🏛️',
    heading: 'World-Class British',
    headingBold: 'Universities & Colleges',
    body:
      'The UK hosts over 160 universities ranked globally, from Oxford to Russell Group institutions. Explore English-taught programs, post-study work visas, and top-tier research opportunities.',
    image: '/images/study_uk.png',
    pills: [
      { icon: '🏫', label: '160+ universities' },
      { icon: '💷', label: '£12k–£35k tuition' },
      { icon: '🛂', label: '2-yr Graduate Visa' },
    ],
    ctaLabel: 'Explore Universities',
    gradient: 'linear-gradient(135deg, #0A1E4D 0%, #1E4FA3 100%)',
    imagePosition: 'right',
  },
  canada: {
    badge: 'WORK & STUDY',
    badgeIcon: '💼',
    heading: 'Study, Work & PR in',
    headingBold: 'Canada — Your Path Forward',
    body:
      'Canada combines world-class education with generous post-study work rights and a clear pathway to permanent residency. Discover co-op programs, PGWP, and express entry immigration options.',
    image: '/images/study_canada.png',
    pills: [
      { icon: '🍁', label: '96 ranked universities' },
      { icon: '⏱️', label: '3-yr PGWP work permit' },
      { icon: '🏠', label: 'PR pathway available' },
    ],
    ctaLabel: 'Explore Canada Hub',
    gradient: 'linear-gradient(135deg, #0A0A0A 0%, #2A2A2A 100%)',
    imagePosition: 'below',
  },
};

// Default fallback for countries not in the meta map
const getDefaultMeta = (country: Country, idx: number) => ({
  badge: 'COMING SOON',
  badgeIcon: country.flagEmoji,
  heading: 'Study in',
  headingBold: country.name,
  body: country.shortDesc,
  image: '',
  pills: [
    { icon: '💰', label: country.avgTuition },
    { icon: '🏙️', label: country.avgLivingCost },
    { icon: '⏰', label: country.workHours },
  ],
  ctaLabel: `Explore ${country.name}`,
  gradient:
    idx % 3 === 2
      ? 'linear-gradient(135deg, #0A0A0A 0%, #2A2A2A 100%)'
      : 'linear-gradient(135deg, #0A1E4D 0%, #1E4FA3 100%)',
  imagePosition: 'right' as const,
});

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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-300">
      {/* Top Header Navigation */}
      <TopNavbar countryName="All Destinations" activeModuleLabel="Home" />

      {/* Hero Section — Deep Navy/Blue Gradient */}
      <section className="relative overflow-hidden w-full" style={{ background: 'linear-gradient(135deg, #03091A 0%, #0A1E4D 45%, #0D2E6E 75%, #1040A0 100%)' }}>
        {/* Decorative Floating Orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #3B6EE8 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #6C3DE8 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse, #2563EB 0%, transparent 60%)' }} />

        {/* Subtle Grid / Mesh Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

        <div className="relative z-10 pt-16 pb-28 px-6 sm:px-12 lg:px-20 xl:px-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

            {/* Left Column */}
            <div className="lg:col-span-7 space-y-8 text-left">

              {/* Platform Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-400/30 bg-white/5 backdrop-blur-sm text-xs font-semibold text-blue-200 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                Next-Gen Study Abroad Intelligence Platform
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-white leading-[1.06]">
                Study Abroad
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #60A5FA, #818CF8, #34D399)' }}
                >
                  made Simple &amp; Precise.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-blue-100/75 max-w-xl leading-relaxed">
                The complete intelligence platform for international students — from university selection and APS verification to visa processing, blocked accounts, and living cost optimization.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  onClick={scrollToGrid}
                  className="group px-8 py-4 rounded-2xl font-extrabold text-sm transition-all hover:scale-[1.03] flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(37,99,235,0.45)]"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}
                >
                  <span className="text-white">Choose Destination</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>
                <Link
                  href="/germany"
                  className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-sm transition-all hover:scale-[1.02] flex items-center justify-center backdrop-blur-sm"
                >
                  🇩🇪 Launch Germany Hub
                </Link>
              </div>

              {/* Trust Chips */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {[
                  { label: '100% Verified Data', color: 'text-emerald-300' },
                  { label: '€0 Tuition Public Universities', color: 'text-blue-300' },
                  { label: 'APS India Prerequisite Guide', color: 'text-violet-300' },
                ].map(({ label, color }) => (
                  <span key={label} className={`flex items-center gap-1.5 text-xs font-semibold ${color}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Graduates Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)] aspect-[4/3] group ring-1 ring-white/10">
                <Image
                  src="/images/graduates_hero.png"
                  alt="International graduates celebrating abroad"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03091A]/80 via-transparent to-transparent" />

                {/* Bottom overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold border border-white/15 uppercase tracking-widest mb-3">
                    🌍 Study Anywhere
                  </span>
                  <h3 className="text-xl font-extrabold leading-snug">
                    Your Global Education <br />
                    <span style={{ color: '#93C5FD' }}>Journey Starts Here</span>
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['Germany', 'UK', 'Canada', 'Australia'].map((dest) => (
                      <span
                        key={dest}
                        className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold border border-white/15"
                      >
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



      {/* Country Grid Section — Premium Gradient Cards */}
      <section id="destinations" className="py-20 px-6 sm:px-12 lg:px-20 xl:px-28 w-full space-y-12 bg-white">
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

        {/* Premium Gradient Card Stack */}
        <div className="flex flex-col gap-6 max-w-2xl mx-auto lg:max-w-none lg:grid lg:grid-cols-2 xl:grid-cols-3">
          {countries.map((c, idx) => {
            const meta = COUNTRY_CARD_META[c.slug] ?? getDefaultMeta(c, idx);
            const isBlue = !meta.gradient.includes('0A0A0A');

            return (
              <div
                key={c.id}
                className="mx-auto w-full rounded-[24px] overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.01] hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)]"
                style={{ background: meta.gradient }}
              >
                <div className="p-8 flex flex-col gap-5">
                  {/* Pill Badge */}
                  <div className="w-fit flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.15] backdrop-blur-sm border border-white/20">
                    <span className="text-sm">{meta.badgeIcon}</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                      {meta.badge}
                    </span>
                  </div>

                  {/* Heading */}
                  <div>
                    <h3 className="text-[28px] font-bold text-white leading-snug">
                      {meta.heading}{' '}
                      <span className="font-extrabold">{meta.headingBold}</span>
                    </h3>
                  </div>

                  {/* Image (right-side layout for card 1 & 2 → shown below heading on small, beside on large) */}
                  {meta.image && (
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
                      <Image
                        src={meta.image}
                        alt={`Study in ${c.name}`}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  )}

                  {/* Body Text */}
                  <p className="text-[15px] text-white/85 leading-relaxed">
                    {meta.body}
                  </p>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-2">
                    {meta.pills.map((pill) => (
                      <span
                        key={pill.label}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/25 bg-white/10 text-white text-[12px] font-semibold"
                      >
                        <span>{pill.icon}</span>
                        {pill.label}
                      </span>
                    ))}
                  </div>

                  {/* CTA Row */}
                  <div className="flex flex-col gap-2">
                    {c.isComplete ? (
                      <Link
                        href={`/${c.slug}`}
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-white text-[#0A1E4D] font-extrabold text-sm hover:bg-white/90 transition-all shadow-lg"
                      >
                        <ArrowRight className="w-4 h-4" />
                        {meta.ctaLabel}
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-white/20 text-white/60 font-bold text-sm cursor-not-allowed border border-white/20"
                      >
                        <Lock className="w-4 h-4" />
                        Coming Soon
                      </button>
                    )}

                    {/* Caption */}
                    <p className="flex items-center gap-1.5 text-[11px] text-white/50 justify-center">
                      <Lock className="w-3 h-3" />
                      Sign in to check and save your result.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 bg-white border-t border-slate-100 px-6 sm:px-12 lg:px-20 xl:px-28 w-full space-y-12">
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
            <h3 className="text-lg font-bold text-slate-900">APS &amp; Visa Step-by-Step</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detailed breakdown of APS India verification, required document checklists, fee transfers, and VFS slots.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Cost &amp; Forex Calculators</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Itemized city living expense sliders, EUR → INR exchange rate historical graphs, and annual budget planning.
            </p>
          </div>
        </div>
      </section>

      {/* Clean White Footer */}
      <footer className="mt-auto py-12 border-t border-slate-100 bg-white text-xs text-slate-500 px-6 sm:px-12 lg:px-20 xl:px-28 w-full">
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
