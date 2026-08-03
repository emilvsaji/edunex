"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting edunex database seed...');
    // Clean existing tables
    await prisma.fAQItem.deleteMany();
    await prisma.officialResource.deleteMany();
    await prisma.insuranceOption.deleteMany();
    await prisma.partTimeJobInfo.deleteMany();
    await prisma.accommodationOption.deleteMany();
    await prisma.livingCostCity.deleteMany();
    await prisma.scholarship.deleteMany();
    await prisma.timelineStep.deleteMany();
    await prisma.visaInfo.deleteMany();
    await prisma.aPSGuide.deleteMany();
    await prisma.documentItem.deleteMany();
    await prisma.admissionRequirement.deleteMany();
    await prisma.university.deleteMany();
    await prisma.city.deleteMany();
    await prisma.country.deleteMany();
    await prisma.user.deleteMany();
    // Create Users & Admin
    const hashedPassword = await bcryptjs_1.default.hash('admin123', 10);
    await prisma.user.create({
        data: {
            email: 'admin@edunex.io',
            password: hashedPassword,
            name: 'Edunex Super Admin',
            role: 'ADMIN',
        },
    });
    const demoUserPassword = await bcryptjs_1.default.hash('student123', 10);
    await prisma.user.create({
        data: {
            email: 'student@edunex.io',
            password: demoUserPassword,
            name: 'Alex Student',
            role: 'USER',
        },
    });
    // Create Countries
    const germany = await prisma.country.create({
        data: {
            name: 'Germany',
            slug: 'germany',
            code: 'DE',
            flagEmoji: '🇩🇪',
            avgTuition: '€0 - €3,000 / year',
            avgLivingCost: '€934 - €1,100 / month',
            workHours: '140 full days (280 half days) / year',
            popularIntake: 'Winter (Oct) & Summer (Apr)',
            shortDesc: 'Europe’s leading study destination offering tuition-free public university education, world-class STEM research, and solid post-study career opportunities.',
            isComplete: true,
            capital: 'Berlin',
            currency: 'Euro (€)',
            language: 'German (English for many Masters)',
            population: '84.4 Million',
            intStudentsCount: '458,210+',
            semesterContrib: '€150 - €400 / semester (Includes Transit Pass)',
            blockedAccountAmt: '€11,904 / year (€992 / month)',
            minWage: '€12.41 / hour',
            publicUnivCount: 300,
            privateUnivCount: 100,
            topCities: JSON.stringify(['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Aachen', 'Karlsruhe']),
            popularCourses: JSON.stringify(['Computer Science', 'Automotive Engineering', 'Data Science', 'Renewable Energy', 'Mechanical Engineering', 'International Business']),
            climate: 'Temperate (Mild summers, cool winters: -2°C to 25°C)',
            timeDiff: 'UTC+1 (CET) / UTC+2 (CEST)',
            safetyIndex: '75.2 (Very Safe)',
        },
    });
    // Non-Germany countries (Coming Soon)
    const comingSoonCountries = [
        {
            name: 'Canada',
            slug: 'canada',
            code: 'CA',
            flagEmoji: '🇨🇦',
            avgTuition: 'CAD $15,000 - $35,000 / year',
            avgLivingCost: 'CAD $1,200 - $2,000 / month',
            workHours: '20 hours / week',
            popularIntake: 'Fall (Sep) & Winter (Jan)',
            shortDesc: 'Renowned for world-class universities, welcoming multicultural policy, and generous Post-Graduation Work Permits (PGWP).',
        },
        {
            name: 'United Kingdom',
            slug: 'united-kingdom',
            code: 'GB',
            flagEmoji: '🇬🇧',
            avgTuition: '£12,000 - £30,000 / year',
            avgLivingCost: '£1,000 - £1,500 / month',
            workHours: '20 hours / week',
            popularIntake: 'Autumn (Sep) & Spring (Jan)',
            shortDesc: 'Home to Oxford, Cambridge, and historic institutions with 1-year intensive Master degrees and Graduate Route visas.',
        },
        {
            name: 'Australia',
            slug: 'australia',
            code: 'AU',
            flagEmoji: '🇦🇺',
            avgTuition: 'AUD $20,000 - $45,000 / year',
            avgLivingCost: 'AUD $1,400 - $2,200 / month',
            workHours: '48 hours / fortnight',
            popularIntake: 'Feb / Mar & Jul / Aug',
            shortDesc: 'High quality of life, top-ranked universities, breathtaking climate, and extended post-study work rights.',
        },
        {
            name: 'Ireland',
            slug: 'ireland',
            code: 'IE',
            flagEmoji: '🇮🇪',
            avgTuition: '€9,800 - €25,000 / year',
            avgLivingCost: '€1,000 - €1,800 / month',
            workHours: '20 hours / week',
            popularIntake: 'Autumn (Sep) & Spring (Jan)',
            shortDesc: 'Silicon Valley of Europe housing global tech headquarters (Google, Meta, Apple) with 2-year post-study work visa for Masters.',
        },
        {
            name: 'France',
            slug: 'france',
            code: 'FR',
            flagEmoji: '🇫🇷',
            avgTuition: '€2,770 - €15,000 / year',
            avgLivingCost: '€800 - €1,400 / month',
            workHours: '60% of annual legal working time',
            popularIntake: 'September & January',
            shortDesc: 'Affordable public university tuition, rich culinary culture, prestigious Grand Écoles, and 5-year short-stay travel visas for alumni.',
        },
        {
            name: 'Netherlands',
            slug: 'netherlands',
            code: 'NL',
            flagEmoji: '🇳🇱',
            avgTuition: '€6,000 - €15,000 / year',
            avgLivingCost: '€900 - €1,500 / month',
            workHours: '16 hours / week',
            popularIntake: 'September & February',
            shortDesc: 'Highest English proficiency in non-English Europe, innovative teaching methods, and vibrant international tech startup hubs.',
        },
        {
            name: 'New Zealand',
            slug: 'new-zealand',
            code: 'NZ',
            flagEmoji: '🇳🇿',
            avgTuition: 'NZD $22,000 - $35,000 / year',
            avgLivingCost: 'NZD $1,200 - $1,800 / month',
            workHours: '20 hours / week',
            popularIntake: 'February & July',
            shortDesc: 'Safe, serene landscape, practical industry-oriented education, and up to 3 years post-study work opportunities.',
        },
        {
            name: 'Sweden',
            slug: 'sweden',
            code: 'SE',
            flagEmoji: '🇸🇪',
            avgTuition: 'SEK 80,000 - 140,000 / year',
            avgLivingCost: 'SEK 9,500 / month',
            workHours: 'No legal hourly limit for full-time students',
            popularIntake: 'Autumn (August)',
            shortDesc: 'Pioneer in sustainability, equality, and cutting-edge tech innovations like Spotify and Klarna.',
        },
        {
            name: 'Finland',
            slug: 'finland',
            code: 'FI',
            flagEmoji: '🇫🇮',
            avgTuition: '€6,000 - €12,000 / year',
            avgLivingCost: '€700 - €1,100 / month',
            workHours: '30 hours / week',
            popularIntake: 'Autumn (September)',
            shortDesc: 'Voted happiest country in the world with world-best education system, generous tuition waivers, and post-study permanent residence pathway.',
        },
    ];
    for (const c of comingSoonCountries) {
        await prisma.country.create({
            data: {
                ...c,
                isComplete: false,
            },
        });
    }
    // Create Cities for Germany
    const cityMunich = await prisma.city.create({
        data: {
            countryId: germany.id,
            name: 'Munich',
            state: 'Bavaria',
            avgRent: 650,
            avgFood: 250,
            avgTransport: 49,
            avgUtilities: 110,
            avgInternet: 30,
            avgEntertainment: 120,
            totalMonthly: 1209,
            isPopular: true,
        },
    });
    const cityBerlin = await prisma.city.create({
        data: {
            countryId: germany.id,
            name: 'Berlin',
            state: 'Berlin',
            avgRent: 550,
            avgFood: 230,
            avgTransport: 49,
            avgUtilities: 95,
            avgInternet: 28,
            avgEntertainment: 110,
            totalMonthly: 1062,
            isPopular: true,
        },
    });
    const cityAachen = await prisma.city.create({
        data: {
            countryId: germany.id,
            name: 'Aachen',
            state: 'North Rhine-Westphalia',
            avgRent: 420,
            avgFood: 200,
            avgTransport: 0, // Included in semester ticket
            avgUtilities: 85,
            avgInternet: 25,
            avgEntertainment: 80,
            totalMonthly: 810,
            isPopular: true,
        },
    });
    const cityKarlsruhe = await prisma.city.create({
        data: {
            countryId: germany.id,
            name: 'Karlsruhe',
            state: 'Baden-Württemberg',
            avgRent: 450,
            avgFood: 210,
            avgTransport: 0,
            avgUtilities: 90,
            avgInternet: 25,
            avgEntertainment: 85,
            totalMonthly: 860,
            isPopular: true,
        },
    });
    const cityFrankfurt = await prisma.city.create({
        data: {
            countryId: germany.id,
            name: 'Frankfurt',
            state: 'Hesse',
            avgRent: 600,
            avgFood: 240,
            avgTransport: 49,
            avgUtilities: 105,
            avgInternet: 30,
            avgEntertainment: 115,
            totalMonthly: 1139,
            isPopular: true,
        },
    });
    const cityHamburg = await prisma.city.create({
        data: {
            countryId: germany.id,
            name: 'Hamburg',
            state: 'Hamburg',
            avgRent: 580,
            avgFood: 235,
            avgTransport: 49,
            avgUtilities: 100,
            avgInternet: 28,
            avgEntertainment: 105,
            totalMonthly: 1097,
            isPopular: true,
        },
    });
    // Create Universities
    const tum = await prisma.university.create({
        data: {
            countryId: germany.id,
            cityId: cityMunich.id,
            name: 'Technical University of Munich (TUM)',
            slug: 'technical-university-of-munich',
            type: 'Public',
            qsRanking: 28,
            cityName: 'Munich',
            logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&auto=format&fit=crop&q=80',
            coverUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
            semesterFee: '€150 - €1,500 / semester (Non-EU tuition applies for some programs)',
            tuitionFee: '€0 - €6,000 / year',
            hasEnglishPrograms: true,
            officialWebsite: 'https://www.tum.de/en/',
            admissionReqSummary: 'Bachelor degree with top GPA, IELTS 6.5+ or TOEFL 88+, GRE required for CSE & Data Science.',
            degrees: 'Bachelor, Master, PhD',
            description: 'Germany’s top-ranked technical university, known as the "Entrepreneurial University" with close ties to BMW, Siemens, and SAP.',
        },
    });
    const lmu = await prisma.university.create({
        data: {
            countryId: germany.id,
            cityId: cityMunich.id,
            name: 'Ludwig Maximilian University of Munich (LMU)',
            slug: 'lmu-munich',
            type: 'Public',
            qsRanking: 54,
            cityName: 'Munich',
            logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&auto=format&fit=crop&q=80',
            coverUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
            semesterFee: '€152 / semester',
            tuitionFee: '€0 (Tuition Free)',
            hasEnglishPrograms: true,
            officialWebsite: 'https://www.lmu.de/en/',
            admissionReqSummary: 'High academic standing, IELTS 7.0 for English Master, APS certificate for Indian students.',
            degrees: 'Bachelor, Master, PhD',
            description: 'One of Europe’s premier research institutions with over 500 years of academic distinction across Medicine, Natural Sciences, and Humanities.',
        },
    });
    const rwth = await prisma.university.create({
        data: {
            countryId: germany.id,
            cityId: cityAachen.id,
            name: 'RWTH Aachen University',
            slug: 'rwth-aachen-university',
            type: 'Public',
            qsRanking: 99,
            cityName: 'Aachen',
            logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80',
            coverUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
            semesterFee: '€315 / semester (Includes NRW Semester Ticket)',
            tuitionFee: '€0 (Tuition Free)',
            hasEnglishPrograms: true,
            officialWebsite: 'https://www.rwth-aachen.de/cms/~a/ROOT/l/en/',
            admissionReqSummary: 'Strong technical credit alignment (Subject matching 100%), GRE General recommended.',
            degrees: 'Bachelor, Master, PhD',
            description: 'Largest technical university in Germany and part of the TU9 alliance. Renowned worldwide for Mechanical, Automotive, and Electrical Engineering.',
        },
    });
    const tuBerlin = await prisma.university.create({
        data: {
            countryId: germany.id,
            cityId: cityBerlin.id,
            name: 'Technical University of Berlin (TU Berlin)',
            slug: 'tu-berlin',
            type: 'Public',
            qsRanking: 154,
            cityName: 'Berlin',
            logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&auto=format&fit=crop&q=80',
            coverUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
            semesterFee: '€308 / semester',
            tuitionFee: '€0 (Tuition Free)',
            hasEnglishPrograms: true,
            officialWebsite: 'https://www.tu.berlin/en/',
            admissionReqSummary: 'Bachelor degree in relevant domain, IELTS 6.5+, Uni-Assist VPD requirement.',
            degrees: 'Bachelor, Master, PhD',
            description: 'Member of TU9 situated in the vibrant capital of Germany, offering cutting-edge programs in CS, AI, and Urban Planning.',
        },
    });
    const kit = await prisma.university.create({
        data: {
            countryId: germany.id,
            cityId: cityKarlsruhe.id,
            name: 'Karlsruhe Institute of Technology (KIT)',
            slug: 'kit-karlsruhe',
            type: 'Public',
            qsRanking: 102,
            cityName: 'Karlsruhe',
            logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&auto=format&fit=crop&q=80',
            coverUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
            semesterFee: '€1,500 / semester (Baden-Württemberg State Tuition Fee)',
            tuitionFee: '€3,000 / year',
            hasEnglishPrograms: true,
            officialWebsite: 'https://www.kit.edu/english/',
            admissionReqSummary: 'High math & physics aptitude, German B2 or IELTS 6.5 depending on track.',
            degrees: 'Bachelor, Master, PhD',
            description: 'The Research University in the Helmholtz Association, globally renowned for Energy Tech, Computer Science, and Engineering.',
        },
    });
    const humboldt = await prisma.university.create({
        data: {
            countryId: germany.id,
            cityId: cityBerlin.id,
            name: 'Humboldt University of Berlin',
            slug: 'humboldt-university-berlin',
            type: 'Public',
            qsRanking: 126,
            cityName: 'Berlin',
            logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&auto=format&fit=crop&q=80',
            coverUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
            semesterFee: '€315 / semester',
            tuitionFee: '€0 (Tuition Free)',
            hasEnglishPrograms: true,
            officialWebsite: 'https://www.hu-berlin.de/en',
            admissionReqSummary: 'Strong academic record, statement of purpose, English proficiency C1 for social sciences.',
            degrees: 'Bachelor, Master, PhD',
            description: 'Alma mater of Albert Einstein and Max Planck, leading world research in Economics, Life Sciences, and Philosophy.',
        },
    });
    // Admission Requirements per level
    await prisma.admissionRequirement.createMany({
        data: [
            {
                countryId: germany.id,
                universityId: tum.id,
                degreeLevel: 'Master',
                academicReq: '4-year Bachelor degree (B.Tech / B.E / B.Sc) from H+ recognized university on Anabin database.',
                minCGPA: '7.5 / 10 (or 2.5 on German Grading Scale)',
                ieltsScore: '6.5 overall (Min 6.0 in each section)',
                toeflScore: '88 iBT',
                germanReq: 'A1/A2 recommended for living; C1 required for German-taught modules.',
                apsRequired: true,
                greGmatReq: 'GRE required for Computer Science (Quant score >= 164, Verbal >= 150).',
                portfolioReq: 'Required for Architecture & Design programs.',
                experienceReq: 'Work experience appreciated but not mandatory unless specified by department.',
                notes: 'Stage 1 Aptitude Assessment evaluates CGPA & Credit match. Stage 2 includes interview if required.',
            },
            {
                countryId: germany.id,
                universityId: tum.id,
                degreeLevel: 'Bachelor',
                academicReq: '12th Grade Higher Secondary Certificate + Studienkolleg (Feststellungsprüfung) OR 1 year of recognized Indian University degree.',
                minCGPA: '85% in 12th Board Exams (CBSE/ISC)',
                ieltsScore: '6.5',
                toeflScore: '80',
                germanReq: 'B2 / C1 TestDaF mandatory for most Bachelor tracks.',
                apsRequired: true,
                greGmatReq: 'Not applicable',
                portfolioReq: 'Not applicable',
                experienceReq: 'None',
                notes: 'Indian students completing JEE Advanced score can skip Studienkolleg directly.',
            },
            {
                countryId: germany.id,
                universityId: rwth.id,
                degreeLevel: 'Master',
                academicReq: 'Bachelor degree in Mechanical/Electrical/CS with matching course credits matching RWTH curriculum.',
                minCGPA: '7.0 / 10 (German Grade 2.7 or better)',
                ieltsScore: '6.5',
                toeflScore: '90',
                germanReq: 'Not required for 100% English taught M.Sc.',
                apsRequired: true,
                greGmatReq: 'GRE General test mandatory for Non-EU applicants.',
                portfolioReq: 'None',
                experienceReq: 'Not mandatory.',
                notes: 'RWTH is very strict regarding syllabus credit match. Download their subject catalog before applying.',
            },
            {
                countryId: germany.id,
                degreeLevel: 'PhD',
                academicReq: 'Master degree (M.Tech/M.Sc/M.A) with thesis publication capability.',
                minCGPA: '8.0 / 10',
                ieltsScore: '7.0',
                toeflScore: '95',
                germanReq: 'A1 basic German',
                apsRequired: true,
                greGmatReq: 'Optional',
                portfolioReq: 'Research Proposal (15-20 pages)',
                experienceReq: 'Prior published research papers highly preferred.',
                notes: 'Direct supervisor agreement (Doctoral Advisor) is required prior to formal enrollment.',
            },
        ],
    });
    // Document Checklist Items
    await prisma.documentItem.createMany({
        data: [
            {
                countryId: germany.id,
                title: 'Valid Passport',
                category: 'General',
                description: 'Original passport with at least 12 months validity remaining beyond intended stay and 2 blank pages.',
                purpose: 'Identity verification for APS, Uni-Assist, University enrollment, and Embassy Visa application.',
                commonMistakes: 'Expired passport, incorrect surname order matching transcripts, damaged pages.',
                isMandatory: true,
                stage: 'APS',
            },
            {
                countryId: germany.id,
                title: 'Academic Transcripts & Mark Sheets',
                category: 'Academic',
                description: 'Official consolidated semester marksheets and transcripts issued by university registrar.',
                purpose: 'Academic evaluation by APS and University Admissions.',
                commonMistakes: 'Submitting unofficial web portal screenshots instead of sealed university transcripts.',
                isMandatory: true,
                stage: 'APS',
            },
            {
                countryId: germany.id,
                title: 'Bachelor / School Degree Certificate',
                category: 'Academic',
                description: 'Original Degree Certificate or Provisional Passing Certificate.',
                purpose: 'Proof of degree completion.',
                commonMistakes: 'Submitting course completion letter without degree certificate.',
                isMandatory: true,
                stage: 'APS',
            },
            {
                countryId: germany.id,
                title: 'APS Certificate (Akademische Prüfstelle)',
                category: 'Academic',
                description: 'Verification certificate confirming authenticity of Indian academic documents.',
                purpose: 'Mandatory prerequisite for student visa application at German embassies in India.',
                commonMistakes: 'Delaying application. APS processing takes 4-8 weeks.',
                isMandatory: true,
                stage: 'Visa',
            },
            {
                countryId: germany.id,
                title: 'Curriculum Vitae (Tabular CV)',
                category: 'Academic',
                description: 'European format (Europass style) chronological CV without gaps.',
                purpose: 'Evaluation of work experience, projects, and academic background.',
                commonMistakes: 'Unexplained gaps in education/career, multi-page non-standard format.',
                isMandatory: true,
                stage: 'University Application',
            },
            {
                countryId: germany.id,
                title: 'Statement of Purpose (SOP / Letter of Motivation)',
                category: 'Academic',
                description: '1-2 page tailored letter explaining why you chose this program, university, and Germany.',
                purpose: 'Evaluating student interest, ambition, and academic alignment.',
                commonMistakes: 'Generic SOP reused for multiple universities without customization.',
                isMandatory: true,
                stage: 'University Application',
            },
            {
                countryId: germany.id,
                title: 'Letters of Recommendation (LOR)',
                category: 'Academic',
                description: '2 Letters signed on official university letterhead by professors/advisors.',
                purpose: 'Academic appraisal of candidate capability.',
                commonMistakes: 'Missing official letterhead, official stamp, or academic email ID.',
                isMandatory: true,
                stage: 'University Application',
            },
            {
                countryId: germany.id,
                title: 'English Language Score Card (IELTS / TOEFL)',
                category: 'Academic',
                description: 'Official score card (IELTS Academic 6.5+ or TOEFL iBT 88+).',
                purpose: 'Proof of English language proficiency.',
                commonMistakes: 'Submitting IELTS General instead of IELTS Academic.',
                isMandatory: true,
                stage: 'University Application',
            },
            {
                countryId: germany.id,
                title: 'Blocked Account Confirmation (Sperrkonto)',
                category: 'Financial',
                description: 'Official confirmation letter from Fintiba, Expatrio, or Coracle showing €11,904 deposited.',
                purpose: 'Proof of financial means to support yourself for 1 year in Germany.',
                commonMistakes: 'Transferring incorrect buffer amount or late transfer before visa interview.',
                isMandatory: true,
                stage: 'Visa',
            },
            {
                countryId: germany.id,
                title: 'Health Insurance Certificate (Incoming + Public/Private)',
                category: 'Visa',
                description: 'Incoming travel insurance cover + official German health insurance confirmation (TK/Expatrio).',
                purpose: 'Medical coverage required for visa issuance and university enrollment.',
                commonMistakes: 'Non-compliant insurance provider not recognized by German embassy.',
                isMandatory: true,
                stage: 'Visa',
            },
        ],
    });
    // APS Guide
    await prisma.aPSGuide.create({
        data: {
            countryId: germany.id,
            title: 'Complete APS Certificate Guide for Germany',
            eligibility: 'All Indian nationals with degrees/diplomas from recognized Indian boards and universities applying for higher education in Germany.',
            requiredDocsJson: JSON.stringify([
                'Printed and signed APS application form',
                'Copy of Aadhaar Card linked with mobile number',
                'Copy of valid Passport (first and last page)',
                'Class 10th Marksheet & Certificate',
                'Class 12th Marksheet & Certificate',
                'Bachelor Marksheets (All semesters)',
                'Bachelor Degree / Provisional Certificate',
                'Language Proficiency Certificate (IELTS/TOEFL/TestDaF)',
                'Bank Payment Receipt of ₹18,000 APS Fee',
                'University Professor Email & Student Portal Credentials for verification',
            ]),
            feeAmount: '18,000',
            feeCurrency: 'INR',
            timelineWeeks: '4 - 8 weeks',
            trackingUrl: 'https://aps-india.de/',
            officialPortalUrl: 'https://aps-india.de/',
            applicationStepsJson: JSON.stringify([
                'Register online on the official APS India portal (aps-india.de).',
                'Fill in personal details, educational qualifications, and university info.',
                'Pay the processing fee of ₹18,000 via online bank transfer to APS India account.',
                'Gather all required documents and self-attest copies.',
                'Courier the printed application form + document dossier to APS Office in New Delhi.',
                'APS team verifies credentials with your Indian university via email or portal.',
                'Upon successful verification, digital APS Certificate is issued via email.',
            ]),
            faqsJson: JSON.stringify([
                {
                    q: 'Is APS mandatory for all Indian students?',
                    a: 'Yes, starting November 1, 2022, APS is mandatory for all Indian students applying for a German student visa.',
                },
                {
                    q: 'Does APS certificate expire?',
                    a: 'No, your APS certificate is valid indefinitely as long as your academic credentials remain unchanged.',
                },
                {
                    q: 'What if my Indian university does not respond to APS email?',
                    a: 'Provide student login credentials (portal URL, enrollment number, password) in your application so APS can verify directly.',
                },
            ]),
        },
    });
    // Visa Info
    await prisma.visaInfo.create({
        data: {
            countryId: germany.id,
            visaType: 'National Student Visa (Category D)',
            feeAmount: '€75 (~₹6,800)',
            processingTimeWeeks: '4 - 8 weeks',
            biometricsInfo: 'Mandatory biometrics (fingerprints & digital photo) taken at VFS Global center.',
            embassyPortalUrl: 'https://india.diplo.de/in-en/service/-/2552164',
            stepsJson: JSON.stringify([
                'Receive official University Admission Letter (Zulassungsbescheid).',
                'Obtain digital APS Certificate.',
                'Open Blocked Account (Sperrkonto) and deposit €11,904.',
                'Obtain compliant Health Insurance confirmation.',
                'Book VFS Global appointment for German Student Visa category.',
                'Prepare visa application form VIDEX and dossier with 2 identical document sets.',
                'Attend VFS appointment for biometric capture and submission.',
                'Track passport via VFS portal until stamped visa passport delivery.',
            ]),
            requiredDocsJson: JSON.stringify([
                'Valid Passport + 2 photocopies',
                '2 Completed VIDEX application forms signed',
                '3 Biometric passport photographs (35mm x 45mm, white background)',
                'University Admission Letter / Offer Letter',
                'APS Certificate (Original)',
                'Proof of Blocked Account (€11,904 confirmation)',
                'Proof of Health Insurance',
                'Curriculum Vitae (CV) & Motivation Letter',
                'Academic Marksheets & Degree Certificates',
                'Proof of English/German Language Proficiency',
            ]),
            rejectionReasonsJson: JSON.stringify([
                'Incomplete financial proof or unverified blocked account source.',
                'Weak or generic Motivation Letter showing lack of clear academic intent.',
                'Submitting non-APS certified academic marksheets.',
                'Mismatch between prior study background and proposed Master degree subject without justification.',
                'Lack of basic language skills required for the course.',
            ]),
        },
    });
    // Interactive Timeline Roadmap
    await prisma.timelineStep.createMany({
        data: [
            {
                countryId: germany.id,
                monthMark: '-12 Months',
                title: 'Research & Language Preparation',
                description: 'Explore DAAD course catalog, shortlist 8-10 target universities, and start IELTS/TOEFL and German language study (A1/A2).',
                actionsJson: JSON.stringify(['Browse DAAD.de database', 'Begin IELTS/TOEFL prep', 'Register for German A1 at Goethe Institute']),
                icon: 'Search',
                order: 1,
            },
            {
                countryId: germany.id,
                monthMark: '-10 Months',
                title: 'Take Language & Standardized Tests',
                description: 'Appear for IELTS Academic (Aim 6.5+) and GRE (if applying to TUM, RWTH, or top CS programs).',
                actionsJson: JSON.stringify(['Take IELTS exam', 'Order official test score reports', 'Prepare GRE if needed']),
                icon: 'Award',
                order: 2,
            },
            {
                countryId: germany.id,
                monthMark: '-8 Months',
                title: 'APS Certification Application',
                description: 'Apply for APS India certification early! Courier documents to Delhi office to avoid visa bottlenecks.',
                actionsJson: JSON.stringify(['Register on aps-india.de', 'Pay ₹18,000 fee', 'Send physical document bundle']),
                icon: 'FileCheck',
                order: 3,
            },
            {
                countryId: germany.id,
                monthMark: '-6 Months',
                title: 'Uni-Assist & University Applications',
                description: 'Submit applications via Uni-Assist portal or university direct portals before July 15 (Winter) / Jan 15 (Summer).',
                actionsJson: JSON.stringify(['Create Uni-Assist account', 'Upload SOP, LOR, and transcripts', 'Pay Uni-Assist evaluation fees']),
                icon: 'Send',
                order: 4,
            },
            {
                countryId: germany.id,
                monthMark: '-4 Months',
                title: 'Admission Offer & Blocked Account',
                description: 'Receive admission letter (Zulassungsbescheid). Immediately open Blocked Account (Expatrio/Fintiba) and transfer €11,904.',
                actionsJson: JSON.stringify(['Accept university offer', 'Open Expatrio/Fintiba account', 'Transfer blocked funds & buffer']),
                icon: 'Landmark',
                order: 5,
            },
            {
                countryId: germany.id,
                monthMark: '-3 Months',
                title: 'Health Insurance & Visa Appointment',
                description: 'Set up German health insurance (TK/Barmer) and book VFS Student Visa appointment slot.',
                actionsJson: JSON.stringify(['Activate TK Health Insurance package', 'Book VFS appointment', 'Fill VIDEX online visa form']),
                icon: 'ShieldCheck',
                order: 6,
            },
            {
                countryId: germany.id,
                monthMark: '-2 Months',
                title: 'Visa Interview & Accommodation Search',
                description: 'Attend VFS biometric appointment. Start hunting for student dorms (Studierendenwerk) and WG shared flats on WG-Gesucht.',
                actionsJson: JSON.stringify(['Attend VFS visa appointment', 'Apply to Studierendenwerk dorm queue', 'Search WG-Gesucht.de']),
                icon: 'Home',
                order: 7,
            },
            {
                countryId: germany.id,
                monthMark: '-1 Month',
                title: 'Flight Booking & Preparation',
                description: 'Receive stamped visa passport, book student flight ticket (with extra luggage allowance), and pack essential documents.',
                actionsJson: JSON.stringify(['Book one-way flight ticket', 'Exchange EUR cash (€500-1000)', 'Pack forex card & document originals']),
                icon: 'Plane',
                order: 8,
            },
            {
                countryId: germany.id,
                monthMark: '0 Month (Arrival)',
                title: 'Welcome to Germany!',
                description: 'Complete City Registration (Anmeldung), activate bank account payout, and complete University Enrollment (Immatrikulation).',
                actionsJson: JSON.stringify(['Complete City Registration (Anmeldung)', 'Activate local bank account payout', 'Attend Orientation Week']),
                icon: 'MapPin',
                order: 9,
            },
        ],
    });
    // Scholarships
    await prisma.scholarship.createMany({
        data: [
            {
                countryId: germany.id,
                title: 'DAAD Development-Related Postgraduate Courses (EPOS)',
                providerType: 'DAAD',
                fundingAmount: '€934 / month + Travel Stipend + Health Insurance',
                degreeLevel: 'Master, PhD',
                deadline: 'August - October (Annual)',
                eligibility: 'Applicants from developing countries with at least 2 years professional work experience.',
                officialWebsite: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
                description: 'Full funding for postgraduate courses in engineering, environmental sciences, governance, and public health.',
            },
            {
                countryId: germany.id,
                title: 'Deutschlandstipendium (National Scholarship Programme)',
                providerType: 'Government',
                fundingAmount: '€300 / month (Co-funded by German Federal Govt & Industry)',
                degreeLevel: 'Bachelor, Master',
                deadline: 'Varies by University (July - September)',
                eligibility: 'High academic achievers registered at participating German universities regardless of nationality.',
                officialWebsite: 'https://www.deutschlandstipendium.de/',
                description: 'Merit-based scholarship awarded directly by universities based on GPA, social commitment, and personal background.',
            },
            {
                countryId: germany.id,
                title: 'Heinrich Böll Foundation Scholarships',
                providerType: 'Private',
                fundingAmount: '€934 / month + Individual Allowances',
                degreeLevel: 'Master, PhD',
                deadline: 'March 1 & September 1',
                eligibility: 'Students with outstanding academic records who embody green political values, ecology, and human rights.',
                officialWebsite: 'https://www.boell.de/en/scholarships',
                description: 'Awards around 1,400 scholarships per year to international postgraduate students studying in Germany.',
            },
            {
                countryId: germany.id,
                title: 'Konrad-Adenauer-Stiftung (KAS) Scholarship',
                providerType: 'Private',
                fundingAmount: '€861 / month for Masters, €1,200 for PhD',
                degreeLevel: 'Master, PhD',
                deadline: 'July 15',
                eligibility: 'Under 30 years old, strong academic performance, active voluntary work, German B2 proficiency.',
                officialWebsite: 'https://www.kas.de/en/web/begabtenfoerderung-und-kultur/auslaenderfoerderung',
                description: 'Aimed at international students committed to democracy, civic engagement, and international dialogue.',
            },
            {
                countryId: germany.id,
                title: 'Erasmus+ Joint Master Degrees',
                providerType: 'University',
                fundingAmount: '€1,400 / month + Full Tuition Coverage + Travel Allowance',
                degreeLevel: 'Master',
                deadline: 'January - March',
                eligibility: 'Global applicants holding relevant Bachelor degree.',
                officialWebsite: 'https://ec.europa.eu/programmes/erasmus-plus/',
                description: 'Prestigious EU mobility scholarship allowing students to study across 2 to 3 European universities including Germany.',
            },
        ],
    });
    // Living Costs City Breakdown
    await prisma.livingCostCity.createMany({
        data: [
            {
                countryId: germany.id,
                cityName: 'Munich',
                rent: 650,
                food: 250,
                transport: 49,
                utilities: 110,
                internet: 30,
                entertainment: 120,
                monthlyTotal: 1209,
                description: 'Highest cost of living in Germany, compensated by high concentrations of tech industry jobs and BMW/Siemens headquarters.',
            },
            {
                countryId: germany.id,
                cityName: 'Berlin',
                rent: 550,
                food: 230,
                transport: 49,
                utilities: 95,
                internet: 28,
                entertainment: 110,
                monthlyTotal: 1062,
                description: 'Vibrant startup capital with diverse cultural scene. Housing market is competitive but overall living cost is moderate.',
            },
            {
                countryId: germany.id,
                cityName: 'Aachen',
                rent: 420,
                food: 200,
                transport: 0,
                utilities: 85,
                internet: 25,
                entertainment: 80,
                monthlyTotal: 810,
                description: 'Extremely student-friendly town near Dutch/Belgian border. Semester ticket covers state-wide transit for free.',
            },
            {
                countryId: germany.id,
                cityName: 'Karlsruhe',
                rent: 450,
                food: 210,
                transport: 0,
                utilities: 90,
                internet: 25,
                entertainment: 85,
                monthlyTotal: 860,
                description: 'Sunny technology hub with moderate rents and great campus lifestyle around KIT.',
            },
        ],
    });
    // Accommodation Options
    await prisma.accommodationOption.createMany({
        data: [
            {
                countryId: germany.id,
                type: 'Student Dorm (Studierendenwerk)',
                avgCostRange: '€230 - €400 / month (Utilities included)',
                depositRequired: '1 - 2 months rent (€300 - €600)',
                bookingPortals: 'Official Studierendenwerk website of your university city',
                tips: 'Apply to the dorm waiting list immediately upon receiving university application confirmation. Waiting time can be 3-12 months!',
                pros: 'Cheapest option, fully furnished, fast internet included, close to campus, easy social integration.',
                cons: 'Long waiting lists in Munich, Berlin, and Frankfurt.',
            },
            {
                countryId: germany.id,
                type: 'WG (Wohngemeinschaft - Shared Flat)',
                avgCostRange: '€350 - €650 / month',
                depositRequired: '2 - 3 months warm rent',
                bookingPortals: 'WG-Gesucht.de, Kleinanzeigen.de, Student-WG.de',
                tips: 'Write personalized messages in German/English introducing your lifestyle, habits, and background to flatmates.',
                pros: 'Most popular option for social life, flexible location, immediate availability.',
                cons: 'Casting interviews (WG-Casting) can be competitive.',
            },
            {
                countryId: germany.id,
                type: 'Private Apartment (Einzelwohnung)',
                avgCostRange: '€600 - €1,200 / month',
                depositRequired: '3 months cold rent',
                bookingPortals: 'Immobilienscout24.de, Immonet.de, HousingAnywhere',
                tips: 'Ensure landlord provides "Wohnungsgeberbestätigung" document required for city registration (Anmeldung).',
                pros: 'Complete privacy, quiet study environment.',
                cons: 'Expensive, often unfurnished (no kitchen/lights), requires SCHUFA credit check.',
            },
        ],
    });
    // Part-Time Jobs
    await prisma.partTimeJobInfo.create({
        data: {
            countryId: germany.id,
            allowedHours: '140 full days OR 280 half days per calendar year (Increased from 120/240 in March 2024)',
            minWage: '€12.41 / hour (Legal statutory minimum wage)',
            miniJobCap: '€538 / month (Tax-free and social security exempt limit)',
            taxRules: 'Mini-jobs under €538/month are tax-free. Earnings above €538 require tax class 1 registration, but income tax is refunded via annual tax return.',
            popularJobsJson: JSON.stringify([
                'Working Student (Werkstudent in IT/Engineering): €14 - €22/hour',
                'Research / Teaching Assistant (HiWi at University): €13 - €16/hour',
                'English Tutor / Academic Coach: €15 - €25/hour',
                'Supermarket Cashier / Retail Assistant (Lidl, Aldi): €13 - €15/hour',
                'Delivery Rider (Flink, Lieferando): €13 - €16/hour',
                'Event & Catering Staff: €13 - €15/hour',
            ]),
            semesterRules: 'Maximum 20 hours per week during active semester to maintain student social security status.',
            holidayRules: 'Full-time work (40 hours/week) is allowed during official semester break (Vorlesungsfreie Zeit).',
            jobPortalsJson: JSON.stringify([
                'Zenjob App (Instant flexible student shifts)',
                'StepStone.de (Werkstudent filters)',
                'Indeed Germany',
                'Linkedin Student Jobs',
                'University Career Center Board',
            ]),
        },
    });
    // Health Insurance
    await prisma.insuranceOption.createMany({
        data: [
            {
                countryId: germany.id,
                type: 'Public',
                providerName: 'Techniker Krankenkasse (TK)',
                monthlyCost: '~€125 - €130 / month',
                requirements: 'Mandatory for students under 30 years old enrolled in degree programs.',
                coverageDetails: '100% full coverage for doctor visits, hospital stays, prescription medications, basic dental, and mental health.',
                pros: 'Voted #1 health insurance in Germany, English support app, direct billing with clinics.',
                cons: 'Slightly higher monthly premium than private alternative.',
                recommendedFor: 'All degree students under 30 looking for comprehensive hassle-free coverage.',
            },
            {
                countryId: germany.id,
                type: 'Public',
                providerName: 'Barmer / AOK',
                monthlyCost: '~€125 - €130 / month',
                requirements: 'Mandatory for students under 30 years old.',
                coverageDetails: 'Comprehensive statutory medical, preventive screenings, and emergency transport.',
                pros: 'Extensive branch network across every university campus in Germany.',
                cons: 'Slightly slower digital app experience than TK.',
                recommendedFor: 'Students who prefer local physical service branches.',
            },
            {
                countryId: germany.id,
                type: 'Private',
                providerName: 'Mawista / Educare24 / Expatrio Plus',
                monthlyCost: '~€35 - €70 / month',
                requirements: 'For Studienkolleg, language course students, or students over 30 years old.',
                coverageDetails: 'Basic emergency medical treatment and acute illness care.',
                pros: 'Very cheap monthly premium.',
                cons: 'Does not cover pre-existing conditions, routine checkups, or dental; requires upfront payment with manual claim reimbursement.',
                recommendedFor: 'Preparatory course students (Studienkolleg) prior to university matriculation.',
            },
        ],
    });
    // Official Resources
    await prisma.officialResource.createMany({
        data: [
            {
                countryId: germany.id,
                title: 'DAAD (German Academic Exchange Service)',
                category: 'University',
                url: 'https://www.daad.de/en/',
                description: 'Official database of all English-taught Bachelor and Master programs in Germany.',
                badgeText: 'Official Portal',
            },
            {
                countryId: germany.id,
                title: 'APS India (Akademische Prüfstelle)',
                category: 'Embassy',
                url: 'https://aps-india.de/',
                description: 'Official verification gatekeeper for Indian academic certificates.',
                badgeText: 'Mandatory',
            },
            {
                countryId: germany.id,
                title: 'Uni-Assist e.V.',
                category: 'University',
                url: 'https://www.uni-assist.de/en/',
                description: 'Central evaluation portal processing international university applications for over 180 German universities.',
                badgeText: 'Application Portal',
            },
            {
                countryId: germany.id,
                title: 'German Embassy India (Diplo.de)',
                category: 'Visa',
                url: 'https://india.diplo.de/in-en/service/-/2552164',
                description: 'Official national visa application guidelines, embassy appointments, and checklist downloads.',
                badgeText: 'Official Embassy',
            },
            {
                countryId: germany.id,
                title: 'Make it in Germany',
                category: 'General',
                url: 'https://www.make-it-in-germany.com/en/',
                description: 'Official portal of the German Federal Government for qualified professionals and international students.',
                badgeText: 'Gov Portal',
            },
            {
                countryId: germany.id,
                title: 'WG-Gesucht Housing Portal',
                category: 'Housing',
                url: 'https://www.wg-gesucht.de/',
                description: 'Germany’s largest search portal for student shared flats (WGs) and apartments.',
                badgeText: 'Housing',
            },
        ],
    });
    // FAQs (20+ items)
    await prisma.fAQItem.createMany({
        data: [
            {
                countryId: germany.id,
                question: 'Are public universities in Germany really tuition-free?',
                answer: 'Yes! Public universities in 15 out of 16 German federal states charge €0 tuition fees for both EU and non-EU international students. You only pay a minor semester contribution (€150–€400) which includes a public transport pass. Note: Baden-Württemberg charges €1,500/semester for non-EU students.',
                category: 'Admission',
                tags: 'tuition, free, public university, fees',
            },
            {
                countryId: germany.id,
                question: 'What is a Blocked Account (Sperrkonto) and how much is required for 2024/2025?',
                answer: 'A Blocked Account is a mandatory proof of financial resources required for the German student visa. As of 2024, the required blocked amount is €11,904 per year (€992 per month). Once in Germany, €992 is released into your local checking account every month.',
                category: 'Blocked Account',
                tags: 'blocked account, sperrkonto, money, financial, visa',
            },
            {
                countryId: germany.id,
                question: 'What is the APS Certificate and is it mandatory for Indian students?',
                answer: 'Yes, the APS Certificate (issued by the Akademische Prüfstelle in New Delhi) is mandatory for all Indian students applying for a German student visa. It verifies the authenticity of your Indian educational documents.',
                category: 'APS',
                tags: 'aps, certificate, india, mandatory, verification',
            },
            {
                countryId: germany.id,
                question: 'Can I work part-time while studying in Germany?',
                answer: 'Yes! International students from non-EU countries are legally allowed to work up to 140 full days or 280 half days per calendar year. You can also work unlimited hours as a university research assistant (HiWi). Minimum wage is €12.41 per hour.',
                category: 'Jobs',
                tags: 'part-time, work, job, hours, minimum wage',
            },
            {
                countryId: germany.id,
                question: 'What is a Mini-job in Germany?',
                answer: 'A Mini-job is a employment contract where you earn up to €538 per month tax-free without paying income tax or social security contributions.',
                category: 'Jobs',
                tags: 'mini-job, tax free, 538, job',
            },
            {
                countryId: germany.id,
                question: 'Do I need to know German to study in Germany?',
                answer: 'For English-taught Master programs, German language knowledge is usually not required for admission (IELTS/TOEFL is sufficient). However, learning basic German (A1/A2) is strongly recommended for daily life, shopping, and finding part-time jobs.',
                category: 'Admission',
                tags: 'german language, ielts, english taught, requirement',
            },
            {
                countryId: germany.id,
                question: 'What is Uni-Assist?',
                answer: 'Uni-Assist is a centralized organization that evaluates international school certificates and degrees on behalf of around 180 German universities to convert your grades to the German grading scale.',
                category: 'Admission',
                tags: 'uni-assist, evaluation, gpa, application portal',
            },
            {
                countryId: germany.id,
                question: 'What is the Post-Study Work Visa (Job Seeker Visa) in Germany?',
                answer: 'After graduating from a German university, international students can extend their residence permit for up to 18 months to search for a job related to their field of study. During these 18 months, you can work full-time in any job.',
                category: 'Visa',
                tags: 'post study, work visa, job seeker, 18 months, pr',
            },
            {
                countryId: germany.id,
                question: 'How long does it take to get Permanent Residency (PR) after graduating in Germany?',
                answer: 'Graduates of German universities can apply for Permanent Residency (Niederlassungserlaubnis) after just 2 years of working full-time and paying pension contributions in Germany (reduced from 5 years). Under the new 2024 citizenship law, naturalization is possible after 5 years (or 3 years with exceptional integration).',
                category: 'Visa',
                tags: 'pr, permanent residence, citizenship, 2 years, work permit',
            },
            {
                countryId: germany.id,
                question: 'What health insurance do I need for Germany?',
                answer: 'All university students under 30 must have German statutory public health insurance (e.g. TK, Barmer, AOK), which costs ~€125–€130/month. It provides 100% coverage for doctors, hospitals, and prescriptions.',
                category: 'Insurance',
                tags: 'health insurance, tk, barmer, public insurance, cost',
            },
        ],
    });
    console.log('✅ edunex database seeded successfully!');
}
main()
    .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
