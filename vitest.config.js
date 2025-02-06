import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'app': __dirname,
    }
  },
  test: {
    globals: true,         // Jest와 같은 글로벌 테스트 기능 활성화
    environment: 'node',  // 브라우저 환경을 모킹(Mock)
    setupFiles: './test/setup.ts',
    coverage: {
      provider: 'c8',      // 코드 커버리지 제공
      reporter: ['text', 'json', 'html']
    }
  }
});

