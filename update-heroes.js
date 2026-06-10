const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') && !file.includes('blog') && !file.includes('insights') && !file.includes('HomeHero.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/app');
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let newContent = content.replace(/className=\{styles\.hero\}/g, 'className={`${styles.hero} global-wave-bg`}');
    newContent = newContent.replace(/className=\{styles\.heroSection\}/g, 'className={`${styles.heroSection} global-wave-bg`}');
    if (content !== newContent) {
        fs.writeFileSync(f, newContent);
        console.log('Updated', f);
    }
});
