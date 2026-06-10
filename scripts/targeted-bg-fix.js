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

function restoreBackgrounds(file) {
    if (file.endsWith('globals.css') || (!file.endsWith('.css') && !file.endsWith('.tsx') && !file.endsWith('.ts'))) return;

    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Hardcoded absolute background hexes inside CSS & TSX
    content = content.replace(/#06060f/gi, 'var(--bg-primary)');
    content = content.replace(/#0c0c1e/gi, 'var(--bg-secondary)');
    
    // Explicit RGB instances inside gradients or box shadows (specifically for the hero gradients and borders)
    content = content.replace(/rgba\(\s*6\s*,\s*6\s*,\s*15\s*,/gi, 'rgba(var(--bg-primary-rgb),');
    content = content.replace(/rgba\(\s*12\s*,\s*12\s*,\s*30\s*,/gi, 'rgba(var(--bg-secondary-rgb),');

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Surgically patched background colors in ' + file);
    }
}

['src/components', 'src/app', 'src/lib', 'src/slices'].forEach(dir => {
    walkDir(path.join('c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers', dir), restoreBackgrounds);
});

console.log('Targeted background fix executed safely.');
