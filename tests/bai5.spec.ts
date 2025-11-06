import { expect, test } from '@playwright/test';
import { timeStamp } from 'console';

const DEMO_URL = 'https://demoapp-sable-gamma.vercel.app/';

test('Get text() display:none', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app');

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();

  const parent = page.locator('#demo-element-1');

  const text1 = await parent.textContent();
  console.log('text1', text1);

  const text2 = await parent.innerText();
  console.log('text2', text2);

  const text3 = await parent.innerHTML();
  console.log('text3', text3);

  await page.pause();
});

test('Get text()  visibility: hidden', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();

  const parent = page.locator('#demo-element-2');

  const text1 = await parent.textContent();
  console.log('text1', text1);

  const text2 = await parent.innerText();
  console.log('text2', text2);

  const text3 = await parent.innerHTML();
  console.log('text3', text3);

  await page.pause();
});

test('allTextContents()', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();

  const parent = page.locator('#demo-dropdown');

  const allText = await parent.allTextContents();
  console.log('allText', allText);
  const allTextInner = await parent.allInnerTexts();
  console.log('allTextInner', allTextInner);

  const innerThongThuong = await parent.innerText();
  console.log(innerThongThuong);

  const listItems = page.locator('.demo-list-item');
  const allTexts = await listItems.allTextContents();
  console.log(allTexts);

  await page.pause();
});

test('inputValue(), getAttribute()', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();

  const parent = page.locator('#demo-input-text');

  const inputValue = await parent.inputValue();

  const attributes = page.locator('#demo-attributes');

  const dataStatusAttr = await attributes.getAttribute('data-status');

  console.log(inputValue);
  console.log(dataStatusAttr);

  await page.pause();
});

//expect ko co wait
//toBeValue
// so sanh nghiem ngat giong voi thang === o trong JS va TS => no kiem tra ca kieu du lieu -> gia tri
// phep so sanh cai nay co chinh xac bang cai kia ko? (cunng 1 va tthe)
test('toBe(value)', () => {
  const name: string = 'Playwright';
  const version: number = 1.56;
  const isActive: boolean = true;

  //PASSS
  expect(name).toBe('Playwright');
  expect(version).toBe(1.56);
  expect(isActive).toBe(true);

  //FAIL
  expect(version).toBe('1.56');
});

//toEqual
//so sanh gia tri noi dung cua cac object hoac array. kiem tra 2 obbject hoac array phai giong het nhau
//so sanh 2 cai hop co chua nhung thu giong het nhau ben trong hay khong
test('toEqual', () => {
  const user1 = { id: 1, name: 'A' };
  const user2 = { id: 1, name: 'A' };

  expect(user1).toEqual(user2);
});

//toContain
//Kien tra co chua
//toContainEqual
test('toContain', () => {
  const permissions: string[] = ['read', 'write', 'delete'];
  const users: { id: number; name: string }[] = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
  ];

  //   PASS; //
  expect(permissions).toContain('write');
  //fail
  //   expect(permissions).toContain('update');

  //   expect(users).toContain({ id: 1, name: 'A' });

  expect(users).toContainEqual({ id: 1, name: 'A' });
});

//toBEtruthy va toBeFalsy
//so sanh no co la falsy hay truthy hay ko
test('toBeTruthy', () => {
  expect('hello').toBeTruthy();
  expect({}).toBeTruthy();
  expect([]).toBeTruthy();

  expect('').toBeFalsy();
  expect(0).toBeFalsy();
  expect(null).toBeFalsy();
});
// .toBeGreaterThan / .toBeLessThan
test('toBeGreaterThan', () => {
  const itemCount = 5;
  const totalPrice = 100.5;

  expect(itemCount).toBeGreaterThan(0);
  expect(totalPrice).toBeLessThan(120);
});

//đề bài
// so sánh tên của user là Playwright Learner
test('Bài tập ecommerce', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
  await page.getByRole('tab', { name: 'Expect Assertions' }).click();

  //1. so sánh tên của user
  const userName = page.locator('#profile-name');
  const userNameText = userName;

  await expect(userNameText).toHaveText('Playwright Learner');

  //   //2. so sánh Profile JSON có giá trị là
  //   {
  //   "id": 101,
  //   "role": "student",
  //   "active": true,
  //   "premium": false
  // }
  //   JSON.parse() -> chuyển json về object của TS
  const jsonText = await page.locator('#profile-json').innerText();
  const profile = JSON.parse(jsonText);
  expect(profile).toEqual({
    id: 101,
    role: 'student',
    active: true,
    premium: false,
  });

  //3. Check category chứa audio và category có độ dài là 3 phần tử
  //   array.length=> trả ra độ dài mảng
  const categories = await page.locator('#categories li').allInnerTexts();
  const categorieWebFirst = page.locator('#categories');
  console.log(categories);
  expect(categories.length).toBe(3);
  expect(categories).toContain('🎧 Audio');

  await expect(categorieWebFirst).toContainText('Audio');

  //4 check trạng thái còn hàng
  //   <div id="in-stock-flag" data-value="true" style="font-size: 12px; color: rgb(82, 196, 26);">✓ Available</div>
  //   qua data-value="true"
  //   => muốn convert sang boolean => Boolean(value)

  //   const inStock = await page.locator('#in-stock-flag').
  const status = await page.locator('#in-stock-flag').getAttribute('data-value');
  const st = Boolean(status);
  expect(st).toBeTruthy();
});

// .toHavePropert
test('toHaveProperty', () => {
  const user = {
    id: 1,
    name: 'Alice',
    adress: {
      street: '123 THD',
      city: 'HN',
    },
    isActive: true,
  };

  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('name', 'Alice');

  expect(user).toHaveProperty('adress.city');
  expect(user).toHaveProperty('adress.city', 'HN');

  expect(user).toHaveProperty('isActive', true);
});

// .toHaveLength
test('toHaveLength', () => {
  const fruits = ['Cam', 'Xoai', 'Chuoi'];
  const emptyArry: string[] = [];
  expect(fruits).toHaveLength(3);

  expect(emptyArry).toHaveLength(0);
  //PASS OR FAIL??
  expect(emptyArry).toBeTruthy();
});

// .objectContaining & .arrayContaining

// .toHaveLength
// expect(actualObject).toEqual(expect.objectContaining(subsetObject))
test('objectContaining', () => {
  const apiResponse = {
    id: 'txn-123',
    status: 'completed',
    amount: 50,
    timeStamp: '2025-10-28',
  };

  const expectedCoreData = {
    amount: 50,
    status: 'completed',
  };

  expect(apiResponse).toEqual(expect.objectContaining(expectedCoreData));

  //Fail -> object cha ko có cặp key value là status: pending
  // expect(apiResponse).toEqual(expect.objectContaining({ status: 'pending' }));
});
// expect(actualArray).toEqual(expect.arrayContaining(subsetArray))

test('arrayContaining', () => {
  const userPermissions = ['read', 'write', 'comment', 'delete'];
  const requiredPermissions = ['delete', 'read'];

  expect(userPermissions).toEqual(expect.arrayContaining(requiredPermissions));
});

test('objectContainingnested', () => {
  const apiResponse = {
    id: 'txn-123',
    status: 'completed',
    user: {
      id: 'user=123',
      name: 'Alice',
      email: 'Alice@gmail.com',
    },
    amount: 50,
    timeStamp: '2025-10-28',
  };

  const expectedCoreData = {
    status: 'completed',
    user: expect.objectContaining({
      id: 'user=123',
      name: 'Alice',
    }),
  };

  expect(apiResponse).toEqual(expect.objectContaining(expectedCoreData));
});

/// chiến lược giải quyết UI
// UI của chúng ta là có 4 thẻ phim (4cards)

// -> mục đihcs là chúng ta có thể lấy hết thông tin của 4 card này
// -> for loop vòng lặp -> lăpcj qua từng thẻ phim -> để lấy thông tin
// -> cuối cùng mùinh đẩy thông tin vào 1 mảng có 4 phần tử

// thằng FE sẽ nhận ở BE 1 api trả về số phần tử và thông tin của phim
//thằng FE sẽ dùng những thẻ placeHOlder -> <div> <h1>{{titleName}} </div>

// so sánh tên của user là Playwright Learner

interface IMovieData {
  id: number;
  title: string;
  year: number;
  rating: number;
  genres: string[];
  isLiked: boolean;
  inList: boolean;
}

test('Bài tập UI Movies', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
  await page.getByRole('tab', { name: 'Expect Assertions' }).click();

  //1 tìm locator của 4 thẻ phim
  const movieCards = await page
    .locator(
      "//span[text()='Danh sách phim']/ancestor::div[@class='ant-card-head']/following-sibling::div//div[contains(@class,'movie-card')]"
    )
    .all();
  console.log('Số lượng movies,', movieCards.length);
  expect(movieCards).toHaveLength(4);

  const moviesData: IMovieData[] = [];
  for (let i = 0; i < movieCards.length; i++) {
    //index =0 => slient code
    const card = movieCards[i];

    //lấy thông tin về thẻ phim
    const dataTitle = await card.getAttribute('data-title');
    const dataYear = await card.getAttribute('data-year');
    const dataRating = await card.getAttribute('data-rating');
    const dataGenres = await card.getAttribute('data-genres');

    const titleText = await card.locator('.ant-card-meta-detail span').nth(0).innerText();
    // const titleText = await card
    //   .locator(".//div[@class='ant-card-meta-title']//span")
    //   .nth(0)
    //   .innerText();
    const ratingText = await card.locator('.ant-card-meta-detail span').nth(1).innerText();

    const yearText = await card.locator('.ant-card-meta-description div div').nth(0).innerText();
    await page.pause();
  }
});