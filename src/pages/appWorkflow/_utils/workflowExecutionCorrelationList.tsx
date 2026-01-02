import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { WorkflowExecutionLogGetListByCorrelationId } from '@/services/workflow/WorkflowExecutionLog';
import { Card } from '@nokecy/qc-ui';
import React, { useEffect, useState } from 'react';
import { useAccess, useIntl } from 'umi';

/**
 * 新流程执行日志列表
 * @param props 
 * @returns 
 */
const WorkflowExecutionCorrelationList = (props: any) => {
    const { hideSearch = true, workflowData } = props;
    const { correlationId, workflowDefinitionId } = workflowData
    const intl = useIntl();
    const access = useAccess();
    const [dataSource, setDataSource] = useState([]);

    const tranStatus = {
        5: '执行',
        10: '转处理人',
        11: '协办',
        15: '退回上节点',
        20: '驳回',
        25: '驳回指定节点',
    }

    const getData = async () => {
        let data = await WorkflowExecutionLogGetListByCorrelationId({
            // workflowDefinitionId: workflowData.workflowDefinitionId,
            correlationId: workflowData.correlationId
        });
        setDataSource(data.items);
    };


    useEffect(() => {
        if (correlationId) {
            getData()
        }
    }, [workflowData])

    return (
        <Card title={"审批日志"} defaultCollapsed={false} collapsible={true} style={{ marginTop: 10 }}>
            <AgGridPlus
                dataSource={dataSource}
                style={{ height: 300 }}
                search={false}
                hideTool={true}
                toolBarRender={api => {
                    return [];
                }}
            >
                {/* <AgGridColumn field={'activityName'} headerName={'节点名称'} width={150} /> */}
                <AgGridColumn field={'activityDisplayName'} headerName={'节点名称'} width={150} />
                <AgGridColumn field={'executor'} headerName={'执行人'} width={100} />
                <AgGridColumn field={'executeType'} headerName={'操作类型'} width={100}
                    cellRenderer={(props) => tranStatus[props.value]}
                />
                <AgGridColumn field={'executeTime'} headerName={'执行时间'} width={150} type={'dateTimeColumn'} sort={"desc"} />
                <AgGridColumn field={'message'} headerName={'消息'} flex={1} />
            </AgGridPlus>
        </Card>
    );
};

export default WorkflowExecutionCorrelationList;
