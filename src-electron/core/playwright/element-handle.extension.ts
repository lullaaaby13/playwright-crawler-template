import {ElementHandle} from "playwright";

export class ElementHandleExtension {
  private elementHandle: ElementHandle;

  constructor(elementHandle: ElementHandle) {
    this.elementHandle = elementHandle;
  }

  async href(selector?: string): Promise<string> {
    if (selector) {
      return await this.elementHandle.$eval(selector, (element) =>
        element.getAttribute('href'),
      );
    } else {
      return await this.elementHandle.evaluate((element) => {
        // @ts-ignore
        return element.getAttribute('href');
      });
    }
  }

  async textContent(selector?: string): Promise<string> {
    if (selector) {
      return await this.elementHandle.$eval(selector, (element) =>
        element.textContent?.trim(),
      );
    } else {
      return await this.elementHandle.evaluate((element) => {
        return element.textContent?.trim();
      });
    }
  }

  async number(selector?: string): Promise<number> {
    const text = await this.textContent(selector);
    // replace all except number and '-'
    return parseFloat(text.replace(/[^\d-.]/g, ''));
  }

  async innerHTML(): Promise<string> {
    return await this.elementHandle.evaluate((element) => {
      // @ts-ignore
      return element.innerHTML;
    });
  }

  async outerHTML(): Promise<string> {
    return await this.elementHandle.evaluate((element) => {
      // @ts-ignore
      return element.outerHTML;
    });
  }
}
