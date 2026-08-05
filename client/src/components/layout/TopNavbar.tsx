'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe,
  ChevronDown,
  Search,
  Sun,
  Moon,
  LogIn,
  Menu,
  X,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      {/* Navbar Header */}
      <header
        className="sticky top-0 z-40 w-full backdrop-blur-lg border-b bg-white/90"
        style={{ borderColor: 'rgba(0,0,0,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-8 h-8 rounded-xl overflow-hidden relative border border-slate-200/80 shadow-sm flex items-center justify-center bg-white shrink-0">
                <Image src="/images/edunex_logo.png" alt="edunex logo" width={32} height={32} className="object-cover" />
              </div>
              <span
                className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans"
                style={{ color: '#0F172A', letterSpacing: '-0.03em' }}
              >
                edu<span style={{ color: '#475569' }}>nex</span>
              </span>
            </Link>

            {/* Desktop Navigation Tools */}
            <div className="hidden md:flex items-center gap-3">

              {/* Search trigger button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all hover:bg-gray-100"
                style={{ background: 'rgba(0,0,0,0.04)', color: '#374151', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                <Search className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Search...</span>
                <span
                  className="px-1.5 py-0.5 rounded text-[11px] font-mono"
                  style={{ background: 'rgba(0,0,0,0.06)', color: '#6B7280', border: '1px solid rgba(0,0,0,0.08)' }}
                >
                  ⌘K
                </span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl transition-all hover:bg-gray-100"
                style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
                title="Toggle Theme"
              >
                {theme === 'dark'
                  ? <Sun className="w-4 h-4 text-amber-500" />
                  : <Moon className="w-4 h-4 text-gray-500" />}
              </button>

              {/* Countries Dropdown Trigger */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setCountriesOpen((p) => !p)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-gray-100"
                  style={{
                    background: countriesOpen ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.04)',
                    color: countriesOpen ? '#0F172A' : '#374151',
                    border: `1px solid ${countriesOpen ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.08)'}`,
                  }}
                >
                  <Globe className="w-4 h-4" />
                  Countries
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${countriesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Two-panel mega dropdown */}
                {countriesOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                    style={{
                      background: '#ffffff',
                      border: '1px solid #E8EDF5',
                      boxShadow: '0 24px 64px rgba(0,0,0,0.16), 0 4px 16px rgba(0,0,0,0.06)',
                      width: 'max-content',
                      maxWidth: 'calc(100vw - 2rem)',
                    }}
                  >
                    <div className="h-0.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600" />
                    <div className="flex flex-col sm:flex-row p-4 sm:p-6 gap-6">
                      {/* Popular */}
                      <div className="flex-1 min-w-[240px]">
                        <p className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-500">
                          Popular Study Destinations
                        </p>
                        <div className="space-y-1">
                          {POPULAR_DESTINATIONS.map((c) => (
                            <div key={c.slug} className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm text-slate-400 opacity-60">
                              <span>{c.flag}</span>
                              <span>{c.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="hidden sm:block w-px bg-slate-200" />
                      {/* Europe */}
                      <div className="flex-1 min-w-[240px]">
                        <p className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-500">
                          More Countries (Europe)
                        </p>
                        <div className="space-y-1">
                          {EUROPE_DESTINATIONS.map((c) => (
                            c.available ? (
                              <Link
                                key={c.slug}
                                href={`/${c.slug}`}
                                onClick={() => setCountriesOpen(false)}
                                className="flex items-center justify-between py-1.5 px-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              >
                                <span className="flex items-center gap-2">
                                  <span>{c.flag}</span>
                                  <span>{c.name}</span>
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                                  Live
                                </span>
                              </Link>
                            ) : (
                              <div key={c.slug} className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm text-slate-400 opacity-50">
                                <span>{c.flag}</span>
                                <span>{c.name}</span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Login Button */}
              <Link
                href="/login"
                className="flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: '#0F172A', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl border border-slate-200 text-slate-600"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border border-slate-200 text-slate-800"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
            <Link
              href="/germany"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-sm font-bold text-slate-900"
            >
              <span className="flex items-center gap-2.5">
                <span>🇩🇪</span>
                <span>Germany Destination Hub</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                Live
              </span>
            </Link>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#0F172A] text-white font-bold text-sm"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-full border border-slate-300 font-bold text-sm text-slate-800"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </header>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
