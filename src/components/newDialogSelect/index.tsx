import { Button, Modal, AutoComplete } from 'antd';
import { Select } from '@formily/antd-v5';
import { DashOutlined } from '@ant-design/icons';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React, { useState } from 'react';
import { AgGridPlus } from '../agGrid';
import { ColDef, ColGroupDef, SelectionChangedEvent } from 'ag-grid-community';
import { useBoolean, useControllableValue } from 'ahooks';
import { GridApi } from 'ag-grid-community';
import { isArray } from '../public';

interface IDialogSelectProps extends SelectProps<any> {
	request?: any;
	columnDefs?: (ColDef | ColGroupDef)[] | null;
	labelField?: any;
	valueField?: any;
	queryFun?: (item: any) => void;
	onChangeItem?: (item: any) => void;
	useAutoComplete?: boolean;
}

const NewDialogSelect = (props: IDialogSelectProps) => {
	const { request, columnDefs, value, labelField, valueField, onChangeItem, ...rest } = props;
	console.log('record1 props',props)
	const [state, setState]: any = useControllableValue<SelectValue>(props);
	const [gridApi, setGridApi] = useState<GridApi | undefined>();
	const [visible, { setTrue, setFalse }] = useBoolean(false);
	const [selectRows, setSelectRows] = useState<any>(undefined);
	const [items, setItems] = useState<any>([]);
	const getValue = selectRows => {
		const { mode, labelInValue, valueField, labelField } = props;
		let selectRow = selectRows[0];
		console.log('record2',selectRow)
		let value = selectRow[valueField ?? 'id'];
		let label = selectRow[labelField ?? 'label'];
		if (props.mode === 'multiple' || props.mode === 'tags') {
			return labelInValue ? selectRows.map(it => ({ value: it[valueField ?? 'id'], label: it[labelField ?? 'name'], key: it?.id })) : selectRows.map(it => it[valueField ?? 'id']);
		} else {
			return labelInValue ? { value, label } : value;
		}
	};

	const handleOk = () => {
		let selectRow = selectRows[0];
		setState(getValue(selectRows));
		setFalse();

		if (onChangeItem) onChangeItem(props.mode ? selectRows : selectRow);
	};

	const onSelectionChanged = (e: SelectionChangedEvent) => {
		let selectedRows = e.api.getSelectedRows();

		setSelectRows(selectedRows);
	};

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				{props.useAutoComplete && !props.labelInValue ? <AutoComplete {...rest} value={state} style={{ ...rest?.style, width: "calc(100% - 110px)", minWidth: '150px', marginRight: 5 }} /> : <Select {...rest} value={state} style={{ width: "calc(100% - 110px)", minWidth: '150px', marginRight: 5, ...(rest.style || {}) }} />}
				{!props.disabled ? (
					<Button
						icon={<DashOutlined />}
						onClick={() => {
							if (isArray(state)) {
								let arr = items.map(i => i[valueField ?? 'id']);
								let indexArr = (state || []).map(i => arr?.indexOf(i[valueField ?? 'id']));
								indexArr?.forEach(i => gridApi?.selectIndex(i, true, true));
							}
							setTrue();
						}}
						disabled={rest.disabled}
					/>
				) : null}
			</div>
			<Modal width={960} title='选择' style={{ zIndex: 9999 }} destroyOnClose open={visible} onOk={handleOk} onCancel={setFalse}>
				<AgGridPlus
					style={{ height: 450 }}
					onGridReady={(gridReadEvent: any) => {
						setGridApi(gridReadEvent.api);
					}}
					search={columnDefs?.filter((i: any) => !i.hideInSearch).length !== 0}
					onSelectionChanged={onSelectionChanged}
					///@ts-ignore
					rowSelection={props.mode === 'multiple' ? props.mode : 'single'}
					onRowDoubleClicked={({ data }) => {
						setFalse();
						let d = getValue([data]);
						setState(d);
						if (onChangeItem) onChangeItem(props.mode === 'multiple' ? [data] : { label: data.label, value: data.value });
					}}
					request={async (params, sort, filter) => {
						let data = await request({ filterObj: filter, Filter: props?.queryFun ? props?.queryFun(params?.filter) : params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
						let requestData: any = { success: true, data: data, total: data.length };
						setItems(data);
						return requestData;
					}}
					columnDefs={[
						//@ts-ignore
						...columnDefs,
					]}
				/>
			</Modal>
		</>
	);
};
export { IDialogSelectProps };

export default NewDialogSelect;
