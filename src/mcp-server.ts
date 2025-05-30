import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import {searchArticles, SearchArticlesParamsSchema} from './tools/search-articles';
import {config} from './config';

function registerTools(server: McpServer) {
  server.tool(
    'searchArticles',
    SearchArticlesParamsSchema.shape,
    async (params) => {
      const result = await searchArticles(params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  );
}

export async function startServer() {
  try {
    const server = new McpServer({
      name: config.server.name,
      version: config.server.version
    });

    registerTools(server);

    const transport = new StdioServerTransport();

    console.log(`Starting ${config.server.name} v${config.server.version}`);
    await server.connect(transport);
    console.log('Server connected to transport');

    process.on('SIGINT', () => {
      console.log('Shutting down server');
      server.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
}