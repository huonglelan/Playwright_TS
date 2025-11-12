import { test, expect, Page } from '@playwright/test';

//   setTimeout(() => {
//   debugger;
// }, 2000);
test.setTimeout(30000)

const URL = 'https://crm.anhtester.com/admin/authentication'
async function loginNavigateToCustomer(page: Page, tabName: string) {
    //thuc hien hanh dong Login -> navigate to customer
    await page.goto(URL)
    //await expect(page.locator("//h1[normalize-space()='Login']")).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Login')
    await page.locator('#email').fill('admin@example.com')
    await page.locator('#password').fill('123456')
    await page.locator("//button[@type='submit']").click()
    await expect(page).toHaveURL(/admin/)
    //await expect(page.locator("//span[normalize-space()='Customers']//parent::a")).toBeVisible() -> ban chat click() da visible roi
    //await page.locator(`//span[normalize-space()='${tabName}']//parent::a`).click()
    await page.getByRole('link', { name: `${tabName}` }).click()
    await page.locator("//a[normalize-space()='New Customer']").click()
}


test.describe('CRM Customer Page - positive case', () => {

    test('TC_CUST_01 - Tạo Customer (Chỉ nhập trường bắt buộc)', async ({ page }) => {
        await loginNavigateToCustomer(page, 'Customers')

        //label[@for='company'/small[@class='req text-danger']]
        //Dung filter de thu hep khoang cach -> tim thang cha parent khi tim locator
        //-> dung locator chain de tim trong thang cha
        const containerCompany = page.locator('label', { hasText: 'Company' })
        const asterik = containerCompany.locator('small', { hasText: '*' })
        await expect(asterik).toBeVisible()

        await page.locator('#company').fill('huongtest')

        // await page.getByRole('button', { name: 'Save', exact: true }).click()
        // div[@id='profile-save-section']//button[contains(normalize-space(.), "Save")].nth(1)
        // (#profile-save-section button).nth(1)
        await page.locator("#profile-save-section").filter({ hasText: 'Save' }).locator('button', { hasText: 'Save' }).nth(1).click()

        await expect(page.locator('#alert_float_1')).toContainText('Customer added successfully.');
        // const toastMesg = page.locator('#alert_float_1')
        // await expect(toastMesg).toContainText('Customer added successfully.')

        const currentUrl = page.url()   //https://crm.anhtester.com/admin/clients/client/3138
        const urlPart = currentUrl.split('/clients/client/')  //=> tra ra array ['https://crm.anhtester.com/admin','3138']
        const customerId = urlPart[1] //'3138'
        const customerNameDisplay = page.locator('span.tw-truncate') // #3138 abc
        const displayText = await customerNameDisplay.textContent()
        expect(displayText).toContain(customerId)
    })

    //BTVN
    //TC02
    test('TC_CUST_02 - Tạo Customer (Nhập đầy đủ thông tin)', async ({ page }) => {
        await loginNavigateToCustomer(page, 'Customers')

        //kiem tra dau *
        const containerCompany = page.locator('label', { hasText: 'Company' })
        const asterik = containerCompany.locator('small', { hasText: '*' })
        await expect(asterik).toBeVisible()

        //1. Điền đầy đủ thông tin: Company, VAT, Phone, Website, Address, City, State, Zip.
        const data = {
            company: 'huongtest',
            vat: '10',
            phonenumber: '0123456789',
            website: 'website@yahoo.com',
            address: 'Hoang Mai',
            city: 'Ha Noi',
            state: 'Viet Nam',
            zip: '10000'
        }

        for (const [id, value] of Object.entries(data)) {
            await page.locator(`#${id}`).fill(value)
        }

        //2. họn một giá trị cho Currency (ví dụ: "USD").
        //ul[@class='dropdown-menu inner ']//a
        //mo drop down -> locator chain
        await page.locator("//button[@data-id = 'default_currency']").click()
        await page.getByRole('option', { name: 'USD$' }).click()


        //3. Chọn một giá trị cho Country (ví dụ: "Jamaica").
        //mo dropdown
        await page.locator("//button[@data-id = 'country']").click()
        //go filter va chon ket qua
        await page.getByRole('combobox', { name: 'Search' }).fill('Jamaica')
        await page.locator("//ul//li//a[.//span[text()='Jamaica']]").click()

        //4. Click "Save".
        await page.getByRole('button', { name: 'Save', exact: true }).click()

        //assert thanh cong TC01
        await expect(page.locator('#alert_float_1')).toContainText('Customer added successfully.');
        const toastMesg = page.locator('#alert_float_1')
        await expect(toastMesg).toContainText('Customer added successfully.')

        const currentUrl = page.url()   //https://crm.anhtester.com/admin/clients/client/3138
        const urlPart = currentUrl.split('/clients/client/')  //=> tra ra array ['https://crm.anhtester.com/admin','3138']
        const customerId = urlPart[1] //'3138'
        const customerNameDisplay = page.locator('span.tw-truncate') // #3138 abc
        const displayText = await customerNameDisplay.textContent()
        expect(displayText).toContain(customerId)

        //assert thong tin cac o input
        for (const [id, value] of Object.entries(data)) {
            await expect(page.locator(`#${id}`)).toHaveValue(value)
        }

    })

})

//
test.describe('Kịch bản Chức năng (UI/Functionality)', () => {

    test('TC_CUST_04 - Kiểm tra "Same as Customer Info" (Billing) ', async ({ page }) => {
        await loginNavigateToCustomer(page, 'Customers')

        await page.locator('#company').fill('huongtest')

        //Điền thông tin địa chỉ (Address, City, State, Zip, Country) trong tab "Customer Details".
        const data = {
            address: 'Hoang Mai',
            city: 'Ha Noi',
            state: 'Viet Nam',
            zip: '10000'
        }

        for (const [id, value] of Object.entries(data)) {
            await page.locator(`#${id}`).fill(value)
        }

        //mo dropdown
        await page.locator("//button[@data-id = 'country']").click()
        //go filter va chon ket qua
        await page.getByRole('combobox', { name: 'Search' }).fill('Angola')
        await page.locator("//ul//li//a[.//span[text()='Angola']]").click()

        //Click tab "Billing & Shipping"
        await page.getByRole('tab',{name: 'Billing & Shipping'}).click()

        //Click link "Same as Customer Info".
        await page.getByRole('link',{name: 'Same as Customer Info'}).click()
        //a[normalize-sapce()='Same as Customer Info']

        //assert Các trường Billing Address phải tự động được điền giống hệt thông tin ở "Customer Details".
        await expect(page.locator("//div[@class='col-md-6']/h4").nth(0)).toContainText('Billing Address')

        await expect(page.locator('#billing_street')).toHaveValue('Hoang Mai')
        await expect(page.locator('#billing_city')).toHaveValue('Ha Noi')
        await expect(page.locator('#billing_state')).toHaveValue('Viet Nam')
        await expect(page.locator('#billing_zip')).toHaveValue('10000')
        //get attribute
        const title = await page.locator("//button[@data-id='billing_country']").getAttribute('title')
        console.log(title)
        expect(title).toBe('Angola')
    })

    //
    test('TC_CUST_05 - Kiểm tra "Copy Billing Address" (Shipping)', async ({ page }) => {
        await loginNavigateToCustomer(page, 'Customers')

        //kiem tra dau *
        const containerCompany = page.locator('label', { hasText: 'Company' })
        const asterik = containerCompany.locator('small', { hasText: '*' })
        await expect(asterik).toBeVisible()

        await page.locator('#company').fill('huongtest123')

        //Click tab "Billing & Shipping"
        await page.getByRole('tab', { name: 'Billing & Shipping' }).click();

        //await page.locator('#billing_street').fill("street")
        //await page.locator('#billing_city').fill("city")

        const dataBilling = {
            billing_street: 'Hoang Mai',
            billing_city: 'Ha Noi',
            billing_state: 'Viet Nam',
            billing_zip: '10000'
        }

        for (const [id, value] of Object.entries(dataBilling)) {
            await page.locator(`#${id}`).fill(value)
        }
        //Click link "Copy Billing Address".
        await page.getByRole('link', {name: 'Copy Billing Address'}).click()

        //assert Các trường Shipping Address (Street, City, State, Zip) phải tự động được điền giống hệt thông tin ở "Billing Address".
        const dataShipping = {
            shipping_street: 'Hoang Mai',
            shipping_city: 'Ha Noi',
            shipping_state: 'Viet Nam',
            shipping_zip: '10000'
        }
        for (const [id, value] of Object.entries(dataShipping)) {
            await expect(page.locator(`#${id}`)).toHaveValue(value)
        }
        
    })
})
test.describe('Kịch bản Thất Bại (Negative - Validation)', () => {

    test('TC_CUST_06 - Bỏ trống trường "Company" ', async ({ page }) => {
        await loginNavigateToCustomer(page, 'Customers')
        //kiem tra dau *
        const containerCompany = page.locator('label', { hasText: 'Company' })
        const asterik = containerCompany.locator('small', { hasText: '*' })
        await expect(asterik).toBeVisible()

        //Không điền Company
        await page.locator('#company').fill('')
        //Click "Save".
        await page.getByRole('button', { name: 'Save', exact: true }).click()
        //assert Vẫn ở lại trang "New Customer" (không chuyển hướng).
        await expect(page.getByRole('tab', { name: 'Customer Details' })).toBeVisible()
        //assert Thông báo lỗi "This field is required" xuất hiện bên dưới ô Company.
        await expect(page.locator('#company-error')).toHaveText('This field is required.')
    
    })
  
    test('TC_CUST_07 - Cảnh báo "Company đã tồn tại" ', async ({ page }) => {
        await loginNavigateToCustomer(page, 'Customers')
        //kiem tra dau *
        const containerCompany = page.locator('label', { hasText: 'Company' })
        const asterik = containerCompany.locator('small', { hasText: '*' })
        await expect(asterik).toBeVisible()

        //Điền tên Company trùng lặp đó vào ô Company.
        await page.locator('#company').fill('Huong123')
        //click vao o khac
        await page.locator('#vat').click()
        //assert Thông báo cảnh báo (màu xanh) "already exists" xuất hiện.
        await expect(page.locator('#company_exists_info')).toContainText('already exists')    
        
    })
})