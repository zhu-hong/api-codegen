# @zhuh/openapi-gen

[![npm version](https://img.shields.io/npm/v/@zhuh/openapi-gen.svg)](https://www.npmjs.com/package/@zhuh/openapi-gen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 从 OpenAPI/Swagger 规范自动生成 TypeScript API 客户端

## 功能特性

- 支持 OpenAPI 3.x 和 Swagger 2.0
- 支持本地文件和远程 URL
- 自动生成类型定义和 API 函数
- 基于 axios 的 HTTP 客户端封装
- 自动格式化生成的代码（Biome）
- 批量生成多个 API

## 安装

```bash
npm install -g @zhuh/openapi-gen
# 或
pnpm add -g @zhuh/openapi-gen
```

## 快速开始

1. 创建配置文件 `src/api/openapi_api.json`：

```json
{
  "api_addresses": [
    {
      "definition": "petstore",
      "address": "https://petstore.swagger.io/v2/swagger.json"
    }
  ]
}
```

2. 运行生成命令：

```bash
openapi-gen
```

3. 查看生成的文件：

```
src/api/petstore/
├── _schemas.gen.ts      # 公共 schema
├── pet.schema.ts        # Pet 相关 schema
├── pet.ts               # Pet API 函数
└── _export.ts           # 汇总导出
```

## 配置说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `definition` | string | 是 | 输出目录名 |
| `address` | string | 是 | Schema 文件路径或 URL |
| `generate` | boolean | 否 | 是否生成（默认 true） |

## CLI 参数

| 参数 | 说明 |
|------|------|
| `-s <path>` | 直接指定 schema 路径（兼容 v1） |
| `-d` | 开发模式（显示详细警告） |

## 生成的文件结构

每个 definition 生成：

- `_schemas.gen.ts` — 公共 schema（`#/components/schemas`）
- `[tag].schema.ts` — 标签专用 schema
- `[tag].ts` — 标签 API 实现（基于 axios）
- `_export.ts` — 汇总导出文件

## HTTP 客户端

生成的代码使用 `src/api/_http.ts` 封装的 axios 实例：

- 自动处理业务错误码（`data.code !== 0`）
- 60 秒超时
- 支持自定义配置

## 开发

```bash
# 构建
pnpm build

# 格式化
pnpm format
```

## 技术栈

- TypeScript + Rollup
- Biome（代码格式化）
- @zhuh/orval（代码生成核心）
- pnpm（包管理）

## 许可证

MIT
