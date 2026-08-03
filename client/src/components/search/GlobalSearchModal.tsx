'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, GraduationCap, Award, FileText, HelpCircle, ExternalLink, Command } from 'lucide-react';
import { searchService } from '@/services/api';
import { SearchResults } from '@/types';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await searchService.global(query);
        setResults(res);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-zinc-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search universities, scholarships, visa guides, APS, FAQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2 py-1 text-xs font-mono text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div className="p-4 overflow-y-auto space-y-6">
          {isLoading && (
            <div className="flex items-center justify-center py-8 text-zinc-400 text-sm">
              <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mr-2" />
              Searching edunex index...
            </div>
          )}

          {!query && (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto mb-3">
                <Command className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Type to search anything in Germany Study Hub
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Try searching <span className="font-mono text-brand-500">"TUM"</span>, <span className="font-mono text-brand-500">"DAAD"</span>, <span className="font-mono text-brand-500">"Blocked Account"</span>, or <span className="font-mono text-brand-500">"APS"</span>
              </p>
            </div>
          )}

          {results && (
            <>
              {/* Universities */}
              {results.universities.length > 0 && (
                <div>
                  <h4 className="flex items-center text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-brand-500" />
                    Universities ({results.universities.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.universities.map((u) => (
                      <Link
                        key={u.id}
                        href={`/germany?module=universities&search=${encodeURIComponent(u.name)}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-brand-500 transition-colors">
                            {u.name}
                          </p>
                          <p className="text-xs text-zinc-400">
                            {u.cityName} • QS #{u.qsRanking} • {u.type}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-brand-500 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Scholarships */}
              {results.scholarships.length > 0 && (
                <div>
                  <h4 className="flex items-center text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    <Award className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                    Scholarships ({results.scholarships.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.scholarships.map((s) => (
                      <Link
                        key={s.id}
                        href="/germany?module=scholarships"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors">
                            {s.title}
                          </p>
                          <p className="text-xs text-zinc-400">
                            {s.providerType} • {s.fundingAmount}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {results.documents.length > 0 && (
                <div>
                  <h4 className="flex items-center text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    <FileText className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                    Required Documents ({results.documents.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.documents.map((d) => (
                      <Link
                        key={d.id}
                        href="/germany?module=documents"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500 transition-colors">
                            {d.title}
                          </p>
                          <p className="text-xs text-zinc-400 line-clamp-1">{d.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {results.faqs.length > 0 && (
                <div>
                  <h4 className="flex items-center text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    <HelpCircle className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                    FAQs ({results.faqs.length})
                  </h4>
                  <div className="space-y-1.5">
                    {results.faqs.map((f) => (
                      <Link
                        key={f.id}
                        href="/germany?module=faq"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-500 transition-colors">
                            {f.question}
                          </p>
                          <p className="text-xs text-zinc-400 line-clamp-1">{f.answer}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {results.universities.length === 0 &&
                results.scholarships.length === 0 &&
                results.documents.length === 0 &&
                results.faqs.length === 0 &&
                results.resources.length === 0 && (
                  <div className="text-center py-8 text-zinc-400 text-sm">
                    No results found for "{query}". Try a different search term.
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
