// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取分页列表
包含详细信息的销售订单列表 GET /api/smart-erp/sale-order */
export async function SaleOrderGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderDto>('/api/smart-erp/sale-order', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建销售订单
验证订单号唯一性并创建订单 POST /api/smart-erp/sale-order */
export async function SaleOrderCreateAsync(body: API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiCreateSaleOrderDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderDto>('/api/smart-erp/sale-order', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/smart-erp/sale-order/${param0} */
export async function SaleOrderGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderDto>(`/api/smart-erp/sale-order/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 审核销售订单
将订单状态变更为已审核，锁定订单数据 POST /api/smart-erp/sale-order/${param0}/approve */
export async function SaleOrderApproveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderApproveAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderDto>(`/api/smart-erp/sale-order/${param0}/approve`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 复制销售订单
使用领域服务复制订单，生成新的订单号 POST /api/smart-erp/sale-order/${param0}/copy */
export async function SaleOrderCopyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderCopyAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderDto>(`/api/smart-erp/sale-order/${param0}/copy`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除销售订单
使用领域服务删除，确保业务逻辑一致性 POST /api/smart-erp/sale-order/${param0}/delete */
export async function SaleOrderDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/smart-erp/sale-order/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行工作流操作
更新销售订单数据 POST /api/smart-erp/sale-order/${param0}/execute-workflow */
export async function SaleOrderExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderExecuteWorkflowAsyncParams,
	body: API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiCreateSaleOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/smart-erp/sale-order/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 反审核销售订单  
将已审核的订单状态恢复为草稿状态，允许继续编辑 POST /api/smart-erp/sale-order/${param0}/unapprove */
export async function SaleOrderUnapproveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderUnapproveAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderDto>(`/api/smart-erp/sale-order/${param0}/unapprove`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新销售订单
更新订单基本信息并处理 BOM 信息 POST /api/smart-erp/sale-order/${param0}/update */
export async function SaleOrderUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderUpdateAsyncParams,
	body: API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiCreateSaleOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderDto>(`/api/smart-erp/sale-order/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 创建 BOM 项目
根据物料信息创建 BOM 项目，支持自动展开子项 POST /api/smart-erp/sale-order/bom-item */
export async function SaleOrderCreateBomItemAsync(body: API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiCreateBomItemDto, options?: { [key: string]: any }) {
	return request<any>('/api/smart-erp/sale-order/bom-item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取 BOM 项目详情
根据 BOM 项目ID获取详细信息（包含子项） GET /api/smart-erp/sale-order/bom-item/${param0} */
export async function SaleOrderGetBomItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderGetBomItemAsyncParams,
	options?: { [key: string]: any }
) {
	const { bomItemId: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderItemWorkBomItemDto>(`/api/smart-erp/sale-order/bom-item/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/smart-erp/sale-order/export */
export async function SaleOrderExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/smart-erp/sale-order/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 导出合并后的销售 BOM 项目
将相同物料编码的 BOM 项合并后导出 GET /api/smart-erp/sale-order/export-merge-sale-bom-item/${param0} */
export async function SaleOrderExportMergeSaleBomItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderExportMergeSaleBomItemAsyncParams,
	options?: { [key: string]: any }
) {
	const { saleOrderItemId: param0, ...queryParams } = params;
	return request<string>(`/api/smart-erp/sale-order/export-merge-sale-bom-item/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 导出销售 BOM 项目
将指定订单项的 BOM 数据导出为 Excel 文件 GET /api/smart-erp/sale-order/export-sale-bom-item/${param0} */
export async function SaleOrderExportSaleBomItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderExportSaleBomItemAsyncParams,
	options?: { [key: string]: any }
) {
	const { saleOrderItemId: param0, ...queryParams } = params;
	return request<string>(`/api/smart-erp/sale-order/export-sale-bom-item/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 为工作流创建销售订单
自动生成订单号码 POST /api/smart-erp/sale-order/for-workflow */
export async function SaleOrderCreateForWorkflowAsync(body: API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiCreateSaleOrderDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderDto>('/api/smart-erp/sale-order/for-workflow', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/sale-order/import */
export async function SaleOrderImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
	const formData = new FormData();

	if (File) {
		formData.append('File', File);
	}

	Object.keys(body).forEach(ele => {
		const item = (body as any)[ele];

		if (item !== undefined && item !== null) {
			if (typeof item === 'object' && !(item instanceof File)) {
				if (item instanceof Array) {
					item.forEach(f => formData.append(ele, f || ''));
				} else {
					formData.append(ele, new Blob([JSON.stringify(item)], { type: 'application/json' }));
				}
			} else {
				formData.append(ele, item);
			}
		}
	});

	return request<any>('/api/smart-erp/sale-order/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/smart-erp/sale-order/import-template */
export async function SaleOrderGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/smart-erp/sale-order/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 删除 BOM 项目
递归删除 BOM 项目及其所有子项 POST /api/smart-erp/sale-order/remove-bom-item/${param0} */
export async function SaleOrderRemoveBomItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderRemoveBomItemAsyncParams,
	options?: { [key: string]: any }
) {
	const { bomItemId: param0, ...queryParams } = params;
	return request<any>(`/api/smart-erp/sale-order/remove-bom-item/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取销售 BOM 项目列表
根据订单项ID获取对应的 BOM 项目列表 GET /api/smart-erp/sale-order/sale-bom-item-list/${param0} */
export async function SaleOrderGetSaleBomItemListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleOrderGetSaleBomItemListAsyncParams,
	options?: { [key: string]: any }
) {
	const { saleOrderItemId: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderItemWorkBomItemDto[]>(`/api/smart-erp/sale-order/sale-bom-item-list/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新 BOM 项目
更新 BOM 项目的数量和备注信息，并递归更新所有子项的总用量 POST /api/smart-erp/sale-order/update-bom-item */
export async function SaleOrderUpdateBomItemAsync(body: API.BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiUpdateBomItemDto, options?: { [key: string]: any }) {
	return request<any>('/api/smart-erp/sale-order/update-bom-item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
