const OpenAI = require('openai');

const apiKey = 'csk-vr2xknr6xfdxpv28d8cve6en4cdpwy3krj34j9twmt5ekxpy';

async function test() {
    try {
        const openai = new OpenAI({
            apiKey: apiKey,
            baseURL: 'https://api.cerebras.ai/v1'
        });

        console.log('Sending test request to Cerebras...');
        const response = await openai.chat.completions.create({
            model: 'llama3.1-8b',
            messages: [{ role: 'user', content: 'Say hello and confirm you are online.' }],
            max_tokens: 50
        });

        console.log('Success!');
        console.log('Response:', response.choices[0].message.content);
    } catch (e) {
        console.error('Cerebras connection failed:', e.message);
    }
}

test();
