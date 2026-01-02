import { DialogSelect } from '@/components';
import { ProcessProcedureCategoryGetListAsync } from '@/services/pdm/ProcessProcedureCategory';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
	return ProcessProcedureCategoryGetListAsync({
		Filter: Filter ? Filter : undefined,
		SkipCount: SkipCount ? SkipCount : 0,
		MaxResultCount: MaxResultCount ? MaxResultCount : 300,
		Sorting: Sorting ? Sorting : undefined,
	});
};

/**
 * 工序分类选择器组件
 * @param props SelectProps & { useCode?: boolean }
 * @param ref
 * @returns
 */
const ProcessProcedureCategorySelect = (
	props: SelectProps<any> & {
		useCode?: boolean;
	},
	ref
) => {
	const { useCode = true } = props;

	const [state, setState] = useControllableValue<SelectValue>(props);

	const { data, loading, run, cancel } = useRequest(getData, {
		debounceMaxWait: 500,
		manual: true,
	});

	const handleChange = (value: any, option: any) => {
		setState(value);
	};

	return (
		<span ref={ref}>
			<DialogSelect
				placeholder="请选择工序分类"
				style={{ width: '100%' }}
				showSearch
				labelInValue
				filterOption={false}
				modalWidth={800}
				{...props}
				onSearch={(value) => {
					run({ Filter: `(name =* ${value}) | (code =* ${value})` });
				}}
				onDropdownVisibleChange={(visible) => {
					visible && run({});
				}}
				loading={loading}
				onBlur={cancel}
				value={JSON.stringify(state) === '{}' ? undefined : state}
				onChange={handleChange}
				valueField={useCode ? 'code' : 'id'}
				labelField="name"
				request={getData}
				columnDefs={[
					{ field: 'code', headerName: '工序分类编码', width: 150 },
					{ field: 'name', headerName: '工序分类名称', width: 200 },
					{ field: 'memo', headerName: '备注', flex: 1, ellipsis: true },
				]}
			>
				{data?.items?.map((category) => (
					<Option key={category.id} value={useCode ? category.code! : category.id!}>
						{`${category.code} - ${category.name}`}
					</Option>
				))}
			</DialogSelect>
		</span>
	);
};

export default React.forwardRef(ProcessProcedureCategorySelect);
