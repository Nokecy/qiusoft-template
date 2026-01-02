// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 分页获取反馈列表 GET /api/data-copilot/feedback */
export async function FeedbackGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeedbackGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpDataCopilotFeedbackUserFeedbackDto>('/api/data-copilot/feedback', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建反馈 POST /api/data-copilot/feedback */
export async function FeedbackCreateAsync(body: API.BurnAbpDataCopilotFeedbackCreateUserFeedbackDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpDataCopilotFeedbackUserFeedbackDto>('/api/data-copilot/feedback', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取反馈详情 GET /api/data-copilot/feedback/${param0} */
export async function FeedbackGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeedbackGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotFeedbackUserFeedbackDto>(`/api/data-copilot/feedback/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新反馈 PUT /api/data-copilot/feedback/${param0} */
export async function FeedbackUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeedbackUpdateAsyncParams,
	body: API.BurnAbpDataCopilotFeedbackUpdateUserFeedbackDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotFeedbackUserFeedbackDto>(`/api/data-copilot/feedback/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 删除反馈 DELETE /api/data-copilot/feedback/${param0} */
export async function FeedbackDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeedbackDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/data-copilot/feedback/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取指定消息的反馈 GET /api/data-copilot/feedback/by-message/${param0} */
export async function FeedbackGetByMessageAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeedbackGetByMessageAsyncParams,
	options?: { [key: string]: any }
) {
	const { messageId: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotFeedbackUserFeedbackDto>(`/api/data-copilot/feedback/by-message/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取指定会话的所有反馈 GET /api/data-copilot/feedback/by-session/${param0} */
export async function FeedbackGetListBySessionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeedbackGetListBySessionAsyncParams,
	options?: { [key: string]: any }
) {
	const { sessionId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotFeedbackUserFeedbackDto>(`/api/data-copilot/feedback/by-session/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
