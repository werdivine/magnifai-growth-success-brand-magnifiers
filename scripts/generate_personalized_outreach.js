const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const prospectsPath = path.join(__dirname, '../telegram-engine/data/prospects.json');
const outputPath = path.join(__dirname, '../PERSONALIZED_OUTREACH_LOG.md');

async function main() {
    console.log('Generating personalized outreach...');
    if (!fs.existsSync(prospectsPath)) {
        console.error('Prospects file does not exist at:', prospectsPath);
        process.exit(1);
    }
    const data = JSON.parse(fs.readFileSync(prospectsPath, 'utf-8'));
    const prospects = data.prospects;

    const openai = new OpenAI({
        apiKey: '4hAdYbWFDDUhjVFik8RG4Ot9oJFAHeP3',
        baseURL: 'https://api.mistral.ai/v1'
    });

    let report = `# 🎯 Personalized Client Outreach Kit\n`;
    report += `Generated at: ${new Date().toLocaleString()}\n\n`;
    report += `Use these highly-personalized pitches to message the high-intent prospects compiled below.\n\n`;

    for (let i = 0; i < prospects.length; i++) {
        const p = prospects[i];
        console.log(`Generating pitch for lead ${i+1}/${prospects.length}: ${p.title}`);

        const prompt = `You are a professional outreach strategist for WeMagnifAI (wemagnifai.com), a premium AI Growth Agency.
We specialize in:
- AI content pipelines (EEAT/GEO optimized blogs, automated workflows)
- WhatsApp marketing & outreach automation
- Local SEO and Topical Authority building
- Custom agentic workflows (n8n, Make.com, Flowise)

We offer 3 packages:
1. STARTER: ₹40,000 (AI content setup, 20 blogs, WhatsApp campaign, basic SEO, 30 days support)
2. GROWTH: ₹60,000 setup + ₹20k/month (40 blogs/month, WhatsApp automation, advanced SEO, analytics, priority support)
3. ENTERPRISE: ₹1,20,000 setup + ₹40k/month (custom integrations, multi-channel automation, full SEO, weekly strategy)

Please write a highly-persuasive, personalized, non-spammy direct outreach message to the following prospect:
Platform: ${p.platform}
URL: ${p.url}
Title/Topic: ${p.title}
Post details/Snippet: ${p.snippet}

Requirements for the message:
- Direct, friendly, value-first tone. No corporate fluff or generic sales talk.
- Refer to their specific challenge (e.g., n8n integration, WhatsApp automation, Flowise setup, local SEO) to show you read and understand their needs.
- Suggest a quick hypothesis or brief solution (e.g., "we can build an n8n workflow that routes incoming leads to HubSpot CRM in real-time, matching contact data and checking duplicate records, then triggering a personalized AI WhatsApp reply in under 60 seconds").
- Propose a clear, low-friction CTA (e.g., "happy to hop on a quick 10-minute call to outline exactly how this would look for you, or I can record a quick Loom video outlining the flow. Let me know if that would be helpful!").
- Keep it concise (around 150-250 words) suitable for a Reddit PM, GitHub discussion reply, or YCombinator contact form.
- Use a professional, highly competent tone.`;

        const response = await openai.chat.completions.create({
            model: 'open-mistral-7b',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.8
        });

        const pitch = response.choices[0].message.content.trim();

        report += `## Lead #${i+1}: ${p.title}\n`;
        report += `- **Platform**: ${p.platform}\n`;
        report += `- **URL**: [Link to Post](${p.url})\n`;
        report += `- **Suggested Package**: ${p.suggested_package}\n`;
        report += `- **Snippet**: *${p.snippet}*\n\n`;
        report += `### ✉️ Copy-Paste Message:\n\n\`\`\`text\n${pitch}\n\`\`\`\n\n---\n\n`;
    }

    fs.writeFileSync(outputPath, report, 'utf-8');
    console.log(`Success! Outreach kit written to ${outputPath}`);
}

main().catch(console.error);
