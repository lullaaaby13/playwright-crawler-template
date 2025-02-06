import {vi} from "vitest";

vi.mock('electron', () => ({
  ipcMain: {
    handle: vi.fn(),
    on: vi.fn(),
  },
  app: {
    whenReady: () => Promise.resolve(),
    on: vi.fn(),
  },
}));
