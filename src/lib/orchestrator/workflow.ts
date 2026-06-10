// src/lib/orchestrator/workflow.ts
// Main workflow graph using state machine pattern

import { Task, TaskType, TaskStatus, OrchestrationContext, ExecutionResult, DecompositionPlan, AgentType, Agent } from './types';
import { SupervisorAgent } from './supervisor/supervisorAgent';
import { InMemoryAgentRegistry, InMemoryToolRegistry, SimpleMemoryManager, SimpleCostTracker, ConsoleTelemetryClient } from './registry';
import { createDefaultTools } from './tools/toolRegistry';

export type WorkflowStatus = 'idle' | 'running' | 'completed' | 'failed' | 'paused';

export interface WorkflowConfig {
  maxDepth?: number;
  maxRetries?: number;
  timeout?: number;
  enableParallel?: boolean;
  costTracking?: {
    dailyBudget: number;
    monthlyBudget: number;
    perUserBudget: number;
  };
}

export class AgentWorkflow {
  private status: WorkflowStatus = 'idle';
  private config: WorkflowConfig;
  private context: OrchestrationContext;
  private supervisor: SupervisorAgent;
  private taskHistory: Task[] = [];

  constructor(config: WorkflowConfig = {}) {
    this.config = {
      maxDepth: 5,
      maxRetries: 3,
      timeout: 300000, // 5 minutes
      enableParallel: true,
      ...config,
    };

    // Initialize registries
    const agentRegistry = new InMemoryAgentRegistry();
    const toolRegistry = new InMemoryToolRegistry();
    const memory = new SimpleMemoryManager();
    const costTracker = new SimpleCostTracker(
      this.config.costTracking || {
        dailyBudget: 100,
        monthlyBudget: 1000,
        perUserBudget: 50,
      }
    );
    const telemetry = new ConsoleTelemetryClient();

    // Register default tools
    createDefaultTools().forEach((tool) => toolRegistry.register(tool));

    // Create default agents
    this.createDefaultAgents(agentRegistry);

    this.context = {
      traceId: crypto.randomUUID(),
      sessionId: crypto.randomUUID(),
      taskId: crypto.randomUUID(),
      depth: 0,
      maxDepth: this.config.maxDepth!,
      memory,
      tools: toolRegistry,
      agents: agentRegistry,
      costTracker,
      telemetry,
    };

    this.supervisor = new SupervisorAgent(this.context);
  }

  private createDefaultAgents(registry: InMemoryAgentRegistry): void {
    const agents = [
      {
        id: 'supervisor-001',
        name: 'Master Supervisor',
        type: 'supervisor' as const,
        description: 'Main orchestrator that decomposes and coordinates tasks',
        capabilities: ['planning', 'coordination', 'decomposition', 'optimization'],
        model: {
          provider: 'openai',
          model: 'gpt-4o',
          temperature: 0.3,
          maxTokens: 4000,
        },
        systemPrompt: 'You are a master orchestrator. Decompose complex tasks into simpler subtasks and coordinate specialized agents to complete them efficiently.',
        tools: ['web_search'],
        temperature: 0.3,
        maxTokens: 4000,
        costPer1KInput: 0.005,
        costPer1KOutput: 0.015,
      },
      {
        id: 'researcher-001',
        name: 'Research Specialist',
        type: 'researcher',
        description: 'Gathers and synthesizes information from multiple sources',
        capabilities: ['research', 'search', 'analysis'],
        model: {
          provider: 'openai',
          model: 'gpt-4o-mini',
          temperature: 0.5,
          maxTokens: 4000,
        },
        systemPrompt: 'You are a research specialist. Find relevant information, analyze sources, and provide comprehensive summaries with citations.',
        tools: ['web_search'],
        temperature: 0.5,
        maxTokens: 4000,
        costPer1KInput: 0.00015,
        costPer1KOutput: 0.0006,
      },
      {
        id: 'developer-001',
        name: 'Code Generation Expert',
        type: 'developer',
        description: 'Writes, reviews, and debugs code across multiple languages',
        capabilities: ['code_generation', 'code_review', 'debugging'],
        model: {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet-20241022',
          temperature: 0.2,
          maxTokens: 4000,
        },
        systemPrompt: 'You are an expert software developer. Write clean, efficient, well-documented code. Follow best practices and include tests where appropriate.',
        tools: ['read_file', 'analyze_code'],
        temperature: 0.2,
        maxTokens: 4000,
        costPer1KInput: 0.003,
        costPer1KOutput: 0.015,
      },
      {
        id: 'analyst-001',
        name: 'Data Analyst',
        type: 'analyst',
        description: 'Analyzes data, identifies patterns, and generates insights',
        capabilities: ['analysis', 'data_processing', 'optimization'],
        model: {
          provider: 'openai',
          model: 'gpt-4o',
          temperature: 0.4,
          maxTokens: 4000,
        },
        systemPrompt: 'You are a data analyst. Analyze data, identify trends, and provide actionable insights with supporting evidence.',
        tools: ['calculator'],
        temperature: 0.4,
        maxTokens: 4000,
        costPer1KInput: 0.005,
        costPer1KOutput: 0.015,
      },
      {
        id: 'writer-001',
        name: 'Content Writer',
        type: 'writer',
        description: 'Creates clear, engaging written content for various purposes',
        capabilities: ['writing', 'editing', 'communication'],
        model: {
          provider: 'openai',
          model: 'gpt-4o-mini',
          temperature: 0.6,
          maxTokens: 4000,
        },
        systemPrompt: 'You are a skilled writer. Create clear, engaging, well-structured content tailored to the audience and purpose.',
        tools: [],
        temperature: 0.6,
        maxTokens: 4000,
        costPer1KInput: 0.00015,
        costPer1KOutput: 0.0006,
      },
    ];

    agents.forEach((agent) => registry.register(agent as Agent));
  }

  async run(taskInput: {
    description: string;
    type: TaskType;
    input?: any;
    priority?: Task['priority'];
  }): Promise<ExecutionResult> {
    this.status = 'running';

    const task: Task = {
      id: crypto.randomUUID(),
      type: taskInput.type,
      description: taskInput.description,
      input: taskInput.input || {},
      priority: taskInput.priority || 'medium',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: { workflowSession: this.context.sessionId },
    };

    this.taskHistory.push(task);

    try {
      // Check budget before execution
      if (!this.context.costTracker.canExecute(this.context.userId || 'anonymous', task.estimatedCost || 0.01)) {
        throw new Error('Insufficient budget for task execution');
      }

      // Execute via supervisor
      const result = await this.supervisor.orchestrate(task);

      this.status = result.success ? 'completed' : 'failed';
      return result;
    } catch (error) {
      this.status = 'failed';
      this.context.telemetry.error(error as Error);

      return {
        taskId: task.id,
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
        tokensUsed: 0,
        cost: 0,
        executionTime: 0,
        agentId: 'workflow',
        modelUsed: 'none',
        retries: 0,
      };
    }
  }

  getStatus(): {
    status: WorkflowStatus;
    tasks: Task[];
    agents: any[];
    memory: {
      workingSize: number;
      semanticSize: number;
      episodicSize: number;
    };
    cost: {
      dailySpent: number;
      monthlySpent: number;
    };
  } {
    return {
      status: this.status,
      tasks: this.taskHistory,
      agents: this.context.agents.getAll().map((a) => ({
        id: a.id,
        name: a.name,
        type: a.type,
        status: this.context.agents.getState(a.id)?.status || 'idle',
      })),
      memory: {
        workingSize: 0, // Would need to expose from memory manager
        semanticSize: 0,
        episodicSize: 0,
      },
      cost: {
        dailySpent: this.context.costTracker.dailySpent,
        monthlySpent: this.context.costTracker.monthlySpent,
      },
    };
  }

  reset(): void {
    this.status = 'idle';
    this.taskHistory = [];
    this.context.memory.working.clear();
  }
}
