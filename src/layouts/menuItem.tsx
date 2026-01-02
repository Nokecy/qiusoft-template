import { Badge, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useModel, history } from 'umi';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { MenuFavoritesCreateAsync, MenuFavoritesCancelAsync } from '@/services/openApi/MenuFavorites';
import styles from './menuItem.less';
import { isArray } from 'lodash';
export default props => {
	const { initialState, setInitialState } = useModel('@@initialState');
	const [badge, setBadge] = useState<any>(undefined);
	const [favios, setFavios] = useState(false);
	useEffect(() => {
		try {
			if (isArray(initialState?.badges[0])) {
				const badge = initialState?.badges[0]?.find((badge: any) => badge.name!.indexOf(props.itemPath!) >= 0);
				setBadge(badge);
			}
		} catch (error) {

		}
		const favios = initialState?.favorites.find(a => a.name!.indexOf(props.path!) >= 0) ? true : false;
		setFavios(favios);
	}, [JSON.stringify(initialState?.badges)]);

	const fav = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		if (favios) {
			MenuFavoritesCancelAsync({ name: props.path });
			//@ts-ignore
			setInitialState({ ...initialState, favorites: [...initialState?.favorites].filter(i => i.name != props.path) });
		} else {
			MenuFavoritesCreateAsync({ name: props.path, icon: props.icon, displayName: props.displayName, id: props.id, url: props.url });
		}
		setFavios(!favios);
	};

	return (
		<div
			className={styles.content}
			onClick={() => {
				if (props.url?.startsWith("http")) {
					window.open(props.url)
				} else {
					history.push(props.path);
				}
			}}
		>
			<Badge count={badge?.count} offset={[12, 16]} size={'small'} style={{ color: '#fff', zIndex: 99 }}>
				<span style={{ paddingLeft: '6px' }}></span>
				{props.defaultDom}
			</Badge>
			<div className={styles.starItem}>
				{favios ? (
					<StarFilled
						onClick={fav}
						style={
							{ lineHeight: '34px', display: props.items.length ? 'none' : undefined, cursor: 'pointer' } //排除顶级菜单的收藏功能
						}
					/>
				) : (
					<StarOutlined
						onClick={fav}
						style={
							{ lineHeight: '34px', display: props.items.length ? 'none' : undefined, cursor: 'pointer' } //排除顶级菜单的收藏功能
						}
					/>
				)}
			</div>
		</div>
	);
};
