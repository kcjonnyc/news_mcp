import {z} from 'zod';
import {NewsApiClient} from '../api-client';
import {TopHeadlinesParams as ApiTopHeadlinesParams} from '../types';

export const TopHeadlinesParamsSchema = z.object({
  country: z.enum(['us'])
    .optional()
    .describe('The 2-letter ISO 3166-1 code of the country you want to get headlines for. Currently only "us" is supported. Note: you cannot mix this with sources parameter.'),
  category: z.enum(['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'])
    .optional()
    .describe('The category you want to get headlines for. Note: you cannot mix this with sources parameter.'),
  sources: z.string()
    .optional()
    .describe('Comma-separated string of identifiers for the news sources or blogs you want headlines from. Use /sources endpoint to locate these programmatically. Note: you cannot mix this with country or category parameters.'),
  query: z.string()
    .optional()
    .describe('Keywords or a phrase to search for in the headlines.'),
  pageSize: z.number()
    .int()
    .min(1, 'Page size must be at least 1')
    .max(100, 'Page size cannot exceed 100')
    .optional()
    .default(20)
    .describe('Number of results to return per page. Default: 20, Maximum: 100'),
  page: z.number()
    .int()
    .min(1, 'Page number must be at least 1')
    .optional()
    .default(1)
    .describe('Page number for pagination. Default: 1')
});

export type TopHeadlinesParams = z.infer<typeof TopHeadlinesParamsSchema>;

export async function getTopHeadlines(params: TopHeadlinesParams) {
  const apiClient = new NewsApiClient();

  const apiParams: ApiTopHeadlinesParams = {
    country: params.country,
    category: params.category,
    sources: params.sources,
    q: params.query,
    pageSize: params.pageSize,
    page: params.page
  };

  const results = await apiClient.getTopHeadlines(apiParams);

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