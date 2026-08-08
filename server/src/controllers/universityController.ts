import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { GeminiService } from '../services/geminiService';

export const getUniversities = async (req: Request, res: Response) => {
  try {
    const { countrySlug, city, type, degree, search, sortBy, sortOrder } = req.query;

    let whereClause: any = {};

    if (countrySlug) {
      whereClause.country = { slug: String(countrySlug) };
    }

    if (city && city !== 'All') {
      whereClause.cityName = { equals: String(city) };
    }

    if (type && type !== 'All') {
      whereClause.type = { equals: String(type) };
    }

    if (degree && degree !== 'All') {
      whereClause.degrees = { contains: String(degree) };
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: String(search) } },
        { cityName: { contains: String(search) } },
        { description: { contains: String(search) } },
      ];
    }

    let orderByClause: any = { qsRanking: 'asc' };
    if (sortBy === 'tuition') {
      orderByClause = { tuitionFee: sortOrder === 'desc' ? 'desc' : 'asc' };
    } else if (sortBy === 'qsRanking') {
      orderByClause = { qsRanking: sortOrder === 'desc' ? 'desc' : 'asc' };
    } else if (sortBy === 'name') {
      orderByClause = { name: sortOrder === 'desc' ? 'desc' : 'asc' };
    }

    let universities: any[] = await prisma.university.findMany({
      where: whereClause,
      include: {
        requirements: true,
        city: true,
      },
      orderBy: orderByClause,
    });

    // If search term is provided and no local database results match, trigger Gemini fallback
    if (search && universities.length === 0 && countrySlug) {
      const countryTarget = String(countrySlug);
      const aiResults = await GeminiService.searchUniversities(countryTarget, String(search));
      if (aiResults.length > 0) {
        universities = aiResults;
      }
    }

    return res.json({ success: true, count: universities.length, data: universities });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUniversityBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const university = await prisma.university.findUnique({
      where: { slug },
      include: {
        requirements: true,
        city: true,
        country: true,
      },
    });

    if (!university) {
      return res.status(404).json({ success: false, message: 'University not found' });
    }

    return res.json({ success: true, data: university });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
