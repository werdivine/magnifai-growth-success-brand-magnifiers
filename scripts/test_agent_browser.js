const { execSync } = require('child_process');

try {
    console.log('Testing agent-browser CLI...');
    const output = execSync('agent-browser snapshot https://example.com').toString();
    console.log('Snapshot success!');
    console.log('Output length:', output.length);
    console.log('✓ agent-browser is fully operational.');
} catch (error) {
    console.error('Error testing agent-browser:', error.message);
    process.exit(1);
}
