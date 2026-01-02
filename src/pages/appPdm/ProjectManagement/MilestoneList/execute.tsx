import { Form, FormLayout } from '@formily/antd-v5';
import { Button, Card, Result, Spin, Typography, message } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { closeTab, history } from 'umi';
import { executeSchema } from './components/schema';
import { observable } from '@formily/reactive';
import { ToolBar } from '@/components';
import { createForm, onFormInit } from '@formily/core';
import { WorkItemAssignDialog } from '@/pages/appWorkflow/_utils';
import WorkflowExecutionList from '@/pages/appWorkflow/_utils/workflowExecutionList';
import { pubGoBack } from '@/components/public';
import { ProjectMilestoneGetAsync, ProjectMilestoneExecuteWorkflowAsync, ProjectMilestoneGetFormDataAsync } from '@/services/pdm/ProjectMilestone';
import { ProjectGetListAsync } from '@/services/pdm/Project';
import WorkflowExecutionForm from '@/pages/appWorkflow/_utils/workflowExecutionForm';
import useWorkflow from '@/hooks/useWorkflow';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import { useKeepAliveParams } from '@/hooks';
import { useDynamicSchema, useDynamicSchemaRegistry } from '@@/plugin-dynamicSchema';
import { ProjectFormGetAsync } from '@/services/pdm/ProjectForm';
import { WorkflowRunnerExecuteWorkflow } from '@/services/workflow/WorkflowRunner';
import { useSchemaField } from '@@/plugin-formSchema';
import { PdmWorkflowEntityGetAsync } from '@/services/pdm/PdmWorkflowEntity';
import { FormProvider, observer, useForm } from '@formily/react';
import { isApprovalExecutionLog, loadApprovalNodes } from '../ProjectList/_components/milestoneApprovalUtils';

const isDev = process.env.NODE_ENV !== 'production';

const guidLikeRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isGuidLike(value?: string) {
  return !!value && guidLikeRe.test(value);
}


/**
 * 项目里程碑工作流执行页面
 */
const ExecuteFormPage = (props: any) => {
  const { params, isActive } = useKeepAliveParams('/appPdm/ProjectManagement/MilestoneList/execute', ['definitionId', 'correlationId', 'activityId', 'workflowInstanceId', 'workItemId']);
  const { definitionId, correlationId, activityId, workflowInstanceId, workItemId } = params;
  const workflowInfo = useWorkflow(workflowInstanceId, activityId, correlationId);
  const [resolvedMilestoneId, setResolvedMilestoneId] = useState<string>('');
  const [formDataLoading, setFormDataLoading] = useState(false); // 动态表单数据
  const [milestoneFormId, setMilestoneFormId] = useState<string>(''); // 里程碑的 formId
  const [dynamicScenarioKey, setDynamicScenarioKey] = useState<string>('');
  const [dynamicSchemaResolving, setDynamicSchemaResolving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [effectiveDefinitionId, setEffectiveDefinitionId] = useState<string | undefined>(definitionId as string | undefined);
  const [approvalNodeCount, setApprovalNodeCount] = useState<number | null>(null);
  const [approvalNodeLoading, setApprovalNodeLoading] = useState(false);

  const dynamicSchemaToRenderKey = dynamicScenarioKey || (!isGuidLike(milestoneFormId) ? milestoneFormId : '');
  const { refresh: refreshDynamicSchemas, isInitialized: dynamicSchemaInitialized } = useDynamicSchemaRegistry();
  const refreshedSchemaRef = useRef<Set<string>>(new Set());

  const MilestoneDynamicFormContent: React.FC = observer(() => {
    const formInstance = useForm();
    const formValues: any = formInstance?.values || {};
    const effectiveScenarioKey = formValues.dynamicScenarioKey || dynamicScenarioKey;
    const effectiveFormId = formValues.formId || milestoneFormId;
    const renderScenarioKey = effectiveScenarioKey || (!isGuidLike(effectiveFormId) ? effectiveFormId : '');

    const localSchemaProbe = useDynamicSchema(renderScenarioKey || '');
    const DynamicSchemaField = useSchemaField({ UserSelect, ProjectSelect });

    return (
      <div>
        {!renderScenarioKey ? (
          <Result
            status="info"
            title="未配置动态表单"
            subTitle="请确认里程碑关联的表单已发布并配置 scenarioKey"
          />
        ) : dynamicSchemaResolving || formDataLoading || localSchemaProbe.loading ? (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <Spin />
          </div>
        ) : !localSchemaProbe.error ? (
          <FormProvider form={dynamicForm}>
            <FormLayout {...localSchemaProbe.formConfig}>
              <DynamicSchemaField schema={localSchemaProbe.schema} />
            </FormLayout>
          </FormProvider>
        ) : (
          <Result
            status="error"
            title="表单加载失败"
            subTitle={localSchemaProbe.error?.message || '未找到动态表单 Schema'}
          />
        )}
      </div>
    );
  });

  useEffect(() => {
    if (!dynamicSchemaToRenderKey || !dynamicSchemaInitialized) {
      return;
    }

    if (refreshedSchemaRef.current.has(dynamicSchemaToRenderKey)) {
      return;
    }

    refreshedSchemaRef.current.add(dynamicSchemaToRenderKey);
    refreshDynamicSchemas().catch((e) => {
      console.warn('动态 Schema 刷新失败:', e);
    });
  }, [dynamicSchemaInitialized, dynamicSchemaToRenderKey, refreshDynamicSchemas]);

  const SchemaField = useSchemaField({ UserSelect, ProjectSelect, MilestoneDynamicFormContent });
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
          onFormInit(() => {});
        },
      }),
    []
  );
  const dynamicForm = useMemo(() => createForm({ pattern: 'readPretty' }), []);

  const loadKeyRef = useRef<string | null>(null);

  const loadMilestoneData = useCallback(async () => {
    if (!correlationId) {
      return;
    }

    const loadKey = `${correlationId}::${activityId || ''}::${workflowInstanceId || ''}`;
    if (loadKeyRef.current === loadKey) {
      return;
    }
    loadKeyRef.current = loadKey;

    form.reset();
    setResolvedMilestoneId('');
    setMilestoneFormId('');
    setDynamicScenarioKey('');
    dynamicForm.reset();

    // correlationId 可能是 ProxyId（历史数据）或 MilestoneId（新数据）
    // 先通过 PdmWorkflowEntity 解析真实的业务里程碑 ID，避免出现“项目基本信息/动态表单为空”
    let workflowEntity: any = null;
    let milestoneId = correlationId as string;
    try {
      workflowEntity = await PdmWorkflowEntityGetAsync({ id: correlationId as string }, { skipErrorHandler: true });
      milestoneId = workflowEntity?.milestoneId || workflowEntity?.targetRowId || workflowEntity?.id || milestoneId;
    } catch (e) {
      // ignore：兜底按 correlationId 直接取业务数据（与旧逻辑兼容）
    }

    setResolvedMilestoneId(milestoneId);

    let values: any = await ProjectMilestoneGetAsync({ id: milestoneId });

    let index = 0;
    if (values.activityId) {
      values.activityId?.split(';').forEach((i, idx) => {
        if (i === activityId) {
          index = idx;
        }
      });
      values.activityId = values.activityId.split(';')[index];
      values.activityName = values.activityName.split(';')[index];
      values.assigneeName = values.assigneeName.split(';')[index];
      values.activityDisplayName = values.activityDisplayName.split(';')[index];
      values.activityDescription = values.activityDescription.split(';')[index];
    }

    // 先设置里程碑数据
    // 补齐工作流上下文字段（用于流程标题通用展示模板）
    if (!values.creator && workflowEntity?.creator) {
      values.creator = workflowEntity.creator;
    }
    if (!values.milestoneName && workflowEntity?.milestoneName) {
      values.milestoneName = workflowEntity.milestoneName;
    }
    if (!values.projectCode && workflowEntity?.projectCode) {
      values.projectCode = workflowEntity.projectCode;
    }

    form.setValues(values);
    if (values.workflowDefinitionId || values.WorkflowDefinitionId) {
      setEffectiveDefinitionId(values.workflowDefinitionId || values.WorkflowDefinitionId);
    }

    // 通用字段兼容：用于部分流程标题模板页面展示（与其他 execute 页一致）
    if (values.creator) {
      values.initiatorName = values.creator;
    }
    if (values.creationTime) {
      values.initiationTime = values.creationTime;
    }

    // 保存 formId
    const formIdValue =
      values.formId ||
      values.FormId ||
      values.form?.id ||
      values.Form?.id ||
      values.formDefinition?.id ||
      values.FormDefinition?.id ||
      workflowEntity?.formId ||
      workflowEntity?.FormId;
    if (formIdValue) {
      form.setValuesIn('formId', formIdValue);
      setMilestoneFormId(formIdValue);
    }

    // 优先使用返回的 scenarioKey，避免 formId 未绑定时无法渲染
    const scenarioKeyValue =
      values.form?.scenarioKey ||
      values.Form?.scenarioKey ||
      values.formDefinition?.scenarioKey ||
      values.FormDefinition?.scenarioKey ||
      workflowEntity?.scenarioKey ||
      workflowEntity?.ScenarioKey;
    if (scenarioKeyValue) {
      setDynamicScenarioKey(scenarioKeyValue);
      form.setValuesIn('dynamicScenarioKey', scenarioKeyValue);
    }

    // 项目基本信息：里程碑只存 ProjectCode（不是 ProjectId），这里通过列表接口按 ProjectCode 精确查询
    const projectCodeValue = values.projectCode;
    if (projectCodeValue) {
      try {
        const projectList: any = await ProjectGetListAsync({
          Filter: `projectCode=${projectCodeValue}`,
          SkipCount: 0,
          MaxResultCount: 1,
        });

        const project = projectList?.items?.[0];
        if (project) {
          form.setValuesIn('projectInfo', {
            projectCode: project.projectCode,
            projectName: project.projectName,
            projectCategoryCode: project.projectCategoryCode,
            category: project.category,
            projectManagerName: project.projectManagerName,
          });
        } else {
          // 兜底：至少展示里程碑带回来的项目编码/名称
          form.setValuesIn('projectInfo', {
            projectCode: values.projectCode,
            projectName: values.projectName,
          });
        }
      } catch (error) {
        // 兜底：至少展示里程碑带回来的项目编码/名称
        form.setValuesIn('projectInfo', {
          projectCode: values.projectCode,
          projectName: values.projectName,
        });
      }
    }

    // 获取动态表单数据
    if (formIdValue && milestoneId) {
      try {
        setFormDataLoading(true);
        const formDataResult = await ProjectMilestoneGetFormDataAsync({ milestoneId });
        const submittedFormData = formDataResult?.submittedFormData;
        const formDefinition = formDataResult?.formDefinition;

        if (formDefinition?.id) {
          setMilestoneFormId((prev) => prev || formDefinition.id);
          form.setValuesIn('formId', formDefinition.id);
        }

        if (formDefinition?.scenarioKey) {
          setDynamicScenarioKey(formDefinition.scenarioKey);
          form.setValuesIn('dynamicScenarioKey', formDefinition.scenarioKey);
        }

        if (!submittedFormData) {
          dynamicForm.reset();
        } else {
          try {
            dynamicForm.setValues(JSON.parse(submittedFormData));
          } catch (parseError) {
            console.error('解析表单数据失败:', parseError);
            dynamicForm.reset();
          }
        }
      } catch (error) {
        console.error('获取表单数据失败:', error);
      } finally {
        setFormDataLoading(false);
      }
    }
  }, [activityId, correlationId, dynamicForm, form, workflowInstanceId]);

  useEffect(() => {
    const resolveScenarioKey = async () => {
      if (!milestoneFormId || dynamicScenarioKey) {
        return;
      }

      // 兜底：如果 formId 本身就是 scenarioKey（非 GUID），直接使用
      if (!isGuidLike(milestoneFormId)) {
        setDynamicScenarioKey(milestoneFormId);
        form.setValuesIn('dynamicScenarioKey', milestoneFormId);
        return;
      }

      try {
        setDynamicSchemaResolving(true);
        const formEntity: any = await ProjectFormGetAsync({ id: milestoneFormId }, { skipErrorHandler: true });
        if (formEntity?.scenarioKey) {
          setDynamicScenarioKey(formEntity.scenarioKey);
          form.setValuesIn('dynamicScenarioKey', formEntity.scenarioKey);
        }
      } catch (e) {
        // ignore：动态表单由后续兜底处理
      } finally {
        setDynamicSchemaResolving(false);
      }
    };

    resolveScenarioKey();
  }, [dynamicScenarioKey, milestoneFormId]);

  useEffect(() => {
    if (!effectiveDefinitionId) {
      setApprovalNodeCount(null);
      return;
    }

    let cancelled = false;
    setApprovalNodeLoading(true);
    loadApprovalNodes(effectiveDefinitionId)
      .then((nodes) => {
        if (cancelled) return;
        setApprovalNodeCount(nodes.length);
        if (isDev) {
          console.info('[里程碑审批] 执行页节点识别完成', {
            effectiveDefinitionId,
            count: nodes.length,
          });
        }
      })
      .catch(() => {
        if (cancelled) return;
        setApprovalNodeCount(null);
        if (isDev) {
          console.info('[里程碑审批] 执行页节点识别失败', { effectiveDefinitionId });
        }
      })
      .finally(() => {
        if (cancelled) return;
        setApprovalNodeLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [effectiveDefinitionId]);

  useEffect(() => {
    if (isActive) {
      loadMilestoneData();
    }
  }, [isActive, loadMilestoneData]);

  /**
   * 获取流程信息
   */
  useEffect(() => {
    if (workflowInfo.executionLogs) {
      $workflowInfo.currentActivityName = workflowInfo.currentActivityName!;

      //@ts-ignore
      $workflowInfo.executionActivityNames = workflowInfo.executionLogs?.map(
        (x) => x.activityDisplayName
      );
    }
  }, [workflowInfo]);

  const completedApprovalCount = useMemo(() => {
    const logs = workflowInfo.executionLogs || [];
    const completed = new Set<string>();
    logs.forEach((log) => {
      if (log?.executeType !== 5) {
        return;
      }
      if (!isApprovalExecutionLog(log)) {
        return;
      }
      const nodeId = String(log?.activityNodeId || '').trim();
      if (nodeId) {
        completed.add(nodeId);
      }
    });
    return completed.size;
  }, [workflowInfo.executionLogs]);

  useEffect(() => {
    if (!isDev) return;
    console.info('[里程碑审批] 执行页节点统计', {
      approvalNodeCount,
      completedApprovalCount,
      workflowInstanceId,
      activityId,
    });
  }, [approvalNodeCount, completedApprovalCount, workflowInstanceId, activityId]);

  const shouldShowNextApprover = (executeType?: number) => {
    if (executeType !== 5) return false;
    if (approvalNodeCount === null) return false;
    return approvalNodeCount > completedApprovalCount + 1;
  };

  const NextApproverCard: React.FC = observer(() => {
    const formInstance = useForm();
    const executeType = formInstance.values?.workflowInput?.executeType;
    const showCard = shouldShowNextApprover(executeType);

    useEffect(() => {
      if (!showCard && formInstance.values?.workflowInput?.nextAssignUser) {
        formInstance.setValuesIn('workflowInput.nextAssignUser', undefined);
      }
    }, [showCard, formInstance]);

    if (!showCard) {
      return null;
    }

    const summaryText = approvalNodeLoading
      ? '审批节点数加载中...'
      : `审批节点数：${approvalNodeCount ?? '-'}，已完成：${completedApprovalCount}`;

    return (
      <Card title="下一步审批人" size="small" style={{ marginBottom: 16 }}>
        <Typography.Text type="secondary">{summaryText}</Typography.Text>
        <div style={{ marginTop: 12 }}>
          <UserSelect
            placeholder="请选择下一步审批人"
            labelInValue={false}
            valueField="userName"
            labelField="name"
            style={{ width: '100%' }}
            value={formInstance.values?.workflowInput?.nextAssignUser}
            onChange={(value) => {
              formInstance.setValuesIn('workflowInput.nextAssignUser', value);
            }}
          />
        </div>
      </Card>
    );
  });

  const handleSubmit = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    try {
      await form.validate();
      const values: any = form.values;
      const milestoneId = resolvedMilestoneId || (correlationId as string);

      if (!values.workflowInput) {
        message.error('请填写审批意见');
        return;
      }
      if (shouldShowNextApprover(values.workflowInput.executeType) && !values.workflowInput.nextAssignUser) {
        message.error('请选择下一步审批人');
        return;
      }
      if (isDev) {
        console.info('[里程碑审批] 执行页提交参数', {
          executeType: values.workflowInput.executeType,
          nextActivity: values.workflowInput.nextActivity,
          nextAssignUser: values.workflowInput.nextAssignUser,
          milestoneId,
          activityId,
          workflowInstanceId,
          correlationId,
        });
      }

      // 构建符合 API 要求的数据结构
      const submitData = {
        workflowInput: {
          ...values.workflowInput,
          activityId,
        },
      };

      try {
        await ProjectMilestoneExecuteWorkflowAsync({ id: milestoneId }, submitData, { skipErrorHandler: true });
      } catch (e: any) {
        // 后端可能存在 Proxy/实体实例号未落库的历史数据：用 workflow-runner 兜底按实例执行
        const msg = e?.response?.data?.error?.message || e?.message || '';
        if (msg.includes('MilestoneCannotExecuteWorkflow') || msg.includes('里程碑不能执行工作流')) {
          await WorkflowRunnerExecuteWorkflow({
            workflowInstanceId,
            activityId,
            ExecuteType: values.workflowInput.executeType,
            NextActivity: values.workflowInput.nextActivity,
            AssignUser: values.workflowInput.assignUser,
            BackActivity: values.workflowInput.backActivity,
            NextAssignUser: values.workflowInput.nextAssignUser,
            Message: values.workflowInput.message,
            Executor: values.workflowInput.executor,
            CopyToUsers: values.workflowInput.copyToUsers,
          }, { skipErrorHandler: true });
        } else {
          throw e;
        }
      }

      message.success('审批提交成功');
      try {
        closeTab(history.location.pathname);
      } catch (e) {
        console.warn('关闭页签失败:', e);
      }
    } catch (error) {
      console.error('审批提交失败:', error);
      message.error('审批提交失败');
    } finally {
      setSubmitting(false);
    }
  };

  const schema = {
    form: {
      labelCol: 6,
      wrapperCol: 18,
      labelWidth: '120px',
      feedbackLayout: 'none',
    },
    schema: executeSchema(),
  };

  return (
    <Form form={form} {...schema.form} previewTextPlaceholder={'无'}>
      <SchemaField schema={schema.schema} scope={{ $workflowInfo }}></SchemaField>

      <NextApproverCard />

      <WorkflowExecutionForm
        form={form}
        workflowInstanceId={workflowInstanceId}
        definitionId={definitionId}
        activityId={activityId}
        currentActivityName={workflowInfo.currentActivityName || '审批意见'}
        enableActionTargetMapping={true}
        hideNextAssignUser={true}
      />

      <WorkflowExecutionList {...props} workflowInstanceId={workflowInstanceId} correlationId={correlationId} hideSearch={true} />

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
            try {
              closeTab(history.location.pathname);
            } catch (e) {
              console.warn('关闭页签失败:', e);
            }
          }}
        />

        <Button type="primary" onClick={handleSubmit} loading={submitting} disabled={submitting}>
          提交
        </Button>
      </ToolBar>
    </Form>
  );
};

export default ExecuteFormPage;
export const routeProps = {
  name: '处理项目里程碑',
};




