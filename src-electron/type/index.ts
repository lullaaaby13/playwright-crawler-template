export interface Crawler {
  run(...args: any): Promise<void>;
  terminate(): Promise<void>;
}

export interface ParserTask {
  id: string;
  url?: string;
  html: string;
}

export interface Parser<T> {
  parse(task: ParserTask): Promise<T[]>;
}

export interface ParserOptions {
  useTaskStatusEvent: boolean;
}

export interface Repository<T> {
  save(data: T[]): Promise<void>;
}

export interface Stock {
  code: string;
  name: string;
  price: number;
  change: number;
  changeRate: number;
}

export interface Base64Image {
  value: string;
  type: string;
  filename: string;
}
