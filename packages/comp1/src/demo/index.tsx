import Comp1 from 'comp1';
import React, { useEffect, useState } from 'react';
import './index.less';

/**
 * 简单实现
 */
export function SimpleDemo() {
  const [map, setMap] = useState<any>(null);
  const [staticData, setStaticData] = useState<any>();
  const [style, setStyle] = useState<any>({});

  useEffect(() => {
    let map = new BMapGL.Map('container'); // 创建地图实例
    setMap(map);

    let point = new BMapGL.Point(116.404, 39.915); // 创建点坐标
    map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  }, []);

  return (
    <div className="portal-demo">
      <div className="controls">
        <button
          className="primary"
          type="button"
          onClick={() => {
            setStaticData({
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
            setStaticData({
              type: 'lines',
              coordinates: [
                [
                  { lng: 116.399, lat: 39.91 },
                  { lng: 116.405, lat: 39.92 },
                ],
                [
                  { lng: 116.405, lat: 39.92 },
                  { lng: 116.425, lat: 39.9 },
                ],
              ],
            });
            setStyle({
              ...style,
              lineStyle: {
                strokeColor: 'blue',
                strokeWeight: 2,
                strokeOpacity: 0.5,
              },
            });
          }}
        >
          设置线
        </button>
        <button
          className="primary"
          type="button"
          onClick={() => {
            setStaticData({
              type: 'polygons',
              coordinates: [
                [
                  { lng: 116.387112, lat: 39.920977 },
                  { lng: 116.385243, lat: 39.913063 },
                  { lng: 116.394226, lat: 39.917988 },
                  { lng: 116.401772, lat: 39.921364 },
                  { lng: 116.41248, lat: 39.927893 },
                ],
              ],
            });
            setStyle({
              ...style,
              polygonStyle: {
                fillColor: 'red',
                strokeOpacity: 0,
              },
            });
          }}
        >
          设置面
        </button>
        <button
          type="button"
          onClick={() => {
            map.clearOverlays();
            setStaticData([]);
          }}
        >
          清除
        </button>
      </div>
      <div id="container">
        <Comp1
          map={map}
          data={{
            dataType: 'staticData',
            staticData,
          }}
        />
      </div>
    </div>
  );
}

export default SimpleDemo;
