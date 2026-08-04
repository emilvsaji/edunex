'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Globe,
  ChevronDown,
  Search,
  Sun,
  Moon,
  LogIn,
} from 'lucide-react';
import GlobalSearchModal from '@/components/search/GlobalSearchModal';

interface Props {
  countryName?: string;
  activeModuleLabel?: string;
}

const POPULAR_DESTINATIONS = [
  { slug: 'germany',   name: 'Germany',        flag: '🇩🇪', available: false },
  { slug: 'uk',        name: 'United Kingdom', flag: '🇬🇧', available: false },
  { slug: 'usa',       name: 'United States',  flag: '🇺🇸', available: false },
  { slug: 'canada',    name: 'Canada',         flag: '🇨🇦', available: false },
  { slug: 'australia', name: 'Australia',      flag: '🇦🇺', available: false },
  { slug: 'france',    name: 'France',         flag: '🇫🇷', available: false },
];

const EUROPE_DESTINATIONS = [
  { slug: 'germany',        name: 'Germany',        flag: '🇩🇪', available: true  },
  { slug: 'netherlands',    name: 'Netherlands',    flag: '🇳🇱', available: false },
  { slug: 'sweden',         name: 'Sweden',         flag: '🇸🇪', available: false },
  { slug: 'austria',        name: 'Austria',        flag: '🇦🇹', available: false },
  { slug: 'switzerland',    name: 'Switzerland',    flag: '🇨🇭', available: false },
  { slug: 'italy',          name: 'Italy',          flag: '🇮🇹', available: false },
  { slug: 'spain',          name: 'Spain',          flag: '🇪🇸', available: false },
  { slug: 'poland',         name: 'Poland',         flag: '🇵🇱', available: false },
];

function toRows<T>(arr: T[], cols = 2): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < arr.length; i += cols) {
    rows.push(arr.slice(i, i + cols));
  }
  return rows;
}

export default function TopNavbar({ countryName, activeModuleLabel }: Props) {
  const [countriesOpen, setCountriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountriesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const popularRows = toRows(POPULAR_DESTINATIONS);
  const europeRows = toRows(EUROPE_DESTINATIONS);

  return (
    <>
      {/* Navbar */}
      <header
        className="sticky top-0 z-40 w-full backdrop-blur-lg border-b px-6 sm:px-12 lg:px-20 xl:px-28"
        style={{
          background: 'rgba(255,255,255,0.80)',
          borderColor: 'rgba(0,0,0,0.04)',
        }}
      >
        <div className="flex items-center justify-between py-4">

          {/* Logo — text-only wordmark */}
          <Link href="/" className="flex items-center group shrink-0">
            <span
              className="text-3xl font-extrabold tracking-tight"
              style={{ color: '#0F172A', letterSpacing: '-0.03em' }}
            >
              edu<span style={{ color: '#475569' }}>nex</span>
            </span>
          </Link>

          {/* Right side: search, theme, countries, login */}
          <div className="flex items-center gap-2.5">

            {/* Search trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-base font-medium transition-all hover:bg-gray-100"
              style={{ background: 'rgba(0,0,0,0.04)', color: '#374151', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              <Search className="w-5 h-5 text-gray-500" />
              <span className="hidden md:inline text-base">Search...</span>
              <span
                className="hidden md:inline px-2 py-0.5 rounded text-xs font-mono"
                style={{ background: 'rgba(0,0,0,0.06)', color: '#6B7280', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                ⌘K
              </span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl transition-all hover:bg-gray-100"
              style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
              title="Toggle Theme"
            >
              {theme === 'dark'
                ? <Sun className="w-4 h-4 text-amber-500" />
                : <Moon className="w-4 h-4 text-gray-500" />}
            </button>

            {/* Countries Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCountriesOpen((p) => !p)}
                onMouseEnter={() => setCountriesOpen(true)}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-base font-semibold transition-all hover:bg-gray-100"
                style={{
                  background: countriesOpen ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.04)',
                  color: countriesOpen ? '#0F172A' : '#374151',
                  border: `1px solid ${countriesOpen ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.08)'}`,
                  minWidth: '148px',
                }}
              >
                <Globe className="w-5 h-5" />
                Countries
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${countriesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Two-panel mega dropdown */}
              {countriesOpen && (
                <div
                  className="absolute top-full right-0 mt-2 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #E8EDF5',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)',
                    minWidth: '700px',
                  }}
                  onMouseLeave={() => setCountriesOpen(false)}
                >
                  {/* Top gradient accent bar */}
                  <div
                    className="h-0.5 w-full"
                    style={{ background: 'linear-gradient(90deg, #2563EB, #7C3AED, #2563EB)' }}
                  />

                  <div className="flex">
                    {/* Panel 1 — Popular Destinations */}
                    <div className="flex-1 p-7">
                      <p
                        className="text-[13px] font-bold uppercase tracking-[0.12em] mb-5"
                        style={{ color: '#3A4A6B' }}
                      >
                        Popular Study Destinations
                      </p>
                      <div className="space-y-1.5">
                        {popularRows.map((row, ri) => (
                          <div key={ri} className="grid grid-cols-2 gap-x-4">
                            {row.map((c) => (
                              <div
                                key={c.slug}
                                className="flex items-center gap-3 py-2 rounded-lg px-2 cursor-not-allowed opacity-60 select-none"
                              >
                                <span className="text-[22px] leading-none">{c.flag}</span>
                                <span className="text-[16px] font-normal" style={{ color: '#1A1A2E' }}>
                                  {c.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px my-5" style={{ background: '#E5EAF2' }} />

                    {/* Panel 2 — Europe */}
                    <div className="flex-1 p-7">
                      <p
                        className="text-[13px] font-bold uppercase tracking-[0.12em] mb-5"
                        style={{ color: '#3A4A6B' }}
                      >
                        More Countries (Europe)
                      </p>
                      <div className="space-y-1.5">
                        {europeRows.map((row, ri) => (
                          <div key={ri} className="grid grid-cols-2 gap-x-4">
                            {row.map((c) => {
                              const isAvail = c.available === true;
                              return isAvail ? (
                                <Link
                                  key={c.slug}
                                  href={`/${c.slug}`}
                                  onClick={() => setCountriesOpen(false)}
                                  className="flex items-center gap-3 py-2 rounded-lg px-2 hover:bg-blue-50 transition-colors group"
                                >
                                  <span className="text-[22px] leading-none">{c.flag}</span>
                                  <span
                                    className="text-[15px] font-semibold group-hover:text-blue-700 transition-colors"
                                    style={{ color: '#1A1A2E' }}
                                  >
                                    {c.name}
                                  </span>
                                  <span
                                    className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                                    style={{ background: '#D1FAE5', color: '#065F46' }}
                                  >
                                    Live
                                  </span>
                                </Link>
                              ) : (
                                <div
                                  key={c.slug}
                                  className="flex items-center gap-3 py-2 rounded-lg px-2 cursor-not-allowed"
                                  style={{ opacity: 0.5 }}
                                >
                                  <span className="text-[22px] leading-none">{c.flag}</span>
                                  <span className="text-[15px] font-normal" style={{ color: '#1A1A2E' }}>
                                    {c.name}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Login */}
            <button
              className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base text-white transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: '#0F172A', boxShadow: '0 2px 14px rgba(0,0,0,0.20)' }}
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>
          </div>
        </div>
      </header>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
