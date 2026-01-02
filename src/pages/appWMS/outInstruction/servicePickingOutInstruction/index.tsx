import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import OutInstructionOrderGrid from '@/pages/appWMS/outInstruction/_utils/outInstructionOrderGrid';
import { ServicePickingOutInstruction, PickTask } from '@/services/wmsPermission';

const ServicePickingOutInstructionPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<OutInstructionOrderGrid
			orderType={12}
			updatePermissionName={ServicePickingOutInstruction.Update}
			createPermissionName={ServicePickingOutInstruction.Create}
			deletePermissionName={ServicePickingOutInstruction.Delete}
			CancelDemandMergeName={ServicePickingOutInstruction.CancelDemandMerge}
			allocationPermissionName={ServicePickingOutInstruction.Allocation}
			releasePickTaskPermissionName={PickTask.ReleasePickTask}
			deletePickTaskPermissionName={PickTask.Delete}
			verifyPermissionName={ServicePickingOutInstruction.Verify}
			cancelVerifyPermissionName={ServicePickingOutInstruction.CancelVerify}
			manualShipmentPermissionName={ServicePickingOutInstruction.ManualShipment}
			callBackPermissionName={ServicePickingOutInstruction.Delete}
			createRoute={'/appWMS/outInstruction/servicePickingOutInstruction/form'}
			updateRoute={'/appWMS/outInstruction/servicePickingOutInstruction/form'}
			girdHeaderTitle={'服务领料出库指令列表'}
			createBtnName={'创建服务领料出库指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default ServicePickingOutInstructionPage;
export const routeProps = {
	name: '服务领料出库指令',
};
