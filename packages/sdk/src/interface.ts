import { SDKProps as IComp1 } from 'comp1/lib/interface';
import { SDKProps as IComp2 } from 'comp2/lib/interface';
import { IProps as IContainer } from './components/Root';

export interface SDKProps {
  comp1?: IComp1;
  comp2?: IComp2;
  container?: IContainer;

  config?: {
    container: string;
  };

  componentsTree?: IComponentTreeNode[];

  data?: any;

  [key: string]: any;
}

export interface IComponentTreeNode {
  componentName: string;
  props: {
    style?: any;
    data?: any;
  };
}
