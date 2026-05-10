# AGENTS.md

## 命令

- `pnpm build` — Rollup 构建，输出到 `dist/`
- `pnpm format` — Biome 格式化（不是 Prettier/ESLint）
- `pnpm typecheck` — TypeScript 类型检查
- `pnpm test` — 运行测试
- `pnpm test:watch` — 监听模式运行测试
- `pnpm test:coverage` — 运行测试并生成覆盖率报告

## 代码风格（Biome）

- 缩进：tab
- 引号：单引号
- 分号：仅需要时
- 配置：`biome.json`

## 架构

- 入口：`src/index.ts`（带 shebang，是 CLI 工具）
- CLI 主流程：`src/cli.ts`
- 主生成函数：`src/generators/index.ts`
- API 配置：`src/api/openapi_api.json`（定义要生成的 schema 来源）
- 生成产物：`src/api/[definition]/`，被 .gitignore 忽略，不提交
- HTTP 封装：`src/api/_http.ts`（axios，基于 `data.code !== 0` 判断业务错误）
- 原始 schema：`schemas/` 目录

## 模块结构

```
src/
├── index.ts           # 入口（仅 shebang）
├── cli.ts             # CLI 主流程
├── utils/
│   ├── config.ts      # Config 类型和 loadConfig
│   ├── fs.ts          # 目录管理工具
│   └── format.ts      # Biome 格式化
└── generators/
    ├── index.ts       # 主生成函数
    ├── schema.ts      # 通用 Schema 生成
    ├── tag.ts         # Tag 文件生成
    └── export.ts      # Export 文件生成
```

## 生成文件结构

每个 definition 生成：
- `_schemas.gen.ts` — 公共 schema
- `[tag].schema.ts` — 标签专用 schema
- `[tag].ts` — 标签 API 实现
- `_export.ts` — 汇总导出

## 测试

- 测试框架：Vitest
- 测试目录：`tests/`
- 单元测试：`tests/unit/`
- 集成测试：`tests/integration/`
- 路径别名：`@` 指向 `src/`

## 关键依赖

- `@zhuh/orval` — orval 的自定义 fork，代码生成核心
- `@clack/prompts` — CLI 交互提示
- `execa` — 子进程执行

## 注意

- `__buildVersion` 由 Rollup replace 插件在构建时注入，定义在 `env.d.ts`
- `prepublishOnly` 流程：format → bumpp（版本号）→ build
- `.gitignore` 排除 `src/api/*` 但保留 `_http.ts` 和 `openapi_api.json`
- 包名：`@zhuh/oig`
