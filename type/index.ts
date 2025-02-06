export interface Task {
  id: string;
}

export interface CollectTask extends Task {
  url: string;
  collect: boolean;
  links: string[] | undefined;
  html: string | undefined;
  collectError: Error | undefined;
  screenshot: string | undefined;
  collectSpentTimeInMillis: number;
}

export interface ParsingTask extends Task {
  parsing: boolean;
  parsingResult?: any;
  parsingError?: Error;
  parsingSpentTimeInMillis: number;
}

export interface Configuration {
  key: string;
  value: any;
}
