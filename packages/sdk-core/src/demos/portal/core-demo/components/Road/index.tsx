import React, { useEffect, useState } from 'react';

/**
 * 扩展组件自有状态及通过ref引用控制其他组件行为
 */
export default function Road(props: any) {
  const { app, sdkRef } = props || {};
  const { count = 0 } = props.hooks || {};
  const [number, setNumber] = useState(1000);

  useEffect(() => {
    // 可根据app实例进行组件实现
  }, [app]);

  return (
    <div>
      Road
      <div>road number: {number}</div>
      <div>全局状态 count: {count}</div>
      <button
        type="button"
        onClick={() => {
          setNumber(number - 1);
        }}
      >
        修改road number
      </button>
      <button
        type="button"
        onClick={() => {
          // 通过ref调用组件修改状态
          const riverRef = sdkRef.current.river;
          if (riverRef) {
            const name = riverRef.getRiverName();
            riverRef.setRiverName(name === 'aaa' ? 'bbb' : 'aaa');
          }
        }}
      >
        修改river name
      </button>
    </div>
  );
}
