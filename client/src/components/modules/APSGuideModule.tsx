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
} from 'lucide-react';

export default function APSGuideModule({ apsGuides }: { apsGuides: APSGuide[] }) {
  const guide = apsGuides[0];

  if (!guide) {
    return <div className="p-8 text-center text-zinc-400">APS guide data is loading...</div>;
  }

  const requiredDocs: string[] = guide.requiredDocsJson ? JSON.parse(guide.requiredDocsJson) : [];
  const applicationSteps: string[] = guide.applicationStepsJson ? JSON.parse(guide.applicationStepsJson) : [];
  const faqs: Array<{ q: string; a: string }> = guide.faqsJson ? JSON.parse(guide.faqsJson) : [];

  const statCards = [
    {
      label: 'Processing Fee',
      value: `₹${guide.feeAmount} (${guide.feeCurrency})`,
      icon: CreditCard,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
    },
    {
      label: 'Processing Timeline',
      value: guide.timelineWeeks,
      icon: Clock,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
    },
    {
      label: 'Certificate Validity',
      value: 'Indefinite (Lifetime)',
      icon: ShieldCheck,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* ── Section Header (neutral dark navy) ─────────────────────────────── */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0B1220 0%, #1E293B 60%, #0F172A 100%)',
          boxShadow: '0 8px 40px rgba(11,18,32,0.28)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(37,99,235,0.12) 0%, transparent 55%), radial-gradient(circle at 10% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 px-5 py-6 sm:px-10 sm:py-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Mandatory German Credential Verification</span>
          </div>

          <h1
            className="font-serif font-bold text-white mb-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2 }}
          >
            {guide.title}
          </h1>

          <p
            className="font-sans leading-relaxed max-w-2xl mb-6"
            style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.9375rem' }}
          >
            {guide.eligibility}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={guide.officialPortalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-full font-bold text-xs transition-all"
              style={{ background: '#FFFFFF', color: '#0B1220' }}
            >
              APS Official Portal <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </a>
            <a
              href={guide.trackingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-full font-semibold text-xs transition-all"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Track Status <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Key Stats Cards (neutral white) ───────────────────────────────── */}
      <div>
        <h3 className="font-serif font-bold mb-4" style={{ fontSize: '1.125rem', color: '#0F172A' }}>
          APS Certificate Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="group rounded-2xl bg-white transition-all duration-200"
                style={{
                  padding: '20px 22px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(37,99,235,0.25)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(37,99,235,0.08)';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.08)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold font-sans" style={{ color: '#4B5563' }}>
                    {card.label}
                  </span>
                  <div className={`p-2 rounded-xl ${card.iconBg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                </div>
                <p
                  className="font-bold font-sans tracking-tight leading-tight"
                  style={{ fontSize: '1rem', color: '#0F172A' }}
                >
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Step-by-Step Application Workflow ────────────────────────────── */}
      <div
        className="rounded-3xl bg-white"
        style={{
          padding: '28px 32px',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        <h3 className="font-serif font-bold mb-5" style={{ fontSize: '1.125rem', color: '#0F172A' }}>
          Step-by-Step APS Application Workflow
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applicationSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl flex items-start space-x-3"
              style={{ background: '#F7F6F3', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div
                className="w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 text-white"
                style={{ background: '#0F172A' }}
              >
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm font-semibold leading-relaxed pt-1" style={{ color: '#0F172A' }}>
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Required Documents List ───────────────────────────────────────── */}
      <div
        className="rounded-3xl bg-white"
        style={{
          padding: '28px 32px',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        <h3 className="font-serif font-bold mb-5" style={{ fontSize: '1.125rem', color: '#0F172A' }}>
          Required Documents for APS Application
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {requiredDocs.map((doc, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 p-3.5 rounded-2xl"
              style={{ background: '#F7F6F3', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#2563EB' }} />
              <span className="text-xs font-semibold" style={{ color: '#0F172A' }}>{doc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQs ──────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <div
          className="rounded-3xl bg-white"
          style={{
            padding: '28px 32px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <h3 className="font-serif font-bold mb-5" style={{ fontSize: '1.125rem', color: '#0F172A' }}>
            Frequently Asked Questions about APS
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl space-y-2"
                style={{ background: '#F7F6F3', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <h4 className="text-sm font-bold flex items-center" style={{ color: '#0F172A' }}>
                  <AlertCircle className="w-4 h-4 mr-2 shrink-0" style={{ color: '#2563EB' }} />
                  {faq.q}
                </h4>
                <p className="text-xs leading-relaxed pl-6" style={{ color: '#4B5563' }}>
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
