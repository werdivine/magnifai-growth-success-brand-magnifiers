const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function replaceColors(file) {
    if (file.endsWith('globals.css') || (!file.endsWith('.css') && !file.endsWith('.tsx') && !file.endsWith('.ts'))) return;

    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Hardcoded absolute hexes
    content = content.replace(/#06060f/gi, 'var(--bg-primary)');
    content = content.replace(/#0c0c1e/gi, 'var(--bg-secondary)');
    
    // Explicit RGB instances inside gradients or box shadows
    content = content.replace(/rgba\(\s*6\s*,\s*6\s*,\s*15\s*,/gi, 'rgba(var(--bg-primary-rgb),');
    content = content.replace(/rgba\(\s*12\s*,\s*12\s*,\s*30\s*,/gi, 'rgba(var(--bg-secondary-rgb),');

    // Remove rogue #fff but ensure we don't accidentally do it inside JSON or logic strings unless it's style strings
    // CSS files:
    if (file.endsWith('.css')) {
        content = content.replace(/#ffffff/gi, 'var(--foreground)');
        content = content.replace(/#fff(?![a-fA-F0-9])/gi, 'var(--foreground)');
    } else {
        // TSX files
        content = content.replace(/'#ffffff'/gi, "'var(--foreground)'");
        content = content.replace(/'#fff'/gi, "'var(--foreground)'");
        content = content.replace(/"#ffffff"/gi, '"var(--foreground)"');
        content = content.replace(/"#fff"/gi, '"var(--foreground)"');
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Purged hardcoded colors in ' + file);
    }
}

['src/components', 'src/app', 'src/lib', 'src/slices'].forEach(dir => {
    walkDir(path.join('c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers', dir), replaceColors);
});

console.log('Ultimate color purge executed.');
