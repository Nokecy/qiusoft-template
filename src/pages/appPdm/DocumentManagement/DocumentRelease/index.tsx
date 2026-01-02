import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Access, history, useAccess, useIntl } from 'umi';
import { Button, Space, message, Segmented } from 'antd';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import {
	PlusOutlined,
	DeleteOutlined,
	EditOutlined,
	SendOutlined,
	CheckOutlined,
	CloseOutlined,
	ThunderboltOutlined,
	FileTextOutlined,
} from '@ant-design/icons';
import {
	DocumentReleaseGetListAsync,
	DocumentReleaseDeleteAsync,
	DocumentReleaseSubmitAsync,
	DocumentReleaseExecuteAsync,
	DocumentReleaseCloseAsync,
	DocumentReleaseConfirmReceiptAsync,
} from '@/services/pdm/DocumentRelease';
import { ReleaseDocumentItemGetListAsync } from '@/services/pdm/ReleaseDocumentItem';
import { DocumentReleasePermissions } from './_permissions';
import { DocumentReleaseStatus, documentReleaseStatusEnum, recallStatusEnum } from './_components/enums';

export const routeProps = {
	name: '文档发放',
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void; viewMode: 'detail' | 'header' }) => {
	const { data, onRefresh, viewMode } = props;
	const intl = useIntl();
	const access = useAccess();

	const canUpdate = (access && (access[DocumentReleasePermissions.Update] ?? true)) as boolean;
	const canDelete = (access && (access[DocumentReleasePermissions.Delete] ?? true)) as boolean;
	const canSubmit = (access && (access[DocumentReleasePermissions.Submit] ?? true)) as boolean;
	const canApprove = (access && (access[DocumentReleasePermissions.Approve] ?? true)) as boolean;
	const canReject = (access && (access[DocumentReleasePermissions.Reject] ?? true)) as boolean;
	const canExecute = (access && (access[DocumentReleasePermissions.Execute] ?? true)) as boolean;
	const canClose = (access && (access[DocumentReleasePermissions.Close] ?? true)) as boolean;
	const canConfirmReceipt = (access && (access[DocumentReleasePermissions.ConfirmReceipt] ?? true)) as boolean;

	// 处理删除
	const handleDelete = (id: any) => {
		const hide = message.loading('正在删除...', 0);
		return DocumentReleaseDeleteAsync({ id })
			.then(() => {
				message.success('删除成功');
				onRefresh();
			})
			.catch((error) => {
				message.error(error?.message || '删除失败');
			})
			.finally(() => hide());
	};

	// 处理提交
	const handleSubmit = (id: any) => {
		const hide = message.loading('正在提交...', 0);
		return DocumentReleaseSubmitAsync({ id })
			.then(() => {
				message.success('提交成功');
				onRefresh();
			})
			.catch((error) => {
				message.error(error?.message || '提交失败');
			})
			.finally(() => hide());
	};

	// 注意：审批和拒绝功能已移除，因为对应的 API 不存在
	// 请使用工作流执行页面进行审批操作

	// 处理执行发放
	const handleExecute = (id: any) => {
		const hide = message.loading('正在发放...', 0);
		return DocumentReleaseExecuteAsync({ id })
			.then(() => {
				message.success('发放成功');
				onRefresh();
			})
			.catch((error) => {
				message.error(error?.message || '发放失败');
			})
			.finally(() => hide());
	};

	// 处理关闭
	const handleClose = (id: any) => {
		const hide = message.loading('正在关闭...', 0);
		return DocumentReleaseCloseAsync({ id })
			.then(() => {
				message.success('关闭成功');
				onRefresh();
			})
			.catch((error) => {
				message.error(error?.message || '关闭失败');
			})
			.finally(() => hide());
	};

	// 处理确认接收
	const handleConfirmReceipt = (id: any) => {
		const hide = message.loading('正在确认接收...', 0);
		return DocumentReleaseConfirmReceiptAsync({ id })
			.then(() => {
				message.success('确认接收成功');
				onRefresh();
			})
			.catch((error) => {
				message.error(error?.message || '确认接收失败');
			})
			.finally(() => hide());
	};

	// 根据状态判断显示哪些按钮
	const canShowEditButton = data.status === DocumentReleaseStatus.Draft;
	const allowOperate = viewMode === 'header';
	const canShowSubmitButton = data.status === DocumentReleaseStatus.Draft;
	const canShowApproveButton = data.status === DocumentReleaseStatus.PendingApproval;
	const canShowRejectButton = data.status === DocumentReleaseStatus.PendingApproval;
	const canShowExecuteButton = data.status === DocumentReleaseStatus.Approved;
	const canShowConfirmReceiptButton =
		data.status === DocumentReleaseStatus.Released ||
		data.status === DocumentReleaseStatus.PartiallyRecalled;
	const canShowCloseButton = data.status === DocumentReleaseStatus.FullyRecalled;
	const canShowDeleteButton = data.status === DocumentReleaseStatus.Draft;

	return (
		<Space size="small">
			{/* 查看详情 - 所有状态都可查看 */}
			<Button
				size="small"
				icon={<FileTextOutlined />}
				type="link"
				title="查看详情"
				onClick={() => {
					const targetId = viewMode === 'detail' ? data.documentReleaseId : data.id;
					history.push(`/appPdm/DocumentManagement/DocumentRelease/detail?id=${targetId}`);
				}}
			/>

			{/* 编辑 - 仅草稿状态可编辑 */}
			<Access accessible={allowOperate && canUpdate && canShowEditButton}>
				<Button
					size="small"
					icon={<EditOutlined />}
					type="link"
					title="编辑"
					onClick={() => history.push(`/appPdm/DocumentManagement/DocumentRelease/form?id=${data.id}`)}
				/>
			</Access>

			{/* 提交 - 仅草稿状态可提交 */}
			<Access accessible={allowOperate && canSubmit && canShowSubmitButton}>
				<DeleteConfirm title="确定提交该文档发放单?" onConfirm={() => handleSubmit(data.id)}>
					<Button size="small" icon={<SendOutlined />} type="link" title="提交" />
				</DeleteConfirm>
			</Access>

			{/* 审批和拒绝按钮已移除，请使用工作流执行页面进行审批操作 */}

			{/* 执行发放 - 已审批状态 */}
			<Access accessible={allowOperate && canExecute && canShowExecuteButton}>
				<DeleteConfirm title="确定执行发放该文档?" onConfirm={() => handleExecute(data.id)}>
					<Button size="small" icon={<ThunderboltOutlined />} type="link" title="执行发放" />
				</DeleteConfirm>
			</Access>

			{/* 确认接收 - 已发放或部分确认状态 */}
			<Access accessible={allowOperate && canConfirmReceipt && canShowConfirmReceiptButton}>
				<DeleteConfirm title="确定确认接收该文档?" onConfirm={() => handleConfirmReceipt(data.id)}>
					<Button size="small" icon={<CheckOutlined />} type="link" title="确认接收" />
				</DeleteConfirm>
			</Access>

			{/* 关闭 - 已确认状态 */}
			<Access accessible={allowOperate && canClose && canShowCloseButton}>
				<DeleteConfirm title="确定关闭该文档发放单?" onConfirm={() => handleClose(data.id)}>
					<Button size="small" icon={<CloseOutlined />} type="link" title="关闭" />
				</DeleteConfirm>
			</Access>

			{/* 删除 - 仅草稿状态可删除 */}
			<Access accessible={allowOperate && canDelete && canShowDeleteButton}>
				<DeleteConfirm title="确定删除该文档发放记录吗?" onConfirm={() => handleDelete(data.id)}>
					<Button
						size="small"
						icon={<DeleteOutlined />}
						type="link"
						title={intl.formatMessage({ id: 'AbpUi:Delete' })}
					/>
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const DocumentReleasePage: React.FC = () => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();
	const canCreate = (access && (access[DocumentReleasePermissions.Create] ?? true)) as boolean;
	const [viewMode, setViewMode] = useState<'detail' | 'header'>('detail');
  const didMountRef = useRef(false);

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    onRefresh();
  }, [viewMode]);

	const headerColumnDefs = useMemo(() => [
		{
			field: 'releaseNumber',
			headerName: '发文号',
			width: 150,
			cellRenderer: (params: ICellRendererParams) => (
				<a
					style={{ color: '#1890ff', cursor: 'pointer' }}
					onClick={() =>
						history.push(`/appPdm/DocumentManagement/DocumentRelease/detail?id=${params.data.id}`)
					}
				>
					{params.value}
				</a>
			)
		},
		{ field: 'title', headerName: '发放标题', width: 200 },
		{ field: 'description', headerName: '发放说明', width: 250, hideInSearch: true },
		{ field: 'approverName', headerName: '审批人姓名', width: 120 },
		{ field: 'status', headerName: '发放状态', width: 120, valueEnum: documentReleaseStatusEnum },
		{ field: 'approvedAt', headerName: '审批通过时间', width: 160, hideInSearch: true, type: 'dateTimeColumn' },
		{ field: 'releasedAt', headerName: '实际发放时间', width: 160, hideInSearch: true, type: 'dateTimeColumn' },
		{ field: 'closedAt', headerName: '关闭时间', width: 160, hideInSearch: true, type: 'dateTimeColumn' },
		{ field: 'creator', headerName: '创建人', width: 120 },
		{ field: 'creationTime', headerName: '创建时间', width: 160, hideInSearch: true, type: 'dateTimeColumn', initialSort: 'desc' },
		{ field: 'lastModificationTime', headerName: '最后修改时间', width: 160, hideInSearch: true, type: 'dateTimeColumn' },
		{
			field: 'action',
			headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
			width: 300,
			pinned: 'right',
			filter: false,
			sortable: false,
			cellRenderer: Options,
			cellRendererParams: { onRefresh, viewMode: 'header' }
		}
	], [intl, onRefresh]);

	const detailColumnDefs = useMemo(() => [
		{
			field: 'releaseNumber',
			headerName: '发文号',
			width: 150,
			cellRenderer: (params: any) => {
				const { data } = params;
				return (
					<a
						onClick={() => history.push(`/appPdm/DocumentManagement/DocumentRelease/detail?id=${data.documentReleaseId}`)}
						style={{ color: '#1890ff', cursor: 'pointer' }}
					>
						{data.releaseNumber}
					</a>
				);
			}
		},
		{ field: 'releaseTitle', headerName: '发放标题', width: 200 },
		{ field: 'releaseStatus', headerName: '发放状态', width: 120, valueEnum: documentReleaseStatusEnum },
		{ field: 'releaserName', headerName: '发放人', width: 120, hideInSearch: true },
		{ field: 'releasedAt', headerName: '发放时间', width: 160, hideInSearch: true },
		{ field: 'effectiveDate', headerName: '生效日期', width: 120, hideInSearch: true },
		{ field: 'documentNumber', headerName: '文档编号', width: 150 },
		{ field: 'documentName', headerName: '文档名称', width: 200 },
		{ field: 'releaseVersion', headerName: '发放版本号', width: 120, hideInSearch: true },
		{ field: 'recallVersion', headerName: '回收版本号', width: 120, hideInSearch: true },
		{ field: 'copies', headerName: '份数', width: 100, hideInSearch: true },
		{
			field: 'isFirstRelease',
			headerName: '是否首发',
			width: 100,
			hideInSearch: true,
			cellRenderer: (params: any) => (params.value ? '是' : '否'),
		},
		{
			field: 'requiresConfirmation',
			headerName: '是否需要确认',
			width: 120,
			hideInSearch: true,
			cellRenderer: (params: any) => (params.value ? '是' : '否'),
		},
		{
			field: 'isRecalled',
			headerName: '是否已回收',
			width: 120,
			hideInSearch: true,
			cellRenderer: (params: any) => (params.value ? '是' : '否'),
		},
		{ field: 'recallStatus', headerName: '回收状态', width: 120, valueEnum: recallStatusEnum },
		{ field: 'expectedRecallDate', headerName: '预计回收时间', width: 120, hideInSearch: true },
		{ field: 'actualRecallDate', headerName: '实际回收日期', width: 120, hideInSearch: true },
		{ field: 'remarks', headerName: '备注', width: 200, hideInSearch: true },
		{
			field: 'action',
			headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
			width: 120,
			pinned: 'right',
			filter: false,
			sortable: false,
			cellRenderer: Options,
			cellRendererParams: { onRefresh, viewMode: 'detail' }
		}
	], [intl, onRefresh]);

	const columnDefs = viewMode === 'detail' ? detailColumnDefs : headerColumnDefs;
	const gridKey = viewMode === 'detail'
		? 'appPdm.DocumentManagement.DocumentRelease.detail'
		: 'appPdm.DocumentManagement.DocumentRelease';

	return (
		<AgGridPlus
			key={gridKey}
			gridRef={gridRef}
			headerTitle="文档发放列表"
			gridKey={gridKey}
			request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
				const isDetail = viewMode === 'detail';
				if (isDetail) {
					const data = await ReleaseDocumentItemGetListAsync({
						MaxResultCount: params?.maxResultCount,
						SkipCount: params?.skipCount,
						Filter: params?.filter,
						Sorting: params?.sorter || 'creationTime desc',
						ReleaseStatus: params?.ReleaseStatus,
						RecallStatus: params?.RecallStatus,
					});
					return {
						success: true,
						data: data.items || [],
						total: data.totalCount || 0,
					};
				}
				const data = await DocumentReleaseGetListAsync({
					Filter: params?.filter,
					SkipCount: params?.skipCount,
					MaxResultCount: params?.maxResultCount,
					Sorting: params?.sorter,
				} as any);
				return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
			}}
			columnDefs={columnDefs}
			toolBarRender={() => [
				<Segmented
					key="view-mode"
					value={viewMode}
					onChange={(value) => {
						setViewMode(value as 'detail' | 'header');
					}}
					options={[
						{ label: '明细视图', value: 'detail' },
						{ label: '主单视图', value: 'header' },
					]}
				/>,
				<Access key="create" accessible={canCreate}>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => history.push('/appPdm/DocumentManagement/DocumentRelease/form')}
					>
						新建
					</Button>
				</Access>,
			]}
		/>
	);
};

export default DocumentReleasePage;
