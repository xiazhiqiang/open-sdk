import React from 'react';
import SDK from '../../index';

import './index.less';

/**
 * 简单实现
 */
export const SimpleDemo = () => {
  return (
    <div className="portal-demo">
      <div className="controls">
        <button className="primary" type="button" onClick={() => {}}>
          设置点
        </button>
        <button className="primary" type="button" onClick={() => {}}>
          设置线
        </button>
        <button className="primary" type="button" onClick={() => {}}>
          设置面
        </button>
        <button type="button" onClick={() => {}}>
          清除
        </button>
      </div>
      <SDK></SDK>
    </div>
  );
};

export default SimpleDemo;
