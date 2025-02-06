import {COLLECT_HTML_PAGE_TASK, COLLECT_LINK_PAGE_TASK} from '../../core/playwright';
import 'app/src-electron/utils/extentions/common';
import {AbstractCrawler, CrawlerExecutor} from "app/src-electron/core/crawler";
import {parser} from "app/src-electron/application/parser/parser";
import {TabTaskResult} from "app/src-electron/core/playwright/tab.type";

class NaverStockCrawler extends AbstractCrawler {

  async execute(args: any[]): Promise<TabTaskResult[]> {
    // 주소 가져오기
    const result = await this.tabPool.run(
      [
        'https://finance.naver.com/sise/theme.naver?&page=1',
        // 'https://finance.naver.com/sise/theme.naver?&page=2',
        // 'https://finance.naver.com/sise/theme.naver?&page=3',
        // 'https://finance.naver.com/sise/theme.naver?&page=4',
        // 'https://finance.naver.com/sise/theme.naver?&page=5',
        // 'https://finance.naver.com/sise/theme.naver?&page=6',
        // 'https://finance.naver.com/sise/theme.naver?&page=7',
        // 'https://finance.naver.com/sise/theme.naver?&page=8',
      ], {
        pageTask: COLLECT_LINK_PAGE_TASK('td.col_type1 a')
      }
    );

    const links = result
      .filter(it => it.success)
      .map((it) => it.links)
      .flat()
      .map((it) => `https://finance.naver.com${it}`);

     return await this.tabPool.run(links, {
       parser: parser,
       pageTask: COLLECT_HTML_PAGE_TASK,
     });
  }

}

export const crawler = new NaverStockCrawler();
export const crawlerExecutor = new CrawlerExecutor(crawler);
