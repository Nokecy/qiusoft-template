import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import InInstructionOrderGrid from '@/pages/appWMS/inInstruction/_utils/inInstructionOrderGrid';
import { SaleReturnInInstruction } from '@/services/wmsPermission';

const SaleReturnInInstructionPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<InInstructionOrderGrid
			orderType={10}
			updatePermissionName={SaleReturnInInstruction.Update}
			createPermissionName={SaleReturnInInstruction.Create}
			deletePermissionName={SaleReturnInInstruction.Delete}
			createBoxNoPermissionName={SaleReturnInInstruction.CreateBoxNo}
			verifyPermissionName={SaleReturnInInstruction.Verify}
			cancelVerifyPermissionName={SaleReturnInInstruction.CancelVerify}
			receiveCompletedPermissionName={SaleReturnInInstruction.ReceiveCompleted}
			callBackPermissionName={SaleReturnInInstruction.Delete}
			createRoute={'/appWMS/inInstruction/saleReturnInInstruction/form'}
			updateRoute={'/appWMS/inInstruction/saleReturnInInstruction/form'}
			girdHeaderTitle={'销售退库指令列表'}
			createBtnName={'创建销售退库指令'}
			showCallBackInToolbar={true}
		/>
	);
};

export default SaleReturnInInstructionPage;

export const routeProps = {
	name: '销售退库指令',
};
