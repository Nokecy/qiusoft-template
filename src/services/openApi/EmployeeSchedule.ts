// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/calendar-management/employee-schedule */
export async function EmployeeScheduleGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EmployeeScheduleGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpCalendarManagementEmployeeSchedulesEmployeeScheduleDto>('/api/calendar-management/employee-schedule', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/calendar-management/employee-schedule/${param0} */
export async function EmployeeScheduleGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EmployeeScheduleGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpCalendarManagementEmployeeSchedulesEmployeeScheduleDto>(`/api/calendar-management/employee-schedule/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
