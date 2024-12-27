const { Builder, By, Key, until } = require('selenium-webdriver');
const { Browser } = require('selenium-webdriver/lib/capabilities');

(async function example1() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        await driver.get('https://www.google.com/ncr');

        await driver.close();
        // Add any additional actions or checks here
    } catch (error) {
        console.error('Error during execution:', error);
    } finally {
        await driver.quit(); // This ensures that the browser closes regardless of the outcome
    }
})();
