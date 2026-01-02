import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import OutInstructionOrderGrid from '@/pages/appWMS/outInstruction/_utils/outInstructionOrderGrid';
import { MaterialOutInstruction, PickTask } from '@/services/wmsPermission';

const IssedOutInstructionOrderPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<OutInstructionOrderGrid
			orderType={10}
			updatePermissionName={MaterialOutInstruction.Update}
			createPermissionName={MaterialOutInstruction.Create}
			deletePermissionName={MaterialOutInstruction.Delete}
			CancelDemandMergeName={MaterialOutInstruction.CancelDemandMerge}
			allocationPermissionName={MaterialOutInstruction.Allocation}
			releasePickTaskPermissionName={PickTask.ReleasePickTask}
			deletePickTaskPermissionName={PickTask.Delete}
			verifyPermissionName={MaterialOutInstruction.Verify}
			cancelVerifyPermissionName={MaterialOutInstruction.CancelVerify}
			manualShipmentPermissionName={MaterialOutInstruction.ManualShipment}
			callBackPermissionName={MaterialOutInstruction.Delete}
			createRoute={'/appWMS/outInstruction/materialOutInstruction/form'}
			updateRoute={'/appWMS/outInstruction/materialOutInstruction/form'}
			girdHeaderTitle={'领料出库指令列表'}
			// createBtnName={'创建领料指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default IssedOutInstructionOrderPage;
export const routeProps = {
	name: '领料出库指令',
};