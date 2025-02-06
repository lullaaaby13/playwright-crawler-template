import {beforeEach, describe, it} from "vitest";
import {parser} from "app/src-electron/application/parser/parser";
import * as fs from "node:fs";
import {randomUUID} from "node:crypto";
import {resolve} from "path";
import 'app/src-electron/utils/extentions/common';
import {musinsaParser} from "app/src-electron/application/parser/musinsa.parser";
import {configuration} from "app/src-electron/config/config";

describe("Parser", ()=> {

  beforeEach(() => {
    configuration.headless = false;
    configuration.useTaskStatusEvent = false;
    configuration.useAutoExcel = false;
  });

  it("should parse a string", () => {
    let html = fs.readFileSync(resolve(__dirname, 'test.html'), 'utf8');
    parser.parse({
      id: randomUUID(),
      html: html,
    });
  }, 1000 * 600);

  it("musinsa", async () => {
    let html = fs.readFileSync(resolve(__dirname, 'musinsa.html'), 'utf8');
    let newVar = await musinsaParser.parse({
      id: randomUUID(),
      url: 'https://www.musinsa.com/products/3856743',
      html: html,
    });
    console.log(newVar);
  }, 1000 * 600);

});
