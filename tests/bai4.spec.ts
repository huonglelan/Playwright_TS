import { test, expect } from '@playwright/test';

const DEMO_URL = 'https://demoapp-sable-gamma.vercel.app/';

//Cấp 1: Mệnh lệnh của sếp

test('Cấp 1: Mệnh lệnh của sếp', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.locator("//span[contains(text(),'Bắt đầu Test')]").click();

  const slowButton1 = page.locator('#button-1');

  //Lỗi timeout 5000ms

  await slowButton1.click({ timeout: 5000 });
});

//Cấp 2: Giới hạn của phòng ban

test('Cấp 2: Giới hạn của phòng ban', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.locator("//span[contains(text(),'Bắt đầu Test')]").click();

  const slowButton2 = page.locator('#button-2');

  //Lỗi timeout 10000ms

  await slowButton2.click();
});

test('Cấp 3: Giới hạn công ty', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.locator("//span[contains(text(),'Bắt đầu Test')]").click();

  const startBtn = page.locator('#start-btn');

  const continueBtn = page.locator('#continue-btn');

  const expectedBtn = page.locator('#final-btn');

  //action timeout 10 s mà tiến trình có 8s thì thoải mái => 8s

  await startBtn.click();

  // 8s < 10s thỏa mãn  => 8s

  await continueBtn.click();

  // tổng phải chờ là 16s

  //báo lỗi timeout 15s

  await expectedBtn.click();
});

//Tc chạy pass khi set lại timeout toàn cục

test('Set lại timeout', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.locator("//span[contains(text(),'Bắt đầu Test')]").click();

  const startBtn = page.locator('#start-btn');

  const continueBtn = page.locator('#continue-btn');

  const expectedBtn = page.locator('#final-btn');

  //action timeout 10 s mà tiến trình có 8s thì thoải mái => 8s

  await startBtn.click();

  // 8s < 10s thỏa mãn  => 8s

  await continueBtn.click();

  // tổng phải chờ là 16s

  //báo lỗi timeout 15s

  await expectedBtn.click();
});

test('Cấp 1: Webfirst assertion', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'Web-First Assertions' }).click();

  await page.getByText('Bắt đầu chờ').click();

  const statusMessage = page.locator('#status-message');

  //thằng PW sẽ cơ chế retry để đảm bảo là sau x giây locator sẽ đc expect nhưu mong muốn. nếu ko thì sẽ văng timeout

  await expect(statusMessage).toHaveText('Tải dữ liệu thành công!', {
    timeout: 5000,
  });
});

test('Cấp 2: Webfirst assertion', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'Web-First Assertions' }).click();

  await page.getByText('Bắt đầu chờ').click();

  const statusMessage = page.locator('#status-message');

  //thằng PW sẽ cơ chế retry để đảm bảo là sau x giây locator sẽ đc expect nhưu mong muốn. nếu ko thì sẽ văng timeout

  await expect(statusMessage).toHaveText('Tải dữ liệu thành công!');
});

test('Webfirst assertion passed', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'Web-First Assertions' }).click();

  await page.getByText('Bắt đầu chờ').click();

  const statusMessage = page.locator('#status-message');

  //thằng PW sẽ cơ chế retry để đảm bảo là sau x giây locator sẽ đc expect nhưu mong muốn. nếu ko thì sẽ văng timeout

  await expect(statusMessage).toHaveText('Tải dữ liệu thành công!', {
    timeout: 8000,
  });
});

//export button

///  Ở trong PW có 3 cấp độ để kiểm soát timeOut

// 1/ Cấp độ cao nhất Inline TimeOut (Mệnh lệnh của sếp)

//2 Cấp độ 2: Trung bình = actionTimeOut => Quy định của phòng ban

//3 Cấp độ 3: Thấp nhất => toàn cục -> quy định của công ty

//timeout toàn cục

//mặc định sẽ là 30s cho timeout toàn cục và 30s cho action timeout

// 🚀 Web-First Assertions

//Có 2 cấp độ

//cấp độ 1; Cao nhất -> inline timeout => mệnh lệnh tối cao

//cấp độ 2: toàn cục - quy định chung (default là 5s)

//toBeAttached

// kiểm tra phần tử có tồn tại trong DOM hay không. nó ko quan tâm cso hiển thị trên mà hình hay ko

test('toBeAttached', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator('#btn-attach').click();

  //đợi 5s để phần tử đc gắn vào DOM

  await expect(page.locator('#attached-node')).toBeAttached();
});

//toBeVisible

// Kiểm tra phần tử vừa tồn tại trong DOM và vừa đang hiển thị trên màn hình

// (nó ko có display: none. visibility: hidden , có kích thước, chiều rộng chiều cao > 0, ko bị che khuất bởi phần tử khác...)

test('toBeVisible', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.pause();

  //ẩn dialog

  await page.locator('#btn-hide').click();

  await page.locator('#btn-show').click();

  //đợi 5s để phần tử đc gắn vào DOM

  await expect(page.locator('#visibility-target')).toBeVisible();
});

//toBeHidden

// là phủ định của visible -> check ko có trong DOM hoặc bị ẩn.

test('toBeHidden', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.pause();

  //ẩn dialog

  await page.locator('#btn-hide-for-hidden').click();

  //đợi 5s để phần tử đc gắn vào DOM

  await expect(page.locator('#hidden-target')).toBeHidden();
});

//toBeChecked

// Kiểm tra phần tử có ở trạng thái được chọn/kích hoạt hay ko

test('toBeChecked với getAttribute', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.pause();

  //ẩn dialog

  await page.locator('#tab-option').click();

  const trangThai = await page.locator('#tab-option').getAttribute('aria-selected');

  console.log(trangThai);

  await page.pause();

  //đợi 5s để phần tử đc gắn vào DOM

  //   await expect(page.locator('#tab-option')).toBeChecked();
});

test('toBeChecked2', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.pause();

  //ẩn dialog

  await page.locator('#news-check').click();

  await expect(page.locator('#news-check')).toBeChecked();
});

//toBeDisabled

// Check phần tử bị vô hiệu hóa

test('toBeDisabled', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.pause();

  //ẩn dialog

  await page.locator('#toggle-disabled').click();

  await expect(page.locator('#email')).toBeDisabled();
});

//toBeEnabled

// Phần tử không bị vô hiệu hóa và có thể tương tác được phủ định của disabled

test('toBeEnabled', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await expect(page.locator('#enabled-input')).toBeEnabled();
});

//toBeEditable

// KIểm tra phần tử có thể nhận được nội dung nhập liệu hay ko. ko bị disabled và ko có thuộc tính read only

test('toBeEditable', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await expect(page.locator('#editable')).toBeEditable();
});

//toBeEmpty

// sẽ check phần tử không chứa bất kì phần tử con nào, hoặc ko có nội dung text()

test('toBeEmpty', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator('#btn-clear').click();

  await expect(page.locator('#empty-box')).toBeEmpty();
});

//toHaveCount

// sẽ check có chứa chính xác bn phần tử

test('toHaveCount', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await expect(page.locator('#items li')).toHaveCount(2);
});

//toContainText

//kiểm tra nội dung text của phần tử. ko phân biệt hoa thường . và tự chuẩn hóa khoảng khoảng trắng

test('toContainText', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator('#btn-set-whitespace').click();

  //   await expect(page.locator('#text-container')).toContainText('john');

  await expect(page.locator('#text-container')).toContainText('Playwright, welcome here');
});

//toBeFocused

// check focus vao input con tro chuot nhấp nháy

test('toBeFocused', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator('#btn-focus').click();

  //   await expect(page.locator('#text-container')).toContainText('john');

  await expect(page.locator('#focusable')).toBeFocused();
});

//toHaveValue

// check thuộc tính value của thẻ input/hoặc texaerea

test('toHaveValue', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.getByText('Set Value', { exact: true }).click();

  //   await expect(page.locator('#text-container')).toContainText('john');

  await expect(page.locator('#value-input')).toHaveValue('Hello World');
});

//toHaveValues

// check giá trị hiện tại của 1 thẻ select multiple có bao nhiêu phần tử array

test('toHaveValues', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.getByText('Set Values', { exact: true }).click();

  //   await expect(page.locator('#text-container')).toContainText('john');

  await expect(page.locator('#multi-select')).toHaveValues(['Action', 'Drama']);
});

//toHaveClass. toContainClass, tohaveCss

//

test('toHaveClass', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator('#btn-toggle-exact-class').click();

  //   await expect(page.locator('#text-container')).toContainText('john');

  await expect(page.locator('#exact-class-target')).toHaveClass('highlight');
});

test('toHaveClass 2', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator('#btn-toggle-class').click();

  //   await expect(page.locator('#text-container')).toContainText('john');

  await expect(page.locator('#class-target')).toHaveClass('highlight');
});

//toHaveAttribute
test('toHaveAttribute', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await page.locator('#btn-toggle-attr').click();

  //   await expect(page.locator('#text-container')).toContainText('john');

  await expect(page.locator('#avatar')).toHaveAttribute('alt', 'User Avatar');
});

//toHaveId
test('toHaveId', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();

  await expect(page.locator('#unique-id')).toHaveId('unique-id');
});

//toBeInViewport
test('toBeInViewport', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();
  await page.locator('#viewport-target').scrollIntoViewIfNeeded();

  await expect(page.locator('#viewport-target')).toBeInViewport();
  await expect(page.locator('#viewport-target')).toBeVisible();
});

//toHaveText
test('toHaveText', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page.getByRole('button', { name: 'expect() có await' }).click();
  await page.locator('#btn-whitespace-text').click();
  const expectedMessage = page.locator('#status-text');
  await expect(expectedMessage).toContainText('Data loaded successfully!');
});