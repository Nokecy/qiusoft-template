import { useControllableValue } from 'ahooks';
import { Select, SelectProps } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = Select;

const OutInstructionOrderStatusSelect = (props: SelectProps<any>) => {
	const [state, setState] = useControllableValue<SelectValue>(props);
	const gradeMap = [
		{ label: '草稿', value: '5' },
		{ label: '提交', value: '10' },
		{ label: '审核', value: '15' },
		{ label: '退回修改', value: '20' },
	];

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

const OutInstructionItemStatusSelect = (props: SelectProps<any>) => {
	const [state, setState] = useControllableValue<SelectValue>(props);
	const gradeMap = [
		{ label: '待处理', value: '5' },
		{ label: '欠料', value: '6' },
		{ label: '部分欠料', value: '7' },
		{ label: '生成捡料', value: '10' },
		{ label: '下架中', value: '15' },
		{ label: '下架完成', value: '20' },
		{ label: '发运中', value: '25' },
		{ label: '发运完成', value: '30' },
	];

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

export { OutInstructionOrderStatusSelect };
export default OutInstructionItemStatusSelect;
