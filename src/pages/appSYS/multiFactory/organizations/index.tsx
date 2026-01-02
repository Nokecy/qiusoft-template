import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { OrganizationInfoGetListAsync, OrganizationInfoDeleteAsync } from '@/services/openApi/OrganizationInfo';
import { Organizations } from "@/services/factoryPermission";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import DeleteConfirm from "@/components/deleteConfirm";
import { Button, message, Space } from "antd";
import React, { useRef } from "react";
import { Access, useAccess, useIntl, history } from "umi";
import FormDialog from "./components/formDialog";
import OrganizationType, { OrganizationTypeSelect } from "./components/organizationType";
import OrganizationFunction, { OrganizationFunctionSelect } from "./components/organizationFunction";

// 计划属性枚举配置
const isPlanEnum = [
    { label: "是", value: "00", color: '#52c41a' },
    { label: "否", value: "10", color: '#d9d9d9' }
];

const Options = (props: any) => {
    const { data, onRefresh } = props;
    const intl = useIntl();
    const access = useAccess();

    const refresh = onRefresh

    const handleDelete = (id: any) => {
        const hide = message.loading('正在操作,请稍后', 0);
        OrganizationInfoDeleteAsync({ id })
            .then(() => {
                message.success('删除成功');
                refresh();
            })
            .catch((error) => {
                message.error('删除失败: ' + (error.message || '未知错误'));
            })
            .finally(() => {
                hide();
            });
    }

    return (
        <Space>
            <Access accessible={!!access[Organizations.Update]}>
                <FormDialog title={"编辑组织机构"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: <EditOutlined />, type: "link", title: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
            </Access>

            <Access accessible={!!access[Organizations.Delete]}>
                <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                    <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                </DeleteConfirm>
            </Access>
        </Space>
    );
}

const OrganizationPage = (props: any) => {
    const intl = useIntl();
    const access = useAccess();
    const gridRef = useRef<GridRef>();
    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }
    return (
        <AgGridPlus
            headerTitle={"组织机构列表"}
            gridKey="multiFactory-organizations-list"
            gridRef={gridRef}
            treeData={true}
            getDataPath={(data) => {
                return data.hierarchy;
            }}
            treeKeyName={"code"}
            treeParentName={"parentCode"}
            groupDefaultExpanded={-1}
            autoGroupColumnDef={{
                headerName: '组织名称',
                field: 'name',
                minWidth: 300,
                cellRendererParams: {
                    suppressCount: true,
                    innerRenderer: ({ value, data }) => {
                        return <a onClick={() => history.push(
                            `/appSYS/multiFactory/organizations/user?organizationCode=${data.code}`
                        )}>{value}</a>;
                    }
                },
            }}
            request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                let data = await OrganizationInfoGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            rowMultiSelectWithClick={true}
            toolBarRender={() => {
                return [
                    <Access key="create" accessible={!!access[Organizations.Create]}>
                        <FormDialog title={"新建组织机构"} onAfterSubmit={onRefresh} buttonProps={{ icon: <PlusOutlined /> }}>新建</FormDialog>
                    </Access>
                ];
            }}>
            <AgGridColumn field={"organizationType"} headerName={"组织类型"} width={120} cellRenderer={OrganizationType} searchComponent={OrganizationTypeSelect} />
            <AgGridColumn field={"organizationFunction"} headerName={"组织职能"} width={380} cellRenderer={OrganizationFunction} searchComponent={OrganizationFunctionSelect} />
            <AgGridColumn field={"isPlan"} headerName={"计划属性"} width={100} valueEnum={isPlanEnum} />
            <AgGridColumn field={"companyCode"} headerName={"公司编码"} width={120} />
            <AgGridColumn field={"factoryCode"} headerName={"工厂编码"} width={120} />
            <AgGridColumn field={"remark"} headerName={"备注"} flex={1} />
            <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} pinned={"right"} width={120} cellRenderer={Options} filter={false} cellRendererParams={{ onRefresh }} />
        </AgGridPlus>
    );
};

export default OrganizationPage;
export const routeProps = {
    name: '组织机构',
};