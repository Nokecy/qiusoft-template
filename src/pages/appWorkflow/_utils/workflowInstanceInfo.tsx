import { Descriptions } from "antd";
import React, { useState } from "react";
import { ElsaWorkflowsApiEndpointsWorkflowInstancesGetGet } from '@/services/workflow/WorkflowInstances';
import { useRequest } from "umi";
import { WorkflowStatusTextRender } from "@/pages/appWorkflow/_utils/workflowStatusRender";
import moment from 'dayjs'
import WorkflowPressTransactionDialog from "./WorkflowPressTransaction";
import WorkflowVisualizationSteps, { CurrentStepInfo } from "./WorkflowVisualizationSteps";
import { Card } from "@nokecy/qc-ui";
import { WorkflowStep } from "./workflowExecutionSteps";

const WorkflowInstanceInfo = (props: {
    correlationData: any,
    workflowInstanceId: any,
    /** @deprecated 使用流程可视化API，此参数已废弃 */
    steps?: WorkflowStep[],
    /** @deprecated 使用流程可视化API，此参数已废弃 */
    currentActivityName?: string | undefined
}) => {
    const { correlationData, workflowInstanceId } = props;
    const [currentStepInfo, setCurrentStepInfo] = useState<CurrentStepInfo>({});

    const { data, loading } = useRequest(() => { return ElsaWorkflowsApiEndpointsWorkflowInstancesGetGet({ id: workflowInstanceId || '' }) }, {
        formatResult: (res) => res,
        refreshDeps: [workflowInstanceId]
    });
    const labelStyle = { fontWeight: 700 };

    let workflowActivityIds: any;

    if (correlationData?.activityId) {
        if (correlationData.activityId.includes(',')) {
            workflowActivityIds = correlationData.activityId.split(',');
        } else if (correlationData.activityId.includes(';')) {
            workflowActivityIds = correlationData.activityId.split(';');
        } else {
            workflowActivityIds = [correlationData.activityId];
        }
    }

    return <Card title={"流程实例信息"}
        extra={
            //@ts-ignore
            data?.subStatus === 'Suspended' && <WorkflowPressTransactionDialog workflowInfo={{ workflowInstanceId, workflowActivityIds: workflowActivityIds }} />
        } defaultCollapsed={false} collapsible={true} loading={loading} style={{ marginBottom: 10 }}>

        <WorkflowVisualizationSteps
            workflowInstanceId={workflowInstanceId}
            workflowInstanceData={data}
            onStepsLoaded={setCurrentStepInfo}
        />

        <Descriptions >
            <Descriptions.Item label="流程名称" labelStyle={labelStyle}>{data?.name}</Descriptions.Item>
        </Descriptions>
        <Descriptions column={3}>
            <Descriptions.Item label="创建人" labelStyle={labelStyle}>{correlationData?.creator}</Descriptions.Item>
            <Descriptions.Item label="当前节点" labelStyle={labelStyle}>{currentStepInfo.currentActivityName || correlationData?.currentActivityName || '-'}</Descriptions.Item>
            <Descriptions.Item label="当前处理人" labelStyle={labelStyle}>{currentStepInfo.currentAssigneeName || correlationData?.currentAssigneeName || '-'}</Descriptions.Item>
        </Descriptions>

        <Descriptions column={3}>
            <Descriptions.Item label="创建时间" labelStyle={labelStyle}>{moment(data?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
            <Descriptions.Item label="最后执行时间" labelStyle={labelStyle}>{moment(data?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
            <Descriptions.Item label="状态" labelStyle={labelStyle}>{WorkflowStatusTextRender({ value: data?.subStatus, data: data })}</Descriptions.Item>
        </Descriptions>
    </Card>
}


export default WorkflowInstanceInfo;