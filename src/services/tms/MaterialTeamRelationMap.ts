// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据Id获取物料与发运班组映射关系 GET /api/tms/material-team-relation/${param0} */
export async function MaterialTeamRelationMapGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialTeamRelationMapGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_wuliaobanzuyingsheMaterialTeamRelationMapDto>(
    `/api/tms/material-team-relation/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 创建物料与发运班组映射关系 POST /api/tms/material-team-relation/create */
export async function MaterialTeamRelationMapCreateAsync(
  body: API.BurnAbpTMS_wuliaobanzuyingsheMaterialTeamRelationMapDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_wuliaobanzuyingsheMaterialTeamRelationMapDto>(
    '/api/tms/material-team-relation/create',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 删除物料与发运班组映射关系 POST /api/tms/material-team-relation/delete/${param0} */
export async function MaterialTeamRelationMapDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialTeamRelationMapDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/material-team-relation/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/tms/material-team-relation/import */
export async function MaterialTeamRelationMapImportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialTeamRelationMapImportAsyncParams,
  body: {},
  File?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (File) {
    formData.append('File', File);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<any>('/api/tms/material-team-relation/import', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 导入模板下载 GET /api/tms/material-team-relation/import-template */
export async function MaterialTeamRelationMapGetImportTemplateAsync(options?: {
  [key: string]: any;
}) {
  return request<string>('/api/tms/material-team-relation/import-template', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据指定条码获取物料与发运班组映射列表 GET /api/tms/material-team-relation/list */
export async function MaterialTeamRelationMapGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialTeamRelationMapGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_wuliaobanzuyingsheMaterialTeamRelationMapDto>(
    '/api/tms/material-team-relation/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 更新物料与发运班组映射关系 POST /api/tms/material-team-relation/update/${param0} */
export async function MaterialTeamRelationMapUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialTeamRelationMapUpdateAsyncParams,
  body: API.BurnAbpTMS_wuliaobanzuyingsheMaterialTeamRelationMapDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_wuliaobanzuyingsheMaterialTeamRelationMapDto>(
    `/api/tms/material-team-relation/update/${param0}`,
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
