const OpenAI = require('openai');

const apiKey = 'tgp_v1_gTjtBPskvxWv8KwC3oJVL-clBNnuib-KsJNcx2TifTs';

async function test() {
    try {
        const openai = new OpenAI({
            apiKey: apiKey,
            baseURL: 'https://api.together.xyz/v1'
        });

        console.log('Sending test request to Together AI...');
        const response = await openai.chat.completions.create({
            model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
            messages: [{ role: 'user', content: 'Say hello and confirm you are online.' }],
            max_tokens: 50
        });

        console.log('Success!');
        console.log('Response:', response.choices[0].message.content);
    } catch (e) {
        console.error('Together AI connection failed:', e.message);
    }
}

test();
