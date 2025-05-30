import {z} from 'zod';
import {NewsApiClient} from '../api-client';
import {SearchArticlesParams as ApiSearchParams} from '../types';

export const SearchArticlesParamsSchema = z.object({
  query: z.string()
    .max(500, 'Query must be 500 characters or less')
    .describe('Keywords or phrases to search for. Supports advanced search: use quotes for exact match, + for required terms, - for excluded terms, AND/OR/NOT operators with optional parentheses. Must be URL-encoded.'),
  searchIn: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const validFields = ['title', 'description', 'content'];
      const fields = val.split(',').map(f => f.trim());
      return fields.every(field => validFields.includes(field));
    }, 'searchIn must be comma-separated values from: title, description, content')
    .describe('Comma-separated list of fields to restrict search to. Options: title, description, content. Default: all fields searched.'),
  sources: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const sourceIds = val.split(',').map(s => s.trim());
      return sourceIds.length <= 20;
    }, 'Maximum 20 source identifiers allowed')
    .describe('Comma-separated string of source identifiers (maximum 20). Use /sources endpoint to find valid identifiers.'),
  domains: z.string()
    .optional()
    .describe('Comma-separated string of domains (e.g. bbc.co.uk, techcrunch.com) to restrict the search to'),
  excludeDomains: z.string()
    .optional()
    .describe('Comma-separated string of domains (e.g. bbc.co.uk, techcrunch.com) to remove from the results'),
  from: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?$/, 'Date must be in ISO 8601 format (e.g. 2023-12-25 or 2023-12-25T16:04:47)')
    .optional()
    .describe('Date and optional time for the oldest article allowed. ISO 8601 format (e.g. 2023-12-25 or 2023-12-25T16:04:47)'),
  to: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?$/, 'Date must be in ISO 8601 format (e.g. 2023-12-25 or 2023-12-25T16:04:47)')
    .optional()
    .describe('Date and optional time for the newest article allowed. ISO 8601 format (e.g. 2023-12-25 or 2023-12-25T16:04:47)'),
  language: z.enum(['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'sv', 'ud', 'zh'])
    .optional()
    .describe('The 2-letter ISO-639-1 language code. Supported: ar (Arabic), de (German), en (English), es (Spanish), fr (French), he (Hebrew), it (Italian), nl (Dutch), no (Norwegian), pt (Portuguese), ru (Russian), sv (Swedish), ud (Urdu), zh (Chinese)'),
  sortBy: z.enum(['relevancy', 'popularity', 'publishedAt'])
    .optional()
    .default('publishedAt')
    .describe('Sort order: relevancy (most related to query first), popularity (popular sources first), publishedAt (newest first). Default: publishedAt'),
  pageSize: z.number()
    .int()
    .min(1, 'Page size must be at least 1')
    .max(100, 'Page size cannot exceed 100')
    .optional()
    .default(100)
    .describe('Number of results to return per page. Default: 100, Maximum: 100'),
  page: z.number()
    .int()
    .min(1, 'Page number must be at least 1')
    .optional()
    .default(1)
    .describe('Page number for pagination. Default: 1')
});

export type SearchArticlesParams = z.infer<typeof SearchArticlesParamsSchema>;

export async function searchArticles(params: SearchArticlesParams) {
  const apiClient = new NewsApiClient();

  // Convert our schema params to the API client params
  const apiParams: ApiSearchParams = {
    q: params.query,
    searchIn: params.searchIn,
    sources: params.sources,
    domains: params.domains,
    excludeDomains: params.excludeDomains,
    from: params.from,
    to: params.to,
    language: params.language,
    sortBy: params.sortBy,
    pageSize: params.pageSize,
    page: params.page
  };

  const results = await apiClient.searchArticles(apiParams);

  return {
    totalResults: results.totalResults,
    articles: results.articles.map(article => ({
      title: article.title,
      description: article.description,
      source: article.source.name,
      author: article.author,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      content: article.content
    }))
  };
}