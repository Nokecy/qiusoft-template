import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import InInstructionOrderGrid from '@/pages/appWMS/inInstruction/_utils/inInstructionOrderGrid';
import { ProductionInInstruction } from '@/services/wmsPermission';

const ProductionInInstructionPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return (
		<InInstructionOrderGrid
			orderType={15}
			updatePermissionName={ProductionInInstruction.Update}
			createPermissionName={'DISABLED_CREATE_PERMISSION'} // 使用不存在的权限名禁用创建按钮
			deletePermissionName={ProductionInInstruction.Delete}
			createBoxNoPermissionName={ProductionInInstruction.CreateBoxNo}
			verifyPermissionName={ProductionInInstruction.Verify}
			cancelVerifyPermissionName={ProductionInInstruction.CancelVerify}
			receiveCompletedPermissionName={ProductionInInstruction.ReceiveCompleted}
			callBackPermissionName={ProductionInInstruction.Delete}
			createRoute={'/appWMS/inInstruction/productionInInstruction/form'}
			updateRoute={'/appWMS/inInstruction/productionInInstruction/form'}
			girdHeaderTitle={'生产入库指令列表'}
			createBtnName={''} // 设置为空字符串
			showCallBackInToolbar={true}
		/>
	);
};

export default ProductionInInstructionPage;

export const routeProps = {
	name: '生产入库指令',
};
