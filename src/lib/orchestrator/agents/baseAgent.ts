// src/lib/orchestrator/agents/baseAgent.ts
// Base agent class with memory, tool usage, and MCP support

import { Agent, Task, ExecutionResult, Tool, ToolContext, MemoryManager, OrchestrationContext, ToolRegistry } from '../types';

export abstract class BaseAgent {
  protected agent: Agent;
  protected memory: MemoryManager;
  protected tools: ToolRegistry;
  protected context: OrchestrationContext;

  constructor(agent: Agent, context: OrchestrationContext) {
    this.agent = agent;
    this.context = context;
    this.memory = context.memory;
    this.tools = context.tools;
  }

  async execute(task: Task): Promise<ExecutionResult> {
    const startTime = Date.now();
    const startTokens = this.getEstimatedTokens(task);

    try {
      // Store task in working memory
      await this.memory.working.set(`current_task_${task.id}`, task);

      // Execute with ReAct pattern
      const result = await this.executeWithReAct(task);

      const executionTime = Date.now() - startTime;
      const tokensUsed = Math.max(100, this.getEstimatedTokens(task) + result.output?.length || 0);
      const cost = this.calculateCost(tokensUsed);

      await this.memory.episodic.append({
        type: 'episodic',
        content: JSON.stringify({ task: task.description, result: result.output, success: result.success }),
        metadata: {
          taskId: task.id,
          agentId: this.agent.id,
          timestamp: new Date(),
          importance: task.priority === 'critical' ? 0.9 : 0.5,
          tags: [task.type, this.agent.type],
        },
      });

      this.context.costTracker.recordCost('system', cost);
      this.context.telemetry.metric('agent.task.completed', 1, { agentType: this.agent.type, success: result.success });

      return {
        ...result,
        tokensUsed,
        cost,
        executionTime,
        agentId: this.agent.id,
        modelUsed: this.agent.model.model,
        retries: 0,
      };
    } catch (error) {
      this.context.telemetry.error(error as Error, { agentId: this.agent.id, taskId: task.id });
      return {
        taskId: task.id,
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
        tokensUsed: startTokens,
        cost: 0,
        executionTime: Date.now() - startTime,
        agentId: this.agent.id,
        modelUsed: this.agent.model.model,
        retries: 0,
      };
    }
  }

  protected abstract executeWithReAct(task: Task): Promise<ExecutionResult>;

  protected async useTool(toolId: string, args: any): Promise<{ success: boolean; data?: any; error?: string }> {
    const tool = this.tools.get(toolId);
    if (!tool) {
      return { success: false, error: `Tool not found: ${toolId}` };
    }

    const toolContext: ToolContext = {
      taskId: 'current',
      agentId: this.agent.id,
      memory: this.memory,
      traceId: this.context.traceId,
    };

    try {
      const result = await this.tools.executeTool(toolId, args, toolContext);
      return { success: result.success, data: result.data, error: result.error };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  protected async recallRelevantMemory(query: string): Promise<string[]> {
    const memories = await this.memory.recall(query, { agentId: this.agent.id });
    return memories.map((m) => m.content);
  }

  protected getEstimatedTokens(task: Task): number {
    const baseTokens = 1000;
    const descriptionTokens = task.description.length / 4;
    const inputTokens = JSON.stringify(task.input).length / 4;
    return Math.ceil(baseTokens + descriptionTokens + inputTokens);
  }

  private calculateCost(tokens: number): number {
    const inputCost = (tokens / 2) * (this.agent.costPer1KInput / 1000);
    const outputCost = (tokens / 2) * (this.agent.costPer1KOutput / 1000);
    return inputCost + outputCost;
  }
}
