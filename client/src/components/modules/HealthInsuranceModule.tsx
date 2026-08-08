'use client';

import React from 'react';
import { InsuranceOption } from '@/types';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Award,
  HeartPulse,
} from 'lucide-react';

interface Props {
  insurances: InsuranceOption[];
  countryName?: string;
}

export default function HealthInsuranceModule({ insurances, countryName }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
          <HeartPulse className="w-6 h-6 text-rose-500 mr-2" />
          Health Insurance Guide & Comparison
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Statutory Public Insurance vs Private Travel/Student Insurance options{countryName ? ` in ${countryName}` : ''}.
        </p>
      </div>

      {/* Insurance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insurances.map((ins) => (
          <div
            key={ins.id}
            className="flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    ins.type === 'Public'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                  }`}
                >
                  {ins.type} Insurance
                </span>
                <span className="text-sm font-extrabold text-brand-500">{ins.monthlyCost}</span>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {ins.providerName}
              </h3>

              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 text-xs">
                <span className="block text-[10px] text-zinc-400 uppercase font-bold mb-1">Recommended For:</span>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">{ins.recommendedFor}</p>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <strong className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-0.5">Coverage Details:</strong>
                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{ins.coverageDetails}</p>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="space-y-2 text-xs pt-2">
                <div className="flex items-start space-x-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span><strong>Pros:</strong> {ins.pros}</span>
                </div>
                <div className="flex items-start space-x-1.5 text-rose-500">
                  <XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span><strong>Cons:</strong> {ins.cons}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 text-xs text-zinc-400">
              <strong className="font-medium">Requirements:</strong> {ins.requirements}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
