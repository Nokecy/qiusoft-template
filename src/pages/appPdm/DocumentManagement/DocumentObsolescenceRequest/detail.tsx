/**
 * 文档作废申请详情页
 * 使用 Formily 表单阅读态展示
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Card, Button, message, Spin, Tag, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, Access, useAccess, useSchemaField } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import { DocumentObsolescenceRequestGetAsync } from '@/services/pdm/DocumentObsolescenceRequest';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import { approvalStatusEnum, approvalModeEnum } from './_enums';
import { DocumentObsolescenceRequestsPermissions } from '@/pages/appPdm/_permissions/pdmPermissions';
// 注意：ApproveDialog 和 RejectDialog 已删除，因为对应的 API 不存在
// 请使用工作流执行页面进行审批操作
import dayjs from 'dayjs';

export const routeProps = {
  name: '文档作废申请详情',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const DocumentObsolescenceRequestDetailPage: React.FC = () => {
  const { params, isActive, hasChanged } = useKeepAliveParams('/appPdm/DocumentManagement/DocumentObsolescenceRequest/detail');
  const access = useAccess();
  const SchemaField = useSchemaField({});

  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<any>(null);

  const canApprove = !!(access && access[DocumentObsolescenceRequestsPermissions.Approve]);
  const canReject = !!(access && access[DocumentObsolescenceRequestsPermissions.Reject]);

  // 创建只读表单实例
  const form = useMemo(() => createForm({ readPretty: true }), []);

  // 格式化日期
  const formatDate = (date: string | undefined) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '-';
  };

  // 加载详情数据
  const loadDetail = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await DocumentObsolescenceRequestGetAsync({ id });
      setDetail(res);

      // 设置表单初始值
      const initialValues: any = {
        requestNumber: res.requestNumber || '-',
        title: res.title || '-',
        documentNumber: res.documentNumber || '-',
        documentName: res.documentName || '-',
        documentVersion: res.documentVersion || '-',
        effectiveDate: formatDate(res.effectiveDate),
        creatorName: res.creatorName || '-',
        assignedToUserCode: res.assignedToUserCode || '-',
        assignedToUserName: res.assignedToUserName || '-',
        reasonDescription: res.reasonDescription || '-',
        description: res.description || '-',
        creationTime: formatDate(res.creationTime),
        submittedAt: formatDate(res.submittedAt),
        approvedAt: formatDate(res.approvedAt),
        lastModificationTime: formatDate(res.lastModificationTime),
        rejectReason: res.rejectReason || '',
        withdrawReason: res.withdrawReason || '',
      };

      form.setInitialValues(initialValues);
    } catch (error) {
      message.error('加载详情失败');
      console.error('加载详情失败:', error);
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    const requestId = params.id as string;
    if (!isActive || !hasChanged) return;
    if (!requestId) return;

    setDetail(null);
    loadDetail(requestId);
  }, [params, isActive, hasChanged, loadDetail]);

  // 刷新数据
  const handleRefresh = () => {
    const requestId = params.id as string;
    if (requestId) {
      loadDetail(requestId);
    }
  };

  // 返回列表
  const handleBack = () => {
    history.push('/appPdm/DocumentManagement/DocumentObsolescenceRequest');
  };

  // 获取状态标签
  const getStatusTag = (status?: number) => {
    if (status === undefined) return <Tag>未知</Tag>;
    const config = approvalStatusEnum.find(item => item.value === status);
    if (!config) return <Tag>未知</Tag>;
    return <Tag color={config.color}>{config.label}</Tag>;
  };

  // 获取审批模式标签
  const getApprovalModeTag = (mode?: number) => {
    if (mode === undefined) return <Tag>未知</Tag>;
    const config = approvalModeEnum.find(item => item.value === mode);
    if (!config) return <Tag>未知</Tag>;
    return <Tag color={config.color}>{config.label}</Tag>;
  };

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
                  title: '申请编号',
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
                  'x-content': detail ? getStatusTag(detail.status) : '-',
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
                  title: '申请标题',
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
                approvalMode: {
                  type: 'number',
                  title: '审批模式',
                  'x-decorator': 'FormItem',
                  'x-component': 'PreviewText',
                  'x-content': detail ? getApprovalModeTag(detail.approvalMode) : '-',
                },
              },
            },
            col5: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                effectiveDate: {
                  type: 'string',
                  title: '失效时间',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            // 文档信息
            dividerDoc: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '文档信息',
                    style: { marginTop: 5, marginBottom: 5 },
                  },
                },
              },
            },
            col6: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                documentNumber: {
                  type: 'string',
                  title: '文档编号',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col7: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                documentName: {
                  type: 'string',
                  title: '文档名称',
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
                documentVersion: {
                  type: 'string',
                  title: '文档版本',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            // 作废说明
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
                    children: '作废说明',
                    style: { marginTop: 5, marginBottom: 5 },
                  },
                },
              },
            },
            col9: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                reasonDescription: {
                  type: 'string',
                  title: '作废原因',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 2 },
                },
              },
            },
            col10: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                description: {
                  type: 'string',
                  title: '申请说明',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 2 },
                },
              },
            },
            ...(detail?.rejectReason ? {
              col11: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 4 },
                properties: {
                  rejectReason: {
                    type: 'string',
                    title: '拒绝原因',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input.TextArea',
                    'x-component-props': {
                      rows: 2,
                      style: { color: '#ff4d4f' },
                    },
                  },
                },
              },
            } : {}),
            ...(detail?.withdrawReason ? {
              col12: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 4 },
                properties: {
                  withdrawReason: {
                    type: 'string',
                    title: '撤回原因',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input.TextArea',
                    'x-component-props': { rows: 2 },
                  },
                },
              },
            } : {}),
            // 处理人信息
            dividerHandler: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '处理人信息',
                    style: { marginTop: 5, marginBottom: 5 },
                  },
                },
              },
            },
            col13: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                creatorName: {
                  type: 'string',
                  title: '创建人',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col14: {
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
            col15: {
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
            col16: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                submittedAt: {
                  type: 'string',
                  title: '提交时间',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col17: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                approvedAt: {
                  type: 'string',
                  title: '批准时间',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col18: {
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
  }, [detail]);

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      <Spin spinning={loading}>
        {/* 工作流进度信息 */}
        {detail?.workflowInstanceId && (
          <WorkflowInstanceInfo
            workflowInstanceId={detail.workflowInstanceId}
            correlationData={{ creator: detail.creatorName }}
          />
        )}

        {/* 表单详情 */}
        {detail && (
          <Card title="文档作废申请详情">
            <FormProvider form={form}>
              <FormLayout {...formLayout}>
                <SchemaField schema={schema} />
              </FormLayout>
            </FormProvider>
          </Card>
        )}

        {/* 审批日志 */}
        {detail?.workflowInstanceId && (
          <WorkflowExecutionCorrelationList
            hideSearch={true}
            workflowData={{
              correlationId: detail.id as string,
              workflowDefinitionId: detail.workflowDefinitionId || ''
            }}
          />
        )}

        {/* 底部操作栏 */}
        <ToolBar>
          <Space>
            <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
              返回
            </Button>

            {/* 审批和拒绝按钮已移除，请使用工作流执行页面进行审批操作 */}
          </Space>
        </ToolBar>
      </Spin>
    </div>
  );
};

export default DocumentObsolescenceRequestDetailPage;
