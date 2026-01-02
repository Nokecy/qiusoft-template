import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { FactoryZoneDeleteAsync, FactoryZoneGetListAsync } from '@/services/wms/FactoryZone';
import { FactoryZone } from "@/services/wmsPermission";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { ICellRendererParams } from "ag-grid-community";
import { Button, message, Space } from "antd";
import React, { useRef } from "react";
import { Access, useAccess, useIntl } from "umi";
import FactoryZoneFormDialog from "./components/factoryZoneFormDialog";
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
        return FactoryZoneDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
    }

    return (
        <Space>
            <Access accessible={access[FactoryZone.Update]}>
                <FactoryZoneFormDialog title={"编辑产区"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", headerName: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
            </Access>

            <Access accessible={access[FactoryZone.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}

const FactoryZonePage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <>
        <AgGridPlus
            treeData={true}
            gridRef={gridRef}
            headerTitle={"区域列表"}
            gridKey="appWMS.baseInfo.factoryZone"
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await FactoryZoneGetListAsync({ Filter: params!.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                // return { success: true, data: flattenTreeDeep(data || [], 'childrens'), total: data.length || 0, };
                return requestData;
            }}
            treeParentName={'parentId'}
            treeKeyName='id'
            getDataPath={data => {
                return data.hierarchy;
            }}
            autoGroupColumnDef={{
                headerName: '名称',
                field: 'name',
                minWidth: 100,
                sortable: false,
            }}
            groupDefaultExpanded={-1}
            toolBarRender={(gridApi) => {
                return [<Access accessible={access[FactoryZone.Create]}>
                    <FactoryZoneFormDialog title={"新建产区"} onAfterSubmit={onRefresh}>{"新建产区"}</FactoryZoneFormDialog>
                </Access>
                ];
            }}>
            <AgGridColumn field={"code"} headerName={intl.formatMessage({ id: "WMS:Code" })} width={130} />
            {/* <AgGridColumn field={"name"} headerName={intl.formatMessage({ id: "WMS:Name" })} width={150} /> */}
            <AgGridColumn field={"factoryType"} headerName={'厂区类型'} width={150} />
            <AgGridColumn field={"generateTreePath"} headerName={'是否参与生成树路径'} width={150} type={'bool'} />
            <AgGridColumn field={"address"} headerName={intl.formatMessage({ id: "WMS:Address" })} width={150} />
            <AgGridColumn field={"remark"} headerName={intl.formatMessage({ id: "WMS:Remark" })} width={150} />

            <AgGridColumn field={"creationTime"} headerName={intl.formatMessage({ id: "WMS:CreationTime" })} width={180} type={"dateTimeColumn"} initialSort={"desc"} />
            <AgGridColumn field={"creator"} headerName={intl.formatMessage({ id: "WMS:Creator" })} width={150} />
            <AgGridColumn field={"lastModificationTime"} headerName={intl.formatMessage({ id: "WMS:LastModificationTime" })} width={180} type={"dateTimeColumn"} />
            <AgGridColumn field={"lastModifier"} headerName={intl.formatMessage({ id: "WMS:LastModifier" })} width={120} />

            <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={120} pinned={"right"} filter={false} sortable={false} cellRenderer={Options}
                cellRendererParams={{ onRefresh }} />
        </AgGridPlus>
    </>
};

export default FactoryZonePage;

export const routeProps = {
    name: '区域管理',
};