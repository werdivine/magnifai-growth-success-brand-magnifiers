const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const contexts = browser.contexts();
    const pages = contexts[0].pages();
    
    console.log(`Connected to browserless. Found ${pages.length} pages.`);
    
    for (let i = 0; i < pages.length; i++) {
      const title = await pages[i].title();
      const url = pages[i].url();
      console.log(`Page ${i}: ${title} (${url})`);
      
      if (url.includes('github.com')) {
        await pages[i].screenshot({ path: `github_debug_${i}.png` });
        console.log(`Saved screenshot: github_debug_${i}.png`);
      }
    }
    
    await browser.close();
  } catch (error) {
    console.error('Error connecting to browserless:', error);
  }
})();
