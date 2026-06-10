const { execSync } = require('child_process');

function run(cmd) {
    console.log(`Executing: ${cmd}`);
    try {
        const output = execSync(cmd, { encoding: 'utf-8' });
        console.log(output);
        return output;
    } catch (e) {
        console.error(`Error: ${e.message}`);
        return null;
    }
}

// Open Google
run('agent-browser open https://accounts.google.com');

// Fill email
run('agent-browser fill textbox "Email or phone" "cafesuncity77@gmail.com"');

// Click Next
run('agent-browser click button "Next"');

// Wait for transition
console.log("Waiting 5 seconds for password field...");
run('ping 127.0.0.1 -n 5 > nul');

// Get snapshot to confirm
run('agent-browser snapshot -i');
