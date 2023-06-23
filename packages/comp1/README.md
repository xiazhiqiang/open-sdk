# comp1

## 本地开发

```shell
npm start
```

访问：http://localhost:8000/portal

## 构建

```shell
npm run build
```

分别产出：

- `docs-dist`：组件文档 Demo
- `es`：组件 esmodule
- `lib`：组件 commonjs
- `dist`：组件 umd

> 开发组件 Demo 及配置，详见[dumi 官网文档](https://d.umijs.org/config)
> 组件构建及配置，详见[father 文档](https://github.com/umijs/father/blob/master/docs/config.md)

## 常用命令

- 本地开发调试（同文档 Demo 调试）：`npm start`
- 文档 Demo 调试：`npm run docs:dev`
- 文档 Demo 构建：`npm run docs:build`
- 组件资源构建：`npm run comp:build`
- 组件资源检查：`npm run comp:doctor`
- 组件 umd 配置导出到 pkg.json：`npm run comp:externals`
- 组件代码打包（code.zip/sourcecode.zip）：`npm run comp:zip`
- 组件发布 npm 包：`npm publish`

## 目录说明

```text
├── docs：Demo站点实现目录，引用src/demos中的 tsx 文件
├── plugins：构建插件目录
│   ├── father.ts：用于 comp:build 自定义 father 构建插件
│   └── index.ts：用于 docs 自定义 dumi 插件
├── src
│   ├── demos：组件使用 Demo 代码实现
│   ├── typings.d.ts：公共类型定义
│   ├── interface.ts：自定义类型声明
│   ├── services：请求服务目录
│   ├── utils：公共方法目录
│   ├── components：内部公共组件集目录
│   │   └── compX
│   │       ├── index.tsx
│   │       └── index.less
│   ├── index.less：入口样式【用于组件或SDK工程】
│   └── index.ts[x]：入口【用于组件或SDK工程】
├── .dumirc.ts：dumi 组件文档构建配置
├── .editorconfig：编辑器配置，用于统一代码风格
├── .eslintignore
├── .eslintrc.js
├── .fatherrc.ts：father 构建配置，用于 build lib/es/dist 目录产物
├── .gitignore
├── .prettierignore：代码格式化忽略配置
├── .prettierrc.js：代码格式化配置
├── .stylelintrc
├── package.json
├── README.md：使用文档说明
└── tsconfig.json
```
