import { useControllableValue } from 'ahooks';
import { Select, Tag } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React, { useState } from 'react';

const { Option } = Select;
const OrderSelect = (props: SelectProps<any>) => {
	const [state, setState] = useControllableValue<SelectValue>(props);
	const gradeMap = [
		{ label: '指令盘点', value: '5' },
		{ label: '循环盘点', value: '10' },
		{ label: '冻结盘点', value: '15' },
		{ label: '主动盘点', value: '20' },
		{ label: '退库盘点', value: '25' },
	];

	return (
		<Select
			style={{ width: '100%' }}
			filterOption={false}
			{...props}
			value={state}
			onChange={e => {
				setState(e);
			}}
		>
			{gradeMap.map((i: any) => (
				<Option value={Number(i.value)}>{i.label}</Option>
			))}
		</Select>
	);
};

export default OrderSelect;
