const fs = require('fs');

const cssPath = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/app/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

// The multi_replace tool botched the light theme block, so let's completely rebuild it exactly as it was, but with our #e2e8f0 secondary color for high contrast.

const newLightTheme = `html[data-theme='light'] {
  --bg-primary: #ffffff;
  --bg-primary-rgb: 255, 255, 255;
  --bg-secondary: #e2e8f0;    /* DRASTICALLY DARKER for high contrast section breaks */
  --bg-secondary-rgb: 226, 232, 240;
  --bg-tertiary: #cbd5e1;
  --foreground: #020617;
  --foreground-rgb: 2, 6, 23;
  --text-muted: #475569;

  --primary: #6366f1;
  --secondary: #ec4899;
  --primary-glow: rgba(99, 102, 241, 0.2);
  --secondary-glow: rgba(236, 72, 153, 0.2);

  --glass-bg: rgba(255, 255, 255, 0.9);
  --glass-border: rgba(0, 0, 0, 0.1);
  --glass-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  --elevation-1: 0 2px 8px rgba(0, 0, 0, 0.06);
  --elevation-2: 0 4px 16px rgba(0, 0, 0, 0.08);
  --elevation-3: 0 8px 32px rgba(0, 0, 0, 0.1);
  --grid-color: rgba(0, 0, 0, 0.03);
}`;

// Strip out whatever mangled mess it created and inject the clean definition
css = css.replace(/html\[data-theme='light'\] \{[\s\S]*?--grid-color:[^\}]+\}/, newLightTheme);

fs.writeFileSync(cssPath, css);
console.log('Restored globals.css and explicitly deepened Light Mode backgrounds.');
