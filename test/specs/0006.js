//Precondition: User is on the logined into account. User is on the inventory page

import loginPage from "../pages/login.page"
import inventoryPage from "../pages/inventory.page"

describe("Sorting", () => {

    it("0006 test", async () => {

        await loginPage.open()
        await loginPage.standardUserLogin()
        await browser.pause(2000) 

        await expect(inventoryPage.sortingButton).toBeClickable()

        // Sorting options
        //Name (A to Z) = 'az'
        //Name (Z to A) = 'za'
        //Price (low to high) = 'lohi'
        //Price (high to low) = 'hilo'
        
        //1. Price (low to high)
        //All products was sorted due choosed sorting - Price (low to high)

        await inventoryPage.selectSortingOption('lohi')

        let prices = await inventoryPage.getProductPrices()
        let sortedPrices = [...prices].sort((a, b) => a - b)

        expect(prices).toEqual(sortedPrices)
        await browser.pause(2000) 

        //2. Price (high to low)
        //All products was sorted due choosed sorting - Price (high to low)

        await inventoryPage.selectSortingOption('hilo')

        prices = await inventoryPage.getProductPrices()
        sortedPrices = [...prices].sort((a, b) => b - a)

        expect(prices).toEqual(sortedPrices)
        await browser.pause(2000) 

        //3. Name (A to Z)
        //All products was sorted due choosed sorting - Name (A to Z)

        await inventoryPage.selectSortingOption('az')

        let names = await inventoryPage.getProductNames()
        let sortedNames = [...names].sort((a, b) => a.localeCompare(b))

        expect(names).toEqual(sortedNames)
        await browser.pause(2000) 

        //4. Name (Z to A)
        //All products was sorted due choosed sorting - Name (Z to A)

        await inventoryPage.selectSortingOption('za')

        names = await inventoryPage.getProductNames()
        sortedNames = [...names].sort((a, b) => b.localeCompare(a))

        expect(names).toEqual(sortedNames)
        await browser.pause(2000) 

    })

})