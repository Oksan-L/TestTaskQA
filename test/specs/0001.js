// Precondition: User is on the login page

import loginPage from "../pages/login.page"
import inventoryPage from "../pages/inventory.page"

describe("Valid Login", () => {

    it("0001 test", async () => {

    // Enter valid login into "Login" field
    // Data is entered to the field

    loginPage.open()
    await expect(loginPage.loginInput).toBeDisplayed()
    await loginPage.loginInput.setValue('standard_user')
    const value1 = await loginPage.loginInput.getValue()
    expect(value1).toBe('standard_user')

    // Enter valid password into "Password" field
    // Data is entered to the field, data is represented as dots instead of characters

    await expect(loginPage.passwordInput).toBeDisplayed()
    await loginPage.passwordInput.setValue('secret_sauce')
    const value2 = await loginPage.passwordInput.getValue()
    expect(value2).toBe('secret_sauce')
    await browser.pause(2000)

    const passwordType = await loginPage.passwordInput.getAttribute('type')
    expect(passwordType).toBe('password')

    // Click "Login" button
    // User is redirected to the inventory page. Products and cart are displayed

    await loginPage.loginButton.click()
    await browser.pause(2000) 
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/inventory.html'),
        {
            timeout: 5000,
            timeoutMsg: 'User is NOT redirected to the inventory page'
        }
    )
    expect(await browser.getUrl()).toContain('/inventory.html')

    await expect(inventoryPage.inventoryList).toBeDisplayed()
    await expect(inventoryPage.cartIcon).toBeDisplayed()

    })
})