import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import InInstructionOrderGrid from '@/pages/appWMS/inInstruction/_utils/inInstructionOrderGrid';
import { CustomerIncomingInInstruction } from '@/services/wmsPermission';

const NoOrderInInstructionPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<InInstructionOrderGrid
			orderType={6}
			updatePermissionName={CustomerIncomingInInstruction.Update}
			createPermissionName={CustomerIncomingInInstruction.Create}
			deletePermissionName={CustomerIncomingInInstruction.Delete}
			createBoxNoPermissionName={CustomerIncomingInInstruction.CreateBoxNo}
			verifyPermissionName={CustomerIncomingInInstruction.Verify}
			cancelVerifyPermissionName={CustomerIncomingInInstruction.CancelVerify}
			receiveCompletedPermissionName={CustomerIncomingInInstruction.ReceiveCompleted}
			callBackPermissionName={CustomerIncomingInInstruction.Delete}
			createRoute={'/appWMS/inInstruction/customerIncomingInInstruction/form'}
			updateRoute={'/appWMS/inInstruction/customerIncomingInInstruction/form'}
			girdHeaderTitle={'客供入库指令列表'}
			createBtnName={'创建客供入库指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default NoOrderInInstructionPage;

export const routeProps = {
	name: '客供入库指令',
};
