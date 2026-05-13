# @zhuh/oig

[![npm version](https://img.shields.io/npm/v/@zhuh/oig.svg)](https://www.npmjs.com/package/@zhuh/oig)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 从 OpenAPI/Swagger 规范自动生成 TypeScript API 客户端

## 功能特性

- 🔄 从 OpenAPI 协议直接生成高质量完整可用的 TS
- 📁 支持本地文件和远程 URL
- 🏷️ 自动生成类型定义和 API 函数
- 🌐 基于 axios 的自定义实例自由封装
- ✨ 自动格式化生成的代码（Biome）
- 📦 批量生成多个 API

## 使用

```bash
npx @zhuh/oig
```

## 快速开始

1. 创建配置文件 `src/api/openapi_api.json`：

```json
{
  "api_addresses": [
    {
      "definition": "petstore",
      "generate": false,
      "address": "https://petstore.swagger.io/v2/swagger.json"
    }
  ]
}
```

2. 运行生成命令：

```bash
npx @zhuh/oig
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
