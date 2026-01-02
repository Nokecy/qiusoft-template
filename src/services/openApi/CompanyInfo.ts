// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/factory-management/companyinfo/${param0} */
export async function CompanyInfoGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CompanyInfoGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpFactoryManagementCompanysCompanyInfoDto>(`/api/factory-management/companyinfo/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/factory-management/companyinfo/create */
export async function CompanyInfoCreateAsync(body: API.BurnAbpFactoryManagementCompanysCompanyInfoDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpFactoryManagementCompanysCompanyInfoDto>('/api/factory-management/companyinfo/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/factory-management/companyinfo/delete/${param0} */
export async function CompanyInfoDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CompanyInfoDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/factory-management/companyinfo/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/factory-management/companyinfo/list */
export async function CompanyInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CompanyInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpFactoryManagementCompanysCompanyInfoDto>('/api/factory-management/companyinfo/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/factory-management/companyinfo/update/${param0} */
export async function CompanyInfoUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CompanyInfoUpdateAsyncParams,
	body: API.BurnAbpFactoryManagementCompanysCompanyInfoDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpFactoryManagementCompanysCompanyInfoDto>(`/api/factory-management/companyinfo/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
