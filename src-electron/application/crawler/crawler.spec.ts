import {beforeEach, describe, it} from "vitest";
import {crawler} from "./index";

import 'app/src-electron/utils/extentions/common';
import {musinsaCrawler} from "app/src-electron/application/crawler/crawler";
import {configuration} from "app/src-electron/config/config";

describe("Crawler", () => {

  beforeEach(() => {
    configuration.headless = false;
    configuration.useTaskStatusEvent = false;
    configuration.useAutoExcel = false;
  });

  it('NaverStock ', async () => {
    configuration.numberOfTabs = 1;
    await crawler.run();
  }, 1000 * 600);

  it('Musinsa', async () => {
    configuration.numberOfTabs = 1;
    await musinsaCrawler.run('코트');
  }, 1000 * 600);
});
