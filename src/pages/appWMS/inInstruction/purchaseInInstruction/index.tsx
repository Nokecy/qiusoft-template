import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import InInstructionOrderGrid from '@/pages/appWMS/inInstruction/_utils/inInstructionOrderGrid';
import { PurchaseInInstruction } from '@/services/wmsPermission';

const PurchaseInInstructionPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<InInstructionOrderGrid
			orderType={5}
			updatePermissionName={PurchaseInInstruction.Update}
			createPermissionName={PurchaseInInstruction.Create}
			deletePermissionName={PurchaseInInstruction.Delete}
			verifyPermissionName={PurchaseInInstruction.Verify}
			cancelVerifyPermissionName={PurchaseInInstruction.CancelVerify}
			createBoxNoPermissionName={PurchaseInInstruction.CreateBoxNo}
			receiveCompletedPermissionName={PurchaseInInstruction.ReceiveCompleted}
			callBackPermissionName={PurchaseInInstruction.Delete} // 使用删除权限作为回写权限
			createRoute={'/appWMS/inInstruction/purchaseInInstruction/form'}
			updateRoute={'/appWMS/inInstruction/purchaseInInstruction/form'}
			girdHeaderTitle={'采购入库指令列表'}
			createBtnName={'创建采购入库指令'}
			showCallBackInToolbar={true} // 显示回写按钮在标题栏
		/>
	);
};

export default PurchaseInInstructionPage;

export const routeProps = {
	name: '采购入库指令',
};
