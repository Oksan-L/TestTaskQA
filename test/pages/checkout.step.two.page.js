class checkoutStepTwoPage {

    get itemsNames() { return $$('.inventory_item_name') }
    get itemsPrices() { return $$('.inventory_item_price') }
    get finishButton() { return $('#finish') }

    async getAllItemNames() {
        const elements = await this.itemsNames
        const names = []
        for (const el of elements) {
            names.push(await el.getText())
        }
        return names
    }

    async getAllItemPrices() {
        const elements = await this.itemsPrices
        const prices = []
        for (const el of elements) {
            const text = await el.getText()
            prices.push(parseFloat(text.replace('$', '')))
        }
        return prices
    }

}

export default new checkoutStepTwoPage()
