import React, { useEffect } from 'react';

interface IProps {
  containerId?: string;
  centerLng?: number;
  centerLat?: number;
  zoom?: number;
  enableScroll?: boolean | true;
  init?: (p?: any) => any;
  [k: string]: any;
}

export default function Render(props: IProps) {
  const { map } = props;

  useEffect(() => {}, []);

  return (
    <div>
      {React.Children.map(props.children, (child, index) => {
        // 为每个子组件添加map实例
        return React.cloneElement(child, {
          map,
          idx: index,
        });
      })}
    </div>
  );
}
