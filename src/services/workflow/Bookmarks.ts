// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /elsa/api/bookmarks/resume */
export async function GetElsaWorkflowsApiEndpointsBookmarksResumeResume(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.GetElsaWorkflowsApiEndpointsBookmarksResumeResumeParams,
	options?: { [key: string]: any }
) {
	return request<any>('/elsa/api/bookmarks/resume', {
		method: 'GET',
		params: {
			...params,
			input: undefined,
			...params['input'],
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/bookmarks/resume */
export async function PostElsaWorkflowsApiEndpointsBookmarksResumeResume(options?: { [key: string]: any }) {
	return request<any>('/elsa/api/bookmarks/resume', {
		method: 'POST',
		...(options || {}),
	});
}
