import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Modal, Space, Tag, message } from 'antd';
import { AgGridColumn, AgGridPlus } from "@/components/agGrid";
import { ICellRendererParams } from "ag-grid-community";
import BusinessTypeDialog from './components/FormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TaskOverdueWarningSettingDelete, TaskOverdueWarningSettingGetList } from '@/services/workflow/TaskOverdueWarningSetting';

const TaskWarningSetupPage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();
    const onRefresh = () => {
        gridRef.current?.onRefresh();
    }

    const Options = (props: ICellRendererParams & { onRefresh }) => {
        const { data, api, onRefresh } = props;
        const intl = useIntl();
        const access = useAccess();

        const refresh = () => {
            onRefresh();
        }

        const handleDelete = (id: any) => {
            const hide = message.loading('正在操作,请稍后', 0);
            TaskOverdueWarningSettingDelete({ id }).then(() => {
                refresh()
            }).finally(() => { hide(); });
        }

        return (
            <Space>
                <Access accessible={true}>
                    <BusinessTypeDialog title={"编辑"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", headerName: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
                </Access>

                <Access accessible={true}>
                    <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
                        <Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
                    </DeleteConfirm>
                </Access>
            </Space>
        );
    }

    const recipientsRender = ({ value }) => {
        return value.map((item: any) => {
            return <Tag key={item.id}>{item.name}</Tag>
        })
    }



    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                headerTitle='任务预警设置列表'
                gridKey='appWorkflow.taskOverdueWarningSetting'
                request={async (params: any) => {
                    let data = await TaskOverdueWarningSettingGetList({ Filter: params?.filter, MaxResultCount: params!.maxResultCount, SkipCount: params!.skipCount, Sorting: params!.sorter! })
                    return {
                        success: true,
                        data: data.items!,
                        total: data.totalCount
                    }
                }}
                toolBarRender={(gridApi, filter) => {
                    return [
                        <Access accessible={true}>
                            <BusinessTypeDialog title={"新建任务预警"} onAfterSubmit={onRefresh}>{"新建"}</BusinessTypeDialog>
                        </Access>,
                    ];
                }}
            >
                <AgGridColumn field={"workflowName"} headerName={"流程名称"} width={150} hide/>
                <AgGridColumn field={"workflowDisplayName"} headerName={"流程名称"} width={150} />
                <AgGridColumn field={"overdueDurationHours"} headerName={"超期时长(小时)"} width={150} />
                <AgGridColumn field={"recipients"} headerName={"预警人"} width={260} cellRenderer={recipientsRender} />
                <AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={180} pinned={"right"} filter={false} cellRenderer={Options}
                    cellRendererParams={{ onRefresh }} />
            </AgGridPlus>
        </>
    )
}

export default TaskWarningSetupPage
export const routeProps = {
    name: '任务预警设置',
};
