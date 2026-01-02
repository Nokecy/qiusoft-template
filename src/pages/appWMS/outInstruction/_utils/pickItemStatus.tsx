import { ICellRendererParams } from 'ag-grid-community';
import { useControllableValue } from 'ahooks';
import { Select, SelectProps, Tag } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React from 'react';

const PickItemStatus = (props: ICellRendererParams) => {
	const { value } = props;

	const renderPickType = text => {
		switch (text) {
			case 1:
				return <Tag color="red">等待处理</Tag>;
			case 5:
				return <Tag color="red">部分下发</Tag>;
			case 6:
				return <Tag color="red">库存预占失败</Tag>;
			case 10:
				return <Tag color="lime">指令已下发</Tag>;
			case 11:
				return <Tag color="orange">部分交付</Tag>;
			case 15:
				return <Tag color="orange">欠料交付</Tag>;
			case 20:
				return <Tag color="green">已交付</Tag>;
			case 25:
				return <Tag color="grey">取消</Tag>;
			case 26:
				return <Tag color="cyan">部分发运</Tag>;
			case 27:
				return <Tag color='success'>发运完成</Tag>;
			case undefined:
				return '';
			default:
				return '未知';
		}
	};
	

	return renderPickType(value);
};
const { Option } = Select;
const PickItemStatusSelect = (props: SelectProps<any>) => {
	const [state, setState] = useControllableValue<SelectValue>(props);
	const gradeMap = [
		{ label: '等待处理', value: 1 },
		{ label: '欠料', value: 5 },
		{ label: '指令已下发', value: 10 },
		{ label: '捡料中', value: 15 },
		{ label: '已交付', value: 20 },
		{ label: '取消', value: 25 },
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
				<Option value={i.value} key='gradeMap'>
					{i.label}
				</Option>
			))}
		</Select>
	);
};
export default PickItemStatus;
export { PickItemStatusSelect };
