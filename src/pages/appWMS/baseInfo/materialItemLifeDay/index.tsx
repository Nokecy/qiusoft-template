import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { MaterialItemLifeDayDeleteAsync, MaterialItemLifeDayGetListAsync } from '@/services/wms/MaterialItemLifeDay';
import { MaterialItemLifeDay } from "@/services/wmsPermission";
import { downloadBlob } from "@/_utils";
import { DeleteOutlined, EditOutlined, DownOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { ICellRendererParams } from "ag-grid-community";
import { Button, message, Space } from "antd";
import React, { useRef } from "react";
import { Access, useAccess, useIntl } from "umi";
import MaterialFormDialog from "./components/materialItemLifeDayFormDialog";
import DeleteConfirm from "@/components/deleteConfirm";
import ImportPublic from "@/components/importPublic";
const Options = (props: ICellRendererParams & { onRefresh }) => {
    const { data, api, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = () => {
        onRefresh();
    }

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
       return MaterialItemLifeDayDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
    }

    return (
        <Space>
            <Access accessible={access[MaterialItemLifeDay.Update]}>
                <MaterialFormDialog title={"编辑物料存储期"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", title: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
            </Access>

            <Access accessible={access[MaterialItemLifeDay.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}

const MaterialItemLifeDayPage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <>
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={"物料存储期"}
            gridKey="appWMS.baseInfo.materialItemLifeDay"
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await MaterialItemLifeDayGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            toolBarRender={(gridApi, filter) => {
                return [<Access accessible={access[MaterialItemLifeDay.Create]}>
                    <MaterialFormDialog title={"新建"} onAfterSubmit={onRefresh}>新建</MaterialFormDialog>
                </Access>,
                <Access accessible={access[MaterialItemLifeDay.Create]}>
                    <ImportPublic onAfterSubmit={onRefresh} icon={<CloudUploadOutlined />} title='库房存储期' downUrl='/api/wms/materialitem-lifeday/import-template' uploadUrl='/api/wms/materialitem-lifeday/import'>
                        批量上传
                    </ImportPublic>
                </Access>,
                <Button icon={<DownOutlined />} onClick={() => {
                    downloadBlob(`/api/wms/materialitem-lifeday/export?filter=${filter}`, "物料存储期信息.xlsx")
                }}>导出</Button>
                ];
            }}>
            <AgGridColumn field={"materialItem.code"} headerName={intl.formatMessage({ id: "WMS:MaterialItemCode" })} width={120} />

            <AgGridColumn field={"version"} headerName={intl.formatMessage({ id: "WMS:Version" })} width={120} />
            <AgGridColumn field={"supplierCode"} headerName={intl.formatMessage({ id: "WMS:SupplierCode" })} width={140} />
            <AgGridColumn field={"manufacturerName"} headerName={intl.formatMessage({ id: "WMS:ManufacturerName" })} width={140} flex={1} />
            <AgGridColumn field={"shelfLifeDays"} headerName={intl.formatMessage({ id: "WMS:ShelfLifeDays" })} width={150} hideInSearch={true} />
            <AgGridColumn field={"maxinumShelfLifeDays"} headerName={intl.formatMessage({ id: "WMS:MaxinumShelfLifeDays" })} width={180} hideInSearch={true} />

            <AgGridColumn field={"creationTime"} headerName={intl.formatMessage({ id: "WMS:CreationTime" })} width={180} type={"dateTimeColumn"} initialSort={"desc"} />
            <AgGridColumn field={"creator"} headerName={intl.formatMessage({ id: "WMS:Creator" })} width={120} />
            <AgGridColumn field={"lastModificationTime"} headerName={intl.formatMessage({ id: "WMS:LastModificationTime" })} width={180} type={"dateTimeColumn"} />
            <AgGridColumn field={"lastModifier"} headerName={intl.formatMessage({ id: "WMS:LastModifier" })} width={120} />

            <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={120} pinned={"right"} filter={false} sortable={false} cellRenderer={Options}
                cellRendererParams={{ onRefresh }} />
        </AgGridPlus>
    </>
};

export default MaterialItemLifeDayPage;

export const routeProps = {
    name: '物料存储期',
};