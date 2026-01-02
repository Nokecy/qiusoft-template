import { SettingUiGroupSettingDefinitionsAsync } from '@/services/openApi/SettingUi';
import { Spin, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react';
import GenerationForm from './generationForm';
import type { API } from '@/services/openApi/typings';

const Setting: React.FC = () => {
	const [settingGroups, setSettingGroups] = useState<API.SettingGroupResult[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		SettingUiGroupSettingDefinitionsAsync({})
			.then(settingGroup => {
				setSettingGroups(settingGroup);
			})
			.catch(() => {
				message.error('加载设置失败');
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <Spin spinning tip="加载中..." style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }} />;
	}

	return (
		<Tabs tabPosition='top' tabBarStyle={{ paddingLeft: 12, backgroundColor: '#fff' }}>
			{settingGroups.map(group => (
				<Tabs.TabPane tab={group.groupDisplayName} key={group.groupName} style={{ backgroundColor: '#fff' }}>
					<GenerationForm infos={group.settingInfos!} />
				</Tabs.TabPane>
			))}
		</Tabs>
	);
};

export default Setting;
export const routeProps = {
	name: '设置管理',
};
