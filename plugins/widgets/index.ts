import { IApi } from 'umi';
import { basename, dirname, extname, join, relative } from 'path';
import { getWidgets } from './getWidget';
import { readFileSync } from 'fs';
import { Mustache, lodash, winPath } from '@umijs/utils';

export default function (api: IApi) {

  function getSrcModelsPath() {
    return join(api.paths.absSrcPath!, '_widgets');
  }

  function getAllInitStates() {
    const srcModelsPath = getSrcModelsPath();
    const baseOpts = {
      skipModelValidate: api.config.dva?.skipModelValidate,
      extraModels: api.config.dva?.extraModels,
    };
    return lodash.uniq([
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
    ]);
  }


  api.describe({
    key: "abpwidget",
    enableBy: api.EnableBy.register,
  })

  let hasModels = false;

  api.onStart(() => {
    hasModels = getAllInitStates().length > 0;
  });

  api.onGenerateFiles(() => {

    const models = getAllInitStates();
    hasModels = models.length > 0;

    // if (!hasModels) return;

    const dvaTpl = readFileSync(join(__dirname, 'widget.tpl'), 'utf-8');
    api.writeTmpFile({
      path: `index.ts`,
      content: Mustache.render(dvaTpl, {
        RegisterModelImports: models
          .map((path, index) => {
            const modelName = `${lodash.upperFirst(
              lodash.camelCase(basename(path, extname(path))),
            )}`;
            return `import ${modelName} from '${path}';`;
          })
          .join('\r\n'),
        RegisterModels: models
          .map((path, index) => {
            // prettier-ignore
            const modelName = `${lodash.upperFirst(
              lodash.camelCase(basename(path, extname(path))),
            )}`;
            return `export { ${modelName} }`.trim();
          })
          .join('\r\n'),
        Datas: models
          .map((path, index) => {
            // prettier-ignore
            const modelName = `${lodash.upperFirst(
              lodash.camelCase(basename(path, extname(path))),
            )}`;
            return `"${modelName}" : ${modelName} ,`.trim();
          })
          .join('\r\n'),
      })
    });
  });
}