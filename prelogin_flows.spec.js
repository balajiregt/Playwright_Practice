// @ts-check
const { test, expect } = require('@playwright/test');
test.use({ viewport: { width: 1280, height: 721 } });


test.describe("Asserting various prelogin scenarios", () => {
test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://automationpractice.com/index.php");
  });

  test('to verify that the user is not login- "sign in" button is available- cart is empty', async({page}) => {
    await page.locator('a.login').isVisible()
    const prelogincart = page.locator('span.ajax_cart_no_product');
    await expect(prelogincart).toContainText('(empty)')
  });

   test('to verify that when searching some dress data and no results found', async({page}) => {
        let invalidsearchvalue="jeans"
        await page.locator('input[name="search_query"]').type(invalidsearchvalue)
        await page.locator('button[name="submit_search"]').click()

        const errormessage=page.locator('.heading-counter')
        await expect(errormessage).toContainText('0 results have been found')

    });

    test('to verify the "add to compare products', async({page}) => {
      let validsearchvalue="summer"
      await page.locator('input[name="search_query"]').type(validsearchvalue)
      await page.locator('button[name="submit_search"]').click()
      await page.waitForTimeout(10000)
      
      //to assert the attribute disabled for the compare button
      const comparebutton= page.locator('button[disabled="disabled"]')
      expect(comparebutton).toHaveCount(2)
      
      //to assert the compare value equals 0
      const comparebutton1value= await page.locator('//div[@class="top-pagination-content clearfix"]//strong[@class="total-compare-val"]').innerText()
      const comparebutton2value=await page.locator('//div[@class="bottom-pagination-content clearfix"]//strong[@class="total-compare-val"]').innerText()
      expect(comparebutton1value).toEqual('0')
      expect(comparebutton2value).toEqual('0')

      // //to assert that user cannot add to wishlist in prelogin
      await page.goto('http://automationpractice.com/index.php?id_product=5&controller=product&search_query=summer&results=4');
      await page.locator('a#wishlist_button').click()
      const fancyerror=await page.locator('p.fancybox-error').innerText()
      expect(fancyerror).toEqual('You must be logged in to manage your wishlist.')
    });
 
})
