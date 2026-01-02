import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import OutInstructionOrderGrid from '@/pages/appWMS/outInstruction/_utils/outInstructionOrderGrid';
import { CustomerOutInstruction, PickTask } from '@/services/wmsPermission';

const PurchaseOutInstructionOrder: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<OutInstructionOrderGrid
			orderType={16}
			updatePermissionName={CustomerOutInstruction.Update}
			createPermissionName={CustomerOutInstruction.Create}
			deletePermissionName={CustomerOutInstruction.Delete}
			allocationPermissionName={CustomerOutInstruction.Allocation}
			releasePickTaskPermissionName={PickTask.ReleasePickTask}
			deletePickTaskPermissionName={PickTask.Delete}
			verifyPermissionName={CustomerOutInstruction.Verify}
			cancelVerifyPermissionName={CustomerOutInstruction.CancelVerify}
			manualShipmentPermissionName={CustomerOutInstruction.ManualShipment}
			callBackPermissionName={CustomerOutInstruction.Delete}
			createRoute={'/appWMS/outInstruction/customerOutInstruction/form'}
			updateRoute={'/appWMS/outInstruction/customerOutInstruction/form'}
			girdHeaderTitle={'客供退货指令列表'}
			// createBtnName={'创建客供退货指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default PurchaseOutInstructionOrder;

export const routeProps = {
	name: '采购退货指令',
};
