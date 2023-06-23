import jsHoc from '@/components/JSHoc';
import { SDKProps } from '@/interface';
import React, { useEffect } from 'react';
import './index.less';

// react 版本实现
const SceneSDK = (props: SDKProps) => {
  useEffect(() => {
    console.log('scene props', props);
  }, []);

  return <div className="sdk-container">Demo</div>;
};

// js 版本实现
const SceneJSSDK = jsHoc(SceneSDK);

export default SceneSDK;
export { SceneSDK, SceneJSSDK };
