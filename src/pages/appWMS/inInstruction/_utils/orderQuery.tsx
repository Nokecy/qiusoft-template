import { connect } from '@formily/react';
import { useControllableValue } from 'ahooks';
import { Select, SelectProps } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React from 'react';
const { Option } = Select;

const OrderQuery = (props: any) => {
	const gradeMap = [
		{ label: '草稿', value: '5' },
		{ label: '提交', value: '10' },
		{ label: '审核', value: '15' },
		{ label: '退回修改', value: '20' },
	];

	return (
		<Select {...props}>
			{gradeMap.map((i: any) => (
				<Option value={Number(i.value)}>{i.label}</Option>
			))}
		</Select>
	);
};

const OrderSelect = (props: SelectProps<any>) => {
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
export default OrderQuery;
export { OrderSelect };
