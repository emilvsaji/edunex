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
  ChevronRight,
} from 'lucide-react';

export interface ModuleItem {
  key: string;
  label: string;
  icon: React.ElementType;
}

interface Props {
  activeModule: string;
  onSelectModule: (moduleKey: string) => void;
  countryName: string;
  countryFlag: string;
  modulesList?: ModuleItem[];
}

// Full module list — used by Germany (and any country that includes all modules)
export const MODULES_LIST: ModuleItem[] = [
  { key: 'overview',               label: 'Overview',             icon: LayoutDashboard },
  { key: 'universities',           label: 'Universities',         icon: GraduationCap   },
  { key: 'admission-requirements', label: 'Admission Req.',       icon: FileCheck        },
  { key: 'documents',              label: 'Document Checklist',   icon: CheckSquare      },
  { key: 'aps',                    label: 'APS Certification',    icon: ShieldCheck      },
  { key: 'visa',                   label: 'Visa Guide',           icon: FileCheck        },
  { key: 'timeline',               label: 'Interactive Timeline', icon: Calendar         },
  { key: 'scholarships',           label: 'Scholarships',         icon: Award            },
  { key: 'living-cost',            label: 'Living Cost',          icon: Building2        },
  { key: 'accommodation',          label: 'Accommodation',        icon: Home             },
  { key: 'jobs',                   label: 'Part-Time Jobs',       icon: Briefcase        },
  { key: 'insurance',              label: 'Health Insurance',     icon: HeartPulse       },
  { key: 'currency',               label: 'Currency & Budget',    icon: Euro             },
  { key: 'resources',              label: 'Official Resources',   icon: Globe            },
  { key: 'faq',                    label: 'FAQ Hub',              icon: HelpCircle       },
];

// Austria module list — excludes APS (not applicable), same order otherwise
export const AUSTRIA_MODULES_LIST: ModuleItem[] = MODULES_LIST.filter(
  (m) => m.key !== 'aps'
);

export default function StickySidebar({
  activeModule,
  onSelectModule,
  countryName,
  countryFlag,
  modulesList,
}: Props) {
  // Use provided list, or fall back to the full default list
  const items = modulesList ?? MODULES_LIST;

  return (
    <aside
      className="w-64 shrink-0 hidden lg:block sticky top-20 h-[calc(100vh-5.5rem)] overflow-y-auto p-4 bg-white rounded-3xl"
      style={{ border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}
    >
      {/* Active Country Header Card */}
      <div
        className="p-3 mb-4 rounded-2xl flex items-center space-x-3"
        style={{ background: '#F7F6F3', border: '1px solid rgba(0,0,0,0.08)' }}
      >
        <span className="text-2xl">{countryFlag}</span>
        <div>
          <h4 className="text-xs font-extrabold font-sans" style={{ color: '#0F172A' }}>
            {countryName} Hub
          </h4>
          <span className="text-[10px] font-semibold flex items-center gap-1" style={{ color: '#059669' }}>
            ● Complete Database Active
          </span>
        </div>
      </div>

      {/* Nav list */}
      <nav className="space-y-0.5">
        {items.map((m) => {
          const Icon = m.icon;
          const isActive = activeModule === m.key;
          return (
            <button
              key={m.key}
              onClick={() => onSelectModule(m.key)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold font-sans transition-all ${
                isActive
                  ? 'text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              style={
                isActive
                  ? { background: '#0F172A' }
                  : { background: 'transparent' }
              }
              onMouseOver={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.04)';
              }}
              onMouseOut={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{m.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
