import jsHoc from '@/components/JSHoc';
import { SDKProps } from '@/interface';
import { useEffect } from 'react';
import './index.less';

// label文本实现
const SceneSDK = (props: SDKProps) => {
  const { map, data = [] } = props;

  // 卸载
  useEffect(() => {
    return () => {
      if (map) {
        map.destroy();
      }
    };
  }, [map]);

  useEffect(() => {
    if (!map || !data || data.length < 1) {
      return;
    }

    data.forEach((item) => {
      const opts = {
        position: new BMapGL.Point(item.lng, item.lat), // 设置文本位置
        offset: new BMapGL.Size(item.offsetX, item.offsetY), // 设置文本偏移量
      };

      // 创建文本标注对象
      const label = new BMapGL.Label(item.text, opts);

      // 自定义文本标注样式
      label.setStyle(item.labelStyle || {});
      map.addOverlay(label);
    });
  }, [map, data]);

  return null;
};

// js 版本实现
const SceneJSSDK = jsHoc(SceneSDK);

export default SceneSDK;
export { SceneSDK, SceneJSSDK };
