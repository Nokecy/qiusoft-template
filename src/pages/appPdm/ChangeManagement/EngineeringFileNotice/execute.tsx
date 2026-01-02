import React, { useEffect, useState, useMemo } from 'react';
import { Card, Button, message, Spin } from 'antd';
import { history, closeTab } from 'umi';
import { createForm, onFormInit } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';
import { FormLayout, FormItem, Input, Select, DatePicker, FormGrid, ArrayTable, Editable, PreviewText } from '@formily/antd-v5';
import { observable } from '@formily/reactive';
import { ToolBar } from '@/components';
import {
  EngineeringFileNotificationGetAsync,
  EngineeringFileNotificationExecuteWorkflowAsync,
} from '@/services/pdm/EngineeringFileNotification';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import WorkflowExecutionForm from '@/pages/appWorkflow/_utils/workflowExecutionForm';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkItemAssignDialog from '@/pages/appWorkflow/_utils/workItemAssignDialog';
import { useWorkflow } from '@/hooks/useWorkflow';
import { useKeepAliveParams } from '@/hooks';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import DocumentLibrarySelect from '@/pages/appPdm/_formWidgets/DocumentLibrarySelect';
import { executeSchema } from './components/schema';

export const routeProps = {
  name: '工程文件通知单审批',
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
    DocumentLibrarySelect,
  },
});

const EngineeringFileNotificationExecutePage: React.FC = () => {
  const { params } = useKeepAliveParams('/appPdm/ChangeManagement/EngineeringFileNotice/execute', [
    'id', 'workItemId', 'activityId', 'workflowInstanceId', 'definitionId', 'correlationId'
  ]);
  const recordId = params.id || params.correlationId;
  const workItemId = params.workItemId;
  const activityId = params.activityId;
  const workflowInstanceId = params.workflowInstanceId;
  const definitionId = params.definitionId;

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
            if (recordId) {
              setLoading(true);
              try {
                const result = await EngineeringFileNotificationGetAsync({ id: recordId });
                form.setValues(result);
              } catch (e) {
                message.error('加载数据失败');
              } finally {
                setLoading(false);
              }
            }
          });
        },
      }),
    [recordId]
  );

  // 获取工作流信息用于更新 $workflowInfo
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (recordId) {
      EngineeringFileNotificationGetAsync({ id: recordId }).then(res => {
        setData(res);
      });
    }
  }, [recordId]);

  const workflowInfo = useWorkflow(
    data?.workflowInstanceId || workflowInstanceId,
    data?.activityId || activityId,
    data?.id
  );

  useEffect(() => {
    if (data) {
      $workflowInfo.currentActivityName = data.currentActivityName || workflowInfo.currentActivityName || '';

      if (workflowInfo.executionLogs) {
        // @ts-ignore
        $workflowInfo.executionActivityNames = workflowInfo.executionLogs?.map((x) => x.activityDisplayName || x.activityName);
      }

      console.log('[EngineeringFileNotice] $workflowInfo updated:', {
        currentActivityName: $workflowInfo.currentActivityName,
        executionActivityNames: $workflowInfo.executionActivityNames,
      });
    }
  }, [data, workflowInfo]);

  const schema = useMemo(() => executeSchema(), []);

  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/ChangeManagement/EngineeringFileNotice');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  const handleSubmit = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);
      await form.validate();
      const values = form.values;

      if (!values.workflowInput) {
        message.error('请填写审批意见');
        return;
      }

      const currentActivityName =
        data?.currentActivityName || workflowInfo?.currentActivityName || '';
      if (currentActivityName === '车间主任' && values.archiveType == 0) {
        if (!values.storageLibraryId) {
          message.error('请选择存储库');
          return;
        }
        if (!values.recycleLibraryId) {
          message.error('请选择回收库');
          return;
        }
      }

      const submitData = {
        auditWorkShopUserCode: values.auditWorkShopUserCode,
        auditWorkShopUserName: values.auditWorkShopUserName,
        auditCraftReason: values.auditCraftReason,
        auditWorkShopReason: values.auditWorkShopReason,
        storageLibraryId: values.storageLibraryId,
        recycleLibraryId: values.recycleLibraryId,
        workflowInput: {
          ...values.workflowInput,
          activityId: activityId || data?.activityId,
        }
      };

      console.log('[EngineeringFileNotice] 提交数据:', submitData);

      await EngineeringFileNotificationExecuteWorkflowAsync({ id: data?.id as string }, submitData);
      message.success('提交成功');
      handleBack();
    } catch (error) {
      console.error('审批提交失败:', error);
      message.error('提交失败');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      <Spin spinning={loading}>
        <WorkflowInstanceInfo
          correlationData={data}
          workflowInstanceId={data?.workflowInstanceId || workflowInstanceId}
        />

        <FormProvider form={form}>
          <FormLayout labelCol={6} wrapperCol={10}>
            <SchemaField schema={schema} scope={{ $workflowInfo }} />
          </FormLayout>
        </FormProvider>

        {data?.blobName && (
          <Card size="small" title="附件" style={{ marginTop: 16 }}>
            <a
              href={`/api/pdm/engineering-file-notification/${data.id}/download`}
              download={data.docName || 'attachment'}
            >
              附件: {data.docName || '下载附件'}
            </a>
          </Card>
        )}

        <WorkflowExecutionForm
          form={form}
          workflowInstanceId={data?.workflowInstanceId || workflowInstanceId}
          definitionId={data?.workflowDefinitionId || definitionId}
          activityId={data?.activityId || activityId}
          currentActivityName={data?.currentActivityName || workflowInfo?.currentActivityName}
        />

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

export default EngineeringFileNotificationExecutePage;
