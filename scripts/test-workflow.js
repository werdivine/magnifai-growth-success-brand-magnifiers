// scripts/test-workflow.js
/**
 * Test script to verify AgentWorkflow functionality
 * 
 * Run with: node scripts/test-workflow.js
 */

const path = require('path');

// Add the src directory to module paths for @/* aliases
const modulePath = require('module');
const originalResolve = modulePath.Module._resolveFilename;
modulePath.Module._resolveFilename = function (request, parent, isMain) {
  if (request.startsWith('@/')) {
    const resolvedPath = path.resolve(__dirname, '../src', request.slice(2));
    return originalResolve.call(this, resolvedPath, parent, isMain);
  }
  return originalResolve.call(this, request, parent, isMain);
};

// Import the workflow - using require since this is a plain JS file
const { AgentWorkflow } = require('../src/lib/orchestrator/workflow');

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
main().catch((error) => {
  console.error('');
  console.error('✗ Fatal error:', error);
  console.log('='.repeat(60));
  console.log('✗ TEST FAILED: Fatal error during execution');
  console.log('='.repeat(60));
  process.exit(1);
});
