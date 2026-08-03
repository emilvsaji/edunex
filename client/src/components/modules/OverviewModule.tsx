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
    <div className="space-y-8 animate-in fade-in duration-300">
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
            Popular Degrees & Programs
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
    </div>
  );
}
