import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const [countriesCount, universitiesCount, scholarshipsCount, faqsCount, usersCount] = await Promise.all([
      prisma.country.count(),
      prisma.university.count(),
      prisma.scholarship.count(),
      prisma.fAQItem.count(),
      prisma.user.count(),
    ]);

    return res.json({
      success: true,
      data: {
        countriesCount,
        universitiesCount,
        scholarshipsCount,
        faqsCount,
        usersCount,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createUniversity = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const university = await prisma.university.create({ data });
    return res.json({ success: true, data: university });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateUniversity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const university = await prisma.university.update({ where: { id }, data });
    return res.json({ success: true, data: university });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteUniversity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.university.delete({ where: { id } });
    return res.json({ success: true, message: 'University deleted successfully' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const createFAQ = async (req: Request, res: Response) => {
  try {
    const faq = await prisma.fAQItem.create({ data: req.body });
    return res.json({ success: true, data: faq });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteFAQ = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.fAQItem.delete({ where: { id } });
    return res.json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
