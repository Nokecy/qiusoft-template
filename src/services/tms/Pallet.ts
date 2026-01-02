// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建周转箱信息 POST /api/tms/Pallet/create */
export async function PalletCreateAsync(
  body: API.BurnAbpTMS_zhouzhuanxiangxinxiDtoPalletDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_zhouzhuanxiangxinxiDtoPalletDto>('/api/tms/Pallet/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除周转箱信息 POST /api/tms/Pallet/delete/${param0} */
export async function PalletDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PalletDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/Pallet/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出周转箱信息 GET /api/tms/Pallet/export */
export async function PalletExportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PalletExportAsyncParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/tms/Pallet/export', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据主键ID获取周转箱信息 GET /api/tms/Pallet/id */
export async function PalletGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PalletGetAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_zhouzhuanxiangxinxiDtoPalletDto>('/api/tms/Pallet/id', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导入周转箱信息 POST /api/tms/Pallet/import */
export async function PalletImportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PalletImportAsyncParams,
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

  return request<any>('/api/tms/Pallet/import', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 下载周转箱信息模板 GET /api/tms/Pallet/import-template */
export async function PalletGetImportTemplateAsync(options?: { [key: string]: any }) {
  return request<string>('/api/tms/Pallet/import-template', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据条件获取周转箱信息列表 GET /api/tms/Pallet/list */
export async function PalletGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PalletGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_zhouzhuanxiangxinxiDtoPalletDto>(
    '/api/tms/Pallet/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改周转箱信息 POST /api/tms/Pallet/update/${param0} */
export async function PalletUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PalletUpdateAsyncParams,
  body: API.BurnAbpTMS_zhouzhuanxiangxinxiDtoPalletDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_zhouzhuanxiangxinxiDtoPalletDto>(
    `/api/tms/Pallet/update/${param0}`,
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
