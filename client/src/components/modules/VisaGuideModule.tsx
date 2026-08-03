'use client';

import React from 'react';
import { VisaInfo } from '@/types';
import {
  FileCheck,
  CreditCard,
  Clock,
  Fingerprint,
  ExternalLink,
  CheckCircle2,
  AlertOctagon,
  ShieldCheck,
} from 'lucide-react';

export default function VisaGuideModule({ visas }: { visas: VisaInfo[] }) {
  const visa = visas[0];

  if (!visa) {
    return <div className="p-8 text-center text-zinc-400">Visa data loading...</div>;
  }

  const steps: string[] = visa.stepsJson ? JSON.parse(visa.stepsJson) : [];
  const docs: string[] = visa.requiredDocsJson ? JSON.parse(visa.requiredDocsJson) : [];
  const rejectionReasons: string[] = visa.rejectionReasonsJson ? JSON.parse(visa.rejectionReasonsJson) : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold border border-white/20">
          <ShieldCheck className="w-4 h-4 text-emerald-300 mr-1" /> Official German Student Visa Guide
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">{visa.visaType}</h1>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
          Complete roadmap for obtaining your German National Student Visa (Category D) via VFS Global.
        </p>

        <div>
          <a
            href={visa.embassyPortalUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-zinc-100 font-bold text-xs shadow-md transition-all inline-flex items-center"
          >
            German Embassy Visa Portal <ExternalLink className="w-4 h-4 ml-1.5" />
          </a>
        </div>
      </div>

      {/* Key Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Visa Fee</span>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{visa.feeAmount}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-500">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Processing Time</span>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{visa.processingTimeWeeks}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
            <Fingerprint className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Biometrics</span>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{visa.biometricsInfo}</p>
          </div>
        </div>
      </div>

      {/* Step by Step Process */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Student Visa Application Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 flex items-start space-x-3"
            >
              <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed pt-1">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Rejection Reasons Warning Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-rose-500/10 border border-rose-500/20 shadow-sm space-y-4">
        <h3 className="text-xl font-bold text-rose-600 dark:text-rose-400 flex items-center">
          <AlertOctagon className="w-6 h-6 mr-2 shrink-0" />
          Common Visa Rejection Reasons (And How to Avoid Them)
        </h3>
        <div className="space-y-2.5">
          {rejectionReasons.map((reason, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
              <span className="text-rose-500 font-bold">•</span>
              <p className="leading-relaxed">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
