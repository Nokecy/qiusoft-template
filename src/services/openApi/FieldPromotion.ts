// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/dynamic-schema/field-promotion/demote */
export async function FieldPromotionDemoteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FieldPromotionDemoteAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaFieldPromotionPromoteFieldResult>('/api/dynamic-schema/field-promotion/demote', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/field-promotion/pre-check */
export async function FieldPromotionPreCheckAsync(body: API.BurnAbpDynamicSchemaFieldPromotionPromoteFieldPreCheckInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpDynamicSchemaFieldPromotionPromoteFieldPreCheckResult>('/api/dynamic-schema/field-promotion/pre-check', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/field-promotion/promote */
export async function FieldPromotionPromoteAsync(body: API.BurnAbpDynamicSchemaFieldPromotionPromoteFieldInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpDynamicSchemaFieldPromotionPromoteFieldResult>('/api/dynamic-schema/field-promotion/promote', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
