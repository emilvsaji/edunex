'use client';

import React from 'react';
import { PartTimeJobInfo } from '@/types';
import {
  Briefcase,
  Clock,
  Banknote,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Euro,
} from 'lucide-react';

interface Props {
  partTimeJobs: PartTimeJobInfo[];
  countryName?: string;
}

export default function PartTimeJobsModule({ partTimeJobs, countryName }: Props) {
  const jobInfo = partTimeJobs[0];

  if (!jobInfo) {
    return <div className="p-8 text-center text-zinc-400">Job information is loading...</div>;
  }

  const popularJobs: string[] = jobInfo.popularJobsJson ? JSON.parse(jobInfo.popularJobsJson) : [];
  const portals: string[] = jobInfo.jobPortalsJson ? JSON.parse(jobInfo.jobPortalsJson) : [];

  const statCards = [
    {
      label: 'Allowed Working Hours',
      value: jobInfo.allowedHours,
      icon: Clock,
      iconBg: 'bg-emerald-50 text-emerald-600',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Minimum / Typical Wage',
      value: jobInfo.minWage,
      icon: Banknote,
      iconBg: 'bg-blue-50 text-blue-600',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Marginal Earnings Cap',
      value: jobInfo.miniJobCap,
      icon: TrendingUp,
      iconBg: 'bg-amber-50 text-amber-600',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* ── Editorial Hero Banner (solid navy #0B1220 matching Overview & TopNavbar) ── */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0B1220 0%, #0F1D36 60%, #0B1220 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 8px 32px rgba(11,18,32,0.18)',
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
            <span>{countryName ? `${countryName} Student Labor Law Guidelines` : 'Student Labor Law Guidelines'}</span>
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
            Everything international students need to know about working limits, tax rules, and earning options{countryName ? ` in ${countryName}` : ''}.
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
                    fontSize: '1rem',
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
