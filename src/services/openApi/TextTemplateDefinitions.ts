// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/text-template-management/template-definitions/list */
export async function TextTemplateDefinitionsGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TextTemplateDefinitionsGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTextTemplateManagementTextTemplatesTemplateDefinitionDto>(
		'/api/text-template-management/template-definitions/list',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 GET /api/text-template-management/template-definitions/name */
export async function TextTemplateDefinitionsGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TextTemplateDefinitionsGetAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpTextTemplateManagementTextTemplatesTemplateDefinitionDto>('/api/text-template-management/template-definitions/name', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
