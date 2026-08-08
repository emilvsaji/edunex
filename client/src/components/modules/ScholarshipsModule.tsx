'use client';

import React, { useState, useMemo } from 'react';
import { Scholarship } from '@/types';
import {
  Award,
  Search,
  ExternalLink,
  Calendar,
  DollarSign,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface Props {
  scholarships: Scholarship[];
  countryName?: string;
}

export default function ScholarshipsModule({ scholarships, countryName }: Props) {
  const [search, setSearch] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('All');

  const providers = useMemo(() => {
    const set = new Set<string>();
    scholarships.forEach((s) => set.add(s.providerType));
    return ['All', ...Array.from(set)];
  }, [scholarships]);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((s) => {
      if (selectedProvider !== 'All' && s.providerType !== selectedProvider) return false;
      if (search) {
        const q = search.toLowerCase();
        const matchTitle = s.title.toLowerCase().includes(q);
        const matchDesc = s.description.toLowerCase().includes(q);
        const matchElig = s.eligibility.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchElig) return false;
      }
      return true;
    });
  }, [scholarships, search, selectedProvider]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Filter Controls */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
              <Award className="w-6 h-6 text-emerald-500 mr-2" />
              Scholarships & Grants Database
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Search government, institutional, university, and foundation funding opportunities{countryName ? ` in ${countryName}` : ''}.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
            <span>{filteredScholarships.length} Funding Options Found</span>
          </div>
        </div>

        {/* Search & Provider Tabs */}
        <div className="flex flex-col md:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search scholarship name, funding details, or eligibility..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-xs sm:text-sm outline-none focus:border-emerald-500 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div className="flex items-center space-x-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 overflow-x-auto">
            {providers.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedProvider(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedProvider === p
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scholarship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredScholarships.map((sch) => (
          <div
            key={sch.id}
            className="flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                  {sch.providerType} Funding
                </span>
                <span className="text-xs font-semibold text-zinc-400 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" /> Deadline: {sch.deadline}
                </span>
              </div>

              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors">
                {sch.title}
              </h3>

              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Funding Coverage:</span>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {sch.fundingAmount}
                </p>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {sch.description}
              </p>

              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 text-xs text-zinc-700 dark:text-zinc-300">
                <strong className="font-semibold text-brand-500 block mb-0.5">Eligibility:</strong>
                {sch.eligibility}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 flex items-center">
                <GraduationCap className="w-4 h-4 mr-1 text-emerald-500" /> {sch.degreeLevel}
              </span>
              <a
                href={sch.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center"
              >
                Official Apply Portal <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
