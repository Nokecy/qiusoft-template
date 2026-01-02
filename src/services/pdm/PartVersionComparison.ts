// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 对比两个历史版本 POST /api/pdm/part-version-comparison/compare-versions */
export async function PartVersionComparisonCompareVersionsAsync(body: API.BurnAbpPdmPartManagementPartVersionsComparisonCompareVersionsInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmPartManagementPartVersionsComparisonPartVersionComparisonResultDto>('/api/pdm/part-version-comparison/compare-versions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 对比当前草稿与历史版本 POST /api/pdm/part-version-comparison/compare-with-current-draft */
export async function PartVersionComparisonCompareWithCurrentDraftAsync(
	body: API.BurnAbpPdmPartManagementPartVersionsComparisonCompareWithDraftInput,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmPartManagementPartVersionsComparisonPartVersionComparisonResultDto>('/api/pdm/part-version-comparison/compare-with-current-draft', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 生成对比报告 POST /api/pdm/part-version-comparison/generate-report */
export async function PartVersionComparisonGenerateReportAsync(body: API.BurnAbpPdmPartManagementPartVersionsComparisonGenerateReportInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmPartManagementPartVersionsComparisonComparisonReportDto>('/api/pdm/part-version-comparison/generate-report', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
