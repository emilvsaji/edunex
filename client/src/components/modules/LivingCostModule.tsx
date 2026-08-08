'use client';

import React, { useState } from 'react';
import { LivingCostCity } from '@/types';
import {
  Building2,
  Home,
  Utensils,
  Bus,
  Zap,
  Wifi,
  Film,
  Calculator,
  MapPin,
  Euro,
  Info,
  ShoppingBag,
  Train,
  Coffee,
} from 'lucide-react';

interface Props {
  livingCosts: LivingCostCity[];
  countryName?: string;
}

export default function LivingCostModule({ livingCosts, countryName }: Props) {
  const [selectedCity, setSelectedCity] = useState<string>(livingCosts[0]?.cityName || 'Vienna');

  const currentCity = livingCosts.find((c) => c.cityName === selectedCity) || livingCosts[0];

  const [customRent, setCustomRent] = useState<number>(currentCity?.rent || 500);
  const [customFood, setCustomFood] = useState<number>(currentCity?.food || 220);
  const [customTransport, setCustomTransport] = useState<number>(currentCity?.transport || 49);
  const [customUtilities, setCustomUtilities] = useState<number>(currentCity?.utilities || 90);
  const [customInternet, setCustomInternet] = useState<number>(currentCity?.internet || 30);
  const [customEntertainment, setCustomEntertainment] = useState<number>(currentCity?.entertainment || 100);

  if (!currentCity) {
    return <div className="p-8 text-center text-zinc-400">Living cost data loading...</div>;
  }

  const calculateCustomTotal = () => {
    return customRent + customFood + customTransport + customUtilities + customInternet + customEntertainment;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
            <Building2 className="w-6 h-6 text-sky-500 mr-2" />
            Living Cost City Estimator
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Itemized monthly expense comparison across major {countryName || 'university'} cities.
          </p>
        </div>
      </div>

      {/* Disclaimer Callout */}
      <div
        className="flex items-start gap-3 rounded-2xl"
        style={{
          padding: '16px 20px',
          background: '#F8FAFC',
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <Info className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#64748B' }} />
        <p className="text-xs leading-relaxed font-sans" style={{ color: '#64748B' }}>
          <strong style={{ color: '#475569', fontWeight: 600 }}>Disclaimer:</strong> All living cost figures are
          estimates based on average student spending patterns. Actual costs can vary significantly depending on
          your lifestyle, type of accommodation, personal spending habits, dietary choices, and exact location
          within the city. These figures are provided as a planning guide only.
        </p>
      </div>

      {/* City Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {livingCosts.map((lc) => {
          const isSelected = currentCity?.id === lc.id || selectedCity === lc.cityName;
          return (
            <div
              key={lc.id}
              onClick={() => {
                setSelectedCity(lc.cityName);
                setCustomRent(lc.rent);
                setCustomFood(lc.food);
                setCustomTransport(lc.transport);
                setCustomUtilities(lc.utilities);
                setCustomInternet(lc.internet);
                setCustomEntertainment(lc.entertainment);
              }}
              className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-sky-500/10 border-sky-500/50 shadow-md ring-2 ring-sky-500/20'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-sky-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
                  <MapPin className="w-4 h-4 text-sky-500 mr-1.5" /> {lc.cityName}
                </span>
                <span className="text-xs font-extrabold text-sky-600 dark:text-sky-400">
                  €{lc.monthlyTotal}/mo
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Rent:</span> <span className="font-semibold text-zinc-800 dark:text-zinc-200">€{lc.rent}</span>
                </div>
                <div className="flex justify-between">
                  <span>Food & Groceries:</span> <span className="font-semibold text-zinc-800 dark:text-zinc-200">€{lc.food}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transport:</span> <span className="font-semibold text-zinc-800 dark:text-zinc-200">€{lc.transport}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Budget Calculator Widget */}
      {selectedCity && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
              <Calculator className="w-5 h-5 text-sky-500 mr-2" />
              Interactive Monthly Expense Simulator ({selectedCity})
            </h3>
            <div className="text-right">
              <span className="text-xs text-zinc-400">Simulated Monthly Total</span>
              <p className="text-2xl font-extrabold text-sky-500">€{calculateCustomTotal()} / month</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Rent Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="flex items-center text-zinc-700 dark:text-zinc-300">
                  <Home className="w-3.5 h-3.5 mr-1 text-sky-500" /> Accommodation / Rent
                </span>
                <span className="text-sky-500 font-bold">€{customRent}</span>
              </div>
              <input
                type="range"
                min={200}
                max={1200}
                value={customRent}
                onChange={(e) => setCustomRent(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            {/* Food Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="flex items-center text-zinc-700 dark:text-zinc-300">
                  <Utensils className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Food & Groceries
                </span>
                <span className="text-emerald-500 font-bold">€{customFood}</span>
              </div>
              <input
                type="range"
                min={100}
                max={500}
                value={customFood}
                onChange={(e) => setCustomFood(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Transport Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="flex items-center text-zinc-700 dark:text-zinc-300">
                  <Bus className="w-3.5 h-3.5 mr-1 text-indigo-500" /> Public Transit (Deutschlandticket)
                </span>
                <span className="text-indigo-500 font-bold">€{customTransport}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={customTransport}
                onChange={(e) => setCustomTransport(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            {/* Utilities Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="flex items-center text-zinc-700 dark:text-zinc-300">
                  <Zap className="w-3.5 h-3.5 mr-1 text-amber-500" /> Utilities (Electricity & Heating)
                </span>
                <span className="text-amber-500 font-bold">€{customUtilities}</span>
              </div>
              <input
                type="range"
                min={40}
                max={200}
                value={customUtilities}
                onChange={(e) => setCustomUtilities(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Internet Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="flex items-center text-zinc-700 dark:text-zinc-300">
                  <Wifi className="w-3.5 h-3.5 mr-1 text-cyan-500" /> Mobile & Internet
                </span>
                <span className="text-cyan-500 font-bold">€{customInternet}</span>
              </div>
              <input
                type="range"
                min={15}
                max={60}
                value={customInternet}
                onChange={(e) => setCustomInternet(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            {/* Entertainment Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="flex items-center text-zinc-700 dark:text-zinc-300">
                  <Film className="w-3.5 h-3.5 mr-1 text-rose-500" /> Leisure & Entertainment
                </span>
                <span className="text-rose-500 font-bold">€{customEntertainment}</span>
              </div>
              <input
                type="range"
                min={30}
                max={300}
                value={customEntertainment}
                onChange={(e) => setCustomEntertainment(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
