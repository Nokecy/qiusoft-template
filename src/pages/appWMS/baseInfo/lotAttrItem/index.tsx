import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { LotAttrItemDeleteAsync, LotAttrItemGetListAsync } from '@/services/wms/LotAttrItem';
import { LotAttrItem } from "@/services/wmsPermission";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { ICellRendererParams } from "ag-grid-community";
import { Button, message, Space } from "antd";
import React, { useRef } from "react";
import { Access, useAccess, useIntl } from "umi";
import { LotAttrItemType } from "../_utils";
import DeleteConfirm from "@/components/deleteConfirm";
import LotAttrItemFormDialog from "./components/formDialog";
const Options = (props: ICellRendererParams & { onRefresh }) => {
    const { data, api, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = () => {
        onRefresh();
    }

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        return LotAttrItemDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
    }

    return (
        <Space>
            <Access accessible={access[LotAttrItem.Update]}>
                <LotAttrItemFormDialog title={"编辑物料"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", title: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
            </Access>

            <Access accessible={access[LotAttrItem.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}

const LotAttrItemPage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <>
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={"批次属性列表"}
            gridKey='appWMS.baseInfo.lotAttrItem'
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await LotAttrItemGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            toolBarRender={() => {
                return [<Access accessible={access[LotAttrItem.Create]}>
                    <LotAttrItemFormDialog title={"新增批次属性"} onAfterSubmit={onRefresh}>新增批次属性</LotAttrItemFormDialog>
                </Access>
                ];
            }}>
            <AgGridColumn field={"field"} headerName={intl.formatMessage({ id: "WMS:Field" })} width={120} />
            <AgGridColumn field={"label"} headerName={intl.formatMessage({ id: "WMS:Label" })} width={120} />
            <AgGridColumn field={"type"} headerName={intl.formatMessage({ id: "WMS:Type" })} flex={1} cellRenderer={LotAttrItemType} />

            <AgGridColumn field={"creationTime"} headerName={intl.formatMessage({ id: "WMS:CreationTime" })} width={180} type={"dateTimeColumn"} initialSort={"desc"} />
            <AgGridColumn field={"creator"} headerName={intl.formatMessage({ id: "WMS:Creator" })} width={120} />
            <AgGridColumn field={"lastModificationTime"} headerName={intl.formatMessage({ id: "WMS:LastModificationTime" })} width={180} type={"dateTimeColumn"} />
            <AgGridColumn field={"lastModifier"} headerName={intl.formatMessage({ id: "WMS:LastModifier" })} width={120} />

            <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={120} pinned={"right"} filter={false} sortable={false} cellRenderer={Options}
                cellRendererParams={{ onRefresh }} />
        </AgGridPlus>
    </>
};

export default LotAttrItemPage;

export const routeProps = {
    name: '批次属性管理',
};