import {Crawler} from "app/src-electron/type";
import {Browser} from "playwright";
import {chromium} from "playwright-extra";
import {configuration} from "app/src-electron/config/config";
import {TabPool} from "app/src-electron/core/playwright/tab-pool";
import {TabPoolOptions, TabTaskResult} from "app/src-electron/core/playwright/tab.type";
import {BrowserContext} from "playwright-core";
import {autoExcelGenerator} from "app/src-electron/application/excel";

export enum CrawlerStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
}

export class CrawlerExecutor {

  private crawler: Crawler;
  private status: CrawlerStatus = CrawlerStatus.IDLE;

  constructor(crawler: Crawler) {
    this.crawler = crawler;
  }

  async run(args?: any[]): Promise<void> {
    try {
      this.status = CrawlerStatus.RUNNING;
      await this.crawler.run(args);
    } catch(e) {
      console.error(e);
    } finally {
      this.status = CrawlerStatus.IDLE;
    }
  }
}


export abstract class AbstractCrawler implements Crawler {

  protected browser: Browser;
  protected browserContext: BrowserContext;
  protected tabPool: TabPool;
  protected tabPoolOptions: TabPoolOptions;

  loadConfiguration() {
    this.tabPoolOptions = {
      useScreenshot: configuration.useScreenshot,
    }
  }

  async run(...args: any): Promise<void> {
    if (this.browser) {
      await this.terminate();
    }
    this.loadConfiguration();
    await this.launch();
    await this.execute(args);
    await this.terminate();
    await autoExcelGenerator.generate();
  }

  abstract execute(...args: any): Promise<TabTaskResult[]>;

  private async launch() {
    console.log(`[Crawler] launch > options: ${JSON.stringify(configuration)}`);
    this.browser = await chromium.launch({ headless: configuration.headless });
    this.browserContext = await this.browser.newContext();
    this.tabPool = new TabPool(this.browserContext, configuration.numberOfTabs, this.tabPoolOptions);
  }

  async terminate(): Promise<void> {
    if (this.browserContext) {
      await this.browserContext.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
}
