import { IApi } from 'umi';
import { Mustache, lodash, winPath } from '@umijs/utils';
import { basename, dirname, extname, join, relative } from 'path';
import { getInitStates } from './getInitState';
import { readFileSync } from 'fs';

export default function (api: IApi) {

    function getSrcModelsPath() {
        return join(api.paths.absSrcPath!, 'initStates');
    }

    function getAllInitStates() {
        const srcModelsPath = getSrcModelsPath();
        const baseOpts = {
            skipModelValidate: api.config.dva?.skipModelValidate,
            extraModels: api.config.dva?.extraModels,
        };
        return getInitStates({
            base: srcModelsPath,
            cwd: api.cwd,
            ...baseOpts,
        })
    }


    api.describe({
        key: "abpinitstateprovider",
        enableBy: api.EnableBy.register,
    })

    let hasModels = false;

    api.onStart(() => {
        hasModels = getAllInitStates().length > 0;
    });

    api.onGenerateFiles(() => {

        const models = getAllInitStates();
        hasModels = models.length > 0;

        if (!hasModels) return;

        const dvaTpl = readFileSync(join(__dirname, 'initState.tpl'), 'utf-8');
        api.writeTmpFile({
            path: `index.ts`,
            content: Mustache.render(dvaTpl, {
                RegisterModelImports: models
                    .map((path, index) => {
                        const modelName = `Model${lodash.upperFirst(
                            lodash.camelCase(basename(path, extname(path))),
                        )}${index}`;
                        return `import ${modelName} from '${path}';`;
                    })
                    .join('\r\n'),
                RegisterModels: models
                    .map((path, index) => {
                        // prettier-ignore
                        const modelName = `Model${lodash.upperFirst(
                            lodash.camelCase(basename(path, extname(path))),
                        )}${index}`;
                        return `const ${modelName}Data = await ${modelName}()`.trim();
                    })
                    .join('\r\n'),
                Datas: models
                    .map((path, index) => {
                        // prettier-ignore
                        const modelName = `Model${lodash.upperFirst(
                            lodash.camelCase(basename(path, extname(path))),
                        )}${index}`;
                        return `...${modelName}Data , `.trim();
                    })
                    .join('\r\n'),
            })
        });
    });
}