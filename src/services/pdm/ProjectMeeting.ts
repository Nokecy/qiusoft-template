// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/project-meeting */
export async function ProjectMeetingGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMeetingGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectMeetingsProjectMeetingDto>('/api/pdm/project-meeting', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建项目会议 POST /api/pdm/project-meeting */
export async function ProjectMeetingCreateAsync(body: API.BurnAbpPdmProjectManagementProjectMeetingsCreateProjectMeetingDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectMeetingsProjectMeetingDto>('/api/pdm/project-meeting', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-meeting/${param0} */
export async function ProjectMeetingGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMeetingGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectMeetingsProjectMeetingDto>(`/api/pdm/project-meeting/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除项目会议 POST /api/pdm/project-meeting/${param0}/delete */
export async function ProjectMeetingDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMeetingDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-meeting/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 提交会议 POST /api/pdm/project-meeting/${param0}/submit */
export async function ProjectMeetingSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMeetingSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectMeetingsProjectMeetingDto>(`/api/pdm/project-meeting/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新项目会议 POST /api/pdm/project-meeting/${param0}/update */
export async function ProjectMeetingUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMeetingUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectMeetingsUpdateProjectMeetingDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectMeetingsProjectMeetingDto>(`/api/pdm/project-meeting/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 退回会议 (已提交 → 草稿) POST /api/pdm/project-meeting/${param0}/withdraw */
export async function ProjectMeetingWithdrawAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMeetingWithdrawAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectMeetingsProjectMeetingDto>(`/api/pdm/project-meeting/${param0}/withdraw`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}
