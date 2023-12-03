import { Engine } from '@/index';
import River from './components/River';
import Road from './components/Road';

// SDK Schema，参考低代码引擎schema
export default {
  componentsMap: [
    {
      componentName: 'root',
      package: Engine.renderChildren,
    },
    // {
    //   componentName: 'light',
    //   package: {
    //     // 远端组件umd配置
    //     js: 'http://127.0.0.1:8000/index.min.js',
    //     css: 'http://127.0.0.1:8000/index.min.css',
    //     exportName: 'HaloLight', // 导出组件名
    //   },
    // },
    {
      componentName: 'road',
      package: Road,
    },
    {
      componentName: 'river',
      package: River,
    },
  ],
  componentsTree: [
    {
      componentName: 'root',
      children: [
        {
          componentName: 'road',
        },
        {
          componentName: 'river',
        },
      ],
    },
  ],
};
