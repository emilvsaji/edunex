'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Search,
  Moon,
  Sun,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';
import GlobalSearchModal from '../search/GlobalSearchModal';

interface Props {
  countryName?: string;
  activeModuleLabel?: string;
}

export default function TopNavbar({ countryName = 'Germany', activeModuleLabel = 'Overview' }: Props) {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between py-3.5">
          {/* Logo & Breadcrumbs */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-950">
                edu<span className="text-brand-600">nex</span>
              </span>
            </Link>

            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400 pl-4 border-l border-slate-200">
              <Link href="/" className="hover:text-slate-700 transition-colors">
                Destinations
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-semibold text-slate-700">{countryName}</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-semibold text-brand-600">{activeModuleLabel}</span>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-3">
            {/* Global Search Cmd+K button */}
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

            {/* Admin Panel button */}
            <Link
              href="/admin"
              className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition-all shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 text-brand-400" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Global Search Dialog Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
