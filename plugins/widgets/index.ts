import { IApi } from 'umi';
import { basename, extname, join } from 'path';
import { scanFiles as getWidgets } from '../scanFiles';
import { filterByEnabledRouteModules } from '../routeModules';
import { readFileSync } from 'fs';
import { Mustache, lodash, winPath } from '@umijs/utils';

export default function (api: IApi) {

  function getModelName(path: string) {
    return `${lodash.upperFirst(
      lodash.camelCase(basename(path, extname(path))),
    )}`;
  }

  /**
   * 小程序归属哪个模块，由**文件位置**判定：src/pages 下取一级目录名（appMES / appSYS…），
   * 应用壳自带的记为 appShell，宿主自己 src/_widgets 下的记为 host。
   *
   * 不让小程序自己在元数据里声明归属：归属是物理事实，让人重写一遍只会漂移——
   * 写错了要等它跑到别的模块的仪表板上冒出来才会被发现。
   *
   * 用途见 appShell/_utils/boardWidgets.ts：各模块入口的仪表板据此只铺自己的小程序，
   * 而不是把全系统的小程序都铺一遍（基础信息仪表板上长出 MES 的今日过站）。@author nokecy
   */
  function getWidgetOwner(path: string) {
    const normalized = winPath(path);
    const pagesPath = winPath(api.paths.absPagesPath!);
    if (normalized.startsWith(`${pagesPath}/`)) {
      return normalized.slice(pagesPath.length + 1).split('/')[0];
    }
    const shellPath = winPath(join(api.paths.absSrcPath!, 'appShell'));
    if (normalized.startsWith(`${shellPath}/`)) return 'appShell';
    return 'host';
  }

  function getSrcModelsPath() {
    return join(api.paths.absSrcPath!, '_widgets');
  }

  function getAllInitStates() {
    const srcModelsPath = getSrcModelsPath();
    const baseOpts = {
      skipModelValidate: api.config.dva?.skipModelValidate,
      extraModels: api.config.dva?.extraModels,
    };
    return filterByEnabledRouteModules(api, lodash.uniq([
      ...getWidgets({
        base: srcModelsPath,
        cwd: api.cwd,
        ...baseOpts,
      }),
      ...getWidgets({
        base: api.paths.absPagesPath!,
        cwd: api.cwd,
        pattern: `**/${"_widgets"}/*.{ts,tsx,js,jsx}`,
        ...baseOpts,
      }),
      ...getWidgets({
        base: api.paths.absPagesPath!,
        cwd: api.cwd,
        pattern: `**/widget.{ts,tsx,js,jsx}`,
        ...baseOpts,
      }),
      // 应用壳自带的通用小程序（欢迎、最近访问、我的收藏）。
      // 它们与客户装了哪些业务模块无关，四个宿主都该有，所以放在壳里而不是各宿主 src/_widgets 各抄一份。
      // 只扫一层：以后 _widgets 下若放辅助文件，不该被当成小程序注册。
      // 不在 src/pages 下，因此不受 DEV_ROUTE_MODULES 裁剪影响（见 filterByEnabledRouteModules）。@author nokecy
      ...getWidgets({
        base: join(api.paths.absSrcPath!, 'appShell', '_widgets'),
        cwd: api.cwd,
        pattern: `*.{ts,tsx,js,jsx}`,
        ...baseOpts,
      }),
    ]));
  }


  api.describe({
    key: "abpwidget",
    enableBy: api.EnableBy.register,
  })

  api.onGenerateFiles(() => {

    const models = getAllInitStates();
    const modelNameCounts = lodash.countBy(models.map(path => getModelName(path)));

    // if (!hasModels) return;

    const dvaTpl = readFileSync(join(__dirname, 'widget.tpl'), 'utf-8');
    api.writeTmpFile({
      path: `index.ts`,
      content: Mustache.render(dvaTpl, {
        RegisterModelImports: models
          .map((path, index) => {
            const modelName = getModelName(path);
            return `import ${modelName}${index} from '${path}';`;
          })
          .join('\r\n'),
        RegisterModels: models
          .map((path, index) => {
            // prettier-ignore
            const modelName = getModelName(path);
            if (modelNameCounts[modelName] > 1) {
              return `export { ${modelName}${index} }`.trim();
            }
            return `export { ${modelName}${index} as ${modelName} }`.trim();
          })
          .join('\r\n'),
        Datas: models
          .map((path, index) => {
            // prettier-ignore
            const modelName = getModelName(path);
            // 归属只在汇总表里补一个 owner 字段，具名导出保持原样：读元数据的地方一律走
            // WidgetComponents，而未升级本插件的宿主里没有这个字段，壳侧据此退回「全铺」不至于铺空。
            return `"${modelName}" : { ...${modelName}${index}, owner: "${getWidgetOwner(path)}" } ,`.trim();
          })
          .join('\r\n'),
      })
    });
  });
}
