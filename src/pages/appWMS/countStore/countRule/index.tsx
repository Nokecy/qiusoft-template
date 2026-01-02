import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { CountRuleDeleteAsync, CountRuleGetListAsync } from '@/services/wms/CountRule';
import { CountRule } from '@/services/wmsPermission';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import CountRuleType from '@/pages/appWMS/countStore/_utils/countRule';
import CountRuleFormDialog from './components/countRuleFormDialog';
import OrderQuery, { IsActiveQuery, OrderSelect } from './components/orderQuery';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DeleteConfirm from '@/components/deleteConfirm';

const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return CountRuleDeleteAsync({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={access[CountRule.Update]}>
				<CountRuleFormDialog
					title={'编辑盘点规则'}
					entityId={data.id}
					onAfterSubmit={() => {
						refresh();
					}}
					buttonProps={{ icon: <EditOutlined />, type: 'link', headerName: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
				/>
			</Access>

			<Access accessible={access[CountRule.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const CountRulePage = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				headerTitle={'盘点规则列表'}
				gridKey="appWMS.countStore.countRule"
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let data = await CountRuleGetListAsync({ Filter: params!.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				toolBarRender={gridApi => {
					return [
						<Access accessible={access[CountRule.Create]}>
							<CountRuleFormDialog title={'新建盘点规则'} onAfterSubmit={onRefresh}>
								{'新建盘点规则'}
							</CountRuleFormDialog>
						</Access>,
					];
				}}
			>
				<AgGridColumn field={'countParam.name'} headerName={"盘点参数"} width={150} />
				<AgGridColumn field={'countParam.countType'} headerName={"盘点类型"} width={100} cellRenderer={CountRuleType} searchComponent={OrderSelect} />
				<AgGridColumn field={'name'} headerName={'规则名称'} width={150} />
				<AgGridColumn field={'description'} headerName={'规则描述'} width={150} />
				<AgGridColumn field={'warehouse.name'} headerName={intl.formatMessage({ id: 'WMS:WarehouseName' })} width={150} />
				<AgGridColumn field={'pickedSendOutTask'} headerName={intl.formatMessage({ id: 'WMS:PickedSendOutTask' })} width={150} type={'bool'} searchComponent={OrderQuery} />
				<AgGridColumn field={'taskStartTime'} headerName={intl.formatMessage({ id: 'WMS:TaskStartTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
				<AgGridColumn field={'materialCode'} headerName={intl.formatMessage({ id: 'WMS:Materialcode' })} width={150} />
				<AgGridColumn field={'zoneCode'} headerName={intl.formatMessage({ id: 'WMS:ZoneCode' })} width={150} />
				<AgGridColumn field={'locationCode'} headerName={intl.formatMessage({ id: 'WMS:LocationCode' })} width={150} />
				<AgGridColumn field={'isActive'} headerName={intl.formatMessage({ id: 'WMS:IsActive' })} width={150} type={'bool'} searchComponent={IsActiveQuery} />
				<AgGridColumn
					field={'action'}
					headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
					width={120}
					pinned={'right'}
					filter={false}
					cellRenderer={Options}
					cellRendererParams={{ onRefresh }}
				/>
			</AgGridPlus>
		</>
	);
};

export default CountRulePage;
export const routeProps = {
	name: '盘点规则',
};
