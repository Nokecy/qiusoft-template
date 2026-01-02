import React, { useEffect } from 'react';
import { BarChartOutlined } from '@ant-design/icons';
import snapShot from './images/img14.png';
import { Link, useModel, serverUrl } from 'umi';
import { createFromIconfontCN } from '@ant-design/icons';
import { iconfontUrl } from '@/../config/defaultSettings';
import { Card, QRCode } from 'antd';
let IconFont = createFromIconfontCN({
	scriptUrl: iconfontUrl,
});
const pdaDownloadCode = (props: any) => {
	const { initialState } = useModel('@@initialState');

	return (
		<div>
			<Card
				bordered={false}
				style={{ height: '100%' }}
				bodyStyle={{ height: 'calc(100% - 55px)', padding: '0 24' }}
				title={<span style={{ fontWeight: 'bold', fontSize: 14 }}> PDA下载二维码</span>}
				extra={null}
			>
				<QRCode errorLevel='H' size={180} iconSize={180 / 4} value={`${serverUrl()}/api/android-download/apk`.replace('https', 'http')} icon={require('./images/img14.png')} />
			</Card>
		</div>
	);
};
export default {
	name: 'PdaDownloadCode',
	description: 'PDA下载二维码',
	tags: ['System'],
	component: pdaDownloadCode,
	configComponent: null,
	maxLength: 1,
	snapShot,
	icon: <BarChartOutlined />,
	iconBackground: '#f00',
	size: {
		defaultWidth: 2,
		defaultHeight: 2,
		maxWidth: 12,
		maxHeight: 16,
		minWidth: 1,
		minHeight: 1,
	},
};
