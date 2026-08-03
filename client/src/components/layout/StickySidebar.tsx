'use client';

import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  FileCheck,
  CheckSquare,
  ShieldCheck,
  Calendar,
  Award,
  Building2,
  Home,
  Briefcase,
  HeartPulse,
  Euro,
  Globe,
  HelpCircle,
  Newspaper,
  ChevronRight,
} from 'lucide-react';

interface Props {
  activeModule: string;
  onSelectModule: (moduleKey: string) => void;
  countryName: string;
  countryFlag: string;
}

export const MODULES_LIST = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'universities', label: 'Universities', icon: GraduationCap },
  { key: 'admission-requirements', label: 'Admission Req.', icon: FileCheck },
  { key: 'documents', label: 'Document Checklist', icon: CheckSquare },
  { key: 'aps', label: 'APS Certification', icon: ShieldCheck },
  { key: 'visa', label: 'Visa Guide', icon: FileCheck },
  { key: 'timeline', label: 'Interactive Timeline', icon: Calendar },
  { key: 'scholarships', label: 'Scholarships', icon: Award },
  { key: 'living-cost', label: 'Living Cost', icon: Building2 },
  { key: 'accommodation', label: 'Accommodation', icon: Home },
  { key: 'jobs', label: 'Part-Time Jobs', icon: Briefcase },
  { key: 'insurance', label: 'Health Insurance', icon: HeartPulse },
  { key: 'currency', label: 'Currency & Budget', icon: Euro },
  { key: 'resources', label: 'Official Resources', icon: Globe },
  { key: 'faq', label: 'FAQ Hub', icon: HelpCircle },
  { key: 'news', label: 'News & Updates', icon: Newspaper },
];

export default function StickySidebar({
  activeModule,
  onSelectModule,
  countryName,
  countryFlag,
}: Props) {
  return (
    <aside className="w-64 shrink-0 hidden lg:block sticky top-20 h-[calc(100vh-5.5rem)] overflow-y-auto p-4 bg-white border border-slate-200/90 rounded-3xl shadow-sm">
      {/* Active Country Header Card */}
      <div className="p-3 mb-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
        <span className="text-2xl">{countryFlag}</span>
        <div>
          <h4 className="text-xs font-extrabold text-slate-900">{countryName} Hub</h4>
          <span className="text-[10px] font-semibold text-emerald-600 flex items-center">
            ● Complete Database Active
          </span>
        </div>
      </div>

      {/* Nav list */}
      <nav className="space-y-1">
        {MODULES_LIST.map((m) => {
          const Icon = m.icon;
          const isActive = activeModule === m.key;
          return (
            <button
              key={m.key}
              onClick={() => onSelectModule(m.key)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{m.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
