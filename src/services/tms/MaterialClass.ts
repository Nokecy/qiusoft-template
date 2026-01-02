// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 新增物料分类信息 POST /api/tms/material-class/create */
export async function MaterialClassCreateAsync(
  body: API.BurnAbpTMS_wuliaofenleiMaterialClassDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_wuliaofenleiMaterialClassDto>('/api/tms/material-class/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除物料分类 POST /api/tms/material-class/delete/${param0} */
export async function MaterialClassDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialClassDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/material-class/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取物料分类信息 GET /api/tms/material-class/get/${param0} */
export async function MaterialClassGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialClassGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_wuliaofenleiMaterialClassDto>(
    `/api/tms/material-class/get/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 根据指定条件获取物料分类列表信息 GET /api/tms/material-class/list */
export async function MaterialClassGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialClassGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_wuliaofenleiMaterialClassDto>(
    '/api/tms/material-class/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 更新物料分类信息 POST /api/tms/material-class/update/${param0} */
export async function MaterialClassUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialClassUpdateAsyncParams,
  body: API.BurnAbpTMS_wuliaofenleiMaterialClassDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_wuliaofenleiMaterialClassDto>(
    `/api/tms/material-class/update/${param0}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  );
}
