import {prisma} from "app/src-electron/infrastructure/prisma";
import {Configuration} from "app/type";

export const configuration: Record<string, any> = {
  headless: false,
  numberOfTabs: 10,
  useTaskStatusEvent: true,
  useScreenshot: true,
  useAutoExcel: true,
  excelFileName: 'data.xlsx',
}

class ConfigurationService {

  constructor() {
    prisma.configuration.findMany().then(configurations => {
      configurations.forEach(({ key, value }: Configuration) => {
        configuration[key] = JSON.parse(value); // ✅ 올바르게 객체 속성 업데이트
      });
    }).catch(error => {
      console.error('Failed to load configurations:', error);
    });
  }

  async update(key: string, value: any) {
    await prisma.configuration.upsert({
      where: {key},
      update: {value: String(value) },
      create: {key, value: String(value) },
    });
    configuration[key] = value;
  }

}

export const configurationService = new ConfigurationService();
