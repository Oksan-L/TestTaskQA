import { expect } from '@wdio/globals'

// It checks if the login page has the correct title
describe("Login page", () => {
    it("Must have a correct title", async () => {
    await browser.url('https://www.saucedemo.com/');

    const title = await browser.getTitle()
    console.log(title);

    await expect(browser).toHaveTitle('Swag Labs')
    });
});

