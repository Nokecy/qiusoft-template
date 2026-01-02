import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { OrganizationInfoGetUsersInOrganizationAsync, OrganizationInfoRemoveUserFromOrganizationAsync } from '@/services/openApi/OrganizationInfo';
import { Organizations } from "@/services/factoryPermission";
import { CheckCircleFilled, DeleteOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import DeleteConfirm from "@/components/deleteConfirm";
import { Button, message, Space } from "antd";
import React, { useRef } from "react";
import { Access, useAccess, useIntl, useSearchParams } from "umi";
import UserAddButton from "./components/userAddButton";

const Options = (props: any) => {
    const { data, organizationCode, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = onRefresh

    const handleDelete = (userName: any, organizationCode: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        OrganizationInfoRemoveUserFromOrganizationAsync({ organizationCode, userName }).then(() => { refresh() }).finally(() => { hide(); });
    }

    return (
        <Space>
            <Access accessible={access[Organizations.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.userName, organizationCode)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}

const OrganizationUserPage = (props: any) => {
    const intl = useIntl();
    const access = useAccess();
    const gridRef = useRef<GridRef>();

    let [searchParams, setSearchParams] = useSearchParams();
    const organizationCode = searchParams.get('organizationCode');

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    return <>
        <AgGridPlus
            gridRef={gridRef}
            request={async (params: { pageSize: number; current: number;[key: string]: any; }, sort: any, filter: any) => {
                let data: any = await OrganizationInfoGetUsersInOrganizationAsync({ organizationCode: params?.organizationCode, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data, total: data.length };
                return requestData;
            }}
            params={{ organizationCode: organizationCode }}
            toolBarRender={(api) => {
                return [
                    <Access accessible={access[Organizations.Create]}>
                        <UserAddButton organizationCode={organizationCode} onConfirm={onRefresh} >添加用户</UserAddButton>
                    </Access>
                ];
            }}
            headerTitle={`${organizationCode}组织机构用户列表`}>
            <AgGridColumn field={"userName"} headerName={intl.formatMessage({ id: "AbpIdentity:DisplayName:UserName" })} width={130} />
            <AgGridColumn field={"name"} headerName={intl.formatMessage({ id: "AbpIdentity:DisplayName:Name" })} width={100} hideInSearch />
            <AgGridColumn field={"extraProperties.Sex"} headerName={"性别"} width={100} cellRenderer={(props) => { return props.value === 0 ? "男" : "女" }} hideInSearch />
            <AgGridColumn field={"phoneNumber"} headerName={intl.formatMessage({ id: "AbpIdentity:DisplayName:PhoneNumber" })} width={150} hideInSearch />
            <AgGridColumn field={"email"} headerName={intl.formatMessage({ id: "AbpIdentity:DisplayName:Email" })} hideInSearch flex={1} />
            <AgGridColumn
                field={"isDefault"}
                headerName={"默认组织"}
                width={100}
                hideInSearch
                cellRenderer={(props: any) => {
                    return props.value ? <CheckCircleFilled style={{ color: '#52c41a' }} /> : null;
                }}
            />
            <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} pinned={"right"} width={120} cellRenderer={Options} filter={false} cellRendererParams={{ organizationCode, onRefresh }} />
        </AgGridPlus>
    </>
};

export default OrganizationUserPage;
export const routeProps = {
    name: '组织机构用户',
};