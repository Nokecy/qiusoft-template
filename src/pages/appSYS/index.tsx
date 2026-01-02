import { PageContainer } from '@ant-design/pro-layout';import { ToolBar } from '@/components';
import React, { useState } from "react";
import { Dashboard as DashboardPro } from '@nokecy/qc-ui';
import { WidgetComponents } from "umi";

const Dashboard = (props: any) => {
    const getHeight = () => {
        return document.getElementsByTagName('body')[0].clientHeight - 60
    }
    return <PageContainer  style={{height:getHeight(),overflowY:'auto'}} pageHeaderRender={() => null}>
        <DashboardPro
            storageKey={'/appSYS'}
            widgets={WidgetComponents}
        />
    </PageContainer>;
}

export default Dashboard;

export const routeProps = {
	name: '系统仪表板',
};
