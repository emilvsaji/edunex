'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { University } from '@/types';
import {
  Search,
  Filter,
  ArrowUpDown,
  GraduationCap,
  MapPin,
  ExternalLink,
  Building2,
  CheckCircle2,
  XCircle,
  FileText,
  Info,
  X,
  Sparkles,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { universityService } from '@/services/api';

interface Props {
  universities: University[];
  countrySlug?: string;
  countryName?: string;
}

export default function UniversitiesModule({
  universities: initialUniversities,
  countrySlug = 'germany',
  countryName,
}: Props) {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDegree, setSelectedDegree] = useState('All');
  const [sortBy, setSortBy] = useState<'qsRanking' | 'tuition' | 'name'>('qsRanking');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeUniModal, setActiveUniModal] = useState<University | null>(null);

  // Live search state with AI fallback
  const [extraAiUniversities, setExtraAiUniversities] = useState<University[]>([]);
  const [isAiSearching, setIsAiSearching] = useState(false);

  // Derive all active universities (local initial + AI discovered)
  const allUniversities = useMemo(() => {
    const map = new Map<string, University>();
    initialUniversities.forEach((u) => map.set(u.slug || u.name, u));
    extraAiUniversities.forEach((u) => {
      if (!map.has(u.slug || u.name)) {
        map.set(u.slug || u.name, u);
      }
    });
    return Array.from(map.values());
  }, [initialUniversities, extraAiUniversities]);

  // Debounced search trigger to Gemini fallback when search is typed
  useEffect(() => {
    if (!search || search.trim().length < 3) {
      setExtraAiUniversities([]);
      return;
    }

    const q = search.trim().toLowerCase();
    const localMatch = initialUniversities.some(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.cityName.toLowerCase().includes(q) ||
        u.description.toLowerCase().includes(q)
    );

    // If no local match, call backend search (which invokes Gemini fallback)
    if (!localMatch) {
      const timer = setTimeout(async () => {
        setIsAiSearching(true);
        try {
          const results = await universityService.search(countrySlug, search.trim());
          if (results && results.length > 0) {
            setExtraAiUniversities(results);
          }
        } catch (err) {
          console.error('AI search fallback error:', err);
        } finally {
          setIsAiSearching(false);
        }
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [search, countrySlug, initialUniversities]);

  // Extract cities
  const cities = useMemo(() => {
    const set = new Set<string>();
    allUniversities.forEach((u) => {
      if (u.cityName) set.add(u.cityName);
    });
    return ['All', ...Array.from(set)];
  }, [allUniversities]);

  // Filter & Sort
  const filteredUniversities = useMemo(() => {
    return allUniversities
      .filter((u) => {
        if (search) {
          const q = search.toLowerCase();
          const matchName = u.name.toLowerCase().includes(q);
          const matchCity = u.cityName?.toLowerCase().includes(q);
          const matchDesc = u.description?.toLowerCase().includes(q);
          if (!matchName && !matchCity && !matchDesc) return false;
        }
        if (selectedCity !== 'All' && u.cityName !== selectedCity) return false;
        if (selectedType !== 'All' && u.type !== selectedType) return false;
        if (selectedDegree !== 'All' && !u.degrees?.includes(selectedDegree)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'qsRanking') {
          return sortOrder === 'asc' ? a.qsRanking - b.qsRanking : b.qsRanking - a.qsRanking;
        }
        if (sortBy === 'name') {
          return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        return 0;
      });
  }, [allUniversities, search, selectedCity, selectedType, selectedDegree, sortBy, sortOrder]);

  const hasAiResults = filteredUniversities.some((u) => u.isAiGenerated);
  const targetCountryLabel = countryName || (countrySlug === 'austria' ? 'Austria' : 'Germany');

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Header & Controls Bar */}
      <div className="flex flex-col gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              Universities Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore top accredited public, applied science, and private universities in {targetCountryLabel}.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isAiSearching && (
              <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Searching with Gemini AI...</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              <span>Showing {filteredUniversities.length} Universities</span>
            </div>
          </div>
        </div>

        {/* AI Results Disclosure Banner */}
        {hasAiResults && (
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">AI-Assisted Search Active:</span> Some entries below were discovered via the Gemini API fallback. Please verify specific program prerequisites directly on each university&apos;s official portal before applying.
            </div>
          </div>
        )}

        {/* Search & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {/* Search bar */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={`Search ${targetCountryLabel} university, city, or course...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-600 text-slate-900"
            />
          </div>

          {/* City Filter */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-600 text-slate-900 font-medium"
          >
            <option value="All">All Cities</option>
            {cities
              .filter((c) => c !== 'All')
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-600 text-slate-900 font-medium"
          >
            <option value="All">All Types (Public & Private)</option>
            <option value="Public">Public Universities</option>
            <option value="Private">Private Universities</option>
          </select>

          {/* Degree Filter */}
          <select
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-600 text-slate-900 font-medium"
          >
            <option value="All">All Degrees</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        {/* Sort Bar */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Sort by:</span>
            <button
              onClick={() => {
                if (sortBy === 'qsRanking') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                else {
                  setSortBy('qsRanking');
                  setSortOrder('asc');
                }
              }}
              className={`px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                sortBy === 'qsRanking'
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-transparent border-slate-200 text-slate-600'
              }`}
            >
              QS Rank {sortBy === 'qsRanking' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => {
                if (sortBy === 'name') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                else {
                  setSortBy('name');
                  setSortOrder('asc');
                }
              }}
              className={`px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                sortBy === 'name'
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-transparent border-slate-200 text-slate-600'
              }`}
            >
              Name {sortBy === 'name' && (sortOrder === 'asc' ? 'A-Z' : 'Z-A')}
            </button>
          </div>
        </div>
      </div>

      {/* University Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((uni) => (
          <div
            key={uni.id || uni.slug || uni.name}
            className={`flex flex-col justify-between rounded-3xl bg-white border shadow-sm hover:shadow-xl transition-all overflow-hidden group ${
              uni.isAiGenerated ? 'border-amber-300/80 bg-amber-50/20' : 'border-slate-200 hover:border-blue-500/40'
            }`}
          >
            {/* Cover & Header */}
            <div>
              <div className="relative h-40 w-full bg-slate-200 overflow-hidden">
                <img
                  src={uni.coverUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80'}
                  alt={uni.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                      QS Rank #{uni.qsRanking || '800+'}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-[11px] font-bold text-white">
                      {uni.type || 'Public'}
                    </span>
                  </div>

                  {/* AI Sourced Badge */}
                  {uni.isAiGenerated && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-[10px] font-extrabold text-white flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3" /> AI Sourced
                    </span>
                  )}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5">
                <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 mb-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{uni.cityName}, {targetCountryLabel}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {uni.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {uni.description}
                </p>

                {/* AI Warning Sub-strip */}
                {uni.isAiGenerated && (
                  <div className="mt-2.5 px-2.5 py-1 rounded-lg bg-amber-100/70 border border-amber-200 text-[10px] font-semibold text-amber-800 flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>Sourced via AI — verify before relying on this</span>
                  </div>
                )}

                {/* Key Metrics Pill Badges */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-medium">Semester Fee</span>
                    <span className="font-semibold text-slate-800">{uni.semesterFee}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-[10px] text-slate-400 font-medium">Tuition</span>
                    <span className="font-semibold text-emerald-600">{uni.tuitionFee}</span>
                  </div>
                </div>

                {/* Programs Tag */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">Degrees: {uni.degrees}</span>
                  {uni.hasEnglishPrograms && (
                    <span className="flex items-center text-emerald-600 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> English Taught
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Footer Buttons */}
            <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
              <button
                onClick={() => setActiveUniModal(uni)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors flex items-center justify-center"
              >
                <Info className="w-3.5 h-3.5 mr-1.5" /> Details
              </button>
              <a
                href={uni.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center"
              >
                Website <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* University Detail Modal */}
      {activeUniModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {activeUniModal.cityName}, {targetCountryLabel} • QS Rank #{activeUniModal.qsRanking || '800+'}
                  </span>
                  {activeUniModal.isAiGenerated && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> AI Discovered
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {activeUniModal.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveUniModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeUniModal.isAiGenerated && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Note:</strong> {activeUniModal.aiSourceNote || 'Sourced via AI — verify before relying on this'}. Please cross-check details on the official university portal.
                </span>
              </div>
            )}

            <p className="text-sm text-slate-600 leading-relaxed">
              {activeUniModal.description}
            </p>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs space-y-2">
              <h4 className="font-bold text-blue-700 flex items-center">
                <FileText className="w-4 h-4 mr-1.5" /> Admission Requirements Summary
              </h4>
              <p className="text-slate-700 leading-relaxed">
                {activeUniModal.admissionReqSummary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="block text-slate-400 font-medium">Semester Fee</span>
                <span className="font-bold text-slate-900">{activeUniModal.semesterFee}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="block text-slate-400 font-medium">Tuition Fee</span>
                <span className="font-bold text-emerald-600">{activeUniModal.tuitionFee}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setActiveUniModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 rounded-xl hover:bg-slate-100"
              >
                Close
              </button>
              <a
                href={activeUniModal.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center"
              >
                Visit Official Portal <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
