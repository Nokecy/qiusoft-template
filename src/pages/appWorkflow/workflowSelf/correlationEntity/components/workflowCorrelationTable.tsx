import { AgGridPlus } from '@/components/agGrid';
import { WorkflowCorrelationEntityGetList } from '@/services/workflow/WorkflowCorrelationEntity';
import React, { useCallback, useMemo, useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Button, Space } from 'antd';
import { history } from 'umi';
import { EditOutlined } from '@ant-design/icons';

const Options = (props: any & { onRefresh }) => {
    const { data, api, onRefresh } = props;

    let correlationId = data.correlationId || data.id;
    let workflowInstanceId = data.workflowInstanceId;
    let workflowDefinitionId = data.workflowDefinitionId;
    let bookmarkId = data.bookmarkId;
    let formUrl = data.formUrl;

    if (data.workflows.length > 0) {
        workflowDefinitionId = data.workflows[0].workflowDefinitionId
        workflowInstanceId = data.workflows[0].workflowInstanceId
        bookmarkId = data.workflows[0].bookmarkId
        formUrl = data.workflows[0].formUrl
    }

    const executeWorkflow = async () => {
        history.push(
            `${formUrl}?definitionId=${workflowDefinitionId}&correlationId=${correlationId}&workflowInstanceId=${workflowInstanceId}&activityId=${bookmarkId}`
        );
    };

    return (
        <Space>
            <Button type='link' icon={<EditOutlined />} onClick={executeWorkflow}></Button>
        </Space>
    );
};

/**
 * 流程关联实体Table 公共组件
 * @param props 
 * @returns 
 */
const WorkflowCorrelationTable = (props: { workflowName: string, columnDefs: any[], headerTitle?: React.ReactNode }) => {
    const { workflowName, headerTitle, columnDefs } = props;
    const gridRef = useRef<GridRef>();

    const optionColumn = { headerName: '操作', field: 'action', width: 60, pinned: 'right', filter: false, cellRenderer: (props: any) => <Options {...props} />, };

    const detailCellRendererParams = useMemo<any>(() => {
        return {
            detailGridOptions: {
                columnDefs: [
                    { field: "activityName", headerName: "节点名称", width: 100 },
                    { field: "assigneeName", headerName: "处理人", width: 100 },
                    { field: "assigneeTime", headerName: "创建时间" },
                    optionColumn
                ],
                defaultColDef: {
                    flex: 1,
                },
            },
            getDetailRowData: function (params) {
                const data = params.data.workflows.map(workflow => {
                    return { ...params.data, ...workflow };
                })
                params.successCallback(data);
            },
        };
    }, []);

    const isRowMaster = useCallback((dataItem: any) => {
        return dataItem ? dataItem.workflows.length > 1 : false;
    }, []);

    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                params={{ workflowName: workflowName }}
                columnDefs={[{ field: "gorup", cellRenderer: "agGroupCellRenderer", headerName: "", width: 50 }, ...columnDefs, optionColumn]}
                masterDetail={true}
                isRowMaster={isRowMaster}
                detailCellRendererParams={detailCellRendererParams}
                request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
                    let data = await WorkflowCorrelationEntityGetList({ WorkflowName: params?.workflowName || "", Status: 0, MaxResultCount: 200 });
                    data.items.map(item => {
                        item.correlationId = item.id;
                        item.workflows = item.workflows?.map(workflow => {
                            return { ...workflow, correlationId: item.id };
                        })
                    })
                    let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                    return requestData;
                }}
                headerTitle={headerTitle ? headerTitle : "审批列表"}
            />
        </>
    );
};

export default WorkflowCorrelationTable;