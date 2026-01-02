import React from 'react';
import { Modal, message, Button } from 'antd';
import { SwapOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { history } from 'umi';

interface ConvertToTaskDialogProps {
  issueId: string;
  issueCode?: string;
  issueName?: string;
  issueDescription?: string;
  projectCode?: string;
  milestoneId?: string;
  milestoneName?: string;
  handlerCode?: string;
  handlerName?: string;
  expectedResolvedDate?: string;
  remark?: string;
  onSuccess?: () => void;
  buttonProps?: any;
}

/**
 * 转任务对话框
 * 将问题转换为任务：跳转到任务新建页面并传递问题数据
 * 任务保存成功后会自动删除原问题
 */
const ConvertToTaskDialog: React.FC<ConvertToTaskDialogProps> = ({
  issueId,
  issueCode,
  issueName,
  issueDescription,
  projectCode,
  milestoneId,
  milestoneName,
  handlerCode,
  handlerName,
  expectedResolvedDate,
  remark,
  onSuccess,
  buttonProps = {},
}) => {
  const handleConvert = () => {
    Modal.confirm({
      title: '确认转为任务',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>将此问题转换为项目任务后，原问题将被删除。</p>
          <p>问题信息将自动填充到任务表单中，您可以在任务表单中进一步编辑。</p>
          <p style={{ marginTop: 16, color: '#ff4d4f' }}>
            <strong>注意：此操作不可撤销！</strong>
          </p>
        </div>
      ),
      okText: '确认转换',
      cancelText: '取消',
      okType: 'primary',
      width: 520,
      onOk: async () => {
        try {
          // 构造任务表单的初始数据
          const taskFormData: any = {
            fromIssue: 'true', // 标记来源于问题转换
            issueId: issueId,
            issueCode: issueCode,
            projectCode: projectCode,
            taskName: issueName,
            description: issueDescription,
            remark: remark,
          };

          // 如果有里程碑,传递里程碑信息
          if (milestoneId && milestoneName) {
            taskFormData.milestoneId = milestoneId;
            taskFormData.milestoneName = milestoneName;
          }

          // 如果有期望解决日期,设置为任务期望结束日期
          if (expectedResolvedDate) {
            taskFormData.expectedEndDate = expectedResolvedDate;
          }

          // 如果有处理人,设置为任务负责人
          if (handlerCode && handlerName) {
            taskFormData.chargeIdsArray = JSON.stringify([
              {
                value: handlerCode,
                label: handlerName,
              },
            ]);
          }

          // 跳转到任务新建页面,通过 URL 参数传递数据
          const params = new URLSearchParams(taskFormData);
          history.push(`/appPdm/ProjectManagement/TaskList/form?${params.toString()}`);

          // 注意：删除问题的操作放到任务保存成功后进行
          // 这样可以避免用户取消保存任务时问题已被删除的情况
          message.info('请在任务表单中完成任务创建,保存后将自动删除原问题');
        } catch (error: any) {
          message.error('跳转失败：' + (error.message || '未知错误'));
        }
      },
    });
  };

  return (
    <Button
      type="primary"
      icon={<SwapOutlined />}
      onClick={handleConvert}
      {...buttonProps}
    >
      转任务
    </Button>
  );
};

export default ConvertToTaskDialog;
