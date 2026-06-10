const fs = require('fs');

// 1. Fix BentoGrid.module.css
const bentoFile = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/components/BentoGrid.module.css';
let bento = fs.readFileSync(bentoFile, 'utf8');
bento = bento.replace(/background: rgba\(255, 255, 255, 0\.03\);/g, 'background: var(--glass-bg);');
bento = bento.replace(/border: 1px solid rgba\(255, 255, 255, 0\.07\);/g, 'border: 1px solid var(--glass-border);');
bento = bento.replace(/color: #fff;/g, 'color: var(--foreground);');
bento = bento.replace(/color: #94a3b8;/g, 'color: var(--text-muted);');
// Add neon glow border on hover safely
if(!bento.includes('box-shadow: 0 20px 60px var(--primary-glow), 0 0 0 1px var(--primary);')) {
    bento = bento.replace(/box-shadow: 0 20px 60px var\(--primary-glow\);/g, 'box-shadow: 0 20px 60px var(--primary-glow), 0 0 0 1px var(--primary);');
}
fs.writeFileSync(bentoFile, bento);

// 2. Enhance page.module.css sectionDark mapping
const pageCssFile = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/app/page.module.css';
let pageCss = fs.readFileSync(pageCssFile, 'utf8');
pageCss = pageCss.replace(
    /\.sectionDark \{\s*background: var\(--bg-secondary\);\s*padding: 80px 2rem;\s*\}/g,
    '.sectionDark { background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); padding: 100px 2rem; border-top: 1px solid var(--glass-border); }'
);
fs.writeFileSync(pageCssFile, pageCss);

// 3. Page.tsx wrap sections correctly
const pageTsxFile = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/app/page.tsx';
let pageTsx = fs.readFileSync(pageTsxFile, 'utf8');

if (!pageTsx.includes('import { FadeIn, StaggerChildren, FadeInChild }')) {
    const importStr = "import { FadeIn, StaggerChildren, FadeInChild } from '@/components/FadeIn';\n";
    pageTsx = pageTsx.replace("import Footer from '@/components/Footer';", "import Footer from '@/components/Footer';\n" + importStr);
}

// Safely wrap each section using string replacement matching explicit sections
const tagsToWrap = [
    '<section className={styles.sectionDark}>',
    '<section style={{'
];

// Instead of pure regex on generic tags, let's inject FadeIn inside the section tags to wrap the children, 
// OR simpler: wait, we can just replace `<BentoGrid>` with `<FadeIn><BentoGrid></FadeIn>`
// But we want the whole sections to fade in. We can wrap <section> with <FadeIn> manually since NextJs compiles it correctly.
pageTsx = pageTsx.replace(/<section className=\{styles\.sectionDark\}>([\s\S]*?)<\/section>/g, '<FadeIn><section className={styles.sectionDark}>$1</section></FadeIn>');

// We have multiple <section style={{ ... }}> ... </section> chunks. We can use a regex to wrap the whole tag.
// Regex caveat: greedy vs lazy. We use `[\s\S]*?` for lazy matching inside section.
pageTsx = pageTsx.replace(/<section style=\{\{([\s\S]*?)<\/section>/g, '<FadeIn><section style={{$1</section></FadeIn>');


// Fix Quick Tools Bar (wrapped correctly inside FadeIn)
pageTsx = pageTsx.replace(/\{\/\* --- QUICK TOOLS BAR --- \*\/\}\s*<div style=\{\{\s*display: 'flex',\s*justifyContent: 'center',\s*alignItems: 'center',/g,
    '{/* --- QUICK TOOLS BAR --- */}\n<FadeIn delay={0.2}><div style={{ display: \'flex\', justifyContent: \'center\', alignItems: \'center\',');
pageTsx = pageTsx.replace(/Make\.com Automation\s*<\/a>\s*<\/div>/g, 'Make.com Automation</a></div></FadeIn>');

// Ensure globals.css light mode colors have better contrast
const globalsFile = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/app/globals.css';
let globals = fs.readFileSync(globalsFile, 'utf8');
globals = globals.replace(/--bg-secondary: #f8fafc;/g, '--bg-secondary: #f1f5f9;\n  --bg-tertiary: #e2e8f0;');
fs.writeFileSync(globalsFile, globals);

fs.writeFileSync(pageTsxFile, pageTsx);
console.log('Deep fix completed explicitly and safely!');
