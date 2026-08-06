'use client';

import React, { useState, useMemo } from 'react';
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
} from 'lucide-react';

export default function UniversitiesModule({ universities }: { universities: University[] }) {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDegree, setSelectedDegree] = useState('All');
  const [sortBy, setSortBy] = useState<'qsRanking' | 'tuition' | 'name'>('qsRanking');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeUniModal, setActiveUniModal] = useState<University | null>(null);

  // Extract cities
  const cities = useMemo(() => {
    const set = new Set<string>();
    universities.forEach((u) => set.add(u.cityName));
    return ['All', ...Array.from(set)];
  }, [universities]);

  // Filter & Sort
  const filteredUniversities = useMemo(() => {
    return universities
      .filter((u) => {
        if (search) {
          const q = search.toLowerCase();
          const matchName = u.name.toLowerCase().includes(q);
          const matchCity = u.cityName.toLowerCase().includes(q);
          const matchDesc = u.description.toLowerCase().includes(q);
          if (!matchName && !matchCity && !matchDesc) return false;
        }
        if (selectedCity !== 'All' && u.cityName !== selectedCity) return false;
        if (selectedType !== 'All' && u.type !== selectedType) return false;
        if (selectedDegree !== 'All' && !u.degrees.includes(selectedDegree)) return false;
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
  }, [universities, search, selectedCity, selectedType, selectedDegree, sortBy, sortOrder]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Controls Bar */}
      <div className="flex flex-col gap-4 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
              <GraduationCap className="w-6 h-6 text-brand-500 mr-2" />
              Universities Directory
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Explore top accredited public and private universities in Germany.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 w-fit">
            <span>Showing {filteredUniversities.length} of {universities.length} Universities</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {/* Search bar */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search university name, city, or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-xs sm:text-sm outline-none focus:border-brand-500 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* City Filter */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-xs sm:text-sm outline-none focus:border-brand-500 text-zinc-900 dark:text-zinc-100"
          >
            <option value="All">All Cities</option>
            {cities.filter(c => c !== 'All').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-xs sm:text-sm outline-none focus:border-brand-500 text-zinc-900 dark:text-zinc-100"
          >
            <option value="All">All Types (Public & Private)</option>
            <option value="Public">Public Universities</option>
            <option value="Private">Private Universities</option>
          </select>

          {/* Degree Filter */}
          <select
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(e.target.value)}
            className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-xs sm:text-sm outline-none focus:border-brand-500 text-zinc-900 dark:text-zinc-100"
          >
            <option value="All">All Degrees</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        {/* Sort Bar */}
        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
          <div className="flex items-center space-x-2 text-xs text-zinc-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Sort by:</span>
            <button
              onClick={() => {
                if (sortBy === 'qsRanking') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                else { setSortBy('qsRanking'); setSortOrder('asc'); }
              }}
              className={`px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                sortBy === 'qsRanking'
                  ? 'bg-brand-500/10 border-brand-500/40 text-brand-600 dark:text-brand-400'
                  : 'bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              QS Rank {sortBy === 'qsRanking' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => {
                if (sortBy === 'name') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                else { setSortBy('name'); setSortOrder('asc'); }
              }}
              className={`px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                sortBy === 'name'
                  ? 'bg-brand-500/10 border-brand-500/40 text-brand-600 dark:text-brand-400'
                  : 'bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
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
            key={uni.id}
            className="flex flex-col justify-between rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-brand-500/40 transition-all overflow-hidden group"
          >
            {/* Cover & Logo Header */}
            <div>
              <div className="relative h-40 w-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <img
                  src={uni.coverUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80'}
                  alt={uni.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                    QS Rank #{uni.qsRanking}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-brand-600/90 backdrop-blur-md text-[11px] font-bold text-white">
                    {uni.type}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5">
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-500 mb-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{uni.cityName}, Germany</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-brand-500 transition-colors">
                  {uni.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                  {uni.description}
                </p>

                {/* Key Metrics Pill Badges */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                    <span className="block text-[10px] text-zinc-400 font-medium">Semester Fee</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{uni.semesterFee}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                    <span className="block text-[10px] text-zinc-400 font-medium">Tuition</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{uni.tuitionFee}</span>
                  </div>
                </div>

                {/* Programs Tag */}
                <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                  <span className="font-medium">Degrees: {uni.degrees}</span>
                  {uni.hasEnglishPrograms && (
                    <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> English Taught
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Footer Buttons */}
            <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-zinc-100 dark:border-zinc-800/60 mt-2">
              <button
                onClick={() => setActiveUniModal(uni)}
                className="flex-1 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-bold transition-colors flex items-center justify-center"
              >
                <Info className="w-3.5 h-3.5 mr-1.5" /> Details
              </button>
              <a
                href={uni.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-colors flex items-center justify-center"
              >
                Website <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* University Detail Modal */}
      {activeUniModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider">
                  {activeUniModal.cityName} • QS Rank #{activeUniModal.qsRanking}
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                  {activeUniModal.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveUniModal(null)}
                className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {activeUniModal.description}
            </p>

            <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-xs space-y-2">
              <h4 className="font-bold text-brand-600 dark:text-brand-400 flex items-center">
                <FileText className="w-4 h-4 mr-1.5" /> Admission Requirements Summary
              </h4>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {activeUniModal.admissionReqSummary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <span className="block text-zinc-400 font-medium">Semester Fee</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{activeUniModal.semesterFee}</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <span className="block text-zinc-400 font-medium">Tuition Fee</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeUniModal.tuitionFee}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setActiveUniModal(null)}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Close
              </button>
              <a
                href={activeUniModal.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl flex items-center"
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
