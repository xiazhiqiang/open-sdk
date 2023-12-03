import React, { Children, cloneElement } from 'react';
import { useRemoteComponent } from './remote';

export interface IRenderProps {
  schema?: any;
  useHooks?: (...p: any) => any;
  [k: string]: any;
}

// 根据协议渲染组件并透传参数
export function RenderComponent(
  component: any,
  params: any = {},
  sdkRef: any = {},
) {
  if (!sdkRef) {
    sdkRef = {};
  }
  const { componentsMap = {}, sdkProps = {}, hooks = {} } = params || {};
  const { componentName, props: componentProps } = component || {};

  // 当前组件状态及参数
  const compProps = Object.assign(
    {},
    componentProps,
    sdkProps[componentName] || {}, // SDK外部传入组件参数
    (hooks || {})[componentName], // 从hooks中提取组件的状态作为props传入
  );

  const componentConfig = componentsMap.find(
    (item: any) => item && item.componentName === componentName,
  );

  // 根据配置获取远端组件
  const remoteComponent = useRemoteComponent(componentConfig);

  const Comp =
    componentConfig && componentConfig.package && componentConfig.package.js
      ? remoteComponent
      : componentConfig && componentConfig.package
      ? componentConfig.package
      : null;
  if (!Comp) {
    console.warn(`Component '${componentName}' is not found.`);
    return null;
  }

  // 渲染组件，传入props和递归渲染子组件
  return (
    <Comp
      {...sdkProps}
      {...compProps}
      ref={(el: any) => {
        if (!sdkRef.current) {
          sdkRef.current = {};
        }
        sdkRef.current[componentName] = el;
      }}
      hooks={hooks}
      sdkRef={sdkRef}
    >
      {/* 若schema存在子组件，则遍历渲染 */}
      {component.children &&
        component.children.map((child: any) =>
          RenderComponent(child, params, sdkRef),
        )}
    </Comp>
  );
}

// 根据componentsTree渲染组件
export function renderSDK(
  { schema, props: sdkProps, hooks }: any,
  sdkRef: any,
) {
  const { componentsMap = [], componentsTree = [] } = schema || {};

  return componentsTree.map((component: any) => {
    if (!component || !component.componentName) {
      return null;
    }
    return RenderComponent(
      component,
      { componentsMap, sdkProps, hooks },
      sdkRef,
    );
  });
}

// 遍历子组件并透传参数
export function renderChildren(props: any) {
  const { children, ...others } = props;

  return Children.map(children, (child) => {
    if (!child) {
      return null;
    } else if (typeof child === 'string') {
      return child;
    } else {
      return cloneElement(child, others);
    }
  });
}

// 初始化渲染
export function RenderInit(props: IRenderProps, ref: any) {
  const { schema, useHooks: propsUseHooks, ...others } = props;
  const useHooks =
    typeof propsUseHooks === 'function' ? propsUseHooks : () => ({});
  const hooks = useHooks(props, ref);

  return (
    <>
      {/* 根据schema渲染组件 */}
      {renderSDK({ schema, props: others, hooks }, ref)}
      {/* 渲染自定义SDK包裹的自定义组件 */}
      {renderChildren(props)}
    </>
  );
}
