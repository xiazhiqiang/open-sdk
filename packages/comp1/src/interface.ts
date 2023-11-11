export interface SDKProps {
  /**
   * @description 描述
   * @remarks 备注
   * @default -
   */
  map?: any;

  style?: {
    lineStyle?: any;
    polygonStyle?: any;
  };

  data?: {
    dataType: string | 'staticData';
    staticData?: {
      type?: string | 'points' | 'lines' | 'polygons';
      coordinates?: PointsCoordinate[] | PointsCoordinate[][];
    };
  };

  [key: string]: any;
}

export interface PointsCoordinate {
  lng?: number;
  lat?: number;
  [k: string]: any;
}
