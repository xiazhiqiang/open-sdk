import { Engine, Utils } from '@/index';
import { forwardRef } from 'react';

// 业务组件
import schema from './schema';
// 业务逻辑
import useHooks from './useHooks';

// 导出业务SDK
export default Utils.wrapperSDKUtils(
  forwardRef((props: any, ref: any) => {
    return Engine.RenderInit({ ...props, schema, useHooks }, ref);
  }),
);
