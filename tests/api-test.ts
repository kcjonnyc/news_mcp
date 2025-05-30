import { NewsApiClient } from '../src/api-client';

async function testNewsApi() {
  console.log('Testing NewsAPI integration...');
  
  const apiClient = new NewsApiClient();
  
  try {
    console.log('\n--- Testing Search Articles ---');
    const searchResult = await apiClient.searchArticles({
      q: 'technology',
      language: 'en',
      pageSize: 3
    });
    console.log(`Found ${searchResult.totalResults} articles matching 'technology'`);
    console.log('Sample article titles:');
    searchResult.articles.forEach((article, i) => {
      console.log(`${i + 1}. ${article.title}`);
    });
    
    console.log('\n--- Testing Top Headlines ---');
    const headlinesResult = await apiClient.getTopHeadlines({
      country: 'us',
      category: 'business',
      pageSize: 3
    });
    console.log(`Found ${headlinesResult.totalResults} top business headlines from US`);
    console.log('Sample headlines:');
    headlinesResult.articles.forEach((article, i) => {
      console.log(`${i + 1}. ${article.title}`);
    });
    
    console.log('\n--- Testing News Sources ---');
    const sourcesResult = await apiClient.getSources({
      language: 'en',
      country: 'us'
    });
    console.log(`Found ${sourcesResult.sources.length} English news sources from US`);
    console.log('Sample sources:');
    sourcesResult.sources.slice(0, 3).forEach((source, i) => {
      console.log(`${i + 1}. ${source.name} (${source.category})`);
    });
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('API Test Error:', error);
    console.log('\nPlease check:');
    console.log('1. You have created a .env file with a valid NEWS_API_KEY');
    console.log('2. Your internet connection is working');
    console.log('3. The NewsAPI service is available');
  }
}

testNewsApi(); 