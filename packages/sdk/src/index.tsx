import jsHoc from '@/components/JSHoc';
import CoreSDK from '@/components/MapSDK';
import { SDKProps } from '@/interface';
import Comp1 from 'comp1';
import Comp2 from 'comp2';
import React, { useEffect, useState } from 'react';
import './index.less';

// SDK 渲染实现
const SceneSDK = (props: SDKProps) => {
  const [data, setData] = useState();

  useEffect(() => {}, []);

  return (
    <CoreSDK containerId="container">
      <Comp1 />
      <Comp2 />
    </CoreSDK>
  );
};

// js 版本实现
const SceneJSSDK = jsHoc(SceneSDK);

export default SceneSDK;
export { SceneSDK, SceneJSSDK };
