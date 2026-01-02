import { Button, message } from 'antd';
import React from 'react';
import { Access, useAccess, useIntl } from 'umi';
import { PickTaskItemManualAllocationAsync } from '@/services/wms/PickTaskItem';
import { PickTask } from '@/services/wmsPermission';
import ChoseLpnModal from './choseLpnModal';

/**
 * 下架任务手动分配按钮
 * @param props
 * @returns
 */
const PickTaskManualAllocationBtn = (props: any) => {
	const { outInstructionOrder, pickTaskItem, onSubmited } = props;
	const intl = useIntl();
	const access = useAccess();

	return (
		<Access accessible={access[PickTask.ManualAllocation] && pickTaskItem?.pickItemStatus <= 5}>
			<ChoseLpnModal
				masterSelect={outInstructionOrder}
				itemSelect={pickTaskItem}
				type={'primary'}
				otherSubmitFunc={items => {
					items.forEach(i => {
						i.quantity = i.quantity * 1;
					});
					PickTaskItemManualAllocationAsync({ pickTaskId: pickTaskItem.id, manualItems: items }).then(() => {});
				}}
			>
				手动分配
			</ChoseLpnModal>
		</Access>
	);
};

export default PickTaskManualAllocationBtn;
