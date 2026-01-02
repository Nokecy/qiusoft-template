import React, { useRef } from 'react';
import { useAccess, useIntl } from 'umi';
import OutInstructionOrderForm from '@/pages/appWMS/outInstruction/_utils/outInstructionOrderForm';

const MiscOutInstructionPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();

	return <OutInstructionOrderForm orderType={6} title="生产退回出库指令" />
};

export default MiscOutInstructionPage;
export const routeProps = {
	name: '创建生产退回出库指令',
};