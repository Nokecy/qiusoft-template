import { IApi } from 'umi';
import { basename, extname, join } from 'path';
import { getWidgets } from './getWidget';
import { readFileSync } from 'fs';
import { Mustache, lodash, winPath } from '@umijs/utils';

export default function (api: IApi) {

  const enabledRouteModules = process.env.DEV_ROUTE_MODULES?.split(',').map(item => item.trim()).filter(Boolean);

  function filterByEnabledRouteModules(paths: string[]) {
    if (!enabledRouteModules?.length) return paths;

    // 开发路由裁剪时，表单组件也只生成对应业务模块，避免 Webpack/Mako 仍加载全系统组件。@author nokecy
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
      // lodash.camelCase(basename(path, extname(path))),
      basename(path, extname(path)),
    )}`;
  }

  function getSrcModelsPath() {
    return join(api.paths.absSrcPath!, '_formWidgets');
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
        pattern: `**/${"_formWidgets"}/*.{ts,tsx,js,jsx}`,
        ...baseOpts,
      })
    ]));
  }


  api.describe({
    key: "formWidget",
    enableBy: api.EnableBy.register,
  })

  api.onGenerateFiles(() => {

    const models = getAllInitStates();

    // if (!hasModels) return;

    const dvaTpl = readFileSync(join(__dirname, 'widget.tpl'), 'utf-8');

    api.writeTmpFile({
      path: `index.ts`,
      content: Mustache.render(dvaTpl, {
        RegisterModelImports: models
          .map((path, index) => {
            const modelName = getModelName(path);
            const componentName = `${modelName}Component${index}`;
            const exportName = `${modelName}${index}`;
            return `import ${componentName},{ ${modelName} as ${exportName} } from '${path}';`;
          })
          .join('\r\n'),
        RegisterModels: models
          .map((path, index) => {
            // prettier-ignore
            const modelName = getModelName(path);
            return `export { ${modelName}${index} }`.trim();
          })
          .join('\r\n'),
        Datas: models
          .map((path, index) => {
            // prettier-ignore
            const modelName = getModelName(path);
            return `${modelName}Component${index} ,`.trim();
          })
          .join('\r\n'),

        ComponentDatas: models
          .map((path, index) => {
            // prettier-ignore
            const modelName = getModelName(path);
            return `${JSON.stringify(modelName)}: ${modelName}${index} ,`.trim();
          })
          .join('\r\n'),
      })
    });
  });
}
