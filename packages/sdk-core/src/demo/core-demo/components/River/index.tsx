import React, { useState, useImperativeHandle, forwardRef } from 'react';

/**
 * 扩展组件更新全局状态，暴露组件ref给外部调用
 */
export default forwardRef(function River(props: any, ref: any) {
  const [name, setName] = useState('');
  const { count = 0, setCount } = props.hooks || {};

  // 组件暴露给外部Ref调用
  useImperativeHandle(ref, () => ({
    setRiverName(name: string) {
      setName(name);
    },
    getRiverName() {
      return name;
    },
  }));

  return (
    <div>
      River
      <div>river name: {name}</div>
      <div>全局状态 count: {count}</div>
      <button
        type="button"
        onClick={() => {
          setCount((count + 1) % 2);
        }}
      >
        更新全局状态
      </button>
    </div>
  );
});
