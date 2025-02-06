import {Repository, Stock} from "app/src-electron/type";
import {prisma} from "app/src-electron/infrastructure/prisma";



class StockRepository implements Repository<Stock> {

  async save(data: Stock[]): Promise<void> {

    await Promise.all(data.map(async stock => {

      await prisma.stock.upsert({
        where: { code: stock.code },
        update: {
          price: stock.price,
          change: stock.change,
          changeRate: stock.changeRate
        },
        create: {
          code: stock.code,
          name: stock.name,
          price: stock.price,
          change: stock.change,
          changeRate: stock.changeRate
        }
      });

      console.log(`[Stock] created: ${JSON.stringify(stock)}`);
    }));
  }

  async findAll(): Promise<Stock[]> {
    return prisma.stock.findMany();
  }

  async deleteAll() {
    console.log('[Stock] delete all');
    return prisma.stock.deleteMany();
  }
}

export const stockRepository = new StockRepository();
