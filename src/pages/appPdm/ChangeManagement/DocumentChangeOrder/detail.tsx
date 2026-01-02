/**
 * 文档变更单详情页
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
  DocumentChangeOrderGetAsync,
  DocumentChangeOrderSubmitForApprovalAsync,
} from '@/services/pdm/DocumentChangeOrder';
import { DocumentChangeOrderPermissions } from '@/pages/appPdm/_permissions';
import { changeOrderStatusEnum } from './_enums';
import DeleteConfirm from '@/components/deleteConfirm';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import dayjs from 'dayjs';
import { serverUrl } from '@umijs/max';

export const routeProps = {
  name: '文档变更单详情',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const DocumentChangeOrderDetailPage: React.FC = () => {
  const { params, isActive, hasChanged } = useKeepAliveParams('/appPdm/ChangeManagement/DocumentChangeOrder/detail');
  const orderId = params.id as string;
  const access = useAccess();

  const SchemaField = useSchemaField({});

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [documentItems, setDocumentItems] = useState<any[]>([]);
  const gridRef = React.useRef<GridRef>();

  const canUpdate = !!(access && (access[DocumentChangeOrderPermissions.Update] ?? true));
  const canSubmit = !!(access && (access[DocumentChangeOrderPermissions.SubmitForApproval] ?? true));

  // 创建只读表单实例
  const form = useMemo(() => createForm({ readPretty: true }), []);

  // 加载详情数据
  const loadDetail = useCallback(async () => {
    if (!orderId) {
      message.error('参数缺失');
      history.push('/appPdm/ChangeManagement/DocumentChangeOrder');
      return;
    }

    setLoading(true);
    try {
      const result = await DocumentChangeOrderGetAsync({ id: orderId });
      setData(result);

      // 设置表单初始值
      const initialValues: any = {
        changeOrderNumber: result.changeOrderNumber || '-',
        title: result.title || '-',
        creator: result.creator || '-',
        creationTime: result.creationTime ? dayjs(result.creationTime).format('YYYY-MM-DD HH:mm:ss') : '-',
        lastModifier: result.lastModifier || '-',
        lastModificationTime: result.lastModificationTime ? dayjs(result.lastModificationTime).format('YYYY-MM-DD HH:mm:ss') : '-',
        assignedToUserName: result.assignedToUserName || '-',
        changeReason: result.changeReason || '-',
        remarks: result.remarks || '-',
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
  }, [orderId, form]);

  useEffect(() => {
    if (!isActive || !hasChanged) return;
    loadDetail();
  }, [loadDetail, isActive, hasChanged]);

  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/ChangeManagement/DocumentChangeOrder');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  const handleEdit = () => {
    history.push(`/appPdm/ChangeManagement/DocumentChangeOrder/form?id=${orderId}`);
  };

  const handleSubmit = async () => {
    const hide = message.loading('正在提交...', 0);
    try {
      await DocumentChangeOrderSubmitForApprovalAsync({ id: orderId });
      message.success('提交成功');
      loadDetail();
    } catch (error) {
      message.error('提交失败');
    } finally {
      hide();
    }
  };

  // 获取状态标签
  const getStatusTag = () => {
    if (!data) return null;
    const statusItem = changeOrderStatusEnum.find(item => item.value === data.status);
    if (!statusItem) return null;
    return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
  };

  const isDraft = data?.status === 0;

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
                changeOrderNumber: {
                  type: 'string',
                  title: '变更单号',
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
            col3: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                title: {
                  type: 'string',
                  title: '变更主题',
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
                creator: {
                  type: 'string',
                  title: '发起人',
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
                assignedToUserName: {
                  type: 'string',
                  title: '处理人',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            // 变更说明
            dividerChange: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '变更说明',
                    style: { marginTop: 5, marginBottom: 5 },
                  },
                },
              },
            },
            col6: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                changeReason: {
                  type: 'string',
                  title: '变更原因',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 2 },
                },
              },
            },
            col7: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                remarks: {
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
            col8: {
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
            col9: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                lastModifier: {
                  type: 'string',
                  title: '最后修改人',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col10: {
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
  // 列顺序：变更前文档信息 + 物料信息 → 版本变更 → 变更后文档信息 → 库存处理 → 其他
  const detailColumnDefs = [
    // === 变更前文档信息 ===
    { field: 'documentNumber', headerName: '文档编码', width: 150 },
    { field: 'documentName', headerName: '变更前文档名称', width: 180 },
    { field: 'documentDescription', headerName: '变更前文档描述', width: 180 },
    { field: 'currentVersion', headerName: '变更前文档版本', width: 130 },
    {
      field: 'beforeChangeFileId',
      headerName: '变更前文件',
      width: 150,
      cellRenderer: (params: any) => params.value ? '已关联' : '-'
    },
    // === 关联物料信息 ===
    { field: 'partCode', headerName: '物料编码', width: 120 },
    { field: 'partDrawingNumber', headerName: '物料图号', width: 120 },
    { field: 'partName', headerName: '物料描述', width: 150 },
    // === 变更后文件名称/描述 ===
    { field: 'afterChangeFileName', headerName: '变更后文件名称', width: 180 },
    { field: 'afterChangeFileDescription', headerName: '变更后文件描述', width: 180 },
    // === 版本变更信息 ===
    {
      field: 'isUpgradeRequired',
      headerName: '是否升级版本',
      width: 120,
      cellRenderer: (params: any) => params.value ? '是' : '否'
    },
    { field: 'versionAfterUpgrade', headerName: '变更后版本', width: 130 },
    // === 变更后文件 ===
    {
      field: 'changeAfterFileBlobName',
      headerName: '变更后文件',
      width: 200,
      cellRenderer: (params: any) => {
        if (!params.value) return '-';
        // 从路径中提取文件名 (取最后一个斜杠后的内容)
        const fileName = params.value.split('/').pop() || params.value;
        return (
          <a
            onClick={(e) => {
              e.stopPropagation();
              window.open(`${serverUrl()}/api/attachmentManage/blob/by-blob-name/${params.value}`);
            }}
            style={{ color: '#1890ff', cursor: 'pointer' }}
          >
            {fileName}
          </a>
        );
      }
    },
    // === 库存处理信息 ===
    { field: 'internalStorage', headerName: '内部库存', width: 120 },
    { field: 'externalStorage', headerName: '外部库存', width: 120 },
    { field: 'productHandlingOpinion', headerName: '制品处理意见', width: 150 },
    // === 其他信息 ===
    { field: 'relatedOrderNumber', headerName: '关联单号', width: 150 },
    { field: 'changeAfterDescription', headerName: '更改说明', width: 200 },
  ];

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
                <span>文档变更单详情</span>
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

        {/* 文档变更明细 */}
        {data && (
          <Card title="文档变更明细" style={{ marginTop: 16 }}>
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
          {isDraft && (
            <Access accessible={canUpdate}>
              <Button icon={<EditOutlined />} onClick={handleEdit}>
                编辑
              </Button>
            </Access>
          )}
          {isDraft && (
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

export default DocumentChangeOrderDetailPage;
