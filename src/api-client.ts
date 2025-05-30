import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {
  ArticlesResponse,
  SearchArticlesParams,
  SourcesParams,
  SourcesResponse,
  TopHeadlinesParams
} from './types';
import {apiConfig} from './config';

export class NewsApiClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey = apiConfig.key, baseUrl = apiConfig.baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  private createConfig(params: Record<string, any> = {}): AxiosRequestConfig {
    return {
      headers: {
        'X-Api-Key': this.apiKey
      },
      params
    };
  }

  async searchArticles(params: SearchArticlesParams): Promise<ArticlesResponse> {
    return this.get<ArticlesResponse>('/everything', params);
  }

  async getTopHeadlines(params: TopHeadlinesParams): Promise<ArticlesResponse> {
    return this.get<ArticlesResponse>('/top-headlines', params);
  }

  async getSources(params: SourcesParams): Promise<SourcesResponse> {
    return this.get<SourcesResponse>('/top-headlines/sources', params);
  }

  private async get<T>(endpoint: string, params: Record<string, any>): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const config = this.createConfig(params);
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error as Error);
      throw error;
    }
  }

  private handleError(error: Error): void {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('NewsAPI Error:', axiosError.response?.data || axiosError.message);
    } else {
      console.error('NewsAPI Error:', error.message);
    }
  }
}