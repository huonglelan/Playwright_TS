import { test, expect } from '@playwright/test';
import { performance } from 'node:perf_hooks';
//test scenario (minh se nhom cac test case cung muc dich vao 1 nhom)
//test suite de nhom cac test() co lien quan lai voi nhua
test('vao trang playwright.dev', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
});

test('trang detail', async ({ page }) => {
   await page.goto('https://playwright.dev/');
   await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
});

test('vao trang playwright.dev 2', async ({ page }) => {
   await page.goto('https://playwright.dev/');
   await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
});

//tags

test.describe('Trang chu playwright.dev', () => {
     test('TC01. Check menu hien thi DOCS', async ({ page }) => {
         await page.goto('https://playwright.dev/');
         await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    });

     test.only('TC02. Check url cua trang hien thi', async ({ page }) => {
         await page.goto('https://playwright.dev/');

         await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright')
     });

})
// https://hrm.anhtester.com/erp/desk
test.describe('Trang nhan su anh tester', () => {
     test('TC01. Kich ban dang nhap va kiem tra widget', async ({ page }) => {

        await test.step('Buoc 1: Dieu huong va dang nhap', async()=>{
             await page.goto('https://hrm.anhtester.com/erp/login');
             await page.getByRole('textbox', { name: 'Your Username' }).click();
             await page.getByRole('textbox', { name: 'Your Username' }).fill('admin_example');
             await page.getByRole('textbox', { name: 'Enter Password' }).click();
             await page.getByRole('textbox', { name: 'Enter Password' }).fill('123456');
             await page.getByRole('button', { name: ' Login' }).click();
        })
        await test.step('Buoc 2: Kiem tra dang nhap thanh cong', async()=>{

         //   await page.getByRole('heading', { name: 'Logged In Successfully.' }).click();
             await expect(page.getByRole('heading', { name: 'Logged In Successfully.' })).toBeVisible()
             // expect(page.url()).toBe('https://hrm.anhtester.com/erp/desk');
        })
     });

})

//  waitUntil?: "load"|"domcontentloaded"|"networkidle"|"commit";

//server side rendering - client side rendering...
//load: (default) : cho cho toan HTML. CSS, va cac tai nguyen duoc tai xong
// domcontentloaded: chi cho cho den khi tai lieu HTML ban duoc dc tai va ko can cho CSS hay hinh anh
//vao trang web A => no yeu cau tai 10 api de co the hien thi duoc danh sach , noi dung trang web
//list danh sach cac san pham
// neu la server side -> be tu dong render -> tra cho client 1 html chua day du thong tin san pham
// neu la client side -> no yeu cau minh -> call api get danh sach san pham
// networkidle ...... cho cho den khi khong co hoat dong nao dien ra trong vong 500ms phu hop voi site client side rendering.....
//commit: chi cho cho den khi nhan duoc phan hoi tu server va trinh duyet an dau render trang
//trigger (client nhan biet duoc khi nao se bat duoc tai trang)

//trang web noi bo no 1 cai nut la tai trang => khi an vao nut tai trang => call API -> server  xy va phan hoi -> nhan duoc commit
// -> trang web moi duoc render -> coi nhu hoan thanh

const TARGET_URL = 'https://playwright.dev'

test('TC01. Demo domcontentloaded', async ({ page }) => {
    console.log('DEMO WAIT UNTIL- TC01 - domcontentloaded');

    const startTime = performance.now()
    await page.goto('https://playwright.dev/', {waitUntil: 'domcontentloaded'});

    const endTime = performance.now()

    console.log(`Thoi gian Hoan tat TC01, ${endTime - startTime}`);

    const rootElement = page.locator('#__docusaurus')
    await expect(rootElement).toBeAttached()
});

// Search (Ctrl+K)
test('TC02. Demo load', async ({ page }) => {
    console.log('DEMO WAIT UNTIL - TC02');

    const startTime = performance.now()
    await page.goto('https://playwright.dev/');

    const endTime = performance.now()

    console.log(`Thoi gian Hoan tat TC02, ${endTime - startTime}`);

    const searchButton = page.getByRole('button', { name: 'Search (Ctrl+K)' })
    await expect(searchButton).toBeEnabled()

});

test('TC03. Demo networkidle', async ({ page }) => {
    console.log('DEMO WAIT UNTIL TC03');

    const startTime = performance.now()
    await page.goto('https://playwright.dev/',  {waitUntil: 'networkidle'});

    const endTime = performance.now()

    console.log(`Thoi gian Hoan tat TC03, ${endTime - startTime}`);

    //tai thoi diem nay trang da tinh va hoan toan san sang
    const searchButton = page.getByRole('button', { name: 'Search (Ctrl+K)' })
    await expect(searchButton).toBeEnabled()

});
test('test', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');
  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
  //default playwright la tan 30s
  //   const button = page.getByRole('button', { name: 'Click Me!' })
  //   await button.click()
  //const wait locator status.getText() => Button Clicked Successfully!
  await expect(page.locator('#status')).toContainText('Button Clicked Successfully!');
});