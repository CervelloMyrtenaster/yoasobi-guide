const { chromium } = require('C:/Users/erica/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({headless:true,channel:'msedge'});
  const page = await browser.newPage();
  page.on('response', async r => { if(r.url().includes('/json/') || r.url().includes('/api/')) console.log('DATA_URL '+r.url()); });
  for (const url of process.argv.slice(2)) {
    await page.goto(url, {waitUntil:'networkidle', timeout:60000});
    const text = await page.locator('body').innerText();
    const name = url.split('/').filter(Boolean).at(-1);
    fs.writeFileSync(`research/raw/${name}.txt`, text);
    console.log(JSON.stringify({url, text}));
  }
  await browser.close();
})().catch(e => {console.error(e);process.exit(1)});
