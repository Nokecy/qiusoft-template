import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { RealRightInfoDeleteAsync, RealRightInfoGetListAsync } from "@/services/wms/RealRightInfo";
import { RealRightInfo } from "@/services/wmsPermission";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { ICellRendererParams } from "ag-grid-community";
import { Button, message,   Space } from "antd";
import React, { useRef } from "react";
import { Access, useAccess, useIntl } from "umi";
import OverduePushRuleFormDialog from "./components/overduePushRuleFormDialog";
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
        return RealRightInfoDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
    }

    return (
        <Space>
            <Access accessible={access[RealRightInfo.Update]}>
                <OverduePushRuleFormDialog title={"编辑物权信息"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", title: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
            </Access>


            <Access accessible={access[RealRightInfo.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}

const RealRightInfoPage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <>
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={"物权信息列表"}
            gridKey="appWMS.baseInfo.realRightInfo"
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await RealRightInfoGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            toolBarRender={(girdApi) => {
                const selectRows = girdApi?.getSelectedRows();
                return [<Access accessible={access[RealRightInfo.Create]}>
                    <OverduePushRuleFormDialog title={"新建物权信息"} onAfterSubmit={onRefresh}>{"新建"}</OverduePushRuleFormDialog>
                </Access>
                ];
            }}>

            <AgGridColumn field={"name"} headerName={intl.formatMessage({ id: "WMS:RealRightName" })} width={180} />
            <AgGridColumn field={"code"} headerName={intl.formatMessage({ id: "WMS:RealRightCode" })} width={180} />
            <AgGridColumn field={"description"} headerName={intl.formatMessage({ id: "WMS:Description" })} width={180} flex={1} hideInSearch />
            <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={120} pinned={"right"} filter={false} sortable={false} cellRenderer={Options}
                cellRendererParams={{ onRefresh }} />
        </AgGridPlus>
    </>
};

export default RealRightInfoPage;

export const routeProps = {
	name: '物权管理',
};