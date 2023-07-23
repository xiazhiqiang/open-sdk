import jsHoc from '@/components/JSHoc';
import { PointsCoordinate, SDKProps } from '@/interface';
import { useEffect, useState } from 'react';
import './index.less';

// 点线面实现
const SceneSDK = (props: SDKProps) => {
  const { map } = props;
  const { lineStyle = {}, polygonStyle = {} } = props.style || {};
  const [data, setData] = useState<any>({});

  // 监听数据配置变化，更新data
  useEffect(() => {
    const { dataType, staticData } = props.data || {};
    if (dataType === 'staticData' && staticData) {
      setData(staticData);
    }
  }, [props.data]);

  // 渲染多点
  const renderPoints = (coordinates: any = []) => {
    coordinates.forEach((point: PointsCoordinate) => {
      const marker = new BMapGL.Marker(new BMapGL.Point(point.lng, point.lat));
      map.addOverlay(marker);
    });
  };

  // 渲染多条线
  const renderLines = (coordinates: any = []) => {
    coordinates.forEach((line: any = []) => {
      const linePoints: any = [];
      line.forEach((point: PointsCoordinate) => {
        linePoints.push(new BMapGL.Point(point.lng, point.lat));
      });

      // 创建折线
      map.addOverlay(new BMapGL.Polyline(linePoints, lineStyle));
    });
  };

  const renderPolygons = (coordinates: any = []) => {
    coordinates.forEach((polygon: any = []) => {
      const polygonPoints: any = [];
      polygon.forEach((point: PointsCoordinate) => {
        polygonPoints.push(new BMapGL.Point(point.lng, point.lat));
      });

      // 创建面
      map.addOverlay(new BMapGL.Polygon(polygonPoints, polygonStyle));
    });
  };

  // 卸载
  useEffect(() => {
    return () => {
      if (map) {
        map.destroy();
      }
    };
  }, [map]);

  // 渲染
  useEffect(() => {
    if (
      !map ||
      !data ||
      !data.type ||
      !data.coordinates ||
      data.coordinates.length < 1
    ) {
      return;
    }

    switch (data.type) {
      case 'points':
        renderPoints(data.coordinates);
        break;
      case 'lines':
        renderLines(data.coordinates);
        break;
      case 'polygons':
        renderPolygons(data.coordinates);
        break;

      default:
        break;
    }
  }, [map, data]);

  return null;
};

// js 版本实现
const SceneJSSDK = jsHoc(SceneSDK);

export default SceneSDK;
export { SceneSDK, SceneJSSDK };
