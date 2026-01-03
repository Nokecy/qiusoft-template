import { WorkflowVisualizationGetSteps } from "@/services/workflow/WorkflowVisualization";
import { Popover, Steps, Tooltip } from "antd";
import React from "react";
import { useRequest } from "umi";
import moment from 'dayjs';

// 步骤状态枚举映射
const StepStatus = {
    0: 'NotStarted',   // 未开始
    1: 'InProgress',   // 进行中
    2: 'Completed',    // 已完成
    3: 'Failed',       // 失败/取消
} as const;

// 审批人状态
const ApproverStatus = {
    0: 'Pending',      // 待处理
    1: 'Completed',    // 已完成
} as const;

export interface CurrentStepInfo {
    currentActivityName?: string;
    currentAssigneeName?: string;
}

interface WorkflowVisualizationStepsProps {
    workflowInstanceId: string;
    workflowInstanceData?: any;
    /** 步骤数据加载完成回调，返回当前节点信息 */
    onStepsLoaded?: (info: CurrentStepInfo) => void;
}

/**
 * 基于流程可视化API的步骤组件
 * 使用 WorkflowVisualizationGetSteps API 获取步骤数据并渲染
 */
const WorkflowVisualizationSteps: React.FC<WorkflowVisualizationStepsProps> = (props) => {
    const { workflowInstanceId, workflowInstanceData, onStepsLoaded } = props;

    const { data: stepsData, loading } = useRequest(
        () => WorkflowVisualizationGetSteps({ workflowInstanceId: workflowInstanceId || '' }),
        {
            formatResult: (res) => res,
            refreshDeps: [workflowInstanceId],
            ready: !!workflowInstanceId,
            onSuccess: (data) => {
                if (onStepsLoaded && data) {
                    // 找到当前进行中的步骤
                    const currentStep = data.find((step: any) => step.status === 1);
                    if (currentStep) {
                        // 获取当前处理人的辅助函数
                        const getAssigneeNames = (step: any): string | undefined => {
                            // 优先使用 currentAssigneeName
                            if (step.currentAssigneeName) {
                                return step.currentAssigneeName;
                            }
                            // 从 completion.approvers 中获取待处理（status=0）的审批人
                            if (step.completion?.approvers?.length) {
                                const pendingApprovers = step.completion.approvers
                                    .filter((a: any) => a.status === 0)
                                    .map((a: any) => a.userName)
                                    .filter(Boolean);
                                if (pendingApprovers.length > 0) {
                                    return pendingApprovers.join(', ');
                                }
                            }
                            return undefined;
                        };

                        // 如果是并行节点，合并显示名称和处理人
                        if (currentStep.isParallel && currentStep.parallelNodes?.length) {
                            const names = currentStep.parallelNodes.map((n: any) => n.displayName).join(' / ');
                            const assignees = currentStep.parallelNodes
                                .map((n: any) => getAssigneeNames(n))
                                .filter(Boolean)
                                .join(', ');
                            onStepsLoaded({
                                currentActivityName: names,
                                currentAssigneeName: assignees || undefined,
                            });
                        } else {
                            onStepsLoaded({
                                currentActivityName: currentStep.displayName,
                                currentAssigneeName: getAssigneeNames(currentStep),
                            });
                        }
                    } else {
                        // 没有进行中的步骤
                        onStepsLoaded({
                            currentActivityName: undefined,
                            currentAssigneeName: undefined,
                        });
                    }
                }
            },
        }
    );

    // 转换状态为显示文本
    const getStatusText = (status?: number) => {
        switch (status) {
            case 0: return '未开始';
            case 1: return '进行中';
            case 2: return '已完成';
            case 3: return '已取消';
            default: return '未知';
        }
    };

    // 转换状态为 Steps 组件的 status
    const getStepsStatus = (step: API.VoloAbpElsaAbstractModelsVisualizationWorkflowStepDto, currentIndex: number, stepIndex: number): 'wait' | 'process' | 'finish' | 'error' => {
        const status = step.status;
        if (status === 3) return 'error'; // 失败/取消
        if (status === 2) return 'finish'; // 已完成
        if (status === 1) return 'process'; // 进行中
        return 'wait'; // 未开始
    };

    // 计算当前进行到第几步
    const getCurrentStepIndex = () => {
        if (!stepsData || stepsData.length === 0) return 0;

        // 检查是否有进行中的步骤
        const inProgressIndex = stepsData.findIndex((step: any) => step.status === 1);
        if (inProgressIndex !== -1) return inProgressIndex + 1; // +1 因为有"开始"步骤

        // 检查所有步骤是否都已完成
        const allCompleted = stepsData.every((step: any) => step.status === 2);
        if (allCompleted) {
            return stepsData.length + 1; // 指向"结束"节点
        }

        // 找到最后一个完成的步骤
        const lastCompletedIndex = stepsData.reduce((acc: number, step: any, index: number) => {
            return step.status === 2 ? index : acc;
        }, -1);

        return lastCompletedIndex + 2; // +1 for "开始" + 1 for next step
    };

    // 构建步骤描述（包含时间和处理人信息）
    const buildStepDescription = (step: API.VoloAbpElsaAbstractModelsVisualizationWorkflowStepDto) => {
        const parts: string[] = [];

        // 状态文本
        parts.push(getStatusText(step.status));

        // 当前处理人（进行中时显示）
        if (step.status === 1) {
            let assigneeName = step.currentAssigneeName;
            // 如果 currentAssigneeName 为空，从 completion.approvers 中获取待处理的审批人
            if (!assigneeName && step.completion?.approvers?.length) {
                const pendingApprovers = step.completion.approvers
                    .filter((a: any) => a.status === 0)
                    .map((a: any) => a.userName)
                    .filter(Boolean);
                if (pendingApprovers.length > 0) {
                    assigneeName = pendingApprovers.join(', ');
                }
            }
            if (assigneeName) {
                parts.push(`处理人: ${assigneeName}`);
            }
        }

        // 完成进度（会签时显示）
        if (step.isParallel && step.completion) {
            const { completedCount, totalCount, percentage } = step.completion;
            if (totalCount && totalCount > 0) {
                parts.push(`${completedCount}/${totalCount} (${percentage}%)`);
            }
        }

        return parts.join(' | ');
    };

    // 渲染并行节点的详细信息（用于Tooltip）
    const renderParallelNodesInfo = (parallelNodes?: API.VoloAbpElsaAbstractModelsVisualizationParallelNodeInfo[]) => {
        if (!parallelNodes || parallelNodes.length === 0) return null;

        return (
            <div style={{ maxWidth: 300 }}>
                {parallelNodes.map((node, index) => (
                    <div key={node.nodeId || index} style={{ marginBottom: 4, padding: '4px 0', borderBottom: index < parallelNodes.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                        <div><strong>{node.displayName}</strong></div>
                        <div style={{ fontSize: 12, color: '#666' }}>
                            状态: {getStatusText(node.status)}
                            {node.currentAssigneeName && ` | 处理人: ${node.currentAssigneeName}`}
                        </div>
                        {node.completion && node.completion.totalCount && node.completion.totalCount > 0 && (
                            <div style={{ fontSize: 12, color: '#999' }}>
                                进度: {node.completion.completedCount}/{node.completion.totalCount} ({node.completion.percentage}%)
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    // 构建步骤标题
    const buildStepTitle = (step: API.VoloAbpElsaAbstractModelsVisualizationWorkflowStepDto) => {
        const title = step.isParallel && step.parallelNodes?.length
            ? step.parallelNodes.map(n => n.displayName).join(' / ')
            : step.displayName;

        // 如果是并行节点，添加Tooltip显示详细信息
        if (step.isParallel && step.parallelNodes && step.parallelNodes.length > 0) {
            return (
                <Popover
                    title="会签节点详情"
                    content={renderParallelNodesInfo(step.parallelNodes)}
                    trigger="hover"
                >
                    <span style={{ cursor: 'pointer', borderBottom: '1px dashed #999' }}>{title}</span>
                </Popover>
            );
        }

        return title;
    };

    // 判断流程是否已结束
    const isWorkflowFinished = () => {
        if (!stepsData || stepsData.length === 0) return false;

        // 检查所有步骤是否都已完成
        const allCompleted = stepsData.every((step: any) => step.status === 2);
        if (allCompleted) return true;

        // 检查工作流实例状态
        const subStatus = workflowInstanceData?.subStatus;
        return subStatus === 'Finished' || subStatus === 'Completed';
    };

    // 构建 Steps 组件的 items
    const buildStepsItems = () => {
        if (!stepsData || stepsData.length === 0) {
            return [
                { title: '开始', description: '未开始' },
                { title: '结束', description: '未开始' }
            ];
        }

        const finished = isWorkflowFinished();
        const cancelled = workflowInstanceData?.subStatus === 'Cancelled';

        const items = [
            {
                title: '开始',
                description: workflowInstanceData?.name ? '已完成' : '未开始'
            },
            ...stepsData.map((step: API.VoloAbpElsaAbstractModelsVisualizationWorkflowStepDto, index: number) => ({
                title: buildStepTitle(step),
                description: buildStepDescription(step),
            })),
            {
                title: '结束',
                description: cancelled ? '已取消' : (finished ? '已完成' : '未开始')
            }
        ];

        return items;
    };

    // 确定整体状态
    const getOverallStatus = (): 'wait' | 'process' | 'finish' | 'error' => {
        if (!stepsData || stepsData.length === 0) return 'wait';

        // 检查是否有失败/取消的步骤
        const hasFailed = stepsData.some((step: any) => step.status === 3);
        if (hasFailed) return 'error';

        // 检查工作流实例状态
        const subStatus = workflowInstanceData?.subStatus;
        if (subStatus === 'Cancelled') return 'error';

        return 'process';
    };

    if (loading) {
        return <div style={{ padding: '8px 0', color: '#999' }}>加载中...</div>;
    }

    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <Steps
                size="small"
                status={getOverallStatus()}
                current={getCurrentStepIndex()}
                labelPlacement="vertical"
                items={buildStepsItems()}
            />
        </div>
    );
};

export default WorkflowVisualizationSteps;
