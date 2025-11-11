// web accessibility (kha nang tiep can ) - nen tang cua getByRole

//getByRole cua playwright se xac dinh nhung the HTML co cau tuc nhu the nao => theo vai tro ngam dinh

//interface hoac la type alias Locator

// 'day la Trang chu'

import { test, expect } from '@playwright/test';
import { normalize } from 'path';

test('Vai tro ngam dinh', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click();
  // await page.getByRole('button', { name: 'Playwright getByRole' }).click()
  //   page.getByRole('link', {name: 'Trang chủ'})
  // const linkLocator = page.getByRole('link', { name: 'Trang chủ' })
  // console.log(' phan tu o tren web', await linkLocator.count());

  // await linkLocator.nth(0).fill('HOANG')
  //   await linkLocator.hover()
  // await linkLocator.highlight()

  // await page.pause()

  // await page.getByRole('checkbox', { name: 'Đồng ý điều khoản' }).check()
  // await page.getByRole('radio', { name: 'Nam' }).check()
  // await page.getByRole('textbox', { name: 'Email:' }).fill('abc@gmail.com')
  // await page.getByRole('textbox', { name: 'Mật khẩu:' }).fill('abc@123')
  // await page.getByRole('textbox', { name: 'Ghi chú:' }).fill('test')

  // const checkbox = page.getByRole('checkbox', { name: 'Tôi đồng ý', checked: true });
  // console.log(await checkbox.count());
  // await expect(checkbox).toBeVisible()
  // await page.getByRole('button', { name: 'Bài tập' }).click()
  // const buttonB = page.getByRole('button', { name: 'More options', expanded: false })
  // await buttonB.click()
  // const menuDuplicated = page.getByRole('menuitem', {name: 'Duplicate'})

  // await expect(menuDuplicated).toBeVisible()

  // await page.locator('.edit-profile-btn').dblclick()
  // console.log(await page.locator('.success-message').textContent());

  // await page.locator('[placeholder="Nhập email"]').fill('hoang@gmail.com')
  // await page.locator('#password-input').fill('123')
  // await page.locator('#login-submit-btn').click()
  const soLuongPhanTu = page.locator('button[id*="profile"]');
  console.log(await soLuongPhanTu.count());
  await page.pause();
});

// <input placeholder="Nhập tên đăng nhập" type="text" name="username" style="padding: 8px; border: 1px solid rgb(204, 204, 204); border-radius: 4px;">
// tag = input x
// id khong co x
// className = x
// [placeholder='Nhập tên đăng nhập']
// <input placeholder="Nhập email" type="email" name="email" style="padding: 8px; border: 1px solid rgb(204, 204, 204); border-radius: 4px;">

//[type="email"]

// <button id="btn-user-profile-123" style="background-color: rgb(0, 123, 255); color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">User Profile</button>
// #btn-user-profile-123 . count() = 1
// #btn-admin-profile-456. count() = 1
// button[id*="profile"]  => count() = 2

// 1 the dau tien sau dau <  thi tat ca cac phan tu tiep theo dc goi la attribute haty la thuoc tinh)
// <input id="username-input" type="text" style="width: 200px; padding: 5px; border: 1px solid rgb(204, 204, 204);">

// <button class="btn primary" style="background-color: rgb(0, 123, 255); color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">Primary Button</button>

// class="btn primary"
//btn secondary disabled
// <input class="form-control required" placeholder="Email bắt buộc" type="email" style="padding: 8px; border: 2px solid rgb(40, 167, 69); border-radius: 4px;">
// button.btn.secondary.disabled

// input <tag

// [type="email"] < attribute

// .required < class

// input[type="email"].required
// <div id="header" class="sticky visible" data-testid="main-header" style="background-color: rgb(248, 249, 250); padding: 10px; border: 2px solid rgb(0, 123, 255); border-radius: 4px; color: rgb(51, 51, 51);">Header (sticky + visible)</div>

// id => #header
// data-testid => [data-testid='main-header']
// class => .visible
// #header[data-testid='main-header'].visible

// <divCha>
//     <divCon1>
//     <divCon2>
//     <divCon3>
// </divCha>

// <input required placeholder="Required field" type="text" style="padding: 8px; border: 1px solid rgb(204, 204, 204); border-radius: 4px; width: 200px;">

//
// product-card featured.Add to Cart

// product-card featured

test.only('Xpath selector', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 2: Playwright Locators' }).click();

  await page.getByRole('button', { name: 'CSS Selector' }).click();

  await page.getByRole('button', { name: 'Giới hạn CSS' }).click();

  await page.locator('button', { hasText: 'Thêm vào giỏ' }).highlight();

  //   await page.locator('//input[@name="email"]').fill('hoang@gmail.com');
  //   await page.getByLabel('Email:').highlight();
  //   await page.locator('.product-card').filter({ hasText: 'iPhone 15 Pro' }).nth(0);
  await page.pause();
});
//minh co the noi tiep cac locator voi nhau => tu cha -> con

//duong dan tuyet doi
// /html/body/div[1]/div/main/div/div/div[2]/div[2]/div[2]/div/div/div[1]/div/header/h1

// #id
// duong dan tuong doi
//div[@id='root']//section[@class='hero']//span[@class='title']

//attribute

// se dung @attribute
//a[@href]

//a
//  => tim tat ca trong html the <a>

// [@href] => co attribute la href

// <div class="card">
//   <h4>Article</h4>
//   <p>Body</p>
//   <button>Read</button>
//   <a href="#">More</a>
// </div>;
// .card

//div[@class='card']//a

// <button data-action="submit" data-variant="primary">Submit</button>
//button[@data-variant='primary']
//input[contains(@placeholder,'Email')]
//button[contains(@data-variant, 'primary')]

//p[contains(text(),'Welcome to Docs')]

//p => tim tat ca the p
// => p dau tien
// [contains(normalize-space(.))] => dau . o day bieu thi cho chinh cai the do
//  check co chua dong Welcome to Docs =? hay ko
// nhay coc tu div => li
//div[@class='menu-example']//li
// di tung cap 1
//div[@class='menu-example']/ul/li

// <div class="product-card" data-category="electronics" data-price="999">
//   <h5>iPhone 15</h5>
//   <button>Add to Cart</button> -> lai co nhieu phan tu giong nhau
// </div>;

// -> chien luoc -> tim mo neo va nhay tu div => button
//-> bat dau tu mo neo
// div[@class="product-card" and data-price="999"]