import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import React, { useEffect, useRef, useState } from 'react';
import { ExcludeCompareSettingGetListAsync, ExcludeCompareSettingDeleteAsync } from '@/services/wms/ExcludeCompareSetting';
import { useAccess, useIntl } from "umi";
import { ICellRendererParams } from "ag-grid-community";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import CompareSettingFromDialog from './components/compareSettingFromDialog';
import { Button, message, Space, Tag } from "antd";
import compareSettingTypeSelect from "./components/compareSettingTypeSelect";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import DeleteConfirm from "@/components/deleteConfirm";

const Options = (props: ICellRendererParams & { onRefresh }) => {
    const { data, api, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = () => {
        onRefresh();
    }

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作，请稍后', 0);
        //调用删除方法
        return ExcludeCompareSettingDeleteAsync({ id }).then(() => { refresh(); }).finally(() => { hide(); });
    }

    return (
        <Space>
            <CompareSettingFromDialog title={"编辑"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", title: intl.formatMessage({ id: "AbpUi:Edit" }) }} />

            <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
            </DeleteConfirm>
        </Space>
    );
}

const CompareSetting: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const [typeData, setTypeData] = useState<any>([])

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    const workStatus = (props: any) => {
        const { value } = props;
        const renderLineStatus = text => {
            switch (text) {
                case 10:
                    return '库房';
                case 20:
                    return '库位';
                case 30:
                    return '物权';
                case 40:
                    return '物料';
                default:
                    return;
            }
        };

        return renderLineStatus(value);
    };

    return <>
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={"对账配置"}
            gridKey="appWMS.storeCompare.storeCompare"
            params={{ typeData }}
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                //通过接口读取数据
                let data: any = await ExcludeCompareSettingGetListAsync({ Filter: params!.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            toolBarRender={(gridApi) => {
                return [
                    <CompareSettingFromDialog title={"新建"} onAfterSubmit={onRefresh}>{"新增对账配置"}</CompareSettingFromDialog>
                ]
            }}
        >
            <AgGridColumn field="excludeType" headerName={intl.formatMessage({ id: "WMS:StoreCompare:ExcludeType" })} width={200} cellRenderer={workStatus} searchComponent={compareSettingTypeSelect} ></AgGridColumn>
            <AgGridColumn field="excludeValue" headerName={intl.formatMessage({ id: "WMS:StoreCompare:ExcludeValue" })} width={150}></AgGridColumn>
            <AgGridColumn field="enableFlag" headerName={intl.formatMessage({ id: "WMS:StoreCompare:EnableFlag" })} type={"bool"} flex={1}></AgGridColumn>
            <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={120} pinned={"right"} filter={false} sortable={false} cellRenderer={Options} cellRendererParams={{ onRefresh }} />
        </AgGridPlus>
    </>

};
export default CompareSetting;
export const routeProps = {
    name: '对账配置',
};