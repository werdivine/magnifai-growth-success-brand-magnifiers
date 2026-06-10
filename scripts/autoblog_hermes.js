const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const BLOG_DATA_PATH = path.join(__dirname, '../src/data/blog.json');

// Generate a unique ID based on title
function generateId(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/**
 * Robust section extractor that handles optional dashes, markdown bold marks, hashes, and colons.
 */
function extractSection(text, name, nextName) {
    const startPattern = new RegExp(`(?:---|\\*\\*|#)*\\s*${name}\\s*(?:---|\\*\\*|:)*`, 'i');
    const endPattern = nextName 
        ? new RegExp(`(?:---|\\*\\*|#)*\\s*${nextName}\\s*(?:---|\\*\\*|:)*`, 'i')
        : null;
        
    const startIdx = text.search(startPattern);
    if (startIdx === -1) return null;
    
    const headerMatch = text.slice(startIdx).match(startPattern);
    const contentStart = startIdx + headerMatch[0].length;
    
    if (!endPattern) {
        return text.slice(contentStart).trim();
    }
    
    const endSlice = text.slice(contentStart);
    const endIdx = endSlice.search(endPattern);
    if (endIdx === -1) {
        return endSlice.trim(); 
    }
    
    return endSlice.slice(0, endIdx).trim();
}

async function runAutoblog() {
    console.log('🤖 Orchestrating Autoblog content generation via Mistral API...');
    
    const topics = [
        "The shift from traditional SEO to Generative Engine Optimization (GEO) in B2B SaaS",
        "How Answer Engine Optimization (AEO) is replacing zero-click searches",
        "Using Autonomous AI Agents for outbound sales and pipeline generation",
        "The impact of Local LLMs on Enterprise Data Privacy and Compliance",
        "Replacing static PDF lead magnets with interactive AI-driven tools",
        "Building Topical Authority in the age of AI Overviews",
        "The death of generic B2B marketing and the rise of hyper-personalization",
        "How to use AI to drastically reduce Customer Acquisition Cost (CAC)",
        "The E-E-A-T Framework: Why human experience still matters in AI content",
        "Predictive Brand Analytics: Using AI to forecast market trends"
    ];
    
    // Select a random topic
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    console.log(`📌 Selected Topic for today's article: "${randomTopic}"`);
    
    const prompt = `You are an expert AI growth strategist and technical SEO/GEO copywriter for 'MagnifAI Growth Success Brand Magnifiers'. 
Write a new, highly insightful and authoritative blog post specifically focused on this topic: "${randomTopic}".

CRITICAL GEO & AEO RULES:
1. AEO (Answer Engine Optimization): The content MUST start with an "Answer-first H1" immediately followed by a direct 60-word executive summary that directly answers the core topic.
2. GEO (Generative Engine Optimization): Use hierarchical detail. Do not use keyword stuffing. Use entity-based optimization.
3. EEAT (Experience, Expertise, Authoritativeness, Trustworthiness): Ground your explanation in concrete statistics, expert opinions, and structured data.
4. Structure: Use markdown with clean headers (##), bullet points, and actionable steps.

FORMAT RULES:
Output the content in raw text using the following exact delimiters:
---TITLE---
Your Catchy, Authoritative Title here
---SNIPPET---
A brief 1-2 sentence executive summary (AEO optimized) here
---READTIME---
5 min
---CATEGORY---
Growth Strategy
---KEYWORDS---
entity1, entity2, entity3
---CONTENT---
The full markdown content of the article here incorporating the Answer-first H1 and GEO strategies.`;

    try {
        const openai = new OpenAI({
            apiKey: '4hAdYbWFDDUhjVFik8RG4Ot9oJFAHeP3',
            baseURL: 'https://api.mistral.ai/v1'
        });

        console.log('Sending generation request to Mistral...');
        const response = await openai.chat.completions.create({
            model: 'open-mistral-7b',
            messages: [
                {
                    role: 'system',
                    content: 'You write expert-level SEO/GEO blog posts using the requested text delimiters. Do not output JSON.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.85
        });

        const output = response.choices[0].message.content.trim();
        
        // Extract sections robustly
        const title = extractSection(output, 'TITLE', 'SNIPPET');
        const snippet = extractSection(output, 'SNIPPET', 'READTIME');
        const readTime = extractSection(output, 'READTIME', 'CATEGORY') || "5 min";
        const category = extractSection(output, 'CATEGORY', 'KEYWORDS') || "Growth Strategy";
        const keywordsStr = extractSection(output, 'KEYWORDS', 'CONTENT') || "";
        const seoKeywords = keywordsStr.split(',').map(k => k.trim()).filter(Boolean);
        const content = extractSection(output, 'CONTENT', null);

        if (!title || !snippet || !content) {
            console.error('❌ Failed to parse output template structure:');
            console.log(output);
            throw new Error('Output did not match the required template separators');
        }

        // Format the new article
        const newArticle = {
            id: generateId(title),
            title: title,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            author: "Antigravity Swarm (Mistral AI)",
            category: category,
            snippet: snippet,
            content: content,
            readTime: readTime,
            seoKeywords: seoKeywords,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
        };

        console.log('📖 Reading current blog data...');
        const currentData = JSON.parse(fs.readFileSync(BLOG_DATA_PATH, 'utf-8'));
        
        currentData.articles = currentData.articles || [];
        currentData.articles.unshift(newArticle);
        currentData.lastUpdated = new Date().toISOString();

        fs.writeFileSync(BLOG_DATA_PATH, JSON.stringify(currentData, null, 4));
        console.log(`✅ Successfully published new article: "${newArticle.title}"`);

    } catch (error) {
        console.error('❌ Content generation failed:', error.message);
        process.exit(1);
    }
}

runAutoblog();
