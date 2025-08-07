
// This test checks the functionality of clicking on pseudo-elements ::before and ::after of a select element

import loginPage from "../pages/login.page"
import inventoryPage from "../pages/inventory.page"

describe('Click pseudo-elements test', () => {

    it('functionality of clicking on pseudo-elements ::before and ::after test', async () => {

        await loginPage.open()
        await loginPage.standardUserLogin()
        await browser.pause(2000) 

        const size = await inventoryPage.sortingButton.getSize()
        const location = await inventoryPage.sortingButton.getLocation()

        // should open select when clicking on ::before (left side)

        let clickX = location.x + 5
        let clickY = location.y + size.height / 2

        await browser.performActions([{
            type: 'pointer',
            id: 'mouse1',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 0, x: clickX, y: clickY },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 },
            ],
        }])

        await browser.releaseActions()

        let isFocused = await browser.execute(() => {
            return document.activeElement === document.querySelector('.product_sort_container')
        })

        await expect(isFocused).toBe(true)

        // should open select when clicking on ::after (right side)

        clickX = location.x + size.width - 5
        clickY = location.y + size.height / 2

        await browser.performActions([{
            type: 'pointer',
            id: 'mouse1',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 0, x: clickX, y: clickY },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerUp', button: 0 },
            ],
        }]);

        await browser.releaseActions()

        isFocused = await browser.execute(() => {
            return document.activeElement === document.querySelector('.product_sort_container')
        })

        await expect(isFocused).toBe(true)

        // should show pointer cursor when hovering ::before

        let beforeX = location.x + 5
        let beforeY = location.y + size.height / 2

        await browser.performActions([{
            type: 'pointer',
            id: 'mouse1',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 0, x: beforeX, y: beforeY }
            ],
        }])

        const beforeCursor = await browser.execute((x, y) => {
            const el = document.elementFromPoint(x, y)
            const styleBefore = getComputedStyle(el, '::before').cursor
            const fallback = getComputedStyle(el).cursor
            return styleBefore || fallback
        }, beforeX, beforeY)

        expect(beforeCursor).toBe('pointer')

        // should show pointer cursor when hovering ::after

        let afterX = location.x + size.width - 5
        let afterY = location.y + size.height / 2

        await browser.performActions([{
            type: 'pointer',
            id: 'mouse2',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 0, x: afterX, y: afterY }
            ],
        }])

        const afterCursor = await browser.execute((x, y) => {
            const el = document.elementFromPoint(x, y)
            const styleAfter = getComputedStyle(el, '::after').cursor
            const fallback = getComputedStyle(el).cursor
            return styleAfter || fallback
        }, afterX, afterY)

        expect(afterCursor).toBe('pointer')
    })

})
