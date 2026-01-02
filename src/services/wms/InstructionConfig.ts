// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 新建指令 POST /api/wms/instruction-config/create */
export async function InstructionConfigCreateAsync(body: API.BurnAbpWMS_jichuxinxi_churukuzhilingpeizhiInstructionConfigDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_churukuzhilingpeizhiInstructionConfigDto>('/api/wms/instruction-config/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 删除指令 POST /api/wms/instruction-config/delete/${param0} */
export async function InstructionConfigDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InstructionConfigDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/instruction-config/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 查询指定指令 GET /api/wms/instruction-config/get/${param0} */
export async function InstructionConfigGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InstructionConfigGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_churukuzhilingpeizhiInstructionConfigDto>(`/api/wms/instruction-config/get/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 查询指令列表 GET /api/wms/instruction-config/list */
export async function InstructionConfigGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InstructionConfigGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_churukuzhilingpeizhiInstructionConfigDto>('/api/wms/instruction-config/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 更新指令 POST /api/wms/instruction-config/update/${param0} */
export async function InstructionConfigUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InstructionConfigUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_churukuzhilingpeizhiInstructionConfigDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_churukuzhilingpeizhiInstructionConfigDto>(`/api/wms/instruction-config/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
