import { PageContainer } from '@ant-design/pro-layout';
import React, { useState } from "react";
import { Dashboard as DashboardPro } from '@nokecy/qc-ui';
import { WidgetComponents } from "umi";

const Dashboard = (props: any) => {
    return <DashboardPro
        storageKey={'/appWorkflow'}
        widgets={WidgetComponents}
        defaultLayout={[
            {
                "w": 12,
                "h": 9,
                "x": 0,
                "y": 3,
                "i": "DaibanCard-45856372575533514441890729580540",
                "minW": 1,
                "maxW": 12,
                "minH": 1,
                "maxH": 16,
                "moved": false,
                "static": false
            },
            {
                "w": 12,
                "h": 3,
                "x": 0,
                "y": 0,
                "i": "DaibanTag-27703341431916431424327130855129",
                "minW": 12,
                "maxW": 12,
                "minH": 3,
                "maxH": 16,
                "moved": false,
                "static": false
            }
        ]}
    />;
}

export default Dashboard;

export const routeProps = {
    name: '流程仪表板',
};
