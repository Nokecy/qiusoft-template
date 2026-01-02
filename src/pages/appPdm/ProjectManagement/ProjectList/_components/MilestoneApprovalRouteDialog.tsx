import React, { useEffect, useMemo, useState } from 'react';
import { Form, Modal, Space, Typography, message } from 'antd';
import { createRoot } from 'react-dom/client';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import { ApprovalNode, loadApprovalNodes } from './milestoneApprovalUtils';

const isDev = process.env.NODE_ENV !== 'production';

export interface MilestoneApprovalRouteItem {
  nodeKey: string;
  approverCode: string;
  approverName?: string;
}

const DialogInner: React.FC<{
  milestoneName: string;
  workflowDefinitionId?: string;
  onResolve: (value: MilestoneApprovalRouteItem[] | null) => void;
}> = ({ milestoneName, workflowDefinitionId, onResolve }) => {
  const [open, setOpen] = useState(true);
  const [loadingNodes, setLoadingNodes] = useState(false);
  const [nodes, setNodes] = useState<ApprovalNode[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingNodes(true);
      const loaded = await loadApprovalNodes(workflowDefinitionId);
      if (cancelled) return;
      setNodes(loaded);
      if (isDev) {
        console.info('[里程碑审批] 提交弹窗识别节点', {
          workflowDefinitionId,
          count: loaded.length,
        });
      }
      setLoadingNodes(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [workflowDefinitionId]);

  const title = useMemo(() => `提交审批：${milestoneName}`, [milestoneName]);

  const close = (value: MilestoneApprovalRouteItem[] | null) => {
    setOpen(false);
    onResolve(value);
  };

  return (
    <Modal
      open={open}
      title={title}
      width={520}
      maskClosable={false}
      destroyOnClose
      confirmLoading={loadingNodes}
      onCancel={() => close(null)}
      okText="确认"
      cancelText="取消"
      onOk={async () => {
        try {
          const values = await form.validateFields();
          const approver = values?.approver;
          const approverCode = String(approver?.value || '').trim();
          const approverName = String(approver?.label || '').trim();
          if (!approverCode) throw new Error('请选择审批人');
          if (approverCode.includes(',')) throw new Error('审批人编码当前仅支持单人（不允许英文逗号）');

          const nodeKey = nodes?.[0]?.nodeKey || 'default';
          if (!nodes?.length) {
            message.warning('未识别审批节点，已按默认节点提交');
          }
          if (isDev) {
            console.info('[里程碑审批] 提交弹窗确认', {
              nodeKey,
              approverCode,
              approverName,
            });
          }
          close([{ nodeKey, approverCode, approverName }]);
        } catch (err: any) {
          message.error(err?.message || '校验失败');
        }
      }}
    >
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        <Typography.Text type="secondary">
          系统将根据工作流定义自动识别审批节点，提交时仅选择首审批人。
        </Typography.Text>

        {loadingNodes && (
          <Typography.Text type="secondary">审批节点识别中...</Typography.Text>
        )}

        {!loadingNodes && nodes.length > 0 && (
          <Typography.Text type="secondary">已识别审批节点数：{nodes.length}</Typography.Text>
        )}

        {!loadingNodes && !nodes.length && (
          <Typography.Text type="warning">
            当前无法从工作流定义解析审批节点（workflowDefinitionId: {workflowDefinitionId || '未配置'}），将按默认节点提交。
          </Typography.Text>
        )}

        <Form form={form} layout="vertical">
          <Form.Item
            label="首审批人"
            name="approver"
            rules={[{ required: true, message: '请选择审批人' }]}
          >
            <UserSelect
              placeholder="请选择审批人"
              labelInValue
              labelField="name"
              valueField="userName"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  );
};

export async function openMilestoneApprovalRouteDialog(params: {
  milestoneName: string;
  workflowDefinitionId?: string;
}): Promise<MilestoneApprovalRouteItem[] | null> {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = createRoot(container);

  return new Promise((resolve) => {
    const cleanup = () => {
      setTimeout(() => {
        try {
          root.unmount();
        } finally {
          container.remove();
        }
      }, 0);
    };

    const handleResolve = (value: MilestoneApprovalRouteItem[] | null) => {
      cleanup();
      resolve(value);
    };

    root.render(
      <DialogInner
        milestoneName={params.milestoneName}
        workflowDefinitionId={params.workflowDefinitionId}
        onResolve={handleResolve}
      />
    );
  });
}
