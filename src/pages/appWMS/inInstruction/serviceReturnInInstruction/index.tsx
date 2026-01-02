import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import InInstructionOrderGrid from '@/pages/appWMS/inInstruction/_utils/inInstructionOrderGrid';
import { ServiceReturnInInstruction } from '@/services/wmsPermission';

const ServiceReturnInInstructionPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<InInstructionOrderGrid
			orderType={23}
			updatePermissionName={ServiceReturnInInstruction.Update}
			createPermissionName={ServiceReturnInInstruction.Create}
			deletePermissionName={ServiceReturnInInstruction.Delete}
			createBoxNoPermissionName={ServiceReturnInInstruction.CreateBoxNo}
			verifyPermissionName={ServiceReturnInInstruction.Verify}
			cancelVerifyPermissionName={ServiceReturnInInstruction.CancelVerify}
			receiveCompletedPermissionName={ServiceReturnInInstruction.ReceiveCompleted}
			callBackPermissionName={ServiceReturnInInstruction.Delete}
			createRoute={'/appWMS/inInstruction/serviceReturnInInstruction/form'}
			updateRoute={'/appWMS/inInstruction/serviceReturnInInstruction/form'}
			girdHeaderTitle={'服务退料入库指令列表'}
			createBtnName={'创建服务退料入库指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default ServiceReturnInInstructionPage;

export const routeProps = {
	name: '服务退料入库指令',
};
