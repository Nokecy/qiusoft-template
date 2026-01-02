import { AgGridPlus } from '@/components/agGrid';
import { SaleOrderDeleteAsync, SaleOrderCopyAsync, SaleOrderGetListAsync, SaleOrderApproveAsync, SaleOrderUnapproveAsync } from '@/services/smarterp/SaleOrder';
import { SaleOrders } from '../../_permissions';
import { DeleteOutlined, CopyOutlined, FormOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, history, useIntl } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import SaleOrderProfile from './components/saleOrderProfile';
import WorkflowStatusRender, { StatusQuery } from '@/pages/appWorkflow/_utils/workflowStatusRender';
import { orderTypeEnum } from './enums/OrderTypeEnum';
import { businessTypeEnum } from './enums/BusinessTypeEnum';
import { priceIsTaxEnum } from './enums/PriceIsTaxEnum';
import { orderStatusEnum } from './enums/OrderStatusEnum';

const executionRoute = '/appSmartErp/saleManagement/saleOrders/execution';
const updateRoute = '/appSmartErp/saleManagement/saleOrders/update';
const createRoute = '/appSmartErp/saleManagement/saleOrders/create';

const Options = (params: ICellRendererParams & { onRefresh?: () => void }) => {
	const { data, onRefresh } = params;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh?.();
	};

	const handleCopy = async (id: any) => {
		// 防止误触发 - 验证ID有效性
		if (!id || id === undefined || id === null) {
			message.error('订单ID无效，无法进行复制操作');
			return;
		}

		const hide = message.loading('正在复制,请稍后', 0);
		try {
			await SaleOrderCopyAsync({ id });
			refresh();
			message.success('复制成功');
		} catch (error) {
			console.error('复制操作失败:', error);
			message.error('复制失败，请联系管理员');
		} finally {
			hide();
		}
	};

	const handleDelete = async (id: any) => {
		// 防止误触发 - 验证ID有效性
		if (!id || id === undefined || id === null) {
			message.error('订单ID无效，无法进行删除操作');
			return;
		}

		const hide = message.loading('正在删除,请稍后', 0);
		try {
			await SaleOrderDeleteAsync({ id });
			refresh();
			message.success('删除成功');
		} catch (error) {
			console.error('删除操作失败:', error);
			message.error('删除失败，请检查订单状态或联系管理员');
		} finally {
			hide();
		}
	};

	const handleApprove = async (id: any) => {
		// 防止误触发 - 验证ID有效性
		if (!id || id === undefined || id === null) {
			message.error('订单ID无效，无法进行审核操作');
			return;
		}

		const hide = message.loading('正在审核,请稍后', 0);
		try {
			await SaleOrderApproveAsync({ id });
			refresh();
			message.success('审核成功');
		} catch (error) {
			console.error('审核操作失败:', error);
			message.error('审核失败，请检查订单状态或联系管理员');
		} finally {
			hide();
		}
	};

	const handleUnapprove = async (id: any) => {
		// 防止误触发 - 验证ID有效性
		if (!id || id === undefined || id === null) {
			message.error('订单ID无效，无法进行反审核操作');
			return;
		}

		const hide = message.loading('正在反审核,请稍后', 0);
		try {
			await SaleOrderUnapproveAsync({ id });
			refresh();
			message.success('反审核成功');
		} catch (error) {
			console.error('反审核操作失败:', error);
			message.error('反审核失败，请检查订单状态或联系管理员');
		} finally {
			hide();
		}
	};

	return (
		<Space>
			<Access accessible={!!access[SaleOrders.Update]}>
				<Button 
					size={'small'} 
					icon={<FormOutlined />} 
					type={'link'} 
					title={'编辑'} 
					onClick={() => {
						history.push(`${updateRoute}?correlationId=${data.id}`);
					}} 
				/>
			</Access>

			{/* 复制按钮 - 确保数据完整性 */}
			{data && data.id && data.orderNo && (
				<Access accessible={!!access[SaleOrders.Create]}>
					<DeleteConfirm 
						title={`确定复制订单 ${data.orderNo}?`} 
						onConfirm={() => handleCopy(data.id)}
					>
						<Button size={'small'} icon={<CopyOutlined />} type={'link'} title={'复制单据'} />
					</DeleteConfirm>
				</Access>
			)}

			{/* 审核按钮 - 草稿和退回修改状态时显示 */}
			{data && data.id && (data.status === 2 || data.status === 4 || data.status === 8 || data.status === 16) && (
				<Access accessible={!!access[SaleOrders.Update]}>
					<DeleteConfirm 
						title={`确定审核订单 ${data.orderNo || ''}?`} 
						onConfirm={() => handleApprove(data.id)}
					>
						<Button size={'small'} icon={<CheckOutlined />} type={'link'} title={'审核'} />
					</DeleteConfirm>
				</Access>
			)}

			{/* 反审核按钮 - 已审核状态时显示 */}
			{data && data.id && data.status === 32 && (
				<Access accessible={!!access[SaleOrders.Update]}>
					<DeleteConfirm 
						title={`确定反审核订单 ${data.orderNo || ''}?`}
						onConfirm={() => handleUnapprove(data.id)}
					>
						<Button size={'small'} icon={<CloseOutlined />} type={'link'} title={'反审核'} />
					</DeleteConfirm>
				</Access>
			)}

			{/* 删除按钮 - 确保数据完整性 */}
			{data && data.id && data.orderNo && (
				<Access accessible={!!access[SaleOrders.Delete]}>
					<DeleteConfirm 
						title={`确定删除订单 ${data.orderNo}? 此操作不可恢复！`} 
						onConfirm={() => handleDelete(data.id)}
					>
						<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
					</DeleteConfirm>
				</Access>
			)}
		</Space>
	);
};

const SaleOrderPage: React.FC = () => {
	const gridRef = useRef<GridRef>();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	const columnDefs = [
		{
			field: 'orderNo',
			headerName: '合同号',
			width: 150,
			pinned: 'left',
			cellRenderer: ({ value, data }: any) => {
				return <SaleOrderProfile saleOrderId={data.id} content={value} />;
			}
		},
		{
			field: 'customerCode',
			headerName: '客户编码',
			width: 120,
			pinned: 'left'
		},
		{
			field: 'customerName',
			headerName: '客户名称',
			width: 180,
			pinned: 'left'
		},
		{
			field: 'releaseDate',
			headerName: '签订日期',
			width: 120,
			type: 'dateColumn',
			initialSort: 'desc'
		},
		{
			field: 'orderType',
			headerName: '订单类型',
			width: 120,
			valueEnum: orderTypeEnum,
			cellRenderer: ({ value }: any) => {
				const item = orderTypeEnum.find(item => item.value === value);
				return item ? <Tag color={item.color}>{item.label}</Tag> : value;
			}
		},
		{
			field: 'status',
			headerName: '状态',
			width: 100,
			valueEnum: orderStatusEnum,
			cellRenderer: ({ value }: any) => {
				const item = orderStatusEnum.find(item => item.value === value);
				return item ? <Tag color={item.color}>{item.label}</Tag> : value;
			}
		},
		{
			field: 'saleCode',
			headerName: '销售员',
			width: 100
		},
		{
			field: 'consigner',
			headerName: '跟单员',
			width: 100
		},
		{
			field: 'priceIsTax',
			headerName: '是否含税',
			width: 100,
			valueEnum: priceIsTaxEnum,
			cellRenderer: ({ value }: any) => {
				const item = priceIsTaxEnum.find(item => item.value === value);
				return item ? <Tag color={item.color}>{item.label}</Tag> : value;
			}
		},
		{
			field: 'currencyAbb',
			headerName: '货币',
			width: 80
		},
		{
			field: 'currencyRate',
			headerName: '汇率',
			width: 80,
			hideInSearch: true
		},
		{
			field: 'invoiceRate',
			headerName: '税率',
			width: 80,
			hideInSearch: true
		},
		{
			field: 'settleMethodName',
			headerName: '结算方式',
			width: 120
		},
		{
			field: 'sm_Name',
			headerName: '交货方式',
			width: 120
		},
		{
			field: 'deliverMethodName',
			headerName: '交货地址',
			width: 150
		},
		{
			field: 'reciver',
			headerName: '收货人',
			width: 100
		},
		{
			field: 'reciverTel',
			headerName: '收货人电话',
			width: 120,
			hideInSearch: true
		},
		{
			field: 'reciverFax',
			headerName: '价格条款',
			width: 120
		},
		{
			field: 'businessType',
			headerName: '交易方式',
			width: 140,
			valueEnum: businessTypeEnum,
			cellRenderer: ({ value }: any) => {
				const item = businessTypeEnum.find(item => item.value === value);
				return item ? <Tag color={item.color}>{item.label}</Tag> : value;
			}
		},
		{
			field: 'earnestType',
			headerName: '定金方式',
			width: 100
		},
		{
			field: 'earnest',
			headerName: '定金额度',
			width: 100,
			hideInSearch: true
		},
		{
			field: 'memo',
			headerName: '备注',
			width: 250
		},
		{
			field: 'activityDisplayName',
			headerName: '当前节点',
			width: 120,
			hideInSearch: true
		},
		{
			field: 'assigneeName',
			headerName: '节点处理人',
			width: 120,
			hideInSearch: true
		},
		{
			field: 'status',
			headerName: '流程状态',
			width: 120,
			cellRenderer: WorkflowStatusRender,
			searchComponent: StatusQuery,
			hideInSearch: true
		},
		{
			field: 'options',
			headerName: '操作',
			pinned: 'right',
			width: 200,
			cellRenderer: Options,
			cellRendererParams: { onRefresh: onRefresh },
			hideInSearch: true
		}
	];

	return (
		<AgGridPlus
			gridRef={gridRef}
			headerTitle={'销售订单列表'}
			gridKey="sale-orders-list"
			columnDefs={columnDefs}
			request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
				let data = await SaleOrderGetListAsync({
					Filter: params?.filter,
					Sorting: params!.sorter,
					SkipCount: params!.skipCount,
					MaxResultCount: params!.maxResultCount
				});
				let requestData: any = { success: true, data: data.items || [], total: data.totalCount || 0 };
				return requestData;
			}}
			toolBarRender={() => {
				return [
					<Access accessible={!!access[SaleOrders.Create]} key="create-btn">
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() => {
								history.push(createRoute);
							}}
						>
							创建销售订单
						</Button>
					</Access>,
				];
			}}
		/>
	);
};

export default SaleOrderPage;
export const routeProps = {
	name: '销售订单',
};
