import { useControllableValue } from 'ahooks';
import { Select, SelectProps } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = Select;

const gradeMap = [
	{ label: '等待收货', value: '10' },
	{ label: '部分收货', value: '20' },
	{ label: '收货完成', value: '30' },
	{ label: '部分上架', value: '40' },
	{ label: '上架完成', value: '50' },
];

const InInstructionOrderStatusSelect = (props: SelectProps<any>) => {
	const [state, setState] = useControllableValue<SelectValue>(props);

	return (
		<Select {...props} value={state} onChange={setState}>
			{gradeMap.map((i: any) => (
				<Option key={i.value} value={Number(i.value)}>
					{i.label}
				</Option>
			))}
		</Select>
	);
};

export default InInstructionOrderStatusSelect;
