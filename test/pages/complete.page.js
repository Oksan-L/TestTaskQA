class completePage {

    get completeHeader() { return $('#checkout_complete_container > h2') }
    get completeText() { return $('#checkout_complete_container > div.complete-text') }
    get backHomeButton() { return $('#back-to-products') }

    async clickBackHomeButton() {
        await this.backHomeButton.click()  
    }

    async getCompleteHeaderText() {
        return await this.completeHeader.getText()
    }

    async getCompleteText() {
        return await this.completeText.getText()
    }

    async clickBackHomeButton() {
        await this.backHomeButton.click()
    }

}

export default new completePage()