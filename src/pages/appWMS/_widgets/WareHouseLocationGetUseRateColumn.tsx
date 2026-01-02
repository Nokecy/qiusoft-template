 ///@ts-nocheck
import React, { useEffect, useState } from 'react';
import { BarChartOutlined } from '@ant-design/icons';
import snapShot from '@/pages/appWMS/_widgets/images/col.png';
import { PickTaskItemGetSumAsync } from "@/services/wms/PickTaskItem";
import { Column, } from '@ant-design/plots';
import { Card, DatePicker, } from 'antd';
import { useIntl, useRequest } from "umi";
import moment from 'dayjs';
import { WareHouseSelect } from "@/pages/appWMS/baseInfo/_utils";
const DaibanTag = (props: any) => {

    const [period, setPeriod] = useState({ startDate: moment().startOf('month'), endDate: moment().endOf('month'), WarehouseCode: undefined, WarehouseName: undefined });
    const { loading, data: data, run } = useRequest(PickTaskItemGetSumAsync, { manual: true, formatResult: (res) => res?.items });

    useEffect(() => {
        run({ StartDate: period.startDate.format("YYYY-MM-DD"), EndDate: period.endDate.format("YYYY-MM-DD"), WarehouseCode: period.WarehouseCode });
    }, []);
    const getBindColumnData = (data: any) => {
        const result: any[] = [];
        if (!data) {
            return result;
        }
        data.forEach(element => {
            let bindCount = element.bindCount! + element.loadCount! + element.unloadCount! + element.deliveryCount!;
            result.push({ type: "完成数量", assigneeName: element.assigneeName, value: element.finishSum })
            result.push({ type: "未完成数量", assigneeName: element.assigneeName, value: element.unFinishSum })
        });
        return result;
    }
    return (<Card
       
        extra={<div style={{ display: 'flex' }}><WareHouseSelect
            placeholder="库房编码"
            style={{ marginRight: 4, width: 80 }}
            allowClear
            value={{ value: period?.WarehouseCode, label: period?.WarehouseName }} onChange={(values: any) => {
                setPeriod({ ...period, WarehouseCode: values?.value, WarehouseName: values?.label })
                run({ StartDate: period.startDate.format("YYYY-MM-DD"), EndDate: period.endDate.format("YYYY-MM-DD"), WarehouseCode: values?.value });
            }} />
            <DatePicker.RangePicker style={{ marginRight: 4, width: 180 }} placeholder={["输入开始日期", "输入结束日期"]} value={[period.startDate, period.endDate]} onChange={(values) => {
                if (values) {
                    setPeriod({ ...period, startDate: values![0]!, endDate: values![1]! })
                    run({ StartDate: values![0]?.format("YYYY-MM-DD"), EndDate: values![1]?.format("YYYY-MM-DD") });
                }
            }} /></div>}
        title={< span style={{ fontWeight: "bold", fontSize: 14 }}> 出库入库任务任务完成数量/物料员出库任务统计</span >}
        bodyStyle={{ width: "100%", height: "calc(100% - 40px)" }}
        style={{
            width: "100%", height: "100%"
        }}>
        <Column {...{
            ///@ts-ignore
            data: getBindColumnData(data),
            xField: 'assigneeName',
            yField: 'value',
            seriesField: 'type',
            isStack: true,
            maxColumnWidth: 20,
            label: {
                position: 'middle',
                content: (item) => {
                    return item.value.toFixed(2);
                },
                style: {
                    fill: '#fff',
                },
            },
        }} />
    </Card>);
};

export default {
    name: 'WareHouseLocationGetUseRateColumn',
    description: '出库入库任务数量/物料员出库任务统计',
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