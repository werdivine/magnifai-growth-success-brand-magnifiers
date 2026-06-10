const fs = require('fs');

// 1. Remove FadeIn from Prismic Slices where it was breaking the build
const heroSlicePath = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/slices/Hero/index.tsx';
if (fs.existsSync(heroSlicePath)) {
    let content = fs.readFileSync(heroSlicePath, 'utf8');
    content = content.replace(/import FadeIn from '..\/..\/components\/FadeIn';\n?/g, '');
    content = content.replace(/<FadeIn[^>]*>/g, '');
    content = content.replace(/<\/FadeIn>/g, '');
    fs.writeFileSync(heroSlicePath, content);
    console.log('Stripped FadeIn from Hero Slice.');
}

// 2. Provide the missing CSS Module for homev2 to clear the NextJS module-not-found error
const homev2CssPath = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/app/homev2/homev2.module.css';
if (!fs.existsSync(homev2CssPath)) {
    fs.writeFileSync(homev2CssPath, `/* Auto-generated shim to fix missing module */
.main {
    min-height: 100vh;
    background-color: var(--bg-primary);
}`);
    console.log('Created missing homev2.module.css header file.');
}
