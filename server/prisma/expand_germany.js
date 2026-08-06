"use strict";
// expand_germany.js — Adds expanded Germany data on top of the baseline seed with retry logic
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function withRetry(fn, retries = 5, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      console.log(`  ⚠️ Connection issue (${err.message.slice(0, 60)}...). Retrying in ${delayMs}ms (${i + 1}/${retries})...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

async function main() {
  console.log("🔄 Expanding Germany data on Neon PostgreSQL...");

  const germany = await withRetry(() => prisma.country.findUnique({ where: { slug: "germany" } }));
  if (!germany) throw new Error("Germany country not found. Run seed.js first.");

  // Correct minWage on Germany country record
  await withRetry(() =>
    prisma.country.update({
      where: { slug: "germany" },
      data: { minWage: "€13.90 / hour" },
    })
  );
  console.log("  ✓ Updated minWage to €13.90 / hour");

  // Update PartTimeJobInfo record
  const jobInfos = await withRetry(() => prisma.partTimeJobInfo.findMany({ where: { countryId: germany.id } }));
  for (const job of jobInfos) {
    await withRetry(() =>
      prisma.partTimeJobInfo.update({
        where: { id: job.id },
        data: {
          minWage: "€13.90 / hour (Legal statutory minimum wage as of 2026)",
          miniJobCap: "€556 / month (Tax-free and social security exempt limit)",
          taxRules: "Mini-jobs under €556/month are tax-free. Earnings above €556 require tax class 1 registration, but income tax is refunded via annual tax return.",
        },
      })
    );
  }
  console.log("  ✓ Updated PartTimeJobInfo to €13.90/hr minWage and €556/mo miniJobCap");

  // ─── Extra Cities ──────────────────────────────────────────────────────────
  const existingCities = await withRetry(() => prisma.city.findMany({ where: { countryId: germany.id } }));
  const existingCityNames = existingCities.map((c) => c.name);

  const newCities = [
    { name: "Stuttgart", state: "Baden-Wuerttemberg", avgRent: 580, avgFood: 230, avgTransport: 0, avgUtilities: 100, avgInternet: 28, avgEntertainment: 100, totalMonthly: 1038, isPopular: true },
    { name: "Heidelberg", state: "Baden-Wuerttemberg", avgRent: 490, avgFood: 200, avgTransport: 0, avgUtilities: 90, avgInternet: 26, avgEntertainment: 85, totalMonthly: 891, isPopular: true },
    { name: "Cologne", state: "North Rhine-Westphalia", avgRent: 520, avgFood: 220, avgTransport: 49, avgUtilities: 95, avgInternet: 28, avgEntertainment: 95, totalMonthly: 1007, isPopular: true },
    { name: "Dusseldorf", state: "North Rhine-Westphalia", avgRent: 560, avgFood: 230, avgTransport: 49, avgUtilities: 98, avgInternet: 28, avgEntertainment: 100, totalMonthly: 1065, isPopular: false },
    { name: "Leipzig", state: "Saxony", avgRent: 380, avgFood: 190, avgTransport: 49, avgUtilities: 80, avgInternet: 25, avgEntertainment: 75, totalMonthly: 799, isPopular: true },
    { name: "Gottingen", state: "Lower Saxony", avgRent: 380, avgFood: 190, avgTransport: 0, avgUtilities: 78, avgInternet: 24, avgEntertainment: 70, totalMonthly: 742, isPopular: false },
    { name: "Dresden", state: "Saxony", avgRent: 390, avgFood: 195, avgTransport: 49, avgUtilities: 82, avgInternet: 25, avgEntertainment: 75, totalMonthly: 816, isPopular: true },
    { name: "Mannheim", state: "Baden-Wuerttemberg", avgRent: 470, avgFood: 205, avgTransport: 0, avgUtilities: 88, avgInternet: 26, avgEntertainment: 80, totalMonthly: 869, isPopular: false },
  ];

  const createdCities = {};
  for (const city of newCities) {
    if (!existingCityNames.includes(city.name)) {
      const created = await withRetry(() => prisma.city.create({ data: { countryId: germany.id, ...city } }));
      createdCities[city.name] = created.id;
      console.log("  ✓ Created city:", city.name);
    } else {
      const existing = existingCities.find((c) => c.name === city.name);
      createdCities[city.name] = existing.id;
    }
  }

  // Get existing Berlin/Frankfurt/Hamburg city IDs
  const berlinCity = existingCities.find((c) => c.name === "Berlin");
  const frankfurtCity = existingCities.find((c) => c.name === "Frankfurt");
  const hamburgCity = existingCities.find((c) => c.name === "Hamburg");

  // ─── Extra Universities ────────────────────────────────────────────────────
  const existingUnis = await withRetry(() => prisma.university.findMany({ where: { countryId: germany.id } }));
  const existingSlugs = existingUnis.map((u) => u.slug);

  const newUniversities = [
    {
      slug: "freie-universitaet-berlin",
      cityId: berlinCity ? berlinCity.id : null,
      name: "Freie Universitaet Berlin (FU Berlin)",
      type: "Public",
      qsRanking: 98,
      cityName: "Berlin",
      logoUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80",
      semesterFee: "€311 / semester",
      tuitionFee: "€0 (Tuition Free)",
      hasEnglishPrograms: true,
      officialWebsite: "https://www.fu-berlin.de/en/",
      admissionReqSummary: "Strong academic record, C1 English for English programs, APS required for Indian students.",
      degrees: "Bachelor, Master, PhD",
      description: "One of Germany's top liberal arts universities. QS #98 globally, with excellence in Political Science, Law, and Life Sciences.",
    },
    {
      slug: "heidelberg-university",
      cityId: createdCities["Heidelberg"] || null,
      name: "Heidelberg University (Ruprecht-Karls-Universitaet)",
      type: "Public",
      qsRanking: 87,
      cityName: "Heidelberg",
      logoUrl: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&auto=format&fit=crop&q=80",
      semesterFee: "€1,500 / semester (Non-EU BW state fee)",
      tuitionFee: "€3,000 / year",
      hasEnglishPrograms: true,
      officialWebsite: "https://www.uni-heidelberg.de/en/",
      admissionReqSummary: "Exceptional academic record (top 10%), APS certificate, IELTS 7.0 for English programs.",
      degrees: "Bachelor, Master, PhD",
      description: "Germany's oldest university (founded 1386), ranked #87 globally. World-renowned for Medicine, Life Sciences, and Law.",
    },
    {
      slug: "university-of-stuttgart",
      cityId: createdCities["Stuttgart"] || null,
      name: "University of Stuttgart",
      type: "Public",
      qsRanking: 368,
      cityName: "Stuttgart",
      logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80",
      semesterFee: "€1,500 / semester (Non-EU BW fee)",
      tuitionFee: "€3,000 / year",
      hasEnglishPrograms: true,
      officialWebsite: "https://www.uni-stuttgart.de/en/",
      admissionReqSummary: "Strong engineering background, IELTS 6.5 or German B2, subject credit match required.",
      degrees: "Bachelor, Master, PhD",
      description: "A TU9 member and leading engineering university based in the automotive heartland of Germany, home to Mercedes-Benz and Porsche HQs.",
    },
    {
      slug: "goethe-university-frankfurt",
      cityId: frankfurtCity ? frankfurtCity.id : null,
      name: "Goethe University Frankfurt",
      type: "Public",
      qsRanking: 310,
      cityName: "Frankfurt",
      logoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80",
      semesterFee: "€315 / semester",
      tuitionFee: "€0 (Tuition Free)",
      hasEnglishPrograms: true,
      officialWebsite: "https://www.goethe-university-frankfurt.de/en/",
      admissionReqSummary: "Bachelor degree in relevant field, IELTS 6.5+, APS certificate, Uni-Assist VPD.",
      degrees: "Bachelor, Master, PhD",
      description: "A civic university in Germany's financial capital. Acclaimed for Finance, Economics, and Neuroscience research.",
    },
    {
      slug: "university-of-hamburg",
      cityId: hamburgCity ? hamburgCity.id : null,
      name: "University of Hamburg",
      type: "Public",
      qsRanking: 276,
      cityName: "Hamburg",
      logoUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80",
      semesterFee: "€345 / semester",
      tuitionFee: "€0 (Tuition Free)",
      hasEnglishPrograms: true,
      officialWebsite: "https://www.uni-hamburg.de/en.html",
      admissionReqSummary: "Bachelor in relevant discipline, IELTS 6.5, APS certificate required.",
      degrees: "Bachelor, Master, PhD",
      description: "North Germany's largest university with a strong focus on Earth Sciences, Meteorology, and International Law.",
    },
    {
      slug: "university-of-cologne",
      cityId: createdCities["Cologne"] || null,
      name: "University of Cologne (Universitaet zu Koeln)",
      type: "Public",
      qsRanking: 215,
      cityName: "Cologne",
      logoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80",
      semesterFee: "€293 / semester",
      tuitionFee: "€0 (Tuition Free)",
      hasEnglishPrograms: true,
      officialWebsite: "https://portal.uni-koeln.de/en/",
      admissionReqSummary: "Bachelor in related field, IELTS 6.5, APS certificate, Uni-Assist evaluation.",
      degrees: "Bachelor, Master, PhD",
      description: "One of Germany's largest universities with over 52,000 students, renowned for Management, Social Sciences, and Law.",
    },
    {
      slug: "university-of-gottingen",
      cityId: createdCities["Gottingen"] || null,
      name: "University of Goettingen (Georg-August-Universitaet)",
      type: "Public",
      qsRanking: 296,
      cityName: "Gottingen",
      logoUrl: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&auto=format&fit=crop&q=80",
      semesterFee: "€380 / semester",
      tuitionFee: "€0 (Tuition Free)",
      hasEnglishPrograms: true,
      officialWebsite: "https://www.uni-goettingen.de/en/",
      admissionReqSummary: "Strong academic credentials, IELTS 6.5, APS required.",
      degrees: "Bachelor, Master, PhD",
      description: "A historic research university in Lower Saxony with 47 Nobel Prize-winning alumni, strong in Natural Sciences and Agriculture.",
    },
    {
      slug: "tu-dresden-technische",
      cityId: createdCities["Dresden"] || null,
      name: "TU Dresden (Technische Universitaet Dresden)",
      type: "Public",
      qsRanking: 267,
      cityName: "Dresden",
      logoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80",
      semesterFee: "€258 / semester",
      tuitionFee: "€0 (Tuition Free)",
      hasEnglishPrograms: true,
      officialWebsite: "https://tu-dresden.de/en/",
      admissionReqSummary: "Relevant Bachelor degree, IELTS 6.5 or German B2, APS certificate for Indian applicants.",
      degrees: "Bachelor, Master, PhD",
      description: "A TU9 member and one of Germany's top 10 technical universities, excelling in Mechanical Engineering, Biomedical Science, and Transport.",
    },
    {
      slug: "university-of-mannheim",
      cityId: createdCities["Mannheim"] || null,
      name: "University of Mannheim",
      type: "Public",
      qsRanking: 521,
      cityName: "Mannheim",
      logoUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&auto=format&fit=crop&q=80",
      semesterFee: "€1,500 / semester (Non-EU BW fee)",
      tuitionFee: "€3,000 / year",
      hasEnglishPrograms: true,
      officialWebsite: "https://www.uni-mannheim.de/en/",
      admissionReqSummary: "IELTS 7.0 for English programs, strong GPA in Business/Economics, GMAT recommended.",
      degrees: "Bachelor, Master, PhD",
      description: "Germany's #1 business school. Ranked among Europe's top 5 for Management and MBA. Located in a stunning baroque palace.",
    },
    {
      slug: "frankfurt-school-of-finance",
      cityId: frankfurtCity ? frankfurtCity.id : null,
      name: "Frankfurt School of Finance and Management",
      type: "Private",
      qsRanking: 355,
      cityName: "Frankfurt",
      logoUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80",
      semesterFee: "€4,000 - €8,000 / semester",
      tuitionFee: "€8,000 - €16,000 / year",
      hasEnglishPrograms: true,
      officialWebsite: "https://www.frankfurt-school.de/en/",
      admissionReqSummary: "IELTS 6.5, relevant Bachelor in Business or Finance, GMAT recommended for MBA.",
      degrees: "Bachelor, Master",
      description: "Triple-accredited (AACSB, EQUIS, AMBA) private business school in Germany's financial capital with connections to ECB and Deutsche Bank.",
    },
    {
      slug: "esmt-berlin",
      cityId: berlinCity ? berlinCity.id : null,
      name: "ESMT Berlin (European School of Management and Technology)",
      type: "Private",
      qsRanking: 471,
      cityName: "Berlin",
      logoUrl: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&auto=format&fit=crop&q=80",
      coverUrl: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&auto=format&fit=crop&q=80",
      semesterFee: "€5,000 - €9,000 / semester",
      tuitionFee: "€10,000 - €18,000 / year",
      hasEnglishPrograms: true,
      officialWebsite: "https://esmt.berlin/en",
      admissionReqSummary: "IELTS 7.0, professional experience preferred, GMAT for MBA programs.",
      degrees: "Master",
      description: "A leading European business school founded by 25 global companies (Siemens, BMW, Deutsche Post). MBA and master programs taught 100% in English.",
    },
  ];

  for (const uni of newUniversities) {
    if (!existingSlugs.includes(uni.slug)) {
      await withRetry(() => prisma.university.create({ data: { countryId: germany.id, ...uni } }));
      console.log("  ✓ Created university:", uni.name);
    } else {
      console.log("  → Skipped (exists):", uni.name);
    }
  }

  // ─── Extra Scholarships ────────────────────────────────────────────────────
  const existingScholarships = await withRetry(() => prisma.scholarship.findMany({ where: { countryId: germany.id } }));
  const existingSchTitles = existingScholarships.map((s) => s.title);

  const newScholarships = [
    {
      title: "Friedrich Ebert Foundation (FES) Scholarship",
      providerType: "Private",
      fundingAmount: "€861 / month (Master) + €1,200 / month (PhD)",
      degreeLevel: "Master, PhD",
      deadline: "January 31 & July 31 (Twice per year)",
      eligibility: "Students with exceptional academic record and commitment to social democracy, equality, and human rights. German B2 required.",
      officialWebsite: "https://www.fes.de/en/foundation/our-departments/study-grants/",
      description: "One of Germany's major political foundation scholarships. Awarded for academic excellence, social engagement, and progressive values.",
    },
    {
      title: "Rosa Luxemburg Foundation Scholarship",
      providerType: "Private",
      fundingAmount: "€861 / month (Master) + €1,200 / month (PhD)",
      degreeLevel: "Master, PhD",
      deadline: "March 1 & September 1",
      eligibility: "International students with strong academic standing, commitment to social justice and labour rights. No German language requirement for application.",
      officialWebsite: "https://www.rosalux.de/en/stiftung/studienwerk",
      description: "Supports critical-thinking scholars in social sciences, humanities, and political fields. Around 700 scholarships awarded annually.",
    },
    {
      title: "DAAD Research Grants - Short-term Grants",
      providerType: "DAAD",
      fundingAmount: "€934 / month + Travel Allowance",
      degreeLevel: "Master, PhD",
      deadline: "October 15 (Annual)",
      eligibility: "Graduate students and postdocs who need to carry out research in Germany for 1-6 months. Open to all nationalities.",
      officialWebsite: "https://www.daad.de/en/find-form/for-academics-and-researchers/detail/28/",
      description: "DAAD Short-term Research Grant for Masters and PhD candidates. Includes monthly living allowance and travel subsidy.",
    },
    {
      title: "Hanns Seidel Foundation Scholarship",
      providerType: "Private",
      fundingAmount: "€861 / month (Master) + full tuition support",
      degreeLevel: "Bachelor, Master, PhD",
      deadline: "February 1 & August 1",
      eligibility: "Students with above-average academic achievements, active civic engagement, and alignment with Christian Social values.",
      officialWebsite: "https://www.hss.de/en/education/scholarship-programme/",
      description: "A Bavarian political foundation scholarship open to international students studying in Germany across all disciplines.",
    },
    {
      title: "Erasmus Mundus Joint Masters (EMJM)",
      providerType: "University",
      fundingAmount: "€1,400 / month + Full Tuition Coverage + Travel Allowance",
      degreeLevel: "Master",
      deadline: "January (varies by programme)",
      eligibility: "Global applicants holding a recognized Bachelor degree in the relevant discipline.",
      officialWebsite: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-joint-masters_en",
      description: "EU-funded excellence scholarship for joint master programs spanning 2-3 European universities. Full funding covers tuition, allowance, and travel.",
    },
  ];

  for (const sch of newScholarships) {
    if (!existingSchTitles.includes(sch.title)) {
      await withRetry(() => prisma.scholarship.create({ data: { countryId: germany.id, ...sch } }));
      console.log("  ✓ Created scholarship:", sch.title);
    } else {
      console.log("  → Skipped (exists):", sch.title);
    }
  }

  // ─── Extra Living Cost Cities ──────────────────────────────────────────────
  const existingLC = await withRetry(() => prisma.livingCostCity.findMany({ where: { countryId: germany.id } }));
  const existingLCNames = existingLC.map((c) => c.cityName);

  const newLivingCosts = [
    { cityName: "Hamburg", rent: 580, food: 235, transport: 49, utilities: 100, internet: 28, entertainment: 105, monthlyTotal: 1097, description: "Germany's second-largest city and maritime trade hub. Moderate costs with excellent student nightlife and cultural life." },
    { cityName: "Frankfurt", rent: 600, food: 240, transport: 49, utilities: 105, internet: 30, entertainment: 115, monthlyTotal: 1139, description: "Germany's financial hub. Higher rents offset by exceptional internship opportunities at international banks and finance firms." },
    { cityName: "Stuttgart", rent: 580, food: 230, transport: 0, utilities: 100, internet: 28, entertainment: 100, monthlyTotal: 1038, description: "Automotive heartland of Germany (Mercedes-Benz, Porsche). Moderate costs with strong industry employment ties via University of Stuttgart." },
    { cityName: "Cologne", rent: 520, food: 220, transport: 49, utilities: 95, internet: 28, entertainment: 95, monthlyTotal: 1007, description: "Vibrant Rhine city with great nightlife and media industries. University of Cologne hosts 52,000+ students." },
    { cityName: "Heidelberg", rent: 490, food: 200, transport: 0, utilities: 90, internet: 26, entertainment: 85, monthlyTotal: 891, description: "Picturesque medieval university town. Higher rents for its size are offset by outstanding quality of life and world-class research." },
    { cityName: "Leipzig", rent: 380, food: 190, transport: 49, utilities: 80, internet: 25, entertainment: 75, monthlyTotal: 799, description: "One of Germany's most affordable student cities. Rich music and arts scene with a rapidly growing startup ecosystem." },
    { cityName: "Dresden", rent: 390, food: 195, transport: 49, utilities: 82, internet: 25, entertainment: 75, monthlyTotal: 816, description: "The Florence on the Elbe - affordable student living, strong technical programs at TU Dresden, and a beautiful baroque city centre." },
    { cityName: "Gottingen", rent: 380, food: 190, transport: 0, utilities: 78, internet: 24, entertainment: 70, monthlyTotal: 742, description: "Compact, student-dominated university town. Extremely affordable with a high concentration of Nobel Prize laureates per capita." },
  ];

  for (const lc of newLivingCosts) {
    if (!existingLCNames.includes(lc.cityName)) {
      await withRetry(() => prisma.livingCostCity.create({ data: { countryId: germany.id, ...lc } }));
      console.log("  ✓ Created living cost city:", lc.cityName);
    } else {
      console.log("  → Skipped (exists):", lc.cityName);
    }
  }

  // ─── Extra Health Insurance Providers ─────────────────────────────────────
  const existingIns = await withRetry(() => prisma.insuranceOption.findMany({ where: { countryId: germany.id } }));
  const existingInsNames = existingIns.map((i) => i.providerName);

  const newInsurance = [
    {
      type: "Public",
      providerName: "AOK (Allgemeine Ortskrankenkasse)",
      monthlyCost: "~€122 - €130 / month (varies by regional AOK)",
      requirements: "Mandatory for students under 30 enrolled in degree programs. Regional coverage area applies.",
      coverageDetails: "Full statutory medical coverage, dental, hospital, specialist referrals, and preventive health programs.",
      pros: "Largest public insurer in Germany with the most physical branches. Well established in smaller university towns.",
      cons: "Regional AOK branches vary in quality. Less consistent English support than TK.",
      recommendedFor: "Students in smaller university towns (Gottingen, Aachen, Karlsruhe) where AOK has strong regional presence.",
    },
    {
      type: "Public",
      providerName: "DAK-Gesundheit",
      monthlyCost: "~€122 - €128 / month",
      requirements: "Mandatory for students under 30 enrolled in degree programs.",
      coverageDetails: "Full statutory health coverage including mental health support, dental, physiotherapy, and hospital care.",
      pros: "Competitive contribution rates. Good digital portal for claims and appointments.",
      cons: "Smaller branch network than AOK or TK.",
      recommendedFor: "Cost-conscious students looking for a lower-cost statutory insurer with solid digital services.",
    },
    {
      type: "Public",
      providerName: "hkk Krankenkasse",
      monthlyCost: "~€116 - €120 / month",
      requirements: "Open to students under 30 enrolled in German degree programs.",
      coverageDetails: "Standard statutory coverage for GP, specialist, hospital, and dental visits.",
      pros: "Consistently one of the cheapest statutory insurers in Germany. No reduction in statutory benefits.",
      cons: "Limited local branch presence outside of Bremen and Hamburg. English support is limited.",
      recommendedFor: "Budget-conscious students comfortable managing insurance digitally who need the lowest monthly premium.",
    },
    {
      type: "Private",
      providerName: "Ottonova (Digital Private Health Insurance)",
      monthlyCost: "~€85 - €130 / month",
      requirements: "For self-employed, students over 30, or those exempt from statutory GKV enrollment.",
      coverageDetails: "Comprehensive digital-first private insurance: GP, specialist, hospital, dental, mental health, and English app management.",
      pros: "Germany's first fully digital private insurer. English app, fast claims processing, premium coverage including alternative medicine.",
      cons: "More expensive than statutory alternatives. Not accepted as a substitute for mandatory GKV under 30.",
      recommendedFor: "International students over 30 or researchers seeking premium digital-first private coverage in Germany.",
    },
  ];

  for (const ins of newInsurance) {
    if (!existingInsNames.includes(ins.providerName)) {
      await withRetry(() => prisma.insuranceOption.create({ data: { countryId: germany.id, ...ins } }));
      console.log("  ✓ Created insurance provider:", ins.providerName);
    } else {
      console.log("  → Skipped (exists):", ins.providerName);
    }
  }

  console.log("\n✅ Germany data expansion complete on Neon PostgreSQL!");
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
