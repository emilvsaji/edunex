'use client';

import React from 'react';
import { APSGuide } from '@/types';
import {
  FileCheck,
  ExternalLink,
  ShieldCheck,
  Clock,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';

export default function APSGuideModule({ apsGuides }: { apsGuides: APSGuide[] }) {
  const guide = apsGuides[0];

  if (!guide) {
    return <div className="p-8 text-center text-zinc-400">APS guide data is loading...</div>;
  }

  const requiredDocs: string[] = guide.requiredDocsJson ? JSON.parse(guide.requiredDocsJson) : [];
  const applicationSteps: string[] = guide.applicationStepsJson ? JSON.parse(guide.applicationStepsJson) : [];
  const faqs: Array<{ q: string; a: string }> = guide.faqsJson ? JSON.parse(guide.faqsJson) : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-brand-600 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase border border-white/20">
          <ShieldCheck className="w-4 h-4 text-emerald-400 mr-1" /> Mandatory German Credential Verification
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">{guide.title}</h1>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
          {guide.eligibility}
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href={guide.officialPortalUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-white text-brand-700 hover:bg-zinc-100 font-bold text-xs shadow-md transition-all flex items-center"
          >
            APS Official Portal <ExternalLink className="w-4 h-4 ml-1.5" />
          </a>
          <a
            href={guide.trackingUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs backdrop-blur-md border border-white/20 transition-all flex items-center"
          >
            Track Status <ExternalLink className="w-4 h-4 ml-1.5" />
          </a>
        </div>
      </div>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Processing Fee</span>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              ₹{guide.feeAmount} ({guide.feeCurrency})
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-500">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Processing Timeline</span>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{guide.timelineWeeks}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-medium">Certificate Validity</span>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Indefinite (Lifetime)</p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Application Process */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
          <FileCheck className="w-5 h-5 text-brand-500 mr-2" />
          Step-by-Step APS Application Workflow
        </h3>

        <div className="relative border-l-2 border-brand-500/30 ml-4 space-y-6">
          {applicationSteps.map((step, idx) => (
            <div key={idx} className="relative pl-6 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-500 border-2 border-white dark:border-zinc-900 shadow-sm" />
              <div className="space-y-1">
                <span className="text-xs font-bold text-brand-500 uppercase tracking-wider">
                  Step {idx + 1}
                </span>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Required Documents List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Required Documents for APS Application
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {requiredDocs.map((doc, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{doc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      {faqs.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions about APS
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 space-y-2">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
                  <AlertCircle className="w-4 h-4 text-brand-500 mr-2 shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
