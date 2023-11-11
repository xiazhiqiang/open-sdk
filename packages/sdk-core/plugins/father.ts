import { IApi } from 'father';

// more config: https://github.com/umijs/father/blob/master/docs/config.md
export default (api: IApi) => {
  api.describe({
    key: 'fatherCustom',
    config: {},
  });

  api.logger.info('father 定制插件');

  api.modifyConfig((memo: any, { ...others }: any) => {
    // 忽略某些包编译，提升build构建速度
    const ignores = ['@ali/datavgi-gl-js/**', '@ali/halo-engine-sdk/**']; // 用glob匹配语法，详见 https://github.com/umijs/father/blob/master/docs/config.md
    memo.cjs.ignores = ignores.concat(memo.cjs.ignores || []);
    memo.esm.ignores = ignores.concat(memo.esm.ignores || []);

    // umd资源，语法参考webpack-chain：https://github.com/neutrinojs/webpack-chain/tree/v4
    memo.umd.chainWebpack = ((umdChainWebpack) => {
      return (config: any) => {
        if (umdChainWebpack) {
          umdChainWebpack(config);
        }

        ['src', 'jsx-ts-tsx', 'extra-src', 'dep'].forEach((ruleName) => {
          config.module
            .rule(ruleName)
            .exclude // 正则webpack exclude比include优先级高
            .add(/@ali\/datavgi-gl-js/) // 忽略 gi 编译
            .add(/@ali\/halo-engine-sdk/) // 忽略 dtf 编译
            .end();
        });
      };
    })(memo.umd.chainWebpack);

    return memo;
  });
};
