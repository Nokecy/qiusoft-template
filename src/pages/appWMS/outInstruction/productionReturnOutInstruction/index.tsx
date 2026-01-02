import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import OutInstructionOrderGrid from '@/pages/appWMS/outInstruction/_utils/outInstructionOrderGrid';
import { ProductionReturnOutInstruction, PickTask } from '@/services/wmsPermission';

const ProductionReturnOutInstructionPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<OutInstructionOrderGrid
			orderType={6}
			updatePermissionName={ProductionReturnOutInstruction.Update}
			createPermissionName={ProductionReturnOutInstruction.Create}
			deletePermissionName={ProductionReturnOutInstruction.Delete}
			allocationPermissionName={ProductionReturnOutInstruction.Allocation}
			releasePickTaskPermissionName={PickTask.ReleasePickTask}
			deletePickTaskPermissionName={PickTask.Delete}
			verifyPermissionName={ProductionReturnOutInstruction.Verify}
			cancelVerifyPermissionName={ProductionReturnOutInstruction.CancelVerify}
			manualShipmentPermissionName={ProductionReturnOutInstruction.ManualShipment}
			callBackPermissionName={ProductionReturnOutInstruction.Delete}
			createRoute={'/appWMS/outInstruction/materialOutInstruction/form'}
			updateRoute={'/appWMS/outInstruction/materialOutInstruction/form'}
			girdHeaderTitle={'生产退回出库指令列表'}
			// createBtnName={'创建生产退回指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default ProductionReturnOutInstructionPage;

export const routeProps = {
	name: '生产退回指令',
};
