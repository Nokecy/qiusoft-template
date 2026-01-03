// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/workflow-management/get-badge/un-read */
export async function WorkflowBadgeGetBadgeInfo(options?: { [key: string]: any }) {
	return request<API.BurnAbpBadgeBadgeInfo[]>('/api/workflow-management/get-badge/un-read', {
		method: 'GET',
		...(options || {}),
	});
}
