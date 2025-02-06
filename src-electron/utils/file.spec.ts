import {describe, it} from "vitest";
import {loadBase64ImageFromURL, mkdirRecursive} from "app/src-electron/utils/file";
import {resolve} from "path";

describe("file", () => {
    it("should be created", () => {
      mkdirRecursive(resolve(__dirname, 'a', 'b', 'c'));
    });

  it('load image from url', async () => {
    let base64ImagePromise = await loadBase64ImageFromURL('https://image.msscdn.net/thumbnails/images/goods_img/20240207/3856743/3856743_17177615485090_big.jpg?w=600', 'test.jpg');
    console.log(base64ImagePromise);

  });
});
