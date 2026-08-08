'use client';

import React, { useState, useEffect } from 'react';
import { TimelineStep } from '@/types';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Search,
  Award,
  FileCheck,
  Send,
  Landmark,
  ShieldCheck,
  Home,
  Plane,
  MapPin,
  Sparkles,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Search,
  Award,
  FileCheck,
  Send,
  Landmark,
  ShieldCheck,
  Home,
  Plane,
  MapPin,
};

interface Props {
  timelines: TimelineStep[];
  countryName?: string;
}

export default function TimelineModule({ timelines, countryName }: Props) {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('edunex_timeline_steps');
    if (saved) {
      try { setCompletedSteps(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const toggleStep = (id: string) => {
    const updated = { ...completedSteps, [id]: !completedSteps[id] };
    setCompletedSteps(updated);
    localStorage.setItem('edunex_timeline_steps', JSON.stringify(updated));
  };

  const sortedTimelines = [...timelines].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
            <Calendar className="w-6 h-6 text-brand-500 mr-2" />
            12-Month Interactive Application Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Visual milestone checklist from university shortlisting to arriving in {countryName || 'your destination'}.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold px-3 py-1.5 rounded-full bg-brand-500/10 text-brand-500 w-fit">
          <Sparkles className="w-4 h-4" />
          <span>{Object.values(completedSteps).filter(Boolean).length} / {timelines.length} Milestones Reached</span>
        </div>
      </div>

      {/* Visual Roadmap Vertical Timeline */}
      <div className="relative border-l-2 border-brand-500/30 ml-4 sm:ml-8 space-y-8 py-2">
        {sortedTimelines.map((step) => {
          const isDone = !!completedSteps[step.id];
          const actions: string[] = step.actionsJson ? JSON.parse(step.actionsJson) : [];
          const StepIcon = iconMap[step.icon] || Calendar;

          return (
            <div key={step.id} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Node Icon */}
              <button
                onClick={() => toggleStep(step.id)}
                className={`absolute -left-4 top-1 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-500/20'
                    : 'bg-white dark:bg-zinc-900 border-2 border-brand-500 text-brand-500 hover:scale-110'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-5 h-5" /> : <StepIcon className="w-4 h-4" />}
              </button>

              {/* Step Card Content */}
              <div
                className={`p-6 rounded-3xl border transition-all ${
                  isDone
                    ? 'bg-emerald-500/5 border-emerald-500/30 dark:bg-emerald-500/10'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold border border-brand-500/20">
                    {step.monthMark}
                  </span>
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="text-xs font-semibold text-zinc-400 hover:text-brand-500 transition-colors"
                  >
                    {isDone ? 'Mark as Pending' : 'Mark Completed ✓'}
                  </button>
                </div>

                <h3
                  className={`text-lg font-bold transition-colors ${
                    isDone ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-900 dark:text-zinc-100'
                  }`}
                >
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                  {step.description}
                </p>

                {/* Actions checklist */}
                {actions.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
                    <span className="text-[11px] font-bold uppercase text-zinc-400 tracking-wider">Action Items:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {actions.map((act, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-zinc-700 dark:text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
