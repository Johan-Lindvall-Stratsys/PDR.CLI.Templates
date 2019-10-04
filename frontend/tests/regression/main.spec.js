const puppeteer = 'puppeteer'

describe('test test', () => {
  let browser
  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  })
  afterAll(async done => {
    await browser.close()
  })
  it('should work', async () => {
    const page = await browser.newPage()
    await page.goto('http://localhost:8080')
    const element = await page.$('##TAG_NAME##')
    const content = await page.evaluate(element => !!element.innerHTML, element)
    expect(content).toBe(true)
  })
})
