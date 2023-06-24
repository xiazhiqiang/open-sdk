import React, { useEffect, useState } from 'react';

interface IEngineProps {
  containerId: string;
  centerLng?: number;
  centerLat?: number;
  zoom?: number;
  enableScroll?: boolean | true;
  [k: string]: any;
}

export default function (props: IEngineProps) {
  const {
    containerId,
    centerLng,
    centerLat,
    zoom,
    enableScroll = true,
  } = props;
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    let map = new BMapGL.Map(containerId); // 创建地图实例
    setMap(map);

    let point = new BMapGL.Point(centerLng, centerLat); // 创建点坐标
    map.centerAndZoom(point, zoom); // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(enableScroll); //开启鼠标滚轮缩放
  }, []);

  return (
    <div id={containerId}>
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
