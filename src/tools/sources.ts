import {z} from 'zod';
import {NewsApiClient} from '../api-client';
import {SourcesParams as ApiSourcesParams} from '../types';

export const SourcesParamsSchema = z.object({
  category: z.enum(['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'])
    .optional()
    .describe('Find sources that display news of this category. Default: all categories.'),
  language: z.enum(['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'sv', 'ud', 'zh'])
    .optional()
    .describe('Find sources that display news in a specific language. Supported: ar (Arabic), de (German), en (English), es (Spanish), fr (French), he (Hebrew), it (Italian), nl (Dutch), no (Norwegian), pt (Portuguese), ru (Russian), sv (Swedish), ud (Urdu), zh (Chinese). Default: all languages.'),
  country: z.enum(['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'])
    .optional()
    .describe('Find sources that display news in a specific country. Default: all countries.')
});

export type SourcesParams = z.infer<typeof SourcesParamsSchema>;

export async function getSources(params: SourcesParams) {
  const apiClient = new NewsApiClient();

  const apiParams: ApiSourcesParams = {
    category: params.category,
    language: params.language,
    country: params.country
  };

  const results = await apiClient.getSources(apiParams);

  return {
    totalSources: results.sources.length,
    sources: results.sources.map(source => ({
      id: source.id,
      name: source.name,
      description: source.description,
      url: source.url,
      category: source.category,
      language: source.language,
      country: source.country
    }))
  };
} 