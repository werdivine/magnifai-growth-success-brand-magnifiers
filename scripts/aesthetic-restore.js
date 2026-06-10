const fs = require('fs');

// 1. Fix the Faint Hero Title Gradient (Because pure #fff on a gradient text fails in light mode)
const heroCssPath = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/components/HomeHero.module.css';
let heroCss = fs.readFileSync(heroCssPath, 'utf8');

// We need to change the background-clip gradient to use the foreground variable so it works in both modes
heroCss = heroCss.replace(
    /background: linear-gradient\(135deg, #fff 0%, #c4b5fd 50%, #93c5fd 100%\);/g,
    'background: linear-gradient(135deg, var(--foreground) 0%, var(--accent-secondary) 50%, var(--accent-cyan) 100%);'
);

// Add pure CSS animations to HomeHero
if (!heroCss.includes('@keyframes floatUp')) {
    const cssAnimations = `
@keyframes floatUp {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
}

@keyframes pulseGlow {
    0% { box-shadow: 0 0 15px rgba(34,211,238,0.2); }
    50% { box-shadow: 0 0 25px rgba(34,211,238,0.6); }
    100% { box-shadow: 0 0 15px rgba(34,211,238,0.2); }
}

.heroContent > * {
    animation: floatUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    opacity: 0;
}

.heroContent > *:nth-child(1) { animation-delay: 0.1s; }
.heroContent > *:nth-child(2) { animation-delay: 0.2s; }
.heroContent > *:nth-child(3) { animation-delay: 0.3s; }
.heroContent > *:nth-child(4) { animation-delay: 0.4s; }
.heroContent > *:nth-child(5) { animation-delay: 0.5s; }
`;
    heroCss = heroCss + cssAnimations;
}
fs.writeFileSync(heroCssPath, heroCss);


// 2. Strip out all references to the broken FadeIn component across the project
const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

const path = require('path');
const componentsDir = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/components/';
const libDir = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/lib/';

[componentsDir, libDir].forEach(dir => {
    const files = walkSync(dir);
    files.forEach(file => {
        if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            let content = fs.readFileSync(file, 'utf8');
            let original = content;

            // Strip imports and tags
            content = content.replace(/import\s+\{?\s*FadeIn\s*\}?\s+from\s+[^;\n]+;?\n?/g, '');
            content = content.replace(/<FadeIn[^>]*>/g, '');
            content = content.replace(/<\/FadeIn>/g, '');

            if (content !== original) {
                fs.writeFileSync(file, content);
                console.log('Stripped FadeIn from ' + file);
            }
        }
    });
});

console.log('UI Restoration Complete.');
