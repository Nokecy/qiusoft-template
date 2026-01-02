import { useControllableValue } from 'ahooks';
import { Select, SelectProps } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = Select;

const gradeMap = [
	{ label: '欠料', value: 5 },
	{ label: '指令已下发', value: 10 },
	{ label: '捡料中', value: 15 },
	{ label: '欠料交付', value: 19 },
	{ label: '已交付', value: 20 },
	{ label: '取消', value: 25 },
];

const PickTaskItemStatusSelect = (props: SelectProps<any>) => {
	const [state, setState] = useControllableValue<SelectValue>(props);

	return (
		<Select {...props} value={state} onChange={setState}>
			{gradeMap.map((i: any) => (
				<Option key={i.value} value={i.value}>
					{i.label}
				</Option>
			))}
		</Select>
	);
};

export default PickTaskItemStatusSelect;
