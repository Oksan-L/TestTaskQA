class loginPage {

    get loginInput() { return $('#user-name') }
    get passwordInput() { return $('#password') }
    get loginButton() { return $('#login-button') }
    get errorMessage() { return $('.error-message-container h3') }
    get errorMessage2() { return $('[data-test="error"]') }
    get errorIcons() { return $$('.error_icon') }


    async open() {
        await browser.url('https://www.saucedemo.com/')
    }

    async enterLogin(login) {
        await this.loginInput.setValue(login)
    }

    async enterPassword(password) {
        await this.passwordInput.setValue(password)
    }

    async getLoginValue() {
        await this.loginInput.getValue()
    }

    async getPasswordValue() {
        await this.passwordInput.getValue()
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }

    async standardUserLogin() {
        await this.enterLogin('standard_user')
        await this.enterPassword('secret_sauce')
        await this.clickLoginButton()

        // Wait for the user to be redirected to the inventory page
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory.html'),
            {
                timeout: 5000,
                timeoutMsg: 'User is NOT redirected to the inventory page'
            }
        );
        expect(await browser.getUrl()).toContain('/inventory.html');
    }

    async xiconsDisplayed() {
        // Checking the X icons on the fields
        const icons = await this.errorIcons
        await expect(icons.length).toBeGreaterThanOrEqual(2)

        for (const icon of icons) {
            await expect(icon).toBeDisplayed()
        }
    }
}

export default new loginPage()