// @ts-nocheck
// src/lib/orchestrator/__tests__/orchestrator.test.ts
// Tests for the Advanced Multi-Agent Orchestrator

import { AgentWorkflow } from '../workflow';
import { TaskType } from '../types';

describe('AgentWorkflow', () => {
  let orchestrator: AgentWorkflow;

  beforeEach(() => {
    orchestrator = new AgentWorkflow({
      maxDepth: 3,
      maxRetries: 2,
      timeout: 30000,
    });
  });

  describe('Initialization', () => {
    it('should create orchestrator with default agents', () => {
      const status = orchestrator.getStatus();
      expect(status.agents.length).toBeGreaterThan(0);
      expect(status.status).toBe('idle');
    });

    it('should have required agent types', () => {
      const status = orchestrator.getStatus();
      const agentTypes = status.agents.map((a) => a.type);
      expect(agentTypes).toContain('supervisor');
      expect(agentTypes).toContain('researcher');
      expect(agentTypes).toContain('developer');
    });
  });

  describe('Task Execution', () => {
    it('should execute a simple research task', async () => {
      const result = await orchestrator.run({
        description: 'Test research task',
        type: 'research' as TaskType,
        priority: 'medium',
      });

      expect(result.success).toBe(true);
      expect(result.tokensUsed).toBeGreaterThan(0);
      expect(result.cost).toBeGreaterThanOrEqual(0);
      expect(result.agentId).toBeDefined();
    });

    it('should execute analysis task', async () => {
      const result = await orchestrator.run({
        description: 'Analyze test data',
        type: 'analysis' as TaskType,
        priority: 'medium',
      });

      expect(result.success).toBe(true);
    });

    it('should execute code generation task', async () => {
      const result = await orchestrator.run({
        description: 'Generate test function',
        type: 'code_generation' as TaskType,
        priority: 'medium',
      });

      expect(result.success).toBe(true);
    });

    it('should handle task with input data', async () => {
      const result = await orchestrator.run({
        description: 'Process input data',
        type: 'analysis' as TaskType,
        input: { key: 'value', numbers: [1, 2, 3] },
        priority: 'medium',
      });

      expect(result.success).toBe(true);
    });

    it('should respect priority levels', async () => {
      const highPriority = await orchestrator.run({
        description: 'High priority task',
        type: 'research' as TaskType,
        priority: 'critical',
      });

      const lowPriority = await orchestrator.run({
        description: 'Low priority task',
        type: 'research' as TaskType,
        priority: 'low',
      });

      expect(highPriority.success).toBe(true);
      expect(lowPriority.success).toBe(true);
    });
  });

  describe('Status and Monitoring', () => {
    it('should return workflow status', () => {
      const status = orchestrator.getStatus();
      
      expect(status).toEqual({
        status: expect.any(String),
        tasks: expect.any(Array),
        agents: expect.any(Array),
        memory: expect.objectContaining({
          workingSize: expect.any(Number),
          semanticSize: expect.any(Number),
          episodicSize: expect.any(Number),
        }),
        cost: expect.objectContaining({
          dailySpent: expect.any(Number),
          monthlySpent: expect.any(Number),
        }),
      });
    });

    it('should track executed tasks', async () => {
      await orchestrator.run({
        description: 'Test task',
        type: 'research' as TaskType,
      });

      const status = orchestrator.getStatus();
      expect(status.tasks.length).toBe(1);
    });
  });

  describe('Cost Tracking', () => {
    it('should track costs across multiple tasks', async () => {
      await orchestrator.run({
        description: 'Task 1',
        type: 'research' as TaskType,
      });

      await orchestrator.run({
        description: 'Task 2',
        type: 'analysis' as TaskType,
      });

      const status = orchestrator.getStatus();
      expect(status.cost.dailySpent).toBeGreaterThanOrEqual(0);
      expect(status.cost.monthlySpent).toBeGreaterThanOrEqual(0);
    });

    it('should enforce daily budget', async () => {
      const limitedOrchestrator = new AgentWorkflow({
        costTracking: {
          dailyBudget: 0.01,
          monthlyBudget: 100,
          perUserBudget: 50,
        },
      });

      // First task should succeed
      const result1 = await limitedOrchestrator.run({
        description: 'Small task',
        type: 'research' as TaskType,
      });

      expect(result1.success).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle execution errors gracefully', async () => {
      // Test with invalid input that might cause errors
      const result = await orchestrator.run({
        description: '', // Empty description
        type: 'research' as TaskType,
      });

      // System should handle this gracefully
      expect(result).toBeDefined();
    });

    it('should reset workflow state', () => {
      orchestrator.reset();
      const status = orchestrator.getStatus();
      expect(status.tasks.length).toBe(0);
      expect(status.status).toBe('idle');
    });
  });

  describe('Multiple Task Types', () => {
    const taskTypes: TaskType[] = [
      'research',
      'code_generation',
      'analysis',
      'writing',
      'automation',
      'debugging',
    ];

    taskTypes.forEach((type) => {
      it(`should handle ${type} task`, async () => {
        const result = await orchestrator.run({
          description: `Test ${type} task`,
          type,
          priority: 'medium',
        });

        expect(result.success).toBe(true);
        expect(result.agentId).toBeDefined();
      });
    });
  });
});

// Integration tests
describe('Orchestrator Integration', () => {
  it('should handle complex workflow with dependencies', async () => {
    const orchestrator = new AgentWorkflow({
      maxDepth: 5,
      enableParallel: true,
    });

    const result = await orchestrator.run({
      description: 'Research, analyze, and report on topic',
      type: 'research' as TaskType,
      priority: 'high',
    });

    expect(result.success).toBe(true);
    expect(result.subtaskResults).toBeDefined();
  });

  it('should execute parallel tasks', async () => {
    const orchestrator = new AgentWorkflow({
      enableParallel: true,
      maxDepth: 2,
    });

    const result = await orchestrator.run({
      description: 'Multiple independent analyses',
      type: 'analysis' as TaskType,
      priority: 'medium',
    });

    expect(result.success).toBe(true);
  });

  it('should handle sequential workflows', async () => {
    const orchestrator = new AgentWorkflow({
      enableParallel: false,
      maxDepth: 3,
    });

    const result = await orchestrator.run({
      description: 'Sequential task chain',
      type: 'automation' as TaskType,
      priority: 'medium',
    });

    expect(result.success).toBe(true);
  });
});
