import { Children, cloneElement } from 'react';

// 容器组件，遍历子组件并透传参数
export default function Container(props) {
  const { children, ...others } = props;

  return Children.map(children, (child) => {
    if (typeof child === 'string') {
      return child;
    } else {
      return cloneElement(child, { ...others });
    }
  });
}
