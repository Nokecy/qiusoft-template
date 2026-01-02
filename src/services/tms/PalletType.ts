// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 新增周转箱类型 POST /api/tms/pallet-type/create */
export async function PalletTypeCreateAsync(
  body: API.BurnAbpTMS_zhouzhuanxiangleixingDtoPalletTypeDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_zhouzhuanxiangleixingDtoPalletTypeDto>(
    '/api/tms/pallet-type/create',
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

/** 删除周转箱类型 POST /api/tms/pallet-type/delete/${param0} */
export async function PalletTypeDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PalletTypeDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/pallet-type/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取周转箱类型信息 GET /api/tms/pallet-type/get/${param0} */
export async function PalletTypeGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PalletTypeGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_zhouzhuanxiangleixingDtoPalletTypeDto>(
    `/api/tms/pallet-type/get/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 根据指定条件获取周转箱列表信息 GET /api/tms/pallet-type/list */
export async function PalletTypeGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PalletTypeGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_zhouzhuanxiangleixingDtoPalletTypeDto>(
    '/api/tms/pallet-type/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 更新周转箱类型信息 POST /api/tms/pallet-type/update/${param0} */
export async function PalletTypeUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PalletTypeUpdateAsyncParams,
  body: API.BurnAbpTMS_zhouzhuanxiangleixingDtoPalletTypeDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_zhouzhuanxiangleixingDtoPalletTypeDto>(
    `/api/tms/pallet-type/update/${param0}`,
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
