import { DialogSelect } from '@nokecy/qc-ui';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { IdentityUserProGetListAsync } from '@/services/openApi/IdentityUserPro';
import React, { useEffect, useState } from 'react';
import { connect } from '@formily/react';
import { IdentityRoleProGetListAsync } from '@/services/openApi/IdentityRolePro';
import { UserGetListWithRoleAsync } from '@/services/openApi/User';
const { Option } = AntSelect;

const UserSelect = (props: any & { disabledKeys?: any[]; showId?: boolean }, ref) => {
	const getData = async ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
		let roleData: any = { items: [], total: 0 };
		if (props.useRole) {
			let a = await IdentityRoleProGetListAsync({ Filter: '', SkipCount: SkipCount, MaxResultCount: MaxResultCount, Sorting: Sorting }).catch(() => ({ items: [], total: 0 }));
			if (a) roleData = a;
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
					return { value: props.showId ? x.id : x.userName, label: x.name };
				})
			);
	}, [data]);

	useEffect(() => {
		setDataSource(props.dataSource);
	}, [props.dataSource]);
	const newArrFn = (arr: any) => {
		// 利用对象属性名不能重复这一特点
		// 如果对象中不存在，就可以给 push 进去
		let newArr: any = [];
		let obj: any = {};
		for (let i = 0; i < arr.length; i++) {
			if (!obj[arr[i].value]) {
				newArr.push(arr[i]);
				obj[arr[i]?.value] = 1;
			} else {
				obj[arr[i]?.value]++;
			}
		}
		return newArr;
	};

	return (
		<span ref={ref}>
			<DialogSelect
				placeholder='选择处理人'
				style={{ width: '100%' }}
				showSearch
				allowClear
				valueField={props.showId ? 'id' : 'userName'}
				labelField={'name'}
				UserSelect
				filterOption={false}
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
				onChange={e => {
					let res: any = e;
					if (!res) {
						setState(res);
						return;
					}

					if (Array.isArray(res)) {
						if (res?.length < state?.length) {
							setState(res);
							return;
						}
						res?.map(async i => {
							if (i && i?.label && i?.label?.indexOf('(角色下所有用户)') !== -1) {
								let arr: any = [];
								let data: any = await UserGetListWithRoleAsync({ RoleId: i.value });
								(data.items || []).forEach(x => {
									arr.push({ value: props.showId ? x.id : x.userName, label: x.name });
								});
								setState(newArrFn([...(state || []), ...arr]));
							} else {
								if (!i.label && i.value) {
									let it = dataSource?.find(it => it.label === i.value);
									if (it && it?.label) {
										setState(newArrFn([...(state || []), it]));
									} else {
										setState(state ? state : []);
									}
								} else setState(newArrFn([...(state || []), i]));
							}
						});
					} else setState(res);
				}}
				request={getData}
			>
				{dataSource?.map((item: any) => (
					<Option key={item.value} value={item.value!}>{`${item.label} ${!props?.showId&&item.value||''}`}</Option>
				))}
			</DialogSelect>
		</span>
	);
};

export default connect(React.forwardRef(UserSelect));
