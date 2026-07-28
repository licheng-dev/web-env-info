# @li-labs/vite-plugin-env-info

在浏览器 DevTools 控制台打印构建环境信息的 Vite 插件。页面加载时自动在浏览器控制台输出项目名称、构建环境、Node 版本、Git 分支和构建时间等信息。

## 特性

- `vite dev` 和 `vite build` 均可用，通过 `transformIndexHtml` 注入脚本
- 自动读取项目根目录 `package.json` 中的项目名称
- 自动获取当前 Git 分支
- 每个信息项可独立开关
- 使用 `console['log']` 输出，**即使构建工具配置了 `drop_console` 也不会被移除**
- TypeScript 编写，提供完整类型声明

## 安装

```bash
npm install @li-labs/vite-plugin-env-info --save-dev
```

```bash
pnpm add @li-labs/vite-plugin-env-info -D
```

```bash
yarn add @li-labs/vite-plugin-env-info -D
```

## 基本用法

在 `vite.config.ts` 中引入并配置插件：

```ts
import { defineConfig } from 'vite'
import vitePluginEnvInfo from '@li-labs/vite-plugin-env-info'

export default defineConfig({
  plugins: [
    vitePluginEnvInfo({
      env: 'production',
    }),
  ],
})
```

启动 `vite dev` 或执行 `vite build` 后，打开页面即可在**浏览器 DevTools 控制台**看到环境信息。

## 输出效果

打开浏览器开发者工具（F12），Console 面板将显示：

```
========================================
  项目名称 : my-vite-app
  构建环境 : production
  构建时间 : 2026/07/28 15:30:45
  Node版本 : v20.10.0
  Git 分支 : main
========================================
```

## 防 drop_console 原理

部分项目在 `vite.config.ts` 中配置了 `esbuild.drop: ['console']` 或 `terserOptions.compress.drop_console: true`，会移除所有 `console.log()` 调用。

本插件使用**计算属性**语法 `console['log'](...)` 代替 `console.log(...)`，绕过了 AST 静态匹配，不会被移除。

## 配置选项

### EnvInfoOptions

| 参数              | 类型      | 默认值                              | 必填 | 说明                                           |
| ----------------- | --------- | ----------------------------------- | ---- | ---------------------------------------------- |
| `env`             | `string`  | `process.env.NODE_ENV \|\| 'unknown'` | 否   | 构建环境标识，如 `development`、`test`、`production` |
| `projectName`     | `string`  | 自动读取 `package.json#name`         | 否   | 覆盖项目名称，不传则自动从 package.json 读取     |
| `showBranch`      | `boolean` | `true`                              | 否   | 是否显示 Git 分支信息                           |
| `showTime`        | `boolean` | `true`                              | 否   | 是否显示构建时间                                |
| `showNodeVersion` | `boolean` | `true`                              | 否   | 是否显示 Node.js 版本                           |

### 使用示例

**自定义所有选项：**

```ts
import { defineConfig } from 'vite'
import vitePluginEnvInfo from '@li-labs/vite-plugin-env-info'

export default defineConfig({
  plugins: [
    vitePluginEnvInfo({
      env: 'staging',
      projectName: 'my-custom-app',
      showBranch: true,
      showTime: true,
      showNodeVersion: false,
    }),
  ],
})
```

**最简配置（全部使用默认值）：**

```ts
import { defineConfig } from 'vite'
import vitePluginEnvInfo from '@li-labs/vite-plugin-env-info'

export default defineConfig({
  plugins: [vitePluginEnvInfo()],
})
```

**仅显示部分信息：**

```ts
import { defineConfig } from 'vite'
import vitePluginEnvInfo from '@li-labs/vite-plugin-env-info'

export default defineConfig({
  plugins: [
    vitePluginEnvInfo({
      showBranch: false,
      showNodeVersion: false,
    }),
  ],
})
```

**根据 Vite mode 动态设置环境：**

```ts
import { defineConfig } from 'vite'
import vitePluginEnvInfo from '@li-labs/vite-plugin-env-info'

export default defineConfig(({ mode }) => ({
  plugins: [
    vitePluginEnvInfo({
      env: mode === 'production' ? '生产环境' : '开发环境',
    }),
  ],
}))
```

## 兼容性

| Vite 版本 | 兼容状态 |
| --------- | -------- |
| >= 4.x    | 兼容     |
| >= 5.x    | 兼容     |

## 本地开发

```bash
# 克隆项目
git clone <your-repo-url>
cd vite-plugin-env-info

# 安装依赖
pnpm install

# 构建
pnpm build

# 监听模式
pnpm dev

# 本地调试（playground）
npx vite playground
```

## 发布到 npm

```bash
# 登录 npm（首次需要）
npm login

# 发布
npm publish
```

## 项目结构

```
vite-plugin-env-info/
├── src/
│   ├── index.ts          # 插件入口
│   ├── types.ts          # TypeScript 类型定义
│   └── utils.ts          # 工具函数
├── playground/           # 本地调试项目
│   ├── index.html
│   ├── main.ts
│   └── vite.config.ts
├── package.json
├── tsconfig.json
├── vite.config.ts        # 插件自身的构建配置
├── README.md
├── .gitignore
└── .npmignore
```

## License

MIT
