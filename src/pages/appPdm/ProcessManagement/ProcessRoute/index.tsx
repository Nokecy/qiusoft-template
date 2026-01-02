import React, { useRef, useMemo, useState, useCallback } from 'react';
import { AgGridPlus } from '@/components/agGrid';
import { Button, Space, message, Tag, Dropdown, Modal } from 'antd';
import type { MenuProps } from 'antd';
import {
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
	EyeOutlined,
	SendOutlined,
	RollbackOutlined,
	CheckCircleOutlined,
	DownOutlined,
	AuditOutlined,
} from '@ant-design/icons';
import { history, Access, useAccess, useIntl } from '@umijs/max';
import type { ICellRendererParams } from 'ag-grid-community';
import type { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DeleteConfirm from '@/components/deleteConfirm';
import dayjs from 'dayjs';
import {
	ProcessRouteGetListAsync,
	ProcessRouteDeleteAsync,
	ProcessRouteSubmitAsync,
	ProcessRouteCheckAsync,
	ProcessRouteUnCheckAsync,
	ProcessRouteUnSubmitAsync,
} from '@/services/pdm/ProcessRoute';
import { ProcessRoutePermissions } from '@/pages/appPdm/_permissions';

// 状态枚举（与后端 CraftRouteStatus 保持一致）
enum ProcessRouteStatus {
	草稿 = 'B1',
	待审批 = 'C1',
	审批 = 'D1',
}

// 状态配置
const statusEnum = [
	{ label: '草稿', value: ProcessRouteStatus.草稿, color: 'default' },
	{ label: '待审批', value: ProcessRouteStatus.待审批, color: 'processing' },
	{ label: '已审批', value: ProcessRouteStatus.审批, color: 'success' },
];

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
	const { data, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const canUpdate = !!(access && access[ProcessRoutePermissions.Update]);
	const canDelete = !!(access && access[ProcessRoutePermissions.Delete]);

	// 查看工艺路线
	const handleView = () => {
		history.push(`/appPdm/ProcessManagement/ProcessRoute/form?id=${data.id}&mode=view`);
	};

	// 编辑工艺路线
	const handleEdit = () => {
		history.push(`/appPdm/ProcessManagement/ProcessRoute/form?id=${data.id}`);
	};

	// 删除工艺路线
	const handleDelete = async (id: number) => {
		const hide = message.loading('正在操作,请稍后', 0);
		try {
			await ProcessRouteDeleteAsync({ id });
			message.success('删除成功');
			onRefresh();
		} catch (error) {
			message.error('删除失败');
			console.error('删除工艺路线失败:', error);
		} finally {
			hide();
		}
	};

	const isDraft = data.status === ProcessRouteStatus.草稿;

	return (
		<Space size={4}>
			<Button
				type="link"
				size="small"
				icon={<EyeOutlined />}
				onClick={handleView}
				title={intl.formatMessage({ id: 'AbpUi:View' })}
			/>
			<Access accessible={!!canUpdate}>
				<Button
					type="link"
					size="small"
					icon={<EditOutlined />}
					onClick={handleEdit}
					disabled={!isDraft}
					title={intl.formatMessage({ id: 'AbpUi:Edit' })}
				/>
			</Access>
			<Access accessible={!!canDelete}>
				<DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
					<Button
						type="link"
						size="small"
						danger
						icon={<DeleteOutlined />}
						disabled={!isDraft}
						title={intl.formatMessage({ id: 'AbpUi:Delete' })}
					/>
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

/**
 * 工艺路线列表页
 */
const ProcessRoutePage: React.FC = () => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	// 权限检查
	const canCreate = !!(access && access[ProcessRoutePermissions.Create]);
	const canSubmit = !!(access && access[ProcessRoutePermissions.Submit]);
	const canUnSubmit = !!(access && access[ProcessRoutePermissions.UnSubmit]);
	const canCheck = !!(access && access[ProcessRoutePermissions.Check]);
	const canUnCheck = !!(access && access[ProcessRoutePermissions.UnCheck]);

	// 单选状态
	const [selectedRow, setSelectedRow] = useState<any>(null);
	// 审核操作 loading
	const [actionLoading, setActionLoading] = useState(false);

	// 刷新列表
	const onRefresh = useCallback(() => {
		gridRef.current?.onRefresh();
		setSelectedRow(null);
	}, []);

	// 新建工艺路线
	const handleCreate = () => {
		history.push('/appPdm/ProcessManagement/ProcessRoute/form');
	};

	// 行选择事件
	const handleSelectionChanged = useCallback((event: any) => {
		const selectedNodes = event.api.getSelectedNodes();
		setSelectedRow(selectedNodes.length > 0 ? selectedNodes[0].data : null);
	}, []);

	// 提交审核
	const handleSubmit = useCallback(async () => {
		if (!selectedRow?.id) {
			message.warning('请先选择一条记录');
			return;
		}
		if (selectedRow.status !== ProcessRouteStatus.草稿) {
			message.warning('只有草稿状态的工艺路线才能提交');
			return;
		}
		setActionLoading(true);
		try {
			await ProcessRouteSubmitAsync({ id: selectedRow.id });
			message.success('提交成功');
			onRefresh();
		} catch (error: any) {
			message.error(error?.message || '提交失败');
		} finally {
			setActionLoading(false);
		}
	}, [selectedRow, onRefresh]);

	// 审核通过
	const handleCheck = useCallback(async () => {
		if (!selectedRow?.id) {
			message.warning('请先选择一条记录');
			return;
		}
		if (selectedRow.status !== ProcessRouteStatus.待审批) {
			message.warning('只有待审批状态的工艺路线才能审核');
			return;
		}
		setActionLoading(true);
		try {
			await ProcessRouteCheckAsync({ id: selectedRow.id });
			message.success('审核通过');
			onRefresh();
		} catch (error: any) {
			message.error(error?.message || '审核失败');
		} finally {
			setActionLoading(false);
		}
	}, [selectedRow, onRefresh]);

	// 取消审核
	const handleUnCheck = useCallback(async () => {
		if (!selectedRow?.id) {
			message.warning('请先选择一条记录');
			return;
		}
		if (selectedRow.status !== ProcessRouteStatus.审批) {
			message.warning('只有已审批状态的工艺路线才能取消审核');
			return;
		}
		setActionLoading(true);
		try {
			await ProcessRouteUnCheckAsync({ id: selectedRow.id });
			message.success('取消审核成功');
			onRefresh();
		} catch (error: any) {
			message.error(error?.message || '取消审核失败');
		} finally {
			setActionLoading(false);
		}
	}, [selectedRow, onRefresh]);

	// 取消提交
	const handleUnSubmit = useCallback(async () => {
		if (!selectedRow?.id) {
			message.warning('请先选择一条记录');
			return;
		}
		if (selectedRow.status !== ProcessRouteStatus.待审批) {
			message.warning('只有待审批状态的工艺路线才能取消提交');
			return;
		}
		setActionLoading(true);
		try {
			await ProcessRouteUnSubmitAsync({ id: selectedRow.id });
			message.success('取消提交成功');
			onRefresh();
		} catch (error: any) {
			message.error(error?.message || '取消提交失败');
		} finally {
			setActionLoading(false);
		}
	}, [selectedRow, onRefresh]);

	// 判断按钮是否可用
	const isDraft = selectedRow?.status === ProcessRouteStatus.草稿;
	const isPending = selectedRow?.status === ProcessRouteStatus.待审批;
	const isApproved = selectedRow?.status === ProcessRouteStatus.审批;

	// 审核操作下拉菜单
	const approvalMenuItems: MenuProps['items'] = [
		{
			key: 'submit',
			label: '提交',
			icon: <SendOutlined />,
			disabled: !selectedRow || !isDraft || !canSubmit,
		},
		{
			key: 'unsubmit',
			label: '取消提交',
			icon: <RollbackOutlined />,
			disabled: !selectedRow || !isPending || !canUnSubmit,
		},
		{ type: 'divider' },
		{
			key: 'check',
			label: '审核',
			icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
			disabled: !selectedRow || !isPending || !canCheck,
		},
		{
			key: 'uncheck',
			label: '取消审核',
			icon: <RollbackOutlined />,
			disabled: !selectedRow || !isApproved || !canUnCheck,
		},
	];

	// 菜单点击处理
	const handleApprovalMenuClick: MenuProps['onClick'] = ({ key }) => {
		if (!selectedRow) {
			message.warning('请先选择一条记录');
			return;
		}
		switch (key) {
			case 'submit':
				if (!isDraft) {
					message.warning('只有草稿状态的工艺路线才能提交');
					return;
				}
				Modal.confirm({
					title: '确定要提交吗？',
					content: '提交后工艺路线将进入待审批状态',
					onOk: handleSubmit,
				});
				break;
			case 'unsubmit':
				if (!isPending) {
					message.warning('只有待审批状态的工艺路线才能取消提交');
					return;
				}
				Modal.confirm({
					title: '确定要取消提交吗？',
					content: '取消提交后工艺路线将返回草稿状态',
					onOk: handleUnSubmit,
				});
				break;
			case 'check':
				if (!isPending) {
					message.warning('只有待审批状态的工艺路线才能审核');
					return;
				}
				Modal.confirm({
					title: '确定要审核通过吗？',
					content: '审核通过后工艺路线将进入已审批状态',
					onOk: handleCheck,
				});
				break;
			case 'uncheck':
				if (!isApproved) {
					message.warning('只有已审批状态的工艺路线才能取消审核');
					return;
				}
				Modal.confirm({
					title: '确定要取消审核吗？',
					content: '取消审核后工艺路线将返回待审批状态',
					onOk: handleUnCheck,
				});
				break;
		}
	};

	// 列定义
	const columnDefs = useMemo(
		() => [
			{
				field: 'code',
				headerName: '工艺路线编码',
				width: 160,
				pinned: 'left',
				cellRenderer: ({ value, data }: ICellRendererParams) => {
					if (!value) return '';
					return (
						<a
							onClick={(e) => {
								e.stopPropagation();
								history.push(`/appPdm/ProcessManagement/ProcessRoute/form?id=${data.id}&mode=view`);
							}}
							style={{ color: '#1890ff', cursor: 'pointer' }}
						>
							{value}
						</a>
					);
				},
			},
			{
				field: 'version',
				headerName: '版本',
				width: 80,
			},
			{
				field: 'name',
				headerName: '工艺路线名称',
				width: 200,
			},
			{
				field: 'materialCode',
				headerName: '物料编码',
				width: 160,
			},
			{
				field: 'materialDescription',
				headerName: '物料描述',
				width: 200,
				hideInSearch: true,
			},
			{
				field: 'materialOutCode',
				headerName: '物料外部编码',
				width: 160,
				hideInSearch: true,
			},
			{
				field: 'status',
				headerName: '状态',
				width: 100,
				valueEnum: statusEnum,
				cellRenderer: ({ value }: ICellRendererParams) => {
					const status = statusEnum.find((s) => s.value === value);
					return <Tag color={status?.color}>{status?.label || '未知'}</Tag>;
				},
			},
			{
				field: 'versionPublishDate',
				headerName: '版本发布日期',
				width: 140,
				hideInSearch: true,
				cellRenderer: ({ value }: ICellRendererParams) =>
					value ? dayjs(value).format('YYYY-MM-DD') : '-',
			},
			{
				field: 'submiter',
				headerName: '提交人',
				width: 100,
				hideInSearch: true,
			},
			{
				field: 'submitDate',
				headerName: '提交日期',
				width: 140,
				hideInSearch: true,
				cellRenderer: ({ value }: ICellRendererParams) =>
					value ? dayjs(value).format('YYYY-MM-DD') : '-',
			},
			{
				field: 'memo',
				headerName: '备注',
				width: 200,
				hideInSearch: true,
			},
			{
				field: 'creationTime',
				headerName: '创建时间',
				width: 160,
				hideInSearch: true,
				initialSort: 'desc',
				cellRenderer: ({ value }: ICellRendererParams) =>
					value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-',
			},
			{
				field: 'action',
				headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
				width: 150,
				pinned: 'right',
				filter: false,
				sortable: false,
				cellRenderer: Options,
				cellRendererParams: { onRefresh },
			},
		],
		[intl, onRefresh]
	);

	return (
		<AgGridPlus
			gridRef={gridRef}
			gridKey="appPdm.ProcessManagement.ProcessRoute"
			headerTitle="工艺路线管理"
			request={async (params: any) => {
				const data = await ProcessRouteGetListAsync({
					PageSize: params!.maxResultCount,
					Filter: params?.filter,
					MaxResultCount: params!.maxResultCount,
					SkipCount: params!.skipCount,
					Sorting: params!.sorter!,
				});
				return {
					success: true,
					data: data.items || [],
					total: data.totalCount || 0,
				};
			}}
			rowSelection={'single'}
			onSelectionChanged={handleSelectionChanged}
			columnDefs={columnDefs}
			toolBarRender={() => [
				<Access key="create" accessible={!!canCreate}>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={handleCreate}
					>
						新建工艺路线
					</Button>
				</Access>,
				<Access key="approval" accessible={!!(canSubmit || canCheck || canUnCheck)}>
					<Dropdown
						menu={{
							items: approvalMenuItems,
							onClick: handleApprovalMenuClick,
						}}
						disabled={!selectedRow}
					>
						<Button icon={<AuditOutlined />} loading={actionLoading}>
							审核操作 <DownOutlined />
						</Button>
					</Dropdown>
				</Access>,
			]}
		/>
	);
};

// 导出路由配置
export const routeProps = {
	name: '工艺路线管理',
};

export default ProcessRoutePage;
