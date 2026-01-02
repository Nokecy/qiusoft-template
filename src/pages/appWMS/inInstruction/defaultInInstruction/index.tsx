import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
// import InInstructionOrderGridExpect from '@/pages/appWMS/inInstruction/_utils/inInstructionOrderGridExpect';
import { DefaultOrderInInstruction } from '@/services/wmsPermission';
import InInstructionOrderGridExpect from './components/inInstructionOrderGridExpect';

const NoOrderInInstructionExpectPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<InInstructionOrderGridExpect
			orderType={0}
			importPermissionName={DefaultOrderInInstruction.Update}
			updatePermissionName={DefaultOrderInInstruction.Update}
			createPermissionName={DefaultOrderInInstruction.Create}
			deletePermissionName={DefaultOrderInInstruction.Delete}
			createBoxNoPermissionName={DefaultOrderInInstruction.CreateBoxNo}
			verifyPermissionName={DefaultOrderInInstruction.Verify}
			cancelVerifyPermissionName={DefaultOrderInInstruction.CancelVerify}
			receiveCompletedPermissionName={DefaultOrderInInstruction.ReceiveCompleted}
			callBackPermissionName={DefaultOrderInInstruction.Delete}
			createRoute={'/appWMS/inInstruction/defaultInInstruction/form'}
			updateRoute={'/appWMS/inInstruction/defaultInInstruction/form'}
			girdHeaderTitle={'期初入库列表'}
			createBtnName={'创建'}
			showCallBackInToolbar={true}
		/>
	);
};

export default NoOrderInInstructionExpectPage;

export const routeProps = {
	name: '期初入库指令',
};
