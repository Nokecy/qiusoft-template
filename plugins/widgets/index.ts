import { IApi } from 'umi';
import { basename, extname, join } from 'path';
import { scanFiles as getWidgets } from '../scanFiles';
import { filterByEnabledRouteModules } from '../routeModules';
import { readFileSync } from 'fs';
import { Mustache, lodash } from '@umijs/utils';

export default function (api: IApi) {

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
            return `"${modelName}" : ${modelName}${index} ,`.trim();
          })
          .join('\r\n'),
      })
    });
  });
}
