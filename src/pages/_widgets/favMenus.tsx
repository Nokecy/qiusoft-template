import React, { useEffect } from 'react';
import { BarChartOutlined } from '@ant-design/icons';
import snapShot from './images/fav.png';
import { Link, useModel, history,closeTab, } from "umi";
import { createFromIconfontCN } from '@ant-design/icons';
import { iconfontUrl } from "@/../config/defaultSettings";
import { Card, } from 'antd';
let IconFont = createFromIconfontCN({
    scriptUrl: iconfontUrl
});
const FavMenus = (props: any) => {
    const { initialState, } = useModel('@@initialState');

    return (<div>
        <Card bordered={false} style={{ height: "100%" }} bodyStyle={{ height: "calc(100% - 55px)", padding: "0 24" }}
            title={< span style={{ fontWeight: "bold", fontSize: 14 }}> 收藏菜单</span >}
            extra={null}>
            {initialState?.favorites.map((item: any) => {
                return <div key={item.url} style={{ margin: 4, cursor: 'pointer', border: '1px solid #ccc', borderRadius: '5px', padding: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', float: 'left' }} onClick={() => {
                    closeTab(item.url)
                    history.push(item.url)
                }}>
                    <div>
                        <IconFont type={item.icon} style={{ marginRight: 0, fontSize: 24, color: '#1890ff' }} />
                    </div>
                    <div>
                        {item.displayName}
                    </div>
                </div>
            })}
        </Card>
    </div>);
};
export default {
    name: 'FavMenus',
    description: '收藏菜单',
    tags: ['System'],
    component: FavMenus,
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
} 