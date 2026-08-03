'use client';

import React from 'react';
import { Newspaper, Calendar, ExternalLink, Sparkles } from 'lucide-react';

export default function NewsModule() {
  const newsItems = [
    {
      id: 1,
      title: 'Germany Increases Student Part-Time Work Limit to 140 Full Days',
      date: 'March 2024',
      category: 'Policy Change',
      summary: 'Under the new Skilled Immigration Act, international students can now work up to 140 full days (or 280 half days) per calendar year, increased from 120 days.',
      source: 'Make it in Germany Official',
    },
    {
      id: 2,
      title: 'New Citizenship & Permanent Residency Law Comes into Effect',
      date: 'June 2024',
      category: 'Immigration',
      summary: 'German university graduates can now apply for Permanent Residency after just 2 years of skilled employment. Dual citizenship is also legally permitted.',
      source: 'Federal Ministry of the Interior',
    },
    {
      id: 3,
      title: 'Mini-Job Earnings Cap Adjusted to €538/month Tax-Free',
      date: 'January 2024',
      category: 'Student Finance',
      summary: 'The tax-free monthly earnings threshold for Mini-jobs has been officially raised to €538/month aligned with statutory minimum wage changes.',
      source: 'Federal Employment Agency',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
          <Newspaper className="w-6 h-6 text-brand-500 mr-2" />
          News & Policy Updates
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Stay updated on German student visa regulations, working hours, and PR laws.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-500 font-bold">
                {item.category}
              </span>
              <span className="text-zinc-400 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1" /> {item.date}
              </span>
            </div>

            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
              {item.title}
            </h3>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {item.summary}
            </p>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-semibold text-zinc-400">
              Source: {item.source}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
