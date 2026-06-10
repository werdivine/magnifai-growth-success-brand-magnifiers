// src/lib/orchestrator/types.ts
// Core type definitions for the multi-agent orchestration system

export interface Task {
  id: string;
  type: TaskType;
  description: string;
  input: any;
  expectedOutput?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline?: Date;
  metadata?: Record<string, any>;
  parentTaskId?: string;
  subtasks?: Task[];
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  estimatedTokens?: number;
  actualTokens?: number;
  estimatedCost?: number;
  actualCost?: number;
}

export type TaskType =
  | 'research'
  | 'code_generation'
  | 'code_review'
  | 'analysis'
  | 'writing'
  | 'editing'
  | 'testing'
  | 'deployment'
  | 'data_processing'
  | 'automation'
  | 'planning'
  | 'review'
  | 'debugging'
  | 'optimization'
  | 'search';

export type TaskStatus =
  | 'pending'
  | 'planning'
  | 'decomposing'
  | 'assigned'
  | 'in_progress'
  | 'blocked'
  | 'needs_review'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  description: string;
  capabilities: string[];
  model: ModelConfig;
  systemPrompt: string;
  tools: string[];
  temperature: number;
  maxTokens: number;
  costPer1KInput: number;
  costPer1KOutput: number;
}

export type AgentType =
  | 'supervisor'
  | 'researcher'
  | 'developer'
  | 'analyst'
  | 'writer'
  | 'reviewer'
  | 'tester'
  | 'planner';

export interface ModelConfig {
  provider: 'openai' | 'anthropic' | 'google' | 'openrouter';
  model: string;
  apiKey?: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  schema: ToolSchema;
  handler: ToolHandler;
  category: ToolCategory;
  costPerCall?: number;
  timeout?: number;
  retryCount?: number;
}

export interface ToolSchema {
  type: 'object';
  properties: Record<string, any>;
  required?: string[];
}

export type ToolHandler = (args: any, context: ToolContext) => Promise<ToolResult>;

export interface ToolContext {
  taskId: string;
  agentId: string;
  memory: MemoryManager;
  traceId: string;
}

export interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
  toolCallId: string;
  executionTime: number;
  tokensUsed: number;
}

export type ToolCategory =
  | 'search'
  | 'database'
  | 'file_system'
  | 'api'
  | 'analysis'
  | 'code'
  | 'communication'
  | 'utility';

export interface MemoryEntry {
  id: string;
  type: MemoryType;
  content: string;
  embedding?: number[];
  metadata: {
    taskId?: string;
    agentId?: string;
    timestamp: Date;
    importance: number;
    tags: string[];
  };
  expiresAt?: Date;
}

export type MemoryType = 'episodic' | 'semantic' | 'procedural' | 'working';

export interface AgentState {
  agentId: string;
  currentTaskId?: string;
  status: 'idle' | 'busy' | 'error';
  taskHistory: Task[];
  performance: {
    tasksCompleted: number;
    averageLatency: number;
    successRate: number;
    totalTokens: number;
    totalCost: number;
  };
  lastHeartbeat: Date;
}

export interface OrchestrationContext {
  traceId: string;
  sessionId: string;
  userId?: string;
  taskId: string;
  parentTaskId?: string;
  depth: number;
  maxDepth: number;
  memory: MemoryManager;
  tools: ToolRegistry;
  agents: AgentRegistry;
  costTracker: CostTracker;
  telemetry: TelemetryClient;
}

export interface DecompositionPlan {
  taskId: string;
  subtasks: Task[];
  dependencies: Array<[string, string]>;
  estimatedTotalTokens: number;
  estimatedTotalCost: number;
  parallelizableGroups: string[][];
}

export interface ExecutionResult {
  taskId: string;
  success: boolean;
  output?: any;
  error?: Error;
  subtaskResults?: ExecutionResult[];
  tokensUsed: number;
  cost: number;
  executionTime: number;
  agentId: string;
  modelUsed: string;
  retries: number;
}

export interface CostTracker {
  dailyBudget: number;
  dailySpent: number;
  monthlyBudget: number;
  monthlySpent: number;
  perUserBudget: number;
  getUserSpent: (userId: string) => number;
  canExecute: (userId: string, estimatedCost: number) => boolean;
  recordCost: (userId: string, cost: number) => void;
}

export interface TelemetryClient {
  trace: <T>(name: string, fn: () => Promise<T>, attributes?: Record<string, any>) => Promise<T>;
  span: <T>(name: string, fn: () => Promise<T>, attributes?: Record<string, any>) => Promise<T>;
  metric: (name: string, value: number, attributes?: Record<string, any>) => void;
  event: (name: string, attributes?: Record<string, any>) => void;
  error: (error: Error, attributes?: Record<string, any>) => void;
}

export interface AgentRegistry {
  register: (agent: Agent) => void;
  get: (id: string) => Agent | undefined;
  getAll: () => Agent[];
  getByType: (type: AgentType) => Agent[];
  getBestForTask: (task: Task) => Agent | undefined;
  updatePerformance: (agentId: string, latency: number, success: boolean, tokens: number, cost: number) => void;
  getState: (agentId: string) => AgentState | undefined;
}

export interface ToolRegistry {
  register: (tool: Tool) => void;
  get: (id: string) => Tool | undefined;
  getAll: () => Tool[];
  getByCategory: (category: ToolCategory) => Tool[];
  findRelevant: (task: Task, context: OrchestrationContext) => Tool[];
  executeTool: (toolId: string, args: any, context: ToolContext) => Promise<ToolResult>;
}

export interface MemoryManager {
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
}
