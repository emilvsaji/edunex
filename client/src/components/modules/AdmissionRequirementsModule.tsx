'use client';

import React, { useState } from 'react';
import { AdmissionRequirement } from '@/types';
import {
  FileCheck,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Globe,
} from 'lucide-react';

interface Props {
  requirements: AdmissionRequirement[];
  countryName?: string;
}

export default function AdmissionRequirementsModule({ requirements, countryName }: Props) {
  const [activeTab, setActiveTab] = useState<'Bachelor' | 'Master' | 'PhD'>('Master');

  const currentReqs = requirements.filter((r) => r.degreeLevel === activeTab);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center">
            <FileCheck className="w-6 h-6 text-brand-500 mr-2" />
            Admission Requirements Matrix
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Exact academic, language, and credential requirements per degree level{countryName ? ` in ${countryName}` : ''}.
          </p>
        </div>

        {/* Degree Level Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 w-fit">
          {(['Bachelor', 'Master', 'PhD'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {tab} Degree
            </button>
          ))}
        </div>
      </div>

      {/* Requirements Matrix Cards */}
      <div className="space-y-6">
        {currentReqs.map((req, idx) => (
          <div
            key={req.id || idx}
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6"
          >
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-500">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {req.degreeLevel} Admission Criteria
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {countryName ? `Accredited ${countryName} Higher Education Standard` : 'Official Higher Education Qualification Standard'}
                  </p>
                </div>
              </div>
              {req.apsRequired ? (
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                  APS Certification Mandatory
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
                  Direct University Evaluation
                </span>
              )}
            </div>

            {/* Criteria Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                <span className="flex items-center text-xs font-medium text-zinc-400 mb-1">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5 text-brand-500" /> Academic Eligibility
                </span>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {req.academicReq}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                <span className="flex items-center text-xs font-medium text-zinc-400 mb-1">
                  <Award className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> Minimum CGPA / Grade
                </span>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {req.minCGPA}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                <span className="flex items-center text-xs font-medium text-zinc-400 mb-1">
                  <FileText className="w-3.5 h-3.5 mr-1.5 text-indigo-500" /> English Test (IELTS / TOEFL)
                </span>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  IELTS: {req.ieltsScore} • TOEFL: {req.toeflScore}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                <span className="flex items-center text-xs font-medium text-zinc-400 mb-1">
                  <Globe className="w-3.5 h-3.5 mr-1.5 text-rose-500" /> German Language Req
                </span>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  {req.germanReq}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                <span className="flex items-center text-xs font-medium text-zinc-400 mb-1">
                  <FileCheck className="w-3.5 h-3.5 mr-1.5 text-cyan-500" /> GRE / GMAT Requirement
                </span>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  {req.greGmatReq || 'Not required for most programs'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                <span className="flex items-center text-xs font-medium text-zinc-400 mb-1">
                  <Briefcase className="w-3.5 h-3.5 mr-1.5 text-teal-500" /> Work Experience / Portfolio
                </span>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  {req.experienceReq || 'Appreciated but not mandatory'}
                </p>
              </div>
            </div>

            {req.notes && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed"><strong className="font-semibold">Important Note:</strong> {req.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
