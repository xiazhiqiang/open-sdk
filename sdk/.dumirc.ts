import { defineConfig } from 'dumi';

// more config: https://d.umijs.org/config
export default defineConfig({
  mfsu: false,
  themeConfig: {
    nav: [],
    logo: false,
    footer: false,
    sidebar: false,
  },
  headScripts: [
    'https://api.map.baidu.com/api?v=1.0&type=webgl&ak=7m5Saw3tOxsXEYiUmFC3i5HTAbcmZxHw',
  ],
  plugins: ['datau-scene-docs-plugin', './plugins/index.ts'],
  'scene-docs-open-plugin': {
    // datau-scene-docs-plugin 插件配置
  },
  proxy: {
    // 配置代理
  },
} as any);
