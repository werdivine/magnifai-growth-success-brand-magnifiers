// src/lib/orchestrator/API_REFERENCE.md
// API Reference for Advanced Multi-Agent Orchestrator

# API Reference

## AgentWorkflow Class

Main orchestration engine that coordinates agents, tools, and workflows.

### Constructor

```typescript
new AgentWorkflow(config?: WorkflowConfig)
```

**Parameters:**
- `config.maxDepth` (number, default: 5) - Maximum task decomposition depth
- `config.maxRetries` (number, default: 3) - Maximum retry attempts per task
- `config.timeout` (number, default: 300000ms) - Task timeout in milliseconds
- `config.enableParallel` (boolean, default: true) - Enable parallel task execution
- `config.costTracking` (object) - Budget configuration
  - `dailyBudget` (number) - Daily spending limit
  - `monthlyBudget` (number) - Monthly spending limit  
  - `perUserBudget` (number) - Per-user spending limit

**Example:**
```typescript
const orchestrator = new AgentWorkflow({
  maxDepth: 5,
  maxRetries: 3,
  timeout: 300000,
  enableParallel: true,
  costTracking: {
    dailyBudget: 100,
    monthlyBudget: 1000,
    perUserBudget: 50,
  },
});
```

---

## Methods

### run(taskInput)

Execute a task through the orchestration system.

**Signature:**
```typescript
async run(taskInput: {
  description: string;
  type: TaskType;
  input?: any;
  priority?: 'low' | 'medium' | 'high' | 'critical';
}): Promise<ExecutionResult>
```

**Parameters:**
- `taskInput.description` (string) - Human-readable task description
- `taskInput.type` (TaskType) - Type of task to execute
- `taskInput.input` (any, optional) - Additional input data
- `taskInput.priority` (string, optional) - Task priority level

**Returns:**
```typescript
{
  success: boolean;           // Whether task completed successfully
  output?: any;               // Task output if successful
  error?: Error;              // Error if task failed
  subtaskResults?: ExecutionResult[];  // Results of subtasks
  tokensUsed: number;         // Total tokens consumed
  cost: number;               // Total cost in dollars
  executionTime: number;      // Execution time in milliseconds
  agentId: string;            // Agent that executed task
  modelUsed: string;          // Model used for execution
  retries: number;            // Number of retries performed
}
```

**Example:**
```typescript
const result = await orchestrator.run({
  description: 'Research latest AI trends and summarize findings',
  type: 'research',
  priority: 'high',
});

if (result.success) {
  console.log('Result:', result.output);
  console.log('Cost: $' + result.cost);
  console.log('Tokens:', result.tokensUsed);
}
```

---

### getStatus()

Get current workflow status and statistics.

**Signature:**
```typescript
getStatus(): {
  status: WorkflowStatus;
  tasks: Task[];
  agents: Array<{
    id: string;
    name: string;
    type: AgentType;
    status: 'idle' | 'busy' | 'error';
  }>;
  memory: {
    workingSize: number;
    semanticSize: number;
    episodicSize: number;
  };
  cost: {
    dailySpent: number;
    monthlySpent: number;
  };
}
```

**Example:**
```typescript
const status = orchestrator.getStatus();
console.log('Workflow Status:', status.status);
console.log('Daily Spend: $' + status.cost.dailySpent);
console.log('Active Agents:', status.agents.length);
```

---

### reset()

Reset workflow state and clear memory.

**Signature:**
```typescript
reset(): void
```

**Example:**
```typescript
orchestrator.reset();
```

---

## createOrchestrator()

Factory function for quick orchestrator creation.

**Signature:**
```typescript
createOrchestrator(config?: WorkflowConfig): AgentWorkflow
```

**Example:**
```typescript
const orchestrator = createOrchestrator({
  maxDepth: 3,
  costTracking: {
    dailyBudget: 50,
    monthlyBudget: 500,
    perUserBudget: 20,
  },
});
```

---

## OrchestratorBuilder Class

Builder pattern for fluent orchestrator configuration.

### Methods

**withMaxDepth(depth)**
```typescript
withMaxDepth(depth: number): OrchestratorBuilder
```

**withMaxRetries(retries)**
```typescript
withMaxRetries(retries: number): OrchestratorBuilder
```

**withTimeout(ms)**
```typescript
withTimeout(ms: number): OrchestratorBuilder
```

**withCostTracking(daily, monthly, perUser)**
```typescript
withCostTracking(daily: number, monthly: number, perUser: number): OrchestratorBuilder
```

**withParallelExecution(enabled)**
```typescript
withParallelExecution(enabled: boolean): OrchestratorBuilder
```

**build()**
```typescript
build(): AgentWorkflow
```

**Example:**
```typescript
const orchestrator = new OrchestratorBuilder()
  .withMaxDepth(5)
  .withMaxRetries(3)
  .withCostTracking(100, 1000, 50)
  .withParallelExecution(true)
  .build();
```

---

## executeTask()

Convenience function for quick task execution.

**Signature:**
```typescript
async executeTask(
  description: string,
  type: TaskType,
  options?: {
    input?: any;
    priority?: 'low' | 'medium' | 'high' | 'critical';
    profile?: 'fast' | 'balanced' | 'thorough';
  }
): Promise<ExecutionResult>
```

**Parameters:**
- `description` (string) - Task description
- `type` (TaskType) - Task type
- `options.input` (any, optional) - Additional input
- `options.priority` (string, optional) - Task priority
- `options.profile` (string, optional) - Predefined configuration profile

**Profiles:**
- `'fast'` - Low depth (3), 1 retry, 60s timeout, parallel enabled
- `'balanced'` - Medium depth (5), 3 retries, 300s timeout, parallel enabled  
- `'thorough'` - High depth (8), 5 retries, 900s timeout, parallel enabled

**Example:**
```typescript
// Basic usage
const result = await executeTask(
  'Analyze competitor strategies',
  'analysis'
);

// With options
const result = await executeTask(
  'Generate comprehensive market research report',
  'research',
  {
    priority: 'high',
    profile: 'thorough',
    input: { competitors: ['Company A', 'Company B'] },
  }
);
```

---

## Task Types

Available task types:

- `'research'` - Information gathering and synthesis
- `'code_generation'` - Writing new code
- `'code_review'` - Reviewing existing code
- `'analysis'` - Data analysis and insights
- `'writing'` - Content creation
- `'editing'` - Content refinement
- `'testing'` - Test creation and execution
- `'deployment'` - Deployment tasks
- `'data_processing'` - Data transformation
- `'automation'` - Workflow automation
- `'planning'` - Project planning
- `'review'` - Quality review
- `'debugging'` - Issue diagnosis
- `'optimization'` - Performance optimization

---

## Task Status

Task lifecycle states:

- `'pending'` - Task created, not started
- `'planning'` - Task being decomposed
- `'decomposing'` - Task broken into subtasks
- `'assigned'` - Agent assigned to task
- `'in_progress'` - Task being executed
- `'blocked'` - Task waiting on dependency
- `'needs_review'` - Task needs human review
- `'completed'` - Task finished successfully
- `'failed'` - Task execution failed
- `'cancelled'` - Task cancelled

---

## Agent Types

Available agent types:

- `'supervisor'` - Orchestrates tasks and delegates to specialists
- `'researcher'` - Gathers and synthesizes information
- `'developer'` - Writes and reviews code
- `'analyst'` - Analyzes data and generates insights
- `'writer'` - Creates written content
- `'reviewer'` - Reviews and validates work
- `'tester'` - Creates and runs tests
- `'planner'` - Creates plans and strategies

---

## Tool Categories

Available tool categories:

- `'search'` - Web search and information retrieval
- `'database'` - Database operations
- `'file_system'` - File system operations
- `'api'` - API interactions
- `'analysis'` - Data analysis tools
- `'code'` - Code generation and analysis tools
- `'communication'` - Communication tools
- `'utility'` - General utility tools

---

## Memory Layers

### Working Memory (L1)
- Sub-millisecond access
- Stores current session context
- TTL-based eviction (default 24h)
- Use for: Active task state, recent messages

### Semantic Memory (L2)
- ~20ms access time
- Vector similarity search
- Persistent storage
- Use for: Knowledge bases, learned facts, reusable insights

### Episodic Memory (L3)
- Ordered log of all events
- Full conversation history
- Audit trail
- Use for: Reviewing past work, compliance, debugging

---

## Error Handling

The orchestrator handles errors gracefully:

1. **Automatic Retries** - Failed tasks are retried up to `maxRetries` times
2. **Fallback Agents** - If one agent fails, alternatives may be tried
3. **Budget Enforcement** - Tasks exceeding budget are rejected
4. **Timeout Protection** - Long-running tasks are cancelled
5. **Result Validation** - Invalid results trigger re-execution

**Example:**
```typescript
try {
  const result = await orchestrator.run(task);
  if (!result.success) {
    console.error('Task failed:', result.error);
  }
} catch (error) {
  console.error('Orchestrator error:', error);
}
```

---

## Performance Optimization

### Best Practices

1. **Set appropriate maxDepth** - Deeper decomposition creates more subtasks
2. **Use priority wisely** - Critical tasks get more resources
3. **Leverage parallel execution** - Enable for independent subtasks
4. **Monitor costs** - Check `getStatus().cost` regularly
5. **Use memory effectively** - Store reusable information in semantic memory

### Cost Estimates

Typical costs per task type (approximate):

- Research: $0.01 - $0.05
- Code Generation: $0.02 - $0.10
- Analysis: $0.01 - $0.03
- Writing: $0.01 - $0.02
- Complex Automation: $0.05 - $0.20

---

## Advanced Usage

### Custom Agent Integration

```typescript
const orchestrator = new AgentWorkflow();

// Register custom agent (implementation dependent)
// orchestrator.registerAgent(customAgent);

const result = await orchestrator.run(task);
```

### Tool Integration

```typescript
// Tools are automatically registered from createDefaultTools()
// Custom tools can be added by extending ToolRegistry
```

### Memory Query

```typescript
// Recall relevant information
const memories = await orchestrator.memory.recall(
  'previous research on AI trends'
);
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tasks timing out | Increase `timeout` in config |
| High costs | Lower `maxDepth`, use cheaper profiles |
| Poor results | Increase `maxRetries`, adjust agent prompts |
| Memory issues | Clear working memory with `reset()` |
| Agent failures | Check agent availability and tool access |

---

## Examples

### Simple Research Task
```typescript
const result = await executeTask(
  'Research latest JavaScript frameworks',
  'research'
);
```

### Complex Automation
```typescript
const orchestrator = new AgentWorkflow({
  maxDepth: 5,
  maxRetries: 3,
  costTracking: {
    dailyBudget: 100,
    monthlyBudget: 1000,
    perUserBudget: 50,
  },
});

const result = await orchestrator.run({
  description: 'Build and deploy automated reporting system',
  type: 'automation',
  priority: 'high',
});
```

### Batch Processing
```typescript
const tasks = [
  { description: 'Analyze Q1 data', type: 'analysis' as TaskType },
  { description: 'Analyze Q2 data', type: 'analysis' as TaskType },
  { description: 'Analyze Q3 data', type: 'analysis' as TaskType },
];

const results = await Promise.all(
  tasks.map(task => orchestrator.run(task))
);
```

---

## Next Steps

- Review [README.md](./README.md) for conceptual overview
- Check [advanced-patterns.ts](./advanced-patterns.ts) for usage patterns
- See [demo component](./../../../components/AIOrchestratorDemo.tsx) for React integration
