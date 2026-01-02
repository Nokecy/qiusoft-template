import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { LotAttrItem } from "@/services/wmsPermission";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { ICellRendererParams } from "ag-grid-community";
import { Button, message, Space } from "antd";
import React, { useRef } from "react";
import { Access, useAccess, useIntl } from "umi";
import DeleteConfirm from "@/components/deleteConfirm";
import OutInspectionProjectType from "../_utils/OutInspectionProjectType";
import { OutInspectionProjectDeleteAsync, OutInspectionProjectGetListAsync } from "@/services/wms/OutInspectionProject";
import OutInspectionProjectFormDialog from "./components/formDialog";

const Options = (props: ICellRendererParams & { onRefresh }) => {
    const { data, api, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = () => {
        onRefresh();
    }

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        return OutInspectionProjectDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
    }

    return (
        <Space>
            <Access accessible={access[LotAttrItem.Update]}>
                <OutInspectionProjectFormDialog title={"编辑物料"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", title: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
            </Access>

            <Access accessible={access[LotAttrItem.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}

const OutInspectionProjectPage = () => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                headerTitle={"复核属性列表"}
                gridKey="appWMS.baseInfo.OutInspectionProject"
                request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                    let data = await OutInspectionProjectGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                    let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                    return requestData;
                }}
                toolBarRender={() => {
                    return [<Access accessible={access[LotAttrItem.Create]}>
                        <OutInspectionProjectFormDialog title={"新增检验属性"} onAfterSubmit={onRefresh}>新增检验属性</OutInspectionProjectFormDialog>
                    </Access>
                    ];
                }}>
                <AgGridColumn field={"field"} headerName={intl.formatMessage({ id: "WMS:Field" })} width={150} />
                <AgGridColumn field={"label"} headerName={intl.formatMessage({ id: "WMS:Label" })} width={120} />
                <AgGridColumn field={"type"} headerName={intl.formatMessage({ id: "WMS:Type" })} flex={1} cellRenderer={OutInspectionProjectType} />

                <AgGridColumn field={"creationTime"} headerName={intl.formatMessage({ id: "WMS:CreationTime" })} width={180} type={"dateTimeColumn"} initialSort={"desc"} />
                <AgGridColumn field={"creator"} headerName={intl.formatMessage({ id: "WMS:Creator" })} width={120} />
                <AgGridColumn field={"lastModificationTime"} headerName={intl.formatMessage({ id: "WMS:LastModificationTime" })} width={180} type={"dateTimeColumn"} />
                <AgGridColumn field={"lastModifier"} headerName={intl.formatMessage({ id: "WMS:LastModifier" })} width={120} />

                <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={120} pinned={"right"} filter={false} sortable={false} cellRenderer={Options}
                    cellRendererParams={{ onRefresh }} />
            </AgGridPlus>
        </>
    )
}

export default OutInspectionProjectPage;
export const routeProps = {
    name: '出库检验属性',
};