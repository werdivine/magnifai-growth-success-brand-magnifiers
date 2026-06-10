const fs = require('fs');
const file = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/components/HomeHero.module.css';
let css = fs.readFileSync(file, 'utf8');

css = css.replace(/^[\s\S]*?(?=\.badge \{)/, `.heroSection {
    position: relative;
    padding: 8rem 2rem 6rem;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124, 58, 237, 0.35) 0%, rgba(var(--bg-primary-rgb), 0) 70%), var(--bg-primary);
    overflow: hidden;
    text-align: center;
}

.heroContent {
    max-width: 1000px;
    width: 100%;
    position: relative;
    z-index: 10;
}

`);

fs.writeFileSync(file, css);
console.log('Fixed HomeHero CSS overflow and layout!');
