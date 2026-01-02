/**
 * 文档检入申请单详情页
 * 使用 Formily 表单阅读态展示
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Card, Button, message, Spin, Tag, Space } from 'antd';
import { ArrowLeftOutlined, EditOutlined, SendOutlined } from '@ant-design/icons';
import { history, Access, useAccess, useSchemaField, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import {
  DocumentCheckInRequestGetAsync,
  DocumentCheckInRequestSubmitAsync,
} from '@/services/pdm/DocumentCheckInRequest';
import { DocumentCheckInRequestPermissions } from '@/pages/appPdm/_permissions';
import { DocumentCheckInRequestStatus, checkInStatusEnum } from './_enums';
import DeleteConfirm from '@/components/deleteConfirm';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import dayjs from 'dayjs';

export const routeProps = {
  name: '文档检入申请详情',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const DocumentCheckInRequestDetailPage: React.FC = () => {
  const { params, isActive, hasChanged } = useKeepAliveParams('/appPdm/DocumentManagement/DocumentCheckInRequest/detail');
  const requestId = params.id as string;
  const access = useAccess();

  const SchemaField = useSchemaField({});

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [documentItems, setDocumentItems] = useState<any[]>([]);
  const gridRef = React.useRef<GridRef>();

  const canUpdate = !!(access && (access[DocumentCheckInRequestPermissions.Update] ?? true));
  const canSubmit = !!(access && (access[DocumentCheckInRequestPermissions.Submit] ?? true));

  // 创建只读表单实例
  const form = useMemo(() => createForm({ readPretty: true }), []);

  // 加载详情数据
  const loadDetail = useCallback(async () => {
    if (!requestId) {
      message.error('参数缺失');
      history.push('/appPdm/DocumentManagement/DocumentCheckInRequest');
      return;
    }

    setLoading(true);
    try {
      const result = await DocumentCheckInRequestGetAsync({ id: requestId });
      setData(result);

      // 获取单据状态标签文字
      const statusItem = checkInStatusEnum.find(item => item.value === result.checkInStatus);
      const statusLabel = statusItem?.label || '-';

      // 设置表单初始值
      const initialValues: any = {
        requestNumber: result.requestNumber || '-',
        applicantName: result.applicantName || '-',
        applicationTime: result.applicationTime ? dayjs(result.applicationTime).format('YYYY-MM-DD HH:mm:ss') : '-',
        processorName: result.processorName || '-',
        checkInStatus: statusLabel,
        reason: result.reason || '-',
        remark: result.remark || '-',
        activityDisplayName: result.activityDisplayName || '-',
        assigneeName: result.assigneeName || '-',
        creator: result.creator || '-',
        creationTime: result.creationTime ? dayjs(result.creationTime).format('YYYY-MM-DD HH:mm:ss') : '-',
        lastModificationTime: result.lastModificationTime ? dayjs(result.lastModificationTime).format('YYYY-MM-DD HH:mm:ss') : '-',
      };

      form.setInitialValues(initialValues);

      // 加载明细列表
      if (result.items && result.items.length > 0) {
        setDocumentItems(result.items.map((item: any, index: number) => ({
          ...item,
          rowId: `row_${index}`,
        })));
      }
    } catch (error) {
      message.error('加载失败');
    } finally {
      setLoading(false);
    }
  }, [requestId, form]);

  useEffect(() => {
    if (!isActive || !hasChanged) return;
    loadDetail();
  }, [loadDetail, isActive, hasChanged]);

  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/DocumentManagement/DocumentCheckInRequest');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  const handleEdit = () => {
    history.push(`/appPdm/DocumentManagement/DocumentCheckInRequest/form?id=${requestId}`);
  };

  const handleSubmit = async () => {
    const hide = message.loading('正在提交...', 0);
    try {
      await DocumentCheckInRequestSubmitAsync({ id: requestId });
      message.success('提交成功');
      loadDetail();
    } catch (error) {
      message.error('提交失败');
    } finally {
      hide();
    }
  };

  // 获取单据状态标签
  const getStatusTag = () => {
    if (!data) return null;
    const statusItem = checkInStatusEnum.find(
      item => item.value === data.checkInStatus
    );
    if (!statusItem) return null;
    return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
  };

  const isPending = data?.workflowStatus === DocumentCheckInRequestStatus.Pending;

  // 表单 Schema 定义
  const schema: ISchema = useMemo(() => {
    return {
      type: 'object',
      properties: {
        grid: {
          type: 'void',
          'x-component': 'FormGrid',
          'x-component-props': { maxColumns: 4, strictAutoFit: true },
          properties: {
            // 基本信息
            dividerBasic: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '基本信息',
                  },
                },
              },
            },
            col1: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                requestNumber: {
                  type: 'string',
                  title: '申请单号',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col2: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                checkInStatus: {
                  type: 'string',
                  title: '单据状态',
                  'x-decorator': 'FormItem',
                  'x-component': 'PreviewText',
                  'x-content': data ? getStatusTag() : '-',
                },
              },
            },
            col3: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                applicantName: {
                  type: 'string',
                  title: '申请人',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col4: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                applicationTime: {
                  type: 'string',
                  title: '申请时间',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col5: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                processorName: {
                  type: 'string',
                  title: '处理人',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col6: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                activityDisplayName: {
                  type: 'string',
                  title: '当前节点',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col8: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                assigneeName: {
                  type: 'string',
                  title: '当前审批人',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            // 申请说明
            dividerReason: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '申请说明',
                    style: { marginTop: 5, marginBottom: 5 },
                  },
                },
              },
            },
            col8: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                reason: {
                  type: 'string',
                  title: '申请原因',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 2 },
                },
              },
            },
            col9: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                remark: {
                  type: 'string',
                  title: '备注',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 2 },
                },
              },
            },
            // 时间信息
            dividerTime: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '时间信息',
                    style: { marginTop: 5, marginBottom: 5 },
                  },
                },
              },
            },
            col10: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                creator: {
                  type: 'string',
                  title: '创建人',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col11: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                creationTime: {
                  type: 'string',
                  title: '创建时间',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col12: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                lastModificationTime: {
                  type: 'string',
                  title: '最后修改时间',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
          },
        },
      },
    };
  }, [data]);

  // 明细列表列定义
  const detailColumnDefs = [
    { field: 'beforeDocumentNumber', headerName: '文档编码', width: 150 },
    { field: 'beforeDocumentName', headerName: '变更前文档名称', width: 150 },
    { field: 'beforeDescription', headerName: '变更前文档描述', width: 200 },
    { field: 'beforeDocumentVersion', headerName: '变更前文档版本', width: 120 },
    { field: 'beforeFileName', headerName: '变更前文件', width: 150 },
    { field: 'partNumber', headerName: '物料编码', width: 120 },
    { field: 'partName', headerName: '物料描述', width: 150 },
    { field: 'drawingNumber', headerName: '物料图号', width: 120 },
    { field: 'afterDocumentName', headerName: '变更后文档名称', width: 150 },
    { field: 'afterDescription', headerName: '变更后文档描述', width: 200 },
    { field: 'afterVersion', headerName: '变更后文档版本', width: 120 },
    {
      field: 'isVersionUpgrade',
      headerName: '是否升级版本',
      width: 120,
      cellRenderer: (params: any) => params.value ? '是' : '否'
    },
    {
      field: 'afterFileBlobName',
      headerName: '变更后文件',
      width: 200,
      cellRenderer: (params: any) => {
        if (!params.value) return '-';
        // 从完整路径中提取文件名，例如 "requests/.../6005.prt" -> "6005.prt"
        const fileName = params.value.split('/').pop() || params.value;
        return fileName;
      }
    },
    { field: 'modificationDescription', headerName: '修改内容', width: 200 },
    { field: 'changeOrderNumber', headerName: '关联变更单号', width: 150 },
  ];

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      <Spin spinning={loading}>
        {/* 工作流进度信息 */}
        {data?.workflowInstanceId && (
          <WorkflowInstanceInfo
            workflowInstanceId={data.workflowInstanceId}
            correlationData={{ creator: data.applicantName }}
          />
        )}

        {/* 表单详情 */}
        {data && (
          <Card
            title={
              <Space>
                <span>文档检入申请详情</span>
                {getStatusTag()}
              </Space>
            }
          >
            <FormProvider form={form}>
              <FormLayout {...formLayout}>
                <SchemaField schema={schema} />
              </FormLayout>
            </FormProvider>
          </Card>
        )}

        {/* 文档检入明细 */}
        {data && (
          <Card title="文档检入明细" style={{ marginTop: 16 }}>
            <AgGridPlus
              gridRef={gridRef}
              dataSource={documentItems}
              columnDefs={detailColumnDefs}
              pagination={false}
              domLayout="autoHeight"
              toolBarRender={false}
              search={false}
            />
          </Card>
        )}

        {/* 审批日志 */}
        {data?.workflowInstanceId && (
          <WorkflowExecutionCorrelationList
            hideSearch={true}
            workflowData={{
              correlationId: data.id as string,
              workflowDefinitionId: data.workflowDefinitionId || ''
            }}
          />
        )}

        <ToolBar>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            返回
          </Button>
          {isPending && (
            <Access accessible={canUpdate}>
              <Button icon={<EditOutlined />} onClick={handleEdit}>
                编辑
              </Button>
            </Access>
          )}
          {isPending && (
            <Access accessible={canSubmit}>
              <DeleteConfirm title="确定提交审批?" onConfirm={handleSubmit}>
                <Button type="primary" icon={<SendOutlined />}>
                  提交审批
                </Button>
              </DeleteConfirm>
            </Access>
          )}
        </ToolBar>
      </Spin>
    </div>
  );
};

export default DocumentCheckInRequestDetailPage;
