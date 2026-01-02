import { ICellRendererParams } from 'ag-grid-community';
import { useControllableValue } from 'ahooks';
import { Select, SelectProps, Tag } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React from 'react';

const PickType = (props: ICellRendererParams) => {
	const { value } = props;

	const renderPickType = text => {
		switch (text) {
			case 10:
				return <Tag color={'processing'}>先进先出</Tag>;
			case 20:
				return <Tag color={'processing'}>滚动发料</Tag>;
			case 30:
				return <Tag color={'processing'}>按批次发料</Tag>;
			case undefined:
				return '';
			default:
				return '未知';
		}
	};

	return renderPickType(value);
};

const { Option } = Select;

const PickTypeSelect = (props: SelectProps<any>) => {
	const [state, setState] = useControllableValue<SelectValue>(props);
	const gradeMap = [
		{ label: '先进先出', value: '10' },
		{ label: '滚动发料', value: '20' },
		{ label: '按批次', value: '30' },
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

export { PickType };
export default PickTypeSelect;
