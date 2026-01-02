import { AgGridPlus } from '@/components/agGrid';
import { DocumentLifecycleCheckInAsync, DocumentLifecycleForceUnlockAsync } from '@/services/pdm/DocumentLifecycle';
import { PartCheckInAsync, PartUndoCheckOutAsync } from '@/services/pdm/Part';
import { WorkspaceGetMyCheckoutsAsync, WorkspaceGetMyCheckedOutPartsAsync } from '@/services/pdm/Workspace';
import { UnlockOutlined, RollbackOutlined, EyeOutlined, FileOutlined, AppstoreOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Badge, Button, message, Space, Tabs, Tag, Modal, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl, history } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import dayjs from 'dayjs';

// 文档操作列渲染
const DocumentOptions = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;

  const handleCheckIn = async (documentId: string) => {
    const hide = message.loading('正在签入文档...', 0);
    try {
      await DocumentLifecycleCheckInAsync({ id: documentId });
      message.success('签入成功');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '签入失败');
    } finally {
      hide();
    }
  };

  const handleForceUnlock = (documentId: string) => {
    let reason = '';
    Modal.confirm({
      title: '撤销检出',
      content: (
        <div>
          <p style={{ marginBottom: 8 }}>确定要撤销检出吗？这将解除文档锁定但保留工作修订。</p>
          <Input.TextArea
            placeholder="请输入撤销原因（必填）"
            onChange={(e) => { reason = e.target.value; }}
            rows={3}
          />
        </div>
      ),
      okText: '确认撤销',
      cancelText: '取消',
      onOk: async () => {
        if (!reason || reason.trim().length < 5) {
          message.error('请输入至少5个字的撤销原因');
          return Promise.reject();
        }
        const hide = message.loading('正在撤销检出...', 0);
        try {
          await DocumentLifecycleForceUnlockAsync({ id: documentId, reason });
          message.success('撤销检出成功');
          onRefresh();
        } catch (error: any) {
          message.error(error?.message || '撤销检出失败');
        } finally {
          hide();
        }
      },
    });
  };

  const handleViewDetail = (documentId: string) => {
    history.push(`/appPdm/DocumentManagement/Document/detail?id=${documentId}`);
  };

  return (
    <Space>
      <Button
        size="small"
        icon={<EyeOutlined />}
        type="link"
        title="查看详情"
        onClick={() => handleViewDetail(data.documentId)}
      >
        详情
      </Button>

      <DeleteConfirm title="确定签入文档?" onConfirm={() => handleCheckIn(data.documentId)}>
        <Button size="small" icon={<UnlockOutlined />} type="link" title="签入" />
      </DeleteConfirm>

      <Button
        size="small"
        icon={<RollbackOutlined />}
        type="link"
        title="撤销检出"
        danger
        onClick={() => handleForceUnlock(data.documentId)}
      />
    </Space>
  );
};

// 物料操作列渲染
const PartOptions = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;

  const handleCheckIn = async (partId: number) => {
    const hide = message.loading('正在签入物料...', 0);
    try {
      await PartCheckInAsync({ id: partId });
      message.success('签入成功');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '签入失败');
    } finally {
      hide();
    }
  };

  const handleUndoCheckOut = async (partId: number) => {
    const hide = message.loading('正在撤销检出...', 0);
    try {
      await PartUndoCheckOutAsync({ id: partId }, { reason: '' });
      message.success('撤销检出成功');
      onRefresh();
    } catch (error: any) {
      message.error(error?.message || '撤销检出失败');
    } finally {
      hide();
    }
  };

  const handleViewDetail = (partId: number) => {
    history.push(`/appPdm/PartManagement/Part/detail?id=${partId}`);
  };

  return (
    <Space>
      <Button
        size="small"
        icon={<EyeOutlined />}
        type="link"
        title="查看详情"
        onClick={() => handleViewDetail(data.partId)}
      >
        详情
      </Button>

      <DeleteConfirm title="确定签入物料?" onConfirm={() => handleCheckIn(data.partId)}>
        <Button size="small" icon={<UnlockOutlined />} type="link" title="签入" />
      </DeleteConfirm>

      <DeleteConfirm title="确定撤销检出?" onConfirm={() => handleUndoCheckOut(data.partId)}>
        <Button size="small" icon={<RollbackOutlined />} type="link" title="撤销检出" danger />
      </DeleteConfirm>
    </Space>
  );
};

const MyCheckoutsPage: React.FC<any> = () => {
  const documentGridRef = useRef<GridRef>();
  const partGridRef = useRef<GridRef>();
  const intl = useIntl();

  // 统计数据
  const [documentCount, setDocumentCount] = useState(0);
  const [partCount, setPartCount] = useState(0);

  // 页面加载时获取物料检出数量
  useEffect(() => {
    const fetchPartCount = async () => {
      try {
        const data = await WorkspaceGetMyCheckedOutPartsAsync({
          SkipCount: 0,
          MaxResultCount: 1,
        });
        setPartCount(data.totalCount || 0);
      } catch (error) {
        // ignore
      }
    };
    fetchPartCount();
  }, []);

  const onDocumentRefresh = () => {
    documentGridRef.current?.onRefresh();
  };

  const onPartRefresh = () => {
    partGridRef.current?.onRefresh();
  };

  // 文档列定义
  const documentColumns = [
    { headerName: '文档编号', field: 'documentNumber', width: 160 },
    { headerName: '文档名称', field: 'documentName', width: 250, flex: 1 },
    { headerName: '版本号', field: 'version', width: 80, hideInSearch: true },
    { headerName: '文档类型', field: 'documentTypeName', width: 120, hideInSearch: true },
    { headerName: '所属文档库', field: 'documentLibraryName', width: 120, hideInSearch: true },
    {
      headerName: '检出时间',
      field: 'checkedOutAt',
      width: 150,
      hideInSearch: true,
      initialSort: 'desc',
      cellRenderer: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm') : '-'
    },
    {
      headerName: '检出说明',
      field: 'checkOutReason',
      width: 180,
      hideInSearch: true,
    },
  ];

  // 文档操作列
  const documentOperationColumn = {
    headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
    field: 'action',
    width: 180,
    pinned: 'right',
    filter: false,
    sortable: false,
    cellRenderer: DocumentOptions,
    cellRendererParams: { onRefresh: onDocumentRefresh },
  };

  // 物料列定义
  const partColumns = [
    { headerName: '物料编号', field: 'partNumber', width: 160 },
    { headerName: '物料描述', field: 'description', width: 250, flex: 1 },
    { headerName: '版本号', field: 'version', width: 80, hideInSearch: true },
    { headerName: '分类', field: 'categoryName', width: 120, hideInSearch: true },
    { headerName: '单位', field: 'unit', width: 80, hideInSearch: true },
    {
      headerName: '检出时间',
      field: 'checkedOutAt',
      width: 150,
      hideInSearch: true,
      initialSort: 'desc',
      cellRenderer: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm') : '-'
    },
    {
      headerName: '过期时间',
      field: 'expireAt',
      width: 150,
      hideInSearch: true,
      cellRenderer: (params: any) => {
        if (!params.value) return '-';
        const expireDate = dayjs(params.value);
        const isExpired = expireDate.isBefore(dayjs());
        const isExpiringSoon = !isExpired && expireDate.isBefore(dayjs().add(3, 'day'));
        const text = expireDate.format('YYYY-MM-DD HH:mm');
        if (isExpired) {
          return <Tag color="error">{text} (已过期)</Tag>;
        }
        if (isExpiringSoon) {
          return <Tag color="warning">{text}</Tag>;
        }
        return text;
      }
    },
    {
      headerName: '检出说明',
      field: 'checkOutComment',
      width: 180,
      hideInSearch: true,
    },
  ];

  // 物料操作列
  const partOperationColumn = {
    headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
    field: 'action',
    width: 180,
    pinned: 'right',
    filter: false,
    sortable: false,
    cellRenderer: PartOptions,
    cellRendererParams: { onRefresh: onPartRefresh },
  };

  const documentColumnDefs = [...documentColumns, documentOperationColumn];
  const partColumnDefs = [...partColumns, partOperationColumn];

  const tabItems = [
    {
      key: 'documents',
      label: (
        <span>
          <FileOutlined /> 文档检出 <Badge count={documentCount} size="small" style={{ marginLeft: 4 }} />
        </span>
      ),
      children: (
        <div style={{ height: 'calc(100vh - 180px)' }}>
          <AgGridPlus
            gridRef={documentGridRef}
            headerTitle="我的文档检出"
            gridKey="appPdm.Workspace.MyCheckouts.Documents"
            request={async (params: any) => {
              const data = await WorkspaceGetMyCheckoutsAsync({
                SkipCount: params!.skipCount,
                MaxResultCount: params!.maxResultCount,
                Sorting: params!.sorter!
              });
              setDocumentCount(data.totalCount || 0);
              return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
            }}
            columnDefs={documentColumnDefs}
            toolBarRender={() => []}
          />
        </div>
      ),
    },
    {
      key: 'parts',
      label: (
        <span>
          <AppstoreOutlined /> 物料检出 <Badge count={partCount} size="small" style={{ marginLeft: 4 }} />
        </span>
      ),
      children: (
        <div style={{ height: 'calc(100vh - 180px)' }}>
          <AgGridPlus
            gridRef={partGridRef}
            headerTitle="我的物料检出"
            gridKey="appPdm.Workspace.MyCheckouts.Parts"
            request={async (params: any) => {
              const data = await WorkspaceGetMyCheckedOutPartsAsync({
                SkipCount: params!.skipCount,
                MaxResultCount: params!.maxResultCount,
                Sorting: params!.sorter!
              });
              setPartCount(data.totalCount || 0);
              return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
            }}
            columnDefs={partColumnDefs}
            toolBarRender={() => []}
          />
        </div>
      ),
    },
  ];

  return (
    <Tabs
      defaultActiveKey="documents"
      items={tabItems}
      style={{ height: '100%', background: '#fff' }}
      tabBarStyle={{ marginBottom: 0, paddingLeft: 16, background: '#fff' }}
    />
  );
};

export default MyCheckoutsPage;

export const routeProps = {
  name: '我的检出',
};
