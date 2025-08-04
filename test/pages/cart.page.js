class cartPage {

    get cartItems() { return $$('.cart_item_label') }
    get cartItemsNames() { return $$('.inventory_item_name') }
    get checkoutButton() { return $('#checkout') }
    get checkoutContainer() { return $('#checkout_info_container') }
    get continueButton() { return $('#continue') } 

    get firstNameInput() { return $('#first-name') }
    get lastNameInput() { return $('#last-name') }
    get postalCodeInput() { return $('#postal-code') }

    async isCartPageOpen() {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/cart.html'),
            {
                timeout: 5000,
                timeoutMsg: 'User is NOT redirected to the cart page'
            }
        );
        expect(await browser.getUrl()).toContain('/cart.html')
    }

    async isCartListDisplayed() {
        const cartList = await $('.cart_list')
        return await cartList.isDisplayed()
    }

    async getCartItemName(number) {
        const itemName = await this.cartItemsNames[number].getText()
        return itemName
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click()
    }
}

export default new cartPage()