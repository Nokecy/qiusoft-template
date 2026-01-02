import { Button, message } from 'antd';
import React, { useState } from 'react';
import { Access, useMutation } from 'umi';
import { OutInstructionOrderAllotAsync } from '@/services/wms/OutInstructionOrder';

/**
 * 出库指令分配按钮
 * @param props
 * @returns
 */
const OutInstructionAllocationBtn = (props: any) => {
	const { outInstructionOrderItem, outInstructionOrder, onSubmited } = props;

	const OutInstructionOrderAllocationItem = () => {
		const hide = message.loading('正在操作,请稍后', 0);
		OutInstructionOrderAllotAsync({ orders: [{ id: outInstructionOrder.id }, { itemIds: outInstructionOrderItem.map((i) => i.id) }] })
			.then(() => {
				onSubmited && onSubmited();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Access accessible={Array.isArray(outInstructionOrderItem) && outInstructionOrderItem.length > 0}>
			<Button
				type={'primary'}
				onClick={() => {
					OutInstructionOrderAllocationItem();
				}}
			>
				系统分配
			</Button>
		</Access>
	);
};

export default OutInstructionAllocationBtn;
