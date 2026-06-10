const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.module.css'));

let updated = 0;
files.forEach(f => {
    const p = path.join(dir, f);
    let content = fs.readFileSync(p, 'utf8');
    
    // Safety check: ONLY target the `color:` and `border-color:` CSS properties ensuring we don't accidentally wreck gradient arrays
    const original = content;
    content = content.replace(/color:\s*(#fff|#ffffff|white)\s*;/gi, 'color: var(--foreground);');
    content = content.replace(/border-color:\s*(#fff|#ffffff|white)\s*;/gi, 'border-color: var(--foreground);');
    
    if (content !== original) {
        fs.writeFileSync(p, content);
        updated++;
        console.log(`Purged hardcoded white color from: ${f}`);
    }
});
console.log(`Total components fixed: ${updated}`);
