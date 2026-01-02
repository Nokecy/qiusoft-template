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
import { ProjectIssueGetAsync, ProjectIssueApproveResolutionAsync, ProjectIssueRejectResolutionAsync } from '@/services/pdm/ProjectIssue';
import { ProjectGetListAsync } from '@/services/pdm/Project';
import WorkflowExecutionForm from '@/pages/appWorkflow/_utils/workflowExecutionForm';
import useWorkflow from '@/hooks/useWorkflow';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import { useKeepAliveParams } from '@/hooks';

/**
 * 项目问题工作流执行页面
 */
const ExecuteFormPage = (props: any) => {
  const { params } = useKeepAliveParams('/appPdm/ProjectManagement/IssueList/execute', ['definitionId', 'correlationId', 'activityId', 'workflowInstanceId', 'workItemId']);
  const { definitionId, correlationId, activityId, workflowInstanceId, workItemId } = params;
  const $store = useMemo(() => observable({ currentActivityName: '' }), []);
  const workflowInfo = useWorkflow(workflowInstanceId, activityId, correlationId);
  const [current, setCurrent]: any = useState({});
  const [loading, setLoading] = useState(false);

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
                let values: any = await ProjectIssueGetAsync({ id: correlationId });

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

                // 如果有项目编码,获取项目名称
                if (values.projectCode) {
                  try {
                    const projectResult = await ProjectGetListAsync({
                      MaxResultCount: 1000,
                    });
                    if (projectResult.items && projectResult.items.length > 0) {
                      let project = projectResult.items.find(
                        (p) => p.projectCode === values.projectCode
                      );

                      if (!project) {
                        project = projectResult.items.find(
                          (p) => p.id === values.projectCode
                        );
                      }

                      if (project) {
                        values.projectName = project.projectName;
                        if (project.id === values.projectCode) {
                          values.projectCode = project.projectCode;
                        }
                      }
                    }
                  } catch (error) {
                    console.error('获取项目名称失败:', error);
                  }
                }

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

      const { executeType, message: remark } = values.workflowInput;

      // 根据 executeType 调用不同的 API
      // 5 = 通过, 20 = 拒绝
      if (executeType === 5) {
        // 审批通过
        await ProjectIssueApproveResolutionAsync({
          id: correlationId,
          remark: remark || '审批通过',
        });
        message.success('审批通过成功');
      } else if (executeType === 20) {
        // 审批拒绝
        if (!remark) {
          message.error('拒绝时必须填写处理意见');
          return;
        }
        await ProjectIssueRejectResolutionAsync({
          id: correlationId,
          rejectReason: remark,
          remark: remark,
        });
        message.success('审批拒绝成功');
      } else {
        // 其他操作类型暂不支持
        message.warning('该操作类型暂不支持，仅支持通过和拒绝操作');
        return;
      }

      // 关闭当前标签页
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
      <Card title="问题信息" style={{ marginBottom: 16 }}>
        <Spin spinning={loading} tip="加载中...">
          <FormProvider form={form}>
            <FormLayout {...schema.form} previewTextPlaceholder={'无'}>
              <SchemaField schema={schema.schema} scope={{ $workflowInfo }}></SchemaField>
            </FormLayout>
          </FormProvider>
        </Spin>
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
  name: '处理项目问题',
};
