import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const plugins = [];
if (process.env.GEMINI_API_KEY) {
  plugins.push(googleAI());
}

export const ai = genkit({
  plugins,
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
