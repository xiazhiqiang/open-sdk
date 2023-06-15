import React, { useEffect } from 'react';
// import SDK from '../../index';

import './index.less';

/**
 * 简单实现
 */
export function SimpleDemo(props: any) {
  console.log('props', props);

  useEffect(() => {
    let map = new BMapGL.Map('container', {}); // 创建地图实例
    let point = new BMapGL.Point(116.404, 39.915); // 创建点坐标
    map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    map.setHeading(64.5); //设置地图旋转角度
    map.setTilt(73); //设置地图的倾斜角度
  }, []);

  return (
    <div className="portal-demo">
      <div id="container"></div>
      {/* <SDK /> */}
    </div>
  );
}

export default SimpleDemo;
