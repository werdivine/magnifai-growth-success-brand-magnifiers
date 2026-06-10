// scripts/test-workflow-standalone.js
/**
 * Standalone test script to verify AgentWorkflow functionality
 * This is a self-contained version that doesn't require TypeScript compilation
 * 
 * Run with: node scripts/test-workflow-standalone.js
 */

// Mock crypto for UUID generation
const crypto = require('crypto');

// ============================================
// Core Type Definitions
// ============================================

// Task types
const TASK_TYPES = [
  'research', 'code_generation', 'code_review', 'analysis', 'writing',
  'editing', 'testing', 'deployment', 'data_processing', 'automation',
  'planning', 'review', 'debugging', 'optimization'
];

const TASK_STATUSES = [
  'pending', 'planning', 'decomposing', 'assigned', 'in_progress',
  'blocked', 'needs_review', 'completed', 'failed', 'cancelled'
];

// ============================================
// In-Memory Registries
// ============================================

class InMemoryAgentRegistry {
  constructor() {
    this.agents = new Map();
    this.agentStates = new Map();
  }

  register(agent) {
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

  get(id) {
    return this.agents.get(id);
  }

  getAll() {
    return Array.from(this.agents.values());
  }

  getByType(type) {
    return this.getAll().filter(a => a.type === type);
  }

  getBestForTask(task) {
    const candidates = this.getAll().filter(agent =>
      agent.capabilities.some(cap =>
        task.type.includes(cap) ||
        task.description.toLowerCase().includes(cap)
      )
    );

    if (candidates.length === 0) return undefined;

    return candidates.reduce((best, current) => {
      const currentState = this.agentStates.get(current.id);
      const bestState = this.agentStates.get(best.id);

      const currentScore =
        current.capabilities.filter(c =>
          task.type.includes(c) || task.description.toLowerCase().includes(c)
        ).length * 10 +
        currentState.performance.successRate -
        (current.costPer1KInput + current.costPer1KOutput) * 0.1;

      const bestScore =
        best.capabilities.filter(c =>
          task.type.includes(c) || task.description.toLowerCase().includes(c)
        ).length * 10 +
        bestState.performance.successRate -
        (best.costPer1KInput + best.costPer1KOutput) * 0.1;

      return currentScore > bestScore ? current : best;
    });
  }

  updatePerformance(agentId, latency, success, tokens, cost) {
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

  getState(agentId) {
    return this.agentStates.get(agentId);
  }
}

class InMemoryToolRegistry {
  constructor() {
    this.tools = new Map();
  }

  register(tool) {
    this.tools.set(tool.id, tool);
  }

  get(id) {
    return this.tools.get(id);
  }

  getAll() {
    return Array.from(this.tools.values());
  }

  getByCategory(category) {
    return this.getAll().filter(t => t.category === category);
  }
}

class SimpleCostTracker {
  constructor(config) {
    this.dailyBudget = config.dailyBudget;
    this.dailySpent = 0;
    this.monthlyBudget = config.monthlyBudget;
    this.monthlySpent = 0;
    this.perUserBudget = config.perUserBudget;
    this.userSpending = new Map();
  }

  getUserSpent(userId) {
    return this.userSpending.get(userId) || 0;
  }

  canExecute(userId, estimatedCost) {
    const userSpent = this.getUserSpent(userId);
    return (
      this.dailySpent + estimatedCost <= this.dailyBudget &&
      this.monthlySpent + estimatedCost <= this.monthlyBudget &&
      userSpent + estimatedCost <= this.perUserBudget
    );
  }

  recordCost(userId, cost) {
    this.dailySpent += cost;
    this.monthlySpent += cost;
    this.userSpending.set(userId, this.getUserSpent(userId) + cost);
  }
}

class ConsoleTelemetryClient {
  trace(name, fn, attributes) {
    console.log(`[TRACE] ${name}`, attributes);
    const start = Date.now();
    return fn().then(result => {
      console.log(`[TRACE] ${name} completed in ${Date.now() - start}ms`);
      return result;
    });
  }

  span(name, fn, attributes) {
    console.log(`[SPAN] ${name}`, attributes);
    return fn();
  }

  metric(name, value, attributes) {
    console.log(`[METRIC] ${name}: ${value}`, attributes);
  }

  event(name, attributes) {
    console.log(`[EVENT] ${name}`, attributes);
  }

  error(error, attributes) {
    console.error(`[ERROR] ${error.message}`, error, attributes);
  }
}

class SimpleMemoryManager {
  constructor() {
    const workingStore = new Map();
    const semanticStore = [];
    const episodicStore = [];

    this.working = {
      set: async (key, value, ttl) => {
        workingStore.set(key, {
          value,
          expiresAt: ttl ? new Date(Date.now() + ttl * 1000) : undefined,
        });
      },
      get: async (key) => {
        const item = workingStore.get(key);
        if (item && item.expiresAt && item.expiresAt < new Date()) {
          workingStore.delete(key);
          return null;
        }
        return item?.value || null;
      },
      delete: async (key) => {
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
      search: async (query, filters, limit = 10) => {
        const queryEmb = this.mockEmbed(query);
        return semanticStore
          .map(entry => ({
            entry,
            score: this.cosineSimilarity(queryEmb, entry.embedding || []),
          }))
          .filter(({ score }) => score > 0.3)
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
          .map(({ entry }) => entry);
      },
      delete: async (id) => {
        const idx = semanticStore.findIndex(e => e.id === id);
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
        return episodicStore.find(e => e.id === id) || null;
      },
      query: async (timeRange) => {
        return episodicStore.filter(
          e => e.metadata.timestamp >= timeRange.start && e.metadata.timestamp <= timeRange.end
        );
      },
    };

    this.recall = async (query) => {
      return this.semantic.search(query);
    };
  }

  mockEmbed(text) {
    const hash = text.split('').reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
    return Array.from({ length: 384 }, (_, i) => Math.sin((hash + i) * 0.1));
  }

  cosineSimilarity(a, b) {
    if (a.length !== b.length || a.length === 0) return 0;
    const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
    const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
    return dot / (magA * magB + 1e-8);
  }
}

// ============================================
// Mock Tools
// ============================================

function createDefaultTools() {
  return [
    {
      id: 'web_search',
      name: 'Web Search',
      description: 'Search the web for information',
      category: 'search',
      handler: async (args) => ({
        success: true,
        data: [{ title: `Results for ${args.query}`, url: 'https://example.com', snippet: 'Mock result' }],
        toolCallId: crypto.randomUUID(),
        executionTime: 100,
        tokensUsed: 50,
      }),
    },
    {
      id: 'read_file',
      name: 'Read File',
      description: 'Read file contents',
      category: 'file_system',
      handler: async (args) => ({
        success: true,
        data: { content: 'File content' },
        toolCallId: crypto.randomUUID(),
        executionTime: 50,
        tokensUsed: 10,
      }),
    },
    {
      id: 'calculator',
      name: 'Calculator',
      description: 'Perform calculations',
      category: 'utility',
      handler: async (args) => ({
        success: true,
        data: { result: eval(args.expression) },
        toolCallId: crypto.randomUUID(),
        executionTime: 10,
        tokensUsed: 10,
      }),
    },
  ];
}

// ============================================
// Agent Definitions
// ============================================

function createDefaultAgents(registry) {
  const agents = [
    {
      id: 'supervisor-001',
      name: 'Master Supervisor',
      type: 'supervisor',
      description: 'Main orchestrator that decomposes and coordinates tasks',
      capabilities: ['planning', 'coordination', 'decomposition', 'optimization'],
      model: { provider: 'openai', model: 'gpt-4o', temperature: 0.3, maxTokens: 4000 },
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
      model: { provider: 'openai', model: 'gpt-4o-mini', temperature: 0.5, maxTokens: 4000 },
      systemPrompt: 'You are a research specialist. Find relevant information, analyze sources, and provide comprehensive summaries with citations.',
      tools: ['web_search'],
      temperature: 0.5,
      maxTokens: 4000,
      costPer1KInput: 0.00015,
      costPer1KOutput: 0.0006,
    },
    {
      id: 'writer-001',
      name: 'Content Writer',
      type: 'writer',
      description: 'Creates clear, engaging written content',
      capabilities: ['writing', 'editing', 'communication'],
      model: { provider: 'openai', model: 'gpt-4o-mini', temperature: 0.6, maxTokens: 4000 },
      systemPrompt: 'You are a skilled writer. Create clear, engaging content tailored to the audience.',
      tools: [],
      temperature: 0.6,
      maxTokens: 4000,
      costPer1KInput: 0.00015,
      costPer1KOutput: 0.0006,
    },
  ];

  agents.forEach(agent => registry.register(agent));
}

// ============================================
// Supervisor Agent
// ============================================

class SupervisorAgent {
  constructor(context) {
    this.context = context;
    this.agentRegistry = context.agents;
  }

  async orchestrate(task) {
    task.status = 'planning';

    const plan = await this.decompose(task);
    task.status = 'decomposing';

    const result = await this.executePlan(plan);

    task.status = result.success ? 'completed' : 'failed';
    task.completedAt = new Date();
    task.actualCost = result.cost;
    task.actualTokens = result.tokensUsed;

    return result;
  }

  isSimple(task) {
    const complexityIndicators = [
      task.description.length > 500,
      task.estimatedTokens && task.estimatedTokens > 2000,
      task.type === 'research' || task.type === 'analysis',
      task.subtasks && task.subtasks.length > 0,
    ];
    return !complexityIndicators.some(Boolean);
  }

  async decompose(task) {
    if (this.isSimple(task)) {
      return {
        taskId: task.id,
        subtasks: [task],
        dependencies: [],
        estimatedTotalTokens: task.estimatedTokens || 1000,
        estimatedTotalCost: task.estimatedCost || 0.005,
        parallelizableGroups: [[task.id]],
      };
    }

    const subtasks = this.createSubtasks(task);
    const dependencies = this.calculateDependencies(subtasks);
    const groups = this.identifyParallelGroups(subtasks, dependencies);

    const totalTokens = subtasks.reduce((sum, t) => sum + (t.estimatedTokens || 500), 0);
    const totalCost = subtasks.reduce((sum, t) => sum + (t.estimatedCost || 0.003), 0);

    return {
      taskId: task.id,
      subtasks,
      dependencies,
      estimatedTotalTokens: totalTokens,
      estimatedTotalCost: totalCost,
      parallelizableGroups: groups,
    };
  }

  createSubtasks(parentTask) {
    const subtasks = [];

    switch (parentTask.type) {
      case 'research':
        subtasks.push(
          this.createSubtask(parentTask, 'research', 'Gather information', 'research'),
          this.createSubtask(parentTask, 'analysis', 'Analyze findings', 'analysis'),
          this.createSubtask(parentTask, 'writing', 'Synthesize results', 'writing')
        );
        break;

      case 'code_generation':
        subtasks.push(
          this.createSubtask(parentTask, 'analysis', 'Analyze requirements', 'analysis'),
          this.createSubtask(parentTask, 'code_generation', 'Generate code', 'developer'),
          this.createSubtask(parentTask, 'code_review', 'Review code', 'reviewer')
        );
        break;

      default:
        subtasks.push({
          ...parentTask,
          id: `${parentTask.id}-sub-0`,
          parentTaskId: parentTask.id,
          status: 'pending',
        });
    }

    return subtasks.map((t, i) => ({
      ...t,
      estimatedTokens: this.estimateTokens(t),
      estimatedCost: this.estimateCost(t),
      priority: parentTask.priority,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  createSubtask(parent, type, description) {
    return {
      id: `${parent.id}-${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      description: `${description}: ${parent.description}`,
      input: parent.input,
      expectedOutput: parent.expectedOutput,
      priority: parent.priority,
      parentTaskId: parent.id,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: { ...parent.metadata, parentType: parent.type },
    };
  }

  calculateDependencies(subtasks) {
    const dependencies = [];

    for (let i = 1; i < subtasks.length; i++) {
      dependencies.push([subtasks[i].id, subtasks[i - 1].id]);
    }

    return dependencies;
  }

  identifyParallelGroups(subtasks, dependencies) {
    if (dependencies.length === 0) {
      return [subtasks.map(s => s.id)];
    }

    const dependentTasks = new Set(dependencies.map(d => d[0]));
    const independentTasks = subtasks.filter(t => !dependentTasks.has(t.id));

    const groups = [];
    if (independentTasks.length > 0) {
      groups.push(independentTasks.map(t => t.id));
    }

    dependencies.forEach(([taskId]) => {
      if (!groups.some(g => g.includes(taskId))) {
        groups.push([taskId]);
      }
    });

    return groups;
  }

  async executePlan(plan) {
    const results = [];

    for (const group of plan.parallelizableGroups) {
      const groupResults = await this.executeGroup(group, plan.dependencies);
      results.push(...groupResults);

      const failed = groupResults.filter(r => !r.success);
      if (failed.length > 0) {
        return {
          taskId: plan.taskId,
          success: false,
          error: new Error(`Subtask failed: ${failed[0].error?.message}`),
          subtaskResults: results,
          tokensUsed: results.reduce((sum, r) => sum + r.tokensUsed, 0),
          cost: results.reduce((sum, r) => sum + r.cost, 0),
          executionTime: results.reduce((sum, r) => sum + r.executionTime, 0),
          agentId: 'supervisor',
          modelUsed: 'gpt-4o',
          retries: 0,
        };
      }
    }

    const finalOutput = this.synthesizeResults(results);

    return {
      taskId: plan.taskId,
      success: true,
      output: finalOutput,
      subtaskResults: results,
      tokensUsed: results.reduce((sum, r) => sum + r.tokensUsed, 0),
      cost: results.reduce((sum, r) => sum + r.cost, 0),
      executionTime: results.reduce((sum, r) => sum + r.executionTime, 0),
      agentId: 'supervisor',
      modelUsed: 'gpt-4o',
      retries: 0,
    };
  }

  async executeGroup(group, dependencies) {
    const results = [];

    for (const taskId of group) {
      const subtask = this.findTask(taskId);
      if (!subtask) continue;

      const agent = this.agentRegistry.getBestForTask(subtask);
      if (!agent) {
        results.push({
          taskId,
          success: false,
          error: new Error(`No suitable agent found for task: ${subtask.type}`),
          tokensUsed: 0,
          cost: 0,
          executionTime: 0,
          agentId: 'none',
          modelUsed: 'none',
          retries: 0,
        });
        continue;
      }

      subtask.status = 'assigned';

      const result = await this.invokeAgent(agent, subtask);
      results.push(result);
    }

    return results;
  }

  findTask(taskId) {
    return undefined;
  }

  async invokeAgent(agent, task) {
    const executionTime = Math.floor(Math.random() * 3000) + 1000;

    await new Promise(resolve => setTimeout(resolve, 10));

    return {
      taskId: task.id,
      success: Math.random() > 0.1,
      output: `Result from ${agent.name} for ${task.type}: Successfully analyzed and processed '${task.description}'`,
      error: Math.random() > 0.9 ? new Error('Simulated failure') : undefined,
      tokensUsed: Math.floor(Math.random() * 2000) + 500,
      cost: Math.random() * 0.02,
      executionTime,
      agentId: agent.id,
      modelUsed: agent.model.model,
      retries: 0,
    };
  }

  synthesizeResults(results) {
    const successful = results.filter(r => r.success);
    return {
      summary: `Completed ${successful.length}/${results.length} subtasks`,
      details: successful.map(r => ({
        taskId: r.taskId,
        output: r.output,
        agentId: r.agentId,
      })),
    };
  }

  estimateTokens(task) {
    const baseTokens = 500;
    const typeMultipliers = {
      research: 3,
      code_generation: 3,
      code_review: 2,
      analysis: 3,
      writing: 2,
      editing: 1,
      testing: 2,
      deployment: 1,
      data_processing: 2,
      automation: 3,
      planning: 2,
      review: 1,
      debugging: 3,
      optimization: 2,
    };
    return baseTokens * (typeMultipliers[task.type] || 1);
  }

  estimateCost(task) {
    const tokens = this.estimateTokens(task);
    return tokens * 0.00003;
  }
}

// ============================================
// Main AgentWorkflow Class
// ============================================

class AgentWorkflow {
  constructor(config = {}) {
    this.status = 'idle';
    this.config = {
      maxDepth: 5,
      maxRetries: 3,
      timeout: 300000,
      enableParallel: true,
      ...config,
    };

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

    createDefaultTools().forEach(tool => toolRegistry.register(tool));
    createDefaultAgents(agentRegistry);

    this.context = {
      traceId: crypto.randomUUID(),
      sessionId: crypto.randomUUID(),
      taskId: crypto.randomUUID(),
      depth: 0,
      maxDepth: this.config.maxDepth,
      memory,
      tools: toolRegistry,
      agents: agentRegistry,
      costTracker,
      telemetry,
    };

    this.supervisor = new SupervisorAgent(this.context);
    this.taskHistory = [];
  }

  async run(taskInput) {
    this.status = 'running';

    const task = {
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
      if (!this.context.costTracker.canExecute(this.context.userId || 'anonymous', task.estimatedCost || 0.01)) {
        throw new Error('Insufficient budget for task execution');
      }

      const result = await this.supervisor.orchestrate(task);

      this.status = result.success ? 'completed' : 'failed';
      return result;
    } catch (error) {
      this.status = 'failed';
      this.context.telemetry.error(error);

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

  getStatus() {
    return {
      status: this.status,
      tasks: this.taskHistory,
      agents: this.context.agents.getAll().map(a => ({
        id: a.id,
        name: a.name,
        type: a.type,
        status: this.context.agents.getState(a.id)?.status || 'idle',
      })),
      memory: {
        workingSize: 0,
        semanticSize: 0,
        episodicSize: 0,
      },
      cost: {
        dailySpent: this.context.costTracker.dailySpent,
        monthlySpent: this.context.costTracker.monthlySpent,
      },
    };
  }

  reset() {
    this.status = 'idle';
    this.taskHistory = [];
    this.context.memory.working.clear();
  }
}

// ============================================
// Run Test
// ============================================

async function main() {
  console.log('='.repeat(60));
  console.log('AgentWorkflow System Test');
  console.log('='.repeat(60));
  console.log('');
  console.log('Initializing AgentWorkflow...');
  
  const workflow = new AgentWorkflow({
    maxDepth: 3,
    maxRetries: 2,
    timeout: 60000,
    enableParallel: true,
    costTracking: {
      dailyBudget: 100,
      monthlyBudget: 1000,
      perUserBudget: 50,
    },
  });

  console.log('✓ Workflow initialized successfully');
  console.log('');
  console.log('Test Task:');
  console.log('  Description: "Research JavaScript frameworks"');
  console.log('  Type: research');
  console.log('  Priority: medium');
  console.log('');
  console.log('-'.repeat(60));
  console.log('Running task...');
  console.log('-'.repeat(60));
  console.log('');

  try {
    const result = await workflow.run({
      description: 'Research JavaScript frameworks',
      type: 'research',
      priority: 'medium',
      input: {
        topic: 'JavaScript frameworks',
        focus: 'comparison, features, use cases',
        sources: 5,
      },
    });

    console.log('✓ Task execution completed');
    console.log('');
    console.log('Result:');
    console.log(JSON.stringify(result, null, 2));
    console.log('');
    
    const status = workflow.getStatus();
    console.log('Workflow Status:');
    console.log(JSON.stringify(status, null, 2));
    console.log('');
    
    console.log('='.repeat(60));
    if (result.success) {
      console.log('✓ TEST PASSED: Workflow executed successfully');
    } else {
      console.log('✗ TEST FAILED: Workflow execution failed');
    }
    console.log('='.repeat(60));
    
    process.exit(result.success ? 0 : 1);
  } catch (error) {
    console.error('');
    console.error('✗ Error running workflow:', error);
    console.error('');
    console.log('='.repeat(60));
    console.log('✗ TEST FAILED: Error during execution');
    console.log('='.repeat(60));
    process.exit(1);
  }
}

// Run the main function
main().catch(error => {
  console.error('');
  console.error('✗ Fatal error:', error);
  console.log('='.repeat(60));
  console.log('✗ TEST FAILED: Fatal error during execution');
  console.log('='.repeat(60));
  process.exit(1);
});
