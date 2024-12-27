const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');  // For taking screenshots if necessary

async function loginToX() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the login page
        await driver.get('https://x.com/login');
        await driver.manage().window().maximize(); // Maximize the window to ensure all elements are visible

        // Use JavaScript to find the username field and set its value
        let loadComplete = await driver.executeScript("return document.readyState === 'complete';");
        console.log('Page load complete:', loadComplete);

        // Use a broad selector to locate the username input by placeholder or type
        let usernameField = await driver.wait(until.elementLocated(By.xpath("//input[@type='email' or @type='text']")), 20000);
        console.log('Found the username field. Entering username...');
        await usernameField.sendKeys('sagnikwork');

        // Press ENTER to move to the password field
        await usernameField.sendKeys(Key.RETURN);
        console.log('Moved to password field.');

        // Locate the password input field and enter the password
        let passwordField = await driver.wait(until.elementLocated(By.xpath("//input[@type='password']")), 20000);
        console.log('Found the password field. Entering password...');
        await passwordField.sendKeys('saha@1907', Key.RETURN);

        // Optionally, wait for a specific element that signifies a successful login
        await driver.wait(until.urlContains('dashboard'), 10000);  // Adjust the URL part as needed
        console.log('Successfully logged in and redirected to the dashboard.');

        // Take a screenshot after login for verification
        let screenshot = await driver.takeScreenshot();
        fs.writeFileSync('login-success.png', screenshot, 'base64');
        console.log('Screenshot taken after login.');
    } catch (error) {
        console.error('Error during execution:', error);

        // Take a screenshot on error to analyze the state
        let screenshot = await driver.takeScreenshot();
        fs.writeFileSync('login-error.png', screenshot, 'base64');
        console.log('Screenshot taken on error.');
    } finally {
        console.log('Closing the browser...');
        await driver.quit();
    }
}

loginToX();
