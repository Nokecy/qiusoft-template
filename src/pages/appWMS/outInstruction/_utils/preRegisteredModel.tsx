import { ICellRendererParams } from 'ag-grid-community';
import { useControllableValue } from 'ahooks';
import { Select, SelectProps, Tag } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React from 'react';

const PreRegisteredModel = (props: ICellRendererParams) => {
	const { value } = props;

	const renderPreRegisteredModel = text => {
		switch (text) {
			case 5:
				return <Tag color={'processing'}>按LPN预占</Tag>;
			case 10:
				return <Tag color={'processing'}>按ITEM预占</Tag>;
			case 15:
				return <Tag color={'cyan'}>按批次预占</Tag>;
			case undefined:
				return '';
			default:
				return '未知';
		}
	};

	return renderPreRegisteredModel(value);
};

const { Option } = Select;

const PreRegisteredModelSelect = (props: SelectProps<any>) => {
	const [state, setState] = useControllableValue<SelectValue>(props);
	const gradeMap = [
		{ label: '按LPN预占', value: '5' },
		{ label: '按ITEM预占', value: '10' },
		{ label: '按批次预占', value: '15' },
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
				<Option value={i.value}>{i.label}</Option>
			))}
		</Select>
	);
};

export { PreRegisteredModel };
export default PreRegisteredModelSelect;
