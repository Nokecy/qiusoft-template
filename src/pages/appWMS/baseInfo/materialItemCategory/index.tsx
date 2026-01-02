import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { MaterialItemCategoryGetListAsync, MaterialItemCategoryDeleteAsync } from '@/services/wms/MaterialItemCategory';
import { MaterialItemCategory } from "@/services/wmsPermission";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { ICellRendererParams } from "ag-grid-community";
import { Button, message, Space } from "antd";
import React, { useRef } from "react";
import { Access, useAccess, useIntl } from "umi";
import MaterialFormDialog from "./components/materialItemCategoryFormDialog";
import DeleteConfirm from "@/components/deleteConfirm";

const Options = (props: ICellRendererParams & { onRefresh }) => {
    const { data, api, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = () => {
        onRefresh();
    }

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        return MaterialItemCategoryDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
    }

    return (
        <Space>
            <Access accessible={access[MaterialItemCategory.Update]}>
                <MaterialFormDialog title={"编辑物料分类"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: <EditOutlined />, type: "link", title: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
            </Access>

            <Access accessible={access[MaterialItemCategory.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}

const MaterialItemCategoryPage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <>
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={"物料分类"}
            gridKey="appWMS.baseInfo.materialItemCategory"
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await MaterialItemCategoryGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            rowSelection={"multiple"}
            rowMultiSelectWithClick={true}
            toolBarRender={(gridApi) => {
                return [
                    <Access accessible={access[MaterialItemCategory.Create]}>
                        <MaterialFormDialog title={"新建"} onAfterSubmit={onRefresh}>新建</MaterialFormDialog>
                    </Access>,
                ];

            }}>
            <AgGridColumn field={"code"} headerName={intl.formatMessage({ id: "WMS:Code" })} width={220} />
            <AgGridColumn field={"name"} headerName={intl.formatMessage({ id: "WMS:Name" })} width={220} />
            <AgGridColumn field={"displayName"} headerName={'显示名称'} width={220} />
            <AgGridColumn field={"parent.name"} headerName={"上级分类"} width={220} flex={1} />
            <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={120} pinned={"right"} filter={false} sortable={false} cellRenderer={Options}
                cellRendererParams={{ onRefresh }} />
        </AgGridPlus>
    </>
};

export default MaterialItemCategoryPage;

export const routeProps = {
    name: '物料分类管理',
};