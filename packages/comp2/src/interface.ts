export interface SDKProps {
  /**
   * @description 描述
   * @remarks 备注
   * @default -
   */
  map?: any;

  style?: any;

  data?: {
    dataType: string;
    staticData: ILabelItemData[];
  };

  [key: string]: any;
}

export interface ILabelItemData {
  lng?: number;
  lat?: number;
  text?: string;
  offsetX?: number;
  offsetY?: number;
  labelStyle?: any;
}
