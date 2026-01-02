// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取会话列表 GET /api/data-copilot/chat-sessions */
export async function ChatSessionGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ChatSessionGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpDataCopilotChatSessionsChatSessionDto>('/api/data-copilot/chat-sessions', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建会话 POST /api/data-copilot/chat-sessions */
export async function ChatSessionCreateAsync(body: API.BurnAbpDataCopilotChatSessionsCreateChatSessionDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpDataCopilotChatSessionsChatSessionDto>('/api/data-copilot/chat-sessions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取会话详情 GET /api/data-copilot/chat-sessions/${param0} */
export async function ChatSessionGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ChatSessionGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotChatSessionsChatSessionDto>(`/api/data-copilot/chat-sessions/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新会话 PUT /api/data-copilot/chat-sessions/${param0} */
export async function ChatSessionUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ChatSessionUpdateAsyncParams,
	body: API.BurnAbpDataCopilotChatSessionsUpdateChatSessionDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotChatSessionsChatSessionDto>(`/api/data-copilot/chat-sessions/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 删除会话 DELETE /api/data-copilot/chat-sessions/${param0} */
export async function ChatSessionDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ChatSessionDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/data-copilot/chat-sessions/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取会话详情（含消息） GET /api/data-copilot/chat-sessions/${param0}/with-messages */
export async function ChatSessionGetWithMessagesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ChatSessionGetWithMessagesAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotChatSessionsChatSessionWithMessagesDto>(`/api/data-copilot/chat-sessions/${param0}/with-messages`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 获取最近会话列表 GET /api/data-copilot/chat-sessions/recent */
export async function ChatSessionGetRecentListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ChatSessionGetRecentListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotChatSessionsChatSessionDto>('/api/data-copilot/chat-sessions/recent', {
		method: 'GET',
		params: {
			// count has a default value: 20
			count: '20',
			...params,
		},
		...(options || {}),
	});
}
