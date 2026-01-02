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
import { DocumentPublishRequestGetAsync, DocumentPublishRequestExecuteWorkflowAsync } from '@/services/pdm/DocumentPublishRequest';
import WorkflowExecutionForm from '@/pages/appWorkflow/_utils/workflowExecutionForm';
import useWorkflow from '@/hooks/useWorkflow';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import { useKeepAliveParams } from '@/hooks';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { documentPublishRequestStatusEnum } from './_enums';
import type { ISchema } from '@formily/json-schema';
import dayjs from 'dayjs';

/**
 * 文档发布申请工作流执行页面
 */
const ExecuteFormPage = (props: any) => {
  const { params } = useKeepAliveParams('/appPdm/DocumentManagement/DocumentPublishRequest/execute', ['definitionId', 'correlationId', 'activityId', 'workflowInstanceId', 'workItemId']);
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
                const values: any = await DocumentPublishRequestGetAsync({ id: correlationId });
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

      await DocumentPublishRequestExecuteWorkflowAsync({ id: correlationId }, submitData);
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
    const statusItem = documentPublishRequestStatusEnum.find(item => item.value === status);
    if (!statusItem) return '-';
    return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
  };

  // 文档明细列定义
  const documentColumnDefs = [
    { field: 'documentNumber', headerName: '文档编码', width: 150 },
    { field: 'documentName', headerName: '文档名称', width: 200 },
    { field: 'documentVersion', headerName: '文档版本', width: 100 },
    { field: 'documentTypeName', headerName: '文档类型', width: 120 },
    { field: 'fileName', headerName: '文件名称', width: 150 },
    { field: 'partNumber', headerName: '物料编码', width: 120 },
    { field: 'partName', headerName: '物料名称', width: 150 },
    { field: 'drawingNumber', headerName: '图号', width: 120 },
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
      <Card title="发布申请信息" style={{ marginBottom: 16 }}>
        <Spin spinning={loading} tip="加载中...">
          <Descriptions column={2} bordered size="middle">
            <Descriptions.Item label="申请单号">{current?.requestNumber || '-'}</Descriptions.Item>
            <Descriptions.Item label="状态">{getStatusTag(current?.status)}</Descriptions.Item>
            <Descriptions.Item label="申请人姓名">{current?.applicantName || '-'}</Descriptions.Item>
            <Descriptions.Item label="申请时间">
              {current?.applicationTime ? dayjs(current.applicationTime).format('YYYY-MM-DD HH:mm') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="审批人姓名">{current?.approverName || '-'}</Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {current?.creationTime ? dayjs(current.creationTime).format('YYYY-MM-DD HH:mm') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="发布标题" span={2}>{current?.title || '-'}</Descriptions.Item>
            <Descriptions.Item label="发布说明" span={2}>{current?.description || '-'}</Descriptions.Item>
            <Descriptions.Item label="备注" span={2}>{current?.remark || '-'}</Descriptions.Item>
          </Descriptions>
        </Spin>
      </Card>

      {/* 发布文档明细 */}
      <Card title="发布文档" style={{ marginBottom: 16 }}>
        <AgGridPlus
          gridRef={gridRef}
          dataSource={current?.items || []}
          columnDefs={documentColumnDefs}
          pagination={false}
          domLayout="autoHeight"
          search={false}
          toolBarRender={false}
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
  name: '处理文档发布申请',
};
