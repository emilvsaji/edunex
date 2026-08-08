'use client';

import React, { useState, useMemo } from 'react';
import { FAQItem } from '@/types';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Tag,
  Sparkles,
} from 'lucide-react';

interface Props {
  faqs: FAQItem[];
  countryName?: string;
}

export default function FAQModule({ faqs, countryName }: Props) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    faqs.forEach((f) => set.add(f.category));
    return ['All', ...Array.from(set)];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((f) => {
      if (selectedCategory !== 'All' && f.category !== selectedCategory) return false;
      if (search) {
        const q = search.toLowerCase();
        const matchQ = f.question.toLowerCase().includes(q);
        const matchA = f.answer.toLowerCase().includes(q);
        const matchT = f.tags?.toLowerCase().includes(q);
        if (!matchQ && !matchA && !matchT) return false;
      }
      return true;
    });
  }, [faqs, search, selectedCategory]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Controls */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
              <HelpCircle className="w-6 h-6 text-indigo-500 mr-2" />
              Frequently Asked Questions Hub
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Search answers regarding {countryName ? `${countryName} admissions, visas, costs, and student life` : 'admissions, visas, and student life'}.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 w-fit">
            <span>{filteredFaqs.length} FAQs Found</span>
          </div>
        </div>

        {/* Search & Category Pills */}
        <div className="flex flex-col md:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search any question or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-xs sm:text-sm outline-none focus:border-indigo-500 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div className="flex items-center space-x-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = !!openIds[faq.id];
          return (
            <div
              key={faq.id}
              className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <span className="flex items-center pr-4">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mr-3 shrink-0" />
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-indigo-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60">
                  <p className="mt-2">{faq.answer}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                      Category: {faq.category}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
