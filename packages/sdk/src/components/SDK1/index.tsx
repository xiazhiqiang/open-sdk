import Container from '@/components/Container';
import Root from '@/components/Root';
import Comp1 from 'comp1';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import './index.less';

// SDK Schema，参考低代码引擎schema
const sdkSchema: any = {
  componentsMap: [
    {
      componentName: 'Root',
      package: '@/components/Root',
      componentType: 'react',
    },
    {
      componentName: 'Comp1',
      package: 'comp1',
      componentType: 'react',
    },
    {
      componentName: 'Comp2',
      package: 'comp2',
      componentType: 'react',
    },
    {
      componentName: 'Comp3',
      package: '@/components/Comp3',
      componentType: 'js',
    },
  ],
  componentsTree: [
    {
      componentName: 'Root',
      props: {
        // todo 父组件参数schema
        style: {},
        data: {},
      },
      children: [
        {
          componentName: 'Comp1',
          props: {
            // 设计子组件参数schema
            style: {},
            data: {},
          },
        },
        {
          componentName: 'Comp2',
          props: {
            style: {},
            data: {},
          },
        },
      ],
    },
  ],
};

const SDK = forwardRef((props: any, ref) => {
  const { comp1 } = props;
  const sdkRef = useRef<any>({});

  useImperativeHandle(
    ref,
    () => {
      return sdkRef.current;
    },
    [],
  );

  return (
    <Root
      {...props}
      ref={(el: any) => {
        sdkRef.current.root = el;
        sdkRef.current.map = el && el.map ? el.map : null;
      }}
    >
      {/* 内置组件 */}
      <Comp1
        {...comp1}
        ref={(el) => {
          sdkRef.current.comp1 = el;
        }}
      />
      {/* 扩展组件 */}
      <Container>{props.children}</Container>
    </Root>
  );
});

export default SDK;
