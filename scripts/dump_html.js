const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const contexts = browser.contexts();
    const pages = contexts[0].pages();
    
    for (let i = 0; i < pages.length; i++) {
      const url = pages[i].url();
      if (url.includes('github.com/settings/personal-access-tokens')) {
        const html = await pages[i].content();
        console.log('--- HTML START ---');
        console.log(html);
        console.log('--- HTML END ---');
      }
    }
    
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();
