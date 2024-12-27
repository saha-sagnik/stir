const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');
const { twitterUsername, twitterPassword, proxyUrl } = require('./config');

// Mock or Real Data Toggle
const useMockData = false; // Set to true for mock data

async function scrapeTrends() {
  if (useMockData) {
    console.log("Using mock data...");
    return [
      { trend: 'Trend 1', posts: '10K' },
      { trend: 'Trend 2', posts: '5K' },
      { trend: 'Trend 3', posts: '20K' }
    ];
  }

  let driver = await new Builder()
    .forBrowser('chrome')
    .setProxy(proxyUrl ? { proxyType: 'manual', httpProxy: proxyUrl } : null)
    .build();

  try {
    // Step 1: Navigate to Twitter login page
    await driver.get('https://twitter.com/login');
    await driver.manage().window().maximize();

    // Step 2: Enter Username
    const usernameField = await driver.wait(until.elementLocated(By.xpath("//input[@autocomplete='username']")), 20000);
    await usernameField.sendKeys(twitterUsername, Key.RETURN);

    // Step 3: Enter Password
    const passwordField = await driver.wait(until.elementLocated(By.xpath("//input[@type='password']")), 20000);
    await passwordField.sendKeys(twitterPassword, Key.RETURN);

    // Step 4: Wait for the homepage
    await driver.wait(until.urlContains('home'), 100000);

    // Step 5: Locate Trends Section
    const trendsSection = await driver.wait(until.elementLocated(By.css('section[aria-labelledby*="accessible-list"]')), 20000);
    const trendElements = await trendsSection.findElements(By.css('div[dir="ltr"]'));

    // Step 6: Extract Trends
    const trends = [];
    for (let trendElement of trendElements) {
      const trendText = await trendElement.getText();
      if (trendText.trim()) {
        trends.push({ trend: trendText.trim(), posts: 'N/A' }); // Replace 'N/A' with actual post count if available
      }
    }

    return trends;
  } catch (error) {
    const errorScreenshot = await driver.takeScreenshot();
    fs.writeFileSync('error-screenshot.png', errorScreenshot, 'base64');
    throw error;
  } finally {
    await driver.quit();
  }
}

module.exports = scrapeTrends;
