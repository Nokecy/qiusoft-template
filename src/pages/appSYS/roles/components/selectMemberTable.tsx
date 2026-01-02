import { ProTable } from "@/components";
import { RoleGetAllListAsync } from "@/services/openApi/Role";
import { UserGetListAsync } from "@/services/openApi/User";
import { ActionType } from "@ant-design/pro-table";
import { Input, Space, Tag } from "antd";
import { remove } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "umi";

const SelectMemberTable: React.FC<any> = (props: any) => {
    const tableRef = useRef<ActionType>();
    const intl = useIntl();
    const [selectedData, setSelected] = useState<{ rowKeys: any[], selectedRows: any[] } | undefined>();
    const [disableKeys, setDisableKeys] = useState<any[]>([]);
    const [filter, setFilter] = useState<any>();
    const { onChange, editEntityId } = props;

    useEffect(() => {
        if (editEntityId) {
            UserGetListAsync({ roleId: editEntityId }).then(users => {
                let rowKeys = users.items!.map((a: any) => a.id);
                setDisableKeys(rowKeys);
            });
        }
    }, [editEntityId])

    const onSelectRow = (rowKeys, selectedRows) => {
        setSelected({ rowKeys, selectedRows });
    }

    useEffect(() => {
        if (onChange) onChange(selectedData?.selectedRows.map(a => a.userName));
    }, [selectedData?.rowKeys]);

    return (
        <ProTable
            actionRef={tableRef}
            params={{ filter }}
            headerTitle={"成员列表"}
            toolBarRender={() => {
                return [
                    <Input.Search onSearch={(value) => { setFilter(value); }} placeholder={"输入用户名、姓名搜索"} />
                ];
            }}
            request={async (params?: any) => {
                let filter = params!.filter;
                let data = await RoleGetAllListAsync({ Filter: filter, Sorting: params!.sorter, SkipCount: params.skipCount, MaxResultCount: params.maxResultCount });
                let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                return requestData;
            }}
            rowSelection={{
                type: "checkbox",
                selectedRowKeys: selecteddata && selectedData.rowKeys,
                getCheckboxProps: (record: any) => {
                    return {
                        disabled: disableKeys!.findIndex(a => record.id === a) >= 0
                    };
                },
                onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
                    let selectedRowsTemp = selectedData ? [...selectedData?.selectedRows] : [];
                    let selectedRowKeysTemp = selectedData ? [...selectedData?.rowKeys] : [];
                    const changedKeys = changeRows.map(row => row["id"]);
                    if (selected) {
                        // 过滤掉已选的
                        selectedRowKeysTemp = selectedRowKeysTemp.concat(changedKeys.filter(key => !selectedRowKeysTemp.includes(key)));
                        selectedRowsTemp = selectedRowsTemp.concat(changeRows.filter(row => !selectedData?.rowKeys.includes(row["id"])));
                    } else {
                        // 全不选
                        selectedRowKeysTemp = selectedRowKeysTemp.filter(key => !changedKeys.includes(key));
                        selectedRowsTemp = selectedRowsTemp.filter(row => !changedKeys.includes(row["id"]));
                    }
                    onSelectRow(selectedRowKeysTemp, selectedRowsTemp);
                },
                onSelect: (record: any, selected: boolean) => {
                    let selectedRows = selectedData ? [...selectedData?.selectedRows] : [];
                    if (selected) {
                        selectedRows.push(record);
                    } else {
                        remove(selectedRows, a => a.id === record.id);
                    }
                    let rowKeys = selectedRows.map((a: any) => a.id);
                    onSelectRow(rowKeys, selectedRows);
                }
            }}>
            <ProTable.Column dataIndex={"index"} title={"序号"} align={"center"} valueType={"index"} width={80} />

            <ProTable.Column dataIndex={"userName"} title={intl.formatMessage({ id: "AbpIdentity:DisplayName:UserName" })} width={110} sorter />
            <ProTable.Column dataIndex={"name"} title={intl.formatMessage({ id: "AbpIdentity:DisplayName:Name" })} width={100} sorter />
            <ProTable.Column dataIndex={"organizationUnitName"} title={"部门"} width={150} sorter />
            <ProTable.Column dataIndex={"email"} title={intl.formatMessage({ id: "AbpIdentity:DisplayName:Email" })} sorter />
            <ProTable.Column dataIndex={"phoneNumber"} title={intl.formatMessage({ id: "AbpIdentity:DisplayName:PhoneNumber" })} width={150} sorter />
            <ProTable.Column dataIndex={"isEnabled"} title={"是否启用"} sorter width={100} render={(text: any, record: any, index: number) => {
                return text === true ? <Tag color="#108ee9">启用</Tag> : <Tag color="#f50">禁用</Tag>;
            }} />
        </ProTable >
    );
}

export default SelectMemberTable
