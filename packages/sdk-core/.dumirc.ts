import { defineConfig } from 'dumi';

export default defineConfig({
  mfsu: false,
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'sdk-core',
  },
  headScripts: [
    'https://api.map.baidu.com/api?v=1.0&type=webgl&ak=7m5Saw3tOxsXEYiUmFC3i5HTAbcmZxHw',
  ],
});
