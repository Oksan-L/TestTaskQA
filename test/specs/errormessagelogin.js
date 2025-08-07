import loginPage from "../pages/login.page";

describe("Error message height", () => {

    it('Check that error text fits into the container by height', async () => {

        await loginPage.open();

        await loginPage.enterLogin('invalid_user');
        await loginPage.enterPassword('invalid_password');
        await loginPage.clickLoginButton();

        const container = await $('.error-message-container'); // div container
        const textElement = await $('h3[data-test="error"]'); // h3 element with error text

        // Heights of the container
        const containerSize = await container.getSize();
        const containerHeight = containerSize.height;

        // Height of the text element
        const textHeight = await browser.execute(el => {
            const range = document.createRange();
            range.selectNodeContents(el);
            const rect = range.getBoundingClientRect();
            return rect.height;
        }, textElement);

        console.log(`Container height: ${containerHeight}, Text height: ${textHeight}`);

        // Save screenshots
        await container.saveScreenshot('./screenshots/error-container.png');
        await browser.saveScreenshot('./screenshots/full-page.png');

        await expect(textHeight).toBeLessThanOrEqual(containerHeight);

    });

});
