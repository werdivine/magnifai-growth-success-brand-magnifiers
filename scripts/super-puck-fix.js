const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function replaceColors(file) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // CSS files
    if (file.endsWith('.css')) {
        content = content.replace(/color:\s*#fff(?:fff)?;/gi, 'color: var(--foreground);');
        content = content.replace(/background:\s*#06060f;/gi, 'background: var(--bg-primary);');
        content = content.replace(/background:\s*#0c0c1e;/gi, 'background: var(--bg-secondary);');
        content = content.replace(/border-color:\s*rgba\(255,\s*255,\s*255,\s*0\.2\);/gi, 'border-color: var(--glass-border);');
        content = content.replace(/rgba\(255,\s*255,\s*255,\s*([\d.]+)\)/g, 'rgba(var(--foreground-rgb), $1)');
    }
    
    // TSX files
    if (file.endsWith('.tsx') && !file.includes('FadeIn')) {
        content = content.replace(/color:\s*'#fff(?:fff)?'/gi, "color: 'var(--foreground)'");
        content = content.replace(/background:\s*'#0c0c1e'/gi, "background: 'var(--bg-secondary)'");
        content = content.replace(/background:\s*'#06060f'/gi, "background: 'var(--bg-primary)'");
        content = content.replace(/rgba\(255,\s*255,\s*255,\s*([\d.]+)\)/g, 'rgba(var(--foreground-rgb), $1)');
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Fixed colors in ' + file);
    }
}

walkDir('c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/components', replaceColors);
walkDir('c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/lib', replaceColors);

// Now patch HomeHero.tsx to add the Telegram link
const homeHeroPath = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/components/HomeHero.tsx';
let heroContent = fs.readFileSync(homeHeroPath, 'utf8');
if (!heroContent.includes('--- QUICK TOOLS BAR ---')) {
    const quickTools = `
                {/* --- QUICK TOOLS BAR --- */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1.5rem',
                    padding: '2rem 1rem',
                    background: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--glass-border)',
                    borderTop: '1px solid var(--glass-border)',
                    flexWrap: 'wrap',
                    marginTop: '4rem',
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}>
                    <span style={{color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
                        Valuable Engine Links:
                    </span>
                    <a href="https://t.me/yourtelegram" target="_blank" rel="noreferrer" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.6rem 1.25rem', borderRadius: '999px',
                        background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(139,92,246,0.15))',
                        border: '1px solid var(--accent-cyan)',
                        color: 'var(--foreground)', fontWeight: 700, textDecoration: 'none', position: 'relative', transition: 'all 0.2s', boxShadow: '0 0 15px rgba(34,211,238,0.2)'
                    }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-cyan)', display: 'inline-block', boxShadow: '0 0 10px var(--accent-cyan)' }} />
                        Telegram Growth Engine
                    </a>
                    <a href="#hubspot" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.6rem 1.25rem', borderRadius: '999px',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--foreground)', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s'
                    }}>
                        HubSpot Integrator
                    </a>
                    <a href="#make" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.6rem 1.25rem', borderRadius: '999px',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--foreground)', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s'
                    }}>
                        Make.com Automation
                    </a>
                </div>
`;
    // Insert before </section>
    heroContent = heroContent.replace('</section>', quickTools + '\n        </section>');
    
    // Add FadeIn
    if (!heroContent.includes('import { FadeIn }')) {
        heroContent = heroContent.replace("import styles from './HomeHero.module.css';", "import styles from './HomeHero.module.css';\nimport { FadeIn } from './FadeIn';");
    }
    // Wrap return with FadeIn
    heroContent = heroContent.replace('<section className={styles.heroSection}>', '<FadeIn><section className={styles.heroSection}>');
    heroContent = heroContent.replace('</section>', '</section></FadeIn>');
    
    fs.writeFileSync(homeHeroPath, heroContent);
    console.log('Appended Quick Tools to HomeHero!');
}

// Add FadeIn to puck config sections
const puckConfigPath = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/lib/puck-config.tsx';
let puckConfig = fs.readFileSync(puckConfigPath, 'utf8');
if (!puckConfig.includes('import { FadeIn }')) {
    puckConfig = puckConfig.replace("import Section from '@/components/Section'", "import Section from '@/components/Section'\nimport { FadeIn } from '@/components/FadeIn'");
}
// Wrap BentoGrid section in FadeIn in puck-config
puckConfig = puckConfig.replace(/<section style=\{\{ padding: '80px 20px', background: 'var\(--bg-secondary\)', borderTop: '1px solid var\(--glass-border\)' \}\}>/g, '<FadeIn><section style={{ padding: \'80px 20px\', background: \'var(--bg-secondary)\', borderTop: \'1px solid var(--glass-border)\' }}>');
puckConfig = puckConfig.replace(/<\/div>\s*<\/section>/g, '</div>\n                </section></FadeIn>');
fs.writeFileSync(puckConfigPath, puckConfig);
console.log('Added animation wrappers to puck-config.tsx!');
