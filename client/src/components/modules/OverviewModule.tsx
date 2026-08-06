'use client';

import React from 'react';
import { Country } from '@/types';
import {
  Landmark,
  Euro,
  Languages,
  Users,
  GraduationCap,
  PiggyBank,
  Briefcase,
  Building2,
  MapPin,
  BookOpen,
  CloudSun,
  Clock,
  ShieldCheck,
  Building,
} from 'lucide-react';

// ── Stat card configuration ────────────────────────────────────────────────
// Values that represent a key number get larger display treatment (isHighlight)
function buildCards(country: Country) {
  return [
    { label: 'Capital', value: country.capital || 'Berlin', icon: Landmark, color: 'text-amber-500 bg-amber-500/10', isHighlight: false },
    { label: 'Currency', value: country.currency || 'Euro (€)', icon: Euro, color: 'text-emerald-500 bg-emerald-500/10', isHighlight: false },
    { label: 'Primary Language', value: country.language || 'German (English for Masters)', icon: Languages, color: 'text-blue-500 bg-blue-500/10', isHighlight: false },
    { label: 'Population', value: country.population || '84.4 Million', icon: Users, color: 'text-indigo-500 bg-indigo-500/10', isHighlight: false },
    { label: 'Intl. Students', value: country.intStudentsCount || '370,000+', icon: GraduationCap, color: 'text-purple-500 bg-purple-500/10', isHighlight: true },
    { label: 'Average Tuition', value: country.avgTuition || '€0 – €3,000 / yr', icon: Euro, color: 'text-teal-500 bg-teal-500/10', isHighlight: true },
    { label: 'Semester Contribution', value: country.semesterContrib || '€150 – €400 / semester', icon: BookOpen, color: 'text-cyan-500 bg-cyan-500/10', isHighlight: false },
    { label: 'Blocked Account', value: country.blockedAccountAmt || '€11,904 / year', icon: PiggyBank, color: 'text-rose-500 bg-rose-500/10', isHighlight: true },
    { label: 'Minimum Wage', value: country.minWage || '€12.82 / hour', icon: Briefcase, color: 'text-orange-500 bg-orange-500/10', isHighlight: true },
    { label: 'Avg. Living Cost', value: country.avgLivingCost || '€934 – €1,100 / month', icon: Building2, color: 'text-sky-500 bg-sky-500/10', isHighlight: true },
    { label: 'Public Universities', value: `${country.publicUnivCount || 300}+`, icon: Building, color: 'text-emerald-500 bg-emerald-500/10', isHighlight: false },
    { label: 'Private Universities', value: `${country.privateUnivCount || 100}+`, icon: Building2, color: 'text-violet-500 bg-violet-500/10', isHighlight: false },
    { label: 'Climate', value: country.climate || 'Temperate (–2°C to 25°C)', icon: CloudSun, color: 'text-yellow-500 bg-yellow-500/10', isHighlight: false },
    { label: 'Time Zone', value: country.timeDiff || 'UTC+1 (CET) / UTC+2 (CEST)', icon: Clock, color: 'text-slate-500 bg-slate-500/10', isHighlight: false },
    { label: 'Safety Index', value: country.safetyIndex || '75.2 (Very Safe) est.', icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-500/10', isHighlight: false },
  ];
}

export default function OverviewModule({ country }: { country: Country }) {
  const topCities: string[] = country.topCities ? JSON.parse(country.topCities) : [];
  const popularCourses: string[] = country.popularCourses ? JSON.parse(country.popularCourses) : [];
  const cards = buildCards(country);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0B1220 0%, #1E293B 60%, #0F172A 100%)',
          boxShadow: '0 8px 40px rgba(11,18,32,0.28)',
        }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(37,99,235,0.12) 0%, transparent 55%), radial-gradient(circle at 10% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 px-5 py-6 sm:px-10 sm:py-12">
          {/* Eyebrow badge — edunex uppercase tracked style */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span>{country.flagEmoji}</span>
            <span>{country.code} Country Profile Overview</span>
          </div>

          {/* Heading — Playfair Display */}
          <h1
            className="font-serif font-bold text-white mb-3"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Study in {country.name}
          </h1>

          {/* Short description */}
          <p
            className="font-sans leading-relaxed max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.9375rem' }}
          >
            {country.shortDesc}
          </p>

          {/* Quick stats strip */}
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { label: 'Avg. Tuition', value: country.avgTuition || '€0 – €3k / yr' },
              { label: 'Living Cost', value: country.avgLivingCost || '€934 – €1,100 / month' },
              { label: 'Work Rights', value: country.workHours || '140 full days / year' },
              { label: 'Intakes', value: country.popularIntake || 'Winter & Summer' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-0.5 px-4 py-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {stat.label}
                </span>
                <span className="text-sm font-bold text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Key Indicator Cards ──────────────────────────────────────────── */}
      <div>
        <h2 className="font-serif font-bold mb-4" style={{ fontSize: '1.25rem', color: '#0F172A' }}>
          Key Facts &amp; Figures
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="group rounded-2xl bg-white transition-all duration-200"
                style={{
                  padding: '20px 22px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(37,99,235,0.25)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(37,99,235,0.08)';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.08)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold font-sans" style={{ color: '#4B5563' }}>
                    {c.label}
                  </span>
                  <div className={`p-2 rounded-xl ${c.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p
                  className="font-bold font-sans tracking-tight leading-tight"
                  style={{
                    fontSize: c.isHighlight ? '1.2rem' : '1rem',
                    color: '#0F172A',
                  }}
                >
                  {c.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Top Cities & Popular Courses ────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Top Student Cities */}
        <div
          className="rounded-2xl bg-white"
          style={{ padding: '24px 28px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        >
          <h3 className="flex items-center gap-2 font-serif font-bold mb-5" style={{ fontSize: '1.125rem', color: '#0F172A' }}>
            <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: '#2563EB' }} />
            Top Student Cities in {country.name}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {topCities.map((city, idx) => (
              <span
                key={idx}
                className="font-sans font-semibold text-sm rounded-xl"
                style={{
                  padding: '8px 16px',
                  background: '#F7F6F3',
                  border: '1px solid rgba(0,0,0,0.08)',
                  color: '#374151',
                }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Popular Degrees */}
        <div
          className="rounded-2xl bg-white"
          style={{ padding: '24px 28px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        >
          <h3 className="flex items-center gap-2 font-serif font-bold mb-5" style={{ fontSize: '1.125rem', color: '#0F172A' }}>
            <BookOpen className="w-5 h-5 flex-shrink-0" style={{ color: '#7C3AED' }} />
            Popular Degrees &amp; Programs
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {popularCourses.map((course, idx) => (
              <span
                key={idx}
                className="font-sans font-semibold text-sm rounded-xl"
                style={{
                  padding: '8px 16px',
                  background: '#EFF6FF',
                  border: '1px solid rgba(37,99,235,0.18)',
                  color: '#2563EB',
                }}
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
