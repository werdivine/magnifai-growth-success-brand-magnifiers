import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const ai = genkit({
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

// Start the flow server to keep the runtime alive for MCP
// @ts-ignore - Property might be dynamic or from a plugin not recognized by tsc
ai.startFlowServer({
  port: 3400,
});
