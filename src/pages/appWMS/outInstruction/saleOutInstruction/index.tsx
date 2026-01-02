import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import OutInstructionOrderGrid from '@/pages/appWMS/outInstruction/_utils/outInstructionOrderGrid';
import { SaleOutInstruction, PickTask } from '@/services/wmsPermission';

const SaleOutInstructionOrderPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<OutInstructionOrderGrid
			orderType={5}
			updatePermissionName={SaleOutInstruction.Update}
			createPermissionName={SaleOutInstruction.Create}
			deletePermissionName={SaleOutInstruction.Delete}
			allocationPermissionName={SaleOutInstruction.Allocation}
			releasePickTaskPermissionName={PickTask.ReleasePickTask}
			deletePickTaskPermissionName={PickTask.Delete}
			verifyPermissionName={SaleOutInstruction.Verify}
			cancelVerifyPermissionName={SaleOutInstruction.CancelVerify}
			manualShipmentPermissionName={SaleOutInstruction.ManualShipment}
			callBackPermissionName={SaleOutInstruction.Delete}
			createRoute={'/appWMS/outInstruction/saleOutInstruction/form'}
			updateRoute={'/appWMS/outInstruction/saleOutInstruction/form'}
			girdHeaderTitle={'销售出库指令列表'}
			createBtnName={'创建销售出库指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default SaleOutInstructionOrderPage;

export const routeProps = {
	name: '销售出库指令',
};