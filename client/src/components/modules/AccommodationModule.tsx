'use client';

import React from 'react';
import { AccommodationOption } from '@/types';
import {
  Home,
  Building,
  Users,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';

export default function AccommodationModule({ accommodations }: { accommodations: AccommodationOption[] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
          <Home className="w-6 h-6 text-brand-500 mr-2" />
          Student Accommodation Options
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Detailed breakdown of Student Dorms vs WG Shared Flats vs Private Apartments in Germany.
        </p>
      </div>

      {/* Grid of Accommodation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {accommodations.map((acc) => (
          <div
            key={acc.id}
            className="flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-brand-500/30 transition-all space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-500 text-xs font-bold border border-brand-500/20">
                  {acc.type}
                </span>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {acc.type}
              </h3>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                  <span className="block text-[10px] text-zinc-400 uppercase font-bold">Average Monthly Rent:</span>
                  <span className="font-bold text-base text-emerald-600 dark:text-emerald-400">{acc.avgCostRange}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                  <span className="block text-[10px] text-zinc-400 uppercase font-bold">Deposit Required:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{acc.depositRequired}</span>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Pros
                  </span>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{acc.pros}</p>
                </div>
                <div>
                  <span className="font-bold text-rose-500 flex items-center mb-1">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> Cons
                  </span>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{acc.cons}</p>
                </div>
              </div>

              {/* Tips */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
                <strong className="font-bold flex items-center mb-1 text-amber-600 dark:text-amber-400">
                  <Lightbulb className="w-3.5 h-3.5 mr-1" /> Expert Tip:
                </strong>
                {acc.tips}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
              <span className="text-[11px] font-bold text-zinc-400 uppercase block mb-1">Booking Portals:</span>
              <span className="text-xs font-semibold text-brand-500">{acc.bookingPortals}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
