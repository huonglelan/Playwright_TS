import { expect, test } from '@playwright/test';

test('ví dụ về checkbox và radio', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Checkboxes & Radio' }).click();

  // Checkbox 1: check() / uncheck()
  await page.locator('#demo-checkbox-1').check();
  await expect(page.locator('#demo-checkbox-1')).toBeChecked();

  await page.locator('#demo-checkbox-1').uncheck();
  await expect(page.locator('#demo-checkbox-1')).not.toBeChecked();

  // Checkbox 2: setChecked(true/false)
  await page.locator('#demo-checkbox-2').setChecked(true);
  await expect(page.locator('#demo-checkbox-2')).toBeChecked();

  await page.locator('#demo-checkbox-2').setChecked(false);
  await expect(page.locator('#demo-checkbox-2')).not.toBeChecked();

  // Checkbox 3: Idempotent - Gọi lại nhiều lần an toàn
  await page.locator('#demo-checkbox-3').setChecked(true);
  await page.locator('#demo-checkbox-3').setChecked(true); // ✅ Vẫn OK, không có side effect
  await expect(page.locator('#demo-checkbox-3')).toBeChecked();

  await page.pause();
});
// ví dụ là thằng checkbox đang ko check()
//locator.check() -> checkbox sẽ đc check ()
//locator.check() -> check box này vẫn là check()
//locator.check()=> đảm bảo ô đc check. (nếu đã check -> ko làm gì cả)
//locator.uncheck()=> đảo bảo ô bị uncheck( nếu đã bỏ check => ko làm gì cả)
//locator.setChecked(boolean) ->

//const shouldBeChecked = true;
// await page.locator().check()
// expect(pageXOffset.locator).toBecheked()
// locator.setChecked(shouldBeChecked) -> luôn đảm bảo cho radio hoặc checkbox đc check ->

//dropdown 
//1. the <select> -> pw ho tro, khong can mo dropdown -> xu ly truc tiep
//2. the <div> -> click dropdown -> lay thong tin element trong dropdown day
//3. wrapper bao boc <div> bao boc <input> -> phai tim den the <input> sau ben trong
//4. Custom dropdown danh sách dài cần scroll. Chọn được nhiều quốc gia. Không dùng data-testid; định vị bằng XPath theo text.

test('ví dụ về drop down 1', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Checkboxes & Radio' }).click();

  const dropdownLocator = page.locator('#country-select')
  //await dropdownLocator.click() -> ko can mo truc tiep
  await dropdownLocator.selectOption('Vietnam')

});

test('ví dụ về drop down 2', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Checkboxes & Radio' }).click();

  //const panel = page.getByRole('tab', { name: 'Checkboxes & Radio' })

  //click dropdown
  await page.locator("//div[contains(text(),'Custom Dropdown (Không dùng <select>')]/ancestor::div[@class='ant-card-head']/following-sibling::div//div[@class='cd-trigger']")
    .click()

  //chọn theo text chính xác
  //await page.locator("//ul[contains(@class,'cd-menu']//li[normalize-space()='Banana']").click()
});

test('ví dụ về drop down 4 scroll down', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Checkboxes & Radio' }).click();

  // Scope tab
  const panel = page.getByRole('tabpanel', { name: '☑️ Checkboxes & Radio' });

  // 1) Mở dropdown lớn theo trigger
  await panel.locator("xpath=//div[contains(@class,'custom-dropdown') and contains(@class,'large')]//div[contains(@class,'cd-trigger')]").click();

  // 2) CÁCH 1: Dùng scrollIntoViewIfNeeded() - Đơn giản nhất
  const targets = ['Vietnam', 'Japan', 'United States', 'Germany', 'Brazil'];
  for (const name of targets) {
    const item = panel.locator(
      "xpath=//div[contains(@class,'custom-dropdown') and contains(@class,'large')]//ul[contains(@class,'cd-menu')]//li[.//span[normalize-space()='" + name + "']]"
    );

    // Scroll item vào view và click
    await item.scrollIntoViewIfNeeded();
    await item.click();
  }
  await page.pause()
});
//native dialog ko nam trong DOM -> lau/cu
test('ví dụ về alert native dialog', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Alerts & Modals' }).click();

  // Khuyến nghị: dùng page.once('dialog') cho từng thao tác để kiểm soát chính xác
  const panel = page.getByRole('tabpanel', { name: '⚠️ Alerts & Modals' });

  // ALERT → Accept và assert UI
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('Hello from alert');
    await dialog.accept();
  });
  await panel.locator('#btn-alert').click();
  await expect(panel.locator('#alert-result')).toHaveText('Alert acknowledged');

  //await page.pause()

  // CONFIRM → Accept (YES) và assert UI
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('Are you sure');
    await dialog.accept();
  });
  await panel.locator('#btn-confirm').click();
  await expect(panel.locator('#confirm-result')).toHaveText('Confirmed: YES');

  // CONFIRM → Dismiss (NO) và assert UI
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    await dialog.dismiss();
  });
  await panel.locator('#btn-confirm').click();
  await expect(panel.locator('#confirm-result')).toHaveText('Confirmed: NO');

  // PROMPT → Accept với text và assert UI hiển thị đúng text
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toContain('Your name');
    //truyen text vafo input
    await dialog.accept('Tester');
  });
  await panel.locator('#btn-prompt').click();
  await expect(panel.locator('#prompt-result')).toHaveText('Hello, Tester');

  // PROMPT → Dismiss (Cancel) và assert UI
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    await dialog.dismiss();
  });
  await panel.locator('#btn-prompt').click();
  await expect(panel.locator('#prompt-result')).toHaveText('Prompt canceled');

});

//UI Modal (Ant design) - popup
test('ví dụ về modal', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Alerts & Modals' }).click();

  //mở modal, điền tên, xác nhận và assert kết quả
  await page.locator("#open-basic-modal").click() //click vao the button cha, han che click vao span
  //assert modal hien ra de thao tac
  await expect(page.getByRole('dialog', {name: 'Thông báo'})).toBeVisible()
  //thao tac voi modal
  await page.locator('#basic-modal-input').fill('Huong') //nen han che, khoanh vung the cha -> con chu ko nen dung page.
  //xac nhan
  await page.getByRole('button', {name: 'Đồng ý'}).click()
  //assert
  await expect(page.locator('#basic-modal-result')).toHaveText('Submitted: Huong')


});

//locator chain -> nối nhiều locator với nhau
//nối từ thằng cha -> thằng con