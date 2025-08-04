//Precondition: User is on the logined into account. User is on the inventory page

import loginPage from "../pages/login.page"
import inventoryPage from "../pages/inventory.page"
import cartPage from "../pages/cart.page"

describe("Checkout without products", () => {

    it("Login", async () => {
        await loginPage.open()
        await loginPage.standardUserLogin()

        await browser.pause(2000) 
    })

    //Click on the "Cart" button at the top right corner
    it("Cart page is displayed, products are not displayed", async () => {

        // Check if the cart is empty
        it("Verify cart is empty or clear it before continuing", async () => {
            await inventoryPage.clearCartIfNotEmpty();

            const cartBadgeNumber = await inventoryPage.getCartBadgeNumber();
            expect(cartBadgeNumber).toBe(0);

        });

        await inventoryPage.clickCartIcon()
        await browser.pause(2000)

        // Check if the cart page is open
        await cartPage.isCartPageOpen()

        // Check if there are no items in the cart
        const items = await cartPage.cartItemsNames;
        expect(items.length).toBe(0);

    })

    //Click on the "Checkout" button
    it("User are located on the Cart Page, error message Cart is empty are displayed", async () => {

        await cartPage.clickCheckoutButton()
        await browser.pause(2000)

        // Check if the user are located on the Cart Page
        expect(await browser.getUrl()).toContain('/cart.html')

        // Verify that the error message is displayed
        const errorMessage = await $('.error-message-container') // I didnt find the exact selector for the error message, so I used a generic one
        await expect(errorMessage).toBeDisplayed()
        const errorText = await errorMessage.getText('Cart is empty')
            
    })

})