//Precondition: User is on the logined into account. User is on the inventory page

import loginPage from "../pages/login.page"
import inventoryPage from "../pages/inventory.page"

describe("Sorting", () => {

    it("Login", async () => {
        await loginPage.open()
        await loginPage.standardUserLogin()

        await browser.pause(2000) 
    })

    it("Sorting button is clickable", async () => {

        await expect(inventoryPage.sortingButton).toBeClickable()

    })

    //Choose one of the sorting options
    //Name (A to Z) = 'az'
    //Name (Z to A) = 'za'
    //Price (low to high) = 'lohi'
    //Price (high to low) = 'hilo'
    
    //1. Price (low to high)
    it("All products was sorted due choosed sorting - Price (low to high)", async () => {

        await inventoryPage.selectSortingOption('lohi')

        // Verify that products are sorted by price low to high
        const prices = await inventoryPage.getProductPrices()
        const sortedPrices = [...prices].sort((a, b) => a - b)

        expect(prices).toEqual(sortedPrices)
        await browser.pause(2000) 

    })
    //2. Price (high to low)
    it("All products was sorted due choosed sorting - Price (high to low)", async () => {

        await inventoryPage.selectSortingOption('hilo')

        const prices = await inventoryPage.getProductPrices()
        const sortedPrices = [...prices].sort((a, b) => b - a)

        expect(prices).toEqual(sortedPrices)
        await browser.pause(2000) 

    })
    //3. Name (A to Z)
    it("All products was sorted due choosed sorting - Name (A to Z)", async () => {

        await inventoryPage.selectSortingOption('az')

        const names = await inventoryPage.getProductNames()
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b))

        expect(names).toEqual(sortedNames)
        await browser.pause(2000) 

    })
    //4. Name (Z to A)
    it("All products was sorted due choosed sorting - Name (Z to A)", async () => {

        await inventoryPage.selectSortingOption('za')

        const names = await inventoryPage.getProductNames()
        const sortedNames = [...names].sort((a, b) => b.localeCompare(a))

        expect(names).toEqual(sortedNames)
        await browser.pause(2000) 

    })

})