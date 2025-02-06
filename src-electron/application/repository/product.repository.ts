import {prisma} from "app/src-electron/infrastructure/prisma";
import {base64ToFile} from "app/src-electron/utils/file";
import appRootPath from "app-root-path";
import {resolve} from "path";

class ProductRepository {

  async save(data: any[]): Promise<void> {
    for (const product of data) {
      await prisma.$transaction(async (transaction) => {
        for (const image of product.images) {
          const filepath = resolve(appRootPath.path, 'images', product.code);
          const filename = `${image.filename}.${image.type}`;
          base64ToFile(image.value, resolve(filepath, filename));
          await transaction.productImage.create({
            data: {
              code: product.code,
              filepath: filepath,
              filename: filename,
            }
          });
        }
        await transaction.product.create({
          data: {
            code: product.code,
            name: product.name,
            price: product.price
          }
        });
      });
    }
  }

}

export const productRepository = new ProductRepository();
