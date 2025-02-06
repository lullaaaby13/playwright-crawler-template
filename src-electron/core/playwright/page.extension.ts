import {ElementHandle, Page} from "playwright";
import {ElementHandleExtension} from "app/src-electron/core/playwright/element-handle.extension";

export class PageExtension {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async $$(selector: string): Promise<ElementHandle[]> {
    return await this.page.$$(selector);
  }

  async $$href(selector: string): Promise<string[]> {
    return await this.page.$$eval(selector, (elements) => {
      return elements.map((element) => element.getAttribute('href') || '');
    });
  }

  innerHTML(selector: string): Promise<string> {
    return this.page.$eval(selector, (element) => element.innerHTML);
  }

  outerHTML(selector: string): Promise<string> {
    return this.page.$eval(selector, (element) => element.outerHTML);
  }

  textContent(selector: string): Promise<string> {
    return this.page.$eval(selector, (element) => element.textContent || '');
  }

  url() {
    return this.page.url();
  }

  async toElementHandleExtensions(selector: string) {
    const rows = await this.$$(selector);
    return rows.map((it) => new ElementHandleExtension(it));
  }

  async screenshotToBase64(): Promise<string> {
    const screenshot = await this.page.screenshot({ fullPage: true });
    return `data:image/png;base64,${screenshot.toString('base64')}`; // Base64 Data URL 반환
  }

  scrollToBottom() {
    return this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

}
