import {PageExtension} from "app/src-electron/core/playwright/page.extension";

export type PageTask = (page: PageExtension) => Promise<PageTaskResult>;

export type PageTaskResult = {
  links?: string[],
  html?: string;
};


export const COLLECT_LINK_PAGE_TASK = (selector: string) => {
  return async (pageExtension: PageExtension) => {
    return {
      links: await pageExtension.$$href(selector)
    };
  }
}

export const COLLECT_HTML_PAGE_TASK = async (page: PageExtension): Promise<PageTaskResult> => {
  return {
    html: await page.outerHTML('body'),
  };
}
