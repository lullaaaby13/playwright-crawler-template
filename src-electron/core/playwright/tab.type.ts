import {PageTask} from "app/src-electron/core/playwright/index";
import {Parser} from "app/src-electron/type";

export enum TabStatus {
  WAITING = 'WAITING',
  RUNNING = 'RUNNING',
}

export interface TabTask {
  id: string;
  link: string;
  parser: Parser | undefined;
  pageTask: PageTask;
}

export interface TabTaskResult {
  id: string;
  success: boolean;
  url: string;
  links?: string[];
  html?: string;
  error?: Error;
  screenshot: string | undefined;
  spentTimeInMillis: number;
}

export interface TabOptions {
  useScreenshot?: boolean;
}

export interface TabPoolOptions {
  useScreenshot?: boolean;
}
