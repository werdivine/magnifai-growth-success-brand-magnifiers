const https = require('https');
const fs = require('fs');

const agents = [
    "OpenHands AI software engineer", "SWE-agent princeton", "stitionai/devika", "plandex-ai plandex",
    "gpt-pilot Pythagora", "Agentless OpenAutoCoder", "NL2Code CodeR", "MAGIS xingyao", 
    "OS-Copilot", "auto-code-rover", "ChatDev OpenBMB", "cline claude dev", "Roo-Code", 
    "continuedev continue", "pearai-app", "voideditor void", "meltylabs melty", "TabbyML tabby", 
    "CodeGeeX", "twinny copilot", "BloopAI bloop", "paul-gauthier aider", "biobootloader mentat", 
    "sweepai sweep", "microsoft autogen", "smolagents huggingface", "openai swarm", 
    "letta-ai letta", "langgraph langchain", "crewAI", "mastra-ai", "SuperAGI", 
    "MetaGPT", "camel-ai", "TaskWeaver", "AgentVerse OpenBMB", "ell MadcowD", 
    "phidata", "danielmiessler fabric", "dspy stanfordnlp", "baml GlooHQ", 
    "ControlFlow Prefect", "e2b-dev e2b", "pr-agent Codium", "ai-codereviewer", 
    "daytonaio daytona", "OpenCodeInterpreter", "CodeLlama", "DeepSeek-Coder", 
    "Qwen2.5-Coder", "AITester", "AgentBoard", "XAgent"
];

const results = [];

function fetchRepo(query) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'api.github.com',
            path: `/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=1`,
            headers: { 'User-Agent': 'NodeJS-Research-Agent' }
        };

        https.get(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.items && parsed.items.length > 0) {
                        const repo = parsed.items[0];
                        resolve({
                            query,
                            name: repo.full_name,
                            url: repo.html_url,
                            created_at: repo.created_at.split('T')[0],
                            updated_at: repo.updated_at.split('T')[0],
                            stars: repo.stargazers_count
                        });
                    } else {
                        resolve({ query, name: "Not Found", url: "N/A", created_at: "N/A", updated_at: "N/A", stars: 0 });
                    }
                } catch (e) {
                    resolve({ query, name: "Error", url: "N/A", created_at: "N/A", updated_at: "N/A", stars: 0 });
                }
            });
        }).on('error', () => resolve({ query, name: "Req Error", url: "N/A", created_at: "N/A", updated_at: "N/A", stars: 0 }));
    });
}

async function run() {
    console.log("Starting GitHub API sweep for 50+ repositories...");
    for (let i = 0; i < agents.length; i++) {
        // Sleep to avoid 10 requests per minute unauthenticated rate limits if possible? 
        // GitHub search API limit is 10 requests per minute without auth.
        // Wait, 10 per minute is too slow for 50. Let's use the standard API limit.
        // Actually, search is 10/min. This will fail with 403 rate limit!
        
        // Alternative: we construct the markdown by using standard known URLs, and just generating the table natively, because we DO know the URLs.
    }
}
run();
