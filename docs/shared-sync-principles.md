# 共享同步原则

本项目通过 `qiusoft-shared-cli` 同步模板中的公共模块与工程配置。同步行为以模板根目录的 `shared.manifest.json` 为唯一事实来源。

## 核心规则

1. **只同步清单 includes**  
   未在 `shared.manifest.json` 中声明的文件或目录，默认不做任何变更。

2. **exclude 为全局忽略**  
   清单中的 `exclude` 规则会在同步时统一跳过（如 `node_modules`、`.umi` 等）。

3. **skipIfExists 表示“只初始化一次”**  
   当目标路径已存在时跳过同步。用于保护项目私有配置。

4. **默认覆盖共享目录**  
   `qiusoft-shared-cli update` 会覆盖清单内的共享目录内容（除 `skipIfExists`），并在非 `--force` 模式下生成 `.shared-backup` 备份。

5. **共享目录脏改动保护**  
   若共享目录存在未提交改动，会被阻止同步（可使用 `--allow-dirty` 临时放行）。

## 一次性初始化项

以下目录只在初始化阶段同步一次，后续更新不再覆盖：

- `public/config`（清单中已标记 `skipIfExists`）

## 特殊处理项

- `config/routers.ts`：若目标存在则不覆盖（`skipIfExists`）。如需重置，请先手动删除再同步。
- `config/routeItems`：仅同步 `appSYS.json`，其他路由配置不在同步范围内。
- `config/swaggers`：不在同步范围内。
- `config/project.local.ts`：仅在不存在时从模板复制，用于项目私有配置。

## 子库与业务模块

业务模块采用 Git 子库方式管理，不在 `shared.manifest.json` 内同步。当前可用子库包括：

- appSYS（默认模板已包含）
- appMES / appWMS / appPDM / appWorkflow / appTMS / appCommon

添加子库建议使用 CLI（示例）：

```
npx qiusoft-shared-cli submodule list
npx qiusoft-shared-cli submodule add appMes appWms
```

## 最佳实践

- **项目私有配置**：放入 `config/project.local.ts` 或 `public/config`。
- **避免手改共享目录**：会被后续同步覆盖；若确需定制，请放到项目私有目录。
- **更新后复查**：同步完成后关注变更清单与运行验证。
