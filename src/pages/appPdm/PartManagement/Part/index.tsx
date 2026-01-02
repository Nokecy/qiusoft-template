import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import {
  PartGetListAsync,
  PartDeleteAsync,
  PartCheckOutAsync,
  PartCheckInAsync,
  PartUndoCheckOutAsync,
  PartSubmitAsync,
  PartWithdrawApprovalAsync,
  PartApproveAsync,
  PartRejectAsync,
} from '@/services/pdm/Part';
import { PartCategoryGetTreeAsync } from '@/services/pdm/PartCategory';
import { PartCategoryAttributeGetByCategoryIdAsync } from '@/services/pdm/PartCategoryAttribute';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  LockOutlined,
  UnlockOutlined,
  RollbackOutlined,
  SendOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tree, Tag, Tooltip, Modal, Input, Dropdown, Popconfirm } from 'antd';
import type { MenuProps } from 'antd';
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Access, useAccess, useIntl, history, useModel } from 'umi';
import Import from './components/import';
import Export from './components/export';
import DeleteConfirm from '@/components/deleteConfirm';
import { PartPermissions } from '@/pages/appPdm/_permissions';

type TreeNode = {
  value: string;
  label: string;
  title: string;
  key: string;
  children?: TreeNode[];
};

// 将扁平数组转换为树形结构
const buildTree = (items?: API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto[]): API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto[] => {
  if (!items || !items.length) return [];

  const map = new Map<number, any>();
  const roots: any[] = [];

  items.forEach(item => {
    map.set(item.id!, { ...item, children: [] });
  });

  items.forEach(item => {
    const node = map.get(item.id!);
    if (item.parentId === null || item.parentId === undefined) {
      roots.push(node);
    } else {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }
  });

  return roots;
};

const toTreeData = (items?: API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto[]): TreeNode[] => {
  if (!items || !items.length) return [];
  return items.map(node => {
    const treeNode: TreeNode = {
      value: String(node.id),
      key: String(node.id),
      label: node.categoryName || node.categoryCode || '-',
      title: node.categoryName || node.categoryCode || '-',
    };

    const children = (node as any).children;
    if (children && children.length > 0) {
      treeNode.children = toTreeData(children);
    }

    return treeNode;
  });
};

const useEnumMaps = () => {
  const lifecycleText: Record<number, string> = {
    0: '草稿',
    10: '审批中',
    20: '已发布',
    30: '已拒绝',
    40: '已作废',
    50: '已取消',
  };
  const lifecycleColor: Record<number, string> = {
    0: 'default',
    10: 'processing',
    20: 'success',
    30: 'error',
    40: 'default',
    50: 'warning',
  };
  return { lifecycleText, lifecycleColor };
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void; currentUserId?: string }) => {
  const { data, onRefresh, currentUserId } = props;
  const intl = useIntl();
  const access = useAccess();
  const canUpdate = (access && (access[PartPermissions.Update] ?? true)) as boolean;
  const canDelete = (access && (access[PartPermissions.Delete] ?? true)) as boolean;
  const canCheckOut = (access && (access[PartPermissions.CheckOut] ?? true)) as boolean;
  const canCheckIn = (access && (access[PartPermissions.CheckIn] ?? true)) as boolean;
  const canUndoCheckOut = (access && (access[PartPermissions.UndoCheckOut] ?? true)) as boolean;
  const [checkOutModalVisible, setCheckOutModalVisible] = useState(false);
  const [checkOutComment, setCheckOutComment] = useState('');
  const [checkOutLoading, setCheckOutLoading] = useState(false);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return PartDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  const handleViewDetail = () => {
    history.push(`/appPdm/PartManagement/Part/detail?id=${data.id}`);
  };

  // 检出操作
  const handleCheckOut = async () => {
    setCheckOutLoading(true);
    try {
      await PartCheckOutAsync({ id: data.id }, { comment: checkOutComment });
      message.success('检出成功');
      setCheckOutModalVisible(false);
      setCheckOutComment('');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '检出失败');
    } finally {
      setCheckOutLoading(false);
    }
  };

  // 检入操作
  const handleCheckIn = async () => {
    const hide = message.loading('正在检入...', 0);
    try {
      await PartCheckInAsync({ id: data.id });
      message.success('检入成功');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '检入失败');
    } finally {
      hide();
    }
  };

  // 撤销检出操作
  const handleUndoCheckOut = async () => {
    const hide = message.loading('正在撤销检出...', 0);
    try {
      await PartUndoCheckOutAsync({ id: data.id }, {});
      message.success('撤销检出成功');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '撤销检出失败');
    } finally {
      hide();
    }
  };

  // 检查当前用户是否是检出者
  const isCurrentUserCheckedOut = data?.checkOutInfo?.checkedOutUserId === currentUserId;
  // 物料是否已发布状态（只有已发布才能检出）
  const isReleased = data?.lifecycleStatus === 20;
  // 物料是否已检出
  const isCheckedOut = data?.isCheckedOut;

  return (
    <>
      <Space size={4}>
        <Tooltip title="查看详情">
          <Button size="small" icon={<EyeOutlined />} type="link" onClick={handleViewDetail} />
        </Tooltip>
        {/* 已发布且未检出 - 显示检出按钮 */}
        <Access accessible={canCheckOut}>
          {isReleased && !isCheckedOut && (
            <Tooltip title="检出">
              <Button
                size="small"
                icon={<LockOutlined />}
                type="link"
                onClick={() => setCheckOutModalVisible(true)}
              />
            </Tooltip>
          )}
        </Access>
        {/* 已检出且是当前用户检出的 - 显示检入和撤销检出按钮 */}
        {isCheckedOut && isCurrentUserCheckedOut && (
          <>
            <Access accessible={canCheckIn}>
              <Popconfirm title="确定要检入此物料吗？" onConfirm={handleCheckIn} okText="确定" cancelText="取消">
                <Tooltip title="检入">
                  <Button size="small" icon={<UnlockOutlined />} type="link" style={{ color: '#52c41a' }} />
                </Tooltip>
              </Popconfirm>
            </Access>
            <Access accessible={canUndoCheckOut}>
              <Popconfirm
                title="撤销检出将丢弃所有草稿修改，确定继续吗？"
                onConfirm={handleUndoCheckOut}
                okText="确定"
                cancelText="取消"
                okButtonProps={{ danger: true }}
              >
                <Tooltip title="撤销检出">
                  <Button size="small" icon={<RollbackOutlined />} type="link" danger />
                </Tooltip>
              </Popconfirm>
            </Access>
          </>
        )}
        {/* 草稿状态 或 当前用户已检出 显示编辑按钮 */}
        <Access accessible={canUpdate}>
          {(data?.lifecycleStatus === 0 || (isCheckedOut && isCurrentUserCheckedOut)) && (
            <Tooltip title={isCheckedOut && isCurrentUserCheckedOut ? '编辑草稿' : '编辑'}>
              <Button
                size="small"
                icon={<EditOutlined />}
                type="link"
                onClick={() => history.push(`/appPdm/PartManagement/Part/form?id=${data.id}`)}
              />
            </Tooltip>
          )}
        </Access>
        <Access accessible={canDelete}>
          <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
            <Tooltip title="删除">
              <Button size="small" icon={<DeleteOutlined />} type="link" />
            </Tooltip>
          </DeleteConfirm>
        </Access>
      </Space>

      {/* 检出对话框 */}
      <Modal
        title="检出物料"
        open={checkOutModalVisible}
        onOk={handleCheckOut}
        onCancel={() => {
          setCheckOutModalVisible(false);
          setCheckOutComment('');
        }}
        confirmLoading={checkOutLoading}
        okText="确定检出"
        cancelText="取消"
      >
        <div style={{ marginBottom: 16 }}>
          <p style={{ color: '#666' }}>检出后将创建新的草稿版本，您可以在草稿版本上进行修改。</p>
        </div>
        <Input.TextArea
          placeholder="请输入检出备注（可选）"
          value={checkOutComment}
          onChange={(e) => setCheckOutComment(e.target.value)}
          rows={3}
          maxLength={500}
          showCount
        />
      </Modal>
    </>
  );
};

const PdmPartPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const { initialState } = useModel('@@initialState');
  const currentUserId = initialState?.configuration?.currentUser?.id;
  const canCreate = (access && (access[PartPermissions.Create] ?? true)) as boolean;
  const canSubmit = (access && (access[PartPermissions.Submit] ?? true)) as boolean;
  const canWithdraw = (access && (access[PartPermissions.Withdraw] ?? true)) as boolean;
  const canApprove = (access && (access[PartPermissions.Approve] ?? true)) as boolean;
  const canReject = (access && (access[PartPermissions.Reject] ?? true)) as boolean;
  const { lifecycleText, lifecycleColor } = useEnumMaps();

  const [categoryId, setCategoryId] = useState<string>();
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [categoryAttributes, setCategoryAttributes] = useState<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto[]>([]);

  // 单选状态
  const [selectedRow, setSelectedRow] = useState<API.BurnAbpPdmPartManagementPartsDtosPartDto | null>(null);

  // 审核操作 loading
  const [actionLoading, setActionLoading] = useState(false);

  // 审核拒绝对话框
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // 递归收集所有节点的key
  const getAllKeys = (nodes: TreeNode[]): React.Key[] => {
    const keys: React.Key[] = [];
    const traverse = (items: TreeNode[]) => {
      items.forEach(item => {
        keys.push(item.key);
        if (item.children && item.children.length > 0) {
          traverse(item.children);
        }
      });
    };
    traverse(nodes);
    return keys;
  };

  useEffect(() => {
    PartCategoryGetTreeAsync().then(res => {
      const tree = buildTree(res);
      const treeData = toTreeData(tree);
      setTreeData(treeData);
      // 设置所有节点默认展开
      const allKeys = getAllKeys(treeData);
      setExpandedKeys(allKeys);
    });
  }, []);

  useEffect(() => {
    if (categoryId) {
      // 加载分类属性定义
      PartCategoryAttributeGetByCategoryIdAsync({ categoryId: Number(categoryId) })
        .then(res => {
          setCategoryAttributes(res || []);
        })
        .catch(() => {
          setCategoryAttributes([]);
        });
    } else {
      setCategoryAttributes([]);
    }
  }, [categoryId]);

  const onRefresh = useCallback(() => {
    gridRef.current?.onRefresh();
    setSelectedRow(null);
  }, []);

  const handleTreeSelect = (keys: any[]) => {
    const selectedKey = keys?.[0] as string;
    setCategoryId(selectedKey || undefined);
  };

  // 行选择事件
  const handleSelectionChanged = useCallback((event: any) => {
    const selectedNodes = event.api.getSelectedNodes();
    if (selectedNodes.length > 0) {
      setSelectedRow(selectedNodes[0].data);
    } else {
      setSelectedRow(null);
    }
  }, []);

  // 提交审核
  const handleSubmit = useCallback(async () => {
    if (!selectedRow?.id) {
      message.warning('请先选择一条记录');
      return;
    }
    if (selectedRow.lifecycleStatus !== 0) {
      message.warning('只有草稿状态的物料才能提交审核');
      return;
    }
    setActionLoading(true);
    try {
      await PartSubmitAsync({ id: selectedRow.id }, {});
      message.success('提交审核成功');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '提交审核失败');
    } finally {
      setActionLoading(false);
    }
  }, [selectedRow, onRefresh]);

  // 撤回审核
  const handleWithdraw = useCallback(async () => {
    if (!selectedRow?.id) {
      message.warning('请先选择一条记录');
      return;
    }
    if (selectedRow.lifecycleStatus !== 10) {
      message.warning('只有审批中状态的物料才能撤回审核');
      return;
    }
    setActionLoading(true);
    try {
      await PartWithdrawApprovalAsync({ id: selectedRow.id });
      message.success('撤回审核成功');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '撤回审核失败');
    } finally {
      setActionLoading(false);
    }
  }, [selectedRow, onRefresh]);

  // 审核通过
  const handleApprove = useCallback(async () => {
    if (!selectedRow?.id) {
      message.warning('请先选择一条记录');
      return;
    }
    if (selectedRow.lifecycleStatus !== 10) {
      message.warning('只有审批中状态的物料才能审核');
      return;
    }
    setActionLoading(true);
    try {
      await PartApproveAsync({ id: selectedRow.id }, {});
      message.success('审核通过成功');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '审核通过失败');
    } finally {
      setActionLoading(false);
    }
  }, [selectedRow, onRefresh]);

  // 审核拒绝
  const handleReject = useCallback(async () => {
    if (!selectedRow?.id) {
      message.warning('请先选择一条记录');
      return;
    }
    if (selectedRow.lifecycleStatus !== 10) {
      message.warning('只有审批中状态的物料才能审核');
      return;
    }
    setActionLoading(true);
    try {
      await PartRejectAsync({ id: selectedRow.id }, { reason: rejectReason });
      message.success('审核拒绝成功');
      setRejectModalVisible(false);
      setRejectReason('');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '审核拒绝失败');
    } finally {
      setActionLoading(false);
    }
  }, [selectedRow, rejectReason, onRefresh]);

  // 判断按钮是否可用
  const isDraft = selectedRow?.lifecycleStatus === 0;
  const isPending = selectedRow?.lifecycleStatus === 10;

  // 审核操作下拉菜单
  const approvalMenuItems: MenuProps['items'] = [
    {
      key: 'submit',
      label: '提交审核',
      icon: <SendOutlined />,
      disabled: !selectedRow || !isDraft || !canSubmit,
    },
    {
      key: 'withdraw',
      label: '撤回审核',
      icon: <RollbackOutlined />,
      disabled: !selectedRow || !isPending || !canWithdraw,
    },
    { type: 'divider' },
    {
      key: 'approve',
      label: '审核通过',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      disabled: !selectedRow || !isPending || !canApprove,
    },
    {
      key: 'reject',
      label: '审核拒绝',
      icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
      danger: true,
      disabled: !selectedRow || !isPending || !canReject,
    },
  ];

  const handleApprovalMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (!selectedRow) {
      message.warning('请先选择一条记录');
      return;
    }
    switch (key) {
      case 'submit':
        if (selectedRow.lifecycleStatus !== 0) {
          message.warning('只有草稿状态的物料才能提交审核');
          return;
        }
        Modal.confirm({
          title: '确定要提交审核吗？',
          onOk: handleSubmit,
        });
        break;
      case 'withdraw':
        if (selectedRow.lifecycleStatus !== 10) {
          message.warning('只有审批中状态的物料才能撤回审核');
          return;
        }
        Modal.confirm({
          title: '确定要撤回审核吗？',
          onOk: handleWithdraw,
        });
        break;
      case 'approve':
        if (selectedRow.lifecycleStatus !== 10) {
          message.warning('只有审批中状态的物料才能审核');
          return;
        }
        Modal.confirm({
          title: '确定要审核通过吗？',
          onOk: handleApprove,
        });
        break;
      case 'reject':
        if (selectedRow.lifecycleStatus !== 10) {
          message.warning('只有审批中状态的物料才能审核');
          return;
        }
        setRejectModalVisible(true);
        break;
    }
  };

  // 生命周期状态渲染
  const statusRenderer = useMemo(
    () => (params: any) => {
      const value = params.value;
      if (value === undefined || value === null) return '';
      const text = lifecycleText[value] ?? value;
      const color = lifecycleColor[value] ?? 'default';
      return <Tag color={color}>{text}</Tag>;
    },
    [lifecycleText, lifecycleColor],
  );

  const boolRenderer = useMemo(() => (params: any) => (params.value ? '是' : '否'), []);

  // 检出状态渲染
  const checkOutRenderer = useMemo(
    () => (params: any) => {
      const data = params.data;
      if (!data?.isCheckedOut) return <span style={{ color: '#999' }}>-</span>;
      const checkOutInfo = data.checkOutInfo;
      const isCurrentUser = checkOutInfo?.checkedOutUserId === currentUserId;
      return (
        <Tooltip
          title={
            <div style={{ fontSize: 12 }}>
              <div>检出人: {checkOutInfo?.checkedOutUserName || '-'}</div>
              <div>检出时间: {checkOutInfo?.checkedOutTime?.substring(0, 16) || '-'}</div>
              {checkOutInfo?.checkOutComment && <div>备注: {checkOutInfo.checkOutComment}</div>}
              {checkOutInfo?.expireAt && <div>过期时间: {checkOutInfo.expireAt.substring(0, 16)}</div>}
            </div>
          }
        >
          <Tag
            icon={<LockOutlined />}
            color={isCurrentUser ? 'processing' : 'warning'}
            style={{ cursor: 'pointer' }}
          >
            {isCurrentUser ? '我检出' : checkOutInfo?.checkedOutUserName || '已检出'}
          </Tag>
        </Tooltip>
      );
    },
    [currentUserId],
  );

  // 物料编码列渲染器 - 可点击跳转
  const partNumberRenderer = useMemo(
    () => (params: any) => {
      if (!params.value) return '';
      return (
        <a
          onClick={(e) => {
            e.stopPropagation();
            history.push(`/appPdm/PartManagement/Part/detail?id=${params.data.id}`);
          }}
          style={{ color: '#1890ff', cursor: 'pointer' }}
        >
          {params.value}
        </a>
      );
    },
    [],
  );

  // 动态属性列渲染器 - 使用 attributeValues 数组
  const attributeRenderer = useMemo(
    () => (attributeCode: string) => (params: any) => {
      const attributeValues = params.data?.attributeValues;
      if (!attributeValues || !Array.isArray(attributeValues)) return '';
      const attr = attributeValues.find((a: any) => a.attributeCode === attributeCode);
      return attr?.displayText || attr?.attributeValue || '';
    },
    [],
  );

  // 双击行打开详情
  const handleRowDoubleClick = (event: any) => {
    const rowData = event.data;
    if (rowData?.id) {
      history.push(`/appPdm/PartManagement/Part/detail?id=${rowData.id}`);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 16, height: '100%' }}>
      <div style={{
        width: 320,
        minWidth: 280,
        border: '1px solid #f0f0f0',
        borderRadius: 6,
        padding: '16px 12px',
        overflow: 'auto',
        backgroundColor: '#fafafa',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          fontWeight: 600,
          fontSize: 16,
          marginBottom: 12,
          paddingBottom: 12,
          borderBottom: '1px solid #e8e8e8'
        }}>物料分类</div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Tree
            treeData={treeData}
            onSelect={handleTreeSelect}
            selectedKeys={categoryId ? [categoryId] : []}
            expandedKeys={expandedKeys}
            onExpand={setExpandedKeys}
            showLine
            blockNode
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <AgGridPlus
          gridRef={gridRef}
          headerTitle={'物料列表'}
          gridKey="appPdm.PartManagement.Part"
          params={{ categoryId }}
          request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
            // 构建动态查询 Filter - 使用 params.categoryId 而不是闭包中的 categoryId
            const currentCategoryId = params?.categoryId;
            let filterExpression = params?.filter || '';
            if (currentCategoryId) {
              const categoryFilter = `CategoryId = ${currentCategoryId}`;
              filterExpression = filterExpression
                ? `(${filterExpression}) and (${categoryFilter})`
                : categoryFilter;
            }

            const data = await PartGetListAsync({
              Filter: filterExpression,
              SkipCount: params?.skipCount,
              MaxResultCount: params?.maxResultCount,
              Sorting: params?.sorter,
            });
            return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
          }}
          rowSelection={'single'}
          onSelectionChanged={handleSelectionChanged}
          onRowDoubleClicked={handleRowDoubleClick}
          toolBarRender={() => [
            <Access key="create" accessible={canCreate}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => history.push('/appPdm/PartManagement/Part/form')}
              >
                新建
              </Button>
            </Access>,
            <Access key="import" accessible={canCreate}>
              <Import categoryCode={categoryId} onAfterSubmit={onRefresh} />
            </Access>,
            <Access key="export" accessible={canCreate}>
              <Export categoryId={categoryId} />
            </Access>,
            <Access key="approval" accessible={!!(canSubmit || canWithdraw || canApprove || canReject)}>
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
        >
          <AgGridColumn field={'partNumber'} headerName={'物料编码'} width={180} cellRenderer={partNumberRenderer as any} />
          <AgGridColumn field={'outCode'} headerName={'物料外码'} width={160} hideInSearch={true} />
          <AgGridColumn field={'drawingNumber'} headerName={'物料图号'} width={160} hideInSearch={true} />
          <AgGridColumn field={'description'} headerName={'物料描述'} width={220} />
          <AgGridColumn field={'unitName'} headerName={'单位'} width={100} hideInSearch={true} />
          <AgGridColumn field={'productSeriesName'} headerName={'产品系列'} width={160} />
          <AgGridColumn field={'categoryName'} headerName={'物料分类'} width={180} />
          <AgGridColumn field={'specification'} headerName={'规格'} width={180} hideInSearch={true} />
          <AgGridColumn
            field={'version'}
            headerName={'版本'}
            width={100}
            hideInSearch={true}
            valueGetter={(params: any) => params.data?.versionInfo?.version || ''}
          />
          <AgGridColumn field={'lifecycleStatus'} headerName={'生命周期'} width={120} cellRenderer={statusRenderer as any} hideInSearch={true} />
          <AgGridColumn field={'isCheckedOut'} headerName={'检出状态'} width={120} cellRenderer={checkOutRenderer as any} hideInSearch={true} />
          <AgGridColumn field={'isCritical'} headerName={'关键物料'} width={100} cellRenderer={boolRenderer as any} hideInSearch={true} />
          <AgGridColumn field={'isActive'} headerName={'启用'} width={80} cellRenderer={boolRenderer as any} hideInSearch={true} />
          <AgGridColumn field={'comeFromName'} headerName={'来源'} width={120} hideInSearch={true} />
          <AgGridColumn field={'creator'} headerName={'创建人'} width={120} hideInSearch={true} />
          <AgGridColumn field={'creationTime'} headerName={'创建时间'} width={180} hideInSearch={true} />
          <AgGridColumn field={'lastModifier'} headerName={'修改人'} width={120} hideInSearch={true} />
          <AgGridColumn field={'lastModificationTime'} headerName={'修改时间'} width={180} hideInSearch={true} />

          {/* 动态属性列 - 使用 attributeValues */}
          {categoryAttributes
            .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
            .map(attr => (
              <AgGridColumn
                key={attr.attributeCode}
                field={`attributeValues`}
                headerName={attr.displayName || attr.attributeCode || ''}
                width={140}
                hideInSearch={true}
                cellRenderer={attributeRenderer(attr.attributeCode!) as any}
              />
            ))}

          <AgGridColumn
            field={'action'}
            headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
            width={200}
            pinned={'right'}
            filter={false}
            sortable={false}
            cellRenderer={Options}
            cellRendererParams={{ onRefresh, currentUserId }}
          />
        </AgGridPlus>
      </div>

      {/* 审核拒绝对话框 */}
      <Modal
        title="审核拒绝"
        open={rejectModalVisible}
        onOk={handleReject}
        onCancel={() => {
          setRejectModalVisible(false);
          setRejectReason('');
        }}
        confirmLoading={actionLoading}
        okText="确定拒绝"
        cancelText="取消"
        okButtonProps={{ danger: true }}
      >
        <div style={{ marginBottom: 16 }}>
          <p style={{ color: '#666' }}>请输入拒绝原因，拒绝后物料将返回草稿状态。</p>
        </div>
        <Input.TextArea
          placeholder="请输入拒绝原因"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          rows={4}
          maxLength={500}
          showCount
        />
      </Modal>
    </div>
  );
};

export default PdmPartPage;

export const routeProps = {
  name: '物料管理',
};
