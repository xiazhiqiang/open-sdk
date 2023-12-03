import CustomComp from '@/components/CustomComp';
import Comp2 from 'comp2';
import React, { useRef, useState } from 'react';
import SDK from 'sdk';
import './index.less';

export default () => {
  const [comp1Params, setComp1Params] = useState<any>({});
  const [comp2Params, setComp2Params] = useState<any>({});
  const sdkRef = useRef<any>({});

  return (
    <div className="portal-demo">
      <div className="controls">
        <button
          className="primary"
          type="button"
          onClick={() => {
            setComp1Params({
              data: {
                dataType: 'staticData',
                staticData: {
                  type: 'points',
                  coordinates: [
                    { lng: 116.399, lat: 39.91 },
                    { lng: 116.405, lat: 39.92 },
                    { lng: 116.425, lat: 39.9 },
                  ],
                },
              },
            });
          }}
        >
          设置点
        </button>
        <button
          className="primary"
          type="button"
          onClick={() => {
            setComp2Params({
              data: {
                dataType: 'staticData',
                staticData: [
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
                ],
              },
            });
          }}
        >
          添加文字
        </button>
        <button
          type="button"
          onClick={() => {
            console.log('sdkRef', sdkRef.current);
            if (sdkRef.current.map) {
              sdkRef.current.map.clearOverlays();
            }

            // 清除数据
            setComp1Params({
              data: { dataType: 'staticData', staticData: null },
            });
            setComp2Params({
              data: { dataType: 'staticData', staticData: null },
            });
          }}
        >
          清除
        </button>
        <button
          type="button"
          onClick={() => {
            console.log('sub comp1 ref', sdkRef.current.sdk.comp1.getData());
            console.log('sub comp2 ref', sdkRef.current.comp2.getData());
          }}
        >
          获取子组件数据
        </button>
      </div>

      <SDK
        ref={(el: any) => {
          // 从sdk中透出的属性或方法
          sdkRef.current.map = el && el.map ? el.map : null;
          sdkRef.current.sdk = el;
        }}
        mapView={{
          containerId: 'container',
          centerLng: 116.404, // 116.28,
          centerLat: 39.915, // 40.049,
          zoom: 12,
          scrollWheelZoom: true,
        }}
        comp1={comp1Params || {}}
      >
        {/* 嵌入场景组件 */}
        <Comp2
          {...comp2Params}
          ref={(el) => {
            sdkRef.current.comp2 = el;
          }}
        />
        {/* 嵌入自定义组件 */}
        <CustomComp />
      </SDK>
    </div>
  );
};
