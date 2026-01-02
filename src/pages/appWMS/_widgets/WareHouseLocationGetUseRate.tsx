
import React, { useEffect, useState } from 'react';
import { BarChartOutlined } from '@ant-design/icons';
import snapShot from '@/pages/appWMS/_widgets/images/pie.png';
import { WareHouseLocationGetUseRateAsync } from "@/services/wms/WareHouseLocation";
import { Pie, } from '@ant-design/plots';
import { Card, } from 'antd';

const DaibanTag = (props: any) => {
    const [data, setData]: any = useState(undefined)
    useEffect(() => {
        WareHouseLocationGetUseRateAsync({}).then((res: any) => {
            setData(res)
        })
    }, [])

    return (<Card
        title={< span style={{ fontWeight: "bold", fontSize: 14 }}> 库位利用率</span >}
        bodyStyle={{ width: "100%", height: "calc(100% - 40px)" }}
        style={{
            width: "100%", height: "100%"
        }}>
        <Pie {...{
            appendPadding: 10,
            data: [
            { type: "使用数量", value: data?.useQuantity },
            { type: "未使用数量", value: data?.unUseQuantity },
            ],
            angleField: 'value',
            colorField: 'type',
            radius: 0.8,
            label: {
                type: 'outer',
                content: '{name} {percentage}',
            },
            interactions: [
                {
                    type: 'pie-legend-active',
                },
                {
                    type: 'element-active',
                },
            ],
        }} />
    </Card>);
};

export default {
    name: 'WareHouseLocationGetUseRate',
    description: '库位利用率小部件',
    tags: ['WMS'],
    component: DaibanTag,
    configComponent: null,
    maxLength: 1,
    snapShot,
    icon: <BarChartOutlined />,
    iconBackground: '#f00',
    size: {
        defaultWidth: 6,
        defaultHeight: 12,
        maxWidth: 12,
        maxHeight: 12,
        minWidth: 6,
        minHeight: 6,
    },
} 