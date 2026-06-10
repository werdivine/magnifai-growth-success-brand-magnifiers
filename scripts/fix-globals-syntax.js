const fs = require('fs');
const file = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/app/globals.css';
let css = fs.readFileSync(file, 'utf8');

// The replacement tool left floating linear-gradients around line 166.
// Let's rip out everything from the end of body::after down to the themes if it's broken, 
// and inject a perfectly clean body construct.

css = css.replace(/body::before \{[\s\S]*?(html\[data\-theme='light'\])/, `/* Ambient Cinematic Aurora */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background:
    radial-gradient(circle at 15% 0%, rgba(99, 102, 241, 0.18) 0%, transparent 50%),
    radial-gradient(circle at 85% 0%, rgba(236, 72, 153, 0.18) 0%, transparent 50%),
    radial-gradient(circle at 50% 100%, rgba(34, 211, 238, 0.15) 0%, transparent 50%);
  z-index: -2;
  pointer-events: none;
  filter: blur(50px);
}

/* Premium High-End Technical Grid Overlay */
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: 
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: center center;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  z-index: -1;
  pointer-events: none;
}

body {
  color: var(--foreground);
  background-color: var(--bg-primary);
  font-family: var(--font-inter);
}

$1`);

// Also ensure light theme grid works properly
css = css.replace(/html\[data\-theme='light'\] \{[\s\S]*?--primary-glow/g, match => {
   return match.replace(/html\[data\-theme='light'\] \{/, `html[data-theme='light'] body::after {
  background-image: auto;
}
html[data-theme='light'] {`);
});

fs.writeFileSync(file, css);
console.log('Fixed CSS syntax fault safely.');
