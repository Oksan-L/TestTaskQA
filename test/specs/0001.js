import { browser, expect } from '@wdio/globals'

describe("Valid Login", () => {
    it("Data is entered to the field", async () => {
    await browser.url('https://www.saucedemo.com/')

    let loginplace = await $('#user-name')
    await expect(loginplace).toBeDisplayed()

    await loginplace.setValue('standard_user')

    const value1 = await loginplace.getValue()
    expect(value1).toBe('standard_user')
    })

    it("Data is entered to the field, data is represented as dots instead of characters", async () => {
    let passwordplace = await $('#password')
    await expect(passwordplace).toBeDisplayed()

    await passwordplace.setValue('secret_sauce')

    const value2 = await passwordplace.getValue()
    expect(value2).toBe('secret_sauce')

    await browser.pause(2000)

    const passwordType = await passwordplace.getAttribute('type')
    expect(passwordType).toBe('password')
    })

    it("User is redirected to the inventory page. Products and cart are displayed", async () => {
    let loginbutton = await $('#login-button')
    await loginbutton.click()

    await browser.pause(2000) 

    // Wait for the user to be redirected to the inventory page
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory.html'),
            {
                timeout: 5000,
                timeoutMsg: 'User is NOT redirected to the inventory page'
            }
        )
        expect(await browser.getUrl()).toContain('/inventory.html')

        // Checking the display of the product list
        const inventoryList = await $('#inventory_container')
        await expect(inventoryList).toBeDisplayed()

        // Checking the display of the cart icon
        const cartIcon = await $('#shopping_cart_container')
        await expect(cartIcon).toBeDisplayed()
    })
})