import {BrowserContext} from "playwright-core";
import {PageTask} from "app/src-electron/core/playwright/index";
import * as uuid from "uuid";
import {delay} from "app/src-electron/utils";
import {Tab} from "app/src-electron/core/playwright/tab";
import {TabPoolOptions, TabTaskResult} from "app/src-electron/core/playwright/tab.type";
import {Parser} from "app/src-electron/type";
import {CollectTask} from "app/type";
import {publishTaskStatus} from "app/src-electron/ipc/main-to-renderer";
import {configuration} from "app/src-electron/config/config";

const FETCH_TAB_INTERVAL = 25;

export interface TabPoolParams {
  parser?: Parser | undefined;
  pageTask: PageTask;
}

export class TabPool {
  private browserContext: BrowserContext;
  private size: number;
  private onWaiting: Tab[] = [];
  private onRunning: Tab[] = [];
  private options: TabPoolOptions = {
    useScreenshot: false,
  }

  constructor(browser: BrowserContext, size: number, options?: TabPoolOptions) {
    this.browserContext = browser;
    this.size = size;
    Array.from({ length: size }, () => {
      browser.newPage()
        .then((page) => this.onWaiting.push(new Tab(page, {
          useScreenshot: options?.useScreenshot!,
        })));
    });
    if (options) {
      this.options = {
        ...this.options,
        ...options,
      }
    }
  }

  async run(
    links: string[],
    params: TabPoolParams,
  ): Promise<TabTaskResult[]> {
    return await Promise.all(
      links.map(async (link) => {
        const tab = await this.fetchTab();
        this.onRunning.push(tab);

        const id = uuid.v4()

        const tabTaskResult: TabTaskResult = await tab.run({
          id: id,
          link: link,
          parser: params.parser,
          pageTask: params.pageTask,
        });

        this.onRunning.splice(this.onRunning.indexOf(tab), 1);
        this.onWaiting.push(tab);

        const task: CollectTask = {
          id: id,
          url: link,
          collect: tabTaskResult.success,
          links: tabTaskResult.links,
          html: tabTaskResult.html,
          collectError: tabTaskResult.error,
          screenshot: tabTaskResult.screenshot,
          collectSpentTimeInMillis: tabTaskResult.spentTimeInMillis,
        }

        if (configuration.useTaskStatusEvent) {
          publishTaskStatus(task);
        }

        return tabTaskResult;
      }),
    );
  }

  private async fetchTab() {
    // find tab
    let tab: Tab | undefined;
    while (!tab) {
      tab = this.onWaiting.pop();
      if (!tab) {
        await delay(FETCH_TAB_INTERVAL);
      }
    }
    return tab;
  }
}
