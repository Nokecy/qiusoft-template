import { Mustache } from '@umijs/utils';
import { IApi } from 'umi';

export default (api: IApi) => {
    api.describe({
        key: "appConfig",
        config: {
            schema(joi) {
                return joi.object();
            },
        },
        enableBy: api.EnableBy.register,
    });

    api.onGenerateFiles(async () => {
        // index.tsx
        api.writeTmpFile({
            path: 'index.tsx',
            content: Mustache.render(`
            export const serverUrl = () => window.serverUrl.apiServerUrl;
                    `, {
                appConfig: JSON.stringify(api.config.appConfig),
            }),
        });
    });
};