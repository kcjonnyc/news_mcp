import dotenv from 'dotenv';

dotenv.config();

export const config = {
  api: {
    key: process.env.NEWS_API_KEY || '',
    baseUrl: 'https://newsapi.org/v2',
  },
  server: {
    name: 'news-mcp-server',
    version: '1.0.0'
  }
};