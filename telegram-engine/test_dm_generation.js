const { generateDM } = require('./modules/dm_outreach');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));

const dummyLead = {
    id: "123456",
    first_name: "John",
    last_name: "Doe",
    username: "johndoe",
    bio: "Co-founder at TechCorp | Automating sales pipelines",
    source_group: "AI AUTOMATION AGENCY"
};

async function test() {
    console.log("Testing AI DM generation via Mistral...");
    try {
        const message = await generateDM(dummyLead, 0, config);
        console.log("\nSuccess!");
        console.log("Generated Message:\n", message);
    } catch (e) {
        console.error("DM generation failed:", e);
    }
}

test();
