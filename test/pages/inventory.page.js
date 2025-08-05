class inventoryPage {

    get burgerMenuButton() { return $('#react-burger-menu-btn') } 
    get logoutButton() { return $('#logout_sidebar_link') }
    get menu() { return $('.bm-item-list') }
    get menuItems() { return $$('.bm-item.menu-item') }

    get inventoryList() { return $('#inventory_container') }
    get addToCartButtons() { return $$('.btn.btn_primary.btn_small.btn_inventory') }
    get cartIcon() { return $('#shopping_cart_container') } 
    get cartBadge() { return $('.shopping_cart_badge'); }
    get inventoryItemsNames() { return $$('.inventory_item_name') }

    get sortingButton() { return $('.select_container')}
    get sortingSelect() { return $('.product_sort_container') }
    get priceElements() { return $$('.inventory_item_price') }

    get twitterLink() { return $('.social_twitter') }
    get facebookLink() { return $('.social_facebook') }
    get linkedinLink() { return $('.social_linkedin') }

    async clickBurgerMenu() {
        await this.burgerMenuButton.click()
    }

    async clickLogout() {
        await this.logoutButton.click()
    }

    async clickCartIcon() {
        await this.cartIcon.click()
    }

    // Clicks the "Add to cart" button for a specific product. ProductIndex is the index of the product in the inventory list
    async clickAddToCartButton(productIndex) {
        const button = this.addToCartButtons[productIndex]
        if (button) {
            await button.click()
        } else {
            throw new Error(`Add to cart button for product index ${productIndex} not found`)
        }
    }

    async clickTwitterLink() {
        await this.twitterLink.scrollIntoView()
        await browser.pause(500)
        await this.twitterLink.click()  
    }

    async clickFacebookLink() {
        await this.facebookLink.scrollIntoView()
        await browser.pause(500)
        await this.facebookLink.click()
    }

    async clickLinkedinLink() {
        await this.linkedinLink.scrollIntoView()
        await browser.pause(500)
        await this.linkedinLink.click()
    }

    async getCartBadgeNumber() {
    const badge = await this.cartBadge
    if (await badge.isExisting()) {
        const badgeText = await badge.getText()
        return parseInt(badgeText, 10)
    }
    return 0;
    }

    async getInventoryItemName(number) {
        const itemName = await this.inventoryItemsNames[number].getText()
        return itemName
    }

    async getInventoryItemPrice(index) {
        const priceText = await this.priceElements[index].getText();
        return parseFloat(priceText.replace('$', ''));
    }

    // Retrieves the prices of all products in the inventory
    async getProductPrices() {
        const priceElements1 = await $$('.inventory_item_price');
        const prices = []
            for (const el of priceElements1) {
                const text = await el.getText() // example: "$9.99"
                const num = parseFloat(text.replace('$', ''))
                prices.push(num)
            }
        return prices;
    }

    // Retrieves the names of all products in the inventory
    async getProductNames() {
        const nameElements = await $$('.inventory_item_name')
        const names = []

        for (const el of nameElements) {
            const text = await el.getText()
            names.push(text)
        }

        return names
    }

    // Selects a sorting option from the dropdown menu
    //Name (A to Z) = 'az'
    //Name (Z to A) = 'za'
    //Price (low to high) = 'lohi'
    //Price (high to low) = 'hilo'
    async selectSortingOption(option) {
        await this.sortingButton.click()
        await this.sortingSelect.selectByAttribute('value', option);
    }

    async clearCartIfNotEmpty() {
        const cartCount = await this.getCartBadgeNumber();

        if (cartCount > 0) {
            // Find all "Remove" buttons in the cart
            const removeButtons = await $$('button.btn_inventory');

            for (const button of removeButtons) {
                const text = await button.getText();
                if (text === 'Remove') {
                    await button.click();
                }
            }

            // Wait until the cart is empty
            await browser.waitUntil(async () => {
                const newCount = await this.getCartBadgeNumber();
                return newCount === 0;
            }, {
                timeout: 5000,
                timeoutMsg: 'Cart was not cleared within 5 seconds'
            });
        }
    }


}

export default new inventoryPage()