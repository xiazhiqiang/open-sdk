import { useEffect, useState } from 'react';

export default function useHooks(props, ref) {
  // 全局状态
  const [count, setCount] = useState(0);

  useEffect(() => {}, []);

  return {
    count,
    setCount,
  };
}
