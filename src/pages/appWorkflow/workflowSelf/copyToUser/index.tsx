import React, { useRef, useState } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Modal, Space, message } from 'antd';
import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { ICellRendererParams } from "ag-grid-community";
import { WorkflowItemCopyToGetSelfList, WorkflowItemCopyToRead, WorkflowItemCopyToReadAll } from '@/services/workflow/WorkflowItemCopyTo';

const CopyToUserPage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();
    const [selectedRow, setSelectedRow] = useState<any>([]);
    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    const readFun = (data) => {
        const hide = message.loading('正在操作,请稍后', 0);
        WorkflowItemCopyToRead({ ids: data }).then(() => {
            onRefresh()
        }).finally(() => { hide(); });
    }

    const onSelectionChanged = (e: any) => {
        let selectedRows = e.api.getSelectedRows();
        setSelectedRow(selectedRows);
    };


    const Options = (props: ICellRendererParams & { onRefresh }) => {
        const { data, api, onRefresh } = props;
        const intl = useIntl();
        const access = useAccess();

        return (
            <Space>
                <Access accessible={!data.isRead}>
                    <a onClick={() => {
                        readFun([data.id])
                    }} >已读</a>
                </Access>

            </Space>
        );
    }



    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                headerTitle='我的抄送列表'
                gridKey='appSmartPark.base.businessType'
                onSelectionChanged={onSelectionChanged}
                rowSelection={'multiple'}
                request={async (params: any) => {
                    let data = await WorkflowItemCopyToGetSelfList({ Filter: params?.filter, MaxResultCount: params!.maxResultCount, SkipCount: params!.skipCount, Sorting: params!.sorter! })
                    return {
                        success: true,
                        data: data.items!,
                        total: data.totalCount
                    }
                }}
                toolBarRender={(gridApi, filter) => {
                    return [
                        <Button
                            type="primary"
                            onClick={() => {
                                const hide = message.loading('正在操作,请稍后', 0);
            return                     WorkflowItemCopyToReadAll().then(() => {
                                    onRefresh()
                                }).finally(() => {
                                    hide()
                                })
                            }}
                        >
                            全部已读
                        </Button>,
                        selectedRow.length > 0 && (
                            <Button
                                type="default"
                                onClick={() => {
                                    readFun(selectedRow.map((x: any) => x.id))
                                }}
                            >
                                已读
                            </Button>
                        )
                    ];
                }}
            >
                <AgGridColumn field={"copyUserName"} checkboxSelection headerName={"抄送人"} width={150} />
                <AgGridColumn field={"copyToUserName"} headerName={"抄送到用户名"} width={150} />
                <AgGridColumn field={"workItemId"} headerName={"流程ID"} width={150} />
                <AgGridColumn field={"workflowDefinitionId"} headerName={"工作流定义ID"} width={150} />
                <AgGridColumn field={"activityDisplayName"} headerName={"当前节点"} width={150} />
                <AgGridColumn field={"title"} headerName={"标题"} width={150} />
                <AgGridColumn field={"formUrl"} headerName={"表单URL"} width={200} />
                <AgGridColumn field={"copyTime"} headerName={"抄送时间"} width={160} type={'dateTimeColumn'} />
                <AgGridColumn field={"isRead"} headerName={"已读"} width={100} type={"bool"} />
                <AgGridColumn field={"readTime"} headerName={"读取时间"} width={160} type={'dateTimeColumn'} />
                <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={180} pinned={"right"} filter={false} cellRenderer={Options}
                    cellRendererParams={{ onRefresh }} />
            </AgGridPlus>
            <Modal>

            </Modal>
        </>
    )
}

export default CopyToUserPage
export const routeProps = {
    name: '我的抄送',
};
