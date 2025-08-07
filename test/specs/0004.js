//Precondition: User is on the logined into account. User is on the inventory page

import loginPage from "../pages/login.page"
import inventoryPage from "../pages/inventory.page"

describe("Logout", () => {

    it("0004 test", async () => {

        await loginPage.open()
        await loginPage.standardUserLogin()

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory.html'),
            {
                timeout: 5000,
                timeoutMsg: 'User is NOT redirected to the inventory page'
            }
        );
        expect(await browser.getUrl()).toContain('/inventory.html');

        //Click on the "Burger" button at the top left corner
        //Menu are expanded, 4 items are displayed

        await browser.pause(2000) 
        await inventoryPage.clickBurgerMenu()
        
        const menu = await inventoryPage.menu
        await expect(menu).toBeDisplayed()

        const menuItems = await inventoryPage.menuItems
        expect(menuItems.length).toBe(4)
        for (const item of menuItems) {
            await expect(item).toBeDisplayed()
        }
        await browser.pause(2000) 

        //Click on the "Logout" button
        //User are redirecred to the Login page, Username and Password field are empty
 
        await inventoryPage.clickLogout()
        await browser.pause(2000)

        await browser.waitUntil( 
            async () => (await browser.getUrl()) === 'https://www.saucedemo.com/',
            {
                timeout: 5000,
                timeoutMsg: 'User is NOT redirected to the login page'
            }
        )
        expect(await browser.getUrl()).toBe('https://www.saucedemo.com/')

        const loginValue = await loginPage.getLoginValue()
        expect(loginValue).toBe(undefined) 
        const passwordValue = await loginPage.getPasswordValue()
        expect(passwordValue).toBe(undefined)

    })

})