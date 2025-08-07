//Precondition: User is on the logined into account. User is on the inventory page

import loginPage from "../pages/login.page"
import inventoryPage from "../pages/inventory.page"

describe("Footer Links", () => {

    it("0007 test", async () => {
        await loginPage.open()
        await loginPage.standardUserLogin()
        await browser.pause(2000) 

        //Click on the "Twitter" icon on the footer
        //Twitter of the company is opened on the new tab

        // Get the original tab handle
        const originalTab = await browser.getWindowHandle();

        await inventoryPage.clickTwitterLink()
        await browser.pause(2000)

        // Switch to the new tab
        await browser.waitUntil(async () => {
            const handles = await browser.getWindowHandles();
            return handles.length > 1;
        }, {
            timeout: 5000,
            timeoutMsg: 'Twitter tab did not open',
        });
        const allTabs = await browser.getWindowHandles();
        const newTab = allTabs.find(h => h !== originalTab);
        await browser.switchToWindow(newTab);

        const twitterUrl = await browser.getUrl()
        expect(twitterUrl).toContain('https://x.com/saucelabs')
        await browser.pause(2000)

        await browser.closeWindow();
        await browser.switchToWindow(originalTab);
        await browser.pause(2000)

        //Return to the main page and click on the "Facebook" icon on the footer
        //Facebook of the company is opened on the new tab

        await inventoryPage.clickFacebookLink()
        await browser.pause(2000)

        await browser.waitUntil(async () => {
            const handles = await browser.getWindowHandles();
            return handles.length > 1;
        }, {
            timeout: 5000,
            timeoutMsg: 'Facebook tab did not open',
        });
        const allTabs2 = await browser.getWindowHandles();
        const newTab2 = allTabs2.find(h => h !== originalTab);
        await browser.switchToWindow(newTab2);

        const facebookUrl = await browser.getUrl()
        expect(facebookUrl).toContain('https://www.facebook.com/saucelabs')
        await browser.pause(2000)

        await browser.closeWindow();
        await browser.switchToWindow(originalTab);
        await browser.pause(2000)

        //Return to the main page and click on the "Linkedin" icon on the footer    
        //Linkedin of the company is opened on the new tab

        await inventoryPage.clickLinkedinLink()
        await browser.pause(2000)

        await browser.waitUntil(async () => {
            const handles = await browser.getWindowHandles();
            return handles.length > 1;
        }, {
            timeout: 5000,
            timeoutMsg: 'Linkedin tab did not open',
        });
        const allTabs3 = await browser.getWindowHandles();
        const newTab3 = allTabs3.find(h => h !== originalTab);
        await browser.switchToWindow(newTab3);

        const linkedinUrl = await browser.getUrl()
        expect(linkedinUrl).toContain('https://www.linkedin.com/company/sauce-labs/')
        await browser.pause(2000)

        await browser.closeWindow();

        await browser.switchToWindow(originalTab);
        await browser.pause(2000)

    })
})