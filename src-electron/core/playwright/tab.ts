import * as uuid from "uuid";
import {Page} from "playwright";
import {PageExtension} from "app/src-electron/core/playwright/page.extension";
import console from "node:console";
import {PageTaskResult} from "app/src-electron/core/playwright/index";
import {TabOptions, TabStatus, TabTask, TabTaskResult} from "app/src-electron/core/playwright/tab.type";

export class Tab {
  private _id: string = uuid.v4();
  private page: Page;
  private pageExtension: PageExtension;
  private _status: TabStatus = TabStatus.WAITING;
  private options: TabOptions = {
    useScreenshot: false,
  }

  constructor(page: Page, options?: TabOptions) {
    this.page = page;
    this.pageExtension = new PageExtension(page);
    if (options) {
      this.options = {
        ...this.options,
        ...options,
      }
    }
  }

  async run(tabTask: TabTask): Promise<TabTaskResult> {
    this._status = TabStatus.RUNNING;
    const start = Date.now();
    try {
      await this.page.goto(tabTask.link);
      await this.page.waitForURL(tabTask.link);
      const result: PageTaskResult = await tabTask.pageTask(this.pageExtension);
      if (tabTask.parser && result.html) {
        // no await
        tabTask.parser.parse({
          id: tabTask.id,
          html: result.html,
        });
      }

      return {
        id: tabTask.id,
        success: true,
        url: tabTask.link,
        screenshot: await this.screenshot(),
        spentTimeInMillis: Date.now() - start,
        ...result
      };
    } catch (e) {
      console.error(e);
      return {
        id: tabTask.id,
        success: false,
        url: tabTask.link,
        error: e as Error,
        screenshot: await this.screenshot(),
        spentTimeInMillis: Date.now() - start,
      };
    } finally {
      this._status = TabStatus.WAITING;
    }
  }

  private async screenshot() {
    if (this.options.useScreenshot) {
      return await this.pageExtension.screenshotToBase64();
    }
  }

  get status(): TabStatus {
    return this._status;
  }

  private set status(value: TabStatus) {
    this._status = value;
  }

  get id(): string {
    return this._id;
  }

  private set id(value: string) {
    this._id = value;
  }
}


