import { AgGridPlus } from '@/components/agGrid';
import type { AgGridPlusRef } from '@nokecy/qc-ui';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Input, Modal, message } from 'antd';
import React, { useRef, useMemo } from 'react';
import {
  DocumentReleaseConfirmationRecordGetListAsync,
  DocumentReleaseConfirmationRecordConfirmAsync,
  DocumentReleaseConfirmationRecordRejectAsync,
} from '@/services/pdm/DocumentReleaseConfirmationRecord';
import { RecipientConfirmationStatusEnum, recipientConfirmationStatusEnum } from './enums';
import type { ColDef } from 'ag-grid-community';

export const routeProps = {
  name: '文档发放确认列表',
};

const DocumentReleaseConfirmationRecordList: React.FC = () => {
  const gridRef = useRef<AgGridPlusRef>(null);

  // 确认文档
  const handleConfirm = (record: any) => {
    Modal.confirm({
      title: '确认文档',
      content: (
        <div>
          <p>确认接收以下文档？</p>
          <p><strong>文档编号：</strong>{record.documentNumber}</p>
          <p><strong>文档名称：</strong>{record.documentName}</p>
        </div>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await DocumentReleaseConfirmationRecordConfirmAsync(
          { id: record.id },
          { confirmNote: '' }
        );
        message.success('确认成功');
        gridRef.current?.onRefresh();
      },
    });
  };

  // 拒绝文档
  const handleReject = (record: any) => {
    let rejectionReason = '';

    Modal.confirm({
      title: '拒绝文档',
      content: (
        <div>
          <p><strong>文档编号：</strong>{record.documentNumber}</p>
          <p><strong>文档名称：</strong>{record.documentName}</p>
          <div style={{ marginTop: 16 }}>
            <p>拒绝原因：<span style={{ color: 'red' }}>*</span></p>
            <Input.TextArea
              rows={4}
              placeholder="请输入拒绝原因"
              onChange={(e) => {
                rejectionReason = e.target.value;
              }}
            />
          </div>
        </div>
      ),
      okText: '拒绝',
      okButtonProps: { danger: true },
      cancelText: '取消',
      onOk: async () => {
        if (!rejectionReason.trim()) {
          message.error('请输入拒绝原因');
          return Promise.reject();
        }
        await DocumentReleaseConfirmationRecordRejectAsync(
          { id: record.id },
          { rejectionReason: rejectionReason }
        );
        message.success('已拒绝');
        gridRef.current?.onRefresh();
      },
    });
  };

  // 列定义
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        field: 'documentNumber',
        headerName: '文档编号',
        width: 150,
        pinned: 'left',
      },
      {
        field: 'documentName',
        headerName: '文档名称',
        width: 200,
      },
      {
        field: 'recipientName',
        headerName: '接收人',
        width: 120,
        hideInSearch: true,
      },
      {
        field: 'confirmationStatus',
        headerName: '状态',
        width: 120,
        valueEnum: recipientConfirmationStatusEnum,
      },
      {
        field: 'confirmedAt',
        headerName: '确认时间',
        width: 160,
        type: 'dateTimeColumn',
        hideInSearch: true,
      },
      {
        field: 'confirmNote',
        headerName: '确认备注',
        width: 200,
        hideInSearch: true,
      },
      {
        field: 'rejectedAt',
        headerName: '拒绝时间',
        width: 160,
        type: 'dateTimeColumn',
        hideInSearch: true,
      },
      {
        field: 'rejectionReason',
        headerName: '拒绝原因',
        width: 200,
        hideInSearch: true,
      },
      {
        field: 'action',
        headerName: '操作',
        width: 180,
        pinned: 'right',
        cellRenderer: (params: any) => {
          const record = params.data;
          const isPending = record.confirmationStatus === RecipientConfirmationStatusEnum.Pending;

          return (
            <div style={{ display: 'flex', gap: '8px' }}>
              {isPending && (
                <>
                  <Button
                    type="link"
                    size="small"
                    icon={<CheckOutlined />}
                    onClick={() => handleConfirm(record)}
                  >
                    确认
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    danger
                    icon={<CloseOutlined />}
                    onClick={() => handleReject(record)}
                  >
                    拒绝
                  </Button>
                </>
              )}
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <AgGridPlus
        gridRef={gridRef}
        headerTitle="文档发放确认列表"
        gridKey="pdm-document-release-confirmation-record"
        request={async (params) => {
          try {
            const data = await DocumentReleaseConfirmationRecordGetListAsync({
              MaxResultCount: params.maxResultCount,
              SkipCount: params.skipCount,
              Filter: params.filter,
              Sorting: params.sorter,
              ConfirmationStatus: params.ConfirmationStatus,
            });
            return {
              success: true,
              data: data.items || [],
              total: data.totalCount || 0,
            };
          } catch (error) {
            console.error('获取列表失败:', error);
            return {
              success: false,
              data: [],
              total: 0,
            };
          }
        }}
        columnDefs={columnDefs}
      />
    </>
  );
};

export default DocumentReleaseConfirmationRecordList;
