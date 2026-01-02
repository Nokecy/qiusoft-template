import { Select } from '@formily/antd-v5';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';
const { Option } = AntSelect;

const Types = [
	{ label: '等待处理', value: 5 },
	{ label: '正在调拨', value: 10 },
	{ label: '调拨出库', value: 15 },
	{ label: '调拨入库', value: 20 },
	{ label: '取消', value: 25 },
];

const StoreTransferOrderStatusSelect = (props: SelectProps<any>) => {
	const [state, setState] = useControllableValue<SelectValue>(props);

	return (
		<span>
			<Select
				placeholder='选择状态'
				style={{ width: '100%' }}
				filterOption={false}
				showSearch
				{...props}
				value={JSON.stringify(state) === '{}' ? undefined : state}
				onChange={e => {
					setState(e);
				}}
			>
				{Types.map(scheme => {
					return <Option key={scheme.value} value={scheme.value!}>{`${scheme.label}`}</Option>;
				})}
			</Select>
		</span>
	);
};

export default StoreTransferOrderStatusSelect
