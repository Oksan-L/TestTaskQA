
// This test checks the functionality of clicking on pseudo-elements ::before and ::after of a select element.

describe('Click pseudo-elements test (both expected to work)', () => {

    beforeEach(async () => {
        await browser.url('https://www.saucedemo.com');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await expect($('.select_container')).toBeDisplayed();
    });

    it('should open select when clicking on ::before (left side)', async () => {
        const container = await $('.select_container');
        const size = await container.getSize();
        const location = await container.getLocation();

        // left click (::before)
        const clickX = location.x + 5;
        const clickY = location.y + size.height / 2;

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

        await browser.releaseActions();

        const isFocused = await browser.execute(() => {
            return document.activeElement === document.querySelector('.product_sort_container');
        });

        await expect(isFocused).toBe(true); // expect to pass
    });

    it('should open select when clicking on ::after (right side)', async () => {
        const container = await $('.select_container');
        const size = await container.getSize();
        const location = await container.getLocation();

        // right click (::after)
        const clickX = location.x + size.width - 5;
        const clickY = location.y + size.height / 2;

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

        await browser.releaseActions();

        const isFocused = await browser.execute(() => {
            return document.activeElement === document.querySelector('.product_sort_container');
        });

        await expect(isFocused).toBe(true); // expect to fail
    });

    it('should show pointer cursor when hovering ::before', async () => {

        const container = await $('.select_container');
        const size = await container.getSize();
        const location = await container.getLocation();

        const beforeX = location.x + 5;
        const beforeY = location.y + size.height / 2;

        await browser.performActions([{
            type: 'pointer',
            id: 'mouse1',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 0, x: beforeX, y: beforeY }
            ],
        }]);

        const beforeCursor = await browser.execute((x, y) => {
            const el = document.elementFromPoint(x, y);
            const styleBefore = getComputedStyle(el, '::before').cursor;
            const fallback = getComputedStyle(el).cursor;
            return styleBefore || fallback;
        }, beforeX, beforeY);

        // expect pointer (but it fails)
        expect(beforeCursor).toBe('pointer');
    });

    it('should show pointer cursor when hovering ::after', async () => {
        const container = await $('.select_container');
        const size = await container.getSize();
        const location = await container.getLocation();

        const afterX = location.x + size.width - 5;
        const afterY = location.y + size.height / 2;

        await browser.performActions([{
            type: 'pointer',
            id: 'mouse2',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 0, x: afterX, y: afterY }
            ],
        }]);

        const afterCursor = await browser.execute((x, y) => {
            const el = document.elementFromPoint(x, y);
            const styleAfter = getComputedStyle(el, '::after').cursor;
            const fallback = getComputedStyle(el).cursor;
            return styleAfter || fallback;
        }, afterX, afterY);

        // expect pointer (and it passes)
        expect(afterCursor).toBe('pointer');
    });

});
