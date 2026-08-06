'use client';

import React from 'react';
import { PartTimeJobInfo } from '@/types';
import {
  Briefcase,
  Clock,
  Euro,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function PartTimeJobsModule({ partTimeJobs }: { partTimeJobs: PartTimeJobInfo[] }) {
  const jobInfo = partTimeJobs[0];

  if (!jobInfo) {
    return <div className="p-8 text-center text-zinc-400">Job rules data loading...</div>;
  }

  const popularJobs: string[] = jobInfo.popularJobsJson ? JSON.parse(jobInfo.popularJobsJson) : [];

  // ── Neutral stat cards matching OverviewModule style ────────────────────────
  const statCards = [
    {
      label: 'Allowed Work Limit',
      value: jobInfo.allowedHours,
      icon: Clock,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
      isHighlight: false,
    },
    {
      label: 'Statutory Minimum Wage',
      value: jobInfo.minWage,
      icon: Euro,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
      isHighlight: true,
    },
    {
      label: 'Tax-Free Mini-Job Cap',
      value: jobInfo.miniJobCap,
      icon: ShieldCheck,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
      isHighlight: true,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* ── Section Header (neutral dark navy, matching Overview/Visa style) ── */}
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
            <Briefcase className="w-3.5 h-3.5" />
            <span>German Student Labor Law Guidelines</span>
          </div>
          <h2
            className="font-serif font-bold text-white mb-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2 }}
          >
            Part-Time Jobs &amp; Working Rights
          </h2>
          <p
            className="font-sans leading-relaxed max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.9375rem' }}
          >
            Everything international students need to know about working limits, tax rules, and earning options in Germany.
          </p>
        </div>
      </div>

      {/* ── Quick Stats Grid (neutral white, matching Overview) ─────────────── */}
      <div>
        <h3 className="font-serif font-bold mb-4" style={{ fontSize: '1.125rem', color: '#0F172A' }}>
          Key Working Rules at a Glance
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
                  style={{
                    fontSize: card.isHighlight ? '1.15rem' : '0.9rem',
                    color: '#0F172A',
                  }}
                >
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Tax & Semester Rules ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          className="rounded-2xl bg-white"
          style={{
            padding: '24px 28px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <h3
            className="font-serif font-bold flex items-center gap-2 mb-3"
            style={{ fontSize: '1rem', color: '#0F172A' }}
          >
            <ShieldCheck className="w-4 h-4" style={{ color: '#2563EB' }} />
            Semester Working Rules
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: '#4B5563' }}>{jobInfo.semesterRules}</p>
        </div>

        <div
          className="rounded-2xl bg-white"
          style={{
            padding: '24px 28px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <h3
            className="font-serif font-bold flex items-center gap-2 mb-3"
            style={{ fontSize: '1rem', color: '#0F172A' }}
          >
            <Clock className="w-4 h-4" style={{ color: '#2563EB' }} />
            Holiday / Break Rules
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: '#4B5563' }}>{jobInfo.holidayRules}</p>
        </div>
      </div>

      {/* ── Tax Rules Info ──────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl bg-white"
        style={{
          padding: '24px 28px',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        <h3
          className="font-serif font-bold flex items-center gap-2 mb-3"
          style={{ fontSize: '1rem', color: '#0F172A' }}
        >
          <Euro className="w-4 h-4" style={{ color: '#2563EB' }} />
          Income Tax Rules
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: '#4B5563' }}>{jobInfo.taxRules}</p>
      </div>

      {/* ── Popular Student Jobs ─────────────────────────────────────────────── */}
      <div
        className="rounded-3xl bg-white"
        style={{
          padding: '28px 32px',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        <h3 className="font-serif font-bold mb-5" style={{ fontSize: '1.125rem', color: '#0F172A' }}>
          Popular Student Roles &amp; Average Pay
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popularJobs.map((job, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl flex items-center space-x-3"
              style={{ background: '#F7F6F3', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#2563EB' }} />
              <span className="text-xs font-semibold" style={{ color: '#0F172A' }}>{job}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
