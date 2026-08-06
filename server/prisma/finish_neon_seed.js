"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Inserting remaining LivingCostCities & InsuranceOptions...");

  const germany = await prisma.country.findUnique({ where: { slug: "germany" } });
  if (!germany) throw new Error("Germany country not found.");

  // Living Cost Cities
  const existingLC = await prisma.livingCostCity.findMany({ where: { countryId: germany.id } });
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
      await prisma.livingCostCity.create({ data: { countryId: germany.id, ...lc } });
      console.log("  ✓ Created living cost city:", lc.cityName);
    }
  }

  // Insurance Options
  const existingIns = await prisma.insuranceOption.findMany({ where: { countryId: germany.id } });
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
      await prisma.insuranceOption.create({ data: { countryId: germany.id, ...ins } });
      console.log("  ✓ Created insurance provider:", ins.providerName);
    }
  }

  console.log("✅ Done!");
}

main().finally(() => prisma.$disconnect());
