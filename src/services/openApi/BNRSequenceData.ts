// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/bnr-management/sequence-data/list */
export async function BNRSequenceDataGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BNRSequenceDataGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementSequenceDatasBNRSequenceDataDto>('/api/bnr-management/sequence-data/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
