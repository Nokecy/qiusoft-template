import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { CountParamDeleteAsync, CountParamGetListAsync } from '@/services/wms/CountParam';
import { CountParam } from '@/services/wmsPermission';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Select, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import CountParamFormDialog from './components/countRuleFormDialog';
import CountParamBoxStatusSelect from './components/orderQuery';
import DeleteConfirm from "@/components/deleteConfirm";
import { countRuleTypeEnum, CountRuleTypeSelect, countParamBoxStatusEnum, countParamHighValueFlagEnum } from '@/pages/appWMS/_utils';
const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		CountParamDeleteAsync({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={access[CountParam.Update]}>
				<CountParamFormDialog
					title={'编辑盘点参数'}
					entityId={data.id}
					onAfterSubmit={() => {
						refresh();
					}}
					buttonProps={{ icon: <EditOutlined />, type: 'link', headerName: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
				/>
			</Access>

			<Access accessible={access[CountParam.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const CountParamPage: React.FC<any> = (props: any) => {
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
				headerTitle={'盘点参数列表'}
				gridKey="appWMS.countStore.countParam"
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let data = await CountParamGetListAsync({ Filter: params!.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				toolBarRender={gridApi => {
					return [
						<Access accessible={access[CountParam.Create]}>
							<CountParamFormDialog title={'新建盘点参数'} onAfterSubmit={onRefresh}>
								{'新建盘点参数'}
							</CountParamFormDialog>
						</Access>,
					];
				}}
			>
				<AgGridColumn field={'name'} headerName={"名称"} width={150} />
				<AgGridColumn field={'countType'} headerName={intl.formatMessage({ id: 'WMS:CountType' })} width={110} valueEnum={countRuleTypeEnum} searchComponent={CountRuleTypeSelect} />
				<AgGridColumn field={'itemType'} headerName={intl.formatMessage({ id: 'WMS:ItemType' })} width={110} />
				<AgGridColumn field={'boxStatus'} headerName={intl.formatMessage({ id: 'WMS:BoxStatus' })} width={110} valueEnum={countParamBoxStatusEnum} searchComponent={CountParamBoxStatusSelect} />
				<AgGridColumn field={'countRate'} headerName={intl.formatMessage({ id: 'WMS:CountRate' })} width={110} hideInSearch={true} />

				<AgGridColumn field={'countCycleDays'} headerName={'盘点周期（天）'} width={110} hideInSearch={true} />

				<AgGridColumn field={'goodsAgeDueTime'} headerName={'库龄年限'} width={110} hideInSearch={true} />
				
				<AgGridColumn field={'highValueFlag'} headerName={'贵重品'} flex={1} valueEnum={countParamHighValueFlagEnum}/>
				<AgGridColumn field={'action'} headerName={intl.formatMessage({ id: 'AbpUi:Actions' })} width={120} pinned={'right'} filter={false} sortable={false} cellRenderer={Options} cellRendererParams={{ onRefresh }} />
			</AgGridPlus>
		</>
	);
};

export default CountParamPage;


export const routeProps = {
	name: '盘点参数',
};
