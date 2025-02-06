import 'app/src-electron/utils/extentions/common';
import {AbstractCrawler} from "app/src-electron/core/crawler";
import {TabTaskResult} from "app/src-electron/core/playwright/tab.type";
import {PageExtension} from "app/src-electron/core/playwright/page.extension";
import {delay} from "app/src-electron/utils";

class MusinsaCrawler extends AbstractCrawler {

  async execute(...args: any): Promise<TabTaskResult[]> {

    const searchKeyword = args[0];
    const result = await this.tabPool.run(
      [
        `https://www.musinsa.com/search/goods?keyword=${searchKeyword}&keywordType=keyword&gf=A`
      ], {
        pageTask: async (pageExtension: PageExtension) => {
          await pageExtension.scrollToBottom();
          await delay(1000);
          return {
            links: await pageExtension.$$href('a[dtaa-section-name="goods_list"].gtm-view-item-list'),
          }
        }
      }
    );
    console.log(result.map(it => it.links));

    await this.tabPool.run(result.map(it => it.links!).flat(), {
        pageTask: async (pageExtension: PageExtension) => {
          return {

          };
        }
      });
    return [];
  }

}

export const musinsaCrawler = new MusinsaCrawler();
