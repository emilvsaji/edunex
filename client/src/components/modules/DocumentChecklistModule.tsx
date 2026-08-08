'use client';

import React, { useState, useEffect } from 'react';
import { DocumentItem } from '@/types';
import {
  CheckSquare,
  Square,
  AlertTriangle,
  FileText,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface Props {
  documents: DocumentItem[];
  countryName?: string;
}

export default function DocumentChecklistModule({ documents, countryName }: Props) {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const saved = localStorage.getItem('edunex_doc_checklist');
    if (saved) {
      try { setCheckedIds(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const toggleCheck = (id: string) => {
    const updated = { ...checkedIds, [id]: !checkedIds[id] };
    setCheckedIds(updated);
    localStorage.setItem('edunex_doc_checklist', JSON.stringify(updated));
  };

  // Derive categories dynamically from documents (APS only appears if country has APS documents)
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    documents.forEach((d) => {
      if (d.category) set.add(d.category);
      if (d.stage) set.add(d.stage);
    });
    return ['All', ...Array.from(set)];
  }, [documents]);

  const filteredDocs = documents.filter((doc) => {
    if (activeCategory === 'All') return true;
    return doc.stage.toLowerCase().includes(activeCategory.toLowerCase()) || doc.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const completedCount = documents.filter((d) => checkedIds[d.id]).length;
  const progressPercent = documents.length ? Math.round((completedCount / documents.length) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Progress Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
              <CheckSquare className="w-6 h-6 text-brand-500 mr-2" />
              Interactive Document Checklist
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Track mandatory academic, financial, visa, and enrollment documents{countryName ? ` for ${countryName}` : ''}.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <span className="text-xs text-zinc-400 font-medium">Readiness Score</span>
              <p className="text-lg font-extrabold text-brand-500">{progressPercent}% Completed</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-brand-500/20 border-t-brand-500 flex items-center justify-center font-bold text-xs">
              {completedCount}/{documents.length}
            </div>
          </div>
        </div>

        {/* Progress bar line */}
        <div className="w-full h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document Items List */}
      <div className="space-y-4">
        {filteredDocs.map((doc) => {
          const isChecked = !!checkedIds[doc.id];
          return (
            <div
              key={doc.id}
              onClick={() => toggleCheck(doc.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                isChecked
                  ? 'bg-emerald-500/5 border-emerald-500/30 dark:bg-emerald-500/10'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-brand-500/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCheck(doc.id);
                  }}
                  className="mt-0.5 shrink-0 text-brand-500 focus:outline-none"
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Square className="w-5 h-5 text-zinc-400 hover:text-brand-500" />
                  )}
                </button>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <h3
                        className={`text-base font-bold transition-colors ${
                          isChecked
                            ? 'line-through text-zinc-400 dark:text-zinc-500'
                            : 'text-zinc-900 dark:text-zinc-100'
                        }`}
                      >
                        {doc.title}
                      </h3>
                      {doc.isMandatory && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/10 text-rose-500 border border-rose-500/20">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-500">
                      Stage: {doc.stage}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {doc.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300">
                      <strong className="font-semibold text-brand-500 block mb-0.5">Purpose:</strong>
                      {doc.purpose}
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-500/5 text-rose-700 dark:text-rose-300 border border-rose-500/10">
                      <strong className="font-semibold text-rose-500 block mb-0.5 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Common Mistake:
                      </strong>
                      {doc.commonMistakes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
