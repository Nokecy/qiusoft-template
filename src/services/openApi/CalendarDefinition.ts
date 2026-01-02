// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/calendar-management/calendar-definition */
export async function CalendarDefinitionGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CalendarDefinitionGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpCalendarManagementCalendarDefinitionsCalendarDefinitionDto>('/api/calendar-management/calendar-definition', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/calendar-definition */
export async function CalendarDefinitionCreateAsync(body: API.BurnAbpCalendarManagementCalendarDefinitionsCreateCalendarDefinitionDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpCalendarManagementCalendarDefinitionsCalendarDefinitionDto>('/api/calendar-management/calendar-definition', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/calendar-management/calendar-definition/${param0} */
export async function CalendarDefinitionGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CalendarDefinitionGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpCalendarManagementCalendarDefinitionsCalendarDefinitionDto>(`/api/calendar-management/calendar-definition/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/calendar-management/calendar-definition/${param0}/dates */
export async function CalendarDefinitionGetDatesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CalendarDefinitionGetDatesAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpCalendarManagementCalendarDefinitionsCalendarDateDefinitionDto[]>(`/api/calendar-management/calendar-definition/${param0}/dates`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/calendar-definition/${param0}/delete */
export async function CalendarDefinitionDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CalendarDefinitionDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/calendar-management/calendar-definition/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/calendar-definition/${param0}/set-as-default */
export async function CalendarDefinitionSetAsDefaultAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CalendarDefinitionSetAsDefaultAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/calendar-management/calendar-definition/${param0}/set-as-default`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/calendar-definition/${param0}/set-holiday-set/${param1} */
export async function CalendarDefinitionSetHolidaySetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CalendarDefinitionSetHolidaySetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, holidaySetId: param1, ...queryParams } = params;
	return request<any>(`/api/calendar-management/calendar-definition/${param0}/set-holiday-set/${param1}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/calendar-definition/${param0}/set-workday-configure */
export async function CalendarDefinitionSetWorkdayConfigureAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CalendarDefinitionSetWorkdayConfigureAsyncParams,
	body: API.BurnAbpCalendarManagementCalendarDefinitionsSetWorkdayConfigureInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/calendar-management/calendar-definition/${param0}/set-workday-configure`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/calendar-definition/${param0}/update */
export async function CalendarDefinitionUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CalendarDefinitionUpdateAsyncParams,
	body: API.BurnAbpCalendarManagementCalendarDefinitionsUpdateCalendarDefinitionDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpCalendarManagementCalendarDefinitionsCalendarDefinitionDto>(`/api/calendar-management/calendar-definition/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
