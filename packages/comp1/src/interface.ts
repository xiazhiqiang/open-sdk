export interface SDKProps {
  /**
   * @description 描述
   * @remarks 备注
   * @default -
   */
  map?: any;

  data?: {
    type?: string | 'points' | 'lines' | 'polygons';
    coordinates?: PointsCoordinate[] | PointsCoordinate[][];
    lineStyle?: any;
    polygonStyle?: any;
  };

  [key: string]: any;
}

export interface PointsCoordinate {
  lng?: number;
  lat?: number;
  [k: string]: any;
}
