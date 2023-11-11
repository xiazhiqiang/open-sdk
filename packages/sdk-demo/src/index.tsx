import { forwardRef } from 'react';
import { Engine } from 'sdk-core';
import './index.less';

// 业务组件
import schema from './schema';
// 业务逻辑
import useHooks from './useHooks';

// 导出业务SDK
export default forwardRef((props: any, ref: any) => {
  return Engine.RenderInit({ ...props, schema, useHooks }, ref);
});
