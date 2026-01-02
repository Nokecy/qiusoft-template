import { DatePicker, Editable, FormDialog, FormGrid, FormItem, FormLayout, FormTab, Input, NumberPicker, Space } from '@formily/antd-v5';
import { createSchemaField } from '@formily/react';
import { Button, Modal } from 'antd';
import React, { useMemo, useState } from 'react';
import { WarehouseManSelect, TraceSelect } from '@/pages/appWMS/baseInfo/_utils';
import { MaterialPickItemPickItemManualPickByTaskAsync } from '@/services/wms/MaterialPickItem';
import { ArrayTable } from '@formily/antd-v5';
import { AgGridPlus } from '@/components/agGrid';
import { useBoolean } from 'ahooks';
import { isField, onFieldInputValueChange, onFormInit } from '@formily/core';
import { StockBinBoxInfoGetListAsync } from '@/services/wms/StockBinBoxInfo';
const WarehouseTeamFormDialog = (props: any) => {
	const { picktask, buttonProps, onAfterSubmit } = props;
	const taskId = picktask?.id;
	const [formApi, setFormApi]: any = useState();
	const [traceId, setTraceId]: any = useState(picktask.traceId);
	const SchemaField = useMemo(
		() =>
			createSchemaField({
				components: {
					FormTab,
					FormItem,
					FormGrid,
					DatePicker,
					Editable,
					Space,
					Input,
					WarehouseManSelect,
					TraceSelect,
					ArrayTable,
					Button,
					NumberPicker,
				},
			}),
		[]
	);

	const formProps = {
		effects: () => {
			onFormInit(async form => {
				setFormApi(form);

				if (taskId) {
					form.setInitialValues({
						taskId,
						materialId: picktask?.materialId,
						traceId: picktask.traceId ? picktask.traceId : undefined,
						wareHouseName: picktask.wareHouseName,
						materialCode: picktask.materialItem?.code,
						materialOutCode: picktask.materialItem?.outCode,
						qty: picktask.qty,
					});
				}
			});

			onFieldInputValueChange('traceId', async field => {
				let { value } = field || [];
				const addition = field.query('addition').take();
				if (isField(addition)) {
					addition.setComponentProps({ disabled: false });
				}
				setTraceId(value);
			});
		},
	};
	const portalId = `downpickItemTask${taskId}`;

	const [visible, { setTrue, setFalse }] = useBoolean(false);
	const [selectRows, setSelectRows] = useState<any>(undefined);

	const handleOk = () => {
		let arr = selectRows.map(i => {
			i.locationCode = i.wareHouseLocationCode;
			i.traceId = i.parentTraceId;
			return { ...i, quantity: i.qty };
		});
		formApi?.setValues({
			boxList: arr,
		});
		setFalse();
	};

	const onSelectionChanged = (e: any) => {
		let selectedRows = e.api.getSelectedRows();

		setSelectRows(selectedRows);
	};
	return (
		<FormDialog.Portal id={portalId}>
			<Button
				type={'primary'}
				onClick={() => {
					let formDialog1 = FormDialog({ title: '手工下架', width: 1080 }, portalId, () => {
						return (
							<FormLayout labelWidth={120} feedbackLayout={'none'} shallow={false}>
								<SchemaField>
									<SchemaField.Void x-component={'FormGrid'} x-component-props={{ maxColumns: 2, strictAutoFit: true }}>
										<SchemaField.String required title={'任务ID'} name={'taskId'} x-decorator='FormItem' x-hidden x-component={'Input'} />
										<SchemaField.String
											required
											title={'物料编码'}
											name={'materialId'}
											x-decorator='FormItem'
											x-hidden
											x-component={'Input'}
											x-read-pretty
										/>

										<SchemaField.String required title={'库房'} name={'wareHouseName'} x-decorator='FormItem' x-component={'Input'} x-read-pretty />

										<SchemaField.String
											required
											title={'物料编码'}
											name={'materialCode'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-read-pretty
										/>

										<SchemaField.String
											required
											title={'物料外码'}
											name={'materialOutCode'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-read-pretty
										/>

										<SchemaField.String required title={'下架数量'} name={'qty'} x-decorator='FormItem' x-component={'Input'} x-read-pretty />

										<SchemaField.String
											required
											title={'要下架的LPN'}
											name={'traceId'}
											x-decorator='FormItem'
											x-component={'TraceSelect'}
											x-decorator-props={{ gridSpan: 4 }}
											x-component-props={{
												mode: 'multiple',
												placeholder: '选择要移动的LPN',
												labelInValue: true,
												params: {
													materialId: picktask.materialId,
													wareHouseId: picktask.wareHouseId,
												},
											}}
										/>

										<SchemaField.String
											required
											title={'新的LPN'}
											name={'newTraceId'}
											x-decorator='FormItem'
											x-component={'Input'}
											x-component-props={{ placeholder: '填写新的LPN' }}
										/>

										<SchemaField.String
											title={'总下架数量'}
											name={'totalQuantity'}
											x-decorator='FormItem'
											x-component={'NumberPicker'}
											maximum={picktask.qty}
											x-reactions={{
												dependencies: ['boxList'],
												when: '{{$deps[0]}}',
												fulfill: {
													state: {
														value: '{{$deps[0].reduce((pre, curr)=>{return pre + curr.quantity},0)}}',
													},
												},
											}}
										/>

										<SchemaField.String
											name={'addition'}
											x-decorator='FormItem'
											x-component='Button'
											x-component-props={{
												disabled: traceId ? false : true,
												type: 'primary',
												block: false,
												children: '选择下架箱列表',
												style: { width: 150, marginLeft: 120 },
												onClick: () => {
													setTrue();
												},
											}}
										/>
									</SchemaField.Void>

									<SchemaField.Void
										x-component={'FormGrid'}
										x-component-props={{ maxColumns: 10, strictAutoFit: true }}
										x-decorator-props={{ gridSpan: 4 }}
									>
										<SchemaField.Array
											name='boxList'
											title='填写下架箱数量'
											required
											x-component='ArrayTable'
											x-validator={[{ message: '' }]}
											x-decorator='FormItem'
											x-decorator-props={{ gridSpan: 10 }}
										>
											<SchemaField.Object>
												<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 150, title: '箱的LPN', fixed: 'left' }}>
													<SchemaField.String required name={'traceId'} x-decorator='FormItem' x-read-pretty x-component={'Input'} />
												</SchemaField.Void>
												<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 180, title: '库位', fixed: 'left' }}>
													<SchemaField.String required name={'locationCode'} x-decorator='FormItem' x-read-pretty x-component={'Input'} />
												</SchemaField.Void>
												<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 150, title: '新LPN', fixed: 'left' }}>
													<SchemaField.String required name={'newTraceId'} x-decorator='FormItem' x-read-pretty x-component={'Input'} />
												</SchemaField.Void>
												<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 150, title: '箱号', fixed: 'left' }}>
													<SchemaField.String name={'boxNumber'} x-decorator='FormItem' x-read-pretty x-component={'Input'} />
												</SchemaField.Void>
												<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 150, title: '序列号', fixed: 'left' }}>
													<SchemaField.String name={'serialNumber'} x-decorator='FormItem' x-read-pretty x-component={'Input'} />
												</SchemaField.Void>
												<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 120, title: '库存数量', fixed: 'left' }}>
													<SchemaField.String name={'qty'} x-decorator='FormItem' x-read-pretty x-component={'Input'} default={0} />
												</SchemaField.Void>
												<SchemaField.Void x-component='ArrayTable.Column' x-component-props={{ width: 120, title: '数量', fixed: 'left' }}>
													<SchemaField.String name={'quantity'} x-decorator='FormItem' x-read-pretty x-component={'NumberPicker'} default={0} />
												</SchemaField.Void>
												<SchemaField.Void
													x-component='ArrayTable.Column'
													x-component-props={{ title: '操作', dataIndex: 'operations', width: 50, fixed: 'right' }}
												>
													<SchemaField.Void x-component='ArrayTable.Remove' />
												</SchemaField.Void>
											</SchemaField.Object>
										</SchemaField.Array>
									</SchemaField.Void>
								</SchemaField>
							</FormLayout>
						);
					});

					formDialog1
						.forConfirm((payload, next) => {
							let values: any = payload.values;
							if (!values.newTraceId) values.newTraceId = picktask.traceId;
							values.boxList?.forEach(i => {
								i.newTraceId = values.newTraceId;
							});
							return MaterialPickItemPickItemManualPickByTaskAsync(values).then(() => {
								if (onAfterSubmit) {
									onAfterSubmit();
								}
								next(payload);
							});
						})
						.open(formProps);
				}}
				{...buttonProps}
			>
				{props.children}
			</Button>
			<Modal width={960} zIndex={99999} title='选择' forceRender destroyOnClose open={visible} onOk={handleOk} onCancel={setFalse}>
				<AgGridPlus
					style={{ height: 450 }}
					params={{ traceIdArr: traceId }}
					onSelectionChanged={onSelectionChanged}
					rowSelection={'multiple'}
					rowMultiSelectWithClick={true}
					request={async params => {
						if (params.traceIdArr) {
							params.filter = params.filter
								? params.filter +
								  ',qty>0,warehouseId=' +
								  picktask.warehouseId +
								  ',(parentTraceId=' +
								  params.traceIdArr.map(i => i.value).join(' | parentTraceId=') +
								  ')'
								: 'qty>0,warehouseId=' +
								  picktask.warehouseId +
								  ',(' +
								  'parentTraceId=' +
								  params.traceIdArr.map(i => i.value).join(' | parentTraceId=') +
								  ')';
						}
						let data = await StockBinBoxInfoGetListAsync({
							Filter: params.filter,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: data.items!, total: data.totalCount };
						return requestData;
					}}
					columnDefs={[
						{ field: 'parentTraceId', headerName: '箱的LPN', width: 120, hideInSearch: true, searchComponentProps: { style: { width: 120 } } },
						{ field: 'wareHouseLocationCode', headerName: '库位', width: 120, searchComponentProps: { style: { width: 120 } } },
						{ field: 'boxNumber', headerName: '箱号', width: 120, searchComponentProps: { style: { width: 120 } } },
						{ field: 'qty', headerName: '库存数量', width: 120, hideInSearch: true, searchComponentProps: { style: { width: 120 } } },
						{ field: 'serialNumber', headerName: '序列号', flex: 1, searchComponentProps: { style: { width: 120 } } },
					]}
				/>
			</Modal>
		</FormDialog.Portal>
	);
};

export default WarehouseTeamFormDialog;
