// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 处理Webhook回调 POST /api/pdm/document-conversions/handle-webhook-callback/${param0} */
export async function DocumentConversionWebhookHandleWebhookCallback(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentConversionWebhookHandleWebhookCallbackParams,
	options?: { [key: string]: any }
) {
	const { engineType: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementConversionsWebhookCallbackResultDto>(`/api/pdm/document-conversions/handle-webhook-callback/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}
