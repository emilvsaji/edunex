export interface Country {
  id: string;
  name: string;
  slug: string;
  code: string;
  flagEmoji: string;
  avgTuition: string;
  avgLivingCost: string;
  workHours: string;
  popularIntake: string;
  shortDesc: string;
  isComplete: boolean;
  capital?: string;
  currency?: string;
  language?: string;
  population?: string;
  intStudentsCount?: string;
  semesterContrib?: string;
  blockedAccountAmt?: string;
  minWage?: string;
  publicUnivCount?: number;
  privateUnivCount?: number;
  topCities?: string;
  popularCourses?: string;
  climate?: string;
  timeDiff?: string;
  safetyIndex?: string;
  cities?: City[];
  universities?: University[];
  requirements?: AdmissionRequirement[];
  documents?: DocumentItem[];
  apsGuides?: APSGuide[];
  visas?: VisaInfo[];
  timelines?: TimelineStep[];
  scholarships?: Scholarship[];
  livingCosts?: LivingCostCity[];
  accommodations?: AccommodationOption[];
  partTimeJobs?: PartTimeJobInfo[];
  insurances?: InsuranceOption[];
  officialResources?: OfficialResource[];
  faqs?: FAQItem[];
}

export interface City {
  id: string;
  countryId: string;
  name: string;
  state?: string;
  avgRent: number;
  avgFood: number;
  avgTransport: number;
  avgUtilities: number;
  avgInternet: number;
  avgEntertainment: number;
  totalMonthly: number;
  isPopular: boolean;
}

export interface University {
  id: string;
  countryId: string;
  cityId?: string;
  name: string;
  slug: string;
  type: 'Public' | 'Private';
  qsRanking: number;
  cityName: string;
  logoUrl?: string;
  coverUrl?: string;
  semesterFee: string;
  tuitionFee: string;
  hasEnglishPrograms: boolean;
  officialWebsite: string;
  admissionReqSummary: string;
  degrees: string;
  description: string;
  requirements?: AdmissionRequirement[];
}

export interface AdmissionRequirement {
  id: string;
  degreeLevel: 'Bachelor' | 'Master' | 'PhD';
  academicReq: string;
  minCGPA: string;
  ieltsScore: string;
  toeflScore: string;
  germanReq: string;
  apsRequired: boolean;
  greGmatReq?: string;
  portfolioReq?: string;
  experienceReq?: string;
  notes?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  description: string;
  purpose: string;
  sampleUrl?: string;
  commonMistakes: string;
  isMandatory: boolean;
  stage: string;
}

export interface APSGuide {
  id: string;
  title: string;
  eligibility: string;
  requiredDocsJson: string;
  feeAmount: string;
  feeCurrency: string;
  timelineWeeks: string;
  trackingUrl: string;
  officialPortalUrl: string;
  applicationStepsJson: string;
  faqsJson: string;
}

export interface VisaInfo {
  id: string;
  visaType: string;
  feeAmount: string;
  processingTimeWeeks: string;
  biometricsInfo: string;
  embassyPortalUrl: string;
  stepsJson: string;
  requiredDocsJson: string;
  rejectionReasonsJson: string;
}

export interface TimelineStep {
  id: string;
  monthMark: string;
  title: string;
  description: string;
  actionsJson: string;
  icon: string;
  order: number;
}

export interface Scholarship {
  id: string;
  countryId?: string;
  title: string;
  providerType: 'Government' | 'DAAD' | 'University' | 'Private';
  fundingAmount: string;
  degreeLevel: string;
  deadline: string;
  eligibility: string;
  officialWebsite: string;
  description: string;
}

export interface LivingCostCity {
  id: string;
  cityName: string;
  rent: number;
  food: number;
  transport: number;
  utilities: number;
  internet: number;
  entertainment: number;
  monthlyTotal: number;
  description?: string;
}

export interface AccommodationOption {
  id: string;
  type: string;
  avgCostRange: string;
  depositRequired: string;
  bookingPortals: string;
  tips: string;
  pros: string;
  cons: string;
}

export interface PartTimeJobInfo {
  id: string;
  allowedHours: string;
  minWage: string;
  miniJobCap: string;
  taxRules: string;
  popularJobsJson: string;
  semesterRules: string;
  holidayRules: string;
  jobPortalsJson: string;
}

export interface InsuranceOption {
  id: string;
  type: 'Public' | 'Private';
  providerName: string;
  monthlyCost: string;
  requirements: string;
  coverageDetails: string;
  pros: string;
  cons: string;
  recommendedFor: string;
}

export interface OfficialResource {
  id: string;
  title: string;
  category: string;
  url: string;
  description: string;
  badgeText?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags?: string;
}

export interface CurrencyData {
  base: string;
  target: string;
  rate: number;
  lastUpdated: string;
  history: Array<{ month: string; rate: string }>;
}

export interface SearchResults {
  universities: University[];
  scholarships: Scholarship[];
  documents: DocumentItem[];
  faqs: FAQItem[];
  resources: OfficialResource[];
}
