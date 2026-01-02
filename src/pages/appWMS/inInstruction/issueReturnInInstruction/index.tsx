import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import InInstructionOrderGrid from '@/pages/appWMS/inInstruction/_utils/inInstructionOrderGrid';
import { IssueReturnInInstruction } from '@/services/wmsPermission';

const NoOrderInInstructionPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<InInstructionOrderGrid
			orderType={20}
			updatePermissionName={IssueReturnInInstruction.Update}
			createPermissionName={'DISABLED_CREATE_PERMISSION'} // 使用不存在的权限名禁用创建按钮
			deletePermissionName={IssueReturnInInstruction.Delete}
			createBoxNoPermissionName={IssueReturnInInstruction.CreateBoxNo}
			verifyPermissionName={IssueReturnInInstruction.Verify}
			cancelVerifyPermissionName={IssueReturnInInstruction.CancelVerify}
			receiveCompletedPermissionName={IssueReturnInInstruction.ReceiveCompleted}
			callBackPermissionName={IssueReturnInInstruction.Delete}
			createRoute={'/appWMS/inInstruction/issueReturnInInstruction/form'}
			updateRoute={'/appWMS/inInstruction/issueReturnInInstruction/form'}
			girdHeaderTitle={'生产退料指令列表'}
			createBtnName={''} // 设置为空字符串
			showCallBackInToolbar={true}
		/>
	);
};

export default NoOrderInInstructionPage;

export const routeProps = {
	name: '生产退料指令',
};
