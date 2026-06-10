const fs = require('fs');
const puckPath = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/lib/puck-config.tsx';
let puckContent = fs.readFileSync(puckPath, 'utf8');

// The ultimate regex to replace the broken <FadeIn> wrapper injections with pure native <div> animations
puckContent = puckContent.replace(/<FadeIn[^>]*>/g, '<div style={{ animation: "floatUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards", opacity: 0 }}>');
puckContent = puckContent.replace(/<\/FadeIn>/g, '</div>');

fs.writeFileSync(puckPath, puckContent);
console.log('Restored Puck Config wrapper animations natively.');

const bentoCssPath = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/components/BentoGrid.module.css';
let bentoCss = fs.readFileSync(bentoCssPath, 'utf8');
if (!bentoCss.includes('@keyframes slideUpGradient')) {
    bentoCss += `
@keyframes slideUpGradient {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
.bentoCard {
    animation: slideUpGradient 0.6s ease-out forwards;
}
.bentoCard:nth-child(1) { animation-delay: 0.1s; }
.bentoCard:nth-child(2) { animation-delay: 0.2s; }
.bentoCard:nth-child(3) { animation-delay: 0.3s; }
`;
    fs.writeFileSync(bentoCssPath, bentoCss);
    console.log('Appended native Bento Card animations.');
}

const pageCssPath = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/app/page.module.css';
let pageCss = fs.readFileSync(pageCssPath, 'utf8');
if (!pageCss.includes('opacity: 0')) {
     pageCss = pageCss.replace(
        '.heroContent {',
        '.heroContent {\n    animation: slideUp 0.8s ease-out 0.1s backwards;\n    opacity: 0;\n    animation-fill-mode: forwards;'
     );
     fs.writeFileSync(pageCssPath, pageCss);
     console.log('Appended native Page Hero animations.');
}
