# News API MCP

A news integration for NewsAPI.org.

## Features

- Search for news articles using keywords, date ranges, sources, and more
- Fetch top headlines by country, category, or source
- Browse available news sources by category and language

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the project root with your NewsAPI key:
   ```
   NEWS_API_KEY=your_api_key_here
   ```
   You can get an API key by signing up at [NewsAPI.org](https://newsapi.org/register)

## Development

Build the project:
```
npm run build
```

Watch for changes during development:
```
npm run dev
```

## MCP Tools

This package provides the following tools (coming soon):

1. `searchArticles` - Search for news articles with various parameters
2. `getTopHeadlines` - Get breaking news headlines
3. `getNewsSources` - Browse available news sources

## License

ISC 