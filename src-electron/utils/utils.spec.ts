import {describe, it, expect} from "vitest";
import {parseNumber} from "app/src-electron/utils/index";

describe("utils", test => {

  it("parseNumber", () => {
    expect(1000).toBe(parseNumber('1,000'));
    expect(1000).toBe(parseNumber('+1,000'));
    expect(-1000).toBe(parseNumber('-1,000'));

    expect(1.23).toBe(parseNumber('1.23'));
    expect(1.23).toBe(parseNumber('1.23%'));
    expect(-1.23).toBe(parseNumber('-1.23'));
    expect(-1.23).toBe(parseNumber('-1.23%'));
  });

});
