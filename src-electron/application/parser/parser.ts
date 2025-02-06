import {load} from 'cheerio';
import {parseNumber} from "app/src-electron/utils";
import 'app/src-electron/utils/extentions/common';
import {ParserTask, Stock} from "app/src-electron/type";
import {AbstractParser} from "app/src-electron/core/parser";

import {stockRepository} from "app/src-electron/application/repository";

class ParserImpl extends AbstractParser<Stock> {

    constructor() {
      super();
      this.repository = stockRepository;
    }

    async execute(task: ParserTask): Promise<Stock[]> {
      // 파싱
      const $ = load(task.html);

      return Array.from(
        $('table.type_5 tbody tr[onmouseover="mouseOver(this)"]')
          .map((index, element) => {

            let change = parseNumber($(element).find('td:nth-child(4)').text());
            if ($(element).find('td:nth-child(4)').text().includes('하락')) {
              change = -change;
            }

            return {
              code: $(element).find('td.name a').attr('href')?.substringAfter('code=') || '',
              name: $(element).find('td.name a').text(),
              price: parseNumber($(element).find('td:nth-child(3)').text()),
              change: change,
              changeRate: parseNumber($(element).find('td:nth-child(5)').text()),
            }
          })
      );
    }
}

const parser = new ParserImpl();

export { parser }
