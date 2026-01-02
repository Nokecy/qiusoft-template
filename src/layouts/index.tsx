import React, { useEffect } from 'react';
import { Outlet, addLocale, useModel, useKeepOutlets } from 'umi';
import useDraggableDialog from '@/hooks/useDraggableDialog';
import { Watermark } from 'antd';
const localeMap = {
	'zh-CN': 'zh_CN',
	en: 'en_US',
};

const converLocalizationValues = (values: any) => {
	let localizationValues = {};
	Object.keys(values).map(key => {
		Object.keys(values[key]).map(subKey => {
			localizationValues[`${key}:${subKey}`] = values[key][subKey];
		});
	});
	return localizationValues;
};

const Layout = (props: any) => {
	const element = useKeepOutlets();
	const { setInitialState, initialState } = useModel('@@initialState');
	const { loadNotifications } = useModel('useNotificationModel');

	useEffect(() => {
		if (initialState) {
			let locale = initialState!.configuration?.localization?.currentCulture?.cultureName!;
			locale = locale === 'zh-Hans' ? 'zh-CN' : locale;
			let values = converLocalizationValues(initialState!.configuration?.localization?.values!);
			addLocale &&
				addLocale(locale, values, {
					momentLocale: locale,
					antd: {
						...require(`antd/es/locale/${localeMap[locale]}`).default,
					},
				});
		}
	}, [initialState]);

	// 监听Modal
	useDraggableDialog();

	return <>
		{
			window.location.hostname === '192.168.2.2' || window.location.hostname === 'localhost' ?
				<div style={{ height: '86vh' }}>
					<Watermark content="秋创软件" style={{ position: 'absolute', width: '100%', height: '100%' }}>
					</Watermark>
					{element}
				</div>
				: element
		}
	</>;
};

export default Layout;
