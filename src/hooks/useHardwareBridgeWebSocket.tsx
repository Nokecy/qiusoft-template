import { useEffect, useRef, useState } from 'react';
import useReactWebSocket from 'react-use-websocket';

// Multiple instances of the hook can exist simultaneously.
// This stores the timestamp of the last heartbeat for a given socket url,
// preventing other instances to send unnecessary heartbeats.
const previousHeartbeats: Record<string, number> = {};

// 客户端版本信息
const CLIENT_VERSION = '1.0.0';

interface IWebSocketOptions {
	shareConnection?: boolean;
}

interface IUseHardwareBridgeWebSocket {
	url: string;
	/**
	 * 打印服务器地址
	 */
	printApplicationUrl: string;
	options?: IWebSocketOptions;
}

// 版本消息接口
interface IVersionMessage {
	type: string;
	serverVersion?: string;
	clientVersion?: string;
}

/**
 * A custom hook that wraps the useReactWebSocket hook and adds a heartbeat message to the websocket connection.
 * @param url The url of the websocket server.
 * @param options The options for the websocket connection.
 * @returns The message received from the websocket server, the sendMessage function to send messages to the server, and the getWebSocket function to get the websocket instance.
 */
const useHardwareBridgeWebSocket = (props: IUseHardwareBridgeWebSocket) => {
	const { url, printApplicationUrl, options } = props;

	// Stores the heartbeat interval.
	const heartbeatIntervalRef = useRef<number>();
	// 存储版本兼容状态
	const [versionCompatible, setVersionCompatible] = useState<boolean>(true);
	// 存储服务端版本
	const [serverVersion, setServerVersion] = useState<string>('');

	// Instantiate useReactWebSocket.
	const { sendMessage, sendJsonMessage, lastJsonMessage, readyState, getWebSocket } = useReactWebSocket(
		url,
		{
			share: options?.shareConnection ? options?.shareConnection : false,
			retryOnError: true,
			reconnectAttempts: 50,
			reconnectInterval: 3000,
			shouldReconnect: () => true,
		},
		!!url
	);

	/**
	 * 发送打印命令
	 * @param reportName 报表名称
	 * @param urlParams URL参数
	 */
	const sendPrintMsg = (reportName, urlParams, identifier: any, width?: number, height?: number, isTest?: boolean, extraProperty?: any, printQuantity?: number, labelPrintFeatures?: string) => {
		const printModel = {
			LabelPrintFeatures: labelPrintFeatures, // 标签打印特性
			printQuantity: printQuantity, identifier: identifier, labelTemplateCode: reportName, url: `${printApplicationUrl}?reportUrl=${reportName}&${urlParams}`, width, height, isTest, extraProperty
		};
		sendMessage(`Print ${JSON.stringify(printModel)}`, true);
	};

	// 发送版本信息到服务端
	const sendVersionInfo = () => {
		// 使用sendMessage而不是sendJsonMessage，手动转换为JSON字符串
		sendMessage(JSON.stringify({
			type: 'version',
			clientVersion: CLIENT_VERSION
		}));
	};

	// 检查版本兼容性
	const checkVersionCompatibility = (serverVersion: string) => {
		// 这里实现版本比较逻辑，可以根据实际需求进行调整
		// 简单实现：版本号完全相同时认为兼容
		return CLIENT_VERSION === serverVersion;
	};

	// 处理服务端消息
	useEffect(() => {
		if (lastJsonMessage) {
			try {
				// 处理版本相关消息
				const message = lastJsonMessage as any;
				if (message.type === 'version' && message.serverVersion) {
					const serverVer = message.serverVersion;
					setServerVersion(serverVer);
					const isCompatible = checkVersionCompatibility(serverVer);
					setVersionCompatible(isCompatible);

					if (!isCompatible) {
						console.warn(`客户端版本(${CLIENT_VERSION})与服务端版本(${serverVer})不兼容，请更新！`);
					}
				}
			} catch (error) {
				console.error('处理服务端消息出错:', error);
			}
		}
	}, [lastJsonMessage]);

	// 连接建立后发送版本信息
	useEffect(() => {
		if (readyState === 1) {
			// 连接建立后，发送版本信息
			sendVersionInfo();

			heartbeatIntervalRef.current = window.setInterval(() => {
				// if (url) {
				// 	const lastHeartbeat = previousHeartbeats[url];
				// 	const deltaFromNow = (Date.now() - lastHeartbeat) / 1000;

				// 	// Send a heartbeat message if it hasn't already been sent within the last 10 seconds.
				// 	if (!lastHeartbeat || deltaFromNow > 10) {
				// 		// Send the heartbeat message and update the heartbeat history.
				// 		sendMessage('');
				// 		previousHeartbeats[url] = Date.now();
				// 	}
				// }
			}, 2000);
		}

		return () => {
			clearInterval(heartbeatIntervalRef.current);
		};
	}, [url, readyState, sendMessage]);

	return {
		sendMessage,
		getWebSocket,
		sendPrintMsg,
		lastJsonMessage,
		readyState,
		versionCompatible,
		serverVersion,
		clientVersion: CLIENT_VERSION
	};
};

export default useHardwareBridgeWebSocket;
