// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建库房 POST /api/tms/ware-house/create */
export async function WareHouseCreateAsync(
  body: API.BurnAbpTMS_kufangxinxiWareHouseDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_kufangxinxiWareHouseDto>('/api/tms/ware-house/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除库房 POST /api/tms/ware-house/delete/${param0} */
export async function WareHouseDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WareHouseDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/ware-house/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出库房信息 GET /api/tms/ware-house/export */
export async function WareHouseExportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WareHouseExportAsyncParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/tms/ware-house/export', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 下载导入模板 GET /api/tms/ware-house/get-template */
export async function WareHouseGetImportTemplateAsync(options?: { [key: string]: any }) {
  return request<string>('/api/tms/ware-house/get-template', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询指定库房信息 GET /api/tms/ware-house/get/${param0} */
export async function WareHouseGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WareHouseGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_kufangxinxiWareHouseDto>(`/api/tms/ware-house/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导入库房信息 POST /api/tms/ware-house/import */
export async function WareHouseImportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WareHouseImportAsyncParams,
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

  return request<any>('/api/tms/ware-house/import', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 获取库房列表 GET /api/tms/ware-house/list */
export async function WareHouseGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WareHouseGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_kufangxinxiWareHouseDto>(
    '/api/tms/ware-house/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改库房信息 POST /api/tms/ware-house/update/${param0} */
export async function WareHouseUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.WareHouseUpdateAsyncParams,
  body: API.BurnAbpTMS_kufangxinxiWareHouseDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_kufangxinxiWareHouseDto>(`/api/tms/ware-house/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
