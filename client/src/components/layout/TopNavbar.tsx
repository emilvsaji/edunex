'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  Search,
  Moon,
  Sun,
  ChevronDown,
  LogIn,
  Globe,
} from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';
import GlobalSearchModal from '../search/GlobalSearchModal';

interface Props {
  countryName?: string;
  activeModuleLabel?: string;
}

// Two-panel dropdown data
const POPULAR_DESTINATIONS = [
  { name: 'United Kingdom', flag: '🇬🇧', slug: 'uk' },
  { name: 'United States', flag: '🇺🇸', slug: 'usa' },
  { name: 'Canada', flag: '🇨🇦', slug: 'canada' },
  { name: 'Australia', flag: '🇦🇺', slug: 'australia' },
  { name: 'New Zealand', flag: '🇳🇿', slug: 'new-zealand' },
  { name: 'Ireland', flag: '🇮🇪', slug: 'ireland' },
  { name: 'Dubai (UAE)', flag: '🇦🇪', slug: 'uae' },
  { name: 'Singapore', flag: '🇸🇬', slug: 'singapore' },
  { name: 'Malaysia', flag: '🇲🇾', slug: 'malaysia' },
];

const EUROPE_DESTINATIONS = [
  { name: 'Germany', flag: '🇩🇪', slug: 'germany', available: true },
  { name: 'France', flag: '🇫🇷', slug: 'france' },
  { name: 'Netherlands', flag: '🇳🇱', slug: 'netherlands' },
  { name: 'Italy', flag: '🇮🇹', slug: 'italy' },
  { name: 'Spain', flag: '🇪🇸', slug: 'spain' },
  { name: 'Sweden', flag: '🇸🇪', slug: 'sweden' },
  { name: 'Finland', flag: '🇫🇮', slug: 'finland' },
  { name: 'Poland', flag: '🇵🇱', slug: 'poland' },
];

// Split array into 2-column rows
function toRows<T>(arr: T[], cols = 2): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < arr.length; i += cols) rows.push(arr.slice(i, i + cols));
  return rows;
}

export default function TopNavbar({ countryName = 'Germany', activeModuleLabel = 'Overview' }: Props) {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountriesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popularRows = toRows(POPULAR_DESTINATIONS);
  const europeRows = toRows(EUROPE_DESTINATIONS);

  return (
    <>
      {/* Navbar — dark navy matching hero */}
      <header
        className="sticky top-0 z-40 w-full backdrop-blur-md border-b px-6 sm:px-12 lg:px-20 xl:px-28"
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderColor: 'rgba(0,0,0,0.08)',
        }}
      >
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              edu<span className="text-gray-400">nex</span>
            </span>
          </Link>

          {/* Right side: search, theme, countries, login */}
          <div className="flex items-center gap-2.5">

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-gray-100"
              style={{ background: 'rgba(0,0,0,0.04)', color: '#374151', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              <Search className="w-4 h-4 text-gray-500" />
              <span className="hidden md:inline text-sm">Search...</span>
              <span
                className="hidden md:inline px-1.5 py-0.5 rounded text-[11px] font-mono"
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
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-gray-100"
                style={{
                  background: countriesOpen ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.04)',
                  color: countriesOpen ? '#111827' : '#374151',
                  border: `1px solid ${countriesOpen ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.08)'}`,
                }}
              >
                <Globe className="w-4 h-4" />
                Countries
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${countriesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Two-panel Dropdown */}
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
                  {/* Top border accent */}
                  <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #2563EB, #7C3AED, #2563EB)' }} />

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
                              const isAvail = (c as any).available === true;
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
                                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: '#D1FAE5', color: '#065F46' }}>
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
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: '#111827', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          </div>
        </div>
      </header>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
