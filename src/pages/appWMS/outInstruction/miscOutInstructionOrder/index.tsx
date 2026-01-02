import React, { useEffect, useRef } from 'react';
import { useAccess, useIntl, useLocation } from 'umi';
import OutInstructionOrderGrid from '@/pages/appWMS/outInstruction/_utils/outInstructionOrderGrid';
import { NoOrderOutInstruction, PickTask } from '@/services/wmsPermission';
import usePrevLocation from '@/hooks/usePrevLocation';

const MiscOutInstructionOrderPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	const location = useLocation();
	const prevLocation = usePrevLocation(location);

	return (
		<OutInstructionOrderGrid
			orderType={11}
			updatePermissionName={NoOrderOutInstruction.Update}
			createPermissionName={NoOrderOutInstruction.Create}
			deletePermissionName={NoOrderOutInstruction.Delete}
			allocationPermissionName={NoOrderOutInstruction.Allocation}
			releasePickTaskPermissionName={PickTask.ReleasePickTask}
			deletePickTaskPermissionName={PickTask.Delete}
			verifyPermissionName={NoOrderOutInstruction.Verify}
			cancelVerifyPermissionName={NoOrderOutInstruction.CancelVerify}
			manualShipmentPermissionName={NoOrderOutInstruction.ManualShipment}
			callBackPermissionName={NoOrderOutInstruction.Delete}
			createRoute={'/appWMS/outInstruction/miscOutInstructionOrder/form'}
			updateRoute={'/appWMS/outInstruction/miscOutInstructionOrder/form'}
			girdHeaderTitle={'杂出出库指令列表'}
			createBtnName={'创建杂出出库指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default MiscOutInstructionOrderPage;
export const routeProps = {
	name: '杂出出库指令',
};
