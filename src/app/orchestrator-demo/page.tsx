// src/app/orchestrator-demo/page.tsx
// Complete AI Orchestrator Demo Page with full setup

'use client';

import { useState, useEffect } from 'react';
import { AgentWorkflow, TaskType, executeTask } from '../../lib/orchestrator';
import styles from './OrchestratorDemo.module.css';

interface TaskResult {
  success: boolean;
  output?: any;
  error?: string;
  tokensUsed: number;
  cost: number;
  executionTime: number;
  agentId: string;
}

export default function OrchestratorDemoPage() {
  const [orchestrator, setOrchestrator] = useState<AgentWorkflow | null>(null);
  const [currentTask, setCurrentTask] = useState('');
  const [taskType, setTaskType] = useState<TaskType>('research');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [results, setResults] = useState<TaskResult[]>([]);
  const [status, setStatus] = useState<'idle' | 'running' | 'completed' | 'failed'>('idle');
  const [workflowStatus, setWorkflowStatus] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize orchestrator on mount
  useEffect(() => {
    console.log('🚀 Initializing AI Multi-Agent Orchestrator...');
    
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
    setIsInitialized(true);
    console.log('✅ Orchestrator ready!');
  }, []);

  const runTask = async () => {
    if (!orchestrator || !currentTask.trim()) {
      alert('Please enter a task description');
      return;
    }

    setStatus('running');
    const startTime = Date.now();

    try {
      const result = await orchestrator.run({
        description: currentTask,
        type: taskType,
        priority,
      });

      const newResult = {
        success: result.success,
        output: result.output,
        error: result.error?.message,
        tokensUsed: result.tokensUsed,
        cost: result.cost,
        executionTime: Date.now() - startTime,
        agentId: result.agentId,
      };

      setResults((prev) => [newResult, ...prev]);
      setStatus(result.success ? 'completed' : 'failed');
    } catch (error) {
      setStatus('failed');
      const errorResult: TaskResult = {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        tokensUsed: 0,
        cost: 0,
        executionTime: Date.now() - startTime,
        agentId: 'error',
      };
      setResults((prev) => [errorResult, ...prev]);
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

  const formatCost = (cost: number) => {
    return `$${cost.toFixed(4)}`;
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>⚡</span>
              <span className={styles.logoText}>AI Orchestrator</span>
            </div>
            <div className={styles.statusBadge}>
              {isInitialized ? (
                <span className={styles.statusReady}>✓ Ready</span>
              ) : (
                <span className={styles.statusLoading}>Initializing...</span>
              )}
            </div>
          </div>
          <p className={styles.subtitle}>
            Intelligent multi-agent task orchestration with automated decomposition
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.contentGrid}>
          
          {/* Left Column: Task Input */}
          <div className={styles.taskPanel}>
            <div className={styles.panelCard}>
              <h2 className={styles.panelTitle}>📋 Task Configuration</h2>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Task Description</label>
                <textarea
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  placeholder="What would you like the AI to do? (e.g., 'Research quantum computing', 'Write a blog post about AI', 'Generate Python API code')"
                  className={styles.textarea}
                  rows={4}
                  disabled={status === 'running'}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Task Type</label>
                  <select
                    value={taskType}
                    onChange={(e) => setTaskType(e.target.value as TaskType)}
                    className={styles.select}
                    disabled={status === 'running'}
                  >
                    <option value="research">🔍 Research</option>
                    <option value="code_generation">💻 Code Generation</option>
                    <option value="analysis">📊 Analysis</option>
                    <option value="writing">✍️ Writing</option>
                    <option value="automation">⚙️ Automation</option>
                    <option value="debugging">🐛 Debugging</option>
                    <option value="optimization">🚀 Optimization</option>
                    <option value="planning">📅 Planning</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className={styles.select}
                    disabled={status === 'running'}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <button
                onClick={runTask}
                disabled={status === 'running' || !currentTask.trim()}
                className={`${styles.runButton} ${status === 'running' ? styles.runButtonRunning : ''}`}
              >
                {status === 'running' ? (
                  <>
                    <span className={styles.spinner}></span>
                    Running...
                  </>
                ) : (
                  '🚀 Run Task'
                )}
              </button>

              <div className={styles.divider}>or</div>

              <div className={styles.quickActions}>
                <h3 className={styles.quickActionsTitle}>Quick Actions</h3>
                <div className={styles.quickActionsGrid}>
                  <button
                    onClick={() => runQuickTask('Summarize latest AI and technology trends', 'research')}
                    className={styles.quickActionBtn}
                    disabled={status === 'running'}
                  >
                    📰 Summarize AI News
                  </button>
                  <button
                    onClick={() => runQuickTask('Create a REST API endpoint with authentication', 'code_generation')}
                    className={styles.quickActionBtn}
                    disabled={status === 'running'}
                  >
                    💻 Generate API Code
                  </button>
                  <button
                    onClick={() => runQuickTask('Analyze website performance and suggest improvements', 'analysis')}
                    className={styles.quickActionBtn}
                    disabled={status === 'running'}
                  >
                    📊 Analyze Performance
                  </button>
                  <button
                    onClick={() => runQuickTask('Write a comprehensive guide about machine learning basics', 'writing')}
                    className={styles.quickActionBtn}
                    disabled={status === 'running'}
                  >
                    ✍️ Write Guide
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className={styles.resultsPanel}>
            
            {/* Workflow Status Card */}
            <div className={styles.panelCard}>
              <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>📊 Workflow Status</h2>
                <button
                  onClick={getStatus}
                  className={styles.refreshButton}
                  disabled={status === 'running'}
                >
                  🔄 Refresh
                </button>
              </div>

              {workflowStatus && (
                <div className={styles.statusGrid}>
                  <div className={styles.statusItem}>
                    <span className={styles.statusLabel}>Status</span>
                    <span className={`${styles.statusValue} ${styles[`status_${workflowStatus.status}`]}`}>
                      {workflowStatus.status}
                    </span>
                  </div>
                  <div className={styles.statusItem}>
                    <span className={styles.statusLabel}>Tasks</span>
                    <span className={styles.statusValue}>
                      {workflowStatus.tasks.length}
                    </span>
                  </div>
                  <div className={styles.statusItem}>
                    <span className={styles.statusLabel}>Daily Cost</span>
                    <span className={styles.statusValue}>
                      ${workflowStatus.cost.dailySpent.toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.statusItem}>
                    <span className={styles.statusLabel}>Monthly Cost</span>
                    <span className={styles.statusValue}>
                      ${workflowStatus.cost.monthlySpent.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {!workflowStatus && (
                <div className={styles.statusPlaceholder}>
                  <p>Click "Refresh" to see workflow status</p>
                </div>
              )}
            </div>

            {/* Execution Results */}
            <div className={styles.panelCard}>
              <h2 className={styles.panelTitle}>⚡ Execution Results</h2>
              
              {status === 'running' && (
                <div className={styles.runningIndicator}>
                  <div className={styles.runningSpinner}></div>
                  <p>AI agents are working on your task...</p>
                  <p className={styles.runningHint}>This typically takes 5-20 seconds</p>
                </div>
              )}

              {results.length === 0 && status !== 'running' && (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>🎯</div>
                  <h3>No tasks executed yet</h3>
                  <p>Configure a task above and click "Run Task" to get started</p>
                </div>
              )}

              {results.map((result, idx) => (
                <div
                  key={idx}
                  className={`${styles.resultCard} ${result.success ? styles.resultSuccess : styles.resultError}`}
                >
                  <div className={styles.resultHeader}>
                    <span className={`${styles.resultBadge} ${result.success ? styles.badgeSuccess : styles.badgeError}`}>
                      {result.success ? '✓ Success' : '✗ Failed'}
                    </span>
                    <span className={styles.resultTime}>
                      {formatTime(result.executionTime)}
                    </span>
                  </div>

                  {result.output && (
                    <div className={styles.resultOutput}>
                      <h4>Output:</h4>
                      <pre className={styles.outputContent}>
                        {typeof result.output === 'string' 
                          ? result.output 
                          : JSON.stringify(result.output, null, 2)
                        }
                      </pre>
                    </div>
                  )}

                  {result.error && (
                    <div className={styles.resultError}>
                      <h4>Error:</h4>
                      <p className={styles.errorText}>{result.error}</p>
                    </div>
                  )}

                  <div className={styles.resultMeta}>
                    <span>🤖 {result.agentId}</span>
                    <span>📄 {result.tokensUsed.toLocaleString()} tokens</span>
                    <span>💰 {formatCost(result.cost)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Info Panel */}
        <div className={styles.infoPanel}>
          <h3>🤖 How It Works</h3>
          <ul>
            <li><strong>Supervisor Agent</strong> analyzes and decomposes your task</li>
            <li><strong>Specialized Agents</strong> (Research, Developer, Analyst, Writer) execute subtasks</li>
            <li><strong>Tool Router</strong> dynamically selects tools (search, analysis, code review)</li>
            <li><strong>Memory System</strong> stores knowledge across working, semantic, and episodic layers</li>
            <li><strong>Cost Tracking</strong> monitors and enforces budget limits automatically</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
