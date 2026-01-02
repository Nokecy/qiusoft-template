import { AgGridPlus } from '@/components/agGrid';
import { DocumentGetListAsync, DocumentDeleteAsync } from '@/services/pdm/Document';
import {
	DocumentLifecycleSubmitForApprovalAsync,
	DocumentLifecycleApproveAsync,
	DocumentLifecycleReleaseAsync,
} from '@/services/pdm/DocumentLifecycle';
import {
	DeleteOutlined,
	EditOutlined,
	SendOutlined,
	CheckOutlined,
	EyeOutlined,
	LockOutlined,
	UnlockOutlined,
	StopOutlined,
	RocketOutlined,
	UploadOutlined,
	FileAddOutlined,
	CloudUploadOutlined,
	MoreOutlined,
} from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Dropdown, MenuProps, Tag, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import { Access, useAccess, useIntl, history, useModel } from 'umi';
import DocumentFormDialog from './components/DocumentFormDialog';
import BatchUploadDialog from './components/BatchUploadDialog';
import UploadDocumentDialog from './components/UploadDocumentDialog';
import UploadDocumentsForPartDialog from './components/UploadDocumentsForPartDialog';
import ForceUnlockDialog from './components/ForceUnlockDialog';
import DiscardRevisionDialog from './components/DiscardRevisionDialog';
import CheckOutDialog from './components/CheckOutDialog';
import CheckInDialog from './components/CheckInDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { DocumentPermissions } from '@/pages/appPdm/_permissions';
import {
	PublishState,
	RevisionState,
	publishStateConfig,
	revisionStateConfig,
	derivePublishState,
	canCheckOut,
	canCheckIn,
	canForceUnlock,
	canDiscardRevision,
	canSubmit,
	canApprove,
	canRelease,
	canEdit,
	isUnreleasedDocument,
	formatVersionNumber,
} from './_utils/documentStatus';

// 生命周期状态枚举
enum DocumentState {
	Draft = 0, // 草稿（初始状态）
	InApproval = 1, // 审批中
	Approved = 2, // 已批准（审批通过，但未发布）
	Released = 3, // 已发布（正式生效）
	Archived = 4, // 已归档（不再使用，但保留记录）
	Obsolete = 5, // 已作废（彻底废弃）
}

const stateEnum = [
	{ label: '草稿', value: DocumentState.Draft, color: '#faad14' },
	{ label: '审批中', value: DocumentState.InApproval, color: '#1890ff' },
	{ label: '已批准', value: DocumentState.Approved, color: '#13c2c2' },
	{ label: '已发布', value: DocumentState.Released, color: '#52c41a' },
	{ label: '已归档', value: DocumentState.Archived, color: '#722ed1' },
	{ label: '已作废', value: DocumentState.Obsolete, color: '#d9d9d9' },
];

// 关系用途枚举
enum RelationUsage {
	Reference = 10, // 参考
	Design = 20, // 设计
	Manufacturing = 30, // 制造
	Assembly = 40, // 装配
	Testing = 50, // 测试
	Maintenance = 60, // 维护
	Quality = 70, // 质量
	Packaging = 80, // 包装
	Documentation = 90, // 文档
	Other = 999, // 其他
}

const relationUsageEnum = [
	{ label: '参考', value: RelationUsage.Reference, color: '#8c8c8c' },
	{ label: '设计', value: RelationUsage.Design, color: '#1890ff' },
	{ label: '制造', value: RelationUsage.Manufacturing, color: '#52c41a' },
	{ label: '装配', value: RelationUsage.Assembly, color: '#13c2c2' },
	{ label: '测试', value: RelationUsage.Testing, color: '#faad14' },
	{ label: '维护', value: RelationUsage.Maintenance, color: '#722ed1' },
	{ label: '质量', value: RelationUsage.Quality, color: '#f5222d' },
	{ label: '包装', value: RelationUsage.Packaging, color: '#fa8c16' },
	{ label: '文档', value: RelationUsage.Documentation, color: '#2f54eb' },
	{ label: '其他', value: RelationUsage.Other, color: '#d9d9d9' },
];

// 安全级别枚举
enum SecurityLevel {
	Public = 0, // 公开（无访问限制）
	Internal = 1, // 内部（公司内部可见）
	Confidential = 2, // 机密（需要特定权限）
	Secret = 3, // 高度机密（严格权限控制）
	TopSecret = 4, // 绝密（最高级别保密）
}

const securityLevelEnum = [
	{ label: '公开', value: SecurityLevel.Public, color: '#52c41a' },
	{ label: '内部', value: SecurityLevel.Internal, color: '#1890ff' },
	{ label: '机密', value: SecurityLevel.Confidential, color: '#faad14' },
	{ label: '高度机密', value: SecurityLevel.Secret, color: '#ff4d4f' },
	{ label: '绝密', value: SecurityLevel.TopSecret, color: '#722ed1' },
];

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
	const { data, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const { initialState } = useModel('@@initialState');
	const currentUserId = initialState?.configuration?.currentUser?.id;

	const hasUpdatePerm = (access && (access[DocumentPermissions.Update] ?? true)) as boolean;
	const hasDeletePerm = (access && (access[DocumentPermissions.Delete] ?? true)) as boolean;
	const hasSubmitPerm = (access && (access[DocumentPermissions.Submit] ?? true)) as boolean;
	const hasApprovePerm = (access && (access[DocumentPermissions.Approve] ?? true)) as boolean;
	const hasCheckOutPerm = (access && (access[DocumentPermissions.CheckOut] ?? true)) as boolean;
	const hasCheckInPerm = (access && (access[DocumentPermissions.CheckIn] ?? true)) as boolean;
	const hasForceUnlockPerm = (access && (access[DocumentPermissions.ForceUnlock] ?? false)) as boolean;
	const hasDiscardRevisionPerm = (access && (access[DocumentPermissions.DiscardRevision] ?? false)) as boolean;

	// 弹窗状态
	const [forceUnlockVisible, setForceUnlockVisible] = useState(false);
	const [discardRevisionVisible, setDiscardRevisionVisible] = useState(false);
	const [checkOutVisible, setCheckOutVisible] = useState(false);
	const [checkInVisible, setCheckInVisible] = useState(false);

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return DocumentDeleteAsync({ id })
			.then(() => onRefresh())
			.finally(() => hide());
	};

	const handleSubmitForApproval = (id: any) => {
		const hide = message.loading('正在提交审批,请稍后', 0);
		return DocumentLifecycleSubmitForApprovalAsync({ id })
			.then(() => {
				message.success('提交审批成功');
				onRefresh();
			})
			.catch(error => {
				message.error(error?.message || '提交审批失败,请重试');
			})
			.finally(() => hide());
	};

	const handleApprove = (id: any) => {
		const hide = message.loading('正在审批,请稍后', 0);
		return DocumentLifecycleApproveAsync({ id })
			.then(() => {
				message.success('审批通过');
				onRefresh();
			})
			.catch(error => {
				message.error(error?.message || '审批失败,请重试');
			})
			.finally(() => hide());
	};

	// CheckOut/CheckIn/ForceUnlock/DiscardRevision 通过弹窗组件处理

	const handleRelease = (id: any) => {
		const hide = message.loading('正在发布文档,请稍后', 0);
		return DocumentLifecycleReleaseAsync({ id })
			.then(() => {
				message.success('文档发布成功');
				onRefresh();
			})
			.catch(error => {
				message.error(error?.message || '发布失败,请重试');
			})
			.finally(() => hide());
	};

	// 按钮可见性逻辑（方案B：使用状态工具函数）
	const isUnreleased = isUnreleasedDocument(data);

	// 编辑：草稿状态且（未锁定或本人锁定）
	const canShowEditButton = canEdit(data, currentUserId);
	// 提交审批：草稿状态且未锁定
	const canShowSubmitButton = canSubmit(data);
	// 批准：审批中状态
	const canShowApproveButton = canApprove(data);
	// 发布：已批准状态
	const canShowReleaseButton = canRelease(data);
	// 检出：已发布且无当前修订且未检出（未发布文档不显示）
	const canShowCheckOutButton = !isUnreleased && canCheckOut(data);
	// 签入：已检出且本人检出
	const canShowCheckInButton = canCheckIn(data, currentUserId);
	// 强制解锁：已检出且存在当前修订（需管理员权限）
	const canShowForceUnlockButton = canForceUnlock(data);
	// 撤销修订：存在当前修订且为草稿状态
	const canShowDiscardRevisionButton = canDiscardRevision(data);

	return (
		<>
			<Space>
				<Button size={'small'} icon={<EyeOutlined />} type={'link'} title='查看详情' onClick={() => history.push(`/appPdm/DocumentManagement/Document/detail?id=${data.id}`)} />

				<Access accessible={!!hasUpdatePerm && canShowEditButton}>
					<DocumentFormDialog
						title={'编辑文档'}
						entityId={data.id}
						onAfterSubmit={onRefresh}
						buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
					/>
				</Access>

				<Access accessible={!!hasSubmitPerm && canShowSubmitButton}>
					<DeleteConfirm title='确定提交文档进入审批流程?' onConfirm={() => handleSubmitForApproval(data.id)}>
						<Button size={'small'} icon={<SendOutlined />} type={'link'} title='提交审批' />
					</DeleteConfirm>
				</Access>

				<Access accessible={!!hasApprovePerm && canShowApproveButton}>
					<DeleteConfirm title='确定审批通过该文档?' onConfirm={() => handleApprove(data.id)}>
						<Button size={'small'} icon={<CheckOutlined />} type={'link'} title='审批通过' />
					</DeleteConfirm>
				</Access>

				<Access accessible={!!hasUpdatePerm && canShowReleaseButton}>
					<DeleteConfirm title='确定发布该文档？发布后将生成版本快照。' onConfirm={() => handleRelease(data.id)}>
						<Button size={'small'} icon={<RocketOutlined />} type={'link'} title='发布' />
					</DeleteConfirm>
				</Access>

				{/* 签出（使用详细弹窗） */}
				<Access accessible={!!hasCheckOutPerm && canShowCheckOutButton}>
					<Tooltip title="签出">
						<Button
							size={'small'}
							icon={<LockOutlined />}
							type={'link'}
							onClick={() => setCheckOutVisible(true)}
						/>
					</Tooltip>
				</Access>

				{/* 签入（使用详细弹窗） */}
				<Access accessible={!!hasCheckInPerm && canShowCheckInButton}>
					<Tooltip title="签入">
						<Button
							size={'small'}
							icon={<UnlockOutlined />}
							type={'link'}
							onClick={() => setCheckInVisible(true)}
						/>
					</Tooltip>
				</Access>

				{/* 强制解锁（管理员操作） */}
				<Access accessible={hasForceUnlockPerm && canShowForceUnlockButton}>
					<Tooltip title="强制解锁（管理员）">
						<Button
							size={'small'}
							icon={<UnlockOutlined />}
							type={'link'}
							danger
							onClick={() => setForceUnlockVisible(true)}
						/>
					</Tooltip>
				</Access>

				{/* 撤销修订（高风险操作） */}
				<Access accessible={hasDiscardRevisionPerm && canShowDiscardRevisionButton}>
					<Tooltip title="撤销修订（丢弃变更）">
						<Button
							size={'small'}
							icon={<StopOutlined />}
							type={'link'}
							danger
							onClick={() => setDiscardRevisionVisible(true)}
						/>
					</Tooltip>
				</Access>

				<Access accessible={hasDeletePerm}>
					<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
						<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
					</DeleteConfirm>
				</Access>
			</Space>

			{/* 强制解锁弹窗 */}
			<ForceUnlockDialog
				visible={forceUnlockVisible}
				document={{
					id: data.id,
					documentNumber: data.documentNumber,
					documentName: data.documentName,
					checkOutInfo: data.checkOutInfo,
					currentRevisionFullVersion: formatVersionNumber(data.version, data.revision),
				}}
				onClose={() => setForceUnlockVisible(false)}
				onSuccess={onRefresh}
			/>

			{/* 撤销修订弹窗 */}
			<DiscardRevisionDialog
				visible={discardRevisionVisible}
				document={{
					id: data.id,
					documentNumber: data.documentNumber,
					documentName: data.documentName,
					latestReleasedFullVersion: formatVersionNumber(data.version, data.revision),
					currentRevisionFullVersion: formatVersionNumber(data.version, data.revision),
					workingFileCount: data.files?.length || 0,
					isCheckedOut: data.isCheckedOut,
					checkOutInfo: data.checkOutInfo,
				}}
				onClose={() => setDiscardRevisionVisible(false)}
				onSuccess={onRefresh}
			/>

			{/* 签出弹窗 */}
			<CheckOutDialog
				visible={checkOutVisible}
				document={{
					id: data.id,
					documentNumber: data.documentNumber,
					documentName: data.documentName,
					latestReleasedFullVersion: formatVersionNumber(data.version, data.revision),
				}}
				onClose={() => setCheckOutVisible(false)}
				onSuccess={onRefresh}
			/>

			{/* 签入弹窗 */}
			<CheckInDialog
				visible={checkInVisible}
				document={{
					id: data.id,
					documentNumber: data.documentNumber,
					documentName: data.documentName,
					currentRevisionFullVersion: formatVersionNumber(data.version, data.revision),
					workingFileCount: data.files?.length || 0,
					checkOutInfo: data.checkOutInfo,
				}}
				onClose={() => setCheckInVisible(false)}
				onSuccess={onRefresh}
			/>
		</>
	);
};

const PdmDocumentPage: React.FC<any> = () => {
	const gridRef = useRef<GridRef>();
	const uploadRef = useRef<any>();
	const batchUploadRef = useRef<any>();
	const uploadForPartRef = useRef<any>();
	const intl = useIntl();
	const access = useAccess();
	const canCreate = (access && (access[DocumentPermissions.Create] ?? true)) as boolean;

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	// 定义列配置
	const columns = [
		{
			field: 'documentNumber',
			headerName: '文档编号',
			width: 180,
			cellRenderer: (params: ICellRendererParams) => (
				<a style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => history.push(`/appPdm/DocumentManagement/Document/detail?id=${params.data.id}`)}>
					{params.value}
				</a>
			),
		},
		{ field: 'documentName', headerName: '文档名称', width: 220 },
		{ field: 'documentTypeName', headerName: '文档类型', width: 150, hideInSearch: true },
		{ field: 'securityLevel', headerName: '安全级别', width: 120, hideInSearch: true, valueEnum: securityLevelEnum },
		{
			field: 'primaryPartNumber',
			headerName: '物料编号',
			width: 150,
			valueGetter: (params: any) => {
				const partDocumentLinks = params.data?.partDocumentLinks;
				if (Array.isArray(partDocumentLinks)) {
					const primaryLink = partDocumentLinks.find((link: any) => link.isPrimary === true);
					return primaryLink?.partNumber || '-';
				}
				return '-';
			},
		},
		{
			field: 'primaryPartName',
			headerName: '物料名称',
			width: 180,
			valueGetter: (params: any) => {
				const partDocumentLinks = params.data?.partDocumentLinks;
				if (Array.isArray(partDocumentLinks)) {
					const primaryLink = partDocumentLinks.find((link: any) => link.isPrimary === true);
					return primaryLink?.partName || '-';
				}
				return '-';
			},
		},
		{
			field: 'primaryPartUsage',
			headerName: '物料用途',
			width: 120,
			hideInSearch: true,
			valueGetter: (params: any) => {
				const partDocumentLinks = params.data?.partDocumentLinks;
				if (Array.isArray(partDocumentLinks)) {
					const primaryLink = partDocumentLinks.find((link: any) => link.isPrimary === true);
					return primaryLink?.usage;
				}
				return undefined;
			},
			valueEnum: relationUsageEnum,
		},
		{
			field: 'fullVersion',
			headerName: '版本号',
			width: 80,
			hideInSearch: true,
			valueGetter: (params: any) => {
				const { data } = params;
				if (!data) return '-';
				return formatVersionNumber(data.version, data.revision);
			},
		},
		{
			field: 'lifecycleState',
			headerName: '状态',
			width: 180,
			hideInSearch: true,
			cellRenderer: (params: any) => {
				const { data } = params;
				if (!data) return null;
				const pubState = derivePublishState(data);
				const pubConfig = publishStateConfig[pubState];
				const hasRevision = !!data.currentRevisionId;
				const revConfig = hasRevision && data.currentRevisionState !== undefined
					? revisionStateConfig[data.currentRevisionState]
					: null;
				return (
					<Space size={4}>
						<Tag color={pubConfig.color}>{pubConfig.label}</Tag>
						{revConfig && <Tag color={revConfig.color}>{revConfig.label}</Tag>}
						{data.isCheckedOut && (
							<Tooltip title={`签出人: ${data.checkOutInfo?.checkOutUserName || '-'}`}>
								<Tag color="orange" icon={<LockOutlined />}>锁定</Tag>
							</Tooltip>
						)}
					</Space>
				);
			},
		},
		{
			field: 'checkOutUserName',
			headerName: '检出人',
			width: 120,
			hideInSearch: true,
			valueGetter: (params: any) => {
				const { data } = params;
				return data?.checkOutInfo?.checkedOutUserName || (data?.isCheckedOut ? '未知' : '-');
			},
		},
		{ field: 'keywords', headerName: '关键词', width: 200, hideInSearch: true },
		{ field: 'description', headerName: '描述', width: 260, hideInSearch: true },
		{ field: 'storageLibraryName', headerName: '存储库', width: 150, hideInSearch: true },
		{ field: 'recycleLibraryName', headerName: '回收库', width: 150, hideInSearch: true },
		{ field: 'allowCodeInconsistency', headerName: '允许编码不一致', width: 130, hideInSearch: true },
		{ field: 'obsoleteReason', headerName: '作废原因', width: 200, hideInSearch: true },
		{ field: 'obsoleteTime', headerName: '作废时间', width: 180, hideInSearch: true, type: 'dateTimeColumn' },
		{ field: 'organizationCode', headerName: '组织代码', width: 120, hideInSearch: true },
		{ field: 'organizationName', headerName: '组织名称', width: 150, hideInSearch: true },
		{ field: 'companyCode', headerName: '公司代码', width: 120, hideInSearch: true },
		{ field: 'factoryCode', headerName: '工厂代码', width: 120, hideInSearch: true },
		{ field: 'creator', headerName: '创建人', width: 120, hideInSearch: true },
		{ field: 'creationTime', headerName: '创建时间', width: 180, hideInSearch: true, type: 'dateTimeColumn' },
		{ field: 'lastModifier', headerName: '最后修改人', width: 120, hideInSearch: true },
		{ field: 'lastModificationTime', headerName: '最后修改时间', width: 180, hideInSearch: true, type: 'dateTimeColumn' },
		{
			field: 'action',
			headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
			width: 180,
			pinned: 'right',
			filter: false,
			sortable: false,
			cellRenderer: Options,
			cellRendererParams: { onRefresh },
		},
	];

	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				headerTitle={'文档列表'}
				gridKey='appPdm.DocumentManagement.Document'
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					const data = await DocumentGetListAsync({
						Filter: params?.filter,
						SkipCount: params?.skipCount,
						MaxResultCount: params?.maxResultCount,
						Sorting: params?.sorter,
					} as any);
					return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
				}}
				rowSelection={'multiple'}
				rowMultiSelectWithClick={true}
				toolBarRender={() => {
					const menuItems: MenuProps['items'] = [
						{
							key: 'upload',
							label: '按文件上传',
							icon: <CloudUploadOutlined />,
							onClick: () => uploadRef.current?.click(),
						},
						{
							key: 'batch',
							label: '批量上传',
							icon: <UploadOutlined />,
							onClick: () => batchUploadRef.current?.click(),
						},
						{
							key: 'part',
							label: '按物料和文件上传',
							icon: <FileAddOutlined />,
							onClick: () => uploadForPartRef.current?.click(),
						},
					];

					return [
						<Access key='upload' accessible={canCreate}>
							<Dropdown menu={{ items: menuItems }} placement='bottomLeft'>
								<Button type='primary' icon={<UploadOutlined />}>
									上传文档
								</Button>
							</Dropdown>
						</Access>,
					];
				}}
				columnDefs={columns}
			/>
			<div style={{ display: 'none' }}>
				<UploadDocumentDialog title={'上传文档'} onAfterSubmit={onRefresh} buttonProps={{ ref: uploadRef }} />
				<BatchUploadDialog title={'批量上传'} onAfterSubmit={onRefresh} buttonProps={{ ref: batchUploadRef }} />
				<UploadDocumentsForPartDialog title={'按物料和文件上传文档'} onAfterSubmit={onRefresh} buttonProps={{ ref: uploadForPartRef }} />
			</div>
		</>
	);
};

export default PdmDocumentPage;

export const routeProps = {
	name: '文档管理',
};
