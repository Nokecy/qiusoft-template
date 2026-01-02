// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/bnr-management/bnr-generator */
export async function BNRGeneratorGeneratorAsync(body: API.BurnAbpBNRManagementApplicationContractsGeneratorSequenceDto, options?: { [key: string]: any }) {
	return request<string>('/api/bnr-management/bnr-generator', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/bnr-management/bnr-generator/generator-list */
export async function BNRGeneratorGeneratorListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BNRGeneratorGeneratorListAsyncParams,
	body: API.BurnAbpBNRManagementApplicationContractsGeneratorSequenceDto,
	options?: { [key: string]: any }
) {
	return request<string[]>('/api/bnr-management/bnr-generator/generator-list', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}
