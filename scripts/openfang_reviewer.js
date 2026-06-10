const fs = require('fs');
const path = require('path');

const COMPONENT_PATH = path.join(__dirname, '../src/components/MagazineGrid.tsx');

function generateOpenFangPrompt() {
    console.log('🛡️ Preparing component for OpenFang Audit...');
    
    if (!fs.existsSync(COMPONENT_PATH)) {
        console.error('❌ Component not found:', COMPONENT_PATH);
        process.exit(1);
    }

    const componentCode = fs.readFileSync(COMPONENT_PATH, 'utf-8');
    
    const prompt = `
Please perform a rigorous Aesthetic and Performance audit on the following React component.
Focus on:
1. Midnight Theme compliance (glassmorphism, subtle borders, atmospheric lighting).
2. React performance (unnecessary re-renders, hook optimizations).
3. Semantic HTML and accessibility.

Component Code:
\`\`\`tsx
${componentCode}
\`\`\`
`;

    const outputPath = path.join(__dirname, 'openfang_audit_prompt.txt');
    fs.writeFileSync(outputPath, prompt);
    
    console.log('✅ OpenFang Audit Prompt generated successfully.');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log('\nSince OpenFang uses a rich interactive Terminal UI (TUI), direct CLI piping is blocked.');
    console.log('To run this audit, simply copy the contents of the generated prompt file into the OpenFang chat interface:');
    console.log('> openfang chat');
}

generateOpenFangPrompt();
