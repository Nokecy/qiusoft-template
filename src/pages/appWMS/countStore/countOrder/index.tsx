import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { CountOrderCloseAsync, CountOrderDeleteAsync, CountOrderDistributeAsync, CountOrderFinishFirstCountAsync, CountOrderGetListAsync } from '@/services/wms/CountOrder';
import { sumBy } from 'lodash';
import React, { useRef, useState } from 'react';
import { useIntl } from 'umi';
import { Allotment } from 'allotment';
import CountOrderDetail from './components/countOrderDetail';
import CountOrderType from '../_utils/countOrderType';
import CountOrderTypeSelect from '../_utils/countOrderTypeSelect';
import { Access, useAccess } from '@umijs/max';
import { Button, Space, Tag, message } from 'antd';
import CountOrderMloadDialog from './components/FormDialog';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { CountOrder } from "@/services/wmsPermission";
import DeleteConfirm from '@/components/deleteConfirm';
import { EditOutlined, DeleteOutlined, ClusterOutlined, BorderOutlined, MergeCellsOutlined } from "@ant-design/icons";

const CountOrderPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();
	const gridRef = useRef<GridRef>();
	const [data, setData] = useState([]);
	const [selectedRow, setSelectedRow] = useState<any>(undefined);

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	}

	const onSelectionChanged = e => {
		let selectedRows = e.api.getSelectedRows();
		setSelectedRow(selectedRows[0]);
	};

	const CountOrderStatusTag = ({ value }: { value: number }) => {
		switch (value) {
			case 0:
				return <Tag color={'default'}>创建</Tag>;
			case 1:
				return <Tag color={'processing'}>盘点下发</Tag>;
			case 2:
				return <Tag color={'orange'}>初盘中</Tag>;
			case 3:
				return <Tag color={'green'}>初盘完成</Tag>;
			case 4:
				return <Tag color={'blue'}>复盘中</Tag>;
			case 5:
				return <Tag color={'purple'}>盘点完成</Tag>;
			case 6:
				return <Tag color={'red'}>关闭</Tag>;
			default:
				return <Tag color={'default'}>未知</Tag>;
		}

	};

	const Options = (props: any & { onRefresh }) => {
		const { data, api, onRefresh } = props;
		const intl = useIntl();
		const access = useAccess();

		const refresh = () => {
			onRefresh();
		}

		const handleDelete = (id: any) => {
			const hide = message.loading('正在操作,请稍后', 0);
			CountOrderDeleteAsync({ id }).then(() => {
				refresh()
			}).finally(() => { hide(); });
		}

		return (
			<Space>
				<Access accessible={access[CountOrder.Default] && (data.checkStatus === 0)}>
					<DeleteConfirm title="请再次确认您的操作：您确实要执行此操作吗？" onConfirm={() => {
						const hide = message.loading('正在操作,请稍后', 0);
						CountOrderDistributeAsync({ id: data.id }).then(() => {
							refresh()
							message.success('操作成功')
						}).finally(() => { hide(); });
					}}>
						<Button size={"small"} icon={<ClusterOutlined />} type={"link"} title={'盘点任务下发'} />
					</DeleteConfirm>
				</Access>

				<Access accessible={access[CountOrder.Default] && data.checkStatus === 2}>
					<DeleteConfirm title="请再次确认您的操作：您确实要执行此操作吗？" onConfirm={() => {
						const hide = message.loading('正在操作,请稍后', 0);
						CountOrderFinishFirstCountAsync({ id: data.id }).then(() => {
							refresh()
							message.success('操作成功')
						}).finally(() => { hide(); });
					}}>
						<Button size={"small"} icon={<MergeCellsOutlined />} type={"link"} title={'完成初盘'} />
					</DeleteConfirm>
				</Access>

				<Access accessible={access[CountOrder.Default] && (data.checkStatus !== 5 && data.checkStatus !== 6)}>
					<DeleteConfirm title="请再次确认您的操作：您确实要执行此操作吗？" onConfirm={() => {
						const hide = message.loading('正在操作,请稍后', 0);
						CountOrderCloseAsync({ id: data.id }).then(() => {
							refresh()
							message.success('操作成功')
						}).finally(() => { hide(); });
					}}>
						<Button size={"small"} icon={<MergeCellsOutlined />} type={"link"} title={'结束盘点'} />
					</DeleteConfirm>
				</Access>

				<Access accessible={access[CountOrder.Default] && data.checkStatus === 0}>
					<CountOrderMloadDialog title={"编辑"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: < EditOutlined />, type: "link", headerName: intl.formatMessage({ id: "AbpUi:Edit" }) }} />
				</Access>

				<Access accessible={access[CountOrder.Default] && data.checkStatus === 0}>
					<DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
						<Button size={"small"} icon={<DeleteOutlined />} type={"link"} title={intl.formatMessage({ id: "AbpUi:Delete" })} />
					</DeleteConfirm>
				</Access>

			</Space>
		);
	}

	return (
		<Allotment vertical={true}>
			<Allotment.Pane>
				<AgGridPlus
					gridRef={gridRef}
					headerTitle={'盘点清单'}
					gridKey="appWMS.countStore.countOrder"
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						let data: any = await CountOrderGetListAsync({ Filter: params!.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
						let requestData: any = { success: true, data: data.items!, total: data.totalCount };
						setData(data.items);
						return requestData;
					}}
					onSelectionChanged={onSelectionChanged}
					rowSelection={'single'}
					pinnedBottomRowData={[
						{
							locationCount: sumBy(data, (x: any) => x.locationCount! * 1),
							checkItemCount: sumBy(data, (x: any) => x.checkItemCount! * 1),
							finishCheckItemCount: sumBy(data, (x: any) => x.finishCheckItemCount! * 1),
						},
					]}
					toolBarRender={(gridApi, filter) => {
						return [
							<Access accessible={access[CountOrder.Default]}>
								<CountOrderMloadDialog title={"新建盘点清单"} onAfterSubmit={onRefresh}>{"新建"}</CountOrderMloadDialog>
							</Access>,
						];
					}}
				>
					<AgGridColumn field={'number'} headerName={"盘点清单号"} width={150} />
					<AgGridColumn field={'countRuleName'} headerName={"盘点规则"} width={150} />
					<AgGridColumn field={'warehouse.code'} headerName={"库房编码"} width={120} />
					<AgGridColumn field={'warehouse.name'} headerName={"库房名称"} width={120} />
					<AgGridColumn field={'checkStatus'} headerName={"盘点状态"} width={100} cellRenderer={CountOrderStatusTag} />
					<AgGridColumn field={'closeTime'} headerName={"完成时间"} width={100} type={'dateTimeColumn'} initialSort={'desc'} />
					<AgGridColumn field={'lastModificationTime'} headerName={"最后修改时间"} width={100} type={'dateTimeColumn'} />
					<AgGridColumn field={'remark'} headerName={intl.formatMessage({ id: 'WMS:Remark' })} flex={1} />
					<AgGridColumn field={"action"} headerName={intl.formatMessage({ id: "AbpUi:Actions" })} width={180} pinned={"right"} filter={false} sortable={false} cellRenderer={Options}
						cellRendererParams={{ onRefresh }} />
				</AgGridPlus>
			</Allotment.Pane>

			<Allotment.Pane snap>
				<CountOrderDetail data={selectedRow} />
			</Allotment.Pane>
		</Allotment>
	);
};

export default CountOrderPage;
export const routeProps = {
	name: '盘点清单',
};
