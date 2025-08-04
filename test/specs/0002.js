import { browser, expect } from '@wdio/globals'

describe("Login with invalid password", () => {
    it("Data is entered to the field", async () => {
    await browser.url('https://www.saucedemo.com/')

    let loginplace = await $('#user-name')
    await expect(loginplace).toBeDisplayed()

    await loginplace.setValue('standard_user') //valid login

    const value1 = await loginplace.getValue()
    expect(value1).toBe('standard_user')
    })

    it("Data is entered to the field, data is represented as dots instead of characters", async () => {
    let passwordplace = await $('#password')
    await expect(passwordplace).toBeDisplayed()

    await passwordplace.setValue('not_a_valid_password') //invalid password

    const value2 = await passwordplace.getValue()
    expect(value2).toBe('not_a_valid_password')

    await browser.pause(2000)

    const passwordType = await passwordplace.getAttribute('type')
    expect(passwordType).toBe('password')
    })

    it("X icons are displayed on the Login and Password fields, this fields are highlighted with red. Epic sadface: Username and password do not match any user in this service - error message are displayed", async () => {
    
    let loginbutton = await $('#login-button')
    await loginbutton.click()
    await browser.pause(2000) 

    let passwordplace = await $('#password')
    let loginplace = await $('#user-name') 
    
    // Wait for the error message to be displayed
    await browser.waitUntil(
        async () => (await $('.error-message-container')).isDisplayed(),
        {
            timeout: 5000,
            timeoutMsg: 'Error message is not displayed'
        }
    )

    // Checking the error message
    const errorMessage = await $('[data-test="error"]')
    await expect(errorMessage).toBeDisplayed()
    expect(await errorMessage.getText()).toContain('Epic sadface: Username and password do not match any user in this service')

    // Checking the red border on the fields
    await expect(loginplace).toHaveElementClass('input_error')
    await expect(passwordplace).toHaveElementClass('input_error')

    const loginBorderColor = await loginplace.getCSSProperty('border-bottom-color')
    const passwordBorderColor = await passwordplace.getCSSProperty('border-bottom-color')
    expect(loginBorderColor.parsed.hex).toBe('#e2231a')
    expect(passwordBorderColor.parsed.hex).toBe('#e2231a')

    // Checking the X icons on the fields
    const errorIcons = await $$('.error_icon')
    expect(errorIcons.length).toBeGreaterThanOrEqual(2) // should be at least 2 icons for login and password
    for (const icon of errorIcons) {
        await expect(icon).toBeDisplayed()
    }
    })
})