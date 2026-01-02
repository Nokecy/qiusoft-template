import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import InInstructionOrderGrid from '@/pages/appWMS/inInstruction/_utils/inInstructionOrderGrid';
import { TransactionOrderInInstruction } from '@/services/wmsPermission';

const TransactionOrderInInstructionOrderPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<InInstructionOrderGrid
			orderType={22}
			updatePermissionName={TransactionOrderInInstruction.Update}
			createPermissionName={TransactionOrderInInstruction.Create}
			deletePermissionName={TransactionOrderInInstruction.Delete}
			createBoxNoPermissionName={TransactionOrderInInstruction.CreateBoxNo}
			verifyPermissionName={TransactionOrderInInstruction.Verify}
			cancelVerifyPermissionName={TransactionOrderInInstruction.CancelVerify}
			receiveCompletedPermissionName={TransactionOrderInInstruction.ReceiveCompleted}
			callBackPermissionName={TransactionOrderInInstruction.Delete}
			createRoute={'/appWMS/inInstruction/transactionOrderInInstruction/form'}
			updateRoute={'/appWMS/inInstruction/transactionOrderInInstruction/form'}
			girdHeaderTitle={'转库入库指令列表'}
			createBtnName={'创建转库入库指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default TransactionOrderInInstructionOrderPage;

export const routeProps = {
	name: '转库入库指令',
};
