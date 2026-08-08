/**
 * Gemini API Fallback Service
 * 
 * Provides live AI-assisted university and course search for any country hub
 * when local database results are insufficient.
 * 
 * API key is loaded strictly via process.env.GEMINI_API_KEY.
 * Responses are cached in-memory with TTL to control cost and latency.
 */

interface UniversitySearchResult {
  id?: string;
  name: string;
  slug: string;
  type: string;
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
  isAiGenerated: boolean;
  aiSourceNote: string;
}

interface CacheEntry {
  data: UniversitySearchResult[];
  timestamp: number;
}

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours cache TTL
const searchCache = new Map<string, CacheEntry>();

export class GeminiService {
  private static apiKey: string | undefined = process.env.GEMINI_API_KEY;

  private static getCacheKey(countrySlug: string, query: string): string {
    return `${countrySlug.toLowerCase().trim()}:${query.toLowerCase().trim()}`;
  }

  /**
   * Search for real universities and academic programs via Gemini API.
   * Returns structured, typed university objects tagged with isAiGenerated: true.
   */
  public static async searchUniversities(
    countryNameOrSlug: string,
    query: string
  ): Promise<UniversitySearchResult[]> {
    const trimmedQuery = query.trim();
    if (!trimmedQuery || trimmedQuery.length < 2) {
      return [];
    }

    const cacheKey = this.getCacheKey(countryNameOrSlug, trimmedQuery);
    const cached = searchCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('⚠️ GEMINI_API_KEY is not configured. Returning empty fallback.');
      return [];
    }

    const systemPrompt = `You are an academic database assistant for the study abroad platform 'edunex'.
The user is searching for universities, colleges, or courses in ${countryNameOrSlug} with the search query: "${trimmedQuery}".

Search for up to 4 real, accredited universities in ${countryNameOrSlug} matching this query (including matching programs, faculties, or cities).
Return ONLY a valid JSON array of objects conforming to the schema below. Do not wrap in markdown code fences.

Schema per object:
{
  "name": "Full official university name (and local name in parentheses)",
  "slug": "url-friendly-slug-with-hyphens",
  "type": "Public" | "Private",
  "qsRanking": integer (approximate QS World Ranking or 800+ if unranked),
  "cityName": "City in ${countryNameOrSlug}",
  "logoUrl": "https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80",
  "coverUrl": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80",
  "semesterFee": "Tuition or semester contribution per semester",
  "tuitionFee": "Annual tuition estimate",
  "hasEnglishPrograms": boolean,
  "officialWebsite": "https://...",
  "admissionReqSummary": "1-sentence requirement summary (GPA, IELTS/TOEFL/language level)",
  "degrees": "Bachelor, Master, PhD",
  "description": "2-3 sentences describing academic specialties, research prestige, and relevant courses."
}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: systemPrompt }],
              },
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.2,
            },
          }),
        }
      );

      if (!response.ok) {
        console.error(`Gemini API error: HTTP ${response.status} ${response.statusText}`);
        return [];
      }

      const json = await response.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        return [];
      }

      const parsed: any[] = JSON.parse(rawText);
      if (!Array.isArray(parsed)) {
        return [];
      }

      const results: UniversitySearchResult[] = parsed.map((item, idx) => ({
        id: `ai-${countryNameOrSlug}-${Date.now()}-${idx}`,
        name: item.name || 'Accredited University',
        slug: item.slug || item.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `uni-${idx}`,
        type: item.type === 'Private' ? 'Private' : 'Public',
        qsRanking: typeof item.qsRanking === 'number' ? item.qsRanking : 500,
        cityName: item.cityName || countryNameOrSlug,
        logoUrl: item.logoUrl || 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80',
        coverUrl: item.coverUrl || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
        semesterFee: item.semesterFee || 'Standard tuition rates apply',
        tuitionFee: item.tuitionFee || 'Contact university admissions',
        hasEnglishPrograms: Boolean(item.hasEnglishPrograms),
        officialWebsite: item.officialWebsite || 'https://studyinaustria.at',
        admissionReqSummary: item.admissionReqSummary || 'Standard academic prerequisites apply.',
        degrees: item.degrees || 'Bachelor, Master',
        description: item.description || 'Accredited academic institution offering recognized degree programs.',
        isAiGenerated: true,
        aiSourceNote: 'Sourced via AI — verify before relying on this',
      }));

      // Cache result
      searchCache.set(cacheKey, {
        data: results,
        timestamp: Date.now(),
      });

      return results;
    } catch (err: any) {
      console.error('Gemini Service search failed:', err.message);
      return [];
    }
  }
}
