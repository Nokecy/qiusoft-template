// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/calendar-management/holiday-set */
export async function HolidaySetGetListAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpCalendarManagementHolidaySetsHolidaySetDto[]>('/api/calendar-management/holiday-set', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/holiday-set */
export async function HolidaySetCreateAsync(body: API.BurnAbpCalendarManagementHolidaySetsCreateHolidaySetDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpCalendarManagementHolidaySetsHolidaySetDto>('/api/calendar-management/holiday-set', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/calendar-management/holiday-set/${param0} */
export async function HolidaySetGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HolidaySetGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpCalendarManagementHolidaySetsHolidaySetDto>(`/api/calendar-management/holiday-set/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/holiday-set/${param0}/delete */
export async function HolidaySetDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HolidaySetDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/calendar-management/holiday-set/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/holiday-set/${param0}/update */
export async function HolidaySetUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HolidaySetUpdateAsyncParams,
	body: API.BurnAbpCalendarManagementHolidaySetsUpdateHolidaySetDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpCalendarManagementHolidaySetsHolidaySetDto>(`/api/calendar-management/holiday-set/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
