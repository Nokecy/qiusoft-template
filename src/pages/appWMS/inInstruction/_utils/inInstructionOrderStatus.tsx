import { connect } from '@formily/react';
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

const InInstructionOrderStatus = (props: SelectProps<any>) => {
	// 默认值：等待收货(10)和部分收货(20)
	const defaultValue = [10, 20];

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
			placeholder="请选择指令状态"
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

export default InInstructionOrderStatus;
