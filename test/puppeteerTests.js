const puppeteer = require('puppeteer');
const {expect} = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);

const pupOpts = {
    headless: false,
    timeout: 10000,
    slowMo: 15
}

before(async function() {
    global.expect = expect;
    global.browser = await puppeteer.launch(pupOpts);
});


after(function() {

    browser.close();

    global.browser = globalVariables.browser;
    global.expect = globalVariables.expect;
});

describe('index Tests', () => {
    let page;

    before(async function() {
        page = await browser.newPage();
        await page.goto('http://localhost:8000');
    });

    after(async function() {
        await page.close();
    });

    it('Check index page title', async () => {
        const title = await page.title()
        expect(title).to.equal('Student CVs');
    }).timeout(15000);

    
    it('Check index page heading', async () => {
        let heading = await page.$eval('body > main > div > div:nth-child(1) > h4', heading => heading.innerText);
        expect(heading).to.equal('Welcome to Student CVs');
    }).timeout(15000);

    it('navigates to login', async () => {
        page.click('body > main > div > div:nth-child(2) > div:nth-child(2) > div > a')
        await page.waitForNavigation();
        const title = await page.title();
        expect(title).to.equal('Login');
    }).timeout(15000);

    it('navigates to Register', async () => {
        await page.goto('http://localhost:8000');
        page.click('body > main > div > div:nth-child(2) > div:nth-child(3) > div > a')
        await page.waitForNavigation();
        const title = await page.title();
        expect(title).to.equal('Register');
    }).timeout(15000);

    it('navigates to View All Cvs', async () => {
        await page.goto('http://localhost:8000');
        page.click('body > main > div > div:nth-child(3) > div.col.m12.l10 > div > a')
        await page.waitForNavigation();
        const title = await page.title();
        expect(title).to.equal('View All CVs');
    }).timeout(15000);

});

describe('Registration tests', () => {
    let page;

    before(async function() {
        page = await browser.newPage();
        await page.goto('http://localhost:8000/account/register');
    });

    after(async function() {
        await page.close();
    });

    it('registers an account', async () => {
        await page.type('#register-username', 'headlessChrome');
        await page.type('#register-email', 'chrome@chrome.ac.uk');
        await page.type('#register-forename', 'Chrome');
        await page.type('#register-surname', 'ium');
        await page.type('#datePicker', 'Dec 19, 2018');
        await page.type('#register-password', 'iamrobot');
        await page.type('#register-password-confirm', 'iamrobot');
        await page.click('#registerSubmitButton')
        await page.waitForNavigation();
        const title = await page.title();
        expect(title).to.equal('Student CVs');
    }).timeout(15000);

});

describe('login tests', () => {
    let page;

    before(async function() {
        page = await browser.newPage();
        await page.goto('http://localhost:8000/account/login');
    });

    after(async function() {
        await page.close();
    });

    it('logs in to the website', async () => {
        await page.type('#login-username', 'headlessChrome');
        await page.type('#login-password', 'iamrobot');
        await page.click('#loginSubmitButton');
        await page.waitForNavigation();
        const title = await page.title();
        expect(title).to.equal('Student CVs');
    }).timeout(15000);

});

describe('CV Creation Test', () => {

    let page;

    before(async function() {
        page = await browser.newPage();
        await page.goto('http://localhost:8000/cv/create');
    });

    after(async function() {
        await page.close();
    });

    it('creates a cv', async () => {

        await page.type('#create-forename', 'chrome');
        await page.type('#create-surname', 'ium');
        await page.type('#create-email', 'chrome@chrome.ac.uk');
        await page.type('#create-dob', 'Dec 12, 2018');
        await page.type('#create-houseNum', '12');
        await page.type('#create-roadName', 'chrome way');
        await page.type('#create-city', 'San Fran');
        await page.type('#create-county', 'Cali');
        await page.type('#create-country', 'USA');
        await page.type('#create-education', 'Masters Degree in web browsing');
        await page.type('#create-employment', 'As a program tester');
        await page.type('#create-profile', 'I am not a robot');
        await page.click('#submitCv');
        await page.waitForNavigation();
        const title = await page.title();
        let heading = await page.$eval('body > main > div > div > div.col.s3 > div > div:nth-child(2) > h5', heading => heading.innerText);
        expect(title).to.equal('View CV');
        expect(heading).to.equal('Forename: chrome');
    }).timeout(15000);

});

describe('Edit CV', () => {

    let page;

    before(async function() {
        page = await browser.newPage();
        await page.goto('http://localhost:8000/account/login');
    });

    after(async function() {
        await page.close();
    });

    it('edits a CV name', async () => {
        await page.type('#login-username', 'headlessChrome');
        await page.type('#login-password', 'iamrobot');
        await page.click('#loginSubmitButton');
        await page.waitForNavigation();
        await page.goto('http://localhost:8000/cv/edit');
        
        const input = await page.$('#edit-forename');
        await input.click({ clickCount: 3 })
        await page.type('#edit-forename', 'chromiumBot');

        await page.click('#submitCv');
        await page.waitForNavigation();
        const title = await page.title();
        let heading = await page.$eval('body > main > div > div > div.col.s3 > div > div:nth-child(2) > h5', heading => heading.innerText);
        expect(title).to.equal('View CV');
        expect(heading).to.equal('Forename: chromiumBot');
    }).timeout(15000);

});

describe('it views all cvs', () => {
    
    let page;

    before(async function() {
        page = await browser.newPage();
        await page.goto('http://localhost:8000/cv/viewall');
    });

    after(async function() {
        await page.close();
    });

    it('views its own created CV', async () => {

        const title = await page.title();
        expect(title).to.equal('View All CVs');

    });

})