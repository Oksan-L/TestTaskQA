//Precondition: User is on the logined into account. User is on the inventory page

import loginPage from "../pages/login.page"
import inventoryPage from "../pages/inventory.page"
import cartPage from "../pages/cart.page"

let addedItemNumber = 0
let addedItemName

describe("Saving the card after logout ", () => {

    it("Login", async () => {
            await loginPage.open()
            await loginPage.standardUserLogin()
        })

    //Click on the "Add to cart" button near any product
    it ("Number near the cart at the top right increase by 1, product is added to cart", async () => {

        let inCartNow1 = await inventoryPage.getCartBadgeNumber()
        console.log('В корзині зараз:', inCartNow1)

        // Click on the "Add to cart" button for the first product
        await inventoryPage.clickAddToCartButton(addedItemNumber)
        addedItemName = await inventoryPage.getInventoryItemName(addedItemNumber)
        await browser.pause(2000) 

        let inCartNow2 = await inventoryPage.getCartBadgeNumber()
        console.log('В корзині зараз:', inCartNow2)

        // Check if the cart badge number has increased by 1
        expect(inCartNow2).toBe(inCartNow1 + 1)

    })

    //Click on the "Burger" button at the top left corner
    it ("Menu are expanded, 4 items are displayed", async () => {
        
        await inventoryPage.clickBurgerMenu()
        
        // Check if the menu is displayed
        const menu = await inventoryPage.menu
        await expect(menu).toBeDisplayed()

        // Check if the menu items are displayed
        const menuItems = await inventoryPage.menuItems
        expect(menuItems.length).toBe(4)
        for (const item of menuItems) {
            await expect(item).toBeDisplayed()
        }

        await browser.pause(2000) 
    })

    //Click on the "Logout" button
    it("User are redirecred to the Login page, Username and Password field are empty", async () => {
    
        await inventoryPage.clickLogout()
        await browser.pause(2000)

        // Check if the user is redirected to the login page
        await browser.waitUntil( 
            async () => (await browser.getUrl()) === 'https://www.saucedemo.com/',
            {
                timeout: 5000,
                timeoutMsg: 'User is NOT redirected to the login page'
            }
        )
        expect(await browser.getUrl()).toBe('https://www.saucedemo.com/')

        // Check if the username and password fields are empty
        const loginValue = await loginPage.getLoginValue()
        expect(loginValue).toBe(undefined) 
        const passwordValue = await loginPage.getPasswordValue()
        expect(passwordValue).toBe(undefined)
    })

    //Login to the account using the same valid login and password
    it("Login second time", async () => {

        await loginPage.standardUserLogin()

    })

    //Click on the "Cart" button at the top right corner
    it("Cart page is displayed, product are the same as was added at step 1", async () => {

        await browser.pause(2000)

        await inventoryPage.clickCartIcon()
        await browser.pause(2000)

        await cartPage.isCartPageOpen()
        const isCartListDisplayed = await cartPage.isCartListDisplayed()
        expect(isCartListDisplayed).toBe(true)

        // Check if the product is still in the cart
        const cartItems = await cartPage.cartItemsNames
        expect(cartItems.length).toBeGreaterThanOrEqual(addedItemNumber + 1)

        const cartItemName = await cartPage.getCartItemName(addedItemNumber)
        expect(cartItemName).toBe(addedItemName)

    })
    
})