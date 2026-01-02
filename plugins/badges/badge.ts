import { IApi } from 'umi';
import { basename, dirname, extname, join, relative } from 'path';
import { withTmpPath } from '../withTmpPath';
import { getBadges } from './getBadges';
import { readFileSync } from 'fs';
import { Mustache, lodash, winPath } from '@umijs/utils';

export default (api: IApi) => {

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
      ...getBadges({
        base: srcModelsPath,
        cwd: api.cwd,
        ...baseOpts,
      }),
      ...getBadges({
        base: api.paths.absPagesPath!,
        cwd: api.cwd,
        pattern: `**/${"_badges"}/*.{ts,tsx,js,jsx}`,
        ...baseOpts,
      })
    ]);
  }

  api.describe({
    key: "badge",
    config: {
      schema(joi) {
        return joi.object();
      },
    },
    enableBy: api.EnableBy.register,
  });

  api.onStart(() => {

  });

  api.onGenerateFiles(async () => {
    // runtime.tsx
    api.writeTmpFile({
      path: 'runtime.tsx',
      content: `
      import React from 'react';
      import {BadgeFunctions} from './index';
      import {useInterval} from 'ahooks';
      import { useModel } from '@@/plugin-model';

function Provider(props) {
  const { initialState , setInitialState } = useModel('@@initialState');

  useInterval(()=>{
    BadgeFunctions.forEach(async (func)=> {
      func().then((badge)=>{
        if (badge){
          const badges = initialState?.badges;
          const findBadge = initialState?.badges?.find(a => a.name == badge.name);
          if(findBadge){
           findBadge.count = badge.count
          }else{
           badges?.push(badge);
          }
          setInitialState({...initialState,badges:badges})
         }
      })
    })
  },1000*8)

  return (
    <>
      { props.children }
    </>
  );
}
export function innerProvider(container) {
  return <Provider>{ container }</Provider>;
}
      `,
    });
    

    const models = getAllInitStates();
    
    const dvaTpl = readFileSync(join(__dirname, 'badge.tpl'), 'utf-8');
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
            return `${modelName} ,`.trim();
          })
          .join('\r\n'),
      })
    });
  });

  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: 'runtime.tsx' })];
  });
};