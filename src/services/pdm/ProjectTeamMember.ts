// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/project-team-member */
export async function ProjectTeamMemberGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTeamMemberGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTeamMembersProjectTeamMemberDto>('/api/pdm/project-team-member', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建项目团队成员 POST /api/pdm/project-team-member */
export async function ProjectTeamMemberCreateAsync(body: API.BurnAbpPdmProjectManagementProjectTeamMembersCreateProjectTeamMemberDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectTeamMembersProjectTeamMemberDto>('/api/pdm/project-team-member', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-team-member/${param0} */
export async function ProjectTeamMemberGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTeamMemberGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectTeamMembersProjectTeamMemberDto>(`/api/pdm/project-team-member/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-team-member/${param0}/delete */
export async function ProjectTeamMemberDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTeamMemberDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-team-member/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新项目团队成员 POST /api/pdm/project-team-member/${param0}/update */
export async function ProjectTeamMemberUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTeamMemberUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectTeamMembersUpdateProjectTeamMemberDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectTeamMembersProjectTeamMemberDto>(`/api/pdm/project-team-member/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据项目编码获取团队成员列表 GET /api/pdm/project-team-member/by-project-code */
export async function ProjectTeamMemberGetListByProjectCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTeamMemberGetListByProjectCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTeamMembersProjectTeamMemberDto>('/api/pdm/project-team-member/by-project-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据项目角色编码获取成员列表 GET /api/pdm/project-team-member/by-project-role-code */
export async function ProjectTeamMemberGetListByProjectRoleCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTeamMemberGetListByProjectRoleCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTeamMembersProjectTeamMemberDto>('/api/pdm/project-team-member/by-project-role-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据用户 ID 获取其参与的项目团队列表 GET /api/pdm/project-team-member/by-user-id/${param0} */
export async function ProjectTeamMemberGetListByUserIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTeamMemberGetListByUserIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { userId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTeamMembersProjectTeamMemberDto>(`/api/pdm/project-team-member/by-user-id/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}
