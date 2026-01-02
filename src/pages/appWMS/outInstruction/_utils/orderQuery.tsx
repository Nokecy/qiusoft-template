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
	const gradeMap = [
		{ label: '待排产', value: '-999' },
		{ label: '等待处理', value: '5' },
		{ label: '预占失败', value: '6' },
		{ label: '部分预占失败', value: '7' },
		{ label: '生成下架指令', value: '10' },
		{ label: '下架中', value: '15' },
		{ label: '部分交付', value: '18' },
		{ label: '欠料交付', value: '19' },
		{ label: '下架完成', value: '20' },
		{ label: '待复核', value: '21' },
		{ label: '复核中', value: '22' },
		{ label: '复核完成', value: '23' },
		{ label: '发运中', value: '25' },
		{ label: '发运完成', value: '30' }
	];

	// 默认值：除了下架完成(20)，其他都显示
	const defaultValue = gradeMap.filter(item => item.value !== '20').map(item => Number(item.value));

	const [state, setState] = useControllableValue<SelectValue>(props, {
		defaultValue: defaultValue
	});

	React.useEffect(() => {
		// 确保初始化时触发onChange
		if (state === undefined && props.onChange) {
			props.onChange(defaultValue, null as any);
		}
	}, []);

	return (
		<Select
			mode="multiple"
			style={{ width: '100%' }}
			placeholder="请选择出库状态"
			{...props}
			value={state}
			onChange={(value, option) => {
				setState(value);
				if (props.onChange) {
					props.onChange(value, option);
				}
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
