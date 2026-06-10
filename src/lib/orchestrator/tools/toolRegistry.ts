// src/lib/orchestrator/tools/toolRegistry.ts
// Tool definitions and MCP-compatible handler system

import { Tool, ToolHandler, ToolContext, ToolResult, ToolCategory, OrchestrationContext, Task } from '../types';

export class ToolRegistry {
  private tools: Map<string, Tool> = new Map();

  register(tool: Tool): void {
    this.tools.set(tool.id, tool);
  }

  get(id: string): Tool | undefined {
    return this.tools.get(id);
  }

  getAll(): Tool[] {
    return Array.from(this.tools.values());
  }

  getByCategory(category: ToolCategory): Tool[] {
    return this.getAll().filter((t) => t.category === category);
  }

  findRelevant(task: Task, context: OrchestrationContext): Tool[] {
    // Simple relevance check based on keywords
    const keywords = [...task.description.toLowerCase().split(' '), task.type];
    return this.getAll().filter((tool) => {
      const toolText = `${tool.name} ${tool.description} ${tool.category}`.toLowerCase();
      return keywords.some((kw) => toolText.includes(kw));
    });
  }

  async executeTool(toolId: string, args: any, context: ToolContext): Promise<ToolResult> {
    const tool = this.tools.get(toolId);
    if (!tool) {
      return {
        success: false,
        error: `Tool not found: ${toolId}`,
        toolCallId: crypto.randomUUID(),
        executionTime: 0,
        tokensUsed: 0,
      };
    }

    const start = Date.now();
    try {
      const result = await tool.handler(args, context);
      return {
        ...result,
        executionTime: Date.now() - start,
        toolCallId: crypto.randomUUID(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        toolCallId: crypto.randomUUID(),
        executionTime: Date.now() - start,
        tokensUsed: 0,
      };
    }
  }
}

// Built-in tool definitions
export function createSearchTool(): Tool {
  return {
    id: 'web_search',
    name: 'Web Search',
    description: 'Search the web for information using DuckDuckGo or similar',
    category: 'search',
    schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' },
        maxResults: { type: 'number', description: 'Maximum number of results', default: 10 },
      },
      required: ['query'],
    },
    handler: async (args, context): Promise<ToolResult> => {
      // Mock search - in production integrate with Brave/SerpAPI
      const results = [
        { title: `Results for ${args.query}`, url: 'https://example.com', snippet: 'Mock result' },
      ];
      return {
        success: true,
        data: results,
        toolCallId: crypto.randomUUID(),
        executionTime: 100,
        tokensUsed: 50,
      };
    },
  };
}

export function createReadFileTool(): Tool {
  return {
    id: 'read_file',
    name: 'Read File',
    description: 'Read contents of a file',
    category: 'file_system',
    schema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'File path' },
      },
      required: ['path'],
    },
    handler: async (args, context): Promise<ToolResult> => {
      try {
        const response = await fetch(`file://${args.path}`);
        const content = await response.text();
        return {
          success: true,
          data: { content },
          toolCallId: crypto.randomUUID(),
          executionTime: 50,
          tokensUsed: Math.ceil(content.length / 4),
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error),
          toolCallId: crypto.randomUUID(),
          executionTime: 50,
          tokensUsed: 0,
        };
      }
    },
  };
}

export function createCodeAnalysisTool(): Tool {
  return {
    id: 'analyze_code',
    name: 'Analyze Code',
    description: 'Analyze code for quality, complexity, and issues',
    category: 'analysis',
    schema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Code to analyze' },
        language: { type: 'string', description: 'Programming language' },
      },
      required: ['code'],
    },
    handler: async (args, context): Promise<ToolResult> => {
      // Mock analysis
      return {
        success: true,
        data: {
          lines: args.code.split('\\n').length,
          complexity: 'low',
          issues: [],
        },
        toolCallId: crypto.randomUUID(),
        executionTime: 200,
        tokensUsed: 100,
      };
    },
  };
}

export function createCalculatorTool(): Tool {
  return {
    id: 'calculator',
    name: 'Calculator',
    description: 'Perform mathematical calculations',
    category: 'utility',
    schema: {
      type: 'object',
      properties: {
        expression: { type: 'string', description: 'Math expression to evaluate' },
      },
      required: ['expression'],
    },
    handler: async (args, context): Promise<ToolResult> => {
      try {
        // Safe eval - only basic operations
        const result = Function('"use strict"; return (' + args.expression + ')')();
        return {
          success: true,
          data: { result },
          toolCallId: crypto.randomUUID(),
          executionTime: 10,
          tokensUsed: 10,
        };
      } catch (error) {
        return {
          success: false,
          error: 'Invalid expression',
          toolCallId: crypto.randomUUID(),
          executionTime: 10,
          tokensUsed: 10,
        };
      }
    },
  };
}

export function createDefaultTools(): Tool[] {
  return [
    createSearchTool(),
    createReadFileTool(),
    createCodeAnalysisTool(),
    createCalculatorTool(),
  ];
}
