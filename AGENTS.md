# AGENTS.md

## 命令

- `pnpm build` — Rollup 构建，输出到 `dist/`
- `pnpm format` — Biome 格式化（不是 Prettier/ESLint）
- 无测试命令，无独立 lint 命令（biome linter 已禁用）

## 代码风格（Biome）

- 缩进：tab
- 引号：单引号
- 分号：仅需要时
- 配置：`biome.json`

## 架构

- 入口：`src/index.ts`（带 shebang，是 CLI 工具）
- API 配置：`src/api/openapi_api.json`（定义要生成的 schema 来源）
- 生成产物：`src/api/[definition]/`，被 .gitignore 忽略，不提交
- HTTP 封装：`src/api/_http.ts`（axios，基于 `data.code !== 0` 判断业务错误）
- 原始 schema：`schemas/` 目录

## 生成文件结构

每个 definition 生成：
- `_schemas.gen.ts` — 公共 schema
- `[tag].schema.ts` — 标签专用 schema
- `[tag].ts` — 标签 API 实现
- `_export.ts` — 汇总导出

## 关键依赖

- `@zhuh/orval` — orval 的自定义 fork，代码生成核心
- `@clack/prompts` — CLI 交互提示
- `execa` — 子进程执行

## 注意

- `__buildVersion` 由 Rollup replace 插件在构建时注入，定义在 `env.d.ts`
- `prepublishOnly` 流程：format → bumpp（版本号）→ build
- `.gitignore` 排除 `src/api/*` 但保留 `_http.ts` 和 `openapi_api.json`
