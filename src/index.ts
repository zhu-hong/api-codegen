import { readFile, writeFile } from 'node:fs/promises'
import { execa } from 'execa'
import * as p from '@clack/prompts'
import color from 'picocolors'
import type { SchemasObject } from 'openapi3-ts/oas30'
import {
  generateSchemasDefinition,
  upath,
  kebab,
} from '@orval/core'
import { _effect_generateContextSpecs, _effect_getApiGenerate } from 'orval-effect'

const IMPORT_AXIOS = `import { _http } from './_http.ts'`
const workspace = process.cwd()

async function main() {
  console.clear()
  const packageJson = await readFile(new URL('../package.json', import.meta.url).pathname)
  const { version } = JSON.parse(packageJson.toString())
  p.intro(`D2M 接口文件生成工具(V_${color.green(`${version}`)})`)

  const spinner = p.spinner()

  const schemaAddress = await p.text({
    message: 'Swagger-Schema(一个相对地址或网络地址)',
    placeholder: 'openapi.schema.json',
    validate: (value) => {
      if (!value.trim()) return '没有没有没有'
    },
  })

  if (p.isCancel(schemaAddress)) {
    process.exit(0)
  }

  spinner.start('生成上下文')
  const { specValue, input, ...contextSpecs } = await _effect_generateContextSpecs({
    input: schemaAddress,
    output: {
      target: upath.resolve(workspace, 'src/api/'),
      mode: 'tags',
      override: {
        mutator: {
          path: upath.resolve(workspace, 'src/api/_http.ts'),
          name: '_http',
        },
      },
    },
  }).finally(() => spinner.stop('生成上下文'))

  spinner.start('生成模型文件')
  const schemasDefinition = generateSchemasDefinition(specValue?.components?.schemas as SchemasObject, contextSpecs, '')
  await writeFile(
    upath.resolve(workspace, 'src/api/_models.gen.ts'),
    schemasDefinition.map((s) => s.model).join('\n')
  ).finally(() => spinner.stop('生成模型文件'))
  
  spinner.start('生成接口模型')
  const { operations: apiOperations, schemas: apiSchemas } = await _effect_getApiGenerate({
    input,
    output: contextSpecs.output,
    context: contextSpecs,
  }).finally(() => spinner.stop('生成接口模型'))

  const operationValues = Object.values(apiOperations)

  const tags = [...new Set(operationValues.map(({ tags }) => tags).flat())]

  const apiGenerates = tags.map(async (tag) => {
    const operations = operationValues.filter(({ tags }) => tags.includes(tag))
    /**
     * 统计出tag用哪些接口函数，以及用到了哪些schema，schema有引用了哪些modelSchema
    */
    const implementations = operations.map(({ implementation }) => implementation)

    type Imports = (typeof operations)[number]['imports']

    // 接口要的request/response模型
    const apiImports: Imports = []
    // request/response模型要的模型
    const apiSchemaImports: Imports = []
    // 接口要的模型
    const schemaImports: Imports = []
    
    operations.map(({ imports }) => imports).flat().forEach((imports) => {
      if(imports.schemaName) {
        schemaImports.push(imports)
        return
      }

      apiImports.push(imports)

      const target = apiSchemas.find((schema) => schema.name === imports.name)
      if(target !== undefined) {
        apiSchemaImports.push(...target.imports.filter(({ schemaName }) => schemaName))
      }
    })

    const schemaRaw = `${apiSchemaImports.length === 0 ? '' : `import type {${[...new Set(apiSchemaImports.map(({ schemaName }) => schemaName))].join(',')},} from './_models.gen'

`}${[... new Set(apiImports.map(({ name }) => name))].map((name) => apiSchemas.find((s) => s.name === name)?.model).join('\n')}`

  if(schemaRaw.trim().length > 0) {
    await writeFile(upath.resolve(workspace, `src/api/${kebab(tag)}.schema.ts`), schemaRaw)
  }

  const implementationRaw = `${schemaImports.length === 0 ? '' : `import type {${[...new Set(schemaImports.map(({ schemaName }) => schemaName))].join(',')},} from './_models.gen'
`}${apiImports.length === 0 ? '' : `import type {${[...new Set(apiImports.map(({ name }) => name))].join(',')},} from './${kebab(tag)}.schema'
`}${IMPORT_AXIOS}

${implementations.map((implementation) => implementation).join('\n')}`

    if(implementationRaw.trim().length > 0) {
      await writeFile(upath.resolve(workspace, `src/api/${kebab(tag)}.ts`), implementationRaw)
    }
  })

  spinner.start('生成接口文件')
  await Promise.all(apiGenerates).finally(() => spinner.stop('生成接口文件'))

  try {
    spinner.start('尝试格式化生成文件')
    await execa('pnpm', ['biome', 'format', '--write', upath.resolve(workspace, 'src/api/'), '--quote-style=single', '--semicolons=as-needed'])
    spinner.stop('尝试格式化生成文件')
  } catch (error) {
    spinner.stop('尝试格式化生成文件')
  }

  p.outro(color.green('生成成功👏👏👏'))
}

main().catch(console.error)
