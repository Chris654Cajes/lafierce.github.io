const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureScreenshots() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({ width: 1200, height: 800 });
  
  const pages = [
    { name: 'introduction', url: 'http://localhost:8000/index.html' },
    { name: 'purpose', url: 'http://localhost:8000/purpose.html' },
    { name: 'success', url: 'http://localhost:8000/success.html' },
    { name: 'software', url: 'http://localhost:8000/software.html' },
    { name: 'transparency', url: 'http://localhost:8000/transparency.html' },
    { name: 'gamification', url: 'http://localhost:8000/gamification.html' },
    { name: 'download', url: 'http://localhost:8000/download.html' },
    { name: 'mistakesToSuccess', url: 'http://localhost:8000/mistakesToSuccess.html' }
  ];
  
  // Create screenshots directory
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }
  
  for (const pageInfo of pages) {
    try {
      console.log(`Capturing screenshot for ${pageInfo.name}...`);
      await page.goto(pageInfo.url, { waitUntil: 'networkidle2' });
      
      // Wait a bit for any animations
      await page.waitForTimeout(2000);
      
      // Capture screenshot
      await page.screenshot({
        path: `screenshots/${pageInfo.name}.png`,
        fullPage: true,
        quality: 90
      });
      
      console.log(`✅ Captured ${pageInfo.name}.png`);
    } catch (error) {
      console.error(`❌ Error capturing ${pageInfo.name}:`, error);
    }
  }
  
  await browser.close();
  console.log('🎉 All screenshots captured!');
}

captureScreenshots().catch(console.error);
