const OpenAI = require('openai');

const apiKey = '4hAdYbWFDDUhjVFik8RG4Ot9oJFAHeP3';

async function test() {
    try {
        const openai = new OpenAI({
            apiKey: apiKey,
            baseURL: 'https://api.mistral.ai/v1'
        });

        console.log('Sending test request to Mistral...');
        const response = await openai.chat.completions.create({
            model: 'open-mistral-7b',
            messages: [{ role: 'user', content: 'Say hello and confirm you are online.' }],
            max_tokens: 50
        });

        console.log('Success!');
        console.log('Response:', response.choices[0].message.content);
    } catch (e) {
        console.error('Mistral connection failed:', e.message);
    }
}

test();
