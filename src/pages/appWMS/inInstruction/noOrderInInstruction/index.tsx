import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import InInstructionOrderGrid from '@/pages/appWMS/inInstruction/_utils/inInstructionOrderGrid';
import { NoOrderInInstruction } from '@/services/wmsPermission';

const NoOrderInInstructionPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<InInstructionOrderGrid
			orderType={25}
			updatePermissionName={NoOrderInInstruction.Update}
			createPermissionName={NoOrderInInstruction.Create}
			deletePermissionName={NoOrderInInstruction.Delete}
			createBoxNoPermissionName={NoOrderInInstruction.CreateBoxNo}
			verifyPermissionName={NoOrderInInstruction.Verify}
			cancelVerifyPermissionName={NoOrderInInstruction.CancelVerify}
			receiveCompletedPermissionName={NoOrderInInstruction.ReceiveCompleted}
			callBackPermissionName={NoOrderInInstruction.Delete}
			createRoute={'/appWMS/inInstruction/noOrderInInstruction/form'}
			updateRoute={'/appWMS/inInstruction/noOrderInInstruction/form'}
			girdHeaderTitle={'杂入指令列表'}
			createBtnName={'创建杂入指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default NoOrderInInstructionPage;

export const routeProps = {
	name: '杂入指令',
};
