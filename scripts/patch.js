const fs = require('fs');
const file = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Insert Telegram Quick Tools Bar
const insertIndex = content.indexOf('{/* Metrics Strip */}');
if (insertIndex !== -1 && !content.includes('QUICK TOOLS BAR')) {
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
                    flexWrap: 'wrap',
                }}>
                    <span style={{color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
                        Valuable Engine Links:
                    </span>
                    <a href="#telegram" style={{
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
    content = content.substring(0, insertIndex) + quickTools + content.substring(insertIndex);
}

// Replace dark mode specific colors with vars
content = content.replace(/'#fff'/gi, "'var(--foreground)'");
content = content.replace(/'#0c0c1e'/gi, "'var(--bg-secondary)'");
content = content.replace(/'#0d1a2e'/gi, "'var(--bg-tertiary)'");
content = content.replace(/'#06060f'/gi, "'var(--bg-primary)'");
content = content.replace(/'#04040d'/gi, "'var(--bg-primary)'");
content = content.replace(/'#0a0a1a'/gi, "'var(--bg-primary)'");
content = content.replace(/'#12102a'/gi, "'var(--bg-card)'");
content = content.replace(/'#0d0b1e'/gi, "'var(--bg-secondary)'");

// Replace rgba(255,255,255,x)
content = content.replace(/rgba\(255,\s*255,\s*255,\s*([\d.]+)\)/g, "rgba(var(--foreground-rgb), $1)");
content = content.replace(/rgba\(5,\s*5,\s*5,\s*([\d.]+)\)/g, "rgba(var(--foreground-rgb), 0.05)");

// Remove black overlays that obscure light mode details
// Replace linear-gradient(135deg, #0c0c1e 0%, #0d1a2e 100%) since they were changed to css vars above
content = content.replace(/linear-gradient\(135deg,\s*'(var\(--bg-secondary\))'\s*0%,\s*'(var\(--bg-tertiary\))'\s*100%\)/g, "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)");

fs.writeFileSync(file, content);
console.log('Patched page.tsx successfully');
