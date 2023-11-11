import Comp1 from 'comp1';
import Comp2 from 'comp2';
import { Engine } from 'sdk-core';

// SDK Schema，参考低代码引擎schema
export default {
  componentsMap: [
    {
      componentName: 'Root',
      package: Engine.renderChildren,
    },
    {
      componentName: 'Comp1',
      package: Comp1,
    },
    {
      componentName: 'Comp2',
      package: Comp2,
    },
  ],
  componentsTree: [
    {
      componentName: 'Root',
      props: {},
      children: [
        {
          componentName: 'Comp1',
          props: {},
        },
        {
          componentName: 'Comp2',
          props: {},
        },
      ],
    },
  ],
};
