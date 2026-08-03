import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const globalSearch = async (req: Request, res: Response) => {
  try {
    const query = String(req.query.q || '').trim();
    if (!query || query.length < 2) {
      return res.json({
        success: true,
        data: {
          universities: [],
          scholarships: [],
          documents: [],
          faqs: [],
          resources: [],
        },
      });
    }

    const [universities, scholarships, documents, faqs, resources] = await Promise.all([
      prisma.university.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { cityName: { contains: query } },
            { description: { contains: query } },
          ],
        },
        take: 5,
      }),
      prisma.scholarship.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
            { providerType: { contains: query } },
          ],
        },
        take: 5,
      }),
      prisma.documentItem.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
            { category: { contains: query } },
          ],
        },
        take: 5,
      }),
      prisma.fAQItem.findMany({
        where: {
          OR: [
            { question: { contains: query } },
            { answer: { contains: query } },
            { category: { contains: query } },
            { tags: { contains: query } },
          ],
        },
        take: 5,
      }),
      prisma.officialResource.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
            { category: { contains: query } },
          ],
        },
        take: 5,
      }),
    ]);

    return res.json({
      success: true,
      data: {
        universities,
        scholarships,
        documents,
        faqs,
        resources,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
