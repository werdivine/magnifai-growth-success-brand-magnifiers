const fs = require('fs');
const file = 'c:/Users/Administrator/wemagnifai/magnifai-growth-success-brand-magnifiers/src/components/HomeHero.tsx';
let jsx = fs.readFileSync(file, 'utf8');

const anchor = '<TerminalDemo />';

const bannerStart = '{/* --- PREMIUM FLOATING TOOLS BAND --- */}';
const bannerEndRegex = /<\/div>\s*<\/section>/;

const bannerStartIndex = jsx.indexOf(bannerStart);
const bannerEndMatch = jsx.match(bannerEndRegex);

if (bannerStartIndex !== -1 && bannerEndMatch) {
    // Extract banner
    const bannerCode = jsx.substring(bannerStartIndex, bannerEndMatch.index);
    
    // Remove banner from old location
    jsx = jsx.substring(0, bannerStartIndex) + jsx.substring(bannerEndMatch.index);
    
    // Inject banner ABOVE TerminalDemo 
    // Usually TerminalDemo is inside the div.heroContent 
    // We should put the banner OUTSIDE heroContent, or just before TerminalDemo?
    // If we put it OUTSIDE heroContent, wait...
    // In HomeHero.tsx:
    // </div> <TerminalDemo /> </div> {/* --- PREMIUM FLOATING TOOLS BAND --- */}
    // It is currently OUTSIDE heroContent.
    // If we want it ABOVE TerminalDemo but OUTSIDE heroContent, we'd have to break heroContent up.
    // Let's just put it immediately before <TerminalDemo /> INSIDE heroContent!
    
    jsx = jsx.replace(anchor, bannerCode + '\n' + anchor);
    fs.writeFileSync(file, jsx);
    console.log('Successfully relocated Premium Tools Band above the terminal.');
} else {
    console.log('Banner not found or regex failed.');
}
