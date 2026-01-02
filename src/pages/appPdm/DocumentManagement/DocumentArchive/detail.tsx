/**
 * 文档归档详情页
 * 使用 Formily 表单阅读态展示
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Card, Button, message, Spin, Tag } from 'antd';
import { DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { history, closeTab, useSchemaField } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout, FormGrid } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import { DocumentArchiveGetAsync, DocumentArchiveDownloadAttachmentAsync } from '@/services/pdm/DocumentArchive';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import { documentArchiveStatusText, documentArchiveTypeText, documentArchiveStatusEnum } from './_enums';
import dayjs from 'dayjs';

export const routeProps = {
  name: '文档归档详情',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 100,
  feedbackLayout: 'none' as const,
};

const DocumentArchiveDetailPage: React.FC = () => {
  const { params, isActive, hasChanged } = useKeepAliveParams('/appPdm/DocumentManagement/DocumentArchive/detail');
  const recordId = params.id as string;

  const SchemaField = useSchemaField({});

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [data, setData] = useState<API.BurnAbpPdmDocumentManagementDocumentArchivesDocumentArchiveDto>();

  // 创建只读表单实例
  const form = useMemo(() => createForm({ readPretty: true }), []);

  // 加载详情数据
  const loadDetail = useCallback(async () => {
    if (!recordId) {
      message.error('参数缺失');
      history.push('/appPdm/DocumentManagement/DocumentArchive');
      return;
    }

    setLoading(true);
    try {
      const result = await DocumentArchiveGetAsync({ id: recordId });
      setData(result);

      // 设置表单初始值
      const initialValues: any = {
        number: result.number,
        orderStatus: result.orderStatus,
        archiveType: result.archiveType !== undefined
          ? (documentArchiveTypeText[result.archiveType] || result.archiveType)
          : '-',
        hwOrderNumber: result.hwOrderNumber || '-',
        docNo: result.docNo || '-',
        documentName: result.documentName || '-',
        docVersion: result.docVersion || '-',
        documentTypeName: result.documentTypeName || '-',
        partNo: result.partNo || '-',
        partName: result.partName || '-',
        fileName: result.fileName || '-',
        modifyContent: result.modifyContent || '-',
        remark: result.remark || '-',
        rejectionReason: result.rejectionReason || '',
        approverName: result.approverName || '-',
        currentAssigneeName: result.currentAssigneeName || '-',
        currentActivityName: result.currentActivityName || '-',
        creator: result.creator || '-',
        creationTime: result.creationTime
          ? dayjs(result.creationTime).format('YYYY-MM-DD HH:mm:ss')
          : '-',
      };

      form.setInitialValues(initialValues);
    } catch (error) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  }, [recordId, form]);

  useEffect(() => {
    if (!isActive || !hasChanged) return;
    loadDetail();
  }, [loadDetail, isActive, hasChanged]);

  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/DocumentManagement/DocumentArchive');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 下载附件
  const handleDownload = async () => {
    if (!recordId) return;

    setDownloading(true);
    try {
      // 使用 responseType: 'blob' 获取流式响应
      const response = await DocumentArchiveDownloadAttachmentAsync(
        { id: recordId },
        { responseType: 'blob' }
      );

      // 创建 Blob URL 并下载
      const blob = response instanceof Blob ? response : new Blob([response]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data?.fileName || '附件';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      message.success('下载成功');
    } catch (error) {
      message.error('下载失败，请稍后重试');
    } finally {
      setDownloading(false);
    }
  };

  // 获取状态标签
  const getStatusTag = (status?: number) => {
    const statusItem = documentArchiveStatusEnum.find((item) => item.value === status);
    if (!statusItem) return <Tag>未知</Tag>;
    return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
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
                number: {
                  type: 'string',
                  title: '归档单号',
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
                orderStatus: {
                  type: 'number',
                  title: '状态',
                  'x-decorator': 'FormItem',
                  'x-component': 'PreviewText',
                  'x-content': data ? getStatusTag(data.orderStatus) : '-',
                },
              },
            },
            col3: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                archiveType: {
                  type: 'string',
                  title: '归档类型',
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
                hwOrderNumber: {
                  type: 'string',
                  title: '华为单号',
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
            col5: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                docNo: {
                  type: 'string',
                  title: '文档编号',
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
                documentName: {
                  type: 'string',
                  title: '文档名称',
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
                docVersion: {
                  type: 'string',
                  title: '文档版本',
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
                documentTypeName: {
                  type: 'string',
                  title: '文档类型',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            // 物料信息
            dividerPart: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '物料信息',
                    style: { marginTop: 5, marginBottom: 5 },
                  },
                },
              },
            },
            col9: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                partNo: {
                  type: 'string',
                  title: '物料编号',
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
                partName: {
                  type: 'string',
                  title: '物料名称',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            // 附件信息
            dividerFile: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '附件信息',
                    style: { marginTop: 5, marginBottom: 5 },
                  },
                },
              },
            },
            col11: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                fileName: {
                  type: 'string',
                  title: '文件名称',
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
            col12: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                modifyContent: {
                  type: 'string',
                  title: '修改内容',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 3 },
                },
              },
            },
            col13: {
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
            ...(data?.rejectionReason ? {
              col14: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 4 },
                properties: {
                  rejectionReason: {
                    type: 'string',
                    title: '驳回原因',
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
            // 审批信息
            dividerApproval: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '审批信息',
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
                approverName: {
                  type: 'string',
                  title: '审批人',
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
                currentAssigneeName: {
                  type: 'string',
                  title: '当前审批人',
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
                currentActivityName: {
                  type: 'string',
                  title: '当前节点',
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
                creator: {
                  type: 'string',
                  title: '创建人',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col19: {
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
            title="文档归档详情"
            extra={
              data?.fileName && (
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  loading={downloading}
                  onClick={handleDownload}
                >
                  下载附件
                </Button>
              )
            }
          >
            <FormProvider form={form}>
              <FormLayout {...formLayout}>
                <SchemaField schema={schema} />
              </FormLayout>
            </FormProvider>
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
        </ToolBar>
      </Spin>
    </div>
  );
};

export default DocumentArchiveDetailPage;
