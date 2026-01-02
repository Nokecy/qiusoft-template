import { useBoolean, useControllableValue, useRequest } from 'ahooks';
import { AgGridPlus, DraggableModal } from '@nokecy/qc-ui';
import { Select as AntSelect, Button, Tabs, Spin } from 'antd';
import { IdentityRoleProGetListAsync } from '@/services/openApi/IdentityRolePro';
import { IdentityUserProGetListAsync } from '@/services/openApi/IdentityUserPro';
import { UserGetListWithRoleAsync } from "@/services/openApi/User";
import React, { useEffect, useState } from 'react';
import { connect } from '@formily/react';
import { Select } from '@formily/antd-v5';
import { DashOutlined } from '@ant-design/icons';
import { SelectionChangedEvent } from 'ag-grid-community';
const { Option } = AntSelect;

const getUserList = async ({ Filter, Sorting, SkipCount, MaxResultCount }: any) => {
	let userData = await IdentityUserProGetListAsync({ Filter: Filter, SkipCount: SkipCount, MaxResultCount: MaxResultCount, Sorting: Sorting });
	let newData = userData.items = userData.items?.map(x => {
		return { ...x, name: `${x.userName}/${x.name}`, userName: x.userName };
	});
	return {
		items: [...newData!],
		total: [...userData.items!].length,
	};
};

const XUserSelect = (props: any, ref) => {
	const { disabled, onChangeItem } = props;
	const [dataSource, setDataSource] = useState(props.dataSource);
	const [state, setState] = useControllableValue(props);
	const [visible, { setTrue, setFalse }] = useBoolean(false);
	const [selectRows, setSelectRows] = useState<any>(undefined);
	const [roleUserLoading, { setTrue: setUserLoadingTrue, setFalse: setUserLoadingFalse }] = useBoolean(false);

	const { data, loading, run, cancel } = useRequest(getUserList, { debounceMaxWait: 500, manual: true });

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

	const getValue = (selectRows: any[]) => {
		const { mode, labelInValue = true, valueField, labelField } = props;
		let selectRow = selectRows[0];
		if (selectRow) {
			let valueProps = valueField ?? 'userName';
			let labelProps = labelField ?? 'name';
			let value = selectRow[valueProps];
			let label = selectRow[labelProps];
			if (props.mode === 'multiple' || props.mode === 'tags') {
				return labelInValue ? selectRows.map(it => ({ value: it[valueProps], label: it[labelProps], key: it?.id })) : selectRows.map(it => it[valueProps]);
			} else {
				return labelInValue ? { value, label } : value;
			}
		}
	};

	const onSelectionChanged = (e: SelectionChangedEvent) => {
		let selectedRows = e.api.getSelectedRows();
		setSelectRows(selectedRows);
	};

	const handleOk = () => {
		let selectRow = selectRows[0];
		setState(getValue(selectRows));
		setFalse();

		if (onChangeItem) onChangeItem(props.mode ? selectRows : selectRow);
	};

	return (
		<span ref={ref}>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<Select
					placeholder='选择处理人'
					style={{ width: '100%' }}
					mode={props.mode ? props.mode : undefined}
					filterOption={false}
					showSearch
					allowClear
					labelInValue
					valueField={props.showId ? 'id' : 'userName'}
					labelField={'name'}
					maxTagCount={'responsive'}
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
							props.record ? (JSON.stringify(recordData[0]) === '{}' ? setState(e) : setState(recordData)) : setState(e);
						} else {
							setState(e);
						}
					}}
				>
					{props.showId &&
						dataSource?.map((item: any) => (
							<Option key={item.id} value={item.id!} data={item}>
								{item.name}
							</Option>
						))}

					{!props.showId &&
						dataSource?.map((item: any) => (
							<Option key={item.userName} value={props.valueField ? item[props.valueField || 'userName'] : item.userName!} data={item}>
								{item.label}
							</Option>
						))}
				</Select>
				{
					!disabled ? (
						<Button
							icon={<DashOutlined />}
							onClick={() => {
								setTrue();
							}}
							disabled={disabled}
						/>
					) : null
				}
			</div>

			<DraggableModal width={960} title='选择' style={{ zIndex: 9999 }} destroyOnClose open={visible} onOk={handleOk} onCancel={setFalse}>
				<Spin spinning={roleUserLoading}>
					<Tabs>
						<Tabs.TabPane tabKey='user' key={"user"} tab={"选择用户"}>
							<AgGridPlus
								style={{ height: 450 }}
								// onSelectionChanged={onSelectionChanged}
								rowSelection={props.mode === 'multiple' ? props.mode : 'single'}
								onSelectionChanged={onSelectionChanged}
								onRowDoubleClicked={({ data }) => {
									setFalse();
									console.log('record1 getValue([data])', getValue([data]), 'labelInValue', props.labelInValue);
									setState(getValue([data]));
									if (onChangeItem) onChangeItem(props.mode === 'multiple' ? [data] : { label: data.name, value: data.code });
								}}
								request={async params => {
									let data = await getUserList({ Filter: props?.queryFun ? props?.queryFun(params?.filter) : params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
									let requestData: any = { success: true, data: data.items!, total: data.total };
									setDataSource(data.items);
									return requestData;
								}}
								columnDefs={[
									{ field: 'check', headerName: "选择", width: 60, checkboxSelection: true, hideInSearch: true },
									{ field: 'userName', headerName: '登录名', flex: 1 },
									{ field: 'name', headerName: '姓名', flex: 1 },
								]}
							/>
						</Tabs.TabPane>

						{
							props.mode === 'multiple' ? <Tabs.TabPane tabKey='role' key={"role"} tab={"选择角色"}>
								<AgGridPlus
									style={{ height: 450 }}
									// onSelectionChanged={onSelectionChanged}
									rowSelection={props.mode === 'multiple' ? props.mode : 'single'}
									onRowDoubleClicked={({ data }) => {
										setUserLoadingTrue();
										UserGetListWithRoleAsync({ RoleId: data.id }).then((data) => {
											setFalse();
											setState(getValue(data.items));
											setDataSource(data.items);
											if (onChangeItem) onChangeItem(data.items);
										})
											.finally(setUserLoadingFalse)
									}}
									request={async params => {
										let data = await IdentityRoleProGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
										let requestData: any = { success: true, data: data.items!, total: data.totalCount };
										return requestData;
									}}
									columnDefs={[
										{ field: 'check', headerName: "选择", width: 50, checkboxSelection: true, hideInSearch: true },
										{ field: 'name', headerName: '角色名称', flex: 1 },
										{ field: 'DisplayName', headerName: '显示名称', flex: 1 },
									]}
								/>
							</Tabs.TabPane> : null
						}

					</Tabs>
				</Spin>
			</DraggableModal>
		</span>
	);
};

export default connect(React.forwardRef(XUserSelect));
