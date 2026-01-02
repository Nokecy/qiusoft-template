import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { CountOrderTaskItemDetailGetListAsync } from "@/services/wms/CountOrderTaskItemDetail";
import { CountOrderTaskItemDetail } from "@/services/wmsPermission";
import { EditOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { ICellRendererParams } from "ag-grid-community";
import { Space, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Access, useAccess, useIntl } from "umi";
import CountRuleFormDialog from "./components/countRuleFormDialog";
import { LotAttrItemGetListAsync } from "@/services/wms/LotAttrItem";

const Options = (props: ICellRendererParams & { onRefresh }) => {
    const { data, api, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = () => {
        onRefresh();
    }

    return (
        <Space>
            <Access accessible={!!access[CountOrderTaskItemDetail.SubmitDifferencesMaintain] && data.differncesType == 2}>
                <CountRuleFormDialog title={"编辑差异原因"}
                    entityId={data.id} data={data} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", headerName: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
            </Access>
        </Space>
    );
}

const CountDiffPage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }
    const [cols, setCols] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        LotAttrItemGetListAsync({}).then((res: any) => {
            setCols(res.items);
            setIsLoading(false);
        });
    }, []);


    const changeData = (type?: string) => {
        let colChildArr: any = []
        for (let index = 0; index < 12; index++) {
            let headerName = cols.find((item) => item.field.toLowerCase() === `property${index + 1}`)?.label
            if (headerName) {
                colChildArr.push({
                    field: `${type ? type+"L" : 'l'}otProperty.property${index + 1}`,
                    headerName: headerName,
                    width: 90
                })
            }
        }
        return colChildArr;
    }

    const DiffTypeTag_ = (value) => {
        switch (value) {
            case 2:
                return <Tag color={"orange"}>待维护</Tag>
            case 3:
                return <Tag color={"success"}>已确认</Tag>
            default:
                break;
        }
    }
    const DifferenceResolveTag_ = (value) => {
        switch (value) {
            case 0:
                return <Tag color={"orange"}>不处理</Tag>
            case 10:
                return <Tag color={"success"}>杂入杂出</Tag>
            default:
                break;
        }
    }
    const DiffStatusTag_ = (value) => {
        switch (value) {
            case 5:
                return <Tag color={"blue"}>等待盘点</Tag>;
            case 10:
                return <Tag color={"orange"}>等待复盘</Tag>;
            case 15:
                return <Tag color={"yellow"}>等待确认差异信息</Tag>;
            case 20:
                return <Tag color={"green"}>完成</Tag>;
            default:
                return null;
        }
    }

    return <>
        {!isLoading && (
            <AgGridPlus
                gridRef={gridRef}
                headerTitle={"盘点差异列表"}
                gridKey="appWMS.countStore.countDiff"
                request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                    let filter = params?.filter ? `differncesType=2|differncesType=3,${params?.filter}` : `differncesType=2|differncesType=3`;
                    let data = await CountOrderTaskItemDetailGetListAsync({ Filter: filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                    //提示：只显示DifferncesType为2的数据，即状态为：等待维护差异
                    let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                    return requestData;
                }}
                columnDefs={[
                    { "field": "checkOrderNo", "headerName": "盘点清单号", "width": 150 },
                    { "field": "countTaskNo", "headerName": "盘点任务号", "width": 150 },
                    { "field": "wareHouse.code", "headerName": "库房编码", "width": 100 },
                    { "field": "wareHouse.name", "headerName": "库房名称", "width": 150 },
                    { "field": "materialOutCode", "headerName": "物料外码", "width": 150 },
                    { "field": "traceId", "headerName": intl.formatMessage({ id: "WMS:TraceId" }), "width": 150 },
                    { "field": "boxNumber", "headerName": intl.formatMessage({ id: "WMS:BoxNumber" }), "width": 150 },
                    { "field": "materialCode", "headerName": "物料编码", "width": 100 },
                    { "field": "materialDescription", "headerName": "物料描述", "width": 160 },
                    { "field": "realRightCode", "headerName": "物权", "width": 100 },
                    { "field": "wareHouseLocationCode", "headerName": "库位编码", "width": 150 },
                    { "field": "warehouseZoneCode", "headerName": "库区编码", "width": 150 },
                    { "field": "itemType", "headerName": "物料ABC", "width": 100 },
                    {
                        "field": "countTaskDetailStatus", "headerName": "盘点任务明细状态",
                        "width": 150, "cellRenderer": ({ value }) => { return DiffStatusTag_(value) }
                    },
                    {
                        "field": "differncesType", "headerName": intl.formatMessage({ id: "WMS:DifferncesType" }), "width": 100,
                        "cellRenderer": ({ value }) => { return DiffTypeTag_(value) }
                    },
                    {
                        "field": "first", "headerName": "系统",
                        "children": [
                            { "field": "systemQty", "headerName": "系统量", "width": 100, "hideInSearch": true },
                            { field: 'systemIsRoHS', headerName: '是否环保', width: 90, type: 'bool' },
                            { field: 'systemAcProperty', headerName: 'AC属性', width: 90 },
                            { field: 'systemRealRightCode', headerName: '物权', width: 100 },
                            ...changeData('system')
                        ]
                    },
                    {
                        "field": "first", "headerName": "初盘",
                        "children": [
                            { "field": "systemQty", "headerName": "系统量", "width": 100, "hideInSearch": true },
                            { field: 'isRoHS', headerName: '是否环保', width: 90, type: 'bool' },
                            { field: 'acProperty', headerName: 'AC属性', width: 90 },
                            { field: 'realRightCode', headerName: '物权', width: 100 },
                            { "field": "countQty", "headerName": "盘点量", "width": 100, "hideInSearch": true },
                            { "field": "diffQty", "headerName": "差异量", "width": 100, "hideInSearch": true },
                            { "field": "countTime", "headerName": "盘点时间", "width": 150 },
                            ...changeData()
                        ]
                    },
                    {
                        "field": "replay",
                        "headerName": "复盘",
                        "children": [
                            { "field": "replaySystemQty", "headerName": "系统量", "width": 100 },
                            { field: 'replayIsRoHS', headerName: '复盘是否环保', width: 90, type: 'bool' },
                            { field: 'replayAcProperty', headerName: '复盘AC属性', width: 90 },
                            { field: 'replayRealRightCode', headerName: '复盘物权', width: 100 },
                            { "field": "replayCountQty", "headerName": "盘点量", "width": 100 },
                            { "field": "replayDiffQty", "headerName": "差异量", "width": 100 },
                            { "field": "replayCountTime", "headerName": "盘点时间", "width": 150, "type": "dateTimeColumn" },
                            { "field": "replayOperator", "headerName": "复盘人", "width": 150 },
                            ...changeData('replay')
                        ]
                    },
                    {
                        "field": "differenceResolveType", "headerName": "处理方式", "width": 150,
                        "cellRenderer": ({ value }) => { return DifferenceResolveTag_(value) }
                    },
                    { "field": "differencesInfo", "headerName": intl.formatMessage({ id: "WMS:DifferencesInfo" }), "width": 150 },
                    { "field": "differencesUserName", "headerName": intl.formatMessage({ id: "WMS:DifferencesUserName" }), "width": 150 },
                    { "field": "differencesTime", "headerName": intl.formatMessage({ id: "WMS:DifferencesTime" }), "width": 150, "type": "dateTimeColumn" },
                    {
                        "field": "action",
                        "headerName": intl.formatMessage({ id: "AbpUi:Actions" }),
                        "width": 120,
                        "pinned": "right",
                        "filter": false,
                        "cellRenderer": Options,
                        "cellRendererParams": { onRefresh }
                    },
                ]}>

            </AgGridPlus>
        )}

    </>
};

export default CountDiffPage;
export const routeProps = {
    name: '盘点差异',
};