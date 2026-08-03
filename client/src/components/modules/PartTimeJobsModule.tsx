'use client';

import React from 'react';
import { PartTimeJobInfo } from '@/types';
import {
  Briefcase,
  Clock,
  Euro,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Building2,
} from 'lucide-react';

export default function PartTimeJobsModule({ partTimeJobs }: { partTimeJobs: PartTimeJobInfo[] }) {
  const jobInfo = partTimeJobs[0];

  if (!jobInfo) {
    return <div className="p-8 text-center text-zinc-400">Job rules data loading...</div>;
  }

  const popularJobs: string[] = jobInfo.popularJobsJson ? JSON.parse(jobInfo.popularJobsJson) : [];
  const portals: string[] = jobInfo.jobPortalsJson ? JSON.parse(jobInfo.jobPortalsJson) : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold border border-white/20">
          <Briefcase className="w-4 h-4 text-amber-200 mr-1" /> German Student Labor Law Guidelines
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Part-Time Jobs & Working Rights</h1>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
          Everything international students need to know about working limits, tax rules, and earning options in Germany.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Allowed Work Limit</span>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{jobInfo.allowedHours}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <Euro className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Statutory Minimum Wage</span>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{jobInfo.minWage}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Tax-Free Mini-Job Cap</span>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{jobInfo.miniJobCap}</p>
          </div>
        </div>
      </div>

      {/* Tax & Semester Rules Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mr-2" /> Semester Working Rules
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{jobInfo.semesterRules}</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
            <Clock className="w-4 h-4 text-orange-500 mr-2" /> Holiday / Break Rules
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{jobInfo.holidayRules}</p>
        </div>
      </div>

      {/* Popular Student Jobs List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Popular Student Roles & Average Pay
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popularJobs.map((job, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 flex items-center space-x-3"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{job}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
