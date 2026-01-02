import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import InInstructionOrderGrid from '@/pages/appWMS/inInstruction/_utils/inInstructionOrderGrid';
import { ProductionAssistInInstruction } from '@/services/wmsPermission';

const ProductionAssistInInstructionPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<InInstructionOrderGrid
			orderType={21}
			updatePermissionName={ProductionAssistInInstruction.Update}
			createPermissionName={ProductionAssistInInstruction.Create}
			deletePermissionName={ProductionAssistInInstruction.Delete}
			createBoxNoPermissionName={ProductionAssistInInstruction.CreateBoxNo}
			verifyPermissionName={ProductionAssistInInstruction.Verify}
			cancelVerifyPermissionName={ProductionAssistInInstruction.CancelVerify}
			receiveCompletedPermissionName={ProductionAssistInInstruction.ReceiveCompleted}
			callBackPermissionName={ProductionAssistInInstruction.Delete}
			createRoute={'/appWMS/inInstruction/productionAssistInInstruction/form'}
			updateRoute={'/appWMS/inInstruction/productionAssistInInstruction/form'}
			girdHeaderTitle={'减配入库指令列表'}
			createBtnName={'创建减配入库指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default ProductionAssistInInstructionPage;

export const routeProps = {
	name: '减配入库指令',
};
