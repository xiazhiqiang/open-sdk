# opensdk

前端开放 SDK 设计及实现 Demo

## 初始化场景组件

```shell
npm create ice [目录名] --template datau-scene-sdk-tpl
```

## 初始化安装依赖

```shell
npm run bootstrap
```

## 添加依赖

```shell
# 全局添加依赖
yarn workspace add <依赖包> -W [--dev]

# 为工程包添加依赖
yarn workspace <工程包名> add <package> [--dev]

# 添加内部依赖，需要指定依赖版本
yarn workspace <工程包名> add <package><version>

# 查看工作空间中的包依赖关系
yarn workspaces info
```

## 为 sdk 安装 comp1 和 comp2

```shell
yarn workspace sdk add comp1@1.0.0
yarn workspace sdk add comp2@1.0.0
```
