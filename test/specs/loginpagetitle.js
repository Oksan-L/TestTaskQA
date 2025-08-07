// It checks if the login page has the correct title

describe("Login page", () => {

    it("Login page must have a correct title", async () => {

    await browser.url('https://www.saucedemo.com/');

    const title = await browser.getTitle()
    console.log(title);

    await expect(browser).toHaveTitle('Swag Labs')

    });

});
