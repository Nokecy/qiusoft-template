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
import { DocumentChangeOrderGetAsync, DocumentChangeOrderExecuteWorkflowAsync } from '@/services/pdm/DocumentChangeOrder';
import WorkflowExecutionForm from '@/pages/appWorkflow/_utils/workflowExecutionForm';
import useWorkflow from '@/hooks/useWorkflow';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import { useKeepAliveParams } from '@/hooks';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { serverUrl } from '@umijs/max';

/**
 * 文档变更单工作流执行页面
 */
const ExecuteFormPage = (props: any) => {
  const { params } = useKeepAliveParams('/appPdm/ChangeManagement/DocumentChangeOrder/execute', ['definitionId', 'correlationId', 'activityId', 'workflowInstanceId', 'workItemId']);
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
                let values: any = await DocumentChangeOrderGetAsync({ id: correlationId });

                let index = 0;
                if (values.activityId) {
                  values.activityId?.split(';').forEach((i, idx) => {
                    if (i == activityId) {
                      index = idx;
                    }
                  });
                  values.activityId = values.activityId.split(';')[index];
                  values.activityName = values.activityName.split(';')[index];
                  values.assigneeName = values.assigneeName.split(';')[index];
                  values.activityDisplayName = values.activityDisplayName.split(';')[index];
                  values.activityDescription = values.activityDescription.split(';')[index];
                }

                // 将创建人和创建时间映射到发起人和发起时间字段
                if (values.creator) {
                  values.initiatorName = values.creator;
                }
                if (values.creationTime) {
                  values.initiationTime = values.creationTime;
                }

                form.setValues(values);
                setCurrent(values);

                // 加载明细列表
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

  // 明细列表列定义（只读模式）
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

      await DocumentChangeOrderExecuteWorkflowAsync({ id: correlationId }, submitData);
      message.success('审批提交成功');
      closeTab(history.location.pathname);
    } catch (error) {
      console.error('审批提交失败:', error);
      message.error('审批提交失败');
    }
  };

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
      <Card title="变更单信息" style={{ marginBottom: 16 }}>
        <Spin spinning={loading} tip="加载中...">
          <FormProvider form={form}>
            <FormLayout {...schema.form} previewTextPlaceholder={'无'}>
              <SchemaField schema={schema.schema} scope={{ $workflowInfo }}></SchemaField>
            </FormLayout>
          </FormProvider>
        </Spin>
      </Card>

      {/* 文档变更明细 */}
      <Card title="文档变更明细" style={{ marginBottom: 16 }}>
        <AgGridPlus
          gridRef={gridRef}
          dataSource={documentItems}
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
  name: '处理文档变更单',
};
