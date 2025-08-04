class loginPage {

    get loginInput() { return $('#user-name') }
    get passwordInput() { return $('#password') }
    get loginButton() { return $('#login-button') }
    get errorMessage() { return $('.error-message-container h3'); }


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
}

export default new loginPage()