console.log('Genkit runtime starting...');
import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
});

export const helloFlow = ai.defineFlow(
  {
    name: 'helloFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (name) => {
    return `Hello, ${name}! The MagnifAI swarm is operational.`;
  }
);

console.log('Genkit runtime ready.');

// Start the reflection server for Genkit CLI discovery
(async () => {
  try {
    // @ts-ignore - accessing internal reflectionServer
    await ai.reflectionServer.start();
    console.log('Genkit reflection server started.');
  } catch (e) {
    console.error('Failed to start reflection server:', e);
  }
})();

// Keep the process alive
setInterval(() => {}, 1000 * 60 * 60);
