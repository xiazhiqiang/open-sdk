import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

// 缓存已加载的远端模块
const cachedMods: any = {};

// 运行umd依赖
const moduleDeps: any = {
  React,
  ReactDOM,
  react: React,
  'react-dom': ReactDOM,
};

// 设置模块依赖
export function setModuleDeps(deps: any = {}) {
  Object.keys(deps).forEach((k) => {
    moduleDeps[k] = deps[k];
  });
}

export function getCachedMod(name?: string) {
  return name ? cachedMods[name] || null : cachedMods;
}
export function delCachedMod(name: string) {
  let ret = null;
  if (name && cachedMods[name]) {
    ret = cachedMods[name];
    delete cachedMods[name];
  }
  return ret;
}

// 运行远端js模块代码
export function runCode(code: string) {
  // 定义参数
  const e = {};
  const m = { exports: e };
  const r = function (name: string) {
    return moduleDeps[name];
  };

  try {
    // 浏览器执行源码
    const f = new Function('exports', 'module', 'require', 'define', code);
    f.call(null, e, m, r, () => {});
    return m.exports;
  } catch (e) {
    console.error('run code error: ', e);
    return;
  }
}

// 动态加载js模块
export async function loadModule({ name, js }: any) {
  if (cachedMods[name]) {
    console.log('mod cached: ', cachedMods[name]);
    return cachedMods[name];
  }

  try {
    // 加载js源码
    let source = (await (await fetch(js)).text()) || '';
    if (!source) {
      throw new Error(`Component source is empty.`);
    }

    // 请求模块源码
    const ret = runCode(source);
    if (ret !== undefined) {
      // 更新模块缓存
      cachedMods[name] = ret;
    }
  } catch (e: any) {
    console.warn(e && e.message ? e.message : `Load remote component error.`);
  }

  return cachedMods[name];
}

// 为了保证扩展的样式优先级高于业务动态样式（在head中），所以插入扩展样式在body内头部或body中已存在的link标签之后
export async function insertModuleCss(name: string, css: string) {
  return new Promise(function (resolve) {
    if (!name || !css) {
      resolve(false);
      return;
    }

    // 找出body内部含有module属性的link标签，然后追加到最后一个link后面，如果没有则追加到body的第一个子元素前面
    const bodyLinks = Array.from(
      document.body.getElementsByTagName('link'),
    ).filter((i) => i && i.getAttribute('module') === name);

    const existElement = bodyLinks.find((i) => i.getAttribute('href') === css);
    // 若已存在外部模块的样式文件，则只需要变更link标签位置即可
    if (existElement) {
      if (bodyLinks[bodyLinks.length - 1].nextSibling) {
        document.body.insertBefore(
          existElement,
          bodyLinks[bodyLinks.length - 1].nextSibling,
        );
      } else {
        document.body.appendChild(existElement);
      }
      resolve(true);
    } else {
      const element = document.createElement('link');
      element.setAttribute('module', name);
      element.rel = 'stylesheet';
      element.href = css;
      element.addEventListener(
        'error',
        function () {
          console.log('css asset loaded error: ', css);
          return resolve(false);
        },
        false,
      );
      element.addEventListener(
        'load',
        function () {
          return resolve(true);
        },
        false,
      );

      if (bodyLinks.length > 0) {
        if (bodyLinks[bodyLinks.length - 1].nextSibling) {
          document.body.insertBefore(
            element,
            bodyLinks[bodyLinks.length - 1].nextSibling,
          );
        } else {
          document.body.appendChild(element);
        }
      } else {
        if (document.body.firstChild) {
          document.body.insertBefore(element, document.body.firstChild);
        } else {
          document.body.appendChild(element);
        }
      }
    }
  });
}

// 移除模块link标签
export function removeModuleCss(name: string, css: string) {
  if (!name || !css) {
    return;
  }

  const moduleLink = Array.from(
    document.body.getElementsByTagName('link'),
  ).find(
    (i) =>
      i && i.getAttribute('module') === name && i.getAttribute('href') === css,
  );
  if (moduleLink) {
    moduleLink.parentNode?.removeChild(moduleLink);
  }
}

export function useRemoteComponent(props: any) {
  const { package: pkg, componentName: name } = props || {};
  const { js, css, exportName = 'default' } = pkg || {};
  const [mod, setMod] = useState(null);

  useEffect(() => {
    let mod = null;
    (async () => {
      if (js && name) {
        mod = await loadModule({ name, js });
        await insertModuleCss(name, css);
        setMod(mod && mod[exportName] ? mod[exportName] : null);
      }
    })();

    return () => {
      if (js && name) {
        // 从缓存中移除
        delete cachedMods[name];
        removeModuleCss(name, css);
        setMod(null);
      }
    };
  }, [name, js, css]);

  return mod;
}
