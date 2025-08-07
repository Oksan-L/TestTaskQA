// Precondition: User is on the login page

import loginPage from "../pages/login.page"

describe("Login with invalid password", () => {

    it("0002 test", async () => {

    // Enter valid login into "Login" field
    // Data is entered to the field

    loginPage.open()
    await expect(loginPage.loginInput).toBeDisplayed()
    await loginPage.loginInput.setValue('standard_user') //valid login
    const value1 = await loginPage.loginInput.getValue()
    expect(value1).toBe('standard_user')

    // Enter invalid password into "Password" field
    //Data is entered to the field, data is represented as dots instead of characters

    await expect(loginPage.passwordInput).toBeDisplayed()
    await loginPage.passwordInput.setValue('not_a_valid_password') //invalid password
    const value2 = await loginPage.passwordInput.getValue()
    expect(value2).toBe('not_a_valid_password')
    await browser.pause(2000)

    const passwordType = await loginPage.passwordInput.getAttribute('type')
    expect(passwordType).toBe('password')

    // Click "Login" button
    // X icons are displayed on the Login and Password fields, this fields are highlighted with red. Epic sadface: Username and password do not match any user in this service - error message are displayed
    
    await loginPage.loginButton.click()
    await browser.pause(2000) 
    
    await browser.waitUntil(
        async () => (await $('.error-message-container')).isDisplayed(),
        {
            timeout: 5000,
            timeoutMsg: 'Error message is not displayed'
        }
    )

    // Checking the error message
    await expect(loginPage.errorMessage2).toBeDisplayed()
    expect(await loginPage.errorMessage2.getText()).toContain('Epic sadface: Username and password do not match any user in this service')

    // Checking the red border on the fields
    await expect(loginPage.loginInput).toHaveElementClass('input_error')
    await expect(loginPage.passwordInput).toHaveElementClass('input_error')

    const loginBorderColor = await loginPage.loginInput.getCSSProperty('border-bottom-color')
    const passwordBorderColor = await loginPage.passwordInput.getCSSProperty('border-bottom-color')
    expect(loginBorderColor.parsed.hex).toBe('#e2231a')
    expect(passwordBorderColor.parsed.hex).toBe('#e2231a')

    await loginPage.xiconsDisplayed()

    })
})