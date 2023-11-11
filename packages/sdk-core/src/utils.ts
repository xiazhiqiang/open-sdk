// 配置环境
export function configEnv(ENV_CONFIG: any, envConfig: { [x: string]: any }) {
  if (!ENV_CONFIG || !envConfig) {
    return;
  }
  Object.keys(envConfig).forEach((key) => {
    ENV_CONFIG[key] = envConfig[key];
  });
}

// 初始化应用
export async function initApp(APP: any, dom: any, params: any = {}) {
  const { projectId } = params || {};
  if (!APP || !dom || !projectId) {
    return null;
  }

  try {
    // 实例化
    const app = new APP(dom, params);

    // 异步初始化应用
    await app.init();

    return app;
  } catch (err) {
    return null;
  }
}

// 包裹SDK常用的方法
export function wrapperSDKUtils(SDK: any) {
  if (SDK) {
    const obj: any = { configEnv, initApp };
    Object.keys(obj).forEach((n) => {
      SDK[n] = obj[n];
    });
  }
  return SDK;
}
