import { IApi } from 'umi';
import { Mustache, lodash, winPath } from '@umijs/utils';
import { withTmpPath } from '../withTmpPath';
import { getWidgets } from './getSettingWidget';
import { readFileSync } from 'fs';
import { basename, dirname, extname, join, relative } from 'path';

export default (api: IApi) => {

  function getSrcModelsPath() {
    return join(api.paths.absSrcPath!, '_settingWidgets');
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
        pattern: `**/${"_settingWidget"}/*.{ts,tsx,js,jsx}`,
        ...baseOpts,
      }),
      ...getWidgets({
        base: api.paths.absPagesPath!,
        cwd: api.cwd,
        pattern: `**/settingWidget.{ts,tsx,js,jsx}`,
        ...baseOpts,
      }),
    ]);
  }

  api.describe({
    key: "abp-setting",
    config: {
      schema(joi) {
        return joi.object();
      },
    },
    enableBy: api.EnableBy.register,
  });

  let hasModels = false;

  api.onStart(() => {
    hasModels = getAllInitStates().length > 0;
  });

  api.onGenerateFiles(async () => {
    const models = getAllInitStates();
    hasModels = models.length > 0;

    // if (!hasModels) return;

    const dvaTpl = readFileSync(join(__dirname, 'settingWeight.tpl'), 'utf-8');


    api.writeTmpFile({
      path: `settingWidget.ts`,
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

    // runtime.tsx
    api.writeTmpFile({
      path: 'runtime.tsx',
      content: `
import React from 'react';
import settingFactory from '@/setting';
import { useModel } from '@@/plugin-model';
import { SettingContext } from './context';
function Provider(props) {
  const { initialState } = useModel('@@initialState');
  const setting = React.useMemo(() => settingFactory(initialState), [initialState]);
  return (
    <SettingContext.Provider value={setting}>
      { props.children }
    </SettingContext.Provider>
  );
}
export function innerProvider(container) {
  return <Provider>{ container }</Provider>;
}
      `,
    });

    // index.ts
    api.writeTmpFile({
      path: 'index.ts',
      content: `
import React from 'react';
import { SettingContext } from './context';
import { WidgetComponents as SettingWidgetComponents } from './settingWidget';
export const useSetting = () => {
  return React.useContext(SettingContext);
};
export { SettingWidgetComponents };
      `,
    });

    // context.ts
    api.writeTmpFile({
      path: 'context.ts',
      content: `
import React from 'react';
export const SettingContext = React.createContext<any>(null);
      `,
    });
  });

  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.tsx' })];
  });

  api.addTmpGenerateWatcherPaths(() => [
    join(api.paths.absSrcPath, 'setting.ts'),
    join(api.paths.absSrcPath, 'setting.js'),
  ]);
};