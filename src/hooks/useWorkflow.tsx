import { WorkflowExecutionLogGetListByInstance } from '@/services/workflow/WorkflowExecutionLog';
import { WorkflowItemGetByActivity } from '@/services/workflow/WorkflowItem';
import { useEffect, useState } from 'react';

const useWorkflow = (workflowInstanceId, activityId, correlationId) => {
	const [workflowInfo, setWorkflowInfo] = useState<{ currentActivityName?: string; executionLogs?: any[] }>({});

	useEffect(() => {
		let disposed = false;

		async function load() {
			if (!workflowInstanceId || !activityId || !correlationId) {
				if (!disposed) setWorkflowInfo({});
				return;
			}

			const item = await WorkflowItemGetByActivity({
				activityId: activityId as string,
				correlationId: correlationId as string,
			});

			const executionValue = await WorkflowExecutionLogGetListByInstance({ instanceId: workflowInstanceId! });

			if (disposed) return;
			setWorkflowInfo({ currentActivityName: item?.activityDisplayName, executionLogs: executionValue.items });
		}

		load();
		return () => {
			disposed = true;
		};
	}, [activityId, workflowInstanceId, correlationId]);

	return workflowInfo;
};

export { useWorkflow };
export default useWorkflow;
