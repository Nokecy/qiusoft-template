import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { UserGetListWithRoleAsync ,UserAddUsersToRoleAsync} from "@/services/openApi/User";
import { GridApi } from "ag-grid-community";
import { Button, Modal, Table, Tag, Transfer } from "antd";
import React, { useState } from "react";
import { useIntl, useRequest } from 'umi';

const UseraddPage = (props: any) => {
    const { roleName ,onConfirm} = props;
    const [gridApi, setGridApi] = useState<GridApi | undefined>();
    const intl = useIntl();
    const [visible, setVisible] = useState(false);

    const onSubmit = () => {
        const rows:any = gridApi?.getSelectedRows();
        const users = rows.map(it=>it.id)
        UserAddUsersToRoleAsync({users,roleName}).then(()=>{onConfirm(); setVisible(false);})
        // if(onSelected ) onSelected(rows);
        
    }


    const onCancel = () => {
        setVisible(false)
    }

    return (<>
        <Button type={"primary"} onClick={() => { setVisible(true) }}>添加用户</Button>
        <Modal title={"添加用户"} width={1200} bodyStyle={{ height: 500 }} destroyOnClose={true} open={visible} onCancel={onCancel} onOk={onSubmit}>
            <AgGridPlus
                headerTitle={"添加用户"}
                rowSelection={"multiple"}
                
                rowMultiSelectWithClick
                request={async (params?: { pageSize: number; current: number;[key: string]: any; }) => {
                    let data = await UserGetListWithRoleAsync({ Filter: '', Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                    data.items!.forEach((i:any)=>{
                       i.userName = i.arr
                    })
                    let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                    return requestData;
                }}
                onGridReady={(gridReadEvent: any) => {
                    setGridApi(gridReadEvent.api);
                }}
                toolBarRender={() => {
                    return [];
                }}>
                <AgGridColumn field={"name"} headerName={intl.formatMessage({ id: "AbpIdentity:DisplayName:Name" })} width={100}  />
                <AgGridColumn field={"extraProperties.Sex"} headerName={"性别"} width={100} cellRenderer={(props) => {
                    return props.value === 0 ? "男" : "女"
                }} hideInSearch />
                <AgGridColumn field={"phoneNumber"} headerName={intl.formatMessage({ id: "AbpIdentity:DisplayName:PhoneNumber" })} width={150} hideInSearch />
                <AgGridColumn field={"email"} headerName={intl.formatMessage({ id: "AbpIdentity:DisplayName:Email" })} hideInSearch flex={1}/>

            </AgGridPlus>
        </Modal>
    </>);
}

export default UseraddPage