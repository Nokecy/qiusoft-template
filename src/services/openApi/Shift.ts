// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/calendar-management/shift */
export async function ShiftGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ShiftGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpCalendarManagementShiftsShiftDto>('/api/calendar-management/shift', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/shift */
export async function ShiftCreateAsync(body: API.BurnAbpCalendarManagementShiftsCreateUpdateShiftInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpCalendarManagementShiftsShiftDto>('/api/calendar-management/shift', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/calendar-management/shift/${param0} */
export async function ShiftGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ShiftGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpCalendarManagementShiftsShiftDto>(`/api/calendar-management/shift/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/shift/${param0}/delete */
export async function ShiftDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ShiftDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/calendar-management/shift/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/shift/${param0}/set-default */
export async function ShiftSetDefaultAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ShiftSetDefaultAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/calendar-management/shift/${param0}/set-default`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/shift/${param0}/update */
export async function ShiftUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ShiftUpdateAsyncParams,
	body: API.BurnAbpCalendarManagementShiftsCreateUpdateShiftInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpCalendarManagementShiftsShiftDto>(`/api/calendar-management/shift/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
