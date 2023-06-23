import { defineConfig } from 'dumi';

// more config: https://d.umijs.org/config
export default defineConfig({
  mfsu: false,
  plugins: ['datau-scene-docs-plugin', './plugins/index.ts'],
  'scene-docs-open-plugin': {
    // datau-scene-docs-plugin 插件配置
  },
  proxy: {
    // 配置代理
  },
} as any);
