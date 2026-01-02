import { Button, Card, Spin, message, Descriptions, Tag } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useSchemaField, closeTab, history } from 'umi';
import { observable } from '@formily/reactive';
import { ToolBar } from '@/components';
import { createForm, onFormInit } from '@formily/core';
import { WorkItemAssignDialog } from '@/pages/appWorkflow/_utils';
import WorkflowExecutionList from '@/pages/appWorkflow/_utils/workflowExecutionList';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import { pubGoBack } from '@/components/public';
import { DocumentReleaseGetAsync, DocumentReleaseExecuteWorkflowAsync } from '@/services/pdm/DocumentRelease';
import WorkflowExecutionForm from '@/pages/appWorkflow/_utils/workflowExecutionForm';
import useWorkflow from '@/hooks/useWorkflow';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import { useKeepAliveParams } from '@/hooks';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { documentReleaseStatusEnum } from './_components/enums';
import type { ISchema } from '@formily/json-schema';
import dayjs from 'dayjs';

/**
 * 文档发放申请工作流执行页面
 */
const ExecuteFormPage = (props: any) => {
  const { params } = useKeepAliveParams('/appPdm/DocumentManagement/DocumentRelease/execute', ['definitionId', 'correlationId', 'activityId', 'workflowInstanceId', 'workItemId']);
  const { definitionId, correlationId, activityId, workflowInstanceId, workItemId } = params;
  const workflowInfo = useWorkflow(workflowInstanceId, activityId, correlationId);
  const [current, setCurrent]: any = useState({});
  const [loading, setLoading] = useState(false);
  const gridRef = React.useRef<GridRef>();

  const SchemaField = useSchemaField();
  const $workflowInfo = useMemo(
    () =>
      observable({
        currentActivityName: '',
        executionActivityNames: [],
      }),
    []
  );

  const form = useMemo(
    () =>
      createForm({
        effects: () => {
          onFormInit(async (form) => {
            if (correlationId) {
              setLoading(true);
              try {
                const values: any = await DocumentReleaseGetAsync({ id: correlationId });
                form.setValues(values);
                setCurrent(values);
              } catch (error) {
                message.error('加载数据失败');
              } finally {
                setLoading(false);
              }
            }
          });
        },
      }),
    []
  );

  /**
   * 获取流程信息
   */
  useEffect(() => {
    if (workflowInfo.executionLogs) {
      $workflowInfo.currentActivityName = workflowInfo.currentActivityName!;

      //@ts-ignore
      $workflowInfo.executionActivityNames = workflowInfo.executionLogs?.map((x) => x.activityDisplayName);
    }
  }, [workflowInfo]);

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

      await DocumentReleaseExecuteWorkflowAsync({ id: correlationId }, submitData);
      message.success('审批提交成功');
      closeTab(history.location.pathname);
    } catch (error) {
      console.error('审批提交失败:', error);
      message.error('审批提交失败');
    }
  };

  // 获取状态标签
  const getStatusTag = (status?: number) => {
    if (status === undefined) return '-';
    const statusItem = documentReleaseStatusEnum.find(item => item.value === status);
    if (!statusItem) return '-';
    return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
  };

  // 只读模式的 Schema
  const executeFormSchema: ISchema = {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': { maxColumns: 2, strictAutoFit: true },
        properties: {
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              releaseNumber: {
                type: 'string',
                title: '发放单号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: 'readPretty' as const
                    }
                  }
                },
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
                title: '审批人姓名',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: 'readPretty' as const
                    }
                  }
                },
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              title: {
                type: 'string',
                title: '发放标题',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: 'readPretty' as const
                    }
                  }
                },
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '发放说明',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  rows: 3,
                },
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: 'readPretty' as const
                    }
                  }
                },
              },
            },
          },
        },
      },
    },
  };

  // 文档明细列定义
  const documentColumnDefs = [
    { field: 'documentNumber', headerName: '文档编码', width: 150 },
    { field: 'documentName', headerName: '文档名称', width: 200 },
    { field: 'copies', headerName: '份数', width: 80 },
    {
      field: 'isFirstRelease',
      headerName: '是否首发',
      width: 100,
      valueFormatter: (params: any) => params.value ? '是' : '否'
    },
    { field: 'releaseVersion', headerName: '发放版本', width: 120 },
    { field: 'recallVersion', headerName: '回收版本', width: 120 },
    {
      field: 'effectiveDate',
      headerName: '生效日期',
      width: 150,
      valueFormatter: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD') : '-'
    },
    {
      field: 'requiresConfirmation',
      headerName: '需要确认',
      width: 100,
      valueFormatter: (params: any) => params.value ? '是' : '否'
    },
    {
      field: 'expectedRecallDate',
      headerName: '预计回收时间',
      width: 150,
      valueFormatter: (params: any) => params.value ? dayjs(params.value).format('YYYY-MM-DD') : '-'
    },
    { field: 'remarks', headerName: '备注', width: 200 },
  ];

  // 接收人列定义
  const recipientColumnDefs = [
    { field: 'recipientName', headerName: '接收人', width: 120 },
    { field: 'departmentName', headerName: '部门', width: 150 },
  ];

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      {/* 工作流进度信息 */}
      <WorkflowInstanceInfo
        workflowInstanceId={workflowInstanceId as string}
        correlationData={{ ...form.values, activityId }}
        steps={[]}
        currentActivityName={workflowInfo.currentActivityName}
      />

      {/* 基本信息卡片 */}
      <Card title="发放单信息" style={{ marginBottom: 16 }}>
        <Spin spinning={loading} tip="加载中...">
          <Descriptions column={2} bordered size="middle">
            <Descriptions.Item label="发放单号">{current?.releaseNumber || '-'}</Descriptions.Item>
            <Descriptions.Item label="状态">{getStatusTag(current?.status)}</Descriptions.Item>
            <Descriptions.Item label="审批人姓名">{current?.approverName || '-'}</Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {current?.creationTime ? dayjs(current.creationTime).format('YYYY-MM-DD HH:mm') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="标题" span={2}>{current?.title || '-'}</Descriptions.Item>
            <Descriptions.Item label="说明" span={2}>{current?.description || '-'}</Descriptions.Item>
          </Descriptions>
        </Spin>
      </Card>

      {/* 发放文档明细 */}
      <Card title="发放文档" style={{ marginBottom: 16 }}>
        <AgGridPlus
          gridRef={gridRef}
          dataSource={current?.documents || []}
          columnDefs={documentColumnDefs}
          pagination={false}
          domLayout="autoHeight"
          search={false}
        />
      </Card>

      {/* 接收人列表 */}
      <Card title="接收人" style={{ marginBottom: 16 }}>
        <AgGridPlus
          gridRef={gridRef}
          dataSource={current?.recipients || []}
          columnDefs={recipientColumnDefs}
          pagination={false}
          domLayout="autoHeight"
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
      <WorkflowExecutionList {...props} workflowInstanceId={workflowInstanceId} hideSearch={true} />

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
    </div>
  );
};

export default ExecuteFormPage;
export const routeProps = {
  name: '处理文档发放申请',
};
