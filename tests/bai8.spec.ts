import { expect, test } from '@playwright/test';
import { stat } from 'node:fs/promises';
test('ví dụ về upload file 1', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/');
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
    await page.getByRole('tab', { name: '📤 Upload Files' }).click();


    //tìm điểm neo
    //thẻ Input hiển thị -> đi lên cha -> anh em của cha -> con
    //div[contains(text(),'1) Input hiển thị') and @class='ant-card-head-title']/ancestor::div[@class='ant-card-head']/following-sibling::div//span
    //nth(1)

    const visible = page.locator('#visible-input')
    //PW tự động upload file cho chúng ta
    await visible.setInputFiles('tests/fixture/sample1.txt')
    await expect(page.locator("//div[contains(text(),'1) Input hiển thị') and @class='ant-card-head-title']/ancestor::div[@class='ant-card-head']/following-sibling::div//span")
        .nth(1)).toContainText('sample1.txt')
});

//ví dụ 2: bị ẩn input
test('ví dụ về upload file 2', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/');
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
    await page.getByRole('tab', { name: '📤 Upload Files' }).click();

    const hidden = page.locator('#hidden-input-upload');
    await hidden.setInputFiles('tests/fixture/sample1.txt');
    await expect(page.locator('#hidden-input-upload')).toBeAttached();
});

//download file
test('ví dụ về dowload file', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app/');
    await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
    await page.getByRole('tab', { name: '📤 Upload Files' }).click();

    const panel = page.getByRole('tabpanel', { name: '📤 Upload Files' });

    // 1. Đợi event download
    // đợi cho tất cả các promise con ở trong array thực hineje thành công rồi lấy kết quả
    // xảy ra đồng thời click - download
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        panel.locator('#download-demo-btn').click(),
    ]);

    // 2. Kiểm tra tên file (suggested)
    expect(await download.suggestedFilename()).toBe('login-data.xlsx');

    // 3. Đọc nội dung bằng stream (không cần require('fs'))
    // const stream = await download.createReadStream();
    // let total = 0;
    // for await (const chunk of stream) {
    //     total += chunk.length;
    // }
    // expect(total).toBeGreaterThan(100); // File không rỗng

    // 4. (tuỳ chọn) Lưu/sao chép file tới chỗ khác rồi verify bằng fs - SAVE AS
    await download.saveAs('downloads/login-data-verified.xlsx');
    
    // kiem tra size file
    const info = await stat('downloads/login-data-verified.xlsx');
    expect(info.size).toBeGreaterThan(100);
});