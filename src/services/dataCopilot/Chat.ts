// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 发送消息（非流式） POST /api/data-copilot/chat/send */
export async function ChatSendMessageAsync(body: API.BurnAbpDataCopilotChatSessionsSendMessageDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpDataCopilotChatSessionsChatResponseDto>('/api/data-copilot/chat/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 发送消息（SSE 流式） POST /api/data-copilot/chat/stream */
export async function ChatStreamAsync(body: API.BurnAbpDataCopilotChatSessionsSendMessageDto, options?: { [key: string]: any }) {
	return request<any>('/api/data-copilot/chat/stream', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
