export interface SDKProps {
  /**
   * @description 描述
   * @remarks 备注
   * @default -
   */
  map?: any;

  data?: {
    lng?: number;
    lat?: number;
    text?: string;
    offsetX?: number;
    offsetY?: number;
    labelStyle?: any;
  }[];

  [key: string]: any;
}
