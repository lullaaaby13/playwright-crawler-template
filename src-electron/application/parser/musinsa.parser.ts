import {AbstractParser} from "app/src-electron/core/parser";
import {ParserTask, Stock} from "app/src-electron/type";
import {Product} from "@prisma/client";
import {load} from "cheerio";
import {loadBase64ImageFromURL} from "app/src-electron/utils/file";

class MusinsaParser extends AbstractParser<Product> {

  async execute(task: ParserTask): Promise<Product[]> {

    const $ = load(task.html);

    let s = $('div.iccpET > span').eq(1).text();

    let images = await Promise.all($('div.xxnjM > img').map(async (i, e) => {
      let url = $(e).attr('src')!;
      let filename = url.substringAfterLast('/').substringBeforeLast('?');
      return {
        value: await loadBase64ImageFromURL(url, filename),
        type: filename.substringAfter('.'),
        filename: filename,
      };
    }));

    const product = {
      code: task.url?.substringAfter('products/') || '',
      name: $('div.iROunM > span').text(),
      price: $('div.iccpET > span').eq(1).text().toNumber() || 0,
      createdAt: new Date(),
      images: images,
    }

    return Promise.resolve([product]);
  }

}

export const musinsaParser = new MusinsaParser();
