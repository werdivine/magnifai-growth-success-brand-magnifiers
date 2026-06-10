// src/lib/orchestrator/index.ts
// Public API for the Advanced Multi-Agent Orchestrator

import { AgentWorkflow } from './workflow';
import { Task, TaskType, TaskStatus, AgentType, ToolCategory } from './types';
import { InMemoryAgentRegistry, InMemoryToolRegistry, SimpleMemoryManager, SimpleCostTracker, ConsoleTelemetryClient } from './registry';
import { createDefaultTools } from './tools/toolRegistry';

// Main export
export { AgentWorkflow };

// Type exports
export type {
  Task,
  TaskType,
  TaskStatus,
  AgentType,
  ToolCategory,
};

// Factory function for quick setup
export function createOrchestrator(config?: ConstructorParameters<typeof AgentWorkflow>[0]): AgentWorkflow {
  return new AgentWorkflow(config);
}

// Advanced configuration builder
export class OrchestratorBuilder {
  private config: any = {};

  withMaxDepth(depth: number): OrchestratorBuilder {
    this.config.maxDepth = depth;
    return this;
  }

  withMaxRetries(retries: number): OrchestratorBuilder {
    this.config.maxRetries = retries;
    return this;
  }

  withTimeout(ms: number): OrchestratorBuilder {
    this.config.timeout = ms;
    return this;
  }

  withCostTracking(daily: number, monthly: number, perUser: number): OrchestratorBuilder {
    this.config.costTracking = { dailyBudget: daily, monthlyBudget: monthly, perUserBudget: perUser };
    return this;
  }

  withParallelExecution(enabled: boolean): OrchestratorBuilder {
    this.config.enableParallel = enabled;
    return this;
  }

  build(): AgentWorkflow {
    return new AgentWorkflow(this.config);
  }
}

// Pre-configured profiles
export const Profiles = {
  fast: {
    maxDepth: 3,
    maxRetries: 1,
    timeout: 60000,
    enableParallel: true,
    costTracking: { dailyBudget: 50, monthlyBudget: 500, perUserBudget: 20 },
  },
  balanced: {
    maxDepth: 5,
    maxRetries: 3,
    timeout: 300000,
    enableParallel: true,
    costTracking: { dailyBudget: 100, monthlyBudget: 1000, perUserBudget: 50 },
  },
  thorough: {
    maxDepth: 8,
    maxRetries: 5,
    timeout: 900000,
    enableParallel: true,
    costTracking: { dailyBudget: 500, monthlyBudget: 5000, perUserBudget: 200 },
  },
} as const;

// Convenience function
export async function executeTask(
  description: string,
  type: TaskType,
  options?: {
    input?: any;
    priority?: Task['priority'];
    profile?: keyof typeof Profiles;
  }
) {
  const profile = options?.profile || 'balanced';
  const workflow = new AgentWorkflow(Profiles[profile]);
  return workflow.run({ description, type, input: options?.input, priority: options?.priority });
}

// Example usage:
// const orchestrator = new AgentWorkflow();
// const result = await orchestrator.run({
//   description: 'Research and analyze the latest AI trends',
//   type: 'research',
//   priority: 'high',
// });
// console.log(result);
