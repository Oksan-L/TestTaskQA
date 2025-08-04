//Precondition: User is on the logined into account. User is on the inventory page

import loginPage from "../pages/login.page"
import inventoryPage from "../pages/inventory.page"

describe("Logout", () => {

    it("Login", async () => {
        await loginPage.open()
        await loginPage.standardUserLogin()

        // Wait for the user to be redirected to the inventory page
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory.html'),
            {
                timeout: 5000,
                timeoutMsg: 'User is NOT redirected to the inventory page'
            }
        );
        expect(await browser.getUrl()).toContain('/inventory.html');
    })

    //Click on the "Burger" button at the top left corner
    it("Menu are expanded, 4 items are displayed", async () => {

        await browser.pause(2000) 
        await inventoryPage.clickBurgerMenu()
        
        // Check if the menu is displayed
        const menu = await inventoryPage.menu
        await expect(menu).toBeDisplayed()

        // Check if the menu items are displayed
        const menuItems = await inventoryPage.menuItems
        expect(menuItems.length).toBe(4)
        for (const item of menuItems) {
            await expect(item).toBeDisplayed()
        }

        await browser.pause(2000) 
    })

    //Click on the "Logout" button
    it("User are redirecred to the Login page, Username and Password field are empty", async () => {
 
        await inventoryPage.clickLogout()
        await browser.pause(2000)

        // Check if the user is redirected to the login page
        await browser.waitUntil( 
            async () => (await browser.getUrl()) === 'https://www.saucedemo.com/',
            {
                timeout: 5000,
                timeoutMsg: 'User is NOT redirected to the login page'
            }
        )
        expect(await browser.getUrl()).toBe('https://www.saucedemo.com/')

        // Check if the username and password fields are empty
        const loginValue = await loginPage.getLoginValue()
        expect(loginValue).toBe(undefined) 
        const passwordValue = await loginPage.getPasswordValue()
        expect(passwordValue).toBe(undefined)

    })

})