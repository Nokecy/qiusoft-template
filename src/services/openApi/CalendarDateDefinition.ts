// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/calendar-management/calendar-date-definition/${param0}/reset-to-auto-calculation */
export async function CalendarDateDefinitionResetToAutoCalculationAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CalendarDateDefinitionResetToAutoCalculationAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/calendar-management/calendar-date-definition/${param0}/reset-to-auto-calculation`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/calendar-date-definition/${param0}/set-manual-workday */
export async function CalendarDateDefinitionSetManualWorkdayAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CalendarDateDefinitionSetManualWorkdayAsyncParams,
	body: API.BurnAbpCalendarManagementCalendarDefinitionsSetManualWorkdayInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/calendar-management/calendar-date-definition/${param0}/set-manual-workday`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/calendar-management/calendar-date-definition/batch-reset-to-auto-calculation */
export async function CalendarDateDefinitionBatchResetToAutoCalculationAsync(body: string[], options?: { [key: string]: any }) {
	return request<any>('/api/calendar-management/calendar-date-definition/batch-reset-to-auto-calculation', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/calendar-management/calendar-date-definition/manual-adjustment-history/${param0} */
export async function CalendarDateDefinitionGetManualAdjustmentHistoryAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CalendarDateDefinitionGetManualAdjustmentHistoryAsyncParams,
	options?: { [key: string]: any }
) {
	const { calendarDefinitionId: param0, ...queryParams } = params;
	return request<API.BurnAbpCalendarManagementCalendarDefinitionsManualAdjustmentHistoryDto[]>(
		`/api/calendar-management/calendar-date-definition/manual-adjustment-history/${param0}`,
		{
			method: 'GET',
			params: {
				...queryParams,
			},
			...(options || {}),
		}
	);
}
