// src/lib/orchestrator/registry.ts
// Agent, Tool, and Memory Registry implementations

import {
  Agent,
  AgentRegistry,
  AgentType,
  Tool,
  ToolRegistry,
  Task,
  OrchestrationContext,
  CostTracker,
  MemoryManager,
  TelemetryClient,
  ToolCategory,
  AgentState,
  MemoryEntry,
  ToolContext,
  ToolResult,
} from './types';

export class InMemoryAgentRegistry implements AgentRegistry {
  private agents: Map<string, Agent> = new Map();
  private agentStates: Map<string, AgentState> = new Map();

  register(agent: Agent): void {
    this.agents.set(agent.id, agent);
    this.agentStates.set(agent.id, {
      agentId: agent.id,
      status: 'idle',
      taskHistory: [],
      performance: {
        tasksCompleted: 0,
        averageLatency: 0,
        successRate: 100,
        totalTokens: 0,
        totalCost: 0,
      },
      lastHeartbeat: new Date(),
    });
  }

  get(id: string): Agent | undefined {
    return this.agents.get(id);
  }

  getAll(): Agent[] {
    return Array.from(this.agents.values());
  }

  getByType(type: AgentType): Agent[] {
    return this.getAll().filter((a) => a.type === type);
  }

  getBestForTask(task: Task): Agent | undefined {
    const candidates = this.getAll().filter((agent) =>
      agent.capabilities.some((cap) => task.type.includes(cap) || task.description.toLowerCase().includes(cap))
    );

    if (candidates.length === 0) {
      return undefined;
    }

    // Score candidates by: capability match, success rate, cost efficiency
    return candidates.reduce((best, current) => {
      const currentState = this.agentStates.get(current.id)!;
      const bestState = this.agentStates.get(best.id)!;

      const currentScore =
        current.capabilities.filter((c) => task.type.includes(c) || task.description.toLowerCase().includes(c)).length * 10 +
        currentState.performance.successRate -
        (current.costPer1KInput + current.costPer1KOutput) * 0.1;

      const bestScore =
        best.capabilities.filter((c) => task.type.includes(c) || task.description.toLowerCase().includes(c)).length * 10 +
        bestState.performance.successRate -
        (best.costPer1KInput + best.costPer1KOutput) * 0.1;

      return currentScore > bestScore ? current : best;
    });
  }

  updatePerformance(agentId: string, latency: number, success: boolean, tokens: number, cost: number): void {
    const state = this.agentStates.get(agentId);
    if (!state) return;

    const perf = state.performance;
    perf.tasksCompleted++;
    perf.totalTokens += tokens;
    perf.totalCost += cost;
    perf.averageLatency = (perf.averageLatency * (perf.tasksCompleted - 1) + latency) / perf.tasksCompleted;
    perf.successRate = ((perf.successRate * (perf.tasksCompleted - 1)) + (success ? 100 : 0)) / perf.tasksCompleted;
    state.lastHeartbeat = new Date();
  }

  getState(agentId: string): AgentState | undefined {
    return this.agentStates.get(agentId);
  }
}

export class InMemoryToolRegistry implements ToolRegistry {
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
    const taskText = `${task.type} ${task.description} ${JSON.stringify(task.input)}`.toLowerCase();
    const keywords = taskText.split(/\s+/);

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
    return tool.handler(args, context);
  }
}

export class SimpleCostTracker implements CostTracker {
  dailyBudget: number;
  dailySpent: number = 0;
  monthlyBudget: number;
  monthlySpent: number = 0;
  perUserBudget: number;
  private userSpending: Map<string, number> = new Map();

  constructor(config: { dailyBudget: number; monthlyBudget: number; perUserBudget: number }) {
    this.dailyBudget = config.dailyBudget;
    this.monthlyBudget = config.monthlyBudget;
    this.perUserBudget = config.perUserBudget;
  }

  getUserSpent(userId: string): number {
    return this.userSpending.get(userId) || 0;
  }

  canExecute(userId: string, estimatedCost: number): boolean {
    const userSpent = this.getUserSpent(userId);
    return (
      this.dailySpent + estimatedCost <= this.dailyBudget &&
      this.monthlySpent + estimatedCost <= this.monthlyBudget &&
      userSpent + estimatedCost <= this.perUserBudget
    );
  }

  recordCost(userId: string, cost: number): void {
    this.dailySpent += cost;
    this.monthlySpent += cost;
    const current = this.getUserSpent(userId);
    this.userSpending.set(userId, current + cost);
  }
}

export class ConsoleTelemetryClient implements TelemetryClient {
  async trace<T>(name: string, fn: () => Promise<T>, attributes?: Record<string, any>): Promise<T> {
    console.log(`[TRACE] ${name}`, attributes);
    const start = Date.now();
    try {
      const result = await fn();
      console.log(`[TRACE] ${name} completed in ${Date.now() - start}ms`);
      return result;
    } catch (error) {
      console.error(`[TRACE] ${name} failed:`, error);
      throw error;
    }
  }

  async span<T>(name: string, fn: () => Promise<T>, attributes?: Record<string, any>): Promise<T> {
    console.log(`[SPAN] ${name}`, attributes);
    return fn();
  }

  metric(name: string, value: number, attributes?: Record<string, any>): void {
    console.log(`[METRIC] ${name}: ${value}`, attributes);
  }

  event(name: string, attributes?: Record<string, any>): void {
    console.log(`[EVENT] ${name}`, attributes);
  }

  error(error: Error, attributes?: Record<string, any>): void {
    console.error(`[ERROR] ${error.message}`, error, attributes);
  }
}

export class SimpleMemoryManager implements MemoryManager {
  working: {
    set: (key: string, value: any, ttl?: number) => Promise<void>;
    get: (key: string) => Promise<any | null>;
    delete: (key: string) => Promise<void>;
    clear: () => Promise<void>;
  };

  semantic: {
    store: (entry: Omit<MemoryEntry, 'id' | 'embedding'>) => Promise<string>;
    search: (query: string, filters?: any, limit?: number) => Promise<MemoryEntry[]>;
    delete: (id: string) => Promise<void>;
  };

  episodic: {
    append: (entry: Omit<MemoryEntry, 'id'>) => Promise<string>;
    get: (id: string) => Promise<MemoryEntry | null>;
    query: (timeRange: { start: Date; end: Date }) => Promise<MemoryEntry[]>;
  };

  recall: (query: string, context?: any) => Promise<MemoryEntry[]>;

  constructor() {
    const workingStore = new Map<string, { value: any; expiresAt?: Date }>();
    const semanticStore: MemoryEntry[] = [];
    const episodicStore: MemoryEntry[] = [];

    this.working = {
      set: async (key: string, value: any, ttl?: number) => {
        workingStore.set(key, { value, expiresAt: ttl ? new Date(Date.now() + ttl * 1000) : undefined });
      },
      get: async (key: string) => {
        const item = workingStore.get(key);
        if (item && item.expiresAt && item.expiresAt < new Date()) {
          workingStore.delete(key);
          return null;
        }
        return item?.value || null;
      },
      delete: async (key: string) => {
        workingStore.delete(key);
      },
      clear: async () => {
        workingStore.clear();
      },
    };

    this.semantic = {
      store: async (entry) => {
        const id = crypto.randomUUID();
        semanticStore.push({ ...entry, id, embedding: this.mockEmbed(entry.content) });
        return id;
      },
      search: async (query, filters?, limit = 10) => {
        const queryEmb = this.mockEmbed(query);
        return semanticStore
          .map((entry) => ({
            entry,
            score: this.cosineSimilarity(queryEmb, entry.embedding || []),
          }))
          .filter(({ score }) => score > 0.3)
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
          .map(({ entry }) => entry);
      },
      delete: async (id) => {
        const idx = semanticStore.findIndex((e) => e.id === id);
        if (idx >= 0) semanticStore.splice(idx, 1);
      },
    };

    this.episodic = {
      append: async (entry) => {
        const id = crypto.randomUUID();
        episodicStore.push({ ...entry, id });
        return id;
      },
      get: async (id) => {
        return episodicStore.find((e) => e.id === id) || null;
      },
      query: async (timeRange) => {
        return episodicStore.filter(
          (e) => e.metadata.timestamp >= timeRange.start && e.metadata.timestamp <= timeRange.end
        );
      },
    };

    this.recall = async (query) => {
      return this.semantic.search(query);
    };
  }

  private mockEmbed(text: string): number[] {
    const hash = text.split('').reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
    return Array.from({ length: 384 }, (_, i) => Math.sin((hash + i) * 0.1));
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length || a.length === 0) return 0;
    const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
    const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
    return dot / (magA * magB + 1e-8);
  }
}
