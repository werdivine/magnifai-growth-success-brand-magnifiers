const OpenAI = require('openai');

const apiKey = 'sk-700e1f407f1f4bb6a4b9796f82240bab';

async function test() {
    try {
        const openai = new OpenAI({
            apiKey: apiKey,
            baseURL: 'https://api.deepseek.com/v1'
        });

        console.log('Sending test request to DeepSeek...');
        const response = await openai.chat.completions.create({
            model: 'deepseek-chat',
            messages: [{ role: 'user', content: 'Say hello and confirm you are online.' }],
            max_tokens: 50
        });

        console.log('Success!');
        console.log('Response:', response.choices[0].message.content);
    } catch (e) {
        console.error('DeepSeek connection failed:', e.message);
    }
}

test();
