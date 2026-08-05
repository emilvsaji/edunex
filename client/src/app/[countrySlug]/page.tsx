'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { countryService } from '@/services/api';
import { Country } from '@/types';
import TopNavbar from '@/components/layout/TopNavbar';
import StickySidebar, { MODULES_LIST } from '@/components/layout/StickySidebar';

import OverviewModule from '@/components/modules/OverviewModule';
import UniversitiesModule from '@/components/modules/UniversitiesModule';
import AdmissionRequirementsModule from '@/components/modules/AdmissionRequirementsModule';
import DocumentChecklistModule from '@/components/modules/DocumentChecklistModule';
import APSGuideModule from '@/components/modules/APSGuideModule';
import VisaGuideModule from '@/components/modules/VisaGuideModule';
import TimelineModule from '@/components/modules/TimelineModule';
import ScholarshipsModule from '@/components/modules/ScholarshipsModule';
import LivingCostModule from '@/components/modules/LivingCostModule';
import AccommodationModule from '@/components/modules/AccommodationModule';
import PartTimeJobsModule from '@/components/modules/PartTimeJobsModule';
import HealthInsuranceModule from '@/components/modules/HealthInsuranceModule';
import CurrencyModule from '@/components/modules/CurrencyModule';
import OfficialResourcesModule from '@/components/modules/OfficialResourcesModule';
import FAQModule from '@/components/modules/FAQModule';

export default function DestinationDashboardPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const countrySlug = (params?.countrySlug as string) || 'germany';
  const initialModule = searchParams.get('module') || 'overview';

  const [country, setCountry] = useState<Country | null>(null);
  const [activeModule, setActiveModule] = useState<string>(initialModule);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    countryService.getBySlug(countrySlug).then((data) => {
      setCountry(data);
      setIsLoading(false);
    });
  }, [countrySlug]);

  useEffect(() => {
    const mod = searchParams.get('module');
    if (mod) setActiveModule(mod);
  }, [searchParams]);

  const handleSelectModule = (modKey: string) => {
    setActiveModule(modKey);
    router.push(`/${countrySlug}?module=${modKey}`, { scroll: false });
  };

  if (isLoading || !country) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4 text-slate-900">
        <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500 font-medium">Loading {countrySlug} edunex Hub...</p>
      </div>
    );
  }

  const activeModuleItem = MODULES_LIST.find((m) => m.key === activeModule) || MODULES_LIST[0];

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'overview':
        return <OverviewModule country={country} />;
      case 'universities':
        return <UniversitiesModule universities={country.universities || []} />;
      case 'admission-requirements':
        return <AdmissionRequirementsModule requirements={country.requirements || []} />;
      case 'documents':
        return <DocumentChecklistModule documents={country.documents || []} />;
      case 'aps':
        return <APSGuideModule apsGuides={country.apsGuides || []} />;
      case 'visa':
        return <VisaGuideModule visas={country.visas || []} />;
      case 'timeline':
        return <TimelineModule timelines={country.timelines || []} />;
      case 'scholarships':
        return <ScholarshipsModule scholarships={country.scholarships || []} />;
      case 'living-cost':
        return <LivingCostModule livingCosts={country.livingCosts || []} />;
      case 'accommodation':
        return <AccommodationModule accommodations={country.accommodations || []} />;
      case 'jobs':
        return <PartTimeJobsModule partTimeJobs={country.partTimeJobs || []} />;
      case 'insurance':
        return <HealthInsuranceModule insurances={country.insurances || []} />;
      case 'currency':
        return <CurrencyModule />;
      case 'resources':
        return <OfficialResourcesModule resources={country.officialResources || []} />;
      case 'faq':
        return <FAQModule faqs={country.faqs || []} />;
      default:
        return <OverviewModule country={country} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <TopNavbar countryName={country.name} activeModuleLabel={activeModuleItem.label} />

      {/* Main Dashboard Layout - Full Screen Ratio */}
      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex items-start gap-6 flex-1">
        {/* Sticky Sidebar */}
        <StickySidebar
          activeModule={activeModule}
          onSelectModule={handleSelectModule}
          countryName={country.name}
          countryFlag={country.flagEmoji}
        />

        {/* Dynamic Module Content View */}
        <main className="flex-1 min-w-0 pb-16">
          {/* Mobile Module Selector bar */}
          <div className="lg:hidden mb-6 p-2 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm overflow-x-auto flex space-x-1">
            {MODULES_LIST.map((m) => (
              <button
                key={m.key}
                onClick={() => handleSelectModule(m.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-sans whitespace-nowrap transition-all ${
                  activeModule === m.key
                    ? 'text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                style={activeModule === m.key ? { background: '#0F172A' } : {}}
              >
                {m.label}
              </button>
            ))}
          </div>

          {renderModuleContent()}
        </main>
      </div>
    </div>
  );
}
