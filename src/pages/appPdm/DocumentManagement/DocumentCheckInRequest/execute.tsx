import { Button, Card, Spin, message } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useSchemaField, closeTab, history } from 'umi';
import { formId, executeFormSchema } from './components/schema';
import { observable } from '@formily/reactive';
import { ToolBar } from '@/components';
import { createForm, onFormInit } from '@formily/core';
import { WorkItemAssignDialog } from '@/pages/appWorkflow/_utils';
import WorkflowExecutionList from '@/pages/appWorkflow/_utils/workflowExecutionList';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import { pubGoBack } from '@/components/public';
import { DocumentCheckInRequestGetAsync, DocumentCheckInRequestExecuteWorkflowAsync } from '@/services/pdm/DocumentCheckInRequest';
import WorkflowExecutionForm from '@/pages/appWorkflow/_utils/workflowExecutionForm';
import useWorkflow from '@/hooks/useWorkflow';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import { useKeepAliveParams } from '@/hooks';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';

/**
 * 文档检入申请单工作流执行页面
 */
const ExecuteFormPage = (props: any) => {
  const { params } = useKeepAliveParams('/appPdm/DocumentManagement/DocumentCheckInRequest/execute', ['definitionId', 'correlationId', 'activityId', 'workflowInstanceId', 'workItemId']);
  const { definitionId, correlationId, activityId, workflowInstanceId, workItemId } = params;
  const $store = useMemo(() => observable({ currentActivityName: '' }), []);
  const workflowInfo = useWorkflow(workflowInstanceId, activityId, correlationId);
  const [current, setCurrent]: any = useState({});
  const [loading, setLoading] = useState(false);
  const [documentItems, setDocumentItems] = useState<any[]>([]);
  const gridRef = React.useRef<GridRef>();

  const schema = executeFormSchema;
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
                let values: any = await DocumentCheckInRequestGetAsync({ id: correlationId });

                let index = 0;
                if (values.activityId) {
                  values.activityId?.split(';').forEach((i, idx) => {
                    if (i == activityId) {
                      index = idx;
                    }
                  });
                  values.activityId = values.activityId.split(';')[index];
                  values.activityName = values.activityName?.split(';')[index];
                  values.assigneeName = values.assigneeName?.split(';')[index];
                  values.activityDisplayName = values.activityDisplayName?.split(';')[index];
                  values.activityDescription = values.activityDescription?.split(';')[index];
                }

                form.setValues(values);
                setCurrent(values);

                // 加载检入明细列表
                if (values.items && values.items.length > 0) {
                  setDocumentItems(values.items.map((item: any, index: number) => ({
                    ...item,
                    rowId: `row_${index}`,
                  })));
                }
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

      await DocumentCheckInRequestExecuteWorkflowAsync({ id: correlationId }, submitData);
      message.success('审批提交成功');
      closeTab(history.location.pathname);
    } catch (error) {
      console.error('审批提交失败:', error);
      message.error('审批提交失败');
    }
  };

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
      {/* 工作流进度信息 */}
      <WorkflowInstanceInfo
        workflowInstanceId={workflowInstanceId as string}
        correlationData={{ ...form.values, activityId }}
        steps={[]}
        currentActivityName={workflowInfo.currentActivityName}
      />

      {/* 基本信息卡片 */}
      <Card title="检入申请单信息" style={{ marginBottom: 16 }}>
        <Spin spinning={loading} tip="加载中...">
          <FormProvider form={form}>
            <FormLayout {...schema.form} previewTextPlaceholder={'无'}>
              <SchemaField schema={schema.schema} scope={{ $workflowInfo }}></SchemaField>
            </FormLayout>
          </FormProvider>
        </Spin>
      </Card>

      {/* 检入明细 */}
      <Card title="文档检入明细" style={{ marginBottom: 16 }}>
        <AgGridPlus
          gridRef={gridRef}
          dataSource={documentItems}
          columnDefs={detailColumnDefs}
          pagination={false}
          domLayout="autoHeight"
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
  name: '处理文档检入申请单',
};
