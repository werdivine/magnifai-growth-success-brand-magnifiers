import { helloFlow } from '../src/genkit';

async function test() {
    try {
        console.log('🚀 Testing Genkit helloFlow...');
        const result = await helloFlow('Antigravity');
        console.log('✅ Result:', result);
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

test();

// Keep alive for MCP
setInterval(() => {}, 1000 * 60);
