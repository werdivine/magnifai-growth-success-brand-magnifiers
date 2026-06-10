const fs = require('fs');
const file = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/app/globals.css';
let css = fs.readFileSync(file, 'utf8');

// We know the CSS is corrupted around .btn-cta
// We will split the file right before .btn-cta and append perfectly clean text

const cleanBtnCtaAndBelow = `
/* Violet gradient CTA button */
.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #8B5CF6, #6366F1);
  color: #fff;
  font-weight: 700;
  padding: 0.875rem 2rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.4);
  transition: box-shadow 0.2s, transform 0.2s;
}

.btn-cta:hover {
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.6);
  transform: translateY(-2px);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
`;

const index = css.indexOf('.btn-cta {');
if (index !== -1) {
    // Find the comment "/* Violet gradient CTA button */" before it if it exists
    const commentIndex = css.lastIndexOf('/* Violet gradient CTA button */', index);
    const splitPoint = commentIndex !== -1 ? commentIndex : index;
    
    css = css.substring(0, splitPoint) + cleanBtnCtaAndBelow;
    fs.writeFileSync(file, css);
    console.log('Successfully reconstructed the tail end of globals.css');
} else {
    console.log('Could not find .btn-cta');
}
