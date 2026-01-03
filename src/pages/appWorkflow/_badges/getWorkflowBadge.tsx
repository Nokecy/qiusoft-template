import { WorkflowBadgeGetBadgeInfo } from '@/services/workflow/WorkflowBadge';

const getWorkflowBadge = () => {
	return WorkflowBadgeGetBadgeInfo({}).then(badgeInfo => {
		return badgeInfo;
	});
};

export default getWorkflowBadge;
