// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/wms/label-type/get-label-print */
export async function LabelTypeGetLabelPrintAsync(body: API.BurnAbpWMS_biaoqianguanliLabelTemplateInputDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_biaoqianguanliLabelTemplatePrintResultDto>('/api/wms/label-type/get-label-print', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
