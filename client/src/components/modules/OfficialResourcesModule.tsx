'use client';

import React from 'react';
import { OfficialResource } from '@/types';
import {
  Globe,
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  Home,
  Landmark,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  resources: OfficialResource[];
  countryName?: string;
}

export default function OfficialResourcesModule({ resources, countryName }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
          <Globe className="w-6 h-6 text-brand-500 mr-2" />
          Verified Official Resources & Portals
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Direct links to verified governmental, academic, and administrative portals{countryName ? ` in ${countryName}` : ''}.
        </p>
      </div>

      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <a
            key={res.id}
            href={res.url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-brand-500/40 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold border border-brand-500/20">
                  {res.category}
                </span>
                {res.badgeText && (
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {res.badgeText}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-500 transition-colors flex items-center justify-between">
                <span>{res.title}</span>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-brand-500 transition-colors shrink-0 ml-2" />
              </h3>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {res.description}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-4 flex items-center text-xs font-bold text-brand-500">
              Visit Portal <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
