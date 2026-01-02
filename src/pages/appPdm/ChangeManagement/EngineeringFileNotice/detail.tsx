/**
 * 工程文件通知单详情页
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Card, Button, message, Spin, Tag, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, closeTab, useSchemaField } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import {
   EngineeringFileNotificationGetAsync,
} from '@/services/pdm/EngineeringFileNotification';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import { engineeringFileNotificationStatusText, archiveTypeText, engineeringFileNotificationStatusEnum } from './_enums';
import { useDocumentTypeName } from './_utils/useDocumentTypeName';

export const routeProps = {
   name: '工程文件通知单详情',
};

// 表单布局配置
const formLayout = {
   labelCol: 6,
   wrapperCol: 18,
   labelWidth: 120,
   feedbackLayout: 'none' as const,
};

const EngineeringFileNotificationDetailPage: React.FC = () => {
   const { params } = useKeepAliveParams('/appPdm/ChangeManagement/EngineeringFileNotice/detail');
   const recordId = params.id as string;
   const SchemaField = useSchemaField({});

   const [loading, setLoading] = useState(false);
   const [data, setData] = useState<API.BurnAbpPdmDocumentManagementEngineeringFileNotificationsEngineeringFileNotificationDto>();

   const { typeName: docTypeName } = useDocumentTypeName(data?.docType);

   // 创建只读表单实例
   const form = useMemo(() => createForm({ readPretty: true }), []);

   // 加载数据
   const loadData = useCallback(async (targetId: string) => {
      try {
         setLoading(true);
         const result = await EngineeringFileNotificationGetAsync({ id: targetId });
         setData(result);

         // 设置表单初始值
         const initialValues: any = {
            number: result.number || '-',
            orderStatus: result.orderStatus,
            partNo: result.partNo || '-',
            partName: result.partName || '-',
            docNo: result.docNo || '-',
            docName: result.docName || '-',
            docVersion: result.docVersion || '-',
            // docType handled by hook, need to handle async update or pass to schema
            changePage: result.changePage || '-',
            changeVersion: result.changeVersion ? '是' : '否',
            hwOrderNumber: result.hwOrderNumber || '-',
            archiveType: result.archiveType !== undefined ? archiveTypeText[result.archiveType] || '-' : '-',
            modifyContent: result.modifyContent || '-',
            note: result.note || '-',
            assigneeName: result.assigneeName || '-',
            activityDisplayName: result.activityDisplayName || '-',
         };
         form.setInitialValues(initialValues);

      } catch (error) {
         console.error('加载数据失败:', error);
         message.error('加载数据失败');
      } finally {
         setLoading(false);
      }
   }, [form]);

   useEffect(() => {
      if (recordId) {
         loadData(recordId);
      }
   }, [recordId, loadData]);

   // Need to update form values when docTypeName changes
   useEffect(() => {
      if (docTypeName && form) {
         form.setValues({
            docType: docTypeName
         });
      } else {
         form.setValues({
            docType: '-'
         });
      }
   }, [docTypeName, form]);


   const handleBack = () => {
      const currentPath = window.location.pathname;
      history.push('/appPdm/ChangeManagement/EngineeringFileNotice');
      setTimeout(() => {
         closeTab(currentPath);
      }, 150);
   };

   // 获取状态标签
   const getStatusTag = (status?: number) => {
      const statusItem = engineeringFileNotificationStatusEnum.find(item => item.value === status);
      return statusItem ? <Tag color={statusItem.color}>{statusItem.label}</Tag> : '-';
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
                           title: '通知单号',
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
                        }
                     }
                  },
                  col_partNo: {
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
                  col_partName: {
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
                  col_docNo: {
                     type: 'void',
                     'x-component': 'FormGrid.GridColumn',
                     'x-component-props': { gridSpan: 2 },
                     properties: {
                        docNo: {
                           type: 'string',
                           title: '图纸编号',
                           'x-decorator': 'FormItem',
                           'x-component': 'Input',
                        },
                     },
                  },
                  col_docName: {
                     type: 'void',
                     'x-component': 'FormGrid.GridColumn',
                     'x-component-props': { gridSpan: 2 },
                     properties: {
                        docName: {
                           type: 'string',
                           title: '图纸名称',
                           'x-decorator': 'FormItem',
                           'x-component': 'Input',
                        },
                     },
                  },
                  col_docVersion: {
                     type: 'void',
                     'x-component': 'FormGrid.GridColumn',
                     'x-component-props': { gridSpan: 2 },
                     properties: {
                        docVersion: {
                           type: 'string',
                           title: '图纸版本',
                           'x-decorator': 'FormItem',
                           'x-component': 'Input',
                        },
                     },
                  },
                  col_docType: {
                     type: 'void',
                     'x-component': 'FormGrid.GridColumn',
                     'x-component-props': { gridSpan: 2 },
                     properties: {
                        docType: {
                           type: 'string',
                           title: '图纸类型',
                           'x-decorator': 'FormItem',
                           'x-component': 'Input',
                        },
                     },
                  },
                  col_hwOrderNumber: {
                     type: 'void',
                     'x-component': 'FormGrid.GridColumn',
                     'x-component-props': { gridSpan: 2 },
                     properties: {
                        hwOrderNumber: {
                           type: 'string',
                           title: 'HW单号',
                           'x-decorator': 'FormItem',
                           'x-component': 'Input',
                        },
                     },
                  },
                  col_archiveType: {
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
                  col_changePage: {
                     type: 'void',
                     'x-component': 'FormGrid.GridColumn',
                     'x-component-props': { gridSpan: 2 },
                     properties: {
                        changePage: {
                           type: 'string',
                           title: '变更页数',
                           'x-decorator': 'FormItem',
                           'x-component': 'Input',
                        },
                     },
                  },
                  col_changeVersion: {
                     type: 'void',
                     'x-component': 'FormGrid.GridColumn',
                     'x-component-props': { gridSpan: 2 },
                     properties: {
                        changeVersion: {
                           type: 'string',
                           title: '是否变更版本',
                           'x-decorator': 'FormItem',
                           'x-component': 'Input',
                        },
                     },
                  },
                  col_modifyContent: {
                     type: 'void',
                     'x-component': 'FormGrid.GridColumn',
                     'x-component-props': { gridSpan: 4 },
                     properties: {
                        modifyContent: {
                           type: 'string',
                           title: '修改内容',
                           'x-decorator': 'FormItem',
                           'x-component': 'Input.TextArea',
                           'x-component-props': { rows: 2 },
                        },
                     },
                  },
                  col_note: {
                     type: 'void',
                     'x-component': 'FormGrid.GridColumn',
                     'x-component-props': { gridSpan: 4 },
                     properties: {
                        note: {
                           type: 'string',
                           title: '备注',
                           'x-decorator': 'FormItem',
                           'x-component': 'Input.TextArea',
                           'x-component-props': { rows: 2 },
                        },
                     },
                  },

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
                  col_assigneeName: {
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
                  col_activityDisplayName: {
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

            <Card
               title={
                  <Space>
                     <span>工程文件通知单详情</span>
                     {getStatusTag(data?.orderStatus)}
                  </Space>
               }
            >
               <FormProvider form={form}>
                  <FormLayout {...formLayout}>
                     <SchemaField schema={schema} />
                  </FormLayout>
               </FormProvider>
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
               <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>返回</Button>
            </ToolBar>
         </Spin>
      </div>
   );
};

export default EngineeringFileNotificationDetailPage;
