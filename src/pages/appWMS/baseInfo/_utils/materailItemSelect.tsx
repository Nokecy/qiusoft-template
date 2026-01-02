import { DialogSelect } from '@/components';
import { MaterialItemGetListAsync } from '@/services/wms/MaterialItem';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';
const { Option } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
	return MaterialItemGetListAsync({
		Filter: Filter ? Filter : undefined,
		SkipCount: SkipCount ? SkipCount : 0,
		MaxResultCount: MaxResultCount ? MaxResultCount : 300,
		Sorting: Sorting ? Sorting : undefined,
	});
};

const MaterailItemSelect = (props: SelectProps<any> & { disabledKeys?: any[]; showId?: boolean; filter?: any }, ref) => {
	const { showId = true } = props;

	const [state, setState] = useControllableValue<SelectValue>(props);

	const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500 });

	return (
		<span ref={ref}>
			<DialogSelect
				placeholder='选择物料'
				style={{ width: '100%' }}
				filterOption={false}
				showSearch
				onSearch={value => {
					run({ Filter: props.filter ? `${props.filter},${props.labelField || 'code'}=*${value}` : `${props.labelField || 'code'}=*${value}` });
				}}
				onDropdownVisibleChange={visible => {
					if (visible) run({ Filter: props.filter ? `${props.filter}` : null });
				}}
				loading={loading}
				onBlur={cancel}
				value={JSON.stringify(state) === '{}' ? undefined : state}
				onChange={e => {
					setState(e);
				}}
				labelInValue
				valueField={'code'}
				labelField={'code'}
				{...props}
				request={({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
					return getData({ Filter: props.filter ? (Filter ? `${props.filter},${Filter}` : props.filter) : Filter, Sorting, SkipCount, MaxResultCount });
				}}
				columnDefs={[
					{ field: 'code', headerName: '编码', width: 200 },
					{ field: 'outCode', headerName: '外码', width: 200 },
					{ field: 'description', headerName: '描述', flex: 1 },
				]}
			>
				{data &&
					!showId &&
					data.items!.map(materialItem => (
						<Option key={materialItem.code + '&' + materialItem.outCode} value={materialItem.code!}>{`${materialItem[`${props.labelField || 'code'}`]}`}</Option>
					))}

				{data &&
					showId &&
					data.items!.map(materialItem => (
						<Option key={materialItem.id + '&' + materialItem.outCode} value={materialItem.id!}>{`${materialItem[`${props.labelField || 'code'}`]}`}</Option>
					))}
			</DialogSelect>
		</span>
	);
};

export default React.forwardRef(MaterailItemSelect);
