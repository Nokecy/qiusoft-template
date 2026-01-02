import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { WareHouse } from "@/services/wmsPermission";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ICellRendererParams } from "ag-grid-community";
import { Button, message, Space } from "antd";
import React, { useEffect, useRef } from "react";
import { Access, useAccess, useIntl, useRequest } from "umi";
import { StoreTransferMapDeleteAsync, StoreTransferMapGetListAsync } from "@/services/wms/StoreTransferMap";
import MaterialSettingByWarehouseDialog from "./components/materialWarehouseDialog";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import DeleteConfirm from "@/components/deleteConfirm";

const StoreTransferMapPage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    const Options = (props: ICellRendererParams & { onRefresh }) => {
        const { data, api } = props;
        const intl = useIntl();
        const access = useAccess();
    
        const refresh = () => {
            onRefresh();
        }
    
        const handleDelete = (id: any) => {
            const hide = message.loading('正在操作,请稍后', 0);
           return StoreTransferMapDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
        }
        return (
            <Space>
                <Access accessible={access[WareHouse.Update]}>
                    <MaterialSettingByWarehouseDialog title={"编辑调拨设置"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", title: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
                </Access>
    
                <Access accessible={access[WareHouse.Delete]}>
                    <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                        <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                    </DeleteConfirm>
                </Access>
            </Space>
        );
    }

    return <>
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={"调拨库房列表"}
            gridKey="appWMS.baseInfo.storeTransferMap"
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await StoreTransferMapGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            toolBarRender={(gridApi) => {
                return [<Access accessible={access[WareHouse.Create]}>
                    <MaterialSettingByWarehouseDialog title={"新建调拨设置"} onAfterSubmit={onRefresh}>{"新建调拨设置"}</MaterialSettingByWarehouseDialog>
                </Access>,

                ];
            }}
            columnDefs={
                [
                    {
                        "headerName": "原库房",
                        "children": [
                            { "field": "sourceWarehouse.code", "headerName": "编码", "width": 120 },
                            { "field": "sourceWarehouse.name", "headerName": "名称", "width": 150 }
                        ]
                    },
                    {
                        "headerName": "不良品库房",
                        "children": [
                            { "field": "rejectWarehouse.code", "headerName": "编码", "width": 120 },
                            { "field": "rejectWarehouse.name", "headerName": "名称", "width": 150 }
                        ]
                    },
                    {
                        "headerName": "良品库房",
                        "children": [
                            { "field": "goodWarehouse.code", "headerName": "编码", "width": 120 },
                            { "field": "goodWarehouse.name", "headerName": "名称", "width": 150 }
                        ]
                    },
                    { "field": "note", "headerName": "备注", "flex": 1, "hideInSearch": true },
                    { "field": "action", "headerName": "操作", "pinned": 'right', "hideInSearch": true, "filter": false, "sortable": false, "cellRenderer": Options, "width": 120 }
                ]
            }
        >
        </AgGridPlus>
    </>
};

export default StoreTransferMapPage;

export const routeProps = {
    name: '调拨设置',
};