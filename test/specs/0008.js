//Precondition: User is on the logined into account. User is on the inventory page

import { faker } from '@faker-js/faker';

import loginPage from "../pages/login.page"
import inventoryPage from "../pages/inventory.page"
import cartPage from "../pages/cart.page"
import checkoutStepTwoPage from "../pages/checkout.step.two.page"
import completePage from "../pages/complete.page"

describe("Valid Checkout", () => {

    it("0008 test", async () => {

        //Login
        await loginPage.open()
        await loginPage.standardUserLogin()

        await browser.pause(2000) 

        //Click on the "Add to cart" button near any product
        //Number near the cart at the top right increase by 1, product is added to cart

        let inCartNow1 = await inventoryPage.getCartBadgeNumber()
        console.log('In the cart now:', inCartNow1)

        let addedItemNumber = 0
        let addedItemName
        let addedItemPrice

        // Click on the "Add to cart" button for the first product
        await inventoryPage.clickAddToCartButton(addedItemNumber)
        addedItemName = await inventoryPage.getInventoryItemName(addedItemNumber)
        addedItemPrice = await inventoryPage.getInventoryItemPrice(addedItemNumber)
        await browser.pause(2000) 

        let inCartNow2 = await inventoryPage.getCartBadgeNumber()
        console.log('In the cart now:', inCartNow2)

        expect(inCartNow2).toBe(inCartNow1 + 1)

        //Click on the "Cart" button at the top right corner
        //Cart page is displayed, product are the same as was added at step 1

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

        //Click on the "Checkout" button
        //Checkout form are displayed
        await cartPage.clickCheckoutButton()
        await browser.pause(2000)

        const checkoutForm = cartPage.checkoutContainer
        await expect(checkoutForm).toBeDisplayed()

        expect(await browser.getUrl()).toContain('/checkout-step-one.html')

        //Fill the "First Name" field with valid data
        //Data is entered to the field (First Name)

        const firstName = faker.person.firstName()
        await cartPage.firstNameInput.setValue(firstName)
        const firstNameValue = await cartPage.firstNameInput.getValue()
        expect(firstNameValue).toBe(firstName)

        //Fill the "Second Name" field with valid data
        //Data is entered to the field (Second Name)

        const lastName = faker.person.lastName()
        await cartPage.lastNameInput.setValue(lastName)
        const lastNameValue = await cartPage.lastNameInput.getValue()
        expect(lastNameValue).toBe(lastName)

        //Fill the "Postal Code" field with valid data
        //Data is entered to the field (Postal Code)

        const postalCode = faker.location.zipCode()
        await cartPage.postalCodeInput.setValue(postalCode)
        const postalCodeValue = await cartPage.postalCodeInput.getValue()
        expect(postalCodeValue).toBe(postalCode)
        await browser.pause(2000)

        //Click on the "Continue" button
        //User is redirected to the Overview page, Products from step 1 is displayed. Total price = price of products from step 1

        await cartPage.continueButton.click()
        await browser.pause(2000)

        const overviewUrl = await browser.getUrl()
        expect(overviewUrl).toContain('/checkout-step-two.html')

        // // Verify that the products from step 1 are displayed
        const itemNames = await checkoutStepTwoPage.getAllItemNames()
        expect(itemNames).toContain(addedItemName)

        // Verify that the total price is equal to the price of the product added in step 1
        const prices = await checkoutStepTwoPage.getAllItemPrices()
        const total = prices.reduce((sum, price) => sum + price, 0)
        expect(total).toBeCloseTo(addedItemPrice, 2)

        //Click on the "Finish" button
        //User is redirected to the Checkout Complete page, Thank you for your order! message are displayed

        await checkoutStepTwoPage.finishButton.click()
        await browser.pause(2000)

        const completeUrl = await browser.getUrl()
        expect(completeUrl).toContain('/checkout-complete.html')

        const thankYouMessage = await completePage.getCompleteHeaderText()
        await expect(thankYouMessage).toBe('Thank you for your order!')

        //Click on the "Back Home" button
        //User is redirected to the inventory page. Products are displayed. Cart is empty
        
        await completePage.clickBackHomeButton()
        await browser.pause(2000)

        const inventoryUrl = await browser.getUrl()
        expect(inventoryUrl).toContain('/inventory.html')

        // Verify that the products are displayed
        const items = await inventoryPage.inventoryItemsNames;
        expect(items.length).toBeGreaterThan(0);
        await expect(inventoryPage.inventoryList).toBeDisplayed()

        // Check if the cart is empty
        const cartBadgeNumber = await inventoryPage.getCartBadgeNumber()
        expect(cartBadgeNumber).toBe(0)

    })

})