'use client';

import React, { useState, useEffect } from 'react';
import { currencyService } from '@/services/api';
import { CurrencyData } from '@/types';
import {
  Euro,
  ArrowRightLeft,
  TrendingUp,
  Calculator,
  Calendar,
  PiggyBank,
  RefreshCw,
} from 'lucide-react';

export default function CurrencyModule() {
  const [data, setData] = useState<CurrencyData | null>(null);
  const [eurInput, setEurInput] = useState<number>(1000);
  const [inrInput, setInrInput] = useState<number>(91250);
  const [blockedAmtEur, setBlockedAmtEur] = useState<number>(11904);
  const [tuitionAmtEur, setTuitionAmtEur] = useState<number>(1500);

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

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Rate Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase border border-white/20 mb-2">
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Live Forex Exchange Rate
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">1 EUR = ₹{rate.toFixed(2)} INR</h1>
          <p className="text-xs text-white/80 mt-1">
            Last Updated: {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleDateString() : 'Today'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-right">
          <span className="text-xs text-white/80 font-medium">10,000 EUR in INR</span>
          <p className="text-2xl font-extrabold text-emerald-300">
            ₹{(10000 * rate).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Converter Widget & Historical Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Converter */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
            <ArrowRightLeft className="w-5 h-5 text-emerald-500 mr-2" />
            Instant Currency Converter
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Euros (€ EUR)</label>
              <div className="relative">
                <input
                  type="number"
                  value={eurInput}
                  onChange={(e) => handleEurChange(Number(e.target.value))}
                  className="w-full pl-4 pr-12 py-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-base font-bold outline-none focus:border-emerald-500 text-zinc-900 dark:text-zinc-100"
                />
                <span className="absolute right-4 top-3.5 text-xs font-bold text-zinc-400">EUR</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Indian Rupees (₹ INR)</label>
              <div className="relative">
                <input
                  type="number"
                  value={inrInput}
                  onChange={(e) => handleInrChange(Number(e.target.value))}
                  className="w-full pl-4 pr-12 py-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-base font-bold outline-none focus:border-emerald-500 text-zinc-900 dark:text-zinc-100"
                />
                <span className="absolute right-4 top-3.5 text-xs font-bold text-zinc-400">INR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Graph */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
            <TrendingUp className="w-5 h-5 text-indigo-500 mr-2" />
            6-Month Historical Rate Trend (EUR/INR)
          </h3>

          <div className="flex items-end justify-between h-40 pt-4 px-2 border-b border-zinc-200 dark:border-zinc-800">
            {data?.history.map((h, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2 flex-1">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">₹{h.rate}</span>
                <div
                  className="w-8 rounded-t-lg bg-gradient-to-t from-indigo-500 to-emerald-500"
                  style={{ height: `${(Number(h.rate) / 95) * 100}%` }}
                />
                <span className="text-xs font-medium text-zinc-400">{h.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Total Budget Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
          <PiggyBank className="w-6 h-6 text-brand-500 mr-2" />
          Annual Total Budget Planner (Germany)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">
                Blocked Account (€11,904 standard)
              </label>
              <input
                type="number"
                value={blockedAmtEur}
                onChange={(e) => setBlockedAmtEur(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">
                Tuition / Semester Fees (€/year)
              </label>
              <input
                type="number"
                value={tuitionAmtEur}
                onChange={(e) => setTuitionAmtEur(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-sm font-semibold text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex flex-col justify-center space-y-3">
            <span className="text-xs font-bold uppercase text-brand-500">Estimated Year 1 Total Budget</span>
            <div>
              <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">€{totalEurBudget.toLocaleString()}</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                ₹{totalInrBudget.toLocaleString('en-IN')} INR
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
