export {}

declare global {
  interface Window {
    $renderer: {
      saveTextFile (text: string): Promise<string>;
      startCrawler (): Promise<void>;
      sendToMain(channel: string, data?: any): void;
      onReceive(channel: string, callback: any): void;
      request(channel: string, data?: any): Promise<any>;
      removeListener(channel: string, callback: any): void;
    }
  }

  interface String {
    isBlank(): boolean;
    isNotBlank(): boolean;
    isNumber(): boolean;
    isBoolean(): boolean;
    substringAfter(delimiter: string): string;
    substringAfterLast(delimiter: string): string;
    substringBefore(delimiter: string): string;
    substringBeforeLast(delimiter: string): string;
    onlyNumbers(): string;
    toNumber(): number | undefined;
    toBoolean(): boolean | undefined;
  }

  interface Array<T> {
    isEmpty(): boolean;

    isNotEmpty(): boolean;

    dropLast(count: number): T[];

    last(): T | undefined;

    groupBy<K extends keyof any>(keySelector: (element: T) => K): Record<K, T[]>;
  }
}
