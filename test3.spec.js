const { test, expect } = require("@playwright/test");
//const { timeout } = require("../playwright.config");

test('accessing multi elements', async({page}) => {
    await page.goto('https://www.amazon.in/')
    await page.locator('.nav-search-field').type('iPhone 13')
    await page.keyboard.press('Enter')
    
    const itemslist=await page.locator('div[data-component-type="s-search-result"] a>span[class$="a-size-medium a-color-base a-text-normal"]')
    itemslist.forEach(element => {
        console.log(element.allInnerTexts())
    });
    //const texts = await rows.allTextContents();

});