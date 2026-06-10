const { execSync } = require('child_process');

function run(cmd) {
    try {
        console.log(`Running: ${cmd}`);
        const output = execSync(cmd, { encoding: 'utf-8' });
        console.log(output);
        return output;
    } catch (e) {
        console.error(`Error: ${e.message}`);
        if (e.stdout) console.log(`Stdout: ${e.stdout}`);
        if (e.stderr) console.log(`Stderr: ${e.stderr}`);
        return null;
    }
}

// Open Cerebras
run('agent-browser open https://cloud.cerebras.ai');

// Get current state
const snapshot = run('agent-browser snapshot -i');
if (!snapshot) process.exit(1);

// Find Google button ref (usually e3)
const match = snapshot.match(/button "GOOGLE" \[.*ref=(e\d+)\]/);
if (match) {
    const ref = match[1];
    console.log(`Found Google button ref: ${ref}`);
    run(`agent-browser click @${ref}`);
    
    // Wait for redirect
    run('ping 127.0.0.1 -n 5 > nul');
    
    const nextSnapshot = run('agent-browser snapshot -i');
    console.log(nextSnapshot);
    
    // Check if we are on Google Choose Account page
    if (nextSnapshot.includes('Choose an account')) {
        // Find the email ref
        const emailMatch = nextSnapshot.match(/button "([^"]+)" \[ref=(e\d+)\]/); // Simplified check for account button
        if (emailMatch) {
             const accountRef = emailMatch[2];
             console.log(`Found account button ref: ${accountRef}`);
             run(`agent-browser click @${accountRef}`);
        }
    }
} else {
    console.log("Google button not found in snapshot.");
}
