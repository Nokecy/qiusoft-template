/**
 * 文档回收单详情页
 * 路由: /appPdm/DocumentManagement/DocumentRecycleOrder/detail?id={id}
 * 使用 Formily 表单阅读态展示
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Card, Button, Space, message, Spin, Tag } from 'antd';
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
  DocumentRecycleOrderGetAsync,
  DocumentRecycleOrderSubmitAsync,
} from '@/services/pdm/DocumentRecycleOrder';
import { documentRecycleOrderStatusEnum, DocumentRecycleOrderStatus, recycleItemStatusEnum } from './_enums';
import DeleteConfirm from '@/components/deleteConfirm';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import dayjs from 'dayjs';

export const routeProps = {
  name: '文档回收单详情',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const DocumentRecycleOrderDetailPage: React.FC = () => {
  const { params, isActive, hasChanged } = useKeepAliveParams('/appPdm/DocumentManagement/DocumentRecycleOrder/detail');
  const orderId = params.id as string;
  const access = useAccess();
  const gridRef = React.useRef<GridRef>();

  const SchemaField = useSchemaField({});

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto | null>(null);

  const canUpdate = true; // 权限待定义
  const canSubmit = true;

  // 创建只读表单实例
  const form = useMemo(() => createForm({ readPretty: true }), []);

  // 加载详情数据
  const loadDetail = useCallback(async () => {
    if (!orderId) {
      message.error('参数缺失');
      history.push('/appPdm/DocumentManagement/DocumentRecycleOrder');
      return;
    }

    setLoading(true);
    try {
      const result = await DocumentRecycleOrderGetAsync({ id: orderId });
      setData(result);

      // 设置表单初始值
      const initialValues: any = {
        recycleOrderNumber: result.recycleOrderNumber,
        recycleUsersText: (result.recycleUsers || []).map(u => u.userName).join(', ') || '-',
        approverName: result.approverName,
        recycleUserName: result.recycleUserName,
        recycleTime: result.recycleTime ? dayjs(result.recycleTime).format('YYYY-MM-DD') : '',
        remarks: result.remarks,
        creationTime: result.creationTime ? dayjs(result.creationTime).format('YYYY-MM-DD HH:mm:ss') : '',
      };

      form.setInitialValues(initialValues);
    } catch (error) {
      message.error('加载详情失败');
      history.push('/appPdm/DocumentManagement/DocumentRecycleOrder');
    } finally {
      setLoading(false);
    }
  }, [orderId, form]);

  // 初始加载
  useEffect(() => {
    if (!isActive || !hasChanged) return;
    loadDetail();
  }, [loadDetail, isActive, hasChanged]);

  // 返回列表
  const handleBack = () => {
    const currentPath = `${history.location.pathname}${history.location.search || ''}`;
    history.push('/appPdm/DocumentManagement/DocumentRecycleOrder');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 编辑
  const handleEdit = () => {
    history.push(`/appPdm/DocumentManagement/DocumentRecycleOrder/form?id=${orderId}`);
  };

  // 提交审批
  const handleSubmit = async () => {
    const hide = message.loading('正在提交...', 0);
    try {
      await DocumentRecycleOrderSubmitAsync({ id: orderId });
      message.success('提交成功');
      loadDetail(); // 重新加载数据
    } catch (error) {
      message.error('提交失败');
    } finally {
      hide();
    }
  };

  // 获取状态标签
  const getStatusTag = () => {
    if (!data) return null;
    const statusItem = documentRecycleOrderStatusEnum.find(
      item => item.value === data.status
    );
    if (!statusItem) return null;
    return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
  };

  // 判断是否可编辑/提交
  const isPending = data?.status === DocumentRecycleOrderStatus.Pending;

  // Schema定义
  const schema: ISchema = {
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-component': 'FormLayout',
        'x-component-props': formLayout,
        properties: {
          grid: {
            type: 'void',
            'x-component': 'FormGrid',
            'x-component-props': {
              maxColumns: 2,
              minColumns: 1,
              columnGap: 24,
              strictAutoFit: true,
            },
            properties: {
              col1: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 1 },
                properties: {
                  recycleOrderNumber: {
                    type: 'string',
                    title: '回收单号',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                },
              },
              col2: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 1 },
                properties: {
                  approverName: {
                    type: 'string',
                    title: '审核人',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                },
              },
              col3: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 2 },
                properties: {
                  recycleUsersText: {
                    type: 'string',
                    title: '回收对象',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input.TextArea',
                    'x-component-props': {
                      autoSize: { minRows: 1, maxRows: 3 },
                    },
                  },
                },
              },
              col4: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 1 },
                properties: {
                  recycleUserName: {
                    type: 'string',
                    title: '回收人',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                  recycleTime: {
                    type: 'string',
                    title: '回收时间',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                },
              },
              col5: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 1 },
                properties: {
                  creationTime: {
                    type: 'string',
                    title: '创建时间',
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
                  remarks: {
                    type: 'string',
                    title: '备注',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input.TextArea',
                    'x-component-props': {
                      rows: 2,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  // 明细列表列定义
  const detailColumnDefs = [
    { field: 'documentNumber', headerName: '文档编码', width: 150 },
    { field: 'documentName', headerName: '文档名称', width: 200 },
    {
      field: 'quantity',
      headerName: '份数',
      width: 100,
    },
    {
      field: 'recycleVersion',
      headerName: '回收版本',
      width: 120,
    },
    {
      field: 'expectedRecycleTime',
      headerName: '预计回收时间',
      width: 150,
      type: 'dateColumn',
      cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD') : '-'
    },
    {
      field: 'status',
      headerName: '状态',
      width: 100,
      cellRenderer: (params: any) => {
        const statusItem = recycleItemStatusEnum.find(item => item.value === params.value);
        if (!statusItem) return params.value;
        return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
      }
    },
    {
      field: 'remarks',
      headerName: '备注',
      width: 200,
    },
    {
      field: 'excludeUsers',
      headerName: '不回收对象',
      width: 200,
      cellRenderer: (params: any) => {
        const users = params.value || [];
        if (!users.length) return '-';
        return users.map((u: any) => u.userName).join(', ');
      },
    },
  ];

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      <Spin spinning={loading}>
        {/* 工作流进度信息 */}
        {data?.workflowInstanceId && (
          <WorkflowInstanceInfo
            workflowInstanceId={data.workflowInstanceId}
            correlationData={{ creator: data.recycleUserName }}
          />
        )}

        {/* 表单详情 */}
        <Card
          title={
            <Space>
              <span>文档回收单详情</span>
              {getStatusTag()}
            </Space>
          }
        >
          <FormProvider form={form}>
            <SchemaField schema={schema} />
          </FormProvider>
        </Card>

        {/* 文档回收明细 */}
        <Card title="文档回收明细" style={{ marginTop: 16 }}>
          <AgGridPlus
            gridRef={gridRef}
            dataSource={data?.items || []}
            columnDefs={detailColumnDefs}
            pagination={false}
            domLayout="autoHeight"
            toolBarRender={false}
            search={false}
          />
        </Card>

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
                <Button icon={<SendOutlined />} type="primary">
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

export default DocumentRecycleOrderDetailPage;
