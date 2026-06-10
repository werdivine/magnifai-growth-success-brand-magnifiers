// src/components/AIOrchestratorDemo.tsx
// React component demonstrating the Advanced Multi-Agent Orchestrator

'use client';

import { useState, useEffect } from 'react';
import { AgentWorkflow, TaskType, executeTask } from '@/lib/orchestrator';

interface TaskResult {
  success: boolean;
  output?: any;
  error?: string;
  tokensUsed: number;
  cost: number;
  executionTime: number;
  agentId: string;
}

export function AIOrchestratorDemo() {
  const [orchestrator, setOrchestrator] = useState<AgentWorkflow | null>(null);
  const [currentTask, setCurrentTask] = useState('');
  const [taskType, setTaskType] = useState<TaskType>('research');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [results, setResults] = useState<TaskResult[]>([]);
  const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'failed'>('idle');
  const [workflowStatus, setWorkflowStatus] = useState<any>(null);

  useEffect(() => {
    // Initialize orchestrator
    const orch = new AgentWorkflow({
      maxDepth: 5,
      maxRetries: 3,
      timeout: 300000,
      costTracking: {
        dailyBudget: 100,
        monthlyBudget: 1000,
        perUserBudget: 50,
      },
    });
    setOrchestrator(orch);
  }, []);

  const runTask = async () => {
    if (!orchestrator || !currentTask.trim()) return;

    setStatus('running');
    const startTime = Date.now();

    try {
      const result = await orchestrator.run({
        description: currentTask,
        type: taskType,
        priority,
      });

      setResults((prev) => [...prev, {
        success: result.success,
        output: result.output,
        error: result.error?.message,
        tokensUsed: result.tokensUsed,
        cost: result.cost,
        executionTime: Date.now() - startTime,
        agentId: result.agentId,
      }]);

      setStatus(result.success ? 'completed' : 'failed');
    } catch (error) {
      setStatus('failed');
      setResults((prev) => [...prev, {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        tokensUsed: 0,
        cost: 0,
        executionTime: Date.now() - startTime,
        agentId: 'error',
      }]);
    }
  };

  const runQuickTask = async (description: string, type: TaskType) => {
    setCurrentTask(description);
    setTaskType(type);
    await runTask();
  };

  const getStatus = () => {
    if (orchestrator) {
      const status = orchestrator.getStatus();
      setWorkflowStatus(status);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">AI Multi-Agent Orchestrator</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Intelligent task decomposition and execution with specialized agents.
        </p>

        {/* Task Input */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Task Description</label>
            <textarea
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              placeholder="Enter your task (e.g., 'Research latest AI trends', 'Generate Python API code')"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Task Type</label>
              <select
                value={taskType}
                onChange={(e) => setTaskType(e.target.value as TaskType)}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="research">Research</option>
                <option value="code_generation">Code Generation</option>
                <option value="analysis">Analysis</option>
                <option value="writing">Writing</option>
                <option value="automation">Automation</option>
                <option value="debugging">Debugging</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="md:col-span-2 flex items-end">
              <button
                onClick={runTask}
                disabled={status === 'running' || !currentTask.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
              >
                {status === 'running' ? 'Running...' : 'Execute Task'}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => runQuickTask('Summarize recent AI developments', 'research')}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm"
            >
              Summarize AI News
            </button>
            <button
              onClick={() => runQuickTask('Create a REST API with TypeScript and Express', 'code_generation')}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm"
            >
              Generate API Code
            </button>
            <button
              onClick={() => runQuickTask('Analyze website performance metrics', 'analysis')}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm"
            >
              Analyze Performance
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Execution Results</h3>
            <button
              onClick={getStatus}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Refresh Status
            </button>
          </div>

          {workflowStatus && (
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium mb-2">Workflow Status</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Status:</span>
                  <span className="ml-2 font-medium">{workflowStatus.status}</span>
                </div>
                <div>
                  <span className="text-gray-500">Tasks:</span>
                  <span className="ml-2 font-medium">{workflowStatus.tasks.length}</span>
                </div>
                <div>
                  <span className="text-gray-500">Daily Cost:</span>
                  <span className="ml-2 font-medium">${workflowStatus.cost.dailySpent.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Monthly Cost:</span>
                  <span className="ml-2 font-medium">${workflowStatus.cost.monthlySpent.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {results.slice().reverse().map((result, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg ${
                  result.success
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
                      result.success
                        ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300'
                    }`}
                  >
                    {result.success ? 'Success' : 'Failed'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {result.executionTime}ms
                  </span>
                </div>

                {result.output && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Output
                    </h4>
                    <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
                      {JSON.stringify(result.output, null, 2)}
                    </pre>
                  </div>
                )}

                {result.error && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">
                      Error
                    </h4>
                    <p className="text-sm text-red-600 dark:text-red-400">{result.error}</p>
                  </div>
                )}

                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>Agent: {result.agentId}</span>
                  <span>Tokens: {result.tokensUsed.toLocaleString()}</span>
                  <span>Cost: ${result.cost.toFixed(4)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Panel */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          How It Works
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• <strong>Supervisor Agent</strong> analyzes and decomposes complex tasks</li>
          <li>• <strong>Specialized Agents</strong> (Research, Developer, Analyst, Writer) execute subtasks</li>
          <li>• <strong>Tool Router</strong> dynamically selects and chains tools for each step</li>
          <li>• <strong>Memory System</strong> stores knowledge across working, semantic, and episodic layers</li>
          <li>• <strong>Cost Tracking</strong> monitors and enforces budget limits automatically</li>
        </ul>
      </div>
    </div>
  );
}
