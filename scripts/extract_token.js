const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const contexts = browser.contexts();
    const pages = contexts[0].pages();
    
    for (let i = 0; i < pages.length; i++) {
      const url = pages[i].url();
      if (url.includes('github.com/settings/personal-access-tokens')) {
        console.log(`Found GitHub token page at index ${i}`);
        // The token is in an input or a span. Let's try to find it.
        const token = await pages[i].evaluate(() => {
          const input = document.querySelector('input[id^="personal-access-token-"]');
          if (input) return input.value;
          // Alternative: look for the text in the green box
          const box = document.querySelector('.flash-success code');
          if (box) return box.innerText;
          // Another alternative: look for any string starting with github_pat_
          const bodyText = document.body.innerText;
          const match = bodyText.match(/github_pat_[a-zA-Z0-9_]+/);
          return match ? match[0] : null;
        });
        
        if (token) {
          console.log('TOKEN_EXTRACTED_START');
          console.log(token);
          console.log('TOKEN_EXTRACTED_END');
        } else {
          console.log('Token not found on page.');
        }
      }
    }
    
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();
