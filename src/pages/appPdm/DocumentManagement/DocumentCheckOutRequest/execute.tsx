/**
 * 文档检出申请工作流审批页
 * 路由: /appPdm/DocumentManagement/DocumentCheckOutRequest/execute?definitionId={definitionId}&correlationId={correlationId}&activityId={activityId}&workflowInstanceId={workflowInstanceId}&workItemId={workItemId}
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Card, Button, message, Spin } from 'antd';
import { history, useSchemaField, closeTab } from 'umi';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { observable } from '@formily/reactive';
import { ToolBar } from '@/components';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import {
  DocumentCheckOutRequestGetAsync,
} from '@/services/pdm/DocumentCheckOutRequest';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import WorkflowExecutionForm from '@/pages/appWorkflow/_utils/workflowExecutionForm';
import WorkflowExecutionList from '@/pages/appWorkflow/_utils/workflowExecutionList';
import { WorkItemAssignDialog } from '@/pages/appWorkflow/_utils';
import useWorkflow from '@/hooks/useWorkflow';
import { pubGoBack } from '@/components/public';
import { DocumentCheckOutRequestExecuteWorkflowAsync } from '@/services/pdm/DocumentCheckOutRequest';
import dayjs from 'dayjs';
import { useKeepAliveParams } from '@/hooks';

export const routeProps = {
  name: '文档检出申请审批',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const DocumentCheckOutRequestExecutePage: React.FC = () => {
  const { params } = useKeepAliveParams('/appPdm/DocumentManagement/DocumentCheckOutRequest/execute', ['definitionId', 'correlationId', 'activityId', 'workflowInstanceId', 'workItemId']);
  const { definitionId, correlationId, activityId, workflowInstanceId, workItemId } = params;
  const gridRef = React.useRef<GridRef>();

  // 创建 SchemaField（不传递组件，所有字段都是只读的）
  const SchemaField = useSchemaField();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestDto | null>(null);

  // 获取工作流信息
  const workflowInfo = useWorkflow(workflowInstanceId, activityId, correlationId);
  const $workflowInfo = useMemo(() => observable({
    currentActivityName: '',
    executionActivityNames: [] as string[]
  }), []);

  // 更新工作流信息
  useEffect(() => {
    if (workflowInfo.executionLogs) {
      $workflowInfo.currentActivityName = workflowInfo.currentActivityName || '';
      $workflowInfo.executionActivityNames = workflowInfo.executionLogs?.map((x: any) => x.activityName) || [];
    }
  }, [workflowInfo, $workflowInfo]);

  // 创建表单实例
  const form = React.useMemo(
    () => createForm({
      validateFirst: true,
      // 不设置全局 readPretty，由各个字段单独控制
    }),
    []
  );

  // 加载初始数据
  useEffect(() => {
    if (correlationId) {
      setLoading(true);
      DocumentCheckOutRequestGetAsync({ id: correlationId as string })
        .then(result => {
          setData(result);

          const initialValues: any = {
            requestNumber: result.requestNumber,
            applicantName: result.applicantName,
            applicantTime: result.creationTime ? dayjs(result.creationTime).format('YYYY-MM-DD HH:mm:ss') : '',
            processorName: result.processorName,
            reason: result.reason,
            remark: result.remark,
          };

          form.setInitialValues(initialValues);
        })
        .catch(() => {
          message.error('加载数据失败');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [correlationId, form]);

  // 提交审批
  const handleSubmit = async () => {
    try {
      await form.validate();
      const values = form.values;

      // 检查工作流输入
      if (!values.workflowInput) {
        message.error('请填写审批意见');
        return;
      }

      // 构建符合API要求的数据结构
      const submitData = {
        workflowInput: {
          ...values.workflowInput,
          activityId,
        }
      };

      await DocumentCheckOutRequestExecuteWorkflowAsync({ id: correlationId }, submitData);
      message.success('审批提交成功');
      closeTab(history.location.pathname);
    } catch (error) {
      console.error('审批提交失败:', error);
      message.error('审批提交失败');
    }
  };

  // Schema定义（申请单信息字段设置为只读）
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
                  requestNumber: {
                    type: 'string',
                    title: '申请单号',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-pattern': 'readPretty',
                  },
                },
              },
              col2: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 1 },
                properties: {
                  applicantName: {
                    type: 'string',
                    title: '申请人',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-pattern': 'readPretty',
                  },
                },
              },
              col3: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 1 },
                properties: {
                  applicantTime: {
                    type: 'string',
                    title: '申请时间',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-pattern': 'readPretty',
                  },
                },
              },
              col4: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 1 },
                properties: {
                  processorName: {
                    type: 'string',
                    title: '处理人',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-pattern': 'readPretty',
                  },
                },
              },
              col5: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 2 },
                properties: {
                  reason: {
                    type: 'string',
                    title: '申请原因',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input.TextArea',
                    'x-component-props': {
                      rows: 2,
                    },
                    'x-pattern': 'readPretty',
                  },
                },
              },
              col6: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 2 },
                properties: {
                  remark: {
                    type: 'string',
                    title: '备注',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input.TextArea',
                    'x-component-props': {
                      rows: 2,
                    },
                    'x-pattern': 'readPretty',
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
    { field: 'documentVersion', headerName: '文档版本', width: 100 },
    { field: 'fileType', headerName: '文档类型', width: 120 },
    { field: 'fileName', headerName: '文件名称', width: 200 },
    { field: 'partNumber', headerName: '物料编码', width: 150 },
    { field: 'partName', headerName: '物料名称', width: 180 },
    { field: 'drawingNumber', headerName: '图号', width: 150 },
  ];

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      <Spin spinning={loading}>
        {/* 工作流进度信息 */}
        <WorkflowInstanceInfo
          workflowInstanceId={workflowInstanceId as string}
          correlationData={{ ...form.values, activityId }}
          steps={[]}
          currentActivityName={workflowInfo.currentActivityName}
        />

        {/* 申请单基本信息 */}
        <Card title="申请单信息" style={{ marginBottom: 16 }}>
          <FormProvider form={form}>
            <SchemaField schema={schema} scope={{ $workflowInfo }} />
          </FormProvider>
        </Card>

        {/* 文档检出明细 */}
        <Card title="文档检出明细" style={{ marginBottom: 16 }}>
          <AgGridPlus
            gridRef={gridRef}
            dataSource={data?.items || []}
            columnDefs={detailColumnDefs}
            pagination={false}
            domLayout="autoHeight"
            toolBarRender={() => []}
            search={false}
          />
        </Card>

        {/* 工作流执行表单(审批意见) */}
        <WorkflowExecutionForm
          form={form}
          workflowInstanceId={workflowInstanceId}
          definitionId={definitionId}
          activityId={activityId}
          currentActivityName={workflowInfo.currentActivityName}
        />

        {/* 审批日志 */}
        <WorkflowExecutionList workflowInstanceId={workflowInstanceId} hideSearch={true} />

        {/* 底部按钮栏 */}
        <ToolBar>
          <Button
            onClick={() => {
              pubGoBack(true);
            }}
          >
            返回
          </Button>

          <WorkItemAssignDialog
            workflowInfo={{ workItemId }}
            entityForm={form}
            onConfirm={() => {
              closeTab(history.location.pathname);
            }}
          />

          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
        </ToolBar>
      </Spin>
    </div>
  );
};

export default DocumentCheckOutRequestExecutePage;
