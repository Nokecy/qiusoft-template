import { DialogSelect } from '@/components';
import { WarehouseManGetListAsync } from '@/services/wms/WarehouseMan';
import { Select } from '@formily/antd-v5';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';
const { Option } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
	return WarehouseManGetListAsync(
		{
			Filter: Filter ? Filter : undefined,
			SkipCount: SkipCount ? SkipCount : 0,
			MaxResultCount: MaxResultCount ? MaxResultCount : 300,
			Sorting: Sorting ? Sorting : undefined
		}
	)
};


const WarehouseManSelect = (props: SelectProps<any> & { disabledKeys?: any[]; showId?: boolean }, ref) => {
	const { showId = true } = props;

	const [state, setState] = useControllableValue<SelectValue>(props);

	const { data, loading, run, cancel } = useRequest(getData, { debounceWait: 500 });

	return (
		<span ref={ref}>
			<DialogSelect
				placeholder="选择仓管员"
				style={{ width: "100%" }}
				filterOption={false}
				showSearch
				{...props}
				onSearch={(value) => {
					run({ Filter: `name=*${value}` });
				}}
				onDropdownVisibleChange={(visible) => { visible && run({}) }}
				labelInValue
				loading={loading}
				onBlur={cancel}
				value={JSON.stringify(state) === "{}" ? undefined : state}
				onChange={e => { setState(e); }}
				valueField={"id"}
				request={getData}
				columnDefs={[
					{ field: "name", headerName: "姓名", flex: 1 },
					{ field: "userName", headerName: "联系方式", flex: 1 },
				]}
			>
				{data?.items!.map((i) => <Option value={i.id!}>{i.name}</Option>)}
			</DialogSelect>
		</span>
	);
};

export default React.forwardRef(WarehouseManSelect);
