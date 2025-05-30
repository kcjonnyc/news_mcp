import dotenv from 'dotenv';

dotenv.config();

export const apiConfig = {
  key: process.env.NEWS_API_KEY || '',
  baseUrl: 'https://newsapi.org/v2',
  defaultLanguage: 'en',
  defaultPageSize: 10
};

export const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
] as const;

export const config = {
  api: apiConfig,
  categories,
  server: {
    name: 'news-mcp-server',
    version: '1.0.0'
  }
};