import SDK from '@/index';
import React, { useEffect, useRef, useState } from 'react';
import CustomComp from './CustomComp';
import './index.less';

const containerId = 'container';

export default () => {
  const sdkRef = useRef<any>({});
  const [map, setMap] = useState<any>({});

  // 初始化map实例
  useEffect(() => {
    let map = new BMapGL.Map(containerId); // 创建地图实例

    (async () => {
      const centerLng = 116.404;
      const centerLat = 39.915;
      const zoom = 12;
      const scrollWheelZoom = true;

      let point = new BMapGL.Point(centerLng, centerLat); // 创建点坐标
      map.centerAndZoom(point, zoom); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(scrollWheelZoom); //开启鼠标滚轮缩放

      setMap(map);
    })();

    return () => {
      // 卸载map实例
      if (map) {
        map.destroy();
      }
    };
  }, []);

  return (
    <div className="portal-demo">
      <div className="controls">
        <button
          className="primary"
          type="button"
          onClick={() => {
            if (!sdkRef.current) {
              return;
            }
            sdkRef.current.Comp1.setData({
              type: 'points',
              coordinates: [
                { lng: 116.399, lat: 39.91 },
                { lng: 116.405, lat: 39.92 },
                { lng: 116.425, lat: 39.9 },
              ],
            });
          }}
        >
          设置点
        </button>
        <button
          className="primary"
          type="button"
          onClick={() => {
            if (!sdkRef || !sdkRef.current) {
              return;
            }

            sdkRef.current.Comp2.setData([
              {
                lng: 116.2787,
                lat: 40.0,
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
            if (map) {
              map.clearOverlays();
            }

            if (!sdkRef || !sdkRef.current) {
              return;
            }

            // 清除组件数据
            sdkRef.current.Comp1.setData(null);
            sdkRef.current.Comp2.setData(null);
          }}
        >
          清除
        </button>
        <button
          type="button"
          onClick={() => {
            console.log('sub comp1 ref', sdkRef.current.Comp1.getData());
            console.log('sub comp2 ref', sdkRef.current.Comp2.getData());
          }}
        >
          获取子组件数据
        </button>
      </div>

      <div id={containerId}>
        <SDK ref={sdkRef} map={map}>
          <CustomComp />
        </SDK>
      </div>
    </div>
  );
};
