import { test, expect } from '@playwright/test';

//B1: break nho UI mo ra xem co chuc nang gi
// => UI trang dang dang nhap co chuc nang login va dashboard HRM

//B2: xac dinh test case co nhung test case gi

//B3: xac dinh step se thuc hien va cac step lien quan den elements nao o tren UI va nguon input (data test) dau vao nhu the nao

//B4: xac dinh locator
//co the nam vung dc 1 cach lay locator don -> suy ra 1 huong ra xa la co the lay locator ma ap dung dc nhieu phan tu
//ap dung cho nhung phan tu giong nhau nhung khac nhau ve 1 so text chang han

//B5: tien hanh viet TCS
//list ra nhung locator se dung
//neu co id thi su dung id (vi la unique)
//1. input username   .getByRole('textbox', {name: 'Your Username'})  //input[@id='iusername']   #iusername
//2. input pass   .getByRole('textbox', {name: 'Enter Password'})   //input[@id='ipassword']     #ipassword
//3. button login   .getByRole('button', {name: 'Login'})    //button[@type='submit']            button[type='submit']

//goi la dong cung nhung ban chat la trang thai debugger
setTimeout(() => {
    debugger
}, 5000)

//page.locator('#swal2-title') => assert toHaveText
//assert gvao web thanh cong: welcome to HRM 


const URL = 'https://hrm.anhtester.com/erp/login'
test.describe('HRM Login Page - positive case', () => {
    //Positive cases
    test('TC01 - Đăng nhập thành công (Click)', async ({ page }) => {
        await page.goto(URL)
        //cach 1 web fisrt assertion => nen dung
        //await expect(page.locator("//h4[@class='mb-3 f-w-600']")).toContainText('Welcome to HRM | Anh Tester Demo')
        //cach 2 => thich hop de debug
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')

        //thuc hien hanh dong login
        await page.locator('#iusername').fill('admin_example')
        await page.locator('#ipassword').fill('123456')
        //await page.locator("//button[@type='submit']").click()
        await page.locator("//button[@type='submit']").press('Enter')

        //assert text
        await expect(page.locator('#swal2-title')).toHaveText('Logged In Successfully.')
        //asset link url
        await expect(page).toHaveURL('https://hrm.anhtester.com/erp/desk')


    })


})

test.describe('HRM Login Page - negative case', () => {
    //Positive cases
    test('TC03 - Sai Mật khẩu', async ({ page }) => {
        await page.goto(URL)
        //cach 1 web fisrt assertion => nen dung
        //await expect(page.locator("//h4[@class='mb-3 f-w-600']")).toContainText('Welcome to HRM | Anh Tester Demo')
        //cach 2 => thich hop de debug
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')

        //thuc hien hanh dong login
        await page.locator('#iusername').fill('admin_example')
        await page.locator('#ipassword').fill('1234567')
        await page.locator("//button[@type='submit']").click()

        //assert text
        await expect(page.locator('.toast-message')).toHaveText('Invalid Login Credentials.')
    })

    

    //BTVN TC04-07
    //chuan tcs AAA - TDD Arrange - Actions - Assert
    //TC04
    test('TC04 - Sai Username', async ({ page }) => {
        await page.goto(URL)
        
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')

        await page.locator('#iusername').fill('admin')
        await page.locator('#ipassword').fill('1234567')
        await page.locator("//button[@type='submit']").click()

        await expect(page.locator('.toast-message')).toHaveText('Invalid Login Credentials.')
    })
    //TC05
    test('TC05 - Bỏ trống cả hai trường', async ({ page }) => {
        await page.goto(URL)
        
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')

        await page.locator('#iusername').fill('')
        await page.locator('#ipassword').fill('')
        await page.locator("//button[@type='submit']").click()

        await expect(page.locator('.toast-message')).toHaveText('The username field is required.')
    })
    //TC06
    test('TC06 - Bỏ trống Password', async ({ page }) => {
        await page.goto(URL)
        
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')

        await page.locator('#iusername').fill('')
        await page.locator('#ipassword').fill('')
        await page.locator("//button[@type='submit']").click()

        await expect(page.locator('.toast-message')).toHaveText('The password field is required.')
    })
    //TC07
    test('TC07 - Bỏ trống Username', async ({ page }) => {
        await page.goto(URL)
        
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')

        await page.locator('#iusername').fill('')
        await page.locator('#ipassword').fill('')
        await page.locator("//button[@type='submit']").click()

        await expect(page.locator('.toast-message')).toHaveText('The username field is required.')
    })

    test('TC08 - Mật khẩu quá ngắn (dưới 6 ký tự)', async ({ page }) => {
        await page.goto(URL)
        //cach 1 web fisrt assertion => nen dung
        //await expect(page.locator("//h4[@class='mb-3 f-w-600']")).toContainText('Welcome to HRM | Anh Tester Demo')
        //cach 2 => thich hop de debug
        const title = await page.locator('h4').innerText()
        expect(title).toBe('Welcome to HRM | Anh Tester Demo')

        //thuc hien hanh dong login
        await page.locator('#iusername').fill('admin_example')
        await page.locator('#ipassword').fill('12345')
        await page.locator("//button[@type='submit']").click()

        //assert text
        await expect(page.locator('.toast-message')).toHaveText('Your password is too short, minimum 6 characters required.')
    })
})

test.describe('HRM Login Page - UI', () => {
    test('TC09 - Mật khẩu bị che ', async ({ page }) => {
        await page.goto(URL)
        await expect(page.locator("//h4[@class='mb-3 f-w-600']")).toContainText('Welcome to HRM | Anh Tester Demo')

        //assert kiem tra password co thuoc tinh type la password
        await expect(page.locator('#ipassword')).toHaveAttribute('type', 'password')
    })

    //BTVN TC10-13
    //TC10
    test('TC10 - Link quên mật khẩu ', async ({ page }) => {
        await page.goto(URL)
        await expect(page.locator("//h4[@class='mb-3 f-w-600']")).toContainText('Welcome to HRM | Anh Tester Demo')

        await page.locator("//span[normalize-space()='Forgot password?']").click()
        expect(page).toHaveURL('https://hrm.anhtester.com/erp/forgot-password')
    })

    test('TC11 - Placeholder ', async ({ page }) => {
        await page.goto(URL)
        await expect(page.locator("//h4[@class='mb-3 f-w-600']")).toContainText('Welcome to HRM | Anh Tester Demo')

        //cach 1 lam giong TC09
        //await expect(page.locator('#iusername')).toHaveAttribute('placeholder','Your Username')

        //cach 2 get attribute va so sanh voi yeu cau cua de bai
        //page.locator().getAttribute('ten cua attribute)
        const usernamepl = await page.locator('#iusername').getAttribute('placeholder')
        expect(usernamepl).toBe('Your Username')

        const passwordpl = await page.locator('#ipassword').getAttribute('placeholder')
        expect(passwordpl).toBe('Enter Password')

    })
    
})

