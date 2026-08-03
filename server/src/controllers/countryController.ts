import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getAllCountries = async (req: Request, res: Response) => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { name: 'asc' },
    });
    return res.json({ success: true, data: countries });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCountryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const country = await prisma.country.findUnique({
      where: { slug },
      include: {
        cities: true,
        universities: {
          include: { requirements: true },
          orderBy: { qsRanking: 'asc' },
        },
        requirements: true,
        documents: true,
        apsGuides: true,
        visas: true,
        timelines: { orderBy: { order: 'asc' } },
        scholarships: true,
        livingCosts: true,
        accommodations: true,
        partTimeJobs: true,
        insurances: true,
        officialResources: true,
        faqs: true,
      },
    });

    if (!country) {
      return res.status(404).json({ success: false, message: 'Country not found' });
    }

    return res.json({ success: true, data: country });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
