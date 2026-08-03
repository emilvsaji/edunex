'use client';

import React from 'react';
import Image from 'next/image';
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
  DollarSign,
  ArrowUpRight,
} from 'lucide-react';

// Photo destination cards data (full-bleed landmark imagery)
const DESTINATION_PHOTO_CARDS = [
  {
    slug: 'germany',
    title: 'Study in Germany',
    flag: '🇩🇪',
    image: '/images/study_germany.png',
    stats: [
      { icon: Euro, label: '€0–€3k/yr' },
      { icon: Building2, label: '300+ unis' },
      { icon: Briefcase, label: '18-mo Job Seeker Visa' },
    ],
    tags: ['Engineering', 'Medicine', 'MBA'],
  },
  {
    slug: 'uk',
    title: 'Study in UK',
    flag: '🇬🇧',
    image: '/images/study_uk.png',
    stats: [
      { icon: DollarSign, label: '£12k–£35k' },
      { icon: Building2, label: '160+ unis' },
      { icon: Briefcase, label: '2-yr Graduate Visa' },
    ],
    tags: ['MBA', 'Data Science', 'Nursing'],
  },
  {
    slug: 'canada',
    title: 'Study in Canada',
    flag: '🇨🇦',
    image: '/images/study_canada.png',
    stats: [
      { icon: DollarSign, label: 'CA$15k–$40k' },
      { icon: Building2, label: '96 ranked unis' },
      { icon: Briefcase, label: '3-yr PGWP' },
    ],
    tags: ['Computer Science', 'Business', 'Nursing'],
  },
];

export default function OverviewModule({ country }: { country: Country }) {
  const topCities: string[] = country.topCities ? JSON.parse(country.topCities) : [];
  const popularCourses: string[] = country.popularCourses ? JSON.parse(country.popularCourses) : [];

  const cards = [
    { label: 'Capital', value: country.capital || 'Berlin', icon: Landmark, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Currency', value: country.currency || 'Euro (€)', icon: Euro, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Primary Language', value: country.language || 'German (English for Masters)', icon: Languages, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Population', value: country.population || '84.4 Million', icon: Users, color: 'text-indigo-500 bg-indigo-500/10' },
    { label: 'Intl. Students', value: country.intStudentsCount || '458,210+', icon: GraduationCap, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Average Tuition', value: country.avgTuition, icon: Euro, color: 'text-teal-500 bg-teal-500/10' },
    { label: 'Semester Contribution', value: country.semesterContrib || '€150 - €400', icon: BookOpen, color: 'text-cyan-500 bg-cyan-500/10' },
    { label: 'Blocked Account', value: country.blockedAccountAmt || '€11,904 / year', icon: PiggyBank, color: 'text-rose-500 bg-rose-500/10' },
    { label: 'Minimum Wage', value: country.minWage || '€12.41 / hour', icon: Briefcase, color: 'text-orange-500 bg-orange-500/10' },
    { label: 'Avg. Living Cost', value: country.avgLivingCost, icon: Building2, color: 'text-sky-500 bg-sky-500/10' },
    { label: 'Public Universities', value: `${country.publicUnivCount || 300}+`, icon: Building, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Private Universities', value: `${country.privateUnivCount || 100}+`, icon: Building2, color: 'text-violet-500 bg-violet-500/10' },
    { label: 'Climate', value: country.climate || 'Temperate (-2°C to 25°C)', icon: CloudSun, color: 'text-yellow-500 bg-yellow-500/10' },
    { label: 'Time Difference', value: country.timeDiff || 'UTC+1 / UTC+2', icon: Clock, color: 'text-slate-500 bg-slate-500/10' },
    { label: 'Safety Index', value: country.safetyIndex || '75.2 (Very Safe)', icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
            <span>{country.flagEmoji} Country Profile Overview</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Study in {country.name}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed">
            {country.shortDesc}
          </p>
        </div>
      </div>

      {/* Grid of Key Indicator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-brand-500/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{c.label}</span>
                <div className={`p-2 rounded-xl ${c.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {c.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Top Cities & Popular Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Cities */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="flex items-center text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            <MapPin className="w-5 h-5 text-brand-500 mr-2" />
            Top Student Cities in {country.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {topCities.map((city, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Popular Courses */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="flex items-center text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            <BookOpen className="w-5 h-5 text-indigo-500 mr-2" />
            Popular Degrees &amp; Programs
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularCourses.map((course, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold border border-indigo-500/20"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Study Destinations: Full-Bleed Photo Cards ─── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            🌍 Explore Other Destinations
          </h2>
          <span className="text-xs text-zinc-500 font-medium">Vertical scroll • tap to expand</span>
        </div>

        {/* Vertical scrolling photo card stack */}
        <div className="flex flex-col gap-5">
          {DESTINATION_PHOTO_CARDS.map((dest) => (
            <div
              key={dest.slug}
              className="relative rounded-[20px] overflow-hidden mx-0 shadow-xl"
              style={{ aspectRatio: '4 / 3' }}
            >
              {/* Full-bleed background photo */}
              <Image
                src={dest.image}
                alt={dest.title}
                fill
                className="object-cover object-center"
              />

              {/* Top-left: circular flag badge */}
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-lg shadow-md border border-white/60 z-10">
                {dest.flag}
              </div>

              {/* Top-right: expand / external link button */}
              <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 text-white hover:bg-white/40 transition-all z-10">
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Bottom dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

              {/* Overlay content — bottom-aligned */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col gap-2.5">
                {/* Title */}
                <h3 className="text-[22px] font-bold text-white leading-snug">
                  {dest.title}
                </h3>

                {/* Stats row */}
                <div className="flex items-center gap-4">
                  {dest.stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="flex items-center gap-1 text-white">
                        <Icon className="w-3.5 h-3.5 opacity-80" />
                        <span className="text-[12px] font-medium">{stat.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Tag pills */}
                <div className="flex flex-wrap gap-1.5">
                  {dest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
