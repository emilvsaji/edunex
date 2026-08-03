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
} from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';
import GlobalSearchModal from '../search/GlobalSearchModal';

interface Props {
  countryName?: string;
  activeModuleLabel?: string;
}

const COUNTRIES = [
  { name: 'Germany', flag: '🇩🇪', slug: 'germany', available: true },
  { name: 'United States', flag: '🇺🇸', slug: 'usa', available: false },
  { name: 'United Kingdom', flag: '🇬🇧', slug: 'uk', available: false },
  { name: 'Australia', flag: '🇦🇺', slug: 'australia', available: false },
  { name: 'Canada', flag: '🇨🇦', slug: 'canada', available: false },
];

export default function TopNavbar({ countryName = 'Germany', activeModuleLabel = 'Overview' }: Props) {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountriesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between py-3.5">

          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-950">
                edu<span className="text-brand-600">nex</span>
              </span>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {/* Countries Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setCountriesOpen((prev) => !prev)}
                  onMouseEnter={() => setCountriesOpen(true)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    countriesOpen
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Countries
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${countriesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Panel */}
                {countriesOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-60 rounded-2xl bg-white border border-slate-200/80 shadow-2xl shadow-slate-200/60 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setCountriesOpen(false)}
                  >
                    <div className="p-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 pt-1 pb-2">
                        Study Destinations
                      </p>
                      {COUNTRIES.map((c) =>
                        c.available ? (
                          <Link
                            key={c.slug}
                            href={`/${c.slug}`}
                            onClick={() => setCountriesOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-50 transition-colors group"
                          >
                            <span className="text-2xl leading-none">{c.flag}</span>
                            <span className="text-sm font-semibold text-slate-800 group-hover:text-brand-700">
                              {c.name}
                            </span>
                            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                              Live
                            </span>
                          </Link>
                        ) : (
                          <div
                            key={c.slug}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl opacity-50 cursor-not-allowed"
                          >
                            <span className="text-2xl leading-none">{c.flag}</span>
                            <span className="text-sm font-semibold text-slate-600">{c.name}</span>
                            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold">
                              Soon
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-2">
            {/* Global Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-xs font-medium text-slate-600 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-brand-600" />
              <span className="hidden md:inline">Search everything...</span>
              <span className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono text-slate-400 border border-slate-200">
                ⌘K
              </span>
            </button>

            {/* Dark/Light mode toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-700 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Login Button */}
            <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-extrabold transition-all shadow-sm shadow-brand-500/20">
              <LogIn className="w-3.5 h-3.5" />
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Dialog Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
