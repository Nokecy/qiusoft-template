/**
 * 文档发布申请单详情页
 * 使用 Formily 表单阅读态展示
 */

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Card, Button, message, Spin, Tag, Space } from 'antd';
import { ArrowLeftOutlined, EditOutlined, SendOutlined, RedoOutlined } from '@ant-design/icons';
import { history, Access, useAccess, useSchemaField } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import {
  DocumentPublishRequestGetAsync,
  DocumentPublishRequestSubmitAsync,
} from '@/services/pdm/DocumentPublishRequest';
import {
  documentPublishRequestStatusEnum,
  DocumentPublishRequestStatus,
} from './_enums';
import DeleteConfirm from '@/components/deleteConfirm';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import dayjs from 'dayjs';

export const routeProps = {
  name: '文档发布申请单详情',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const DocumentPublishRequestDetailPage: React.FC = () => {
  const { params, isActive, hasChanged } = useKeepAliveParams('/appPdm/DocumentManagement/DocumentPublishRequest/detail');
  const requestId = params.id as string;
  const access = useAccess();
  const gridRef = useRef<GridRef>();

  const SchemaField = useSchemaField({});

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const canUpdate = true;
  const canSubmit = true;

  // 创建只读表单实例
  const form = useMemo(() => createForm({ readPretty: true }), []);

  // 加载详情数据
  const loadDetail = useCallback(async () => {
    if (!requestId) {
      message.error('参数缺失');
      history.push('/appPdm/DocumentManagement/DocumentPublishRequest');
      return;
    }

    setLoading(true);
    try {
      const result = await DocumentPublishRequestGetAsync({ id: requestId });
      setData(result);

      // 设置表单初始值
      const initialValues: any = {
        requestNumber: result.requestNumber || '-',
        title: result.title || '-',
        approverName: result.approverName || '-',
        description: result.description || '-',
        remark: result.remark || '-',
        creator: result.creator || '-',
        creationTime: result.creationTime ? dayjs(result.creationTime).format('YYYY-MM-DD HH:mm:ss') : '-',
      };

      form.setInitialValues(initialValues);
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
    history.push('/appPdm/DocumentManagement/DocumentPublishRequest');
  };

  const handleEdit = () => {
    history.push(`/appPdm/DocumentManagement/DocumentPublishRequest/form?id=${requestId}`);
  };

  const handleSubmit = async () => {
    const hide = message.loading('正在提交...', 0);
    try {
      await DocumentPublishRequestSubmitAsync({ id: requestId });
      message.success('提交成功');
      loadDetail();
    } catch (error) {
      message.error('提交失败');
    } finally {
      hide();
    }
  };

  const handleRestart = () => {
    history.push(`/appPdm/DocumentManagement/DocumentPublishRequest/form?copyFrom=${requestId}`);
  };

  // 获取状态标签
  const getStatusTag = () => {
    if (!data) return null;
    const statusItem = documentPublishRequestStatusEnum.find(item => item.value === data.status);
    if (!statusItem) return null;
    return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
  };

  const isPending = data?.status === DocumentPublishRequestStatus.Pending;
  const isRejected = data?.status === DocumentPublishRequestStatus.Rejected;
  const isCancelled = data?.status === DocumentPublishRequestStatus.Cancelled;

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
                status: {
                  type: 'number',
                  title: '状态',
                  'x-decorator': 'FormItem',
                  'x-component': 'PreviewText',
                  'x-content': data ? getStatusTag() : '-',
                },
              },
            },
            colTitle: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                title: {
                  type: 'string',
                  title: '申请标题',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            colApprover: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                approverName: {
                  type: 'string',
                  title: '审批人',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            // 描述信息
            dividerDesc: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '描述信息',
                    style: { marginTop: 5, marginBottom: 5 },
                  },
                },
              },
            },
            colDescription: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                description: {
                  type: 'string',
                  title: '描述',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 2 },
                },
              },
            },
            colRemark: {
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
            colCreator: {
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
            colCreationTime: {
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
          },
        },
      },
    };
  }, [data]);

  // 明细列表列定义
  const detailColumnDefs = useMemo(() => [
    { field: 'documentNumber', headerName: '文档编码', width: 150 },
    { field: 'documentName', headerName: '文档名称', width: 200 },
    { field: 'documentVersion', headerName: '文档版本', width: 100 },
    { field: 'documentTypeName', headerName: '文档类型', width: 120 },
    { field: 'fileName', headerName: '文件名称', width: 150 },
    { field: 'partNumber', headerName: '物料编码', width: 120 },
    { field: 'partName', headerName: '物料名称', width: 150 },
    { field: 'drawingNumber', headerName: '图号', width: 120 },
  ], []);

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      <Spin spinning={loading}>
        {/* 工作流进度信息 */}
        {data?.workflowInstanceId && (
          <WorkflowInstanceInfo
            workflowInstanceId={data.workflowInstanceId}
            correlationData={{ creator: data.creator }}
          />
        )}

        {/* 表单详情 */}
        {data && (
          <Card
            title={
              <Space>
                <span>文档发布申请单详情</span>
                {getStatusTag()}
              </Space>
            }
          >
            <FormProvider form={form}>
              <FormLayout {...formLayout}>
                <SchemaField schema={schema} />
              </FormLayout>
            </FormProvider>

            {/* 文档发布明细 */}
            <Card
              title="文档发布项"
              type="inner"
              style={{ marginTop: 16 }}
            >
              <AgGridPlus
                gridRef={gridRef}
                dataSource={data.items || []}
                columnDefs={detailColumnDefs}
                pagination={false}
                domLayout="autoHeight"
                toolBarRender={false}
                search={false}
              />
            </Card>
          </Card>
        )}

        {/* 审批日志 */}
        {data?.workflowInstanceId && (
          <WorkflowExecutionCorrelationList
            hideSearch={true}
            workflowData={{
              correlationId: data.id || requestId,
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
          {(isRejected || isCancelled) && (
            <Button icon={<RedoOutlined />} onClick={handleRestart}>
              重新发起
            </Button>
          )}
        </ToolBar>
      </Spin>
    </div>
  );
};

export default DocumentPublishRequestDetailPage;
