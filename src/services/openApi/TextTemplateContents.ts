// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/text-template-management/template-contents */
export async function TextTemplateContentsGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TextTemplateContentsGetAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpTextTemplateManagementTextTemplatesTextTemplateContentDto>('/api/text-template-management/template-contents', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/text-template-management/template-contents/restore-to-default */
export async function TextTemplateContentsRestoreToDefaultAsync(body: API.BurnAbpTextTemplateManagementTextTemplatesRestoreTemplateContentInput, options?: { [key: string]: any }) {
	return request<any>('/api/text-template-management/template-contents/restore-to-default', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/text-template-management/template-contents/update */
export async function TextTemplateContentsUpdateAsync(body: API.BurnAbpTextTemplateManagementTextTemplatesUpdateTemplateContentInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpTextTemplateManagementTextTemplatesTextTemplateContentDto>('/api/text-template-management/template-contents/update', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
