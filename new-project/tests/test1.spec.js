const { test, expect } = require("@playwright/test");

test.describe('qbank server', () => {
    

    test('default option', async ({ page }) => {
        await page.goto('https://qbank.accelq.com/')
        await expect(page.locator('input[id="Personal Banking"]')).toHaveClass("qbf-radio active")
        await expect(page.locator('input[id="Corporate Banking"]')).not.toHaveClass("active")
        await page.locator('[id="Corporate Banking"]').click()
        await expect(page.locator('[id="Corporate Banking"]')).toHaveClass("qbf-radio active")
    });

    test('login', async ({ page }) => {
        await page.goto('https://qbank.accelq.com/')
        await page.type('#qb-username','qbankadmin')
        await page.type('#qb-password','pass123')
        await page.locator('button[class="qb-signin-button"]').click()

    });

    test('postlogin', async ({ page }) => {
        await page.goto('https://qbank.accelq.com/')
        await page.type('#qb-username','qbankadmin')
        await page.type('#qb-password','pass123')
        await page.locator('button[class="qb-signin-button"]').click()
        await page.waitForURL('**\/account/acsum')

    });
})