import { defineConfig } from 'father';

// more father config: https://github.com/umijs/father/blob/master/docs/config.md
export default defineConfig({
  plugins: ['datau-scene-sdk-plugin', './plugins/father.ts'],
  'scene-sdk-open-plugin': {
    // datau-scene-sdk-plugin插件额外参数配置
  },
} as any);
