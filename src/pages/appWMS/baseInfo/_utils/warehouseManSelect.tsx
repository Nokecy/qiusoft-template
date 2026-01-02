import { WarehouseManGetListAsync } from '@/services/wms/WarehouseMan';
import { Select } from '@formily/antd-v5';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';
const { Option } = AntSelect;

const getData = (value: string) => {
	return WarehouseManGetListAsync({ Filter: `name=*${value}`, SkipCount: 0, MaxResultCount: 20, Sorting: undefined }).then(a => {
		return a.items;
	});
};

const WarehouseManSelect = (props: SelectProps<any> & { disabledKeys?: any[]; showId?: boolean }, ref) => {
	const { showId = true } = props;

	const [state, setState] = useControllableValue<SelectValue>(props);

	const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500 });

	return (
		<span ref={ref}>
			<Select
				placeholder='选择仓管员'
				style={{ width: '100%' }}
				filterOption={false}
				showSearch
				{...props}
				loading={loading}
				onBlur={cancel}
				onSearch={value => {
					run(value);
				}}
				onDropdownVisibleChange={visible => {
					if (visible) {
						run('');
					}
				}}
				value={JSON.stringify(state) === '{}' ? undefined : state}
				onChange={e => {
					setState(e);
				}}
			>
				{data?.map(warehouseMan => (
					<Option value={warehouseMan.id!}>{`${warehouseMan.name}`}</Option>
				))}
			</Select>
		</span>
	);
};

export default React.forwardRef(WarehouseManSelect);
