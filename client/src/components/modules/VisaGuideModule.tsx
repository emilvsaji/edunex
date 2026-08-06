'use client';

import React from 'react';
import { VisaInfo } from '@/types';
import {
  FileCheck,
  CreditCard,
  Clock,
  Fingerprint,
  ExternalLink,
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

  // ── Neutral stat cards matching OverviewModule style ────────────────────────
  const statCards = [
    {
      label: 'Visa Application Fee',
      value: visa.feeAmount,
      icon: CreditCard,
      iconColor: 'text-slate-600',
      iconBg: 'bg-slate-100',
    },
    {
      label: 'Processing Time',
      value: visa.processingTimeWeeks,
      icon: Clock,
      iconColor: 'text-slate-600',
      iconBg: 'bg-slate-100',
    },
    {
      label: 'Biometrics Required',
      value: visa.biometricsInfo,
      icon: Fingerprint,
      iconColor: 'text-slate-600',
      iconBg: 'bg-slate-100',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* ── Section Header (neutral, matching Overview style) ───────────────── */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0B1220 0%, #1E293B 60%, #0F172A 100%)',
          boxShadow: '0 8px 40px rgba(11,18,32,0.28)',
        }}
      >
        {/* Subtle texture overlay */}
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
            <span>Official German Student Visa Guide</span>
          </div>
          <h2
            className="font-serif font-bold text-white mb-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2 }}
          >
            {visa.visaType}
          </h2>
          <p
            className="font-sans leading-relaxed max-w-2xl mb-6"
            style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.9375rem' }}
          >
            Complete roadmap for obtaining your German National Student Visa (Category D) via VFS Global.
          </p>
          <a
            href={visa.embassyPortalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-5 py-2.5 rounded-full font-bold text-xs transition-all"
            style={{ background: '#FFFFFF', color: '#0B1220' }}
          >
            German Embassy Visa Portal <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </a>
        </div>
      </div>

      {/* ── Key Stat Cards (neutral white, matching Overview) ───────────────── */}
      <div>
        <h3 className="font-serif font-bold mb-4" style={{ fontSize: '1.125rem', color: '#0F172A' }}>
          Key Visa Details at a Glance
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

      {/* ── Step by Step Process ────────────────────────────────────────────── */}
      <div
        className="rounded-3xl bg-white"
        style={{
          padding: '28px 32px',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        <h3 className="font-serif font-bold mb-5" style={{ fontSize: '1.125rem', color: '#0F172A' }}>
          Student Visa Application Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, idx) => (
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

      {/* ── Required Documents ──────────────────────────────────────────────── */}
      {docs.length > 0 && (
        <div
          className="rounded-3xl bg-white"
          style={{
            padding: '28px 32px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <h3 className="font-serif font-bold mb-5" style={{ fontSize: '1.125rem', color: '#0F172A' }}>
            Required Documents
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {docs.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3 p-3 rounded-xl"
                style={{ background: '#F7F6F3', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <FileCheck className="w-4 h-4 shrink-0" style={{ color: '#2563EB' }} />
                <span className="text-xs font-semibold" style={{ color: '#374151' }}>{doc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Rejection Reasons Warning Box ───────────────────────────────────── */}
      <div
        className="rounded-3xl"
        style={{
          padding: '28px 32px',
          background: 'rgba(239,68,68,0.05)',
          border: '1px solid rgba(239,68,68,0.15)',
        }}
      >
        <h3
          className="font-serif font-bold flex items-center mb-5"
          style={{ fontSize: '1.125rem', color: '#DC2626' }}
        >
          <AlertOctagon className="w-5 h-5 mr-2 shrink-0" />
          Common Visa Rejection Reasons
        </h3>
        <div className="space-y-2.5">
          {rejectionReasons.map((reason, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm" style={{ color: '#1E293B' }}>
              <span className="font-bold mt-0.5" style={{ color: '#DC2626' }}>•</span>
              <p className="leading-relaxed">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
