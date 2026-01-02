import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { UserGetListAsync } from "@/services/openApi/User";
import { OrganizationInfoAddUsersToOrganizationAsync } from "@/services/openApi/OrganizationInfo";
import { PlusOutlined } from "@ant-design/icons";
import { GridApi } from "ag-grid-community";
import { Button, Checkbox, Modal, Space } from "antd";
import React, { useState } from "react";
import { useIntl, useRequest } from 'umi';

const UserAddButton = (props: any) => {
    const { organizationCode, onConfirm } = props;
    const [gridApi, setGridApi] = useState<GridApi | undefined>();
    const intl = useIntl();
    const [visible, setVisible] = useState(false);
    const [isDefault, setIsDefault] = useState(false);

    const onSubmit = () => {
        const rows: any = gridApi?.getSelectedRows();
        const users = rows.map(it => it.userName)
        OrganizationInfoAddUsersToOrganizationAsync({ userNames: users, organizationCode, isDefault } as any).then(() => { onConfirm(); setVisible(false); setIsDefault(false); })
    }

    const onCancel = () => {
        setVisible(false);
        setIsDefault(false);
    }

    return (<>
        <Button type={"primary"} icon={<PlusOutlined />} onClick={() => { setVisible(true) }}>添加用户</Button>
        <Modal title={"添加用户"} width={1200} bodyStyle={{ height: 500 }} destroyOnClose={true} open={visible} onCancel={onCancel} onOk={onSubmit}>
            <AgGridPlus
                headerTitle={"添加用户"}
                rowSelection={"multiple"}
                rowMultiSelectWithClick
                request={async (params: any, sort, filter) => {
                    let data = await UserGetListAsync({ Filter: filter?.name, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                    let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                    return requestData;
                }}
                onGridReady={(gridReadEvent: any) => {
                    setGridApi(gridReadEvent.api);
                }}
                toolBarRender={() => {
                    return [
                        <Checkbox
                            checked={isDefault}
                            onChange={(e) => setIsDefault(e.target.checked)}
                        >
                            设为默认组织
                        </Checkbox>
                    ];
                }}>
                <AgGridColumn field={"name"} headerName={intl.formatMessage({ id: "AbpIdentity:DisplayName:Name" })} width={100} />
                <AgGridColumn field={"extraProperties.Sex"} headerName={"性别"} width={100} cellRenderer={(props) => {
                    return props.value === 0 ? "男" : "女"
                }} hideInSearch />
                <AgGridColumn field={"phoneNumber"} headerName={intl.formatMessage({ id: "AbpIdentity:DisplayName:PhoneNumber" })} width={150} hideInSearch />
                <AgGridColumn field={"email"} headerName={intl.formatMessage({ id: "AbpIdentity:DisplayName:Email" })} hideInSearch flex={1} />

            </AgGridPlus>
        </Modal>
    </>);
}

export default UserAddButton