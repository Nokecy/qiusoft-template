import DialogSelect from '@/components/dialogSelect';
import { SaleManGetListAsync } from '@/services/smarterp/SaleMan';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';
const { Option } = AntSelect;

const getData = ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
	return SaleManGetListAsync({
		Filter: Filter ? Filter : undefined,
		SkipCount: SkipCount ? SkipCount : 0,
		MaxResultCount: MaxResultCount ? MaxResultCount : 300,
		Sorting: Sorting ? Sorting : undefined,
	});
};

/**
 * ERP客户销售员选择
 * @param props
 * @param ref
 * @returns
 */
const SaleManSelect = (props: SelectProps<any>, ref) => {
	const [state, setState] = useControllableValue<SelectValue>(props);

	const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500, manual: true });

	return (
		<span ref={ref}>
			<DialogSelect
				placeholder='选择销售员'
				style={{ width: '100%' }}
				filterOption={false}
				showSearch
				labelInValue
				{...props}
				onSearch={value => {
					run({ Filter: `code=*${value} | name=*${value}` });
				}}
				onDropdownVisibleChange={visible => {
					visible && run({});
				}}
				loading={loading}
				onBlur={cancel}
				value={JSON.stringify(state) === '{}' ? undefined : state}
				onChange={e => {
					setState(e);
				}}
				request={getData}
				valueField={'code'}
				columnDefs={[
					{ field: 'code', headerName: '编码', flex: 1 },
					{ field: 'name', headerName: '名称', flex: 1 },
				]}
			>
				{data?.items!.map(Item => (
					<Option value={Item.code!}>{`${Item.name}`}</Option>
				))}
			</DialogSelect>
		</span>
	);
};

export default React.forwardRef(SaleManSelect);
