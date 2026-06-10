const fs = require('fs');

const globalsPath = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/app/globals.css';
let content = fs.readFileSync(globalsPath, 'utf8');

// Insert dark mode RGB vars if they don't exist
if (!content.includes('--bg-primary-rgb: 6, 6, 15;')) {
    content = content.replace('--bg-primary: #06060f;', '--bg-primary: #06060f;\n  --bg-primary-rgb: 6, 6, 15;');
}
if (!content.includes('--bg-secondary-rgb: 12, 12, 30;')) {
    content = content.replace('--bg-secondary: #0c0c1e;', '--bg-secondary: #0c0c1e;\n  --bg-secondary-rgb: 12, 12, 30;');
}

// Insert light mode RGB vars
if (!content.includes('--bg-primary-rgb: 255, 255, 255;')) {
    content = content.replace('--bg-primary: #ffffff;', '--bg-primary: #ffffff;\n  --bg-primary-rgb: 255, 255, 255;');
}
if (!content.includes('--bg-secondary-rgb: 241, 245, 249;')) {
    content = content.replace('--bg-secondary: #f1f5f9;', '--bg-secondary: #f1f5f9;\n  --bg-secondary-rgb: 241, 245, 249;');
}

fs.writeFileSync(globalsPath, content);
console.log('Fixed globals.css');
