import Container from '@/components/Container';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

export interface IProps {
  containerId?: string;
  centerLng?: number;
  centerLat?: number;
  zoom?: number;
  scrollWheelZoom?: boolean | true;
  init?: (p?: any) => any;
  [k: string]: any;
}

export default forwardRef((props: IProps, ref) => {
  const {
    containerId = `root-container`,
    centerLng,
    centerLat,
    zoom,
    scrollWheelZoom = true,
  } = props.mapView || {};
  const [map, setMap] = useState<any>(null);

  useImperativeHandle(ref, () => ({ map }), [map]);

  // 初始化map实例
  useEffect(() => {
    let map = new BMapGL.Map(containerId); // 创建地图实例

    (async () => {
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
    <div id={containerId}>
      <Container map={map}>{props.children}</Container>
    </div>
  );
});
