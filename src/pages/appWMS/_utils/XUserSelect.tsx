import { DialogSelect } from '@/components';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect, SelectProps } from 'antd';
import { IdentityUserProGetListAsync } from '@/services/openApi/IdentityUserPro';
import React, { useEffect, useState } from 'react';
import { IdentityRoleProGetListAsync } from '@/services/openApi/IdentityRolePro';
const { Option } = AntSelect;

const XUserSelect = (props: any, ref) => {
	const getData = async ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
		let roleData: any = { items: [], total: 0 };
		if (props.useRole) {
			let resData = await IdentityRoleProGetListAsync({ Filter: '', SkipCount: SkipCount, MaxResultCount: MaxResultCount, Sorting: Sorting }).catch(() => ({ items: [], total: 0 }));
			if (resData) roleData = resData;
		}

		let userData = await IdentityUserProGetListAsync({ Filter: Filter, SkipCount: SkipCount, MaxResultCount: MaxResultCount, Sorting: Sorting });
		return {
			items: [...userData.items!, ...roleData?.items!.map(i => ({ name: i.name + '(角色下所有用户)', userName: i.id, id: i.id }))],
			total: [...roleData.items!, ...userData.items!].length,
		};
	};
	const [dataSource, setDataSource] = useState(props.dataSource);

	const [state, setState] = useControllableValue(props);

	const { data, loading, run, cancel } = useRequest(getData, { debounceMaxWait: 500, manual: true });

	useEffect(() => {
		if (data)
			setDataSource(
				data?.items?.map(x => {
					return { ...x, value: x.userName, label: x.name };
				})
			);
	}, [data]);

	useEffect(() => {
		setDataSource(props.dataSource);
	}, [props.dataSource]);

	return (
		<span ref={ref}>
			<DialogSelect
				placeholder='选择处理人'
				style={{ width: '100%' }}
				filterOption={false}
				mode={props.mode ? props.mode : undefined}
				showSearch
				allowClear
				valueField={props.showId ? 'id' : 'userName'}
				labelField={'name'}
				columnDefs={[
					{ field: 'userName', headerName: '登录名', flex: 1 },
					{ field: 'name', headerName: '姓名', flex: 1 },
				]}
				{...props}
				onSearch={value => {
					run({ Filter: (value || '').trim() ? `(name=*${value}) | (userName=*${value})` : '' });
				}}
				onDropdownVisibleChange={() => {
					if (!props.dataSource) {
						run({});
					}
				}}
				loading={loading}
				onBlur={cancel}
				value={JSON.stringify(state) === '{}' ? undefined : state}
				onChange={(e, recordData: any) => {
					if (props.mode === 'multiple') {
						props.record ? JSON.stringify(recordData[0]) === '{}' ? setState(e) : setState(recordData) : setState(e)
					} else {
						setState(e)
					}
				}}
				request={getData}
			>
				{props.showId && dataSource?.map((item: any) => (
					<Option key={item.id} value={item.id!} data={item}>{item.label}</Option>
				))}

				{!props.showId && dataSource?.map((item: any) => (
					<Option key={item.userName} value={item.userName!} data={item}>{item.label}</Option>
				))}
			</DialogSelect>
		</span>
	);
};

export default React.forwardRef(XUserSelect);
