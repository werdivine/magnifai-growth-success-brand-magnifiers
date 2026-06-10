const fs = require('fs');

const puckPath = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/lib/puck-config.tsx';
let puckContent = fs.readFileSync(puckPath, 'utf8');

// Ensure FadeIn is imported
if (!puckContent.includes("import { FadeIn }")) {
    puckContent = puckContent.replace(
        "import HomeHero", 
        "import { FadeIn } from '@/components/FadeIn';\nimport HomeHero"
    );
}

// Wrap specific render outputs in FadeIn so scrolling triggers the framer-motion entrance animations
// We target the arrow functions returning JSX components.
const componentsToWrap = ['HomeHero', 'StatsCounter', 'TrustedBy', 'BentoGrid', 'ServicesGrid', 'Testimonials', 'ProblemSection', 'ValueProp', 'FAQ', 'MagazineGrid', 'LeadMagnet', 'LeadCapture', 'InlineCTA', 'ROICalculator', 'PromptCarousel', 'BookingWidget', 'IntelligenceBrief', 'ResourceFeed'];

componentsToWrap.forEach(comp => {
    // Standard component render like: render: (props) => <HomeHero {...props} />
    const regex1 = new RegExp(`render:\\s*\\(props\\)\\s*=>\\s*<${comp}\\s+\\{\\.\\.\\.props\\}\\s*\\/>`, 'g');
    puckContent = puckContent.replace(regex1, `render: (props) => <FadeIn><${comp} {...props} /></FadeIn>`);

    // Render with destructured props like: render: ({ items }) => <StatsCounter items={items} />
    const regex2 = new RegExp(`render:\\s*\\(\\{([^}]+)\\}\\)\\s*=>\\s*<${comp}[^>]+>`, 'g');
    puckContent = puckContent.replace(regex2, match => {
        if (match.includes('<FadeIn>')) return match;
        const replaceString = match.split('=>')[0] + '=> <FadeIn>' + match.split('=>')[1].trim() + '</FadeIn>';
        return replaceString;
    });

    // Custom sections like ROICalculator which return <Section>
    const regex3 = new RegExp(`render:\\s*\\(\\)\\s*=>\\s*\\([\\s\\S]*?<${comp}[\\s\\S]*?\\)`, 'g');
    puckContent = puckContent.replace(regex3, match => {
        if (match.includes('<FadeIn>')) return match;
        return match.replace('render: () => (', 'render: () => (\n                <FadeIn>');
    });
});

// Fix the closing parentheses for multi-line renders that we wrapped above
puckContent = puckContent.replace(/<\/Section>\n\s*\)/g, '</Section>\n                </FadeIn>\n            )');
puckContent = puckContent.replace(/<ProblemSection \/>/g, '<FadeIn><ProblemSection /></FadeIn>');
puckContent = puckContent.replace(/<ValueProp \/>/g, '<FadeIn><ValueProp /></FadeIn>');
puckContent = puckContent.replace(/<FAQ \/>/g, '<FadeIn><FAQ /></FadeIn>');
puckContent = puckContent.replace(/<MagazineGrid \/>/g, '<FadeIn><MagazineGrid /></FadeIn>');
puckContent = puckContent.replace(/<LeadMagnet \/>/g, '<FadeIn><LeadMagnet /></FadeIn>');
puckContent = puckContent.replace(/<LeadCapture \/>/g, '<FadeIn><LeadCapture /></FadeIn>');
puckContent = puckContent.replace(/<PromptCarousel \/>/g, '<FadeIn><PromptCarousel /></FadeIn>');

// Clean up double FadeIns if the regex hit twice
puckContent = puckContent.replace(/<FadeIn><FadeIn>/g, '<FadeIn>');
puckContent = puckContent.replace(/<\/FadeIn><\/FadeIn>/g, '</FadeIn>');

fs.writeFileSync(puckPath, puckContent);
console.log('Successfully injected Framer Motion <FadeIn> wrappers across all Puck CMS sections.');
