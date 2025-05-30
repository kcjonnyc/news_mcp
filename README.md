# News API MCP Server

A Model Context Protocol (MCP) server that provides access to news content through the NewsAPI.org service. This server enables AI assistants to search articles, get top headlines, and browse news sources.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Get a NewsAPI key:**
   - Sign up at [NewsAPI.org](https://newsapi.org/register)
   - Get your free API key (up to 100 requests/day)

3. **Configure environment:**
   Create a `.env` file in the project root:
   ```env
   NEWS_API_KEY=your_api_key_here
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

## MCP Configuration

Add to your MCP settings (e.g., `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "news-mcp": {
      "command": "npm",
      "args": ["run", "start", "--prefix", "/path/to/news_mcp"]
    }
  }
}
```

## Available Tools

- **`searchArticles`** - Search through millions of articles from news sources worldwide.
- **`getTopHeadlines`** - Get breaking news headlines and top stories.
- **`getSources`** - Discover and filter available news sources.

## Development

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
npm start
```

**Test NewsAPI integration:**
```bash
npm run test-api
```

## License

MIT