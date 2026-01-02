import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import OutInstructionOrderGrid from '@/pages/appWMS/outInstruction/_utils/outInstructionOrderGrid';
import { PurchaseOutInstruction, PickTask } from '@/services/wmsPermission';

const PurchaseOutInstructionOrder: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<OutInstructionOrderGrid
			orderType={15}
			updatePermissionName={PurchaseOutInstruction.Update}
			createPermissionName={PurchaseOutInstruction.Create}
			deletePermissionName={PurchaseOutInstruction.Delete}
			allocationPermissionName={PurchaseOutInstruction.Allocation}
			releasePickTaskPermissionName={PickTask.ReleasePickTask}
			deletePickTaskPermissionName={PickTask.Delete}
			verifyPermissionName={PurchaseOutInstruction.Verify}
			cancelVerifyPermissionName={PurchaseOutInstruction.CancelVerify}
			manualShipmentPermissionName={PurchaseOutInstruction.ManualShipment}
			callBackPermissionName={PurchaseOutInstruction.Delete}
			createRoute={'/appWMS/outInstruction/purchaseOutInstructionOrder/form'}
			updateRoute={'/appWMS/outInstruction/purchaseOutInstructionOrder/form'}
			girdHeaderTitle={'采购退货指令列表'}
			createBtnName={'创建采购退货指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default PurchaseOutInstructionOrder;

export const routeProps = {
	name: '采购退货指令',
};
