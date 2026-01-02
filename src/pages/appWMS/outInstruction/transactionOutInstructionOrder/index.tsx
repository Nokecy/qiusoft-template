import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import OutInstructionOrderGrid from '@/pages/appWMS/outInstruction/_utils/outInstructionOrderGrid';
import { TransactionOrderOutInstruction, PickTask } from '@/services/wmsPermission';

const TransactionOutInstructionOrderOrderPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<OutInstructionOrderGrid
			orderType={20}
			updatePermissionName={TransactionOrderOutInstruction.Update}
			createPermissionName={TransactionOrderOutInstruction.Create}
			deletePermissionName={TransactionOrderOutInstruction.Delete}
			allocationPermissionName={TransactionOrderOutInstruction.Allocation}
			releasePickTaskPermissionName={PickTask.ReleasePickTask}
			deletePickTaskPermissionName={PickTask.Delete}
			verifyPermissionName={TransactionOrderOutInstruction.Verify}
			cancelVerifyPermissionName={TransactionOrderOutInstruction.CancelVerify}
			manualShipmentPermissionName={TransactionOrderOutInstruction.ManualShipment}
			callBackPermissionName={TransactionOrderOutInstruction.Delete}
			createRoute={'/appWMS/outInstruction/transactionOutInstructionOrder/form'}
			updateRoute={'/appWMS/outInstruction/transactionOutInstructionOrder/form'}
			girdHeaderTitle={'转库出库指令列表'}
			// createBtnName={'创建转库出库指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default TransactionOutInstructionOrderOrderPage;

export const routeProps = {
	name: '转库出库指令',
};