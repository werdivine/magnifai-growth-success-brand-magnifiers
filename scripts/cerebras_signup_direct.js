const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  // Disable images and CSS to save resources
  await page.route('**/*.{png,jpg,jpeg,svg,css,woff,woff2}', route => route.abort());

  try {
    console.log('Navigating to Cerebras...');
    await page.goto('https://cloud.cerebras.ai', { waitUntil: 'networkidle' });
    
    console.log('Clicking Google Login...');
    await page.click('button:has-text("GOOGLE")');
    
    // Wait for account selection or dashboard
    await page.waitForTimeout(5000);
    
    // Check if we are on account selection
    if (page.url().includes('accounts.google.com')) {
        console.log('On Google Account selection. Attempting to click the first account...');
        await page.click('[data-authuser="0"]');
        await page.waitForTimeout(5000);
    }
    
    console.log('Current URL:', page.url());
    
    // If we are on the dashboard, navigate to settings/API keys
    if (page.url().includes('cloud.cerebras.ai')) {
        console.log('On Cerebras Dashboard. Finding API key...');
        await page.goto('https://cloud.cerebras.ai/settings/api-keys');
        await page.waitForTimeout(3000);
        const apiKey = await page.innerText('pre'); // Adjust selector as needed
        console.log('API_KEY_FOUND:', apiKey);
    }

  } catch (error) {
    console.error('Error during automation:', error);
    await page.screenshot({ path: 'cerebras_error.png' });
  } finally {
    await browser.close();
  }
})();
