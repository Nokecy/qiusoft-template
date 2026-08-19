import { IApi } from 'umi';
import { basename, extname, join } from 'path';
import { getWidgets } from './getWidget';
import { readFileSync } from 'fs';
import { Mustache, lodash, winPath } from '@umijs/utils';

export default function (api: IApi) {

  const enabledRouteModules = process.env.DEV_ROUTE_MODULES?.split(',').map(item => item.trim()).filter(Boolean);

  function filterByEnabledRouteModules(paths: string[]) {
    if (!enabledRouteModules?.length) return paths;

    // 开发路由裁剪时，普通 widget 也只生成对应业务模块，避免临时入口加载全系统。@author nokecy
    const pagesPath = winPath(api.paths.absPagesPath!);
    return paths.filter(path => {
      const normalizedPath = winPath(path);
      if (!normalizedPath.startsWith(`${pagesPath}/`)) return true;

      const moduleName = normalizedPath.slice(pagesPath.length + 1).split('/')[0];
      return enabledRouteModules.includes(moduleName);
    });
  }

  function getModelName(path: string) {
    return `${lodash.upperFirst(
      lodash.camelCase(basename(path, extname(path))),
    )}`;
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
    return filterByEnabledRouteModules(lodash.uniq([
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
            return `"${modelName}" : ${modelName}${index} ,`.trim();
          })
          .join('\r\n'),
      })
    });
  });
}
