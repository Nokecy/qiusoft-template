// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/out-instruction-pend-record-info/list */
export async function InstructionPendRecordInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InstructionPendRecordInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_zhilinglaiyuanInstructionPendRecordInfoDto>('/api/wms/out-instruction-pend-record-info/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/out-instruction-pend-record-info/retry/${param0} */
export async function InstructionPendRecordInfoReTryDataRecordAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InstructionPendRecordInfoReTryDataRecordAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-instruction-pend-record-info/retry/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}
