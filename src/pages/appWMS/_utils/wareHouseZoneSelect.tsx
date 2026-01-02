import { DialogSelect } from '@/components';
import { WarehouseZoneGetListAsync } from '@/services/wms/WarehouseZone';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
const { Option, OptGroup } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount, warehouseId }: any) => {
	console.log(Filter)
    return WarehouseZoneGetListAsync({
		Filter: Filter ? `warehouse.Id=${warehouseId},${Filter}` : `warehouse.Id=${warehouseId}`,
		SkipCount: SkipCount ? SkipCount : 0,
		MaxResultCount: MaxResultCount ? MaxResultCount : 300,
		Sorting: Sorting ? Sorting : undefined,
	});
};

const WareHouseZoneSelect = (props: SelectProps<any> & { disabledKeys?: any[]; showId?: boolean; warehouseId?: string }, ref) => {
	const [state, setState] = useControllableValue<SelectValue>(props);
	const { data, loading, run, cancel } = useRequest(
		Filter => {
			return getData({ ...Filter, warehouseId: props.warehouseId });
		},
		{ debounceWait: 500, manual: true }
	);

	return (
		<span ref={ref}>
			<DialogSelect
				placeholder='选择库区'
				style={{ width: '100%' }}
				filterOption={false}
				showSearch
				labelInValue={true}
				{...props}
				onSearch={value => {
					run({ Filter: `code=*${value}` });
				}}
				onDropdownVisibleChange={visible => {
					visible && run({});
				}}
				loading={loading}
				onBlur={cancel}
				value={JSON.stringify(state) === '{}' ? undefined : state}
				onChange={(e, record: any) => {
					props.mode === 'multiple' ? setState(record) : setState(e);
				}}
				request={Filter => {
					return getData({ ...Filter, warehouseId: props.warehouseId });
				}}
				columnDefs={[
					{ field: 'code', headerName: '编码', flex: 1 },
					{ field: 'type', headerName: '类别', flex: 1 },
				]}
			>
				{data?.items!.map(item => <Option value={item.id!} data={item}>{`${item.code}`}</Option>)}
			</DialogSelect>
		</span>
	);
};

export default React.forwardRef(WareHouseZoneSelect);
