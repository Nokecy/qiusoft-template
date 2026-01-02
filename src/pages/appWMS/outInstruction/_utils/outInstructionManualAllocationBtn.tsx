import { Button, message } from 'antd';
import React from 'react';
import { Access, useAccess, useIntl } from 'umi';
import ChoseLpnModal from './choseLpnModal';
import { PickTask } from '@/services/wmsPermission';

/**
 * 出库指令手动分配按钮
 * @param props
 * @returns
 */
const OutInstructionManualAllocationBtn = (props: any) => {
	const { outInstructionOrder, outInstructionOrderItem, onSubmited } = props;

	const intl = useIntl();
	const access = useAccess();

	return (
		<Access accessible={access[PickTask.ManualAllocation] && (outInstructionOrderItem?.pickItemStatus < 10 || outInstructionOrderItem?.pickItemStatus == 11)}>
			<ChoseLpnModal masterSelect={outInstructionOrder} itemSelect={outInstructionOrderItem} type={'primary'} onAfterSubmit={() => onSubmited()}>
				手动分配
			</ChoseLpnModal>
		</Access>
	);
};

export default OutInstructionManualAllocationBtn;
