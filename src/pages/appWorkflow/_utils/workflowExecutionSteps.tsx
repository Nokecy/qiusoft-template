import { WorkflowExecutionLogGetListByInstance } from "@/services/workflow/WorkflowExecutionLog";
import { Steps } from "antd";
import React, { useEffect, useState } from "react";

export interface WorkflowStep {
    title?: string;
    description?: string;
    children?: WorkflowStep[];
}

export interface WorkflowExecutionStepProps {
    workflowInstanceId: string;
    steps: WorkflowStep[];
    currentActivityName: string | undefined;
    startStatus?: boolean;
    subData?: any
}

const WorkflowExecutionSteps = (props: WorkflowExecutionStepProps) => {
    const { workflowInstanceId, steps, currentActivityName, startStatus, subData } = props;
    const { subStatus } = subData || {};
    const [data, setData] = useState<any[]>([]);
    const [current, setCurrent] = useState(0);

    const transText = (stepIndex: number, currentIndex: number, isChild: boolean = false) => {
        if (subStatus === 'Cancelled') {
            if (subData?.workflowState?.properties?.IsRejected) {
				return '已驳回';
			} else if (subData?.workflowState?.properties?.IsTerminated) {
				return '已终止';
			} else {
				return '已取消'
			}
        }
        // if (subStatus === 'Rejected') return "已驳回";
        if (startStatus) return "未开始";
        if (!currentActivityName) return "已完成";
        return currentIndex === stepIndex
            ? "进行中"
            : currentIndex > stepIndex
                ? "已完成"
                : "未开始";
    };

    const getCurrentIndex = (steps: any[], currentName: string) => {
        const realName = currentName.includes(";") ? currentName.split(";")[0] : currentName;
        return steps.findIndex((step) => step.title?.includes(realName));
    };

    const getData = () => {
        const currentIndex = getCurrentIndex(steps, currentActivityName || "");

        const updatedSteps = steps.map((step, stepIndex) => {
            const title = step.children
                ? step.children.map((child) => child.title).join("/")
                : step.title;
            return {
                title,
                description: transText(stepIndex, currentIndex),
            };
        });

        setData([{ title: "开始" }, ...updatedSteps]);

        const currentStep = updatedSteps.findIndex((step) => step.description === "进行中");
        setCurrent(startStatus ? 0 : currentStep === -1 ? subStatus === 'Cancelled' ? steps.length : updatedSteps.length : currentStep + 1);
    };

    useEffect(() => {
        getData();
    }, [steps, currentActivityName, startStatus]);

    return <div style={{ width: "100%", overflowX: "auto" }}>
        <Steps size="small" status={subStatus === 'Cancelled' ? 'error' : 'process'} current={current} labelPlacement="vertical" items={data} />
    </div>;
};

export default WorkflowExecutionSteps;
