// src/lib/orchestrator/supervisor/supervisorAgent.ts
// Intelligent supervisor that decomposes tasks and routes to specialized agents

import { Task, TaskType, TaskStatus, DecompositionPlan, ExecutionResult, OrchestrationContext, AgentRegistry, Agent } from '../types';
import { ResearchAgent, CodeAgent, AnalysisAgent, WritingAgent, ReviewAgent } from '../agents/specializedAgents';

export class SupervisorAgent {
  private context: OrchestrationContext;
  private agentRegistry: AgentRegistry;

  constructor(context: OrchestrationContext) {
    this.context = context;
    this.agentRegistry = context.agents;
  }

  async orchestrate(task: Task): Promise<ExecutionResult> {
    // Update task status
    task.status = 'planning';

    // Step 1: Decompose task
    const plan = await this.decompose(task);
    task.status = 'decomposing';

    // Step 2: Execute plan
    const result = await this.executePlan(plan);

    // Step 3: Update task
    task.status = result.success ? 'completed' : 'failed';
    task.completedAt = new Date();
    task.actualCost = result.cost;
    task.actualTokens = result.tokensUsed;

    return result;
  }

  private async decompose(task: Task): Promise<DecompositionPlan> {
    // For simple tasks, don't decompose
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

    // For complex tasks, create subtasks
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

  private isSimple(task: Task): boolean {
    const complexityIndicators = [
      task.description.length > 500,
      task.estimatedTokens && task.estimatedTokens > 2000,
      task.type === 'research' || task.type === 'analysis',
      task.subtasks && task.subtasks.length > 0,
    ];
    return !complexityIndicators.some(Boolean);
  }

  private createSubtasks(parentTask: Task): Task[] {
    const subtasks: Task[] = [];

    switch (parentTask.type) {
      case 'research':
        subtasks.push(
          this.createSubtask(parentTask, 'search', 'Gather information', 'research'),
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

      case 'automation':
        subtasks.push(
          this.createSubtask(parentTask, 'planning', 'Plan automation', 'planner'),
          this.createSubtask(parentTask, 'code_generation', 'Implement solution', 'developer'),
          this.createSubtask(parentTask, 'testing', 'Test solution', 'tester')
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

  private createSubtask(parent: Task, type: TaskType, description: string, agentType: string): Task {
    return {
      id: `${parent.id}-${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      description: `${description}: ${parent.description}`,
      input: parent.input,
      expectedOutput: parent.expectedOutput,
      priority: parent.priority,
      parentTaskId: parent.id,
      status: 'pending' as TaskStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: { ...parent.metadata, parentType: parent.type },
    };
  }

  private calculateDependencies(subtasks: Task[]): Array<[string, string]> {
    const dependencies: Array<[string, string]> = [];

    for (let i = 1; i < subtasks.length; i++) {
      dependencies.push([subtasks[i].id, subtasks[i - 1].id]);
    }

    return dependencies;
  }

  private identifyParallelGroups(subtasks: Task[], dependencies: Array<[string, string]>): string[][] {
    if (dependencies.length === 0) {
      return [subtasks.map((s) => s.id)];
    }

    // Find tasks with no dependencies
    const dependentTasks = new Set(dependencies.map((d) => d[0]));
    const independentTasks = subtasks.filter((t) => !dependentTasks.has(t.id));

    const groups: string[][] = [];
    if (independentTasks.length > 0) {
      groups.push(independentTasks.map((t) => t.id));
    }

    // Add dependent tasks in dependency order
    dependencies.forEach(([taskId]) => {
      if (!groups.some((g) => g.includes(taskId))) {
        groups.push([taskId]);
      }
    });

    return groups;
  }

  private async executePlan(plan: DecompositionPlan): Promise<ExecutionResult> {
    const results: ExecutionResult[] = [];

    // Execute each parallel group sequentially
    for (const group of plan.parallelizableGroups) {
      const groupResults = await this.executeGroup(group, plan.subtasks);
      results.push(...groupResults);

      // Check if any failed
      const failed = groupResults.filter((r) => !r.success);
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

    // Synthesize final result
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

  private async executeGroup(
    group: string[],
    subtasks: Task[]
  ): Promise<ExecutionResult[]> {
    const results: ExecutionResult[] = [];

    // Execute tasks in group (they should be independent)
    for (const taskId of group) {
      const subtask = subtasks.find(t => t.id === taskId);
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

      // In a real implementation, this would invoke the actual agent
      const result = await this.invokeAgent(agent, subtask);
      results.push(result);
    }

    return results;
  }

  private findTask(taskId: string): Task | undefined {
    // This is now handled in executeGroup by passing the subtasks list
    return undefined;
  }

  private async invokeAgent(agent: Agent, task: Task): Promise<ExecutionResult> {
    // Instantiate the correct agent class based on type
    let agentInstance;
    switch (agent.type) {
      case 'researcher':
        agentInstance = new ResearchAgent(agent, this.context);
        break;
      case 'developer':
        agentInstance = new CodeAgent(agent, this.context);
        break;
      case 'analyst':
        agentInstance = new AnalysisAgent(agent, this.context);
        break;
      case 'writer':
        agentInstance = new WritingAgent(agent, this.context);
        break;
      case 'reviewer':
        agentInstance = new ReviewAgent(agent, this.context);
        break;
      default:
        // Fallback to mock for unknown types
        return this.mockInvoke(agent, task);
    }

    try {
      task.status = 'in_progress';
      const result = await agentInstance.execute(task);
      
      // Update agent performance in registry
      this.agentRegistry.updatePerformance(
        agent.id, 
        result.executionTime, 
        result.success, 
        result.tokensUsed, 
        result.cost
      );

      return result;
    } catch (error) {
      return {
        taskId: task.id,
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
        tokensUsed: 0,
        cost: 0,
        executionTime: 0,
        agentId: agent.id,
        modelUsed: agent.model.model,
        retries: 0,
      };
    }
  }

  private async mockInvoke(agent: Agent, task: Task): Promise<ExecutionResult> {
    const executionTime = Math.floor(Math.random() * 3000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, 50));
    return {
      taskId: task.id,
      success: true,
      output: `Mock result from ${agent.name} for ${task.type}`,
      tokensUsed: 1000,
      cost: 0.005,
      executionTime,
      agentId: agent.id,
      modelUsed: agent.model.model,
      retries: 0,
    };
  }

  private synthesizeResults(results: ExecutionResult[]): any {
    const successful = results.filter((r) => r.success);
    return {
      summary: `Completed ${successful.length}/${results.length} subtasks`,
      details: successful.map((r) => ({
        taskId: r.taskId,
        output: r.output,
        agentId: r.agentId,
      })),
    };
  }

  private estimateTokens(task: Task): number {
    const baseTokens = 500;
    const typeMultipliers: Record<TaskType, number> = {
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
      search: 2,
    };
    return baseTokens * (typeMultipliers[task.type] || 1);
  }

  private estimateCost(task: Task): number {
    const tokens = this.estimateTokens(task);
    return tokens * 0.00003; // Rough estimate: $0.03 per 1K tokens
  }
}
