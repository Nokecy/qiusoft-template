import React, { useEffect, useState, useMemo } from 'react';
import { Card, Button, message, Spin, Table } from 'antd';
import { history, closeTab } from 'umi';
import { createForm, onFormInit } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';
import { FormLayout, FormItem, Input, Select, DatePicker, FormGrid, ArrayTable, Editable, PreviewText } from '@formily/antd-v5';
import { observable } from '@formily/reactive';
import { ToolBar } from '@/components';
import {
  PartDocumentChangeOrderGetAsync,
  PartDocumentChangeOrderExecuteWorkflowAsync,
} from '@/services/pdm/PartDocumentChangeOrder';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import WorkflowExecutionForm from '@/pages/appWorkflow/_utils/workflowExecutionForm';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkItemAssignDialog from '@/pages/appWorkflow/_utils/workItemAssignDialog';
import { useWorkflow } from '@/hooks/useWorkflow';
import { useKeepAliveParams } from '@/hooks';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import MaterialCodeSelect from '@/pages/appPdm/_formWidgets/MaterialCodeSelect';
import AttachmentUpload from '@/components/AttachmentUpload';
import { executeSchema } from './components/schema';

export const routeProps = {
  name: '技术图纸更改审批',
};

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormLayout,
    Input,
    Select,
    DatePicker,
    FormGrid,
    ArrayTable,
    Editable,
    PreviewText,
    Card,
    UserSelect,
    MaterialCodeSelect,
    AttachmentUpload,
  },
});

const PartDocumentChangeOrderExecutePage: React.FC = () => {
  const { params } = useKeepAliveParams('/appPdm/DocumentManagement/PartDocumentChangeOrder/execute', [
    'definitionId', 'correlationId', 'activityId', 'workflowInstanceId', 'workItemId'
  ]);
  const { definitionId, correlationId, activityId, workflowInstanceId, workItemId } = params;

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 用于表格显示的变更明细数据
  const [items, setItems] = useState<any[]>([]);

  const $workflowInfo = useMemo(
    () =>
      observable({
        currentActivityName: '',
        executionActivityNames: [] as string[],
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
                const result = await PartDocumentChangeOrderGetAsync({ id: correlationId });
                const attachmentData = result?.blobName
                  ? {
                      blobName: result.blobName,
                      fileName: result.blobName.split('/').pop() || result.blobName.split('\\').pop() || result.docName || '附件',
                      id: result.blobName,
                    }
                  : undefined;
                form.setValues({ ...result, attachment: attachmentData });
                setItems(result.items || []);
              } catch (e) {
                message.error('加载数据失败');
              } finally {
                setLoading(false);
              }
            }
          });
        },
      }),
    [correlationId]
  );

  // 变更明细表格列定义
  const itemColumns = [
    { title: '序号', dataIndex: 'index', key: 'index', width: 60, render: (_: any, __: any, index: number) => index + 1 },
    { title: '物料编号', dataIndex: 'partNo', key: 'partNo', width: 120 },
    { title: '物料名称', dataIndex: 'partName', key: 'partName', width: 150 },
    { title: '变更内容', dataIndex: 'changeContent', key: 'changeContent' },
    { title: '备注', dataIndex: 'remark', key: 'remark', width: 150 },
  ];

  // 状态用于 useWorkflow input
  useEffect(() => {
    // 数据加载由 onFormInit 控制，这里不再重复加载
  }, [correlationId]);

  // 我们假设 params 里的 workflowInstanceId 是准确的。如果为空，可能只有 recordId，这时需要等数据加载。
  // 但 useWorkflow 不能在 effect 里调用。
  // 这里的 data.workflowInstanceId 可能还没拿到。
  // 实际上 onFormInit 会设置 form values。
  // 我们可以通过 form.values.workflowInstanceId 获取吗？不，那不是 reactive state 在组件层。
  // 我们使用一个 state 来 force re-render useWorkflow? 
  // 或者简单点，我们假设 workflowInstanceId 已经传过来了。如果没有，就先用空。
  // 等 data 加载完，我们拿到 workflowInstanceId，再传给 useWorkflow?
  // 我们可以用一个 state 来存 workflowInstanceId (如果 params 没有).

  const [wfInstanceId, setWfInstanceId] = useState(workflowInstanceId);

  useEffect(() => {
    // 监听 form values 变化比较复杂。我们可以在 onFormInit 里 setWfInstanceId
    // 这里我们在 loading 结束后尝试获取一下？
    if (!workflowInstanceId && !loading && form.values.workflowInstanceId) {
      setWfInstanceId(form.values.workflowInstanceId);
    }
  }, [loading, workflowInstanceId, form]);

  const workflowInfo = useWorkflow(
    wfInstanceId,
    activityId,
    correlationId
  );

  // 使用 API 返回的 currentActivityName 优先
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (correlationId) {
      PartDocumentChangeOrderGetAsync({ id: correlationId }).then(res => {
        setData(res);
        setItems(res.items || []);
      });
    }
  }, [correlationId]);

  useEffect(() => {
    if (data) {
      $workflowInfo.currentActivityName = data.currentActivityName || workflowInfo.currentActivityName || '';
      if (workflowInfo.executionLogs) {
        // @ts-ignore
        $workflowInfo.executionActivityNames = workflowInfo.executionLogs?.map((x) => x.activityDisplayName || x.activityName);
      }
      console.log('[PartDocumentChangeOrder] $workflowInfo updated:', $workflowInfo.currentActivityName);
    }
  }, [data, workflowInfo]);

  const schema = useMemo(() => executeSchema(), []);

  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/DocumentManagement/PartDocumentChangeOrder');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  const handleSubmit = async () => {
    if (submitting) return;

    try {
      await form.validate();
      const values = form.values;

      if (!values.workflowInput) {
        message.error('请填写审批意见');
        return;
      }

      setSubmitting(true);

      // 提交数据包含审批字段和工作流输入
      const submitData = {
        // 审批数据
        auditEngineeringUserCode: values.auditEngineeringUserCode,
        auditEngineeringUserName: values.auditEngineeringUserName,
        auditEngineeringReason: values.auditEngineeringReason,
        auditMaterialUserCode: values.auditMaterialUserCode,
        auditMaterialUserName: values.auditMaterialUserName,
        auditMaterialReason: values.auditMaterialReason,
        auditPurchaseUserCode: values.auditPurchaseUserCode,
        auditPurchaseUserName: values.auditPurchaseUserName,
        auditPurchaseReason: values.auditPurchaseReason,
        auditPlanUserCode: values.auditPlanUserCode,
        auditPlanUserName: values.auditPlanUserName,
        auditPlanReason: values.auditPlanReason,
        auditMarketplaceUserCode: values.auditMarketplaceUserCode,
        auditMarketplaceUserName: values.auditMarketplaceUserName,
        auditMarketplaceReason: values.auditMarketplaceReason,
        // 工作流输入
        workflowInput: {
          ...values.workflowInput,
          activityId: activityId,
        }
      };

      console.log('[PartDocumentChangeOrder] 提交数据:', submitData);

      await PartDocumentChangeOrderExecuteWorkflowAsync({ id: correlationId as string }, submitData);
      message.success('审批提交成功');
      handleBack();
    } catch (error: any) {
      console.error('审批提交失败:', error);
      message.error(error?.message || '提交失败');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      <Spin spinning={loading}>
        <WorkflowInstanceInfo
          correlationData={data}
          workflowInstanceId={data?.workflowInstanceId || wfInstanceId}
        />

        <FormProvider form={form}>
          <FormLayout labelCol={6} wrapperCol={10}>
            <SchemaField schema={schema} scope={{ $workflowInfo }} />
          </FormLayout>
        </FormProvider>

        {/* 变更明细表格 - 单独显示 */}
        {items.length > 0 && (
          <Card title="变更明细" style={{ marginTop: 16 }} size="small">
            <Table
              columns={itemColumns}
              dataSource={items}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        )}

        {/* 工作流执行表单 */}
        <WorkflowExecutionForm
          form={form}
          workflowInstanceId={wfInstanceId}
          definitionId={definitionId}
          activityId={activityId}
          currentActivityName={data?.currentActivityName || workflowInfo?.currentActivityName}
        />

        {/* 审批日志 */}
        {wfInstanceId && (
          <WorkflowExecutionCorrelationList
            hideSearch={true}
            workflowData={{
              correlationId: correlationId as string,
              workflowDefinitionId: definitionId || ''
            }}
          />
        )}

        <ToolBar>
          <Button onClick={handleBack} disabled={submitting}>返回</Button>
          <WorkItemAssignDialog workflowInfo={{ workItemId }} />
          <Button type="primary" onClick={handleSubmit} loading={submitting}>
            提交
          </Button>
        </ToolBar>
      </Spin>
    </div>
  );
};

export default PartDocumentChangeOrderExecutePage;
