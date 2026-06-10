// src/lib/orchestrator/advanced-patterns.ts
// Advanced orchestration patterns and examples

import { AgentWorkflow, TaskType, createOrchestrator } from './index';

/**
 * Pattern 1: Sequential Chain (Linear Pipeline)
 * Best for: Tasks with clear, ordered steps
 */
export async function sequentialChain() {
  const orchestrator = new AgentWorkflow({
    maxDepth: 3,
    enableParallel: false, // Force sequential
  });

  // Task will be auto-decomposed into steps
  const result = await orchestrator.run({
    description: 'Research AI trends → Write article → Review content',
    type: 'research',
    priority: 'high',
  });

  return result;
}

/**
 * Pattern 2: Parallel Execution
 * Best for: Independent sub-tasks that can run simultaneously
 */
export async function parallelResearch() {
  const orchestrator = new AgentWorkflow({
    enableParallel: true,
    maxDepth: 2,
  });

  // Supervisor will identify these can run in parallel
  const result = await orchestrator.run({
    description: 'Research competitors, market trends, and technical requirements',
    type: 'research',
    priority: 'critical',
  });

  return result;
}

/**
 * Pattern 3: Hierarchical Decomposition
 * Best for: Complex, multi-phase projects
 */
export async function hierarchicalProject() {
  const orchestrator = new AgentWorkflow({
    maxDepth: 5,
    maxRetries: 3,
  });

  // Deep decomposition into phases → tasks → subtasks
  const result = await orchestrator.run({
    description: 'Plan and execute full-stack AI application deployment',
    type: 'automation',
    input: {
      requirements: 'Full-stack app with AI features',
      deadline: '2 weeks',
      team: 3,
    },
    priority: 'critical',
  });

  return result;
}

/**
 * Pattern 4: Tool-Intensive Workflow
 * Best for: Tasks requiring multiple tool integrations
 */
export async function toolIntensiveAnalysis() {
  const orchestrator = createOrchestrator({
    maxDepth: 4,
  });

  // Uses search, calculator, file_system, analysis tools
  const result = await orchestrator.run({
    description: 'Analyze financial data, calculate metrics, generate report',
    type: 'analysis',
    input: {
      datasets: ['revenue.csv', 'expenses.csv'],
      metrics: ['roi', 'growth_rate', 'profit_margin'],
    },
    priority: 'high',
  });

  return result;
}

/**
 * Pattern 5: Iterative Refinement
 * Best for: Quality-critical outputs requiring multiple iterations
 */
export async function iterativeRefinement() {
  const orchestrator = new AgentWorkflow({
    maxRetries: 5,
    maxDepth: 3,
  });

  // Multiple review cycles with feedback incorporation
  const result = await orchestrator.run({
    description: 'Develop and refine technical specification document',
    type: 'writing',
    priority: 'critical',
  });

  return result;
}

/**
 * Pattern 6: Memory-Augmented Workflow
 * Best for: Tasks requiring context from previous work
 */
export async function memoryAugmented() {
  const orchestrator = new AgentWorkflow();

  // Task 1: Build foundational knowledge
  await orchestrator.run({
    description: 'Research machine learning fundamentals',
    type: 'research',
    priority: 'high',
  });

  // Task 2: Apply that knowledge (memory will be used)
  const result = await orchestrator.run({
    description: 'Design ML architecture for recommendation system',
    type: 'automation',
    priority: 'high',
  });

  return result;
}

/**
 * Pattern 7: Multi-Agent Collaboration
 * Best for: Complex tasks requiring diverse expertise
 */
export async function multiAgentCollaboration() {
  const orchestrator = new AgentWorkflow({
    maxDepth: 4,
    enableParallel: true,
  });

  // Different agents handle different aspects
  const result = await orchestrator.run({
    description: 'Create comprehensive business plan with market analysis, financial projections, and technical roadmap',
    type: 'planning',
    input: {
      business: 'AI SaaS platform',
      market: 'Enterprise customers',
      timeline: '18 months',
    },
    priority: 'critical',
  });

  return result;
}

/**
 * Pattern 8: Error Recovery Workflow
 * Best for: High-reliability requirements with fallback strategies
 */
export async function errorRecoveryWorkflow() {
  const orchestrator = new AgentWorkflow({
    maxRetries: 5,
    timeout: 600000,
  });

  // Automatic retry with alternative agents/tools
  const result = await orchestrator.run({
    description: 'Extract and validate data from unreliable sources',
    type: 'data_processing',
    priority: 'high',
  });

  return result;
}

/**
 * Pattern 9: Real-Time Decision Support
 * Best for: Time-sensitive decisions with incomplete information
 */
export async function realTimeDecision() {
  const orchestrator = createOrchestrator({
    maxDepth: 2,
    timeout: 30000, // 30 second timeout
  });

  const result = await orchestrator.run({
    description: 'Analyze current situation and recommend immediate actions',
    type: 'analysis',
    input: {
      situation: 'Production incident detected',
      severity: 'critical',
      timePressure: 'high',
    },
    priority: 'critical',
  });

  return result;
}

/**
 * Pattern 10: Knowledge Synthesis
 * Best for: Combining information from multiple domains
 */
export async function knowledgeSynthesis() {
  const orchestrator = new AgentWorkflow({
    maxDepth: 4,
    enableParallel: true,
  });

  const result = await orchestrator.run({
    description: 'Synthesize insights from technology, business, and user research to identify opportunities',
    type: 'analysis',
    input: {
      domains: ['AI/ML', 'market trends', 'user behavior'],
      goal: 'Identify product opportunities',
    },
    priority: 'high',
  });

  return result;
}

// Utility: Run multiple patterns in sequence
export async function runPatternSuite() {
  console.log('=== Orchestrator Pattern Suite ===\n');

  const patterns = [
    { name: 'Sequential Chain', fn: sequentialChain },
    { name: 'Parallel Execution', fn: parallelResearch },
    { name: 'Tool-Intensive', fn: toolIntensiveAnalysis },
  ];

  const results = [];

  for (const pattern of patterns) {
    console.log(`Running: ${pattern.name}...`);
    const result = await pattern.fn();
    results.push({ name: pattern.name, success: result.success });
    console.log(`✓ ${pattern.name}: ${result.success ? 'Success' : 'Failed'}`);
  }

  return results;
}

// Example: Custom agent injection
export function createCustomOrchestrator() {
  const orchestrator = new AgentWorkflow();

  // Would register custom agents here
  // orchestrator.registerCustomAgent(customAgent);

  return orchestrator;
}
