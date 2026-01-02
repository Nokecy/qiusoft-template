// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 分页查询审计日志列表 GET /api/audit-logging */
export async function AuditLoggingGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AuditLoggingGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpSystemSharedHostAuditLoggingsDtosAuditLogDto>('/api/audit-logging', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取单个审计日志的详细信息 GET /api/audit-logging/${param0} */
export async function AuditLoggingGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AuditLoggingGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSystemSharedHostAuditLoggingsDtosAuditLogDetailDto>(`/api/audit-logging/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 分页查询实体变更历史 GET /api/audit-logging/entity-changes */
export async function AuditLoggingGetEntityChangesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AuditLoggingGetEntityChangesAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpSystemSharedHostAuditLoggingsDtosEntityChangeDto>('/api/audit-logging/entity-changes', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取单个实体变更的详细信息 GET /api/audit-logging/entity-changes/${param0} */
export async function AuditLoggingGetEntityChangeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AuditLoggingGetEntityChangeAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSystemSharedHostAuditLoggingsDtosEntityChangeDto>(`/api/audit-logging/entity-changes/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
