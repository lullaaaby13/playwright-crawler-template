import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error'], // 쿼리 및 로깅 활성화
});
export { prisma }
