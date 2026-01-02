// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/calendar-management/workday-configure */
export async function WorkdayConfigureGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkdayConfigureGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpCalendarManagementWorkdayConfiguresDtosWorkdayConfigureDto>('/api/calendar-management/workday-configure', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/workday-configure */
export async function WorkdayConfigureCreateAsync(body: API.BurnAbpCalendarManagementWorkdayConfiguresDtosCreateWorkdayConfigureDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpCalendarManagementWorkdayConfiguresDtosWorkdayConfigureDto>('/api/calendar-management/workday-configure', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/calendar-management/workday-configure/${param0} */
export async function WorkdayConfigureGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkdayConfigureGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpCalendarManagementWorkdayConfiguresDtosWorkdayConfigureDto>(`/api/calendar-management/workday-configure/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/workday-configure/${param0}/delete */
export async function WorkdayConfigureDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkdayConfigureDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/calendar-management/workday-configure/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/workday-configure/${param0}/update */
export async function WorkdayConfigureUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkdayConfigureUpdateAsyncParams,
	body: API.BurnAbpCalendarManagementWorkdayConfiguresDtosUpdateWorkdayConfigureDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpCalendarManagementWorkdayConfiguresDtosWorkdayConfigureDto>(`/api/calendar-management/workday-configure/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
