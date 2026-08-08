'use client';

import React, { useState, useEffect } from 'react';
import { currencyService } from '@/services/api';
import { CurrencyData, Country } from '@/types';
import {
  Euro,
  ArrowRightLeft,
  TrendingUp,
  Calculator,
  PiggyBank,
  RefreshCw,
} from 'lucide-react';

interface Props {
  countryName?: string;
  country?: Country;
}

export default function CurrencyModule({ countryName, country }: Props) {
  const isAustria = country?.slug === 'austria' || countryName?.toLowerCase() === 'austria';
  const defaultLivingFunds = isAustria ? 10471 : 11904;
  const defaultTuition = isAustria ? 1453 : 700;

  const [data, setData] = useState<CurrencyData | null>(null);
  const [eurInput, setEurInput] = useState<number>(1000);
  const [inrInput, setInrInput] = useState<number>(91250);
  const [blockedAmtEur, setBlockedAmtEur] = useState<number>(defaultLivingFunds);
  const [tuitionAmtEur, setTuitionAmtEur] = useState<number>(defaultTuition);

  useEffect(() => {
    currencyService.getRate().then((res) => {
      setData(res);
      setInrInput(Math.round(1000 * res.rate));
    });
  }, []);

  const rate = data?.rate || 91.25;

  const handleEurChange = (val: number) => {
    setEurInput(val);
    setInrInput(Math.round(val * rate));
  };

  const handleInrChange = (val: number) => {
    setInrInput(val);
    setEurInput(Math.round(val / rate));
  };

  const totalEurBudget = blockedAmtEur + tuitionAmtEur;
  const totalInrBudget = Math.round(totalEurBudget * rate);

  // ── Stat Grid Cards matching Overview / Visa / APS neutral card treatment ──
  const statCards = [
    {
      label: 'Live Exchange Rate (1 EUR)',
      value: `₹${rate.toFixed(2)} INR`,
      icon: Euro,
    },
    {
      label: 'Blocked Account Deposit (€11,904)',
      value: `₹${Math.round(11904 * rate).toLocaleString('en-IN')}`,
      icon: PiggyBank,
    },
    {
      label: 'Average Semester Fee (€300)',
      value: `₹${Math.round(300 * rate).toLocaleString('en-IN')}`,
      icon: Calculator,
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
        <div className="relative z-10 px-5 py-6 sm:px-10 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Live Forex Exchange Rate</span>
            </div>
            <h1
              className="font-serif font-bold text-white mb-1"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2 }}
            >
              1 EUR = ₹{rate.toFixed(2)} INR
            </h1>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.72)' }}>
              Last Updated: {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleDateString() : 'Today'}
            </p>
          </div>

          <div
            className="p-4 rounded-2xl text-right"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="text-xs font-medium block" style={{ color: 'rgba(255,255,255,0.75)' }}>
              10,000 EUR in INR
            </span>
            <p className="text-2xl font-extrabold text-white">
              ₹{(10000 * rate).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* ── Key Stat Cards (neutral white, delicate border, dark navy text) ── */}
      <div>
        <h3 className="font-serif font-bold mb-4" style={{ fontSize: '1.125rem', color: '#0B1220' }}>
          Key Currency Rates &amp; Benchmarks
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
                  <div className="p-2 rounded-xl bg-slate-100 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-slate-600" />
                  </div>
                </div>
                <p
                  className="font-bold font-sans tracking-tight leading-tight"
                  style={{ fontSize: '1.1rem', color: '#0B1220' }}
                >
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Converter Widget & Historical Chart ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Converter */}
        <div
          className="rounded-3xl bg-white space-y-4"
          style={{
            padding: '28px 32px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <h3 className="font-serif font-bold flex items-center" style={{ fontSize: '1.125rem', color: '#0B1220' }}>
            <ArrowRightLeft className="w-5 h-5 text-slate-600 mr-2" />
            Instant Currency Converter
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold block mb-1" style={{ color: '#4B5563' }}>
                Euros (€ EUR)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={eurInput}
                  onChange={(e) => handleEurChange(Number(e.target.value))}
                  className="w-full pl-4 pr-12 py-3 bg-zinc-50 border rounded-xl text-base font-bold outline-none focus:border-slate-400"
                  style={{ borderColor: 'rgba(0,0,0,0.12)', color: '#0B1220' }}
                />
                <span className="absolute right-4 top-3.5 text-xs font-bold" style={{ color: '#4B5563' }}>
                  EUR
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1" style={{ color: '#4B5563' }}>
                Indian Rupees (₹ INR)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={inrInput}
                  onChange={(e) => handleInrChange(Number(e.target.value))}
                  className="w-full pl-4 pr-12 py-3 bg-zinc-50 border rounded-xl text-base font-bold outline-none focus:border-slate-400"
                  style={{ borderColor: 'rgba(0,0,0,0.12)', color: '#0B1220' }}
                />
                <span className="absolute right-4 top-3.5 text-xs font-bold" style={{ color: '#4B5563' }}>
                  INR
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Graph */}
        <div
          className="rounded-3xl bg-white space-y-4"
          style={{
            padding: '28px 32px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <h3 className="font-serif font-bold flex items-center" style={{ fontSize: '1.125rem', color: '#0B1220' }}>
            <TrendingUp className="w-5 h-5 text-slate-600 mr-2" />
            6-Month Historical Rate Trend (EUR/INR)
          </h3>

          <div className="flex items-end justify-between h-40 pt-4 px-2 border-b" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            {data?.history.map((h, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2 flex-1">
                <span className="text-[10px] font-bold" style={{ color: '#0B1220' }}>₹{h.rate}</span>
                <div
                  className="w-8 rounded-t-lg"
                  style={{
                    height: `${(Number(h.rate) / 95) * 100}%`,
                    background: 'linear-gradient(to top, #334155, #64748B)',
                  }}
                />
                <span className="text-xs font-medium" style={{ color: '#4B5563' }}>{h.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Student Total Budget Calculator ─────────────────────────────── */}
      <div
        className="rounded-3xl bg-white space-y-6"
        style={{
          padding: '28px 32px',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
      >
        <h3 className="font-serif font-bold flex items-center" style={{ fontSize: '1.125rem', color: '#0B1220' }}>
          <PiggyBank className="w-5 h-5 text-slate-600 mr-2" />
          Annual Total Budget Planner{countryName ? ` (${countryName})` : ''}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1" style={{ color: '#4B5563' }}>
                {isAustria
                  ? 'Proof of Financial Means / Living Fund Estimate (€8,671–€15,700/yr)'
                  : 'Blocked Account (€11,904 standard Sperrkonto)'}
              </label>
              <input
                type="number"
                value={blockedAmtEur}
                onChange={(e) => setBlockedAmtEur(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-zinc-50 border rounded-xl text-sm font-semibold outline-none focus:border-slate-400"
                style={{ borderColor: 'rgba(0,0,0,0.12)', color: '#0B1220' }}
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1" style={{ color: '#4B5563' }}>
                Tuition / Semester Fees (€/year)
              </label>
              <input
                type="number"
                value={tuitionAmtEur}
                onChange={(e) => setTuitionAmtEur(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-zinc-50 border rounded-xl text-sm font-semibold outline-none focus:border-slate-400"
                style={{ borderColor: 'rgba(0,0,0,0.12)', color: '#0B1220' }}
              />
            </div>
          </div>

          <div
            className="p-6 rounded-2xl flex flex-col justify-center space-y-3"
            style={{
              background: '#F8FAFC',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#4B5563' }}>
              Estimated Year 1 Total Budget
            </span>
            <div>
              <p className="text-3xl font-extrabold tracking-tight" style={{ color: '#0B1220' }}>
                €{totalEurBudget.toLocaleString()}
              </p>
              <p className="text-lg font-bold mt-0.5" style={{ color: '#2563EB' }}>
                ₹{totalInrBudget.toLocaleString('en-IN')} INR
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
