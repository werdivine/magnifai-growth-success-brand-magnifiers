// scripts/test-workflow.ts
// Test script to verify AgentWorkflow functionality

import { AgentWorkflow } from '@/lib/orchestrator/workflow';

async function main() {
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

  console.log('Workflow initialized successfully');
  console.log('Running task: "Research JavaScript frameworks" (type: research)...\n');

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

    console.log('Task completed!');
    console.log('Result:', JSON.stringify(result, null, 2));
    
    const status = workflow.getStatus();
    console.log('\nWorkflow Status:', JSON.stringify(status, null, 2));
    
    process.exit(result.success ? 0 : 1);
  } catch (error) {
    console.error('Error running workflow:', error);
    process.exit(1);
  }
}

// Run the main function
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
