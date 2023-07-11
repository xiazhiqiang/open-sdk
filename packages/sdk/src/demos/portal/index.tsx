import React, { useEffect, useState } from 'react';
import SDK from '../../index';

import './index.less';

/**
 * 简单实现
 */
export const SimpleDemo = () => {
  const [map, setMap] = useState<any>(null);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    let map = new BMapGL.Map('container'); // 创建地图实例
    setMap(map);

    let point = new BMapGL.Point(116.28, 40.049); // 创建点坐标
    map.centerAndZoom(point, 18); // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  }, []);

  return (
    <div className="portal-demo">
      <div className="controls">
        <button
          className="primary"
          type="button"
          onClick={() => {
            setData([
              {
                lng: 116.2787,
                lat: 40.0492,
                offsetX: 30,
                offsetY: -30,
                text: '欢迎使用baidu map地图',
                labelStyle: {
                  color: 'red',
                  borderRadius: '5px',
                  borderColor: '#ccc',
                  padding: '10px',
                  fontSize: '16px',
                  height: '30px',
                  lineHeight: '30px',
                  fontFamily: '微软雅黑',
                },
              },
            ]);
          }}
        >
          添加文字
        </button>
        <button
          type="button"
          onClick={() => {
            map.clearOverlays();
            setData(null);
          }}
        >
          清除文字
        </button>
      </div>
      <div id="container">
        <SDK map={map} data={data} />
      </div>
    </div>
  );
};

export default SimpleDemo;
