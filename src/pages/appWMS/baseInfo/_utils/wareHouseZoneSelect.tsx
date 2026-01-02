import { DialogSelect } from '@/components';
import { WarehouseZoneGetListAsync } from '@/services/wms/WarehouseZone';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React, { useEffect } from 'react';
const { Option, OptGroup } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount, warehouseId }: any) => {
	// 如果没有warehouseId，返回空结果
	if (!warehouseId) {
		return Promise.resolve({ items: [], totalCount: 0 });
	}

	return WarehouseZoneGetListAsync({
		Filter: Filter ? `warehouseId=${warehouseId},${Filter}` : `warehouseId=${warehouseId}`,
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

	// 当warehouseId改变时重新加载数据
	useEffect(() => {
		if (props.warehouseId) {
			run({});
		}
	}, [props.warehouseId]);

	return (
		<span ref={ref}>
			<DialogSelect
				placeholder='选择库区'
				style={{ width: '100%' }}
				filterOption={false}
				showSearch
				{...props}
				onSearch={value => {
					run({ Filter: `code=*${value}|remark=*${value}` });
				}}
				onDropdownVisibleChange={visible => {
					visible && props.warehouseId && run({});
				}}
				labelInValue
				loading={loading}
				onBlur={cancel}
				value={JSON.stringify(state) === '{}' ? undefined : state}
				onChange={e => {
					setState(e);
				}}
				request={Filter => {
					return getData({ ...Filter, warehouseId: props.warehouseId });
				}}
				columnDefs={[
					{ field: 'code', headerName: '编码', flex: 1 },
					{ field: 'name', headerName: '名称', flex: 1 },
					{ field: 'type', headerName: '类别', flex: 1 },
				]}
			>
				{data?.items!.map(wareHouse => <Option value={wareHouse.id!}>{`${wareHouse.name}(${wareHouse.code})`}</Option>)}
			</DialogSelect>
		</span>
	);
};

export default React.forwardRef(WareHouseZoneSelect);
