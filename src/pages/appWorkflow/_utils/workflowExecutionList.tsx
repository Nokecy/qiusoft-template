import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { WorkflowExecutionLogGetListByCorrelationId, WorkflowExecutionLogGetListByInstance } from '@/services/workflow/WorkflowExecutionLog';
import { Card } from '@nokecy/qc-ui';
import React, { useEffect, useState } from 'react';

/**
 * 流程执行日志列表
 * @param props 
 * @returns 
 */
const WorkflowExecutionList = (props: any) => {
    const { workflowInstanceId, correlationId } = props;
    const [dataSource, setDataSource] = useState([]);

    const tranStatus = {
        5: '执行',
        10: '转处理人',
        15: '退回上节点',
        20: '驳回',
        25: '驳回指定节点',
    }

    const getData = async () => {
        // 优先按 workflowInstanceId 查询；若无/失败/无数据，则按 correlationId 兜底查询（与部分业务日志落库方式对齐）
        try {
            if (workflowInstanceId) {
                const data: any = await WorkflowExecutionLogGetListByInstance({ instanceId: workflowInstanceId }, { skipErrorHandler: true });
                const items = data?.items || [];
                if (items.length > 0) {
                    setDataSource(items);
                    return;
                }
            }
        } catch (e) {
            // ignore，走兜底
        }

        try {
            if (correlationId) {
                const data: any = await WorkflowExecutionLogGetListByCorrelationId({ correlationId }, { skipErrorHandler: true });
                setDataSource(data?.items || []);
                return;
            }
        } catch (e) {
            // ignore
        }

        setDataSource([]);
    }

    useEffect(() => {
        if (workflowInstanceId || correlationId) { getData() }
    }, [workflowInstanceId, correlationId])

    return (
        <Card title={"审批日志"} defaultCollapsed={false} collapsible={true} style={{ marginTop: 10 }}>
            <AgGridPlus
                dataSource={dataSource}
                style={{ height: 300 }}
                search={false}
                hideTool={true}
                toolBarRender={() => {
                    return [];
                }}
            >
                {/* <AgGridColumn field={'activityName'} headerName={'节点名称'} width={150} /> */}
                <AgGridColumn
                    field={'activityDisplayName'}
                    headerName={'节点名称'}
                    width={150}
                    cellRenderer={(props) => props?.data?.activityDisplayName || props?.data?.activityName || props?.data?.activityId || '-'}
                />
                <AgGridColumn field={'executor'} headerName={'执行人'} width={100} />
                <AgGridColumn field={'executeType'} headerName={'操作类型'} width={100}
                    cellRenderer={(props) => tranStatus[props.value]}
                />
                <AgGridColumn field={'executeTime'} headerName={'执行时间'} width={150} type={'dateTimeColumn'} sort={"asc"} />
                <AgGridColumn field={'message'} headerName={'消息'} flex={1} />
            </AgGridPlus>
        </Card>
    );
};

export default WorkflowExecutionList;
