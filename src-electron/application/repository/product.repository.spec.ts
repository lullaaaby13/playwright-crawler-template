import {describe,it} from "vitest";
import {productRepository, ProductRepository} from "app/src-electron/application/repository/product.repository";
import fs from "fs";
import {resolve} from "path";
import {base64ToFile, bufferToBase64Image} from "app/src-electron/utils/file";

describe("ProductRepository", () => {
  it("should save data to the database", async () => {

    const buffer = fs.readFileSync(resolve(__dirname, 'test.webp'));


    await productRepository.save([
      {
        code: '3856743',
        name: '시티보이 빅 오버핏 빅사이즈 옥스포드 셔츠 4 COLOR',
        price: 29835,
        images: [
          {
            value: bufferToBase64Image(buffer, 'webp'),
            type: 'webp',
            filename: 'test',
          }
        ]
      }
    ]);

  });

});
