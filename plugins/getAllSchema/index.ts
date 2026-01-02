import { IApi } from '@umijs/max';
import { join } from 'path';
import { Mustache, lodash, winPath } from '@umijs/utils';
import { getSchemas } from './getSchema';
const fs = require('fs');
const path = require('path');

// 可传入目标文件夹名称进行单个更新
// npm run dlrouter appSmartPark

export default (api: IApi) => {
	let hasModels = false;

	function getSrcSchemasPath() {
		return join(api.paths.absSrcPath!, '_schemas');
	}

	function getAllSchemas() {
		const srcModelsPath = getSrcSchemasPath();
		const baseOpts = {
			skipModelValidate: api.config.dva?.skipModelValidate,
			extraModels: api.config.dva?.extraModels,
		};
		return lodash.uniq([
			...getSchemas({
				base: srcModelsPath,
				cwd: api.cwd,
				...baseOpts,
			}),
			...getSchemas({
				base: api.paths.absPagesPath!,
				cwd: api.cwd,
				pattern: `**/${'_schemas'}/*.{ts,tsx,js,jsx}`,
				...baseOpts,
			}),
			...getSchemas({
				base: api.paths.absPagesPath!,
				cwd: api.cwd,
				pattern: `**/schema.{ts,tsx,js,jsx}`,
				...baseOpts,
			}),
		]);
	}

	api.onStart(() => {
		hasModels = getAllSchemas().length > 0;
	});

	// 插件注册
	api.describe({
		key: 'getAllSchema',
		config: {
			schema(joi) {
				return joi.object();
			},
		},
		enableBy: api.EnableBy.register,
	});

	api.onGenerateFiles(() => {
		const dvaTpl = fs.readFileSync(path.join(__dirname, 'widget.tpl'), 'utf-8');

		// 获取所有 schema 文件
		const schemaFiles = getAllSchemas();

		let schemaFileArr = schemaFiles.map((item, index) => {
			return {
				formItemCopy: item.replace('.', '').split('/').slice(1),
				formPath: (item).replace(/\\/g, '/'),
			};
		});

		api.writeTmpFile({
			path: 'index.ts',
			content: Mustache.render(dvaTpl, {
				FormSchemaModelImports: schemaFileArr
					.map((item, index) => {
						return `import { formId as ${item.formItemCopy.join('')}formId , formSchema as ${item.formItemCopy.join('')}formSchema } from '${item.formPath}';`;
					})
					.join('\r\n'),
				Datas: schemaFileArr
					.map((item, index) => {
						// prettier-ignore
						return `"${item.formItemCopy.join('')}":${item.formItemCopy.join('')}formSchema ,`.trim();
					})
					.join('\r\n'),
				formIds: schemaFileArr
					.map((item, index) => {
						// prettier-ignore
						return `"${item.formItemCopy.join('')}":${item.formItemCopy.join('')}formId ,`.trim();
					})
					.join('\r\n'),
			}),
		});
	});

	// 插件注册
	api.registerCommand({
		name: 'getAllSchema',
		fn: async () => {},
	});
};
