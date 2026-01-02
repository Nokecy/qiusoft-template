import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { Roles } from "@/services/identityPermission";
import { ApiKeySecretDeleteAsync, ApiKeySecretGetListAsync } from "@/services/openApi/ApiKeySecret";
import { ApiKeys } from "@/services/apiKeySecretAuthorizationPermissions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { ICellRendererParams } from "ag-grid-community";
import { Button, message,   Space } from "antd";
import React, { useRef } from "react";
import { Access, useAccess, useIntl } from "umi";
import ApiKeySecretFormDialog from "./components/apiKeySecretFormDialog";
import SecretPermissionDialog from "./components/secretPermissionModal";
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
        ApiKeySecretDeleteAsync({ id }).then(() => { refresh() }).finally(() => { hide(); });
    }


    return (
        <Space>
            <Access accessible={access[ApiKeys.Update]}>
                <ApiKeySecretFormDialog title={"编辑应用"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", title: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
            </Access>

            <Access accessible={access[Roles.ManagePermissions]}>
                <SecretPermissionDialog secretName={data.id} />
            </Access>

            <Access accessible={access[ApiKeys.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}

const ApiKeySecretPage: React.FC<any> = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <>
        <AgGridPlus
            gridRef={gridRef}
            headerTitle={"应用列表"}
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await ApiKeySecretGetListAsync({ Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            toolBarRender={(girdApi) => {
                return [<Access accessible={access[ApiKeys.Create]}>
                    <ApiKeySecretFormDialog title={"新建"} onAfterSubmit={onRefresh}>{"新建应用"}</ApiKeySecretFormDialog>
                </Access>
                ];
            }}>
            <AgGridColumn field={"name"} headerName={intl.formatMessage({ id: "ApiKeySecret:Name" })} width={180} />
            <AgGridColumn field={"key"} headerName={intl.formatMessage({ id: "ApiKeySecret:Key" })} width={180} />
            <AgGridColumn field={"secret"} headerName={intl.formatMessage({ id: "ApiKeySecret:Secret" })} width={180} />
            <AgGridColumn field={"active"} headerName={intl.formatMessage({ id: "ApiKeySecret:Active" })} width={180} type="bool" />
            <AgGridColumn field={"expireAt"} headerName={intl.formatMessage({ id: "ApiKeySecret:ExpireAt" })} type={"dateColumn"} flex={1} />
            <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={120} pinned={"right"} cellRenderer={Options} filter={false}
                cellRendererParams={{ onRefresh }} />
        </AgGridPlus >
    </>
};

export default ApiKeySecretPage;
export const routeProps = {
	name: '应用列表',
};