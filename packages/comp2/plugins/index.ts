import { IApi } from 'dumi';

// more config: https://github.com/umijs/father/blob/master/docs/config.md
export default (api: IApi) => {
  api.describe({
    key: 'dumiCustom',
    config: {},
  });

  api.logger.info('dumi 定制插件');

  api.chainWebpack((config, { webpack, env }) => {
    ['src', 'jsx-ts-tsx', 'extra-src'].forEach((ruleName) => {
      config.module
        .rule(ruleName)
        .exclude // webpack exclude比include优先级高
        .add(/@ali\/datavgi-gl-js/) // 忽略 gi 编译
        .add(/@ali\/halo-engine-sdk/) // 忽略 dtf 编译
        .end();
    });
  });
};
